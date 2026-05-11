import { DollarSign, Clock, Heart, Users, ArrowDown, ArrowUp, Target } from 'lucide-react'

const roiMetrics = [
  { label: 'Redução de Eventos Adversos', value: '-42%', description: 'Detecção precoce evita agravamentos', icon: <Heart size={20} />, color: 'text-red-600 bg-red-50' },
  { label: 'Economia em Leitos-Dia', value: 'R$ 18M/ano', description: 'Menor tempo de internação em UTI', icon: <DollarSign size={20} />, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Tempo de Resposta', value: '30s', description: 'vs 2h na detecção manual', icon: <Clock size={20} />, color: 'text-blue-600 bg-blue-50' },
  { label: 'Vidas Impactadas', value: '12.000+', description: 'Pacientes/mês monitorados', icon: <Users size={20} />, color: 'text-purple-600 bg-purple-50' },
]

const beforeAfter = [
  { metric: 'Detecção de deterioração', before: '2-4 horas', after: '< 30 segundos', improvement: '99%' },
  { metric: 'Taxa de código azul evitável', before: '18%', after: '4%', improvement: '78%' },
  { metric: 'Tempo médio UTI', before: '8.2 dias', after: '5.7 dias', improvement: '30%' },
  { metric: 'Mortalidade evitável', before: '3.2%', after: '1.1%', improvement: '66%' },
  { metric: 'Custo por paciente/dia', before: 'R$ 4.200', after: 'R$ 3.100', improvement: '26%' },
  { metric: 'Satisfação equipe médica', before: '62%', after: '89%', improvement: '44%' },
]

const timeline = [
  { phase: 'PoC', duration: '8 semanas', investment: 'R$ 180K', deliverable: '1 unidade, 50 leitos, Alerta de Deterioração', roi: 'Validação clínica' },
  { phase: 'Piloto', duration: '16 semanas', investment: 'R$ 520K', deliverable: '3 unidades, 6 agentes, integração Tasy', roi: '3x ROI projetado' },
  { phase: 'Scale', duration: '6 meses', investment: 'R$ 2.4M', deliverable: 'Todas unidades SP, plataforma completa', roi: '7x ROI (R$ 18M economia)' },
]

const costBreakdown = [
  { item: 'Infraestrutura AWS (Bedrock + Compute)', monthly: 'R$ 45K', pct: 35 },
  { item: 'Databricks (Data + ML)', monthly: 'R$ 32K', pct: 25 },
  { item: 'Desenvolvimento & Integração', monthly: 'R$ 38K', pct: 30 },
  { item: 'Suporte & Operação', monthly: 'R$ 13K', pct: 10 },
]

export function ROI() {
  return (
    <div className="space-y-6">
      {/* Hero metrics */}
      <div className="grid grid-cols-4 gap-4">
        {roiMetrics.map((m) => (
          <div key={m.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${m.color} mb-3`}>
              {m.icon}
            </span>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{m.value}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{m.label}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{m.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Before/After */}
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800 dark:text-white">Comparativo: Antes vs Depois</h3>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
              Baseado em benchmarks hospitalares
            </span>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-gray-600 dark:text-gray-300">Métrica</th>
                  <th className="text-center px-4 py-3 font-medium text-red-600">Sem Plataforma</th>
                  <th className="text-center px-4 py-3 font-medium text-emerald-600">Com Plataforma</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Melhoria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {beforeAfter.map((row) => (
                  <tr key={row.metric}>
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium">{row.metric}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded text-xs font-medium">
                        <ArrowDown size={10} />{row.before}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded text-xs font-medium">
                        <ArrowUp size={10} />{row.after}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{row.improvement}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Custo Mensal Estimado (Scale)</h3>
          <div className="space-y-4">
            {costBreakdown.map((c) => (
              <div key={c.item}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{c.item}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{c.monthly}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#c9a84c] to-[#e0c068] rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total mensal</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">R$ 128K</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Payback em 4 meses na fase Scale</p>
          </div>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-800 dark:text-white">Roadmap de Implementação</h3>
          <div className="flex items-center gap-2">
            <Target size={14} className="text-[#c9a84c]" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Possível funding AWS para PoC</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {timeline.map((phase, i) => (
            <div key={phase.phase} className={`relative border-2 rounded-xl p-5 ${
              i === 0 ? 'border-[#c9a84c] bg-[#c9a84c]/5' : 'border-gray-200 dark:border-gray-600'
            }`}>
              {i === 0 && (
                <span className="absolute -top-2.5 left-4 bg-[#c9a84c] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Próximo passo
                </span>
              )}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-800 dark:text-white text-lg">{phase.phase}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{phase.duration}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{phase.deliverable}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Investimento</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-white">{phase.investment}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase">Retorno</p>
                  <p className="text-sm font-bold text-emerald-600">{phase.roi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#1a2332] to-[#2a3a4d] rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">ROI Projetado em 12 meses</h3>
        <p className="text-4xl font-bold text-[#c9a84c] mb-2">7.2x</p>
        <p className="text-sm text-white/70">Investimento total: R$ 3.1M → Economia gerada: R$ 22.3M</p>
        <p className="text-xs text-white/50 mt-3">* Projeção baseada em benchmarks de hospitais com sistemas de early warning (NEWS2, MEWS)</p>
      </div>
    </div>
  )
}
