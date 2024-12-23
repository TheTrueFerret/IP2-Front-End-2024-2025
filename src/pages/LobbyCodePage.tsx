import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { LobbyCodeInput } from "../components/LobbyCodeInput";
import { LoginButton } from "../components/loginButton/LoginButton";
import { SideElements } from "../components/sideElements/SideElements";


export function LobbyCodePage() {
  const navigate = useNavigate();

  return (
    <div>
      <BackButton backAction={() => navigate('/GameSelectorPage')} />
      <div className='z-20 absolute top-2 right-2'>
        <LoginButton />
      </div>
      <main className="z-20 flex-grow flex justify-center items-center p-12 gap-x-20">
        <div className='z-20'>
          <LobbyCodeInput />
        </div>
        <SideElements
          upperElement={
            <>
              <h2 className="text-2xl font-bold mb-2">Put in the Game Code from your Friends Lobby</h2>
              <p className="text-lg">More Info</p>
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