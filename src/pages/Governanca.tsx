import { useState } from 'react'
import { Shield, Eye, Lock, FileCheck, AlertTriangle, CheckCircle2, Clock, User, Bot, Filter } from 'lucide-react'

const auditLogs = [
  { time: '09:42:18', agent: 'Gerador de Alertas', action: 'Alerta crítico emitido', user: 'Sistema', patient: 'Leito 412-A', status: 'success' },
  { time: '09:42:15', agent: 'Análise de Risco', action: 'Score calculado: 9.2/10', user: 'Sistema', patient: 'Leito 412-A', status: 'success' },
  { time: '09:42:12', agent: 'Extrator de Prontuário', action: 'Dados extraídos (23 campos)', user: 'Sistema', patient: 'Leito 412-A', status: 'success' },
  { time: '09:38:05', agent: 'Análise de Risco', action: 'Score calculado: 6.1/10', user: 'Sistema', patient: 'Leito 208-B', status: 'success' },
  { time: '09:35:22', agent: 'Classificador de Medicações', action: 'Interação detectada: Amiodarona + Warfarina', user: 'Sistema', patient: 'Leito 315-C', status: 'warning' },
  { time: '09:30:00', agent: 'Preditor de Deterioração v2', action: 'Execução falhou: timeout', user: 'Sistema', patient: 'Leito 507-D', status: 'error' },
  { time: '09:28:44', agent: 'Sumarizador de Evolução', action: 'Resumo gerado (handoff noturno)', user: 'Dr. Ricardo', patient: 'Leito 102-A', status: 'success' },
  { time: '09:15:10', agent: 'Extrator de Prontuário', action: 'Acesso negado: dados psiquiátricos', user: 'Sistema', patient: 'Leito 601-B', status: 'blocked' },
]

const permissions = [
  { role: 'Médico Plantonista', agents: ['Extrator', 'Análise de Risco', 'Alertas', 'Sumarizador'], dataAccess: 'Prontuário completo', restrictions: 'Sem acesso a dados de pesquisa' },
  { role: 'Enfermeiro', agents: ['Alertas', 'Sumarizador'], dataAccess: 'Sinais vitais + Medicações', restrictions: 'Sem acesso a notas médicas sigilosas' },
  { role: 'Farmacêutico', agents: ['Classificador de Medicações'], dataAccess: 'Prescrições + Base Anvisa', restrictions: 'Sem acesso a evolução clínica' },
  { role: 'Gestor Operacional', agents: ['Dashboard apenas'], dataAccess: 'Métricas agregadas', restrictions: 'Sem acesso a dados individuais' },
  { role: 'Cientista de Dados', agents: ['Todos (ambiente dev)'], dataAccess: 'Dados anonimizados', restrictions: 'Sem acesso a produção' },
]

const complianceItems = [
  { framework: 'LGPD', status: 'compliant', items: ['Consentimento registrado', 'Dados anonimizados em dev', 'Direito ao esquecimento implementado', 'DPO notificado em incidentes'] },
  { framework: 'CFM 2.314/2022', status: 'compliant', items: ['IA como apoio (não substitui médico)', 'Rastreabilidade de decisões', 'Médico responsável identificado', 'Registro em prontuário'] },
  { framework: 'HIPAA (referência)', status: 'partial', items: ['Criptografia em trânsito e repouso', 'Audit trail completo', 'Acesso mínimo necessário', 'BAA com fornecedores (pendente AWS)'] },
  { framework: 'ISO 27001', status: 'compliant', items: ['Gestão de acessos', 'Monitoramento contínuo', 'Plano de resposta a incidentes', 'Backup e recuperação'] },
]

export function Governanca() {
  const [tab, setTab] = useState<'audit' | 'permissions' | 'compliance'>('audit')

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Eventos Auditados (24h)', value: '12.483', icon: <Eye size={18} />, color: 'bg-blue-500/10 text-blue-400' },
          { label: 'Acessos Bloqueados', value: '7', icon: <Lock size={18} />, color: 'bg-red-500/10 text-red-400' },
          { label: 'Compliance Score', value: '98.2%', icon: <FileCheck size={18} />, color: 'bg-emerald-500/10 text-emerald-400' },
          { label: 'Incidentes Abertos', value: '1', icon: <AlertTriangle size={18} />, color: 'bg-amber-500/10 text-amber-400' },
        ].map((m) => (
          <div key={m.label} className="glass-card rounded-2xl border border-white/10 p-5">
            <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${m.color} mb-3`}>
              {m.icon}
            </span>
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            <p className="text-xs text-white/50 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-2xl border border-white/10">
        <div className="border-b border-white/5 px-6">
          <div className="flex gap-6">
            {[
              { id: 'audit' as const, label: 'Trilha de Auditoria', icon: <Eye size={14} /> },
              { id: 'permissions' as const, label: 'Permissões & Papéis', icon: <Lock size={14} /> },
              { id: 'compliance' as const, label: 'Compliance', icon: <Shield size={14} /> },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 py-4 text-sm border-b-2 transition-all cursor-pointer ${
                  tab === t.id ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-white/50 hover:text-white/70'
                }`}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {tab === 'audit' && <AuditTab />}
          {tab === 'permissions' && <PermissionsTab />}
          {tab === 'compliance' && <ComplianceTab />}
        </div>
      </div>
    </div>
  )
}

function AuditTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-white/60">Últimos eventos registrados</p>
        <button className="flex items-center gap-1.5 text-xs text-white/50 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/[0.02] cursor-pointer">
          <Filter size={12} />Filtrar
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-xs">
          <thead className="bg-white/[0.02]">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-white/60">Hora</th>
              <th className="text-left px-4 py-2.5 font-medium text-white/60">Agente</th>
              <th className="text-left px-4 py-2.5 font-medium text-white/60">Ação</th>
              <th className="text-left px-4 py-2.5 font-medium text-white/60">Paciente</th>
              <th className="text-left px-4 py-2.5 font-medium text-white/60">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {auditLogs.map((log, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="px-4 py-2.5 text-white/50 font-mono">{log.time}</td>
                <td className="px-4 py-2.5">
                  <span className="flex items-center gap-1.5 text-white/70">
                    <Bot size={11} className="text-white/30" />{log.agent}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-white/70">{log.action}</td>
                <td className="px-4 py-2.5 text-white/50">{log.patient}</td>
                <td className="px-4 py-2.5">
                  <StatusPill status={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PermissionsTab() {
  return (
    <div>
      <p className="text-sm text-white/60 mb-4">Matriz de acesso por papel — princípio do menor privilégio</p>
      <div className="space-y-3">
        {permissions.map((p) => (
          <div key={p.role} className="border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User size={14} className="text-white/50" />
                <span className="font-medium text-sm text-white/90">{p.role}</span>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">{p.dataAccess}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5">
                {p.agents.map(a => (
                  <span key={a} className="bg-white/[0.02] text-white/60 px-2 py-0.5 rounded">{a}</span>
                ))}
              </div>
              <span className="text-red-400 text-[10px] italic">{p.restrictions}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComplianceTab() {
  return (
    <div>
      <p className="text-sm text-white/60 mb-4">Frameworks regulatórios e status de conformidade</p>
      <div className="grid grid-cols-2 gap-4">
        {complianceItems.map((c) => (
          <div key={c.framework} className={`border rounded-lg p-5 ${
            c.status === 'compliant' ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-amber-500/20 bg-amber-500/5'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm text-white/90">{c.framework}</h4>
              {c.status === 'compliant' ? (
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={10} />Conforme
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  <Clock size={10} />Parcial
                </span>
              )}
            </div>
            <ul className="space-y-1.5">
              {c.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-white/60">
                  <CheckCircle2 size={10} className={c.status === 'compliant' ? 'text-emerald-500' : 'text-amber-500'} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    success: 'bg-emerald-500/10 text-emerald-400',
    warning: 'bg-amber-500/10 text-amber-400',
    error: 'bg-red-500/10 text-red-400',
    blocked: 'bg-white/[0.02] text-white/60',
  }
  const labels: Record<string, string> = {
    success: 'OK',
    warning: 'Alerta',
    error: 'Erro',
    blocked: 'Bloqueado',
  }
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
