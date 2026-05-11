import { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, Bot, Shield, Activity, Brain } from 'lucide-react'
import type { Page } from '../App'

interface Props {
  onEnter: (page: Page) => void
}

export function Hero({ onEnter }: Props) {
  const [visible, setVisible] = useState(false)
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([])

  useEffect(() => {
    setVisible(true)
    setParticles(
      Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#060a14] flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/3 rounded-full blur-[150px]" />

        {/* Particles */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#c9a84c] animate-float opacity-20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${3 + p.delay}s`,
            }}
          />
        ))}

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center max-w-3xl px-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <img src="/logo-rededor.png" alt="Rede D'Or" className="h-14 mx-auto mb-6 drop-shadow-2xl" />
        </div>

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 glass-light rounded-full mb-6 transition-all duration-1000 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Sparkles size={12} className="text-[#c9a84c]" />
          <span className="text-[11px] text-[#c9a84c] font-medium tracking-wider uppercase">Demonstração Conceitual</span>
        </div>

        {/* Title */}
        <h1 className={`text-5xl font-bold text-white mb-4 leading-tight transition-all duration-1000 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Fábrica de{' '}
          <span className="bg-gradient-to-r from-[#c9a84c] via-[#e0c068] to-[#c9a84c] bg-clip-text text-transparent">
            IA Agêntica
          </span>
        </h1>

        <p className={`text-lg text-white/50 mb-3 transition-all duration-1000 delay-900 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          Governança, Orquestração e Monitoramento de Agentes de IA
        </p>
        <p className={`text-sm text-white/30 mb-10 transition-all duration-1000 delay-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          Plataforma centralizada para análise clínica, prontuários e acompanhamento de pacientes
        </p>

        {/* CTA */}
        <div className={`transition-all duration-1000 delay-[1200ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => onEnter('dashboard')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c9a84c] to-[#b8962e] text-[#0a0e1a] rounded-2xl font-semibold text-sm hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500 hover:scale-105 cursor-pointer"
          >
            Explorar Plataforma
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature pills */}
        <div className={`flex items-center justify-center gap-4 mt-12 transition-all duration-1000 delay-[1500ms] ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: <Bot size={14} />, label: '12 Agentes' },
            { icon: <Shield size={14} />, label: 'LGPD Compliant' },
            { icon: <Activity size={14} />, label: 'Real-time' },
            { icon: <Brain size={14} />, label: 'Bedrock + Databricks' },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-2 px-3 py-1.5 glass-light rounded-full">
              <span className="text-[#c9a84c]/70">{f.icon}</span>
              <span className="text-[11px] text-white/40">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
