import type { ReactNode } from 'react'
import { LayoutDashboard, Bot, FileText, GitBranch, Shield, TrendingUp, Activity, Cloud, Moon, Sun } from 'lucide-react'
import type { Page } from '../App'
import { useDarkMode } from '../App'

const nav: { id: Page; label: string; icon: ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'catalogo', label: 'Catálogo de Agentes', icon: <Bot size={18} /> },
  { id: 'prontuario', label: 'Análise de Prontuário', icon: <FileText size={18} /> },
  { id: 'sinais', label: 'Sinais Vitais', icon: <Activity size={18} /> },
  { id: 'orquestracao', label: 'Orquestração', icon: <GitBranch size={18} /> },
  { id: 'arquitetura', label: 'Arquitetura AWS', icon: <Cloud size={18} /> },
  { id: 'governanca', label: 'Governança', icon: <Shield size={18} /> },
  { id: 'roi', label: 'ROI & Business Case', icon: <TrendingUp size={18} /> },
]

interface Props {
  children: ReactNode
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Layout({ children, currentPage, onNavigate }: Props) {
  const { dark, toggle } = useDarkMode()

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#1a2332] to-[#0f1720] text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo-rededor.png" alt="Rede D'Or" className="h-8" />
          </div>
          <p className="text-[10px] text-[#c9a84c]/80 mt-2 font-medium tracking-wide uppercase">Plataforma de IA Agêntica</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all cursor-pointer ${
                currentPage === item.id
                  ? 'bg-[#c9a84c]/20 text-[#c9a84c] font-medium'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/90'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-[9px] text-[#c9a84c]/50 uppercase tracking-wider mb-1">Powered by</p>
            <p className="text-[11px] font-medium text-white/70">Amazon Bedrock + Databricks</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-3 flex items-center justify-between sticky top-0 z-10 transition-colors duration-300">
          <div>
            <h2 className="text-base font-semibold text-gray-800 dark:text-white">
              {nav.find(n => n.id === currentPage)?.label}
            </h2>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Rede D'Or São Luiz — Fábrica de IA Agêntica</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              title={dark ? 'Modo claro' : 'Modo escuro'}
            >
              {dark ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-gray-500" />}
            </button>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Operacional
            </span>
          </div>
        </header>
        <div className="p-8 transition-all duration-300">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
