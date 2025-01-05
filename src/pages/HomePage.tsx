import {BackButton} from "../components/BackButton";
import {LoginButton} from "../components/loginButton/LoginButton";
import {MenuList} from "../components/menuList/MenuList";
import {SideElements} from "../components/sideElements/SideElements";
import {useContext} from "react";
import SecurityContext from "../context/SecurityContext.ts";


export function HomePage() {
    const {roles} = useContext(SecurityContext)

    return (
        <div className="flex flex-col">
            <BackButton backAction={null}/>
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton/>
            </div>
            <main className="z-10 flex-grow flex justify-center items-center p-12 gap-x-20">
                {(roles.includes("ADMIN") ? (
                <MenuList menuItems={[
                    {
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
                    },
                    {
                        menuItemName: "Predictions",
                        menuItemLink: "/PredictionPage"
                    },
                ]}
                />
                ) : (
                <MenuList menuItems={[
                    {
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
                    }
                ]}
                />
                ))}

                <SideElements
                    upperElement={
                        <>
                            <h2 className="text-2xl font-bold mb-2">Active Event!</h2>
                            <p className="text-lg">
                                The Fitness Gram Pacer Test is a Test where you run from side to
                                side in a rapid motion until you cant anymore...
                            </p>
                        </>
                    }
                    bottemElement={
                        <>
                            <h2 className="text-2xl font-bold mb-2">Previously Played Game</h2>
                            <p className="text-lg">Game Stats or Details...</p>
                        </>
                    }/>
            </main>
        </div>
    )
}

