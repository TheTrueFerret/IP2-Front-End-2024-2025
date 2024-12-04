import { LoginButton } from "../../components/LoginButton";
import { Background } from "../../components/background/Background";
import { MenuList } from "../../components/menuList/MenuList";
import {Link} from "react-router-dom";


export function HomePage() {
    return (
        <div className="bg-neutral-900 text-white h-screen w-screen flex flex-col">
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton />
            </div>
            <main className="z-10 flex-grow flex justify-center items-center p-12 gap-x-12">

                <MenuList menuItems={[{
                    menuItemName: "Start Game",
                    menuItemLink: "/GameSelectorPage",
                },
                {
                    menuItemName: "Achievements",
                    menuItemLink: "/achievements",
                },
                {
                    menuItemName: "Settings",
                    menuItemLink: "/settings",
                }]}
                />
                <Link
                    to="/Lobby"
                    className="mt-12 px-8 py-4 text-4xl font-semibold rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 gradient-button"
                >
                    Lobby
                </Link>
                <div className="flex flex-col space-y-8">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Active Event!</h2>
                        <p className="text-lg">
                            The Fitness Gram Pacer Test is a Test where you run from side to
                            side in a rapid motion until you can’t anymore...
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-2">Previously Played Game</h2>
                        <p className="text-lg">Game Stats or Details...</p>
                    </div>
                </div>
            </main>
            <Background color="crimson" />
        </div>
    )
}

