import { useState, useEffect, useRef } from 'react'
import { Activity, AlertTriangle, Heart, Wind, Thermometer, Droplets } from 'lucide-react'

interface VitalSign {
  label: string
  unit: string
  value: number
  min: number
  max: number
  criticalLow: number
  criticalHigh: number
  icon: React.ReactNode
  color: string
  history: number[]
}

function generateValue(current: number, min: number, max: number, volatility: number): number {
  const change = (Math.random() - 0.5) * volatility
  return Math.max(min, Math.min(max, current + change))
}

export function SinaisVitais() {
  const [vitals, setVitals] = useState<VitalSign[]>([
    { label: 'FC', unit: 'bpm', value: 88, min: 40, max: 180, criticalLow: 50, criticalHigh: 140, icon: <Heart size={16} />, color: '#ef4444', history: [] },
    { label: 'SpO2', unit: '%', value: 96, min: 70, max: 100, criticalLow: 90, criticalHigh: 101, icon: <Droplets size={16} />, color: '#3b82f6', history: [] },
    { label: 'PA Sist.', unit: 'mmHg', value: 120, min: 60, max: 200, criticalLow: 90, criticalHigh: 160, icon: <Activity size={16} />, color: '#10b981', history: [] },
    { label: 'FR', unit: 'irpm', value: 16, min: 8, max: 40, criticalLow: 10, criticalHigh: 28, icon: <Wind size={16} />, color: '#8b5cf6', history: [] },
    { label: 'Temp', unit: '°C', value: 36.5, min: 34, max: 42, criticalLow: 35, criticalHigh: 38.5, icon: <Thermometer size={16} />, color: '#f59e0b', history: [] },
  ])
  const [alerts, setAlerts] = useState<string[]>([])
  const [deteriorating, setDeteriorating] = useState(false)
  const [score, setScore] = useState(2.1)
  const tickRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current++

      setVitals(prev => prev.map((v, i) => {
        let volatility = i === 0 ? 3 : i === 1 ? 1.5 : i === 2 ? 4 : i === 3 ? 1 : 0.2
        let newValue = v.value

        // Simulate deterioration after 15 seconds
        if (deteriorating) {
          if (i === 0) newValue = generateValue(v.value, v.min, v.max, 5) + 0.8 // FC sobe
          else if (i === 1) newValue = generateValue(v.value, v.min, v.max, 2) - 0.3 // SpO2 cai
          else if (i === 2) newValue = generateValue(v.value, v.min, v.max, 5) - 0.6 // PA cai
          else if (i === 3) newValue = generateValue(v.value, v.min, v.max, 1.5) + 0.3 // FR sobe
          else newValue = generateValue(v.value, v.min, v.max, 0.3) + 0.05 // Temp sobe
        } else {
          newValue = generateValue(v.value, v.min, v.max, volatility)
        }

        const history = [...v.history, newValue].slice(-60)
        return { ...v, value: Math.round(newValue * 10) / 10, history }
      }))

      if (deteriorating) {
        setScore(prev => Math.min(9.5, prev + 0.15))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [deteriorating])

  useEffect(() => {
    if (score > 7 && alerts.length === 0) {
      setAlerts([
        'ALERTA: Score de deterioração > 7.0 — Risco elevado',
        'Agente de Análise de Risco ativado automaticamente',
        'Notificação enviada para equipe médica do leito 412-A',
      ])
    }
  }, [score])

  const startDeterioration = () => {
    setDeteriorating(true)
    setAlerts([])
    setScore(4.2)
  }

  const reset = () => {
    setDeteriorating(false)
    setAlerts([])
    setScore(2.1)
    setVitals(prev => prev.map(v => ({
      ...v,
      value: v.label === 'FC' ? 88 : v.label === 'SpO2' ? 96 : v.label === 'PA Sist.' ? 120 : v.label === 'FR' ? 16 : 36.5,
      history: []
    })))
    tickRef.current = 0
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 glass-card border border-white/10 rounded-lg px-4 py-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/70">Leito 412-A — Maria Silva Santos, 72a</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            score > 7 ? 'bg-red-500/10 border-red-500/20' :
            score > 5 ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
            'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
          }`}>
            <span className={`text-sm font-bold ${score > 7 ? 'text-red-600' : score > 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
              Score: {score.toFixed(1)}/10
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {!deteriorating ? (
            <button onClick={startDeterioration} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 cursor-pointer transition-colors">
              Simular Deterioração
            </button>
          ) : (
            <button onClick={reset} className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 cursor-pointer transition-colors">
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-5 gap-4">
        {vitals.map((v) => {
          const isCritical = v.value <= v.criticalLow || v.value >= v.criticalHigh
          return (
            <div key={v.label} className={`glass-card rounded-2xl border p-4 transition-all ${
              isCritical ? 'border-red-500/20' : 'border-white/10'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: v.color }}>{v.icon}</span>
                  <span className="text-xs font-medium text-white/50">{v.label}</span>
                </div>
                {isCritical && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
              </div>
              <p className={`text-2xl font-bold ${isCritical ? 'text-red-600' : 'text-white/90'}`}>
                {v.value}
              </p>
              <p className="text-[10px] text-white/30">{v.unit}</p>
              {/* Mini chart */}
              <div className="mt-3 h-12">
                <MiniChart data={v.history} color={v.color} criticalHigh={v.criticalHigh} criticalLow={v.criticalLow} min={v.min} max={v.max} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-red-600" />
            <h3 className="font-semibold text-red-300">Alerta Automático — Agente de IA</h3>
          </div>
          <div className="space-y-2">
            {alerts.map((a, i) => (
              <p key={i} className="text-sm text-red-400">{a}</p>
            ))}
          </div>
        </div>
      )}

      {/* ECG-like waveform */}
      <div className="bg-[#0a1628] rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-emerald-400 font-mono">ECG Lead II — Monitoramento Contínuo</span>
          <span className="text-xs text-white/50 font-mono">25mm/s</span>
        </div>
        <ECGWaveform />
      </div>
    </div>
  )
}

function MiniChart({ data, color, min, max }: {
  data: number[], color: string, criticalHigh: number, criticalLow: number, min: number, max: number
}) {
  if (data.length < 2) return null
  const width = 200
  const height = 48
  const range = max - min
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} opacity={0.8} />
    </svg>
  )
}

function ECGWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offsetRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.fillStyle = '#0a1628'
      ctx.fillRect(0, 0, w, h)

      // Grid
      ctx.strokeStyle = '#1a2d45'
      ctx.lineWidth = 0.5
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // ECG waveform
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 2
      ctx.beginPath()
      const offset = offsetRef.current
      for (let x = 0; x < w; x++) {
        const t = (x + offset) % 120
        let y = h / 2
        if (t > 10 && t < 15) y = h / 2 - 5
        else if (t > 20 && t < 22) y = h / 2 + 8
        else if (t > 22 && t < 26) y = h / 2 - 35
        else if (t > 26 && t < 28) y = h / 2 + 12
        else if (t > 35 && t < 50) y = h / 2 - 3
        else if (t > 55 && t < 65) y = h / 2 - 10

        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      offsetRef.current += 2
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={canvasRef} width={800} height={100} className="w-full h-24 rounded" />
}
