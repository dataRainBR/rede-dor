import { useState, useEffect } from 'react'
import { GitBranch, Bot, ArrowDown, Database, Bell, Shield, Zap } from 'lucide-react'

interface WorkflowNode {
  id: string
  label: string
  type: 'source' | 'agent' | 'decision' | 'output'
  description: string
}

const workflows = [
  {
    name: 'Alerta de Deterioração Clínica',
    description: 'Pipeline principal: monitoramento contínuo → análise → alerta',
    trigger: 'A cada 15 min ou evento de sinais vitais',
    sla: '< 30 segundos end-to-end',
    nodes: [
      { id: '1', label: 'Sinais Vitais (Stream)', type: 'source' as const, description: 'Dados em tempo real dos monitores' },
      { id: '2', label: 'Extrator de Prontuário', type: 'agent' as const, description: 'Contextualiza com histórico do paciente' },
      { id: '3', label: 'Análise de Risco', type: 'agent' as const, description: 'Score de deterioração (0-10)' },
      { id: '4', label: 'Score ≥ 7?', type: 'decision' as const, description: 'Threshold para alerta' },
      { id: '5', label: 'Gerador de Alertas', type: 'agent' as const, description: 'Alerta contextualizado + recomendações' },
      { id: '6', label: 'Notificação Equipe', type: 'output' as const, description: 'Push + painel + registro' },
    ]
  },
  {
    name: 'Sumarização de Handoff',
    description: 'Gera resumo clínico para troca de plantão',
    trigger: 'Agendado: 06:30 e 18:30',
    sla: '< 2 minutos por paciente',
    nodes: [
      { id: '1', label: 'Prontuário Completo', type: 'source' as const, description: 'Últimas 12h de evolução' },
      { id: '2', label: 'Extrator de Prontuário', type: 'agent' as const, description: 'Extrai eventos relevantes' },
      { id: '3', label: 'Sumarizador', type: 'agent' as const, description: 'Resume em linguagem clara' },
      { id: '4', label: 'Relatório de Handoff', type: 'output' as const, description: 'PDF + integração Tasy' },
    ]
  },
  {
    name: 'Validação de Prescrição',
    description: 'Verifica interações e doses antes da dispensação',
    trigger: 'A cada nova prescrição',
    sla: '< 10 segundos',
    nodes: [
      { id: '1', label: 'Nova Prescrição', type: 'source' as const, description: 'Evento do sistema de prescrição' },
      { id: '2', label: 'Classificador de Medicações', type: 'agent' as const, description: 'Identifica drogas e doses' },
      { id: '3', label: 'Interação detectada?', type: 'decision' as const, description: 'Verifica base Anvisa' },
      { id: '4', label: 'Alerta Farmácia', type: 'output' as const, description: 'Notifica farmacêutico' },
    ]
  }
]

export function Orquestracao() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0)
  const [activeNode, setActiveNode] = useState(0)
  const wf = workflows[selectedWorkflow]

  // Animate through nodes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % wf.nodes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [selectedWorkflow, wf.nodes.length])

  useEffect(() => {
    setActiveNode(0)
  }, [selectedWorkflow])

  return (
    <div className="space-y-6">
      {/* Workflow Selector */}
      <div className="grid grid-cols-3 gap-4">
        {workflows.map((w, i) => (
          <button
            key={i}
            onClick={() => setSelectedWorkflow(i)}
            className={`text-left glass-card rounded-2xl border p-5 transition-all cursor-pointer ${
              selectedWorkflow === i ? 'border-[#c9a84c] shadow-md ring-1 ring-[#c9a84c]/30' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <GitBranch size={16} className={selectedWorkflow === i ? 'text-[#c9a84c]' : 'text-white/30'} />
              <h4 className="font-medium text-sm text-white/90">{w.name}</h4>
            </div>
            <p className="text-xs text-white/50">{w.description}</p>
            <div className="flex items-center gap-3 mt-3 text-[10px] text-white/30">
              <span className="flex items-center gap-1"><Zap size={9} />{w.trigger}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Workflow Detail */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 glass-card rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white/90">{wf.name}</h3>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-medium">
              SLA: {wf.sla}
            </span>
          </div>

          {/* Animated Flow */}
          <div className="flex flex-col items-center gap-1">
            {wf.nodes.map((node, i) => (
              <div key={node.id} className="w-full max-w-md">
                <NodeCard node={node} isActive={i === activeNode} isPast={i < activeNode} />
                {i < wf.nodes.length - 1 && (
                  <div className="flex justify-center py-1 relative">
                    <ArrowDown size={16} className={`transition-colors duration-300 ${i < activeNode ? 'text-[#c9a84c]' : 'text-white/30'}`} />
                    {i === activeNode && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c9a84c] rounded-full animate-ping" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl border border-white/10 p-5">
            <h4 className="font-semibold text-white/90 text-sm mb-3">Configuração</h4>
            <div className="space-y-3 text-xs">
              <DetailRow label="Trigger" value={wf.trigger} />
              <DetailRow label="SLA" value={wf.sla} />
              <DetailRow label="Agentes" value={String(wf.nodes.filter(n => n.type === 'agent').length)} />
              <DetailRow label="Retry Policy" value="3x com backoff" />
              <DetailRow label="Fallback" value="Alerta manual" />
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/10 p-5">
            <h4 className="font-semibold text-white/90 text-sm mb-3">Guardrails Ativos</h4>
            <div className="space-y-2">
              {[
                'Dados anonimizados entre agentes',
                'Timeout máximo: 30s por agente',
                'Log completo de decisões',
                'Validação humana para score ≥ 9',
                'Rate limit: 100 exec/min',
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                  <Shield size={11} className="text-emerald-500 shrink-0" />
                  {g}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-white/10 p-5">
            <h4 className="font-semibold text-white/90 text-sm mb-3">Métricas (24h)</h4>
            <div className="space-y-3 text-xs">
              <MetricBar label="Execuções" value="1.847" pct={85} />
              <MetricBar label="Sucesso" value="99.2%" pct={99} />
              <MetricBar label="Latência p95" value="12.4s" pct={42} />
              <MetricBar label="Alertas gerados" value="23" pct={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NodeCard({ node, isActive, isPast }: { node: WorkflowNode; isActive: boolean; isPast: boolean }) {
  const styles = {
    source: { icon: <Database size={16} />, bg: 'bg-purple-500/10 border-purple-500/20', iconColor: 'text-purple-400' },
    agent: { icon: <Bot size={16} />, bg: 'bg-blue-500/10 border-blue-500/20', iconColor: 'text-blue-400' },
    decision: { icon: <GitBranch size={16} />, bg: 'bg-amber-500/10 border-amber-500/20', iconColor: 'text-amber-400' },
    output: { icon: <Bell size={16} />, bg: 'bg-emerald-500/10 border-emerald-500/20', iconColor: 'text-emerald-400' },
  }
  const s = styles[node.type]

  return (
    <div className={`border rounded-lg p-4 flex items-center gap-3 transition-all duration-500 ${s.bg} ${
      isActive ? 'ring-2 ring-[#c9a84c] shadow-lg scale-[1.02]' :
      isPast ? 'opacity-60' : ''
    }`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.05] ${s.iconColor} relative`}>
        {s.icon}
        {isActive && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#c9a84c] rounded-full animate-pulse" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white/90">{node.label}</p>
        <p className="text-[11px] text-white/50">{node.description}</p>
      </div>
      {isActive && (
        <span className="text-[9px] font-bold text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-full animate-pulse">
          PROCESSANDO
        </span>
      )}
      {isPast && (
        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          OK
        </span>
      )}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-white/5">
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white/70 text-right">{value}</span>
    </div>
  )
}

function MetricBar({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-white/50">{label}</span>
        <span className="font-medium text-white/70">{value}</span>
      </div>
      <div className="h-1.5 bg-white/[0.02] rounded-full overflow-hidden">
        <div className="h-full bg-[#c9a84c] rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
