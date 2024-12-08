import { LoginButton } from "../../components/loginButton/LoginButton.tsx";
import { SideElements } from "../../components/sideElements/SideElements.tsx";
import { MenuList } from "../../components/menuList/MenuList";


export function HomePage() {
    return (
        <div className="bg-neutral-900 h-screen w-screen flex flex-col">
            <LoginButton />
            <main className="z-10 flex-grow flex justify-center items-center p-12 gap-x-20">

                <MenuList menuItems={[{
                    menuItemName: "Start Game",
                    menuItemLink: "/GameSelectorPage"
                },
                {
                    menuItemName: "Achievements",
                    menuItemLink: "/achievements"
                },
                {
                    menuItemName: "Settings",
                    menuItemLink: "/settings"
                }]}
                />
                
                <SideElements
                    upperElement={
                        <>
                            <h2 className="text-2xl font-bold mb-2">Previously Played Game</h2>
                            <p className="text-lg">Game Stats or Details...</p>
                        </>
                    }
                    bottemElement={
                        <>
                            <h2 className="text-2xl font-bold mb-2">Active Event!</h2>
                            <p className="text-lg">
                                The Fitness Gram Pacer Test is a Test where you run from side to
                                side in a rapid motion until you cant anymore...
                            </p>
                        </>
                    } />
            </main>
        </div>
    )
}

