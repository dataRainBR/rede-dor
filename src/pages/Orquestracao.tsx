import { useState } from 'react'
import { GitBranch, Bot, ArrowDown, Database, Bell, Shield, Zap } from 'lucide-react'

interface WorkflowNode {
  id: string
  label: string
  type: 'source' | 'agent' | 'decision' | 'output'
  description: string
  status?: 'active' | 'idle'
}

const workflows = [
  {
    name: 'Alerta de Deterioração Clínica',
    description: 'Pipeline principal: monitoramento contínuo → análise → alerta',
    trigger: 'A cada 15 min ou evento de sinais vitais',
    sla: '< 30 segundos end-to-end',
    nodes: [
      { id: '1', label: 'Sinais Vitais (Stream)', type: 'source' as const, description: 'Dados em tempo real dos monitores', status: 'active' as const },
      { id: '2', label: 'Extrator de Prontuário', type: 'agent' as const, description: 'Contextualiza com histórico do paciente', status: 'active' as const },
      { id: '3', label: 'Análise de Risco', type: 'agent' as const, description: 'Score de deterioração (0-10)', status: 'active' as const },
      { id: '4', label: 'Score ≥ 7?', type: 'decision' as const, description: 'Threshold para alerta', status: 'active' as const },
      { id: '5', label: 'Gerador de Alertas', type: 'agent' as const, description: 'Alerta contextualizado + recomendações', status: 'active' as const },
      { id: '6', label: 'Notificação Equipe', type: 'output' as const, description: 'Push + painel + registro', status: 'active' as const },
    ]
  },
  {
    name: 'Sumarização de Handoff',
    description: 'Gera resumo clínico para troca de plantão',
    trigger: 'Agendado: 06:30 e 18:30',
    sla: '< 2 minutos por paciente',
    nodes: [
      { id: '1', label: 'Prontuário Completo', type: 'source' as const, description: 'Últimas 12h de evolução', status: 'idle' as const },
      { id: '2', label: 'Extrator de Prontuário', type: 'agent' as const, description: 'Extrai eventos relevantes', status: 'idle' as const },
      { id: '3', label: 'Sumarizador', type: 'agent' as const, description: 'Resume em linguagem clara', status: 'idle' as const },
      { id: '4', label: 'Relatório de Handoff', type: 'output' as const, description: 'PDF + integração Tasy', status: 'idle' as const },
    ]
  },
  {
    name: 'Validação de Prescrição',
    description: 'Verifica interações e doses antes da dispensação',
    trigger: 'A cada nova prescrição',
    sla: '< 10 segundos',
    nodes: [
      { id: '1', label: 'Nova Prescrição', type: 'source' as const, description: 'Evento do sistema de prescrição', status: 'idle' as const },
      { id: '2', label: 'Classificador de Medicações', type: 'agent' as const, description: 'Identifica drogas e doses', status: 'idle' as const },
      { id: '3', label: 'Interação detectada?', type: 'decision' as const, description: 'Verifica base Anvisa', status: 'idle' as const },
      { id: '4', label: 'Alerta Farmácia', type: 'output' as const, description: 'Notifica farmacêutico', status: 'idle' as const },
    ]
  }
]

export function Orquestracao() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(0)
  const wf = workflows[selectedWorkflow]

  return (
    <div className="space-y-6">
      {/* Workflow Selector */}
      <div className="grid grid-cols-3 gap-4">
        {workflows.map((w, i) => (
          <button
            key={i}
            onClick={() => setSelectedWorkflow(i)}
            className={`text-left bg-white rounded-xl border p-5 transition-all cursor-pointer ${
              selectedWorkflow === i ? 'border-blue-300 shadow-md' : 'border-gray-100 shadow-sm hover:border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <GitBranch size={16} className={selectedWorkflow === i ? 'text-blue-600' : 'text-gray-400'} />
              <h4 className="font-medium text-sm text-gray-800">{w.name}</h4>
            </div>
            <p className="text-xs text-gray-500">{w.description}</p>
            <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><Zap size={9} />{w.trigger}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Workflow Detail */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800">{wf.name}</h3>
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
              SLA: {wf.sla}
            </span>
          </div>

          {/* Flow Visualization */}
          <div className="flex flex-col items-center gap-2">
            {wf.nodes.map((node, i) => (
              <div key={node.id} className="w-full max-w-md">
                <NodeCard node={node} />
                {i < wf.nodes.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown size={16} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Metadata */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Configuração</h4>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">Trigger</span>
                <span className="font-medium text-gray-700 text-right">{wf.trigger}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">SLA</span>
                <span className="font-medium text-gray-700">{wf.sla}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">Agentes</span>
                <span className="font-medium text-gray-700">{wf.nodes.filter(n => n.type === 'agent').length}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">Retry Policy</span>
                <span className="font-medium text-gray-700">3x com backoff</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">Fallback</span>
                <span className="font-medium text-gray-700">Alerta manual</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Guardrails Ativos</h4>
            <div className="space-y-2">
              {[
                'Dados anonimizados entre agentes',
                'Timeout máximo: 30s por agente',
                'Log completo de decisões',
                'Validação humana para score ≥ 9',
                'Rate limit: 100 exec/min',
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <Shield size={11} className="text-emerald-500 shrink-0" />
                  {g}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h4 className="font-semibold text-gray-800 text-sm mb-3">Métricas (24h)</h4>
            <div className="space-y-2 text-xs">
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

function NodeCard({ node }: { node: WorkflowNode }) {
  const styles = {
    source: { icon: <Database size={16} />, bg: 'bg-purple-50 border-purple-200', iconColor: 'text-purple-600' },
    agent: { icon: <Bot size={16} />, bg: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600' },
    decision: { icon: <GitBranch size={16} />, bg: 'bg-amber-50 border-amber-200', iconColor: 'text-amber-600' },
    output: { icon: <Bell size={16} />, bg: 'bg-emerald-50 border-emerald-200', iconColor: 'text-emerald-600' },
  }
  const s = styles[node.type]

  return (
    <div className={`border rounded-lg p-4 flex items-center gap-3 ${s.bg}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/80 ${s.iconColor}`}>
        {s.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{node.label}</p>
        <p className="text-[11px] text-gray-500">{node.description}</p>
      </div>
      {node.status === 'active' && (
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      )}
    </div>
  )
}

function MetricBar({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium text-gray-700">{value}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
