import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    loggedInUser: string | undefined
    loggedUserId: string | undefined
    login: () => void
    logout: () => void
    roles: string[]
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    loggedInUser: undefined,
    loggedUserId: undefined,
    login: () => {},
    logout: () => {},
    roles: []
})
