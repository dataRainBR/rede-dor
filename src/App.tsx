import { useState } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './pages/Hero'
import { Dashboard } from './pages/Dashboard'
import { Catalogo } from './pages/Catalogo'
import { Prontuario } from './pages/Prontuario'
import { Orquestracao } from './pages/Orquestracao'
import { Governanca } from './pages/Governanca'
import { ROI } from './pages/ROI'
import { SinaisVitais } from './pages/SinaisVitais'
import { Arquitetura } from './pages/Arquitetura'

export type Page = 'hero' | 'dashboard' | 'catalogo' | 'prontuario' | 'orquestracao' | 'governanca' | 'roi' | 'sinais' | 'arquitetura'

function App() {
  const [page, setPage] = useState<Page>('hero')

  if (page === 'hero') {
    return <Hero onEnter={setPage} />
  }

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
    <Layout currentPage={page} onNavigate={setPage}>
      {renderPage()}
    </Layout>
  )
}

export default App
