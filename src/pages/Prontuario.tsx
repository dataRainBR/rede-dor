import { useState, useEffect } from 'react'
import { FileText, Play, Bot, CheckCircle2, Clock, Loader2 } from 'lucide-react'

const prontuarioExample = `PRONTUÁRIO ELETRÔNICO — Hospital São Luiz (Rede D'Or)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Paciente: Maria Silva Santos | 72 anos | Feminino
Internação: 08/05/2026 | Leito: 412-A | UTI Cardiológica
Diagnóstico Principal: ICC descompensada + FA de alta resposta

SINAIS VITAIS (última aferição - 09:30):
• PA: 88/52 mmHg (↓ tendência de queda nas últimas 6h)
• FC: 142 bpm (FA de alta resposta)
• FR: 28 irpm (taquipneia)
• SpO2: 89% (em O2 cateter nasal 3L/min)
• Temp: 37.8°C
• Diurese: 180ml/12h (oligúria)

MEDICAÇÕES EM USO:
• Furosemida 40mg EV 8/8h
• Amiodarona 200mg VO 12/12h
• Enoxaparina 60mg SC 12/12h
• Dobutamina 5mcg/kg/min (iniciada há 2h)

EVOLUÇÃO MÉDICA (Dr. Ricardo Mendes - 08:45):
Paciente mantém quadro de baixo débito cardíaco. Iniciada
dobutamina há 2h sem melhora significativa. PA em queda
progressiva. SpO2 caindo apesar de O2 suplementar.
Considerar IOT + VM se piora. Solicitado eco à beira-leito.

EXAMES LABORATORIAIS (08:00):
• BNP: 2.840 pg/mL (↑↑↑ ref: <100)
• Lactato: 4.2 mmol/L (↑↑ ref: <2.0)
• Creatinina: 2.8 mg/dL (↑ basal: 1.1)
• Troponina: 0.89 ng/mL (↑)
• K+: 5.8 mEq/L (↑ ref: 3.5-5.0)
• PCR: 48 mg/L (↑)`

interface AnalysisStep {
  agent: string
  status: 'pending' | 'running' | 'done'
  output?: string
  duration?: string
}

const initialSteps: AnalysisStep[] = [
  { agent: 'Extrator de Prontuário', status: 'pending' },
  { agent: 'Análise de Risco Clínico', status: 'pending' },
  { agent: 'Gerador de Alertas', status: 'pending' },
]

const stepOutputs = [
  `Dados extraídos com sucesso:
• Paciente: Maria Silva Santos, 72a, F
• Diagnóstico: ICC descompensada + FA alta resposta
• Sinais críticos: PA 88/52, FC 142, SpO2 89%, FR 28
• Labs alterados: BNP 2840, Lactato 4.2, Cr 2.8, K+ 5.8
• Medicações: 4 drogas ativas (1 vasoativa)
• Tendência: deterioração progressiva nas últimas 6h`,

  `RISCO ALTO DE DETERIORAÇÃO — Score: 9.2/10

Fatores de risco identificados:
• Choque cardiogênico em evolução (PA↓ + Lactato↑ + oligúria)
• Hipoxemia refratária (SpO2 89% com O2)
• Disfunção renal aguda (Cr 2.8 vs basal 1.1)
• Hipercalemia (K+ 5.8 — risco arritmia)
• Não resposta à dobutamina após 2h
• BNP extremamente elevado (2840)

Probabilidade de evento adverso em 4h: 78%
Probabilidade de IOT em 6h: 65%`,

  `ALERTA CRÍTICO GERADO

Para: Equipe UTI Cardiológica — Leito 412-A
Prioridade: URGENTE (Nível 1)

Recomendações imediatas:
1. Reavaliar suporte vasoativo (considerar noradrenalina)
2. Preparar material para IOT + VM
3. Correção urgente de hipercalemia (gluconato de Ca + insulina)
4. Eco à beira-leito STAT
5. Contato com plantonista sênior/cirurgião cardíaco

Rastreabilidade: Decisão baseada em 6 parâmetros críticos
Confiança do modelo: 94.7%
Referências: ESC Guidelines 2025, NEWS2 Score adaptado`
]

export function Prontuario() {
  const [steps, setSteps] = useState<AnalysisStep[]>(initialSteps)
  const [running, setRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)

  const startAnalysis = () => {
    setRunning(true)
    setCurrentStep(0)
    setSteps(initialSteps.map(s => ({ ...s, status: 'pending', output: undefined, duration: undefined })))
  }

  useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length) return

    const timer1 = setTimeout(() => {
      setSteps(prev => prev.map((s, i) => i === currentStep ? { ...s, status: 'running' } : s))
    }, 300)

    const duration = 1500 + Math.random() * 1000
    const timer2 = setTimeout(() => {
      setSteps(prev => prev.map((s, i) =>
        i === currentStep ? { ...s, status: 'done', output: stepOutputs[i], duration: `${(duration / 1000).toFixed(1)}s` } : s
      ))
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1)
      } else {
        setRunning(false)
      }
    }, duration)

    return () => { clearTimeout(timer1); clearTimeout(timer2) }
  }, [currentStep])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Prontuário Input */}
        <div className="glass-card rounded-2xl border border-white/10">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-white/50" />
              <h3 className="font-semibold text-white/90 text-sm">Prontuário do Paciente</h3>
            </div>
            <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
              Dados fictícios
            </span>
          </div>
          <pre className="p-5 text-[11px] leading-relaxed text-white/70 font-mono overflow-y-auto max-h-[520px] whitespace-pre-wrap">
            {prontuarioExample}
          </pre>
        </div>

        {/* Analysis Panel */}
        <div className="space-y-4">
          <button
            onClick={startAnalysis}
            disabled={running}
            className="w-full bg-gradient-to-r from-[#1a2332] to-[#2a3a4d] text-white rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-lg"
          >
            {running ? <Loader2 size={20} className="animate-spin" /> : <Play size={20} />}
            <span className="font-semibold">
              {running ? 'Analisando...' : 'Executar Análise Multi-Agente'}
            </span>
          </button>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className={`glass-card rounded-2xl border overflow-hidden transition-all ${
                step.status === 'done' ? 'border-emerald-500/20' :
                step.status === 'running' ? 'border-blue-500/20' : 'border-white/10'
              }`}>
                <div className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StepIcon status={step.status} />
                    <div>
                      <p className="text-sm font-medium text-white/90">{step.agent}</p>
                      <p className="text-[10px] text-white/30">Agente {i + 1} de {steps.length}</p>
                    </div>
                  </div>
                  {step.duration && (
                    <span className="text-[10px] text-white/30 flex items-center gap-1">
                      <Clock size={10} />{step.duration}
                    </span>
                  )}
                </div>
                {step.output && (
                  <div className="px-5 pb-4">
                    <pre className="text-[11px] leading-relaxed text-white/70 bg-white/[0.02] rounded-lg p-3 whitespace-pre-wrap font-mono">
                      {step.output}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StepIcon({ status }: { status: string }) {
  if (status === 'done') return <CheckCircle2 size={18} className="text-emerald-500" />
  if (status === 'running') return <Loader2 size={18} className="text-blue-500 animate-spin" />
  return <Bot size={18} className="text-white/30" />
}
