import { useEffect, useState, useRef } from 'react'
import { Bot, Activity, Shield, AlertTriangle, Clock, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react'
import type { Page } from '../App'

interface Props {
  onNavigate: (page: Page) => void
}

const metrics = [
  { label: 'Agentes Ativos', value: 12, suffix: '', icon: <Bot size={20} />, color: 'from-blue-500/20 to-blue-600/5', iconColor: 'text-blue-400', change: '+2 esta semana' },
  { label: 'Execuções Hoje', value: 1847, suffix: '', icon: <Activity size={20} />, color: 'from-emerald-500/20 to-emerald-600/5', iconColor: 'text-emerald-400', change: '+12% vs ontem' },
  { label: 'Compliance', value: 98.2, suffix: '%', icon: <Shield size={20} />, color: 'from-purple-500/20 to-purple-600/5', iconColor: 'text-purple-400', change: 'LGPD + HIPAA' },
  { label: 'Alertas Gerados', value: 23, suffix: '', icon: <AlertTriangle size={20} />, color: 'from-amber-500/20 to-amber-600/5', iconColor: 'text-amber-400', change: '3 críticos' },
]

const agentStatus = [
  { name: 'Extrator de Prontuário', status: 'running', executions: 423, accuracy: 97.8 },
  { name: 'Análise de Risco Clínico', status: 'running', executions: 389, accuracy: 95.2 },
  { name: 'Gerador de Alertas', status: 'running', executions: 156, accuracy: 99.1 },
  { name: 'Sumarizador de Evolução', status: 'idle', executions: 87, accuracy: 94.5 },
  { name: 'Classificador de Medicações', status: 'running', executions: 612, accuracy: 98.7 },
  { name: 'Preditor de Deterioração', status: 'error', executions: 0, accuracy: 0 },
]

const recentAlerts = [
  { time: '09:42', patient: 'Leito 412-A', type: 'Risco de deterioração', severity: 'critical' },
  { time: '09:38', patient: 'Leito 208-B', type: 'Alteração sinais vitais', severity: 'warning' },
  { time: '09:15', patient: 'Leito 315-C', type: 'Interação medicamentosa', severity: 'warning' },
  { time: '08:57', patient: 'Leito 102-A', type: 'Risco de deterioração', severity: 'critical' },
  { time: '08:30', patient: 'Leito 507-D', type: 'Evolução atípica', severity: 'info' },
]

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const duration = 1500
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(value * eased * 10) / 10)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [value])

  return <span ref={ref}>{display % 1 === 0 ? Math.round(display).toLocaleString() : display.toFixed(1)}{suffix}</span>
}

export function Dashboard({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Metrics - Bento style */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <div key={m.label} className={`glass-card rounded-2xl p-5 animate-fade-up stagger-${i + 1}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} ${m.iconColor}`}>
                {m.icon}
              </span>
              <ArrowUpRight size={14} className="text-white/20" />
            </div>
            <p className="text-3xl font-bold text-white glow-text animate-count">
              <AnimatedNumber value={m.value} suffix={m.suffix} />
            </p>
            <p className="text-xs text-white/50 mt-1">{m.label}</p>
            <p className="text-[10px] text-[#c9a84c]/60 mt-1">{m.change}</p>
          </div>
        ))}
      </div>

      {/* Main content - Bento grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Agent Status - Large card */}
        <div className="col-span-7 glass-card rounded-2xl animate-fade-up stagger-5">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white/90 text-sm">Status dos Agentes</h3>
            <button onClick={() => onNavigate('catalogo')} className="text-[11px] text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors cursor-pointer flex items-center gap-1">
              Ver todos <ArrowUpRight size={10} />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {agentStatus.map((agent) => (
              <div key={agent.name} className="px-6 py-3 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <StatusBadge status={agent.status} />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">{agent.name}</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {agent.executions}
                  </span>
                  {agent.accuracy > 0 && (
                    <span className="text-white/50">{agent.accuracy}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts - Side card */}
        <div className="col-span-5 glass-card rounded-2xl animate-fade-up stagger-6">
          <div className="px-6 py-4 border-b border-white/5">
            <h3 className="font-semibold text-white/90 text-sm">Alertas Recentes</h3>
          </div>
          <div className="divide-y divide-white/5">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="px-6 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium ${
                    alert.severity === 'critical' ? 'text-red-400' :
                    alert.severity === 'warning' ? 'text-amber-400' : 'text-blue-400'
                  }`}>
                    {alert.severity === 'critical' && <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mr-1" />}{alert.type}
                  </span>
                  <span className="text-[10px] text-white/20 font-mono">{alert.time}</span>
                </div>
                <p className="text-[11px] text-white/40">{alert.patient}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture mini - Full width */}
        <div className="col-span-12 glass-card rounded-2xl p-6 animate-fade-up stagger-7">
          <h3 className="font-semibold text-white/90 text-sm mb-5">Arquitetura da Plataforma</h3>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: 'Fontes de Dados', desc: 'Prontuários, Sinais Vitais, Labs', color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20' },
              { label: 'Ingestão & ETL', desc: 'Databricks + Streaming', color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20' },
              { label: 'Agentes IA', desc: 'Amazon Bedrock Agents', color: 'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20' },
              { label: 'Orquestração', desc: 'Multi-Agent Workflow', color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20' },
              { label: 'Governança', desc: 'Auditoria, LGPD, Guardrails', color: 'from-amber-500/10 to-amber-600/5 border-amber-500/20' },
            ].map((block) => (
              <div key={block.label} className={`bg-gradient-to-br ${block.color} border rounded-xl p-4 text-center hover:scale-[1.02] transition-transform cursor-default`}>
                <p className="text-xs font-semibold text-white/80">{block.label}</p>
                <p className="text-[10px] text-white/40 mt-1">{block.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 text-[10px] text-white/20">
              <span className="w-8 h-px bg-gradient-to-r from-transparent to-white/20" />
              Fluxo de dados end-to-end
              <span className="w-8 h-px bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'running') return (
    <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
      <CheckCircle2 size={9} /> Ativo
    </span>
  )
  if (status === 'error') return (
    <span className="flex items-center gap-1 text-[10px] font-medium text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
      <XCircle size={9} /> Erro
    </span>
  )
  return (
    <span className="flex items-center gap-1 text-[10px] font-medium text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
      <Clock size={9} /> Idle
    </span>
  )
}
