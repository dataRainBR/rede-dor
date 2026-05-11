import { useState, createContext, useContext } from 'react'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Catalogo } from './pages/Catalogo'
import { Prontuario } from './pages/Prontuario'
import { Orquestracao } from './pages/Orquestracao'
import { Governanca } from './pages/Governanca'
import { ROI } from './pages/ROI'
import { SinaisVitais } from './pages/SinaisVitais'
import { Arquitetura } from './pages/Arquitetura'

export type Page = 'dashboard' | 'catalogo' | 'prontuario' | 'orquestracao' | 'governanca' | 'roi' | 'sinais' | 'arquitetura'

interface DarkModeContextType {
  dark: boolean
  toggle: () => void
}

export const DarkModeContext = createContext<DarkModeContextType>({ dark: false, toggle: () => {} })
export const useDarkMode = () => useContext(DarkModeContext)

function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [dark, setDark] = useState(false)

  const toggle = () => setDark(prev => !prev)

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />
      case 'catalogo': return <Catalogo />
      case 'prontuario': return <Prontuario />
      case 'orquestracao': return <Orquestracao />
      case 'governanca': return <Governanca />
      case 'roi': return <ROI />
      case 'sinais': return <SinaisVitais />
      case 'arquitetura': return <Arquitetura />
    }
  }

  return (
    <DarkModeContext.Provider value={{ dark, toggle }}>
      <div className={dark ? 'dark' : ''}>
        <Layout currentPage={page} onNavigate={setPage}>
          {renderPage()}
        </Layout>
      </div>
    </DarkModeContext.Provider>
  )
}

export default App
