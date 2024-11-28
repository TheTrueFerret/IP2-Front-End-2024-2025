import SecurityContext from "../context/SecurityContext.ts";
import {useContext} from "react";

const Authorization = () => {
    const {loggedInUser, logout, login, isAuthenticated} = useContext(SecurityContext);

    if (isAuthenticated()) {
        return (
            <div>
                <div style={{
                    position: 'fixed',
                    display: 'flex',
                    gap: '10px',
                    top: '10px',
                    right: '10px',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '4px',
                }}>
                    <p>User: {loggedInUser}</p>
                    <button
                        onClick={logout}
                        style={{
                            background: 'red',
                            color: 'white',
                            padding: '5px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <button
                    onClick={login}
                    className="mt-12 px-1 py-1 text-2xl font-semibold rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 gradient-button"
                    style={{
                        position: 'fixed',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    Login
                </button>
            </div>
        );
    }
};

export default Authorization;
