import {Background} from "../../components/background/Background.tsx";
import {MenuList} from "../../components/menuList/MenuList.tsx";

export function GameSelectorPage() {

    return (<>
            <Background color={"crimson"}/>
            <div
                className="bg-gradient-to-br bg-neutral-900 w-screen h-screen text-black flex flex-col p-6 justify-items-center">
                <div className="grid grid-cols-2 gap-6 place-self-center justify-center">
                <MenuList menuItems={[{
                    menuItemName: "Find Game",
                    menuItemLink: "/Games",
                },
                {
                    menuItemName: "Join Friends",
                    menuItemLink: "/FriendGames",
                },
                {
                    menuItemName: "Create Game",
                    menuItemLink: "/Lobby",
                }]}></MenuList>
            </div>

            </div>
        </>
    );
}
