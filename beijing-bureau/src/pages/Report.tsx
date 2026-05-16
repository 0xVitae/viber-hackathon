import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUpload, FiAlertTriangle } from 'react-icons/fi'
import { BureauButton } from '../components/ui/BureauButton'
import { OFFENCES, THREAT_LEVELS, IMAGE_ANALYSIS_RESPONSES } from '../lib/data'
import { pickRandom } from '../lib/socialCredit'
import { playSubmit, playSiren } from '../lib/sounds'
import { useApp } from '../context/AppContext'

export function Report() {
  const navigate = useNavigate()
  const { soundEnabled } = useApp()
  const fileRef = useRef<HTMLInputElement>(null)

  const [citizenName, setCitizenName] = useState('')
  const [offence, setOffence] = useState<string>(OFFENCES[0])
  const [threatLevel, setThreatLevel] = useState(5)
  const [description, setDescription] = useState('')
  const [patriotismRating, setPatriotismRating] = useState(75)
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null)
  const [imageAnalysis, setImageAnalysis] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [emergency, setEmergency] = useState(false)

  const validate = () => {
    const errs: string[] = []
    if (!citizenName.trim()) errs.push('CITIZEN NAME REQUIRED FOR HARMONY DATABASE')
    if (citizenName.length < 2) errs.push('NAME TOO SHORT — SUSPICIOUS BREVITY DETECTED')
    if (!description.trim()) errs.push('INCIDENT DESCRIPTION MANDATORY UNDER ARTICLE 7')
    if (description.length < 10)
      errs.push('DESCRIPTION INSUFFICIENT — PLEASE EXAGGERATE FURTHER')
    if (patriotismRating < 30) errs.push('YOUR PATRIOTISM RATING IS CONCERNINGLY LOW')
    setErrors(errs)
    return errs.length === 0
  }

  const handleEvidence = (file: File | null) => {
    setEvidenceFile(file)
    if (file) {
      setImageAnalysis(pickRandom(IMAGE_ANALYSIS_RESPONSES))
    } else {
      setImageAnalysis(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    playSubmit(soundEnabled)
    navigate('/processing', {
      state: {
        citizenName,
        offence,
        threatLevel,
        description,
        patriotismRating,
        evidenceFileName: evidenceFile?.name,
        imageAnalysis,
        emergency,
      },
    })
  }

  const handleEmergency = () => {
    setEmergency(true)
    playSiren(soundEnabled)
    setCitizenName('ENTIRE DISTRICT')
    setOffence('Illegal fun')
    setThreatLevel(10)
    setDescription('MASS HARMONY VIOLATION — ALL CITIZENS IN SECTOR COMPROMISED')
    setPatriotismRating(100)
  }

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl text-bureau-red md:text-5xl">SUBMIT ANONYMOUS TIP</h1>
          <p className="mt-2 font-mono text-sm text-white/50">
            All reports are permanently logged. Your identity is &quot;anonymous&quot;.
          </p>
        </motion.div>

        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 border-2 border-bureau-orange bg-bureau-orange/10 p-4"
          >
            <p className="mb-2 flex items-center gap-2 font-display text-bureau-orange">
              <FiAlertTriangle /> VALIDATION FAILURE
            </p>
            {errors.map((err) => (
              <p key={err} className="font-mono text-xs text-bureau-neon">
                ▸ {err}
              </p>
            ))}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Field label="Citizen Name">
            <input
              value={citizenName}
              onChange={(e) => setCitizenName(e.target.value)}
              placeholder="e.g. John Smith"
              className="input-bureau"
            />
          </Field>

          <Field label="Offence Category">
            <select
              value={offence}
              onChange={(e) => setOffence(e.target.value)}
              className="input-bureau"
            >
              {OFFENCES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Threat Level">
            <select
              value={threatLevel}
              onChange={(e) => setThreatLevel(Number(e.target.value))}
              className="input-bureau"
            >
              {THREAT_LEVELS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <input
              type="range"
              min={1}
              max={10}
              value={threatLevel}
              onChange={(e) => setThreatLevel(Number(e.target.value))}
              className="mt-2 w-full accent-bureau-red"
            />
          </Field>

          <Field label="Incident Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe suspicious behaviour in excessive detail..."
              className="input-bureau resize-none"
            />
          </Field>

          <Field label="Upload Evidence">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleEvidence(e.target.files?.[0] ?? null)}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 border-2 border-dashed border-bureau-gold/50 py-6 font-mono text-sm text-bureau-gold hover:border-bureau-gold hover:bg-bureau-gold/10"
            >
              <FiUpload />
              {evidenceFile ? evidenceFile.name : 'UPLOAD SURVEILLANCE EVIDENCE'}
            </button>
            {imageAnalysis && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 font-mono text-xs text-bureau-neon"
              >
                AI PRE-SCAN: {imageAnalysis}
              </motion.p>
            )}
          </Field>

          <Field label={`Patriotism Rating: ${patriotismRating}%`}>
            <input
              type="range"
              min={0}
              max={100}
              value={patriotismRating}
              onChange={(e) => setPatriotismRating(Number(e.target.value))}
              className="w-full accent-bureau-gold"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
              <span>TRAITOR</span>
              <span>SUPREME PATRIOT</span>
            </div>
          </Field>

          <div className="flex flex-col gap-4 sm:flex-row">
            <BureauButton type="submit" variant="primary" className="flex-1">
              Submit to Bureau
            </BureauButton>
            <BureauButton type="button" variant="danger" onClick={handleEmergency} className="flex-1">
              REPORT ENTIRE DISTRICT
            </BureauButton>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-bureau-gold">
        {label}
      </label>
      {children}
    </div>
  )
}
