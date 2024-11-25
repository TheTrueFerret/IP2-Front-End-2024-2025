import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/homePage/HomePage'
import { GamePage } from './pages/gamePage/GamePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Game' element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
