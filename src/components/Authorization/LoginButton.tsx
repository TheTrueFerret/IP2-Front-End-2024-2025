import SecurityContext from "../../context/SecurityContext.ts";
import { useContext } from "react";

export function LoginButton() {
    const { loggedInUser, logout, login, isAuthenticated } = useContext(SecurityContext);

    if (isAuthenticated()) {
        return (
            <div className='z-20 absolute top-2 right-2'>
                <button
                    onClick={logout}
                    className=""
                >
                    <p>User: {loggedInUser}</p>
                    <div className=''>
                        Logout
                    </div>
                </button>
            </div>
        );
    } else {
        return (
            <div className='z-20 absolute top-2 right-2'>
                <button
                    onClick={login}
                    className='bg-neutral-900/60 backdrop-blur px-10 py-6 rounded-3xl shadow-md'
                >
                    <div className='text-xl text-white font-bold hover:scale-110 transition-all ease-out duration-75'>
                        Login
                    </div>
                </button>
            </div>
        );
    }
};
