import {ReactNode, useEffect, useRef, useState} from 'react'
import SecurityContext from './SecurityContext'
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from '../services/authService.ts'
import {isExpired} from 'react-jwt'
import Keycloak from 'keycloak-js'
import useAuthorization from "../hooks/useAuthorization.ts";

interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    credentials: {
        secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET,
    }
}
const keycloak: Keycloak = new Keycloak(keycloakConfig)

export default function SecurityContextProvider({children}: IWithChildren) {
    const [roles, setRoles] = useState<string[]>([])
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [loggedUserId, setLoggedUserId] = useState<string | undefined>(undefined)
    const keycloakRef = useRef<Keycloak | null>(null);
    const {postUser, isLoading, isError} = useAuthorization()

    useEffect(() => {
        if (!keycloakRef.current) {
            keycloakRef.current = keycloak;
            keycloak.init({onLoad: 'check-sso'})
        }
    }, []);


    keycloak.onAuthSuccess = () => {
        //console.log('onAuthSuccess')
        addAccessTokenToAuthHeader(keycloak.token)
        setLoggedInUser(keycloak.idTokenParsed?.preferred_username)
        setLoggedUserId(keycloak.idTokenParsed?.sub)
        setRoles(keycloak.realmAccess?.roles || [])
        if (keycloak.idTokenParsed?.preferred_username && keycloak.idTokenParsed.sub)
            postUser(keycloak.idTokenParsed.sub, keycloak.idTokenParsed?.preferred_username)
        if (isLoading) {
            //console.log("Loading user...")
        }
        if (isError) {
            //console.log("Error loading user...")
        }
    }

    keycloak.onAuthLogout = () => {
        //console.log('onAuthLogout')
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.given_name)
        })
    }

    function login() {
        //console.log('login')
        keycloak.login()
    }

    function logout() {
        //console.log('logout')
        const logoutOptions = {redirectUri: import.meta.env.VITE_REACT_APP_URL}
        keycloak.logout(logoutOptions)
    }

    function isAuthenticated() {
        //console.log('isAuthenticated')
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated,
                loggedInUser,
                loggedUserId,
                login,
                logout,
                roles
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
