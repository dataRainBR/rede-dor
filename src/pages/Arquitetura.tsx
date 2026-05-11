import { Cloud, Database, Bot, Shield, Lock } from 'lucide-react'

const layers = [
  {
    name: 'Fontes de Dados',
    color: 'border-purple-300 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700',
    headerColor: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300',
    services: [
      { name: 'Monitores Beira-Leito', desc: 'Sinais vitais em tempo real', icon: '🏥' },
      { name: 'Tasy / MV', desc: 'Prontuário eletrônico', icon: '📋' },
      { name: 'Sistema Lab', desc: 'Resultados laboratoriais', icon: '🧪' },
      { name: 'Prescrições', desc: 'Medicações e doses', icon: '💊' },
    ]
  },
  {
    name: 'Ingestão & Streaming',
    color: 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700',
    headerColor: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
    services: [
      { name: 'Amazon Kinesis', desc: 'Data Streams — ingestão real-time', icon: '⚡' },
      { name: 'Amazon MSK', desc: 'Kafka gerenciado — event bus', icon: '📡' },
      { name: 'AWS IoT Core', desc: 'Conexão com dispositivos médicos', icon: '📶' },
      { name: 'Amazon EventBridge', desc: 'Orquestração de eventos', icon: '🔀' },
    ]
  },
  {
    name: 'Data Platform',
    color: 'border-cyan-300 bg-cyan-50 dark:bg-cyan-900/20 dark:border-cyan-700',
    headerColor: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300',
    services: [
      { name: 'Databricks', desc: 'Lakehouse — Delta Lake + Unity Catalog', icon: '🔷' },
      { name: 'Amazon S3', desc: 'Data Lake — armazenamento durável', icon: '🪣' },
      { name: 'AWS Glue', desc: 'ETL & Catálogo de dados', icon: '🔧' },
      { name: 'Amazon Redshift', desc: 'Analytics & BI', icon: '📊' },
    ]
  },
  {
    name: 'IA & Agentes',
    color: 'border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700',
    headerColor: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
    services: [
      { name: 'Amazon Bedrock', desc: 'Agents + Claude 3.5 + Guardrails', icon: '🤖' },
      { name: 'Bedrock Knowledge Bases', desc: 'RAG com prontuários e protocolos', icon: '📚' },
      { name: 'Amazon SageMaker', desc: 'Modelos custom de predição', icon: '🧠' },
      { name: 'AWS Step Functions', desc: 'Orquestração multi-agente', icon: '🔄' },
    ]
  },
  {
    name: 'Governança & Segurança',
    color: 'border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700',
    headerColor: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
    services: [
      { name: 'AWS CloudTrail', desc: 'Auditoria completa de acessos', icon: '📝' },
      { name: 'Amazon CloudWatch', desc: 'Monitoramento & alertas infra', icon: '👁️' },
      { name: 'AWS KMS', desc: 'Criptografia de dados sensíveis', icon: '🔐' },
      { name: 'AWS IAM + Lake Formation', desc: 'RBAC + row-level security', icon: '🛡️' },
    ]
  },
]

export function Arquitetura() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white text-lg">Arquitetura de Referência — AWS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Plataforma de IA Agêntica para Análise Clínica</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded font-medium flex items-center gap-1">
              <Cloud size={10} /> AWS Well-Architected
            </span>
            <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded font-medium flex items-center gap-1">
              <Shield size={10} /> HIPAA Eligible
            </span>
          </div>
        </div>
      </div>

      {/* Architecture Layers */}
      <div className="space-y-4">
        {layers.map((layer) => (
          <div key={layer.name} className={`rounded-xl border-2 overflow-hidden ${layer.color}`}>
            <div className={`px-5 py-2.5 ${layer.headerColor}`}>
              <h4 className="font-semibold text-sm">{layer.name}</h4>
            </div>
            <div className="p-4 grid grid-cols-4 gap-3">
              {layer.services.map((svc) => (
                <div key={svc.name} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{svc.icon}</span>
                    <span className="text-xs font-semibold text-gray-800 dark:text-white">{svc.name}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Data Flow */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Fluxo de Dados End-to-End</h3>
        <div className="flex items-center justify-between">
          {['Monitor\nBeira-Leito', 'IoT Core\n+ Kinesis', 'Databricks\nLakehouse', 'Bedrock\nAgents', 'Step\nFunctions', 'Alerta\nClínico'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="text-center">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg ${
                  i === 3 ? 'bg-[#c9a84c]/10 border-2 border-[#c9a84c]' : 'bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}>
                  {['🏥', '📡', '🔷', '🤖', '🔄', '🚨'][i]}
                </div>
                <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-1.5 whitespace-pre-line leading-tight font-medium">{step}</p>
              </div>
              {i < 5 && (
                <div className="flex items-center gap-0.5 px-1">
                  <div className="w-6 h-0.5 bg-gray-300 dark:bg-gray-600" />
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-gray-300 dark:border-l-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-6 text-[10px] text-gray-400">
          <span>~100ms</span>
          <span>~500ms</span>
          <span>~2s</span>
          <span>~5s</span>
          <span>~1s</span>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-1">Latência estimada por etapa — Total: &lt; 10 segundos</p>
      </div>

      {/* Key Decisions */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: 'Por que Bedrock?', icon: <Bot size={16} />, points: ['Agentes nativos com guardrails', 'Claude 3.5 Sonnet (melhor raciocínio)', 'Knowledge Bases para RAG', 'Pay-per-use, sem GPU reservada'] },
          { title: 'Por que Databricks?', icon: <Database size={16} />, points: ['Unity Catalog (governança)', 'Delta Lake (ACID em data lake)', 'MLflow para MLOps', 'Já utilizado pela Rede D\'Or'] },
          { title: 'Segurança & Compliance', icon: <Lock size={16} />, points: ['VPC isolada + PrivateLink', 'Criptografia KMS em repouso', 'CloudTrail + GuardDuty', 'LGPD + HIPAA ready'] },
        ].map((card) => (
          <div key={card.title} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#c9a84c]">{card.icon}</span>
              <h4 className="font-semibold text-sm text-gray-800 dark:text-white">{card.title}</h4>
            </div>
            <ul className="space-y-1.5">
              {card.points.map((p, i) => (
                <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#c9a84c] rounded-full shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
