import SecurityContext from "../../context/SecurityContext.ts";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";

export function LoginButton() {
    const {loggedInUser, logout, login, isAuthenticated, loggedUserId} = useContext(SecurityContext);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    if (isAuthenticated()) {
        return (
            <>
                <button
                    onClick={toggleDropdown}
                    className="flex flex-row bg-neutral-900/60 backdrop-blur px-10 py-6 rounded-3xl shadow-md"
                >
                    <p className="text-white text-lg font-bold">{loggedInUser}</p>
                    <div className="ml-2 text-white text-lg">▼</div>
                    {/* Arrow icon for dropdown */}
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-neutral-900/60 backdrop-blur rounded-xl shadow-lg">
                        <Link to={`/UserProfile/${loggedUserId}`}
                              className="w-full px-4 py-2 text-white font-bold text-left hover:bg-neutral-900 rounded-xl">View
                            Profile</Link>
                        <Link to={`/FriendList/${loggedUserId}`}
                              className="w-full px-4 py-2 text-white font-bold text-left hover:bg-neutral-900 rounded-xl">View
                            Friend List</Link>
                        <button
                            onClick={() => {
                                logout();
                                setIsOpen(false); // Close the dropdown after logging out
                            }}
                            className="w-full px-4 py-2 text-white font-bold text-left hover:bg-neutral-900 rounded-xl"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <button
                onClick={login}
                className='bg-neutral-900/60 backdrop-blur px-10 py-6 rounded-3xl shadow-md'
            >
                <div className='text-xl text-white font-bold hover:scale-110 transition-all ease-out duration-75'>
                    Login
                </div>
            </button>
        );
    }
};
