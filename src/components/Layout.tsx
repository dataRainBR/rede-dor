import type { ReactNode } from 'react'
import { LayoutDashboard, Bot, FileText, GitBranch, Shield } from 'lucide-react'
import type { Page } from '../App'

const nav: { id: Page; label: string; icon: ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'catalogo', label: 'Catálogo de Agentes', icon: <Bot size={20} /> },
  { id: 'prontuario', label: 'Análise de Prontuário', icon: <FileText size={20} /> },
  { id: 'orquestracao', label: 'Orquestração', icon: <GitBranch size={20} /> },
  { id: 'governanca', label: 'Governança', icon: <Shield size={20} /> },
]

interface Props {
  children: ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Layout({ children, currentPage, onNavigate }: Props) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#1a2332] to-[#0f1720] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo-rededor.png" alt="Rede D'Or" className="h-9" />
          </div>
          <p className="text-[11px] text-[#c9a84c]/80 mt-2 font-medium">Plataforma de IA Agêntica</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                currentPage === item.id
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c] font-medium shadow-sm'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-[10px] text-[#c9a84c]/60 uppercase tracking-wider mb-1">Powered by</p>
            <p className="text-xs font-medium text-white/80">Amazon Bedrock + Databricks</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {nav.find(n => n.id === currentPage)?.label}
            </h2>
            <p className="text-xs text-gray-500">Rede D'Or São Luiz — Fábrica de IA Agêntica</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Sistema Operacional
            </span>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
