import { useNavigate } from "react-router-dom";
import { LoginButton } from "../components/loginButton/LoginButton";
import { MenuList } from "../components/menuList/MenuList";
import { SideElements } from "../components/sideElements/SideElements";
import { useLobbyId } from "../hooks/useLobbyId";
import { BackButton } from "../components/BackButton";

export function GameSelectorPage() {
    const navigate = useNavigate();
    const { createLobby } = useLobbyId();

    const handleCreateGame = async () => {
        try {
            await createLobby();
            navigate("/Lobby");
        } catch (error) {
            console.error("Failed to create a lobby:", error);
        }
    };

    return (
        <div className="flex flex-col">
            <BackButton backAction={() => navigate('/')} />
            <div className='z-20 absolute top-2 right-2'>
                <LoginButton />
            </div>
            <main className="z-10 flex-grow flex justify-center items-center p-12 gap-x-20">
                <MenuList menuItems={[{
                    menuItemName: "Find Game",
                    menuItemLink: "/Game",
                },
                {
                    menuItemName: "Join Friends",
                    menuItemLink: "/LobbyCodePage",
                },
                {
                    menuItemName: "Create Game",
                    menuItemLink: "#",
                    menuItemAction: handleCreateGame,
                },
                ]}
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
    );
}
