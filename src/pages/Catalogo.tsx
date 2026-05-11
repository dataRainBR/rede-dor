import { useState } from 'react'
import { Bot, ArrowRight, Tag, Cpu, Database } from 'lucide-react'

type Lifecycle = 'development' | 'homologation' | 'production' | 'deprecated'

interface Agent {
  id: string
  name: string
  description: string
  lifecycle: Lifecycle
  model: string
  dataSource: string
  owner: string
  version: string
  lastUpdate: string
  executions: number
  tags: string[]
}

const agents: Agent[] = [
  {
    id: '1', name: 'Extrator de Prontuário', description: 'Extrai dados estruturados de prontuários eletrônicos (diagnósticos, medicações, procedimentos)',
    lifecycle: 'production', model: 'Claude 4.7 Sonnet', dataSource: 'Tasy/MV', owner: 'Time Dados Clínicos',
    version: '2.3.1', lastUpdate: '2026-05-10', executions: 14230, tags: ['prontuário', 'extração', 'NLP']
  },
  {
    id: '2', name: 'Análise de Risco Clínico', description: 'Avalia risco de deterioração com base em sinais vitais, labs e evolução clínica',
    lifecycle: 'production', model: 'Claude 4.7 Sonnet', dataSource: 'Sinais Vitais + Labs', owner: 'Time IA Clínica',
    version: '1.8.0', lastUpdate: '2026-05-09', executions: 8920, tags: ['risco', 'predição', 'sinais vitais']
  },
  {
    id: '3', name: 'Gerador de Alertas', description: 'Gera alertas contextualizados para equipe médica com recomendações de ação',
    lifecycle: 'production', model: 'Claude 4 Haiku', dataSource: 'Output Agentes', owner: 'Time IA Clínica',
    version: '1.5.2', lastUpdate: '2026-05-08', executions: 5670, tags: ['alertas', 'notificação', 'ação']
  },
  {
    id: '4', name: 'Sumarizador de Evolução', description: 'Resume evolução clínica do paciente em linguagem acessível para handoff entre equipes',
    lifecycle: 'homologation', model: 'Claude 4.7 Sonnet', dataSource: 'Prontuário + Notas', owner: 'Time Dados Clínicos',
    version: '0.9.4', lastUpdate: '2026-05-07', executions: 1240, tags: ['sumarização', 'evolução', 'handoff']
  },
  {
    id: '5', name: 'Classificador de Medicações', description: 'Classifica e valida prescrições, identifica interações medicamentosas',
    lifecycle: 'production', model: 'Claude 4 Haiku', dataSource: 'Prescrições + Anvisa DB', owner: 'Time Farmácia',
    version: '3.1.0', lastUpdate: '2026-05-06', executions: 22100, tags: ['medicação', 'interação', 'validação']
  },
  {
    id: '6', name: 'Preditor de Deterioração v2', description: 'Nova versão com modelo multimodal incluindo imagens de exames',
    lifecycle: 'development', model: 'Claude 4.7 Sonnet', dataSource: 'Multimodal', owner: 'Time IA Clínica',
    version: '0.2.0', lastUpdate: '2026-05-11', executions: 45, tags: ['predição', 'multimodal', 'experimental']
  },
  {
    id: '7', name: 'Analisador de Exames Lab', description: 'Interpreta resultados laboratoriais e correlaciona com quadro clínico',
    lifecycle: 'homologation', model: 'Claude 4.7 Sonnet', dataSource: 'Sistema Lab', owner: 'Time Dados Clínicos',
    version: '1.0.0-rc1', lastUpdate: '2026-05-10', executions: 890, tags: ['laboratório', 'exames', 'correlação']
  },
  {
    id: '8', name: 'Codificador CID-10', description: 'Sugere códigos CID-10 com base no prontuário (descontinuado - substituído pelo Extrator v2)',
    lifecycle: 'deprecated', model: 'Claude 4 Haiku', dataSource: 'Prontuário', owner: 'Time Dados Clínicos',
    version: '1.2.0', lastUpdate: '2026-03-15', executions: 0, tags: ['CID', 'codificação', 'legacy']
  },
]

const lifecycleConfig: Record<Lifecycle, { label: string; color: string; bg: string }> = {
  development: { label: 'Desenvolvimento', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  homologation: { label: 'Homologação', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  production: { label: 'Produção', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  deprecated: { label: 'Descontinuado', color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/20' },
}

export function Catalogo() {
  const [filter, setFilter] = useState<Lifecycle | 'all'>('all')
  const [selected, setSelected] = useState<Agent | null>(null)

  const filtered = filter === 'all' ? agents : agents.filter(a => a.lifecycle === filter)

  return (
    <div className="space-y-6">
      {/* Lifecycle Pipeline */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-white/90 mb-4">Ciclo de Vida dos Agentes</h3>
        <div className="flex items-center gap-2">
          {(['development', 'homologation', 'production', 'deprecated'] as Lifecycle[]).map((stage, i) => (
            <div key={stage} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => setFilter(filter === stage ? 'all' : stage)}
                className={`flex-1 border rounded-2xl p-3 text-center transition-all cursor-pointer ${
                  filter === stage ? lifecycleConfig[stage].bg + ' border-2' : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
                }`}
              >
                <p className={`text-xs font-semibold ${lifecycleConfig[stage].color}`}>
                  {lifecycleConfig[stage].label}
                </p>
                <p className="text-lg font-bold text-white mt-1">
                  {agents.filter(a => a.lifecycle === stage).length}
                </p>
              </button>
              {i < 3 && <ArrowRight size={16} className="text-white/20 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="col-span-2 space-y-3">
          {filtered.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelected(agent)}
              className={`glass-card rounded-2xl border p-5 cursor-pointer transition-all ${
                selected?.id === agent.id ? 'border-blue-500/30 shadow-md' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${lifecycleConfig[agent.lifecycle].bg}`}>
                    <Bot size={18} className={lifecycleConfig[agent.lifecycle].color} />
                  </div>
                  <div>
                    <h4 className="font-medium text-white/90 text-sm">{agent.name}</h4>
                    <p className="text-xs text-white/50 mt-0.5">{agent.description}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${lifecycleConfig[agent.lifecycle].bg} ${lifecycleConfig[agent.lifecycle].color}`}>
                  {lifecycleConfig[agent.lifecycle].label}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-[11px] text-white/30">
                <span className="flex items-center gap-1"><Cpu size={10} />{agent.model}</span>
                <span className="flex items-center gap-1"><Database size={10} />{agent.dataSource}</span>
                <span>v{agent.version}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 h-fit sticky top-24">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lifecycleConfig[selected.lifecycle].bg}`}>
                  <Bot size={20} className={lifecycleConfig[selected.lifecycle].color} />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 text-sm">{selected.name}</h3>
                  <span className={`text-[10px] font-medium ${lifecycleConfig[selected.lifecycle].color}`}>
                    {lifecycleConfig[selected.lifecycle].label}
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/60">{selected.description}</p>
              <div className="space-y-2 text-xs">
                <DetailRow label="Modelo" value={selected.model} />
                <DetailRow label="Fonte de Dados" value={selected.dataSource} />
                <DetailRow label="Responsável" value={selected.owner} />
                <DetailRow label="Versão" value={selected.version} />
                <DetailRow label="Última Atualização" value={selected.lastUpdate} />
                <DetailRow label="Execuções" value={selected.executions.toLocaleString()} />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {selected.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-[10px] bg-white/[0.02] text-white/60 px-2 py-0.5 rounded-full">
                    <Tag size={8} />{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-white/30">
              <Bot size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Selecione um agente para ver detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-white/5">
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white/70">{value}</span>
    </div>
  )
}
