import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {HomePage} from './pages/homePage/HomePage'
import {GamePage} from './pages/gamePage/GamePage'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import axios from 'axios'
import {LobbyPage} from "./pages/Lobby/LobbyPage.tsx";
import Achievements from "./pages/Achievements.tsx";
import Settings from "./pages/Settings.tsx";
import {GameSelectorPage} from "./pages/GameSelectorPage/GameSelectorPage.tsx";
import { Background } from './components/background/Background.tsx'


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    <div>
                        <Background color='crimson' />
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/Game' element={<GamePage/>}/>
                            <Route path='/Achievements' element={<Achievements/>}/>
                            <Route path='/Settings' element={<Settings/>}/>
                            <Route path='/Lobby' element={<LobbyPage/>}/>
                            <Route path='/GameSelectorPage' element={<GameSelectorPage/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
