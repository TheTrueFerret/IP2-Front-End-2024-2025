import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { GamePage } from './pages/GamePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import axios from 'axios'
import { LobbyPage } from "./pages/LobbyPage.tsx";
import { AchievementsPage } from "./pages/AchievementsPage.tsx";
import { SettingsPage } from "./pages/SettingsPage.tsx";
import { GameSelectorPage } from "./pages/GameSelectorPage.tsx";
import { Background } from './components/background/Background.tsx'
import { RouteGuard } from './components/RouteGuard.tsx'
import { LobbyCodePage } from './pages/LobbyCodePage.tsx'


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <div className='bg-neutral-900  w-screen h-screen'>
                        <Background color='crimson' />
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/Game' element={<RouteGuard><GamePage /></RouteGuard>} />
                            <Route path='/Achievements' element={<RouteGuard><AchievementsPage /></RouteGuard>} />
                            <Route path='/Settings' element={<RouteGuard><SettingsPage /></RouteGuard>} />
                            <Route path='/GameSelectorPage' element={<RouteGuard><GameSelectorPage /></RouteGuard>} />
                            <Route path='/LobbyCodePage' element={<RouteGuard><LobbyCodePage /></RouteGuard>} />
                            <Route path='/Lobby' element={<RouteGuard><LobbyPage /></RouteGuard>} />
                            <Route path='/Userprofile/:userId' element={<RouteGuard><UserprofilePage/></RouteGuard>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
