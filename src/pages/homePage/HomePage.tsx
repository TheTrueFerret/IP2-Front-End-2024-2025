import {Link} from "react-router-dom";


export function HomePage() {
    return (
        <div className="bg-neutral-900 text-white h-screen w-screen flex flex-col">
            <main className="flex-grow flex justify-center items-center p-12 gap-x-12">
                <div className="flex flex-col space-y-10 relative">
                    <div className="relative group flex items-center space-x-4 ">
                        <img
                            src="../../../public/rummikub-icon.svg"
                            alt="Rummikub"
                            className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <Link
                            to="/Game"
                            className="text-4xl font-semibold hover:underline"
                        >
                            Start Game
                        </Link>

                    </div>

                    <div className="relative group flex items-center space-x-4">
                        <img
                            src="../../../public/rummikub-icon.svg"
                            alt="Rummikub"
                            className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <Link
                            to="/achievements"
                            className="text-4xl font-semibold hover:underline"
                        >
                            Achievements
                        </Link>
                    </div>


                    <div className="relative group flex items-center space-x-4">
                        <img
                            src="../../../public/rummikub-icon.svg"
                            alt="Rummikub"
                            className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <Link
                            to="/settings"
                            className="text-4xl font-semibold hover:underline"
                        >
                            Settings
                        </Link>
                    </div>

                </div>

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
        </div>

    )
}

