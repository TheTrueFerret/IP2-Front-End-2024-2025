import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/homePage/HomePage'
import { GamePage } from './pages/gamePage/GamePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import axios from 'axios'
import { LobbyPage } from "./pages/Lobby/LobbyPage.tsx";
import Achievements from "./pages/Achievements.tsx";
import Settings from "./pages/Settings.tsx";
import {UserProfile} from "./pages/userProfile/Userprofile.tsx";
import { GameSelectorPage } from "./pages/GameSelectorPage/GameSelectorPage.tsx";
import { Background } from './components/background/Background.tsx'
import { RouteGuard } from './components/RouteGuard.tsx'


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <div className='bg-neutral-900 w-screen h-screen'>
                        <Background color='crimson' />
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/Game' element={<RouteGuard><GamePage /></RouteGuard>} />
                            <Route path='/Achievements' element={<RouteGuard><Achievements /></RouteGuard>} />
                            <Route path='/Settings' element={<RouteGuard><Settings /></RouteGuard>} />
                            <Route path='/GameSelectorPage' element={<RouteGuard><GameSelectorPage /></RouteGuard>} />
                            <Route path='/Lobby' element={<RouteGuard><LobbyPage /></RouteGuard>} />
                            <Route path='/UserProfile/:userId' element={<UserProfile/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
