import { useState } from 'react'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Catalogo } from './pages/Catalogo'
import { Prontuario } from './pages/Prontuario'
import { Orquestracao } from './pages/Orquestracao'
import { Governanca } from './pages/Governanca'

export type Page = 'dashboard' | 'catalogo' | 'prontuario' | 'orquestracao' | 'governanca'

function App() {
  const [page, setPage] = useState<Page>('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard onNavigate={setPage} />
      case 'catalogo': return <Catalogo />
      case 'prontuario': return <Prontuario />
      case 'orquestracao': return <Orquestracao />
      case 'governanca': return <Governanca />
    }
  }

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {renderPage()}
    </Layout>
  )
}

export default App
