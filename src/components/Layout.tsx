import type { ReactNode } from 'react'
import { LayoutDashboard, Bot, FileText, GitBranch, Shield, TrendingUp, Activity, Cloud, Sparkles } from 'lucide-react'
import type { Page } from '../App'

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
  return (
    <div className="flex h-screen overflow-hidden bg-mesh">
      {/* Sidebar - Glassmorphism */}
      <aside className="w-64 glass flex flex-col shrink-0 border-r border-white/5">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img src="/logo-rededor.png" alt="Rede D'Or" className="h-8 brightness-110" />
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <Sparkles size={10} className="text-[#c9a84c]" />
            <p className="text-[10px] text-[#c9a84c] font-medium tracking-widest uppercase">Plataforma de IA Agêntica</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-300 cursor-pointer group ${
                currentPage === item.id
                  ? 'bg-[#c9a84c]/15 text-[#c9a84c] font-medium glow-gold'
                  : 'text-white/40 hover:text-white/90 hover:bg-white/5'
              }`}
            >
              <span className={`transition-transform duration-300 ${currentPage === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {item.label}
              {currentPage === item.id && (
                <span className="ml-auto w-1.5 h-1.5 bg-[#c9a84c] rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="glass-light rounded-xl p-3 text-center">
            <p className="text-[9px] text-white/30 uppercase tracking-widest">Powered by</p>
            <p className="text-[11px] font-semibold text-white/60 mt-0.5">dataRain</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="glass sticky top-0 z-10 px-8 py-3 flex items-center justify-between border-b border-white/5">
          <div>
            <h2 className="text-base font-semibold text-white/90">
              {nav.find(n => n.id === currentPage)?.label}
            </h2>
            <p className="text-[11px] text-white/30">Rede D'Or São Luiz — Fábrica de IA Agêntica</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-light rounded-full text-xs font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Operacional
            </span>
          </div>
        </header>
        <div className="p-8">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
