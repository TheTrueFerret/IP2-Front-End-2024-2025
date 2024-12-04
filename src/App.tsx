import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import {HomePage} from './pages/homePage/HomePage'
import {GamePage} from './pages/gamePage/GamePage'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import Authorization from "./components/Authorization/Authorization.tsx";
import axios from 'axios'
import {LobbyPage} from "./pages/Lobby/LobbyPage.tsx";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const queryClient = new QueryClient();


function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <ReactQueryDevtools initialIsOpen={false}/>
                    <div>
                        <Authorization/>
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/Game' element={<GamePage/>}/>
                            <Route path='/Lobby' element={<LobbyPage/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
