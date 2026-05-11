import { Bot, Activity, Shield, AlertTriangle, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react'
import type { Page } from '../App'

interface Props {
  onNavigate: (page: Page) => void
}

const metrics = [
  { label: 'Agentes Ativos', value: '12', change: '+2 esta semana', icon: <Bot size={20} />, color: 'bg-blue-50 text-blue-700' },
  { label: 'Execuções Hoje', value: '1.847', change: '+12% vs ontem', icon: <Activity size={20} />, color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Compliance Score', value: '98.2%', change: 'LGPD + HIPAA', icon: <Shield size={20} />, color: 'bg-purple-50 text-purple-700' },
  { label: 'Alertas Gerados', value: '23', change: '3 críticos', icon: <AlertTriangle size={20} />, color: 'bg-amber-50 text-amber-700' },
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

export function Dashboard({ onNavigate }: Props) {
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${m.color}`}>
                {m.icon}
              </span>
              <TrendingUp size={14} className="text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-500 mt-1">{m.label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{m.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Agent Status */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Status dos Agentes</h3>
            <button onClick={() => onNavigate('catalogo')} className="text-xs text-blue-600 hover:underline cursor-pointer">
              Ver catálogo completo →
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {agentStatus.map((agent) => (
              <div key={agent.name} className="px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusBadge status={agent.status} />
                  <span className="text-sm font-medium text-gray-700">{agent.name}</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {agent.executions} exec
                  </span>
                  {agent.accuracy > 0 && (
                    <span className="font-medium text-gray-700">{agent.accuracy}% acc</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Alertas Recentes</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="px-6 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium ${
                    alert.severity === 'critical' ? 'text-red-600' :
                    alert.severity === 'warning' ? 'text-amber-600' : 'text-blue-600'
                  }`}>
                    {alert.type}
                  </span>
                  <span className="text-[11px] text-gray-400">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-500">{alert.patient}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Arquitetura da Plataforma</h3>
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Fontes de Dados', desc: 'Prontuários, Sinais Vitais, Labs', color: 'border-blue-200 bg-blue-50' },
            { label: 'Ingestão & ETL', desc: 'Databricks + Streaming', color: 'border-purple-200 bg-purple-50' },
            { label: 'Agentes IA', desc: 'Amazon Bedrock Agents', color: 'border-cyan-200 bg-cyan-50' },
            { label: 'Orquestração', desc: 'Multi-Agent Workflow', color: 'border-emerald-200 bg-emerald-50' },
            { label: 'Governança', desc: 'Auditoria, LGPD, Guardrails', color: 'border-amber-200 bg-amber-50' },
          ].map((block) => (
            <div key={block.label} className={`border rounded-lg p-4 text-center ${block.color}`}>
              <p className="text-sm font-semibold text-gray-800">{block.label}</p>
              <p className="text-[11px] text-gray-600 mt-1">{block.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-3">
          <p className="text-[11px] text-gray-400">← Fluxo de dados end-to-end →</p>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'running') return (
    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
      <CheckCircle2 size={10} /> Ativo
    </span>
  )
  if (status === 'error') return (
    <span className="flex items-center gap-1 text-[11px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
      <XCircle size={10} /> Erro
    </span>
  )
  return (
    <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
      <Clock size={10} /> Idle
    </span>
  )
}
