import { Cloud, Database, Bot, Shield, Lock, Activity, Radio, Shuffle, Server, FlaskConical, Pill, FileText, Zap, BarChart3, BookOpen, Brain, RefreshCw, ClipboardList, Eye, Key, Layers } from 'lucide-react'
import type { ReactNode } from 'react'

interface Service {
  name: string
  desc: string
  icon: ReactNode
}

const layers: { name: string; color: string; headerColor: string; services: Service[] }[] = [
  {
    name: 'Fontes de Dados',
    color: 'border-purple-500/20 bg-purple-500/5',
    headerColor: 'bg-purple-500/10 text-purple-300',
    services: [
      { name: 'Monitores Beira-Leito', desc: 'Sinais vitais em tempo real', icon: <Activity size={16} className="text-purple-400" /> },
      { name: 'Tasy / MV', desc: 'Prontuário eletrônico', icon: <FileText size={16} className="text-purple-400" /> },
      { name: 'Sistema Lab', desc: 'Resultados laboratoriais', icon: <FlaskConical size={16} className="text-purple-400" /> },
      { name: 'Prescrições', desc: 'Medicações e doses', icon: <Pill size={16} className="text-purple-400" /> },
    ]
  },
  {
    name: 'Ingestão & Streaming',
    color: 'border-blue-500/20 bg-blue-500/5',
    headerColor: 'bg-blue-500/10 text-blue-300',
    services: [
      { name: 'Amazon Kinesis', desc: 'Data Streams — ingestão real-time', icon: <Zap size={16} className="text-blue-400" /> },
      { name: 'Amazon MSK', desc: 'Kafka gerenciado — event bus', icon: <Radio size={16} className="text-blue-400" /> },
      { name: 'AWS IoT Core', desc: 'Conexão com dispositivos médicos', icon: <Server size={16} className="text-blue-400" /> },
      { name: 'Amazon EventBridge', desc: 'Orquestração de eventos', icon: <Shuffle size={16} className="text-blue-400" /> },
    ]
  },
  {
    name: 'Data Platform',
    color: 'border-cyan-500/20 bg-cyan-500/5',
    headerColor: 'bg-cyan-500/10 text-cyan-300',
    services: [
      { name: 'Databricks', desc: 'Lakehouse — Delta Lake + Unity Catalog', icon: <Layers size={16} className="text-cyan-400" /> },
      { name: 'Amazon S3', desc: 'Data Lake — armazenamento durável', icon: <Database size={16} className="text-cyan-400" /> },
      { name: 'AWS Glue', desc: 'ETL & Catálogo de dados', icon: <RefreshCw size={16} className="text-cyan-400" /> },
      { name: 'Amazon Redshift', desc: 'Analytics & BI', icon: <BarChart3 size={16} className="text-cyan-400" /> },
    ]
  },
  {
    name: 'IA & Agentes',
    color: 'border-amber-500/20 bg-amber-500/5',
    headerColor: 'bg-amber-500/10 text-amber-300',
    services: [
      { name: 'Amazon Bedrock', desc: 'Agents + Claude 4.7 + Guardrails', icon: <Bot size={16} className="text-amber-400" /> },
      { name: 'Bedrock Knowledge Bases', desc: 'RAG com prontuários e protocolos', icon: <BookOpen size={16} className="text-amber-400" /> },
      { name: 'Amazon SageMaker', desc: 'Modelos custom de predição', icon: <Brain size={16} className="text-amber-400" /> },
      { name: 'AWS Step Functions', desc: 'Orquestração multi-agente', icon: <RefreshCw size={16} className="text-amber-400" /> },
    ]
  },
  {
    name: 'Governança & Segurança',
    color: 'border-emerald-500/20 bg-emerald-500/5',
    headerColor: 'bg-emerald-500/10 text-emerald-300',
    services: [
      { name: 'AWS CloudTrail', desc: 'Auditoria completa de acessos', icon: <ClipboardList size={16} className="text-emerald-400" /> },
      { name: 'Amazon CloudWatch', desc: 'Monitoramento & alertas infra', icon: <Eye size={16} className="text-emerald-400" /> },
      { name: 'AWS KMS', desc: 'Criptografia de dados sensíveis', icon: <Key size={16} className="text-emerald-400" /> },
      { name: 'AWS IAM + Lake Formation', desc: 'RBAC + row-level security', icon: <Shield size={16} className="text-emerald-400" /> },
    ]
  },
]

export function Arquitetura() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 animate-fade-up">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white/90 text-lg">Arquitetura de Referência — AWS</h3>
            <p className="text-sm text-white/40 mt-1">Plataforma de IA Agêntica para Análise Clínica</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-1 rounded-lg font-medium flex items-center gap-1">
              <Cloud size={10} /> AWS Well-Architected
            </span>
            <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-1 rounded-lg font-medium flex items-center gap-1">
              <Shield size={10} /> HIPAA Eligible
            </span>
          </div>
        </div>
      </div>

      {/* Architecture Layers */}
      <div className="space-y-4">
        {layers.map((layer, idx) => (
          <div key={layer.name} className={`rounded-2xl border overflow-hidden ${layer.color} animate-fade-up stagger-${idx + 1}`}>
            <div className={`px-5 py-2.5 ${layer.headerColor}`}>
              <h4 className="font-semibold text-sm">{layer.name}</h4>
            </div>
            <div className="p-4 grid grid-cols-4 gap-3">
              {layer.services.map((svc) => (
                <div key={svc.name} className="glass-card rounded-xl p-3 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-2 mb-1">
                    {svc.icon}
                    <span className="text-xs font-semibold text-white/80">{svc.name}</span>
                  </div>
                  <p className="text-[10px] text-white/40">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Data Flow */}
      <div className="glass-card rounded-2xl p-6 animate-fade-up stagger-6">
        <h3 className="font-semibold text-white/90 mb-5">Fluxo de Dados End-to-End</h3>
        <div className="flex items-center justify-between">
          {[
            { icon: <Activity size={20} className="text-purple-400" />, label: 'Monitor\nBeira-Leito' },
            { icon: <Radio size={20} className="text-blue-400" />, label: 'IoT Core\n+ Kinesis' },
            { icon: <Layers size={20} className="text-cyan-400" />, label: 'Databricks\nLakehouse' },
            { icon: <Bot size={20} className="text-amber-400" />, label: 'Bedrock\nAgents' },
            { icon: <RefreshCw size={20} className="text-emerald-400" />, label: 'Step\nFunctions' },
            { icon: <Shield size={20} className="text-red-400" />, label: 'Alerta\nClínico' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="text-center">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center glass-card ${
                  i === 3 ? 'border-[#c9a84c]/30 glow-gold' : ''
                }`}>
                  {step.icon}
                </div>
                <p className="text-[9px] text-white/40 mt-1.5 whitespace-pre-line leading-tight font-medium">{step.label}</p>
              </div>
              {i < 5 && (
                <div className="flex items-center gap-0.5 px-1">
                  <div className="w-6 h-0.5 bg-white/10" />
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-white/10" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-6 text-[10px] text-white/20 font-mono">
          <span>~100ms</span>
          <span>~500ms</span>
          <span>~2s</span>
          <span>~5s</span>
          <span>~1s</span>
        </div>
        <p className="text-center text-[10px] text-white/20 mt-1">Latência estimada por etapa — Total: &lt; 10 segundos</p>
      </div>

      {/* Key Decisions */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: 'Por que Bedrock?', icon: <Bot size={16} className="text-[#c9a84c]" />, points: ['Agentes nativos com guardrails', 'Claude 4.7 Sonnet (melhor raciocínio)', 'Knowledge Bases para RAG', 'Pay-per-use, sem GPU reservada'] },
          { title: 'Por que Databricks?', icon: <Database size={16} className="text-[#c9a84c]" />, points: ['Unity Catalog (governança)', 'Delta Lake (ACID em data lake)', 'MLflow para MLOps', 'Já utilizado pela Rede D\'Or'] },
          { title: 'Segurança & Compliance', icon: <Lock size={16} className="text-[#c9a84c]" />, points: ['VPC isolada + PrivateLink', 'Criptografia KMS em repouso', 'CloudTrail + GuardDuty', 'LGPD + HIPAA ready'] },
        ].map((card) => (
          <div key={card.title} className="glass-card rounded-2xl p-5 animate-fade-up stagger-7">
            <div className="flex items-center gap-2 mb-3">
              {card.icon}
              <h4 className="font-semibold text-sm text-white/90">{card.title}</h4>
            </div>
            <ul className="space-y-1.5">
              {card.points.map((p, i) => (
                <li key={i} className="text-xs text-white/50 flex items-center gap-2">
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
