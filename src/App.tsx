import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  emails, carlosEmailBody, contractText, bondDocumentText,
  insuranceRequirements, suretyRequirements,
  clientCoverage, clientProfile, equipment, equipmentSummary,
  carriers, suretyCarriers,
  quotes, suretyQuotes,
  negotiations, qualitasPortalFields,
  caratulaData, comparisonMatrixGrouped,
  pipelineProjects, submissionDocuments, routingRules,
  recommendationLetter,
  bi,
  type Email, type InsuranceRequirement, type SuretyRequirement,
  type ComparisonRow, type MatrixCell, type CellStatus, type ComparisonGroup,
} from './fixtures'
import { LangContext, useLang, t, type Lang } from './i18n'
import { CarrierLogo, CarrierLogoByName } from './carrier-logos'

const MAX_BEAT = 16

// ============================================================
//  SVG ICONS (no emojis, no libraries)
// ============================================================
const Icon = {
  mail: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  send: (c = '#5f6368') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  search: (c = '#5f6368') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  star: (c = '#dadce0') => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  starFilled: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#f4b400" stroke="#f4b400" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  attachment: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
  inbox: (c = '#202124') => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  compose: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1v-4" stroke="#001d35" strokeWidth="1.5" strokeLinecap="round"/><path d="M20.385 6.585a2.1 2.1 0 00-2.97-2.97L9 12v3h3l8.385-8.415z" stroke="#001d35" strokeWidth="1.5"/></svg>,
  shield: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  fileText: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  alertTriangle: (c = '#f59e0b') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  checkCircle: (c = '#16a34a') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  xCircle: (c = '#dc2626') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  building: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="4" y="2" width="16" height="20"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg>,
  truck: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  clock: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  dollarSign: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  scale: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M12 3v18"/><path d="M1 8l4-4 4 4"/><path d="M15 8l4-4 4 4"/><path d="M1 8a4 4 0 0 0 8 0"/><path d="M15 8a4 4 0 0 0 8 0"/></svg>,
  handshake: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><path d="M8 16l2-2 4 4 4-4"/></svg>,
  sparkle: (c = '#E94D35') => <svg width="14" height="14" viewBox="0 0 24 24" fill={c} stroke="none"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>,
  chevronRight: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
  chevronDown: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  arrowLeft: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  gps: (c = '#16a34a') => <svg width="12" height="12" viewBox="0 0 24 24" fill={c} stroke="none"><circle cx="12" cy="12" r="6"/></svg>,
  download: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  share: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  grid: (c = '#5f6368') => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
}

// ============================================================
//  HELPERS
// ============================================================
function fmt(n: number): string {
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  return n < 0 ? `-Mex$${formatted}` : `Mex$${formatted}`
}

function CurrencyNote() {
  const { lang } = useLang()
  return (
    <div className="text-[11px] text-[#9CA3AF] mb-3 flex items-center gap-1.5">
      <span>{lang === 'es' ? 'Cifras en pesos mexicanos (MXN)' : 'Amounts in Mexican Pesos (MXN)'}</span>
    </div>
  )
}

function statusColor(s: CellStatus): string {
  switch (s) {
    case 'cumple': return 'matrix-cell-green'
    case 'excede': return 'matrix-cell-green'
    case 'insuficiente': return 'matrix-cell-yellow'
    case 'no-incluido': return 'matrix-cell-yellow'
    case 'exclusion': return 'matrix-cell-red'
  }
}

function stageColor(stage: string): string {
  switch (stage) {
    case 'new': return 'lumif-badge-coral'
    case 'quoting': return 'lumif-badge-info'
    case 'submitted': return 'lumif-badge-info'
    case 'comparison': return 'lumif-badge-warning'
    case 'negotiating': return 'lumif-badge-warning'
    case 'placed': return 'lumif-badge-success'
    case 'active': return 'lumif-badge-success'
    case 'renewal': return 'lumif-badge-danger'
    default: return ''
  }
}

// Beat to active tab mapping
function getActiveTab(beat: number): 'gmail' | 'lumif' | 'portal' {
  if (beat === 1 || beat === 2) return 'gmail'
  if (beat === 8) return 'portal'
  if (beat === 10) return 'gmail'
  if (beat === 16) return 'gmail'
  return 'lumif'
}

// Phase navigation for left nav
type Phase = { label: { es: string; en: string }; beatRange: [number, number] }
const phases: Phase[] = [
  { label: { es: 'Perfil de Cliente', en: 'Client Profile' }, beatRange: [3, 3] },
  { label: { es: 'Analisis de Documentos', en: 'Document Analysis' }, beatRange: [4, 5] },
  { label: { es: 'Evaluacion de Gaps', en: 'Gap Assessment' }, beatRange: [6, 6] },
  { label: { es: 'Seleccion y Envio', en: 'Carrier Selection' }, beatRange: [7, 7] },
  { label: { es: 'Solicitudes', en: 'Submission' }, beatRange: [8, 10] },
  { label: { es: 'Cotizaciones y Comparacion', en: 'Quotes & Comparison' }, beatRange: [11, 15] },
  { label: { es: 'Envio al Cliente', en: 'Send to Client' }, beatRange: [16, 16] },
]

function getPhaseIndex(beat: number): number {
  for (let i = 0; i < phases.length; i++) {
    const [lo, hi] = phases[i].beatRange
    if (beat >= lo && beat <= hi) return i
  }
  return -1
}

// (getChapter removed — replaced by getPhaseIndex + LumifNav)

// ============================================================
//  APP (main orchestrator)
// ============================================================
export default function App() {
  const [beat, setBeat] = useState(0)
  const [lang, setLang] = useState<Lang>('es')
  const advance = useCallback(() => setBeat(b => Math.min(b + 1, MAX_BEAT)), [])
  const retreat = useCallback(() => setBeat(b => Math.max(b - 1, 0)), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); advance() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); retreat() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, retreat])

  const activeTab = getActiveTab(beat)
  const tabLabel = activeTab === 'gmail' ? 'Gmail' : activeTab === 'lumif' ? 'Lumif.ai' : 'Portal'

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <TabBar activeTab={activeTab} />
        <div className="flex-1 min-h-0 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'gmail' && (
              <motion.div key="gmail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                <GmailView beat={beat} />
              </motion.div>
            )}
            {activeTab === 'lumif' && (
              <motion.div key="lumif" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                <LumifView beat={beat} setBeat={setBeat} />
              </motion.div>
            )}
            {activeTab === 'portal' && (
              <motion.div key="portal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                <PortalView beat={beat} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="beat-indicator">
          {tabLabel} &middot; Beat {beat}/{MAX_BEAT} &middot; Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-[10px] font-mono mx-0.5">&rarr;</kbd>
        </div>
      </div>
    </LangContext.Provider>
  )
}

// ============================================================
//  TAB BAR
// ============================================================
function TabBar({ activeTab }: { activeTab: 'gmail' | 'lumif' | 'portal' }) {
  const { lang } = useLang()
  // Modern Gmail icon (2020+) - colorful M shape
  const GmailIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16">
      <rect x="1" y="4" width="22" height="16" rx="2" fill="#fff"/>
      <path d="M2 5l10 7.5L22 5" fill="none" stroke="#ea4335" strokeWidth="1.8" strokeLinejoin="round"/>
      <rect x="1" y="4" width="3" height="16" fill="#4285f4"/>
      <rect x="20" y="4" width="3" height="16" fill="#34a853"/>
      <path d="M1 18l8-6" fill="none" stroke="#fbbc05" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M23 18l-8-6" fill="none" stroke="#fbbc05" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
  return (
    <div className="tab-bar">
      <div className={`chrome-tab ${activeTab === 'gmail' ? 'active' : ''}`}>
        <div className="chrome-tab-icon">
          <GmailIcon />
        </div>
        <span className="chrome-tab-title">seguros@alayaseguros.com.mx</span>
        {activeTab === 'gmail' && <svg className="ml-auto mr-1 opacity-0 group-hover:opacity-100" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
      </div>
      <div className={`chrome-tab ${activeTab === 'lumif' ? 'active' : ''}`}>
        <div className="chrome-tab-icon">
          <svg width="16" height="16" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#E94D35"/><text x="10" y="14" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Inter">L</text></svg>
        </div>
        <span className="chrome-tab-title">{t('tab.lumif', lang)}</span>
      </div>
      <div className={`chrome-tab ${activeTab === 'portal' ? 'active' : ''}`}>
        <div className="chrome-tab-icon">
          <CarrierLogo carrierId="mapfre" size={16} />
        </div>
        <span className="chrome-tab-title">{lang === 'es' ? 'Mapfre Portal Agentes' : 'Mapfre Agent Portal'}</span>
      </div>
      <div className="w-7 h-7 rounded-full hover:bg-[#d2d4d7] flex items-center justify-center cursor-pointer ml-1 mb-[5px] self-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>
    </div>
  )
}

// ============================================================
//  LEFT NAV (replaces BreadcrumbStepper)
// ============================================================
function LumifNav({ beat, setBeat }: { beat: number; setBeat: (b: number) => void }) {
  const { lang } = useLang()
  const currentPhase = getPhaseIndex(beat)
  return (
    <div className="w-[200px] shrink-0 flex flex-col border-r border-[#E5E7EB] overflow-y-auto" style={{ background: '#FAFAFA' }}>
      <div className="px-4 pt-4 pb-2">
        <button onClick={() => setBeat(0)} className="flex items-center gap-1.5 text-[12px] text-[#6B7280] hover:text-[#E94D35] mb-4 transition-colors">
          {Icon.arrowLeft('#9CA3AF')}
          <span>{lang === 'es' ? 'Todos los Proyectos' : 'All Projects'}</span>
        </button>
        <div className="text-[11px] font-bold text-[#121212] uppercase tracking-wide leading-tight">Constructora del Pacifico</div>
        <div className="text-[13px] font-semibold text-[#121212] mt-1">Autopista GDL-Tepic</div>
        <div className="text-[11px] text-[#6B7280] mt-0.5">Mex$500M MXN &middot; 167 km</div>
      </div>
      <div className="mx-4 my-2 h-[1px] bg-[#E5E7EB]" />
      <div className="px-3 py-1 flex-1">
        {phases.map((phase, i) => {
          const isComplete = i < currentPhase
          const isCurrent = i === currentPhase
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg cursor-pointer transition-colors group"
              style={isCurrent ? { background: 'rgba(233,77,53,0.08)' } : undefined}
              onClick={() => setBeat(phase.beatRange[0])}
            >
              {isComplete ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : isCurrent ? (
                <div className="w-[14px] h-[14px] flex items-center justify-center">
                  <div className="w-[10px] h-[10px] rounded-sm" style={{ background: '#E94D35' }} />
                </div>
              ) : (
                <div className="w-[14px] h-[14px] flex items-center justify-center">
                  <div className="w-[10px] h-[10px] rounded-full border-2 border-[#D1D5DB]" />
                </div>
              )}
              <span className={`text-[12px] leading-tight ${isCurrent ? 'font-semibold text-[#E94D35]' : isComplete ? 'text-[#374151]' : 'text-[#9CA3AF]'} group-hover:text-[#121212] transition-colors`}>
                {phase.label[lang]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
//  GMAIL VIEW
// ============================================================
function GmailView({ beat }: { beat: number }) {
  const { lang } = useLang()
  const showThread = beat === 2
  const showSentEmails = beat === 10 || beat === 16
  const showClientReply = false
  return (
    <div className="flex flex-col h-full gmail-body-font" style={{ background: '#f6f8fc' }}>
      <GmailTopBar />
      <div className="flex flex-1 min-h-0">
        {/* Far-left icon rail */}
        <div className="w-[40px] flex flex-col items-center pt-1 shrink-0 gap-0.5">
          <div className="w-8 h-8 rounded-full bg-[#d3e3fd] flex items-center justify-center cursor-pointer relative">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#444746"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span className="absolute -top-0.5 -right-0.5 bg-[#ea4335] text-white text-[8px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">24</span>
          </div>
          <div className="text-[10px] text-[#444746] font-medium mb-2">Mail</div>
          <div className="w-8 h-8 rounded-full hover:bg-[#e8eaed] flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          </div>
          <div className="text-[10px] text-[#444746] mb-2">Chat</div>
          <div className="w-8 h-8 rounded-full hover:bg-[#e8eaed] flex items-center justify-center cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="1.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          </div>
          <div className="text-[10px] text-[#444746]">Meet</div>
        </div>

        {/* Sidebar */}
        <div className="w-[200px] flex flex-col shrink-0 pt-1">
          <button className="gmail-compose-btn">
            {Icon.compose()}
            <span>{t('gmail.compose', lang)}</span>
          </button>
          <div className={`gmail-nav-item ${!showSentEmails ? 'active' : ''}`}>
            {Icon.inbox(!showSentEmails ? '#202124' : '#5f6368')}
            <span>{t('gmail.inbox', lang)}</span>
            <span className="gmail-nav-count">24</span>
          </div>
          <div className="gmail-nav-item">{Icon.star('#5f6368')}<span style={{ fontWeight: 400 }}>{t('gmail.starred', lang)}</span></div>
          <div className="gmail-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ fontWeight: 400 }}>{t('gmail.snoozed', lang)}</span>
          </div>
          <div className={`gmail-nav-item ${showSentEmails ? 'active' : ''}`}>{Icon.send(showSentEmails ? '#202124' : '#5f6368')}<span style={{ fontWeight: showSentEmails ? 700 : 400 }}>{t('gmail.sent', lang)}</span>{showSentEmails && <span className="gmail-nav-count">{beat === 16 ? 5 : 4}</span>}</div>
          <div className="gmail-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span style={{ fontWeight: 400 }}>{t('gmail.drafts', lang)}</span>
            <span className="gmail-nav-count">3</span>
          </div>
          <div className="gmail-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            <span style={{ fontWeight: 400 }}>{t('gmail.more', lang)}</span>
          </div>
          <div className="mt-4 px-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-medium text-[#444746]">{t('gmail.labels', lang)}</span>
              <span className="text-[#444746] cursor-pointer text-lg leading-none">+</span>
            </div>
            <div className="gmail-nav-item" style={{ fontSize: 13, height: 28, paddingLeft: 12, gap: 12 }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: '#e91e63' }} />
              <span style={{ fontWeight: 400 }}>{t('gmail.clients', lang)}</span>
            </div>
            <div className="gmail-nav-item" style={{ fontSize: 13, height: 28, paddingLeft: 12, gap: 12 }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: '#2196f3' }} />
              <span style={{ fontWeight: 400 }}>{t('gmail.carriers', lang)}</span>
            </div>
            <div className="gmail-nav-item" style={{ fontSize: 13, height: 28, paddingLeft: 12, gap: 12 }}>
              <div className="w-3 h-3 rounded-sm" style={{ background: '#4caf50' }} />
              <span style={{ fontWeight: 400 }}>{t('gmail.bonds', lang)}</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-white rounded-tl-2xl overflow-hidden flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto bg-white">
            {showClientReply ? <GmailClientReply /> : showSentEmails ? <GmailSentEmails beat={beat} /> : showThread ? <GmailThread beat={beat} /> : <GmailInbox beat={beat} />}
          </div>
        </div>

        {/* Right sidebar icons */}
        <div className="w-[48px] flex flex-col items-center pt-3 gap-4 shrink-0 border-l border-[#e0e0e0]">
          <div className="w-8 h-8 rounded-full hover:bg-[#e8eaed] flex items-center justify-center cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div className="w-8 h-8 rounded-full hover:bg-[#e8eaed] flex items-center justify-center cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          </div>
          <div className="flex-1" />
        </div>
      </div>
    </div>
  )
}

function GmailTopBar() {
  const { lang } = useLang()
  return (
    <div className="h-[52px] flex items-center px-2 shrink-0" style={{ background: '#f6f8fc' }}>
      <div className="flex items-center shrink-0" style={{ width: 240 }}>
        <div className="w-12 h-12 rounded-full hover:bg-[#e8eaed] flex items-center justify-center cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </div>
        <div className="flex items-center gap-2 ml-1">
          <svg viewBox="0 0 24 24" width="28" height="22">
            {/* Modern Gmail multicolor M icon */}
            <rect x="1" y="4" width="22" height="16" rx="2" fill="#fff" stroke="#e0e0e0" strokeWidth="0.5"/>
            <path d="M2 5l10 7.5L22 5" fill="none" stroke="#ea4335" strokeWidth="2" strokeLinejoin="round"/>
            <rect x="1" y="4" width="3" height="16" rx="0" fill="#4285f4"/>
            <rect x="20" y="4" width="3" height="16" rx="0" fill="#34a853"/>
            <path d="M1 18l8-6" fill="none" stroke="#fbbc05" strokeWidth="2" strokeLinecap="round"/>
            <path d="M23 18l-8-6" fill="none" stroke="#fbbc05" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[22px] text-[#5f6368]" style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 400 }}>Gmail</span>
        </div>
      </div>
      <div className="flex-1 max-w-[720px]">
        <div className="flex items-center bg-[#eaf1fb] rounded-full h-[44px] px-4 gap-3 cursor-pointer">
          {Icon.search('#444746')}
          <span className="flex-1 text-[16px] text-[#444746]">{t('gmail.searchMail', lang)}</span>
        </div>
      </div>
      <div className="flex items-center gap-0 ml-auto shrink-0 pr-2">
        <div className="w-10 h-10 rounded-full bg-[#e91e63] flex items-center justify-center text-white text-[16px] font-medium cursor-pointer ml-3">M</div>
      </div>
    </div>
  )
}

// ============================================================
//  GMAIL INBOX
// ============================================================
function GmailSentEmails({ beat }: { beat: number }) {
  const { lang } = useLang()
  // On beat 16, show the comparison sent to Carlos at the top
  const comparisonEmail = beat === 16 ? [{
    toName: 'Carlos Martinez (Constructora del Pacifico)',
    subject: lang === 'es' ? 'Comparativo de Cotizaciones — Autopista GDL-Tepic' : 'Quote Comparison — GDL-Tepic Highway',
    time: lang === 'es' ? 'Hace 1 min' : '1 min ago',
    isNew: true,
    isRecommendation: true,
  }] : []
  // New carrier submissions (highlighted)
  const newSentEmails = [
    { toName: 'Chubb Mexico — Suscripcion', subject: lang === 'es' ? 'Solicitud de Cotizacion — Todo Riesgo Construccion — Autopista GDL-Tepic' : 'Quote Request — All Risk Construction — GDL-Tepic Highway', time: '10:14 AM', isNew: true },
    { toName: 'Zurich Mexico — Comercial', subject: lang === 'es' ? 'Solicitud de Cotizacion — Todo Riesgo Construccion — Autopista GDL-Tepic' : 'Quote Request — All Risk Construction — GDL-Tepic Highway', time: '10:14 AM', isNew: true },
    { toName: 'Afianzadora Aserta', subject: lang === 'es' ? 'Solicitud de Fianzas — Constructora del Pacifico — Autopista GDL-Tepic' : 'Surety Bond Request — Constructora del Pacifico — GDL-Tepic Highway', time: '10:13 AM', isNew: true },
    { toName: 'Fianzas Dorama', subject: lang === 'es' ? 'Solicitud de Fianzas — Constructora del Pacifico — Autopista GDL-Tepic' : 'Surety Bond Request — Constructora del Pacifico — GDL-Tepic Highway', time: '10:13 AM', isNew: true },
  ]
  // Prior sent emails (normal Gmail style)
  const priorSentEmails = [
    { toName: 'Carlos Martinez', subject: lang === 'es' ? 'Re: Solicitud de seguro y fianza — Autopista Guadalajara-Tepic' : 'Re: Insurance & surety request — Guadalajara-Tepic Highway', time: '9:45 AM', isNew: false },
    { toName: 'Roberto Sanchez (Mapfre)', subject: lang === 'es' ? 'Re: Confirmacion de Cotizacion — Todo Riesgo' : 'Re: Quote Confirmation — All Risk', time: 'Abr 8', isNew: false },
    { toName: 'Ana Lucia Rojas (CEMEX)', subject: lang === 'es' ? 'Poliza flotante de equipo — Confirmacion' : 'Equipment floater policy — Confirmation', time: 'Abr 7', isNew: false },
    { toName: 'Sergio Avelar', subject: lang === 'es' ? 'Re: Estatus fianza Constructora del Pacifico' : 'Re: Surety status Constructora del Pacifico', time: 'Abr 7', isNew: false },
    { toName: 'Fernando Medina (Grupo ICA)', subject: lang === 'es' ? 'Re: Ampliacion de cobertura — Metro Linea 4' : 'Re: Coverage extension — Metro Line 4', time: 'Abr 6', isNew: false },
    { toName: 'Contabilidad Alaya', subject: lang === 'es' ? 'Re: Comisiones Marzo 2026' : 'Re: March 2026 Commissions', time: 'Abr 5', isNew: false },
  ]
  const allEmails = [...comparisonEmail, ...newSentEmails, ...priorSentEmails]

  // On beat 16, show the expanded email thread for comparison sent to client
  if (beat === 16) {
    const comparisonAttachments = [
      { name: 'Comparativo_Seguros_GDL_Tepic.pdf', size: '1.2 MB' },
      { name: 'Comparativo_Fianzas_GDL_Tepic.pdf', size: '0.8 MB' },
      { name: 'Resumen_Cotizaciones_GDL_Tepic.xlsx', size: '0.4 MB' },
    ]
    return (
      <div className="pb-8">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#e8eaed] rounded-full">
            {Icon.arrowLeft('#5f6368')}
          </div>
        </div>
        <h1 className="gmail-thread-subject">
          {lang === 'es' ? 'Comparativo de Cotizaciones — Autopista GDL-Tepic' : 'Quote Comparison — GDL-Tepic Highway'}
          <span className="text-[12px] bg-[#e8eaed] text-[#5f6368] px-2 py-0.5 rounded ml-2 font-medium align-middle">{lang === 'es' ? 'Enviados' : 'Sent'}</span>
        </h1>
        <div className="gmail-message">
          <div className="gmail-message-header">
            <div className="gmail-message-avatar" style={{ background: '#E94D35' }}>M</div>
            <div className="gmail-message-meta">
              <div className="gmail-message-sender">Maria Elena Gutierrez <span className="gmail-message-email">&lt;maria.elena@alayaseguros.com.mx&gt;</span></div>
              <div className="gmail-message-email">{lang === 'es' ? 'para' : 'to'} Carlos Martinez &lt;carlos.martinez@constructorapacifico.com.mx&gt;</div>
            </div>
            <div className="gmail-message-time">{lang === 'es' ? 'Hace 1 min' : '1 min ago'}</div>
          </div>
          <div className="gmail-message-body">
            {lang === 'es'
              ? `Estimado Ing. Martinez,

Adjunto el cuadro comparativo de cotizaciones para el proyecto Autopista Guadalajara-Tepic.

Se incluyen:

1. Comparativo de Seguros — 4 aseguradoras cotizaron (Mapfre, GNP, Chubb, Zurich). Mapfre ofrece la prima mas baja (Mex$847,000) con cobertura completa y Endoso 014 (Vibracion) disponible. Zurich presenta exclusion critica de vibracion.

2. Comparativo de Fianzas — 2 afianzadoras cotizaron (Aserta, Dorama). Aserta cumple al 100% con los montos requeridos y cuenta con linea pre-aprobada. Dorama ofrece monto insuficiente en fianza de buena calidad.

3. Resumen ejecutivo con desglose de primas y condiciones principales.

Quedo a sus ordenes para resolver cualquier duda o programar una llamada para revisar las opciones.

Atentamente,
Lic. Maria Elena Gutierrez
Alaya Seguros
Tel: +52 33 1234-5678`
              : `Dear Eng. Martinez,

Please find attached the quote comparison for the Guadalajara-Tepic Highway project.

Included:

1. Insurance Comparison — 4 carriers quoted (Mapfre, GNP, Chubb, Zurich). Mapfre offers the lowest premium (Mex$847,000) with full coverage and Endorsement 014 (Vibration) available. Zurich has a critical vibration exclusion.

2. Surety Bond Comparison — 2 surety companies quoted (Aserta, Dorama). Aserta meets 100% of required amounts with a pre-approved line. Dorama offers insufficient amount on the quality guarantee bond.

3. Executive summary with premium breakdown and key terms.

Please let me know if you have any questions or would like to schedule a call to review the options.

Sincerely,
Lic. Maria Elena Gutierrez
Alaya Seguros
Tel: +52 33 1234-5678`}
          </div>
          <div className="mx-[68px] mb-4 flex gap-3 flex-wrap">
            {comparisonAttachments.map((att, ai) => (
              <div key={ai} className="flex items-center gap-3 p-3 border border-[#e8eaed] rounded-lg hover:bg-[#f8f9fa] cursor-pointer" style={{ maxWidth: 320 }}>
                <div style={{ width: 40, height: 40, borderRadius: 6, background: att.name.endsWith('.xlsx') ? '#0F9D58' : '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>{att.name.endsWith('.xlsx') ? 'XLS' : 'PDF'}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-[#202124] truncate">{att.name}</div>
                  <div className="text-[11px] text-[#5f6368]">{att.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Gmail sent toolbar */}
      <div className="flex items-center h-[40px] px-2 border-b border-[#e0e0e0]">
        <div className="flex items-center gap-0">
          <div className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[#e8eaed] rounded">
            <input type="checkbox" className="w-[18px] h-[18px] opacity-40" readOnly />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-0 text-[12px] text-[#5f6368]">
          <span>1-10 {lang === 'es' ? 'de' : 'of'} 842</span>
        </div>
      </div>
      {allEmails.map((email, i) => (
        <div key={i} className={`gmail-row ${email.isNew ? 'unread' : ''}`} style={email.isNew ? { background: '#fef7e0' } : undefined}>
          <div className="gmail-row-checkbox">
            <div className="w-[18px] h-[18px] rounded border border-[#c4c7c5]" />
          </div>
          <div className="gmail-row-star">{Icon.star()}</div>
          <div className="gmail-row-sender" style={{ color: '#202124' }}>
            {lang === 'es' ? 'Para: ' : 'To: '}{email.toName}
          </div>
          <div className="gmail-row-content">
            <span className={`gmail-row-subject ${email.isNew ? '' : ''}`}>{email.subject}</span>
          </div>
          {email.isNew && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e8f0fe] text-[#1a73e8] font-medium mx-1">Lumif.ai</span>}
          {'isRecommendation' in email && (email as {isRecommendation?: boolean}).isRecommendation && (
            <span className="flex items-center gap-1 mx-1">{Icon.attachment()}<span className="text-[10px] text-[#5f6368]">3</span></span>
          )}
          <div className="gmail-row-time">{email.time}</div>
        </div>
      ))}
    </div>
  )
}

function GmailClientReply() {
  const { lang } = useLang()
  return (
    <div>
      {/* Thread view — Carlos's reply to comparison */}
      <div className="gmail-thread-subject">
        {lang === 'es' ? 'Re: Cuadro Comparativo de Cotizaciones — Autopista GDL-Tepic' : 'Re: Quote Comparison & Analysis — GDL-Tepic Highway'}
        <span className="text-[12px] text-[#5f6368] font-normal ml-2">{lang === 'es' ? '(2 mensajes)' : '(2 messages)'}</span>
      </div>

      {/* Original sent message (collapsed) */}
      <div className="gmail-message mx-[60px] mb-1">
        <div className="gmail-message-header" style={{ padding: '12px 16px' }}>
          <div className="gmail-message-avatar" style={{ background: '#E94D35', width: 32, height: 32, fontSize: 13 }}>M</div>
          <div className="gmail-message-meta">
            <div className="gmail-message-sender" style={{ fontSize: 13 }}>
              Lic. Maria Elena Gutierrez
              <span className="text-[11px] font-normal text-[#5f6368] ml-1">&lt;seguros@alayaseguros.com.mx&gt;</span>
            </div>
          </div>
          <div className="gmail-message-time" style={{ fontSize: 11 }}>10:42 AM</div>
        </div>
        <div style={{ padding: '4px 16px 12px 60px', fontSize: 13, color: '#5f6368' }}>
          {lang === 'es' ? 'Estimado Ing. Martinez, adjunto el cuadro comparativo de cotizaciones para el proyecto Autopista GDL-Tepic...' : 'Dear Eng. Martinez, attached the quote comparison for the GDL-Tepic Highway project...'}
          <div className="flex gap-2 mt-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#dadce0] text-[11px] hover:bg-[#f1f3f4] cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#dc2626" strokeWidth="1.5"/><text x="12" y="15" textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="700">PDF</text></svg>
              {lang === 'es' ? 'Resumen_Ejecutivo.pdf' : 'Executive_Summary.pdf'}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#dadce0] text-[11px] hover:bg-[#f1f3f4] cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#dc2626" strokeWidth="1.5"/><text x="12" y="15" textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="700">PDF</text></svg>
              {lang === 'es' ? 'Cuadro_Comparativo.pdf' : 'Comparison_Matrix.pdf'}
            </div>
          </div>
        </div>
      </div>

      {/* Carlos's reply (expanded) */}
      <div className="gmail-message mx-[60px] mb-2" style={{ border: '1px solid #1a73e8' }}>
        <div className="gmail-message-header">
          <div className="gmail-message-avatar" style={{ background: '#e91e63' }}>C</div>
          <div className="gmail-message-meta">
            <div className="gmail-message-sender">
              Carlos Martinez
              <span className="text-[11px] font-normal text-[#5f6368] ml-1">&lt;carlos.martinez@constructorapacifico.com.mx&gt;</span>
            </div>
            <div className="gmail-message-email">{lang === 'es' ? 'para mi' : 'to me'}</div>
          </div>
          <div className="gmail-message-time">{lang === 'es' ? 'Hace 12 min' : '12 min ago'}</div>
        </div>
        <div className="gmail-message-body">
          {lang === 'es'
            ? `Estimada Lic. Gutierrez,

Gracias por el analisis tan detallado. Revisamos el cuadro comparativo con nuestro equipo.

Coincidimos en que Mapfre es la mejor opcion para los seguros y Afianzadora Aserta para las fianzas.

Solo un punto: ¿seria posible negociar el deducible de Mapfre en el ramo de equipo de construccion a Mex$200,000? Actualmente esta en Mex$250,000 y nos gustaria reducirlo.

Por lo demas, favor de proceder con la colocacion.

Saludos cordiales,

Ing. Carlos Martinez Hernandez
Director de Proyectos
Constructora del Pacifico S.A. de C.V.`
            : `Dear Lic. Gutierrez,

Thank you for such a detailed analysis. We reviewed the comparison matrix with our team.

We agree that Mapfre is the best option for insurance and Afianzadora Aserta for surety bonds.

Just one point: would it be possible to negotiate the Mapfre deductible for construction equipment down to Mex$200,000? It's currently at Mex$250,000 and we'd like to reduce it.

Otherwise, please proceed with the placement.

Best regards,

Eng. Carlos Martinez Hernandez
Director of Projects
Constructora del Pacifico S.A. de C.V.`}
        </div>
      </div>

      {/* Action bar at bottom */}
      <div className="mx-[60px] mt-4 p-3 rounded-lg" style={{ background: 'rgba(233,77,53,0.05)', border: '1px solid rgba(233,77,53,0.15)' }}>
        <div className="flex items-center gap-3">
          {Icon.sparkle('#E94D35')}
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-[#121212]">{lang === 'es' ? 'Instruccion del cliente recibida' : 'Client instruction received'}</div>
            <div className="text-[11px] text-[#6B7280]">{lang === 'es' ? 'Aprueba Mapfre + Aserta. Solicita negociar deducible equipo a Mex$200K MXN. Capturado en Lumif.ai automaticamente.' : 'Approves Mapfre + Aserta. Requests equipment deductible negotiation to Mex$200K MXN. Captured in Lumif.ai automatically.'}</div>
          </div>
          <span className="lumif-badge lumif-badge-success">{lang === 'es' ? 'Capturado' : 'Captured'}</span>
        </div>
      </div>
    </div>
  )
}

function GmailInbox({ beat }: { beat: number }) {
  const { lang } = useLang()
  return (
    <div>
      <div className="flex items-center h-[40px] px-2 border-b border-[#e0e0e0]">
        <div className="flex items-center gap-0">
          <div className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-[#e8eaed] rounded">
            <input type="checkbox" className="w-[18px] h-[18px] opacity-40" readOnly />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-0 text-[12px] text-[#5f6368]">
          <span>1-15 {t('gmail.of', lang)} 1,247</span>
        </div>
      </div>
      <div className="flex items-center h-[44px] border-b border-[#e0e0e0]">
        <div className="flex items-center gap-3 px-5 h-full text-[13px] font-medium text-[#1a73e8] border-b-[3px] border-[#1a73e8] cursor-pointer">
          {Icon.inbox('#1a73e8')}
          <span>{t('gmail.primary', lang)}</span>
        </div>
        <div className="flex items-center gap-3 px-5 h-full text-[13px] text-[#5f6368] cursor-pointer hover:bg-[#f2f2f2]">
          <span>{t('gmail.promotions', lang)}</span>
        </div>
        <div className="flex items-center gap-3 px-5 h-full text-[13px] text-[#5f6368] cursor-pointer hover:bg-[#f2f2f2]">
          <span>{t('gmail.social', lang)}</span>
        </div>
      </div>
      {emails.map((email: Email, i: number) => (
        <div key={email.id} className={`gmail-row ${email.unread ? 'unread' : ''}`} style={i === 0 && beat === 1 ? { background: '#c2dbff' } : undefined}>
          <div className="gmail-row-checkbox"><input type="checkbox" className="w-[18px] h-[18px] opacity-40 cursor-pointer" readOnly /></div>
          <div className="gmail-row-star">{email.starred ? Icon.starFilled() : Icon.star()}</div>
          <div className="gmail-row-sender">{email.from}</div>
          <div className="gmail-row-content">
            <span className="gmail-row-subject">{email.subject[lang]}</span>
            <span className="gmail-row-snippet">{email.snippet[lang]}</span>
          </div>
          <div className="gmail-row-attachment">{email.hasAttachment && Icon.attachment()}</div>
          <div className="gmail-row-time">{email.time}</div>
        </div>
      ))}
    </div>
  )
}

// ============================================================
//  GMAIL THREAD
// ============================================================
function GmailThread({ beat }: { beat: number }) {
  const { lang } = useLang()
  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#e8eaed] rounded-full">
          {Icon.arrowLeft('#5f6368')}
        </div>
      </div>
      <h1 className="gmail-thread-subject">
        {emails[0].subject[lang]}
        <span className="text-[12px] bg-[#e8eaed] text-[#5f6368] px-2 py-0.5 rounded ml-2 font-medium align-middle">{t('gmail.inbox', lang)}</span>
      </h1>
      <div className="gmail-message">
        <div className="gmail-message-header">
          <div className="gmail-message-avatar" style={{ background: '#e91e63' }}>C</div>
          <div className="gmail-message-meta">
            <div className="gmail-message-sender">Carlos Martinez <span className="gmail-message-email">&lt;carlos.martinez@constructorapacifico.com.mx&gt;</span></div>
            <div className="gmail-message-email">{lang === 'es' ? 'para mi' : 'to me'}</div>
          </div>
          <div className="gmail-message-time">9:14 AM ({lang === 'es' ? 'hace 23 minutos' : '23 minutes ago'})</div>
        </div>
        <div className="gmail-message-body">{carlosEmailBody[lang]}</div>
        <div className="mx-[68px] mb-4 flex gap-3">
          <div className="flex items-center gap-3 p-3 border border-[#e8eaed] rounded-lg hover:bg-[#f8f9fa] cursor-pointer" style={{ maxWidth: 320 }}>
            <div style={{ width: 40, height: 40, borderRadius: 6, background: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>PDF</span>
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-[#202124] truncate">Contrato_MSA_Autopista_GDL_Tepic.pdf</div>
              <div className="text-[11px] text-[#5f6368]">2.4 MB</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border border-[#e8eaed] rounded-lg hover:bg-[#f8f9fa] cursor-pointer" style={{ maxWidth: 320 }}>
            <div style={{ width: 40, height: 40, borderRadius: 6, background: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>PDF</span>
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-[#202124] truncate">{lang === 'es' ? 'Requisitos_Fianzas_GDL_Tepic.pdf' : 'Surety_Requirements_GDL_Tepic.pdf'}</div>
              <div className="text-[11px] text-[#5f6368]">1.1 MB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
//  LUMIF.AI VIEW
// ============================================================
function LumifView({ beat, setBeat }: { beat: number; setBeat: (b: number) => void }) {
  const showNav = getActiveTab(beat) === 'lumif' && beat !== 0

  return (
    <div className="flex flex-col h-full lumif-font" style={{ background: '#FAFAFA' }}>
      <LumifHeader />
      <div className="flex flex-1 min-h-0">
        {showNav && <LumifNav beat={beat} setBeat={setBeat} />}
        <div className="flex-1 overflow-y-auto p-6">
          {beat === 0 && <PipelineDashboard isFinal={false} />}
          {beat === 3 && <ClientProfileView />}
          {(beat >= 4 && beat <= 5) && <ContractAnalysis beat={beat} />}
          {beat === 6 && <GapAnalysisSimplified />}
          {beat === 7 && <CarrierSelectionAndRouting />}
          {beat === 9 && <EmailApproval onApprove={() => setBeat(10)} />}
          {beat === 11 && <QuoteGrid beat={beat} partial={true} />}
          {beat === 12 && <PartialComparisonView />}
          {beat === 13 && <QuoteGrid beat={beat} partial={false} />}
          {beat === 14 && <ComparisonMatrixView expandedGroupIndex={2} beat={beat} />}
          {beat === 15 && <SuretyComparisonView />}
        </div>
      </div>
    </div>
  )
}

function LumifHeader() {
  const { lang, setLang } = useLang()
  return (
    <div className="lumif-header">
      <span className="lumif-header-logo">Lumif.ai</span>
      <div className="ml-4 flex items-center gap-2 px-3 py-1 rounded-lg" style={{ background: 'rgba(233,77,53,0.06)' }}>
        <span className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wide">{t('lumif.project', lang)}</span>
        <span className="text-[12px] font-semibold text-[#121212]">Autopista GDL-Tepic</span>
        <span className="text-[11px] text-[#6B7280]">&middot; Constructora del Pacifico</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center rounded-lg overflow-hidden border" style={{ borderColor: '#E5E7EB' }}>
          <button onClick={() => setLang('es')} className="px-3 py-1 text-[11px] font-medium transition-all" style={{ background: lang === 'es' ? '#E94D35' : 'transparent', color: lang === 'es' ? '#fff' : '#6B7280' }}>ES</button>
          <button onClick={() => setLang('en')} className="px-3 py-1 text-[11px] font-medium transition-all" style={{ background: lang === 'en' ? '#E94D35' : 'transparent', color: lang === 'en' ? '#fff' : '#6B7280' }}>EN</button>
        </div>
        <span className="text-[12px] text-[#6B7280]">Lic. Maria Elena Gutierrez</span>
        <div className="w-8 h-8 rounded-full bg-[#E94D35] flex items-center justify-center text-white text-[13px] font-medium">MG</div>
      </div>
    </div>
  )
}

function ClientPortalHeader() {
  const { lang } = useLang()
  return (
    <div className="h-[56px] flex items-center px-6 shrink-0" style={{ background: '#1e40af' }}>
      <span className="text-[18px] font-bold text-white">Constructora del Pacifico</span>
      <span className="text-[13px] text-white/70 ml-3">&mdash; {lang === 'es' ? 'Portal de Seguros' : 'Insurance Portal'}</span>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-[12px] text-white/80">Ing. Carlos Martinez</span>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-[13px] font-medium">CM</div>
      </div>
    </div>
  )
}

// ============================================================
//  BEAT 0 & 25 — PIPELINE DASHBOARD
// ============================================================
function PipelineDashboard({ isFinal }: { isFinal: boolean }) {
  const { lang } = useLang()
  const projects = pipelineProjects.map(p => {
    if (isFinal && p.id === 1) return { ...p, stage: 'placed', stageLabel: { es: 'Poliza Emitida', en: 'Policy Issued' }, daysInStage: 3, alert: false }
    return p
  })
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold text-[#121212]">{lang === 'es' ? 'Panel de Operaciones' : 'Operations Dashboard'}</h2>
      </div>
      <CurrencyNote />
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="lumif-card"><div className="lumif-metric"><span className="lumif-metric-value">247</span><span className="lumif-metric-label">{lang === 'es' ? 'Clientes activos' : 'Active Clients'}</span></div></div>
        <div className="lumif-card"><div className="lumif-metric"><span className="lumif-metric-value">412</span><span className="lumif-metric-label">{lang === 'es' ? 'Polizas vigentes' : 'Active Policies'}</span></div></div>
        <div className="lumif-card"><div className="lumif-metric"><span className="lumif-metric-value" style={{ color: '#E94D35' }}>Mex$120M</span><span className="lumif-metric-label">{lang === 'es' ? 'Prima en pipeline' : 'Pipeline Premium'}</span></div></div>
        <div className="lumif-card"><div className="lumif-metric"><span className="lumif-metric-value" style={{ color: '#ea580c' }}>12</span><span className="lumif-metric-label">{lang === 'es' ? 'Renovaciones (30 dias)' : 'Renewals (30 days)'}</span></div></div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border" style={{ borderColor: '#E5E7EB' }}>
            {Icon.search('#9CA3AF')}
            <span className="text-[13px] text-[#9CA3AF]">{lang === 'es' ? 'Buscar cliente o proyecto...' : 'Search client or project...'}</span>
          </div>
          <span className="lumif-badge lumif-badge-coral">{lang === 'es' ? 'Requieren atencion' : 'Need attention'}</span>
          <span className="lumif-badge" style={{ background: 'rgba(107,114,128,0.1)', color: '#6B7280' }}>{lang === 'es' ? 'Todos' : 'All'}</span>
        </div>
        <span className="text-[12px] text-[#9CA3AF]">{lang === 'es' ? 'Mostrando 8 de 247 proyectos activos' : 'Showing 8 of 247 active projects'}</span>
      </div>

      <div className="lumif-card p-0 overflow-hidden" style={{ maxHeight: 'calc(100vh - 380px)', overflowY: 'auto' }}>
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr style={{ background: '#FAFAFA' }}>
              {[lang === 'es' ? 'Cliente' : 'Client', lang === 'es' ? 'Proyecto' : 'Project', lang === 'es' ? 'Etapa' : 'Stage', lang === 'es' ? 'Prima' : 'Premium', lang === 'es' ? 'Dias' : 'Days', ''].map(h => (
                <th key={h} className="lumif-table-header text-left px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => {
              const isCarlos = p.id === 1
              const rowHighlight = isCarlos && !isFinal
              return (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="lumif-table-row cursor-pointer"
                  style={rowHighlight ? { borderLeft: '4px solid #E94D35', background: 'rgba(233,77,53,0.03)' } : isFinal && isCarlos ? { borderLeft: '4px solid #16a34a', background: 'rgba(34,197,94,0.03)' } : undefined}
                >
                  <td className="lumif-table-cell px-4 font-medium">
                    <span className="text-[#121212] hover:text-[#E94D35] transition-colors">{p.client}</span>
                  </td>
                  <td className="lumif-table-cell px-4">{p.project[lang]}</td>
                  <td className="lumif-table-cell px-4">
                    <span className={`lumif-badge ${stageColor(p.stage)}`}>{p.stageLabel[lang]}</span>
                  </td>
                  <td className="lumif-table-cell px-4 font-medium">{fmt(p.premium)}</td>
                  <td className="lumif-table-cell px-4">{p.daysInStage}{lang === 'es' ? 'd' : 'd'}</td>
                  <td className="lumif-table-cell px-2">
                    {p.alert ? Icon.alertTriangle('#dc2626') : <span className="text-[#E5E7EB]">{Icon.chevronRight('#D1D5DB')}</span>}
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================
//  BEAT 3 — CLIENT PROFILE
// ============================================================
function ExistingPolicyAttachments() {
  const { lang } = useLang()
  const finderFiles: { name: string; size: string; kind: string; date: string; icon: 'pdf' | 'docx' | 'xlsx' | 'html' | 'folder' }[] = [
    { name: 'Poliza_RC_Vigente_2025.pdf', size: '1.8 MB', kind: 'PDF Document', date: 'Apr 10, 2026 at 2:14 PM', icon: 'pdf' },
    { name: 'Poliza_Equipo_Construccion_2025.pdf', size: '2.1 MB', kind: 'PDF Document', date: 'Apr 10, 2026 at 1:47 PM', icon: 'pdf' },
    { name: 'Endoso_RC_2025.pdf', size: '0.9 MB', kind: 'PDF Document', date: 'Apr 9, 2026 at 11:30 AM', icon: 'pdf' },
    { name: 'Inventario_Equipo_2026.xlsx', size: '342 KB', kind: 'Microsoft Excel', date: 'Apr 9, 2026 at 10:05 AM', icon: 'xlsx' },
    { name: 'EEFF_CdelP_2025.pdf', size: '4.7 MB', kind: 'PDF Document', date: 'Apr 8, 2026 at 3:22 PM', icon: 'pdf' },
    { name: 'Acta_Constitutiva_CdelP.pdf', size: '1.2 MB', kind: 'PDF Document', date: 'Apr 7, 2026 at 9:15 AM', icon: 'pdf' },
    { name: 'Constancia_Fiscal_2026.pdf', size: '245 KB', kind: 'PDF Document', date: 'Apr 6, 2026 at 4:30 PM', icon: 'pdf' },
    { name: 'Programa_Obra_GDL_Tepic.docx', size: '890 KB', kind: 'Microsoft Word', date: 'Apr 5, 2026 at 2:10 PM', icon: 'docx' },
  ]
  const sidebarItems = [
    { label: 'Recents', icon: 'clock', active: false },
    { label: 'Downloads', icon: 'download', active: true },
    { label: 'Documents', icon: 'folder', active: false },
    { label: 'Desktop', icon: 'desktop', active: false },
  ]
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; status: 'uploading' | 'done' }[]>([])
  const [showFinder, setShowFinder] = useState(false)
  const [selectedFile, setSelectedFile] = useState<number | null>(null)

  const handleOpenFile = (idx: number) => {
    const file = finderFiles[idx]
    if (uploadedFiles.some(f => f.name === file.name)) return
    setShowFinder(false)
    setSelectedFile(null)
    setUploadedFiles(prev => [...prev, { name: file.name, size: file.size, status: 'uploading' }])
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(f => f.name === file.name ? { ...f, status: 'done' } : f))
    }, 1200)
  }

  const fileIconColor: Record<string, string> = { pdf: '#EA4335', docx: '#4285F4', xlsx: '#34A853', html: '#FF9800', folder: '#5f6368' }
  const fileIconLabel: Record<string, string> = { pdf: 'PDF', docx: 'W', xlsx: 'X', html: '<>', folder: '' }

  return (
    <div className="space-y-2">
      {/* Upload button */}
      <button
        onClick={() => setShowFinder(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-[#D1D5DB] hover:border-[#E94D35] hover:bg-[rgba(233,77,53,0.03)] transition-colors cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span className="text-[12px] font-medium text-[#6B7280]">{lang === 'es' ? 'Subir Archivo' : 'Upload File'}</span>
      </button>

      {/* macOS Finder-style file dialog */}
      <AnimatePresence>
        {showFinder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }}
            onClick={() => setShowFinder(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#F5F5F5] rounded-xl overflow-hidden shadow-2xl"
              style={{ width: 720, height: 460, border: '1px solid rgba(0,0,0,0.15)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}
            >
              {/* Titlebar */}
              <div className="flex items-center px-3 py-2" style={{ background: 'linear-gradient(180deg, #E8E8E8 0%, #D4D4D4 100%)', borderBottom: '1px solid #B8B8B8' }}>
                <div className="flex items-center gap-1.5">
                  <div onClick={() => setShowFinder(false)} className="w-3 h-3 rounded-full cursor-pointer" style={{ background: '#FF5F57', border: '1px solid #E0443E' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E', border: '1px solid #DEA123' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#28C840', border: '1px solid #1AAB29' }} />
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
                <div className="flex-1 text-center text-[13px] font-semibold text-[#333]">Downloads</div>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div className="flex" style={{ height: 'calc(100% - 36px)' }}>
                {/* Sidebar */}
                <div className="w-[150px] py-2 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.04)', borderRight: '1px solid #C8C8C8' }}>
                  <div className="px-3 py-1 text-[10px] font-semibold text-[#888] uppercase tracking-wider">Favorites</div>
                  {sidebarItems.map(item => (
                    <div key={item.label} className={`flex items-center gap-2 px-3 py-1 mx-1 rounded text-[12px] ${item.active ? 'bg-[#007AFF] text-white' : 'text-[#333] hover:bg-[rgba(0,0,0,0.05)]'} cursor-pointer`}>
                      {item.icon === 'clock' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                      {item.icon === 'download' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}
                      {item.icon === 'folder' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>}
                      {item.icon === 'desktop' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
                      <span>{item.label}</span>
                    </div>
                  ))}
                  <div className="px-3 py-1 mt-3 text-[10px] font-semibold text-[#888] uppercase tracking-wider">Locations</div>
                  <div className="flex items-center gap-2 px-3 py-1 mx-1 rounded text-[12px] text-[#333] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                    <span>sharan</span>
                  </div>
                </div>
                {/* File list */}
                <div className="flex-1 flex flex-col bg-white">
                  {/* Column headers */}
                  <div className="flex items-center px-3 py-1.5 text-[10px] font-semibold text-[#888] uppercase tracking-wider border-b border-[#E5E7EB]" style={{ background: '#FAFAFA' }}>
                    <div className="flex-[3]">Name</div>
                    <div className="flex-1 text-right">Size</div>
                    <div className="flex-[1.5] text-right">Kind</div>
                    <div className="flex-[2] text-right">Date Added</div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {finderFiles.map((file, i) => {
                      const alreadyUploaded = uploadedFiles.some(f => f.name === file.name)
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedFile(i)}
                          onDoubleClick={() => !alreadyUploaded && handleOpenFile(i)}
                          className={`flex items-center px-3 py-1 cursor-pointer text-[12px] ${selectedFile === i ? 'bg-[#007AFF] text-white' : alreadyUploaded ? 'text-[#999]' : 'text-[#333] hover:bg-[#F0F0F0]'}`}
                        >
                          <div className="flex items-center gap-2 flex-[3] min-w-0">
                            <div style={{ width: 18, height: 18, borderRadius: 3, background: fileIconColor[file.icon], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ color: 'white', fontSize: 7, fontWeight: 700 }}>{fileIconLabel[file.icon]}</span>
                            </div>
                            <span className="truncate">{file.name}</span>
                            {alreadyUploaded && <span className="text-[9px] opacity-60 ml-1">(uploaded)</span>}
                          </div>
                          <div className={`flex-1 text-right text-[11px] ${selectedFile === i ? 'text-white/80' : 'text-[#888]'}`}>{file.size}</div>
                          <div className={`flex-[1.5] text-right text-[11px] ${selectedFile === i ? 'text-white/80' : 'text-[#888]'}`}>{file.kind}</div>
                          <div className={`flex-[2] text-right text-[11px] ${selectedFile === i ? 'text-white/80' : 'text-[#888]'}`}>{file.date}</div>
                        </div>
                      )
                    })}
                  </div>
                  {/* Bottom bar */}
                  <div className="flex items-center justify-between px-3 py-2 border-t border-[#E5E7EB]" style={{ background: '#FAFAFA' }}>
                    <div className="text-[10px] text-[#888]">
                      Macintosh HD {'>'} Users {'>'} sharan {'>'} Downloads
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowFinder(false)} className="px-3 py-1 rounded text-[12px] text-[#333] border border-[#C8C8C8]" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #E8E8E8 100%)' }}>
                        Cancel
                      </button>
                      <button
                        onClick={() => selectedFile !== null && !uploadedFiles.some(f => f.name === finderFiles[selectedFile].name) && handleOpenFile(selectedFile)}
                        className="px-3 py-1 rounded text-[12px] text-white font-medium"
                        style={{ background: selectedFile !== null ? '#007AFF' : '#A0C4FF', cursor: selectedFile !== null ? 'pointer' : 'default' }}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded files list */}
      {uploadedFiles.map((f, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white">
          <div style={{ width: 24, height: 24, borderRadius: 4, background: '#EA4335', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: 'white', fontSize: 8, fontWeight: 700, letterSpacing: 0.3 }}>PDF</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-[#121212] truncate">{f.name}</div>
            <div className="text-[10px] text-[#9CA3AF]">{f.size}</div>
          </div>
          {f.status === 'uploading' ? (
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E94D35" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 019.8 8" strokeLinecap="round"/></svg>
          ) : (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>{Icon.checkCircle('#16a34a')}</motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

function ClientProfileView() {
  const { lang } = useLang()
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-[#e91e63] flex items-center justify-center text-white text-[22px] font-bold">CP</div>
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-[20px] font-semibold text-[#121212]">{clientProfile.name}</h2>
            <span className="lumif-badge lumif-badge-success">{lang === 'es' ? 'Cliente Recurrente' : 'Returning Client'}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[12px] text-[#6B7280]">RFC: {clientProfile.rfc}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left column */}
        <div className="flex-[3] space-y-4">
          {/* Client info card — simplified */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card">
            <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.building('#6B7280')} {lang === 'es' ? 'Informacion del Cliente' : 'Client Information'}</h3>
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div><span className="text-[#9CA3AF]">{lang === 'es' ? 'Razon Social' : 'Company Name'}:</span> <span className="font-medium">{clientProfile.name}</span></div>
              <div><span className="text-[#9CA3AF]">RFC:</span> <span className="font-medium">{clientProfile.rfc}</span></div>
              <div><span className="text-[#9CA3AF]">{lang === 'es' ? 'Contacto' : 'Contact'}:</span> <span className="font-medium">Ing. Carlos Martinez Hernandez</span></div>
              <div><span className="text-[#9CA3AF]">Email:</span> <span className="font-medium">carlos.martinez@constructorapacifico.com.mx</span></div>
            </div>
          </motion.div>

          {/* Source note */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-3 rounded-lg" style={{ background: 'rgba(233,77,53,0.05)', border: '1px solid rgba(233,77,53,0.15)' }}>
            <div className="flex items-center gap-2">
              {Icon.sparkle('#E94D35')}
              <span className="text-[12px] text-[#374151]">
                {lang === 'es'
                  ? 'Datos del cliente extraidos del AMS / sistema de registro'
                  : 'Client data pulled from AMS or system of record'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="flex-[2] space-y-4">
          {/* New Project Request — highlighted in coral */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lumif-card lumif-card-accent">
            <div className="flex items-center gap-2 mb-3">
              {Icon.sparkle('#E94D35')}
              <h3 className="text-[14px] font-semibold text-[#E94D35]">{lang === 'es' ? 'Nueva Solicitud de Proyecto' : 'New Project Request'}</h3>
            </div>
            <div className="space-y-2 text-[13px]">
              <div><span className="text-[#6B7280]">{lang === 'es' ? 'Proyecto' : 'Project'}:</span> <span className="font-semibold text-[#121212]">Autopista GDL-Tepic</span></div>
              <div><span className="text-[#6B7280]">{lang === 'es' ? 'Inicio de Obra' : 'Start Date'}:</span> <span className="font-semibold text-[#121212]">15/04/2026</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-[rgba(233,77,53,0.15)] text-[12px] text-[#374151] leading-relaxed">
              {lang === 'es'
                ? 'Recibido via email de Carlos Martinez — contrato MSA y documento de requisitos de fianzas adjuntos.'
                : 'Received via email from Carlos Martinez — MSA contract and surety bond requirements document attached.'}
            </div>
          </motion.div>

          {/* Existing Policies — upload area */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="lumif-card">
            <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.fileText('#6B7280')} {lang === 'es' ? 'Polizas Existentes' : 'Existing Policies'}</h3>
            <ExistingPolicyAttachments />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
//  DOCUMENT ANALYSIS (beats 4-5)
// ============================================================
function ContractAnalysis({ beat }: { beat: number }) {
  const { lang } = useLang()
  const showInsurance = beat >= 5
  const showSurety = beat >= 5
  const contractScrollRef = useRef<HTMLDivElement>(null)
  const [docTab, setDocTab] = useState<'msa' | 'bond'>('msa')

  const scrollToClause = useCallback((clause: string) => {
    const container = contractScrollRef.current
    if (!container) return
    const target = container.querySelector(`[data-clause="${clause}"]`) as HTMLElement
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      target.classList.add('contract-highlight-flash')
      setTimeout(() => target.classList.remove('contract-highlight-flash'), 1500)
    }
  }, [])

  const getMsaClauseId = (paragraph: string): string | null => {
    if (paragraph.includes('7.1.') || paragraph.includes('7.1 ') || paragraph.includes('RESPONSABILIDAD CIVIL GENERAL') || paragraph.includes('GENERAL LIABILITY INSURANCE')) return '7.1'
    if (paragraph.includes('7.2.') || paragraph.includes('7.2 ') || paragraph.includes('EQUIPO DE CONSTRUCCION') || paragraph.includes('CONSTRUCTION EQUIPMENT INSURANCE')) return '7.2'
    if (paragraph.includes('7.3.') || paragraph.includes('7.3 ') || paragraph.includes('RESPONSABILIDAD PATRONAL') || paragraph.includes("EMPLOYER'S LIABILITY")) return '7.3'
    if (paragraph.includes('SEPTIMA') || paragraph.includes('SEVENTH')) return '7'
    if (paragraph.includes('OCTAVA') || paragraph.includes('EIGHTH')) return '8'
    if (paragraph.includes('14.3.2')) return '14.3.2'
    if (paragraph.includes('14.3')) return '14.3'
    return null
  }

  const getBondClauseId = (paragraph: string): string | null => {
    if (paragraph.includes('1.1.') || paragraph.includes('1.2.') || paragraph.includes('1.3.') || paragraph.includes('1.4.')) return '8.1'
    if (paragraph.includes('2.1.') || paragraph.includes('2.2.') || paragraph.includes('2.3.') || paragraph.includes('2.4.')) return '8.2'
    if (paragraph.includes('3.1.') || paragraph.includes('3.2.') || paragraph.includes('3.3.') || paragraph.includes('3.4.')) return '8.3'
    if (paragraph.includes('1. FIANZA DE CUMPLIMIENTO') || paragraph.includes('1. PERFORMANCE BOND')) return '8.1'
    if (paragraph.includes('2. FIANZA DE BUENA CALIDAD') || paragraph.includes('2. WORKMANSHIP BOND')) return '8.2'
    if (paragraph.includes('3. FIANZA DE ANTICIPO') || paragraph.includes('3. ADVANCE PAYMENT BOND')) return '8.3'
    return null
  }

  // Split: contract-extracted vs AI-suggested
  const contractReqs = insuranceRequirements.filter(r => !r.isAiRecommended)
  const aiSuggestedReqs = insuranceRequirements.filter(r => r.isAiRecommended)

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#121212] mb-4">{lang === 'es' ? 'Analisis de Documentos' : 'Document Analysis'}</h2>
      <div className="flex gap-6" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {/* LEFT: Document viewer with tabs */}
        <div className="flex-1 flex flex-col" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <div className="flex gap-1 mb-3">
            <button
              onClick={() => setDocTab('msa')}
              className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all ${docTab === 'msa' ? 'bg-[#E94D35] text-white' : 'bg-[#F3F4F6] text-[#6B7280] hover:text-[#121212]'}`}
            >
              {lang === 'es' ? 'Contrato MSA' : 'MSA Contract'}
            </button>
            <button
              onClick={() => setDocTab('bond')}
              className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-all ${docTab === 'bond' ? 'bg-[#3B82F6] text-white' : 'bg-[#F3F4F6] text-[#6B7280] hover:text-[#121212]'}`}
            >
              {lang === 'es' ? 'Requisitos de Fianzas' : 'Bond Requirements'}
            </button>
          </div>
          <div ref={contractScrollRef} className="flex-1 overflow-y-auto">
            {docTab === 'msa' && (
              <div className="contract-doc">
                <div className="contract-title">{lang === 'es' ? 'CONTRATO DE PRESTACION DE SERVICIOS DE CONSTRUCCION PARA PROYECTO AUTOPISTA GUADALAJARA-TEPIC' : 'CONSTRUCTION SERVICES CONTRACT FOR THE GUADALAJARA-TEPIC HIGHWAY PROJECT'}</div>
                {contractText[lang].split('\n\n').map((paragraph, i) => {
                  const isClause7 = paragraph.includes('SEPTIMA') || paragraph.includes('SEVENTH') || paragraph.includes('7.1.') || paragraph.includes('7.2.') || paragraph.includes('7.3.')
                  const isClause14 = paragraph.includes('14.3.2')
                  const highlightClass = showInsurance && isClause7 ? 'contract-highlight' :
                    showInsurance && isClause14 ? 'contract-highlight' : ''
                  const clauseId = getMsaClauseId(paragraph)
                  if (paragraph.match(/^(PRIMERA|SEGUNDA|TERCERA|CUARTA|QUINTA|SEXTA|SEPTIMA|OCTAVA|NOVENA|DECIMA|CLAUSULA|D E C L A R|FIRST|SECOND|THIRD|FOURTH|FIFTH|SIXTH|SEVENTH|EIGHTH|NINTH|TENTH|ELEVENTH|TWELFTH|THIRTEENTH|FOURTEENTH|FIFTEENTH|SIXTEENTH|C L A U S E|R E C I T A L)/)) {
                    return <div key={i} data-clause={clauseId} className={`contract-clause ${highlightClass}`}>{paragraph}</div>
                  }
                  return <p key={i} data-clause={clauseId} className={`mb-3 text-justify ${highlightClass}`}>{paragraph}</p>
                })}
                {lang === 'en' && <div className="text-[11px] text-[#9CA3AF] italic mt-4 mb-2">{t('contract.originalNote', lang)}</div>}
                <div className="contract-page-number">{t('contract.pageOf', lang)} 1 {t('of', lang)} 8</div>
              </div>
            )}
            {docTab === 'bond' && (
              <div className="contract-doc">
                <div className="contract-title">{lang === 'es' ? 'REQUISITOS DE FIANZAS — PROYECTO AUTOPISTA GUADALAJARA-TEPIC' : 'SURETY BOND REQUIREMENTS — GUADALAJARA-TEPIC HIGHWAY PROJECT'}</div>
                {bondDocumentText[lang].split('\n\n').map((paragraph, i) => {
                  const isBondClause = paragraph.includes('1. FIANZA DE CUMPLIMIENTO') || paragraph.includes('1. PERFORMANCE BOND') ||
                    paragraph.includes('2. FIANZA DE BUENA CALIDAD') || paragraph.includes('2. WORKMANSHIP BOND') ||
                    paragraph.includes('3. FIANZA DE ANTICIPO') || paragraph.includes('3. ADVANCE PAYMENT BOND') ||
                    /^[123]\.\d\./.test(paragraph)
                  const highlightClass = showSurety && isBondClause ? 'contract-highlight-blue' : ''
                  const clauseId = getBondClauseId(paragraph)
                  if (paragraph.match(/^(REQUISITOS|SURETY BOND REQUIREMENTS|DOCUMENTO|SUPPLEMENTARY|DISPOSICIONES|GENERAL PROVISIONS)/)) {
                    return <div key={i} data-clause={clauseId} className={`contract-clause ${highlightClass}`}>{paragraph}</div>
                  }
                  if (paragraph.match(/^[123]\. (FIANZA|PERFORMANCE|WORKMANSHIP|ADVANCE)/)) {
                    return <div key={i} data-clause={clauseId} className={`contract-clause ${highlightClass}`}>{paragraph}</div>
                  }
                  return <p key={i} data-clause={clauseId} className={`mb-3 text-justify ${highlightClass}`}>{paragraph}</p>
                })}
                <div className="contract-page-number">{t('contract.pageOf', lang)} 1 {t('of', lang)} 3</div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Extracted requirements */}
        <div className="w-[420px] flex-shrink-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {beat === 4 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center justify-center h-48 gap-4">
                <div className="w-full h-2 rounded-full overflow-hidden shimmer-bar" style={{ maxWidth: 280 }} />
                <span className="text-[14px] text-[#6B7280]">{lang === 'es' ? 'Analizando contrato MSA y documento de fianzas...' : 'Analyzing MSA contract and surety bond document...'}</span>
                <span className="text-[12px] text-[#9CA3AF]">{t('analyzing.sub', lang)}</span>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="lumif-card" style={{ border: '1px dashed #D1D5DB' }}>
                <h4 className="text-[13px] font-semibold text-[#121212] mb-2 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {lang === 'es' ? 'Subir Documentos Adicionales' : 'Upload Additional Documents'}
                </h4>
                <p className="text-[12px] text-[#6B7280] mb-3">{lang === 'es' ? 'Puede agregar contratos, polizas existentes u otros documentos para un analisis mas completo.' : 'You can add contracts, existing policies or other documents for a more complete analysis.'}</p>
                <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-[#D1D5DB] hover:border-[#E94D35] hover:bg-[rgba(233,77,53,0.03)] transition-colors cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span className="text-[12px] font-medium text-[#9CA3AF]">{lang === 'es' ? 'Arrastra archivos o haz clic para seleccionar' : 'Drag files or click to browse'}</span>
                </div>
              </motion.div>
            </div>
          )}

          {/* SURETY BONDS — shown when bond tab active */}
          {showSurety && docTab === 'bond' && (
            <div className="mb-6">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
                {Icon.fileText('#3B82F6')}
                <span className="text-[11px] font-semibold text-[#3B82F6] uppercase tracking-wide">{lang === 'es' ? 'Fuente' : 'Source'}:</span>
                <span className="text-[12px] font-medium text-[#121212]">Bond_Requirements_GDL_Tepic.pdf</span>
              </motion.div>
              <h3 className="text-[16px] font-semibold text-[#121212] mb-3 flex items-center gap-2">
                {Icon.shield('#3B82F6')}
                {lang === 'es' ? 'Requisitos de Fianzas' : 'Bond Requirements'}
                <span className="lumif-badge lumif-badge-info">{suretyRequirements.length} {lang === 'es' ? 'detectados' : 'detected'}</span>
              </h3>
              <div className="text-[11px] text-[#6B7280] mb-3 italic">
                {lang === 'es' ? '"Sin la fianza, no te entregan el dinero" — las fianzas son requisito previo al inicio de obra.' : '"Without the surety bond, they don\'t release the money" — bonds are a prerequisite before work can begin.'}
              </div>
              {suretyRequirements.map((req: SuretyRequirement, i: number) => (
                <motion.div key={req.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="lumif-card lumif-card-blue mb-3 cursor-pointer" onClick={() => scrollToClause(req.clause)}>
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-[14px] font-semibold text-[#121212]">{req.type[lang]}</span>
                    <span className="lumif-badge lumif-badge-info">{req.confidence}%</span>
                  </div>
                  <div className="text-[12px] text-[#3B82F6] mb-1 hover:underline">{t('gaps.clause', lang)} {req.clause} · {req.percentage} · {req.amountText[lang]}</div>
                  <p className="text-[12px] text-[#374151] leading-relaxed">{req.description[lang]}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* INSURANCE REQUIREMENTS — shown when msa tab active */}
          {showInsurance && docTab === 'msa' && (
            <div className="mb-6">
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(233,77,53,0.06)', border: '1px solid rgba(233,77,53,0.15)' }}>
                {Icon.fileText('#E94D35')}
                <span className="text-[11px] font-semibold text-[#E94D35] uppercase tracking-wide">{lang === 'es' ? 'Fuente' : 'Source'}:</span>
                <span className="text-[12px] font-medium text-[#121212]">MSA Contract_GDL_Tepic_Highway.pdf</span>
              </motion.div>
              <h3 className="text-[16px] font-semibold text-[#121212] mb-3 flex items-center gap-2">
                {Icon.shield('#E94D35')}
                {lang === 'es' ? 'Requisitos de Seguro' : 'Insurance Requirements'}
                <span className="lumif-badge lumif-badge-coral">{contractReqs.length} {lang === 'es' ? 'extraidos del contrato' : 'extracted from contract'}</span>
              </h3>

              {contractReqs.map((req: InsuranceRequirement, i: number) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  className={`lumif-card mb-3 cursor-pointer ${req.clause === '14.3.2' ? 'lumif-card-accent' : ''}`}
                  onClick={() => scrollToClause(req.clause)}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-[14px] font-semibold text-[#121212]">{req.type[lang]}</span>
                    <span className="lumif-badge lumif-badge-success">{req.confidence}%</span>
                  </div>
                  <div className="text-[12px] text-[#E94D35] mb-1 hover:underline">{t('gaps.clause', lang)} {req.clause} · {t('req.limit', lang)}: {req.limitText[lang]}</div>
                  <div className="text-[12px] text-[#6B7280] mb-1">{t('req.deductible', lang)}: {req.deductible[lang]}</div>
                  <p className="text-[12px] text-[#374151] leading-relaxed">{req.description[lang]}</p>
                  {req.clause === '14.3.2' && beat >= 5 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 p-2 rounded-lg" style={{ background: 'rgba(233,77,53,0.08)', border: '1px solid rgba(233,77,53,0.2)' }}>
                      <div className="flex items-center gap-2 mb-1">
                        {Icon.sparkle('#E94D35')}
                        <span className="text-[10px] font-semibold text-[#E94D35] uppercase tracking-wide">{t('req.criticalFinding', lang)}</span>
                      </div>
                      <p className="text-[11px] text-[#E94D35]">{t('req.deepClause', lang)}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* AI ADVISORY — shown when msa tab active */}
          {showInsurance && docTab === 'msa' && aiSuggestedReqs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="lumif-card"
              style={{ background: 'rgba(168,85,247,0.03)', border: '1px solid rgba(168,85,247,0.15)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                {Icon.sparkle('#A855F7')}
                <span className="text-[13px] font-semibold text-[#A855F7]">
                  {lang === 'es' ? 'Coberturas Adicionales a Considerar' : 'Additional Coverages to Consider'}
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] mb-3">
                {lang === 'es'
                  ? 'Basado en 47 proyectos carreteros similares gestionados por Alaya y regulacion mexicana vigente, se sugiere evaluar las siguientes coberturas adicionales:'
                  : 'Based on 47 similar highway projects managed by Alaya and current Mexican regulation, the broker should evaluate these additional coverages:'}
              </p>
              <div className="space-y-2">
                {aiSuggestedReqs.map((req: InsuranceRequirement) => (
                  <div key={req.id} className="flex items-center justify-between py-1.5 px-2 rounded" style={{ background: 'rgba(168,85,247,0.04)' }}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                      <span className="text-[12px] font-medium text-[#121212]">{req.type[lang]}</span>
                    </div>
                    <span className="text-[11px] text-[#6B7280]">{req.limitText[lang]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
//  BEAT 6 — GAP ANALYSIS (SIMPLIFIED — no equipment)
// ============================================================
function GapAnalysisSimplified() {
  const { lang } = useLang()
  const insuranceGapData = [
    { name: { es: 'RC General', en: 'General Liability' }, required: 5000000, current: clientCoverage.rcGeneral, clause: '7.1' },
    { name: { es: 'Equipo de Construccion', en: 'Construction Equipment' }, required: 120000000, current: clientCoverage.equipoConstruccion, clause: '7.2' },
    { name: { es: 'Resp. Patronal', en: "Employer's Liability" }, required: 2000000, current: clientCoverage.respPatronal, clause: '7.3' },
    { name: { es: 'Todo Riesgo (CAR)', en: 'All Risks (CAR)' }, required: 50000000, current: 0, clause: '14.3.2' },
    { name: { es: 'RC Profesional', en: 'Professional Liability' }, required: 3000000, current: 0, clause: 'AI' },
    { name: { es: 'RC Ambiental', en: 'Environmental Liability' }, required: 10000000, current: 0, clause: 'AI' },
  ]

  const suretyGapData = [
    { name: { es: 'Fianza de Cumplimiento', en: 'Performance Bond' }, required: 50000000, current: 0, clause: '8.1' },
    { name: { es: 'Fianza de Buena Calidad de Obra', en: 'Quality Guarantee Bond' }, required: 50000000, current: 0, clause: '8.2' },
    { name: { es: 'Fianza de Anticipo', en: 'Advance Payment Bond' }, required: 75000000, current: 0, clause: '8.3' },
  ]

  const renderGapTable = (data: typeof insuranceGapData) => (
    <div className="lumif-card mb-4 p-0 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr style={{ background: '#FAFAFA' }}>
            {[t('gaps.coverage', lang), t('gaps.required', lang), t('gaps.actual', lang), t('gaps.gap', lang), t('gaps.clause', lang), t('gaps.status', lang)].map(h => (
              <th key={h} className="lumif-table-header text-left px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((g, i) => {
            const gap = g.required - g.current
            const status = g.required === 0 ? 'info' : g.current >= g.required ? 'green' : g.current > 0 ? 'yellow' : 'red'
            const badgeClass = status === 'green' ? 'lumif-badge-success' : status === 'yellow' ? 'lumif-badge-warning' : status === 'info' ? 'lumif-badge-info' : 'lumif-badge-danger'
            const badgeText = status === 'green' ? t('gaps.meets', lang) : status === 'yellow' ? t('gaps.insufficient', lang) : status === 'info' ? 'N/A' : t('gaps.noCoverage', lang)
            return (
              <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="lumif-table-row" style={status === 'red' ? { background: 'rgba(239,68,68,0.02)' } : undefined}>
                <td className="lumif-table-cell px-4 font-medium text-[13px]">{g.name[lang]}</td>
                <td className="lumif-table-cell px-4 text-[13px]">{g.required > 0 ? fmt(g.required) : <span className="text-[#9CA3AF]">&mdash;</span>}</td>
                <td className="lumif-table-cell px-4 text-[13px]">{g.current > 0 ? fmt(g.current) : <span className="text-[#dc2626]">&mdash;</span>}</td>
                <td className="lumif-table-cell px-4 text-[13px]">{gap > 0 ? <span className="text-[#dc2626] font-medium">{fmt(gap)}</span> : <span className="text-[#16a34a]">&mdash;</span>}</td>
                <td className="lumif-table-cell px-4 text-[#E94D35] text-[13px]">{g.clause}</td>
                <td className="lumif-table-cell px-4"><span className={`lumif-badge ${badgeClass}`}>{badgeText}</span></td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold text-[#121212]">{t('gaps.title', lang)}</h2>
        <span className="lumif-badge lumif-badge-warning">{t('gaps.urgency', lang)}</span>
      </div>
      <CurrencyNote />

      <h3 className="text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2">{lang === 'es' ? 'Seguros' : 'Insurance'}</h3>
      {renderGapTable(insuranceGapData)}

      <h3 className="text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2 mt-6">{lang === 'es' ? 'Fianzas' : 'Surety Bonds'}</h3>
      <p className="text-[12px] text-[#6B7280] mb-3 italic">{lang === 'es' ? 'Todos son requisitos nuevos — el cliente no tiene fianzas existentes para este proyecto.' : 'All are new requirements — client has no existing bonds for this project.'}</p>
      {renderGapTable(suretyGapData)}
    </div>
  )
}

// Keep old component for reference (not rendered in v2)
function GapAnalysisAndEquipment() {
  return <GapAnalysisSimplified />
}

// ============================================================
//  BEAT 8 — RISK PROFILE + SUBMISSION PACKAGE (tabbed)
// ============================================================
function RiskProfileAndSubmission() {
  const { lang } = useLang()
  const [activeTab, setActiveTab] = useState<'risk' | 'submission'>('risk')
  const [previewDoc, setPreviewDoc] = useState<number | null>(null)

  // Categorize documents by source
  const onFileIds = [6, 7, 8, 9, 10, 13] // Acta Constitutiva, Financials 2025, Financials 2024, Tax Status, Completed Projects, IMSS Premium — from client file
  const fromEmailIds = [1, 2, 3] // MSA Contract, Budget, Schedule — attached to Carlos's email
  const fromGovIds = [16, 17, 18] // Bid Award, Award Letter, SIOP — public works
  const requestedIds = [4, 5, 11, 12, 14, 15] // Drawings, Geotech, Equipment, Claims, Policies, Risk Survey (IMSS moved to on-file)

  type DocSource = 'on-file' | 'from-email' | 'from-gov' | 'requested'
  function getDocSource(id: number): DocSource {
    if (onFileIds.includes(id)) return 'on-file'
    if (fromEmailIds.includes(id)) return 'from-email'
    if (fromGovIds.includes(id)) return 'from-gov'
    return 'requested'
  }

  const receivedCount = submissionDocuments.filter(d => {
    const src = getDocSource(d.id)
    return src !== 'requested'
  }).length
  const totalDocs = submissionDocuments.length
  const requestedCount = totalDocs - receivedCount
  const pct = Math.round((receivedCount / totalDocs) * 100)

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#121212] mb-4">{t('risk.title', lang)}</h2>
      {/* Tab toggle */}
      <div className="flex items-center gap-1 mb-4 border-b border-[#E5E7EB]">
        <button onClick={() => setActiveTab('risk')} className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-all ${activeTab === 'risk' ? 'text-[#E94D35] border-[#E94D35]' : 'text-[#6B7280] border-transparent hover:text-[#121212]'}`}>
          {lang === 'es' ? 'Perfil de Riesgo' : 'Risk Profile'}
        </button>
        <button onClick={() => setActiveTab('submission')} className={`px-4 py-2 text-[13px] font-medium border-b-2 transition-all ${activeTab === 'submission' ? 'text-[#E94D35] border-[#E94D35]' : 'text-[#6B7280] border-transparent hover:text-[#121212]'}`}>
          {t('risk.package', lang)} <span className="ml-1 text-[11px] text-[#9CA3AF]">{receivedCount}/{totalDocs}</span>
        </button>
      </div>

      {activeTab === 'risk' ? (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card col-span-2">
              <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.building('#6B7280')} {t('risk.clientInfo', lang)}</h3>
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div><span className="text-[#9CA3AF]">{t('risk.razonSocial', lang)}:</span> <span className="font-medium">{clientProfile.name}</span></div>
                <div><span className="text-[#9CA3AF]">RFC:</span> <span className="font-medium">{clientProfile.rfc}</span></div>
                <div><span className="text-[#9CA3AF]">{t('risk.years', lang)}:</span> <span className="font-medium">{clientProfile.yearsInOperation}</span></div>
                <div><span className="text-[#9CA3AF]">{t('risk.specialty', lang)}:</span> <span className="font-medium">{clientProfile.specialty[lang]}</span></div>
                <div><span className="text-[#9CA3AF]">{t('risk.revenue', lang)}:</span> <span className="font-medium">{clientProfile.annualRevenue}</span></div>
                <div><span className="text-[#9CA3AF]">{t('risk.lastIncident', lang)}:</span> <span className="font-medium">{clientProfile.safetyMetrics.lastIncident[lang]}</span></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lumif-card">
              <h3 className="text-[14px] font-semibold text-[#121212] mb-3">{t('risk.safety', lang)}</h3>
              {/* Safety metrics with context bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Prima Riesgo IMSS' : 'IMSS Risk Premium'}</span><span className="font-medium">{clientProfile.safetyMetrics.primaRiesgoIMSS.rate}%</span></div>
                  <div className="text-[10px] text-[#9CA3AF]">{clientProfile.safetyMetrics.primaRiesgoIMSS.class}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Indice Siniestralidad' : 'Loss Index'}</span><span className="font-bold text-[#16a34a]">{clientProfile.safetyMetrics.indiceSiniestralidad.value}</span></div>
                  <div className="w-full bg-[#F3F4F6] rounded-full h-3 relative overflow-hidden">
                    <div className="h-full bg-[#16a34a] rounded-full" style={{ width: `${(clientProfile.safetyMetrics.indiceSiniestralidad.value / clientProfile.safetyMetrics.indiceSiniestralidad.sectorAvg) * 60}%` }} />
                    <div className="absolute top-0 h-full w-[2px] bg-[#dc2626]" style={{ left: '60%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-0.5"><span>{lang === 'es' ? 'Cliente' : 'Client'}: {clientProfile.safetyMetrics.indiceSiniestralidad.value}</span><span>{lang === 'es' ? 'Sector' : 'Sector'}: {clientProfile.safetyMetrics.indiceSiniestralidad.sectorAvg}</span></div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Indice Frecuencia' : 'Frequency Index'}</span><span className="font-medium">{clientProfile.safetyMetrics.indiceFrecuencia.value}</span></div>
                  <div className="w-full bg-[#F3F4F6] rounded-full h-3 relative overflow-hidden">
                    <div className="h-full bg-[#16a34a] rounded-full" style={{ width: `${(clientProfile.safetyMetrics.indiceFrecuencia.value / clientProfile.safetyMetrics.indiceFrecuencia.sectorAvg) * 60}%` }} />
                    <div className="absolute top-0 h-full w-[2px] bg-[#dc2626]" style={{ left: '60%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-0.5"><span>{clientProfile.safetyMetrics.indiceFrecuencia.value}</span><span>{lang === 'es' ? 'Sector' : 'Sector'}: {clientProfile.safetyMetrics.indiceFrecuencia.sectorAvg}</span></div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {clientProfile.safetyMetrics.certifications.map(c => <span key={c} className="lumif-badge lumif-badge-success">{c}</span>)}
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lumif-card">
              <h3 className="text-[14px] font-semibold text-[#121212] mb-3">{t('risk.lossHistory3yr', lang)}</h3>
              <table className="w-full"><thead><tr>{[t('risk.year', lang), t('risk.claims', lang), t('risk.amount', lang), t('risk.status', lang)].map(h => <th key={h} className="lumif-table-header text-left">{h}</th>)}</tr></thead>
                <tbody>{clientProfile.lossHistory.map(row => (
                  <tr key={row.year} className="lumif-table-row"><td className="lumif-table-cell font-medium">{row.year}</td><td className="lumif-table-cell">{row.claims}</td><td className="lumif-table-cell">{row.amount > 0 ? fmt(row.amount) : '---'}</td><td className="lumif-table-cell"><span className={`lumif-badge ${row.status.es === 'Cerrado' ? 'lumif-badge-success' : ''}`}>{row.status[lang]}</span></td></tr>
                ))}</tbody></table>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lumif-card">
              <h3 className="text-[14px] font-semibold text-[#121212] mb-3">{t('risk.projects', lang)}</h3>
              <table className="w-full"><thead><tr>{[t('risk.project', lang), t('risk.year', lang), t('risk.value', lang)].map(h => <th key={h} className="lumif-table-header text-left">{h}</th>)}</tr></thead>
                <tbody>{clientProfile.similarProjects.map(p => (
                  <tr key={p.name} className="lumif-table-row"><td className="lumif-table-cell font-medium">{p.name}</td><td className="lumif-table-cell">{p.year}</td><td className="lumif-table-cell">{fmt(p.value)}</td></tr>
                ))}</tbody></table>
            </motion.div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 bg-[#F3F4F6] rounded-full h-3 overflow-hidden">
              <div className="h-full bg-[#16a34a] rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[13px] font-medium text-[#121212]">
              {receivedCount} {lang === 'es' ? 'de' : 'of'} {totalDocs} {lang === 'es' ? 'recibidos' : 'received'} ({pct}%) — {requestedCount} {lang === 'es' ? 'solicitados, esperando respuesta del cliente' : 'requested, awaiting client response'}
            </span>
          </div>
          {(() => {
            const sourceGroups: { key: DocSource; label: { es: string; en: string }; ids: number[] }[] = [
              { key: 'on-file', label: { es: 'Del Expediente del Cliente', en: 'From Client File' }, ids: onFileIds },
              { key: 'from-email', label: { es: 'Adjuntos al Email', en: 'Attached to Email' }, ids: fromEmailIds },
              { key: 'requested', label: { es: 'Solicitados al Cliente', en: 'Requested from Client' }, ids: requestedIds },
              { key: 'from-gov', label: { es: 'De Obra Publica', en: 'From Government' }, ids: fromGovIds },
            ]
            const sourceBadge = (src: DocSource) => {
              switch (src) {
                case 'on-file': return <span className="lumif-badge lumif-badge-info">{lang === 'es' ? 'En Expediente' : 'On File'}</span>
                case 'from-email': return <span className="lumif-badge lumif-badge-success">{lang === 'es' ? 'Recibido' : 'Received'}</span>
                case 'from-gov': return <span className="lumif-badge lumif-badge-success">{lang === 'es' ? 'Recibido' : 'Received'}</span>
                case 'requested': return <span className="lumif-badge lumif-badge-warning">{lang === 'es' ? 'Solicitado' : 'Requested'}</span>
              }
            }
            return sourceGroups.map(group => {
              const docs = submissionDocuments.filter(d => group.ids.includes(d.id))
              if (docs.length === 0) return null
              return (
                <div key={group.key} className="mb-4">
                  <div className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2 px-1">{group.label[lang]}</div>
                  <div className="lumif-card p-0 overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {docs.map(doc => {
                          const ext = doc.filename?.split('.').pop()?.toLowerCase() || ''
                          const fileIcon = ext === 'pdf' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#dc2626" strokeWidth="1.5"/><text x="12" y="15" textAnchor="middle" fill="#dc2626" fontSize="6" fontWeight="700" fontFamily="Inter">PDF</text></svg>
                          ) : ext === 'xlsx' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#16a34a" strokeWidth="1.5"/><text x="12" y="15" textAnchor="middle" fill="#16a34a" fontSize="5" fontWeight="700" fontFamily="Inter">XLS</text></svg>
                          ) : ext === 'zip' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" stroke="#6B7280" strokeWidth="1.5"/><text x="12" y="15" textAnchor="middle" fill="#6B7280" fontSize="5" fontWeight="700" fontFamily="Inter">ZIP</text></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                          )
                          const isClickable = !!doc.filename
                          return (
                            <tr key={doc.id} className={`lumif-table-row ${isClickable ? 'cursor-pointer' : ''}`}
                              style={group.key === 'requested' ? { background: 'rgba(249,115,22,0.04)' } : undefined}
                              onClick={() => isClickable && setPreviewDoc(doc.id === previewDoc ? null : doc.id)}>
                              <td className="lumif-table-cell px-4 font-medium text-[13px]" style={{ width: '35%' }}>
                                <span className="flex items-center gap-2">
                                  {fileIcon}
                                  <span className={isClickable ? 'text-[#E94D35] hover:underline' : ''}>{doc.name[lang]}</span>
                                </span>
                              </td>
                              <td className="lumif-table-cell px-4 text-[12px] text-[#6B7280]">
                                {doc.filename ? (
                                  <span className="flex items-center gap-1">
                                    <span>{doc.filename}</span>
                                    <span className="text-[#9CA3AF]">({doc.size})</span>
                                    <span className="lumif-badge" style={{ background: ext === 'pdf' ? 'rgba(220,38,38,0.08)' : ext === 'xlsx' ? 'rgba(22,163,74,0.08)' : 'rgba(107,114,128,0.08)', color: ext === 'pdf' ? '#dc2626' : ext === 'xlsx' ? '#16a34a' : '#6B7280', fontSize: 9, padding: '1px 6px' }}>{ext.toUpperCase()}</span>
                                  </span>
                                ) : <span className="text-[#ea580c]">&mdash;</span>}
                              </td>
                              <td className="lumif-table-cell px-4">{sourceBadge(group.key)}</td>
                              <td className="lumif-table-cell px-2" style={{ width: 40 }}>
                                {isClickable && <span className="text-[#9CA3AF] hover:text-[#E94D35] transition-colors">{Icon.chevronRight(previewDoc === doc.id ? '#E94D35' : '#9CA3AF')}</span>}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  {group.key === 'requested' && (
                    <div className="mt-1.5 px-1 flex items-center gap-1.5 text-[11px] text-[#ea580c]">
                      {Icon.sparkle('#ea580c')}
                      <span>{lang === 'es' ? 'Solicitud automatica enviada a carlos.martinez@constructorapacifico.com.mx' : 'Auto-request sent to carlos.martinez@constructorapacifico.com.mx'}</span>
                    </div>
                  )}
                </div>
              )
            })
          })()}

          {/* Document Preview Modal */}
          {previewDoc && (() => {
            const doc = submissionDocuments.find(d => d.id === previewDoc)
            if (!doc || !doc.filename) return null
            const ext = doc.filename.split('.').pop()?.toLowerCase() || ''
            const isPdf = ext === 'pdf'
            const isXlsx = ext === 'xlsx'

            // PDF-style document content
            const pdfContent = (title: string, body: React.ReactNode) => (
              <div style={{ background: '#525659', padding: '24px', minHeight: 400, display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: 'white', width: '100%', maxWidth: 600, padding: '48px 56px', boxShadow: '0 2px 20px rgba(0,0,0,0.3)', fontFamily: '"Times New Roman", Calibri, serif', fontSize: 12, lineHeight: 1.8, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 10, color: '#9CA3AF' }}>{lang === 'es' ? 'Pagina 1 de 1' : 'Page 1 of 1'}</div>
                  <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 14, letterSpacing: '0.05em', marginBottom: 20, textTransform: 'uppercase' as const }}>{title}</div>
                  {body}
                </div>
              </div>
            )

            // Excel-style spreadsheet content
            const xlsxContent = (title: string, headers: string[], rows: string[][]) => (
              <div style={{ background: '#217346', padding: '4px' }}>
                <div style={{ background: '#217346', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="4" y="2" width="16" height="20" rx="1"/><text x="12" y="15" textAnchor="middle" fill="#217346" fontSize="8" fontWeight="800">X</text></svg>
                  <span style={{ color: 'white', fontSize: 12, fontWeight: 500 }}>{title}</span>
                </div>
                <div style={{ background: '#f3f3f3', padding: '2px' }}>
                  <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #217346' }}>
                    {['Sheet1', 'Sheet2'].map((s, i) => (
                      <div key={s} style={{ padding: '4px 16px', fontSize: 11, background: i === 0 ? 'white' : '#e7e6e6', color: '#333', borderRight: '1px solid #d1d1d1', cursor: 'pointer' }}>{s}</div>
                    ))}
                  </div>
                </div>
                <div style={{ background: 'white', overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11, fontFamily: 'Calibri, Arial, sans-serif' }}>
                    <thead>
                      <tr>
                        <th style={{ width: 32, background: '#f3f3f3', border: '1px solid #d1d1d1', padding: '2px 4px', fontSize: 10, color: '#666' }}></th>
                        {headers.map((h, i) => (
                          <th key={i} style={{ background: '#f3f3f3', border: '1px solid #d1d1d1', padding: '3px 8px', textAlign: 'left', fontWeight: 600, color: '#333', minWidth: 100 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>{h}</span><span style={{ color: '#999', fontSize: 9 }}>{'▼'}</span></div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, ri) => (
                        <tr key={ri}>
                          <td style={{ background: '#f3f3f3', border: '1px solid #d1d1d1', padding: '2px 4px', fontSize: 10, color: '#666', textAlign: 'center' }}>{ri + 1}</td>
                          {row.map((cell, ci) => (
                            <td key={ci} style={{ border: '1px solid #d1d1d1', padding: '3px 8px', color: cell.startsWith('$') ? '#006100' : '#333', fontWeight: cell.startsWith('$') || cell.startsWith('TOTAL') ? 600 : 400 }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )

            const renderContent = () => {
              if (doc.id === 1) return pdfContent('CONTRATO DE PRESTACION DE SERVICIOS DE CONSTRUCCION\nPROYECTO AUTOPISTA GUADALAJARA-TEPIC', (
                <div>
                  <p style={{ marginBottom: 8 }}><strong>CONTRATO NUMERO:</strong> SIOP-LP-2026-0023</p>
                  <p style={{ marginBottom: 8 }}>CONTRATO DE OBRA PUBLICA A PRECIOS UNITARIOS QUE CELEBRAN, POR UNA PARTE, EL GOBIERNO DEL ESTADO DE JALISCO, A TRAVES DE LA SECRETARIA DE INFRAESTRUCTURA Y OBRA PUBLICA, EN LO SUCESIVO "EL CONTRATANTE"...</p>
                  <p style={{ marginBottom: 8 }}><strong>CONTRATISTA:</strong> Constructora del Pacifico S.A. de C.V.</p>
                  <p style={{ marginBottom: 8 }}><strong>R.F.C.:</strong> CPE-190315-XX1</p>
                  <p style={{ marginBottom: 8 }}><strong>MONTO DEL CONTRATO:</strong> Mex$500,000,000.00 (QUINIENTOS MILLONES DE PESOS 00/100 M.N.)</p>
                  <p style={{ marginBottom: 16, borderTop: '1px solid #e0e0e0', paddingTop: 12 }}><strong>CLAUSULA SEPTIMA.- SEGUROS Y FIANZAS.</strong></p>
                  <p style={{ marginBottom: 6, paddingLeft: 20 }}>7.1. SEGURO DE RESPONSABILIDAD CIVIL GENERAL.- "EL CONTRATISTA" debera contratar un seguro de Responsabilidad Civil General con un limite minimo de responsabilidad de Mex$5,000,000.00...</p>
                  <p style={{ marginBottom: 6, paddingLeft: 20 }}>7.2. SEGURO DE EQUIPO DE CONSTRUCCION.- "EL CONTRATISTA" debera contratar un seguro que ampare la totalidad de la maquinaria y equipo de construccion...</p>
                  <div style={{ textAlign: 'center', marginTop: 20, fontSize: 10, color: '#999' }}>{lang === 'es' ? 'Pagina 1 de 8 — Documento completo disponible' : 'Page 1 of 8 — Full document available'}</div>
                </div>
              ))
              if (doc.id === 2) return xlsxContent(
                lang === 'es' ? 'Presupuesto_Autopista_GDL.xlsx' : 'Budget_Highway_GDL.xlsx',
                [lang === 'es' ? 'Partida' : 'Item', lang === 'es' ? 'Descripcion' : 'Description', lang === 'es' ? 'Importe' : 'Amount', '%'],
                [
                  ['1.0', lang === 'es' ? 'Terraceria y Movimiento de Tierras' : 'Earthworks', 'Mex$185,000,000 M.N.', '37.0%'],
                  ['2.0', lang === 'es' ? 'Pavimentacion' : 'Paving', 'Mex$120,000,000 M.N.', '24.0%'],
                  ['3.0', lang === 'es' ? 'Estructuras y Puentes' : 'Structures & Bridges', 'Mex$95,000,000 M.N.', '19.0%'],
                  ['4.0', lang === 'es' ? 'Señalizacion y Seguridad' : 'Signage & Safety', 'Mex$35,000,000 M.N.', '7.0%'],
                  ['5.0', lang === 'es' ? 'Indirectos y Utilidad' : 'Indirect Costs & Profit', 'Mex$65,000,000 M.N.', '13.0%'],
                  ['', 'TOTAL', 'Mex$500,000,000 M.N.', '100.0%'],
                ]
              )
              if (doc.id === 7 || doc.id === 8) return pdfContent(
                `${lang === 'es' ? 'ESTADOS FINANCIEROS' : 'FINANCIAL STATEMENTS'} ${doc.id === 7 ? '2025' : '2024'}\nConstructora del Pacifico S.A. de C.V.`,
                <div>
                  <p style={{ textAlign: 'center', fontSize: 11, color: '#666', marginBottom: 16 }}>{lang === 'es' ? 'Cifras expresadas en pesos mexicanos' : 'Amounts expressed in Mexican pesos'}</p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    {[
                      [lang === 'es' ? 'Activo Total' : 'Total Assets', doc.id === 7 ? 'Mex$312,000,000 M.N.' : 'Mex$278,000,000 M.N.'],
                      [lang === 'es' ? 'Activo Circulante' : 'Current Assets', doc.id === 7 ? 'Mex$186,000,000 M.N.' : 'Mex$162,000,000 M.N.'],
                      [lang === 'es' ? 'Pasivo Total' : 'Total Liabilities', doc.id === 7 ? 'Mex$148,000,000 M.N.' : 'Mex$139,000,000 M.N.'],
                      [lang === 'es' ? 'Capital Contable' : 'Shareholders Equity', doc.id === 7 ? 'Mex$164,000,000 M.N.' : 'Mex$139,000,000 M.N.'],
                      [lang === 'es' ? 'Ingresos' : 'Revenue', doc.id === 7 ? 'Mex$180,000,000 M.N.' : 'Mex$156,000,000 M.N.'],
                      [lang === 'es' ? 'Utilidad Neta' : 'Net Income', doc.id === 7 ? 'Mex$22,400,000 M.N.' : 'Mex$18,700,000 M.N.'],
                      [lang === 'es' ? 'Razon Circulante' : 'Current Ratio', doc.id === 7 ? '1.80' : '1.65'],
                      [lang === 'es' ? 'Razon de Endeudamiento' : 'Debt Ratio', doc.id === 7 ? '0.47' : '0.50'],
                    ].map(([label, val], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '6px 0', fontWeight: i === 0 || i === 2 || i === 3 || i === 4 ? 600 : 400 }}>{label}</td>
                        <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>{val}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              )
              if (doc.id === 11) return xlsxContent(
                'Inventario_Equipo_87u.xlsx',
                ['#', lang === 'es' ? 'Tipo' : 'Type', lang === 'es' ? 'Marca/Modelo' : 'Make/Model', lang === 'es' ? 'Año' : 'Year', lang === 'es' ? 'Valor' : 'Value', 'GPS'],
                [
                  ['1', lang === 'es' ? 'Excavadora' : 'Excavator', 'CAT 320', '2023', 'Mex$4,200,000 M.N.', lang === 'es' ? 'Activo' : 'Active'],
                  ['2', lang === 'es' ? 'Cargador' : 'Loader', 'CAT 950', '2022', 'Mex$3,800,000 M.N.', lang === 'es' ? 'Activo' : 'Active'],
                  ['3', lang === 'es' ? 'Grua' : 'Crane', 'Liebherr LTM 1100', '2021', 'Mex$12,500,000 M.N.', lang === 'es' ? 'Activo' : 'Active'],
                  ['4', 'Bulldozer', 'CAT D8T', '2023', 'Mex$4,500,000 M.N.', lang === 'es' ? 'Activo' : 'Active'],
                  ['5', lang === 'es' ? 'Fresadora' : 'Milling', 'Wirtgen W210', '2024', 'Mex$6,000,000 M.N.', lang === 'es' ? 'Activo' : 'Active'],
                  ['...', '', '', '', '', ''],
                  ['87', lang === 'es' ? 'Generador' : 'Generator', 'CAT C15', '2020', 'Mex$1,200,000 M.N.', lang === 'es' ? 'Activo' : 'Active'],
                  ['', '', '', 'TOTAL', 'Mex$178,000,000 M.N.', '87 units'],
                ]
              )
              // Generic PDF preview for other docs
              return pdfContent(doc.name[lang], (
                <div>
                  <p style={{ marginBottom: 8 }}><strong>{lang === 'es' ? 'Documento' : 'Document'}:</strong> {doc.filename}</p>
                  <p style={{ marginBottom: 8 }}><strong>{lang === 'es' ? 'Tamaño' : 'Size'}:</strong> {doc.size}</p>
                  <p style={{ marginBottom: 8 }}><strong>{lang === 'es' ? 'Fecha' : 'Date'}:</strong> {doc.date || '—'}</p>
                  <p style={{ marginBottom: 8 }}><strong>{lang === 'es' ? 'Empresa' : 'Company'}:</strong> Constructora del Pacifico S.A. de C.V.</p>
                  <p style={{ marginBottom: 8 }}><strong>R.F.C.:</strong> CPE-190315-XX1</p>
                  <div style={{ marginTop: 24, padding: 16, background: '#f9f9f9', borderRadius: 4, textAlign: 'center', color: '#999', fontSize: 11 }}>
                    {lang === 'es' ? 'Vista previa completa disponible en la aplicacion' : 'Full preview available in the application'}
                  </div>
                </div>
              ))
            }

            return (
              /* Modal overlay */
              <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} onClick={() => setPreviewDoc(null)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
                  className="rounded-xl overflow-hidden shadow-2xl" style={{ width: '80%', maxWidth: 720, maxHeight: '85vh' }}
                  onClick={e => e.stopPropagation()}>
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-5 py-3" style={{ background: isPdf ? '#323639' : isXlsx ? '#217346' : '#404040' }}>
                    <div className="flex items-center gap-3">
                      {isPdf ? (
                        <svg width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="1" width="18" height="22" rx="2" fill="#fff"/><text x="12" y="16" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="800" fontFamily="Arial">PDF</text></svg>
                      ) : isXlsx ? (
                        <svg width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="1" width="18" height="22" rx="2" fill="#fff"/><text x="12" y="16" textAnchor="middle" fill="#217346" fontSize="8" fontWeight="800" fontFamily="Arial">XLS</text></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      )}
                      <span className="text-white text-[13px] font-medium">{doc.filename}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>{doc.size}</span>
                    </div>
                    <button onClick={() => setPreviewDoc(null)} className="text-white hover:text-gray-300 transition-colors p-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  {/* Modal body */}
                  <div style={{ maxHeight: 'calc(85vh - 48px)', overflowY: 'auto' }}>
                    {renderContent()}
                  </div>
                </motion.div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

// ============================================================
//  BEAT 9 — CARRIER SELECTION
// ============================================================
function CarrierSelectionAndRouting() {
  const { lang } = useLang()
  const [toggleState, setToggleState] = useState<Record<string, boolean>>({})
  const isOn = (id: string) => toggleState[id] !== false

  const insuranceRules = routingRules.filter(r => !['Afianzadora Aserta', 'Fianzas Dorama'].includes(r.carrier))
  const suretyRules = routingRules.filter(r => ['Afianzadora Aserta', 'Fianzas Dorama'].includes(r.carrier))

  // Map carrier id to routing rule
  const ruleByName: Record<string, string> = {}
  routingRules.forEach(r => { ruleByName[r.carrier] = r.rule[lang] })

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#121212] mb-2">{lang === 'es' ? 'Seleccion de Aseguradoras y Envio' : 'Carrier Selection & Routing'}</h2>
      <p className="text-[13px] text-[#6B7280] mb-4">{lang === 'es' ? 'Aseguradoras seleccionadas con metodo de envio y regla de enrutamiento.' : 'Selected carriers with submission method and routing rule.'}</p>

      <h3 className="text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">{t('carriers.insurance', lang)}</h3>
      <div className="lumif-card p-0 overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr style={{ background: '#FAFAFA' }}>
              <th className="lumif-table-header text-left px-4 py-3" style={{ width: 44 }}></th>
              <th className="lumif-table-header text-left px-4 py-3">{lang === 'es' ? 'Aseguradora' : 'Carrier'}</th>
              <th className="lumif-table-header text-center px-4 py-3">{lang === 'es' ? 'Metodo' : 'Method'}</th>
              <th className="lumif-table-header text-left px-4 py-3">{lang === 'es' ? 'Regla de Envio' : 'Routing Rule'}</th>
              <th className="lumif-table-header text-center px-4 py-3" style={{ width: 70 }}>{lang === 'es' ? 'Incluir' : 'Include'}</th>
            </tr>
          </thead>
          <tbody>
            {carriers.map((c, i) => (
              <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="lumif-table-row">
                <td className="lumif-table-cell px-4">
                  <CarrierLogo carrierId={c.id} size={32} />
                </td>
                <td className="lumif-table-cell px-4">
                  <div className="font-semibold text-[14px] text-[#121212]">{c.name}</div>
                </td>
                <td className="lumif-table-cell px-4 text-center">
                  <span className={`lumif-badge ${c.method === 'portal' ? 'lumif-badge-success' : 'lumif-badge-info'}`}>{c.method === 'portal' ? 'Portal' : 'Email'}</span>
                </td>
                <td className="lumif-table-cell px-4 text-[12px] text-[#374151]">{ruleByName[c.name] || ''}</td>
                <td className="lumif-table-cell px-4 text-center">
                  <div className="w-9 h-5 rounded-full cursor-pointer relative transition-all mx-auto" style={{ background: isOn(c.id) ? '#E94D35' : '#D1D5DB' }}
                    onClick={() => setToggleState(s => ({ ...s, [c.id]: !isOn(c.id) }))}>
                    <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all" style={{ left: isOn(c.id) ? 18 : 2 }} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">{t('carriers.surety', lang)}</h3>
      <div className="lumif-card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ background: '#FAFAFA' }}>
              <th className="lumif-table-header text-left px-4 py-3" style={{ width: 44 }}></th>
              <th className="lumif-table-header text-left px-4 py-3">{lang === 'es' ? 'Afianzadora' : 'Surety Company'}</th>
              <th className="lumif-table-header text-center px-4 py-3">{lang === 'es' ? 'Metodo' : 'Method'}</th>
              <th className="lumif-table-header text-left px-4 py-3">{lang === 'es' ? 'Regla de Envio' : 'Routing Rule'}</th>
              <th className="lumif-table-header text-center px-4 py-3" style={{ width: 70 }}>{lang === 'es' ? 'Incluir' : 'Include'}</th>
            </tr>
          </thead>
          <tbody>
            {suretyCarriers.map((c, i) => (
              <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.06 }} className="lumif-table-row">
                <td className="lumif-table-cell px-4">
                  <CarrierLogo carrierId={c.id} size={32} />
                </td>
                <td className="lumif-table-cell px-4">
                  <div className="font-semibold text-[14px] text-[#121212]">{c.name}</div>
                </td>
                <td className="lumif-table-cell px-4 text-center">
                  <span className="lumif-badge lumif-badge-info">Email</span>
                </td>
                <td className="lumif-table-cell px-4 text-[12px] text-[#374151]">{ruleByName[c.name] || ''}</td>
                <td className="lumif-table-cell px-4 text-center">
                  <div className="w-9 h-5 rounded-full cursor-pointer relative transition-all mx-auto" style={{ background: isOn(c.id) ? '#E94D35' : '#D1D5DB' }}
                    onClick={() => setToggleState(s => ({ ...s, [c.id]: !isOn(c.id) }))}>
                    <div className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all" style={{ left: isOn(c.id) ? 18 : 2 }} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================
//  BEAT 10 — ROUTING RULES
// ============================================================
function RoutingRulesView() {
  const { lang } = useLang()
  const carrierColors: Record<string, string> = { 'Mapfre Mexico': '#d32f2f', 'GNP Seguros': '#F47920', 'Chubb Mexico': '#000000', 'Zurich Mexico': '#0060AE', 'Afianzadora Aserta': '#2E7D32', 'Fianzas Dorama': '#1565C0' }
  const insuranceRules = routingRules.filter(r => !['Afianzadora Aserta', 'Fianzas Dorama'].includes(r.carrier))
  const suretyRules = routingRules.filter(r => ['Afianzadora Aserta', 'Fianzas Dorama'].includes(r.carrier))
  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#121212] mb-2">{lang === 'es' ? 'Reglas de Envio' : 'Submission Routing'}</h2>
      <p className="text-[13px] text-[#6B7280] mb-4">{lang === 'es' ? 'Lumif.ai determina automaticamente el metodo de envio optimo para cada aseguradora.' : 'Lumif.ai automatically determines the optimal submission method for each carrier.'}</p>
      <h3 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">{lang === 'es' ? 'Aseguradoras — Seguros' : 'Insurance Carriers'}</h3>
      <div className="lumif-card p-0 overflow-hidden mb-4">
        <table className="w-full">
          <thead><tr style={{ background: '#FAFAFA' }}>{[lang === 'es' ? 'Aseguradora' : 'Carrier', lang === 'es' ? 'Metodo' : 'Method', lang === 'es' ? 'Regla' : 'Rule'].map(h => <th key={h} className="lumif-table-header text-left px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>
            {insuranceRules.map((r, i) => (
              <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="lumif-table-row">
                <td className="lumif-table-cell px-4 font-medium">
                  <span className="flex items-center gap-2">
                    <CarrierLogoByName name={r.carrier} size={24} />
                    {r.carrier}
                  </span>
                </td>
                <td className="lumif-table-cell px-4"><span className={`lumif-badge ${r.method === 'portal' ? 'lumif-badge-success' : 'lumif-badge-info'}`}>{r.method === 'portal' ? 'Portal' : 'Email'}</span></td>
                <td className="lumif-table-cell px-4 text-[13px] text-[#374151]">{r.rule[lang]}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wide mb-2">{lang === 'es' ? 'Afianzadoras — Fianzas' : 'Surety Companies'}</h3>
      <div className="lumif-card p-0 overflow-hidden">
        <table className="w-full">
          <thead><tr style={{ background: '#FAFAFA' }}>{[lang === 'es' ? 'Afianzadora' : 'Carrier', lang === 'es' ? 'Metodo' : 'Method', lang === 'es' ? 'Regla' : 'Rule'].map(h => <th key={h} className="lumif-table-header text-left px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>
            {suretyRules.map((r, i) => (
              <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (insuranceRules.length + i) * 0.1 }} className="lumif-table-row">
                <td className="lumif-table-cell px-4 font-medium">
                  <span className="flex items-center gap-2">
                    <CarrierLogoByName name={r.carrier} size={24} />
                    {r.carrier}
                  </span>
                </td>
                <td className="lumif-table-cell px-4"><span className="lumif-badge lumif-badge-info">Email</span></td>
                <td className="lumif-table-cell px-4 text-[13px] text-[#374151]">{r.rule[lang]}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================
//  PORTAL VIEW (beat 11)
// ============================================================
function PortalView({ beat }: { beat: number }) {
  const { lang } = useLang()
  return (
    <div className="flex flex-col h-full" style={{ background: '#f8f6fa' }}>
      <div className="portal-header" style={{ background: '#d32f2f' }}>
        <div className="portal-logo">Mapfre <span className="portal-logo-subtitle">{lang === 'es' ? 'Portal Agentes' : 'Agent Portal'}</span></div>
        <div className="ml-auto flex items-center gap-3 text-white text-[12px]">
          <span>{lang === 'es' ? 'Agente' : 'Agent'}: Lic. Maria Elena Gutierrez | ALY-2847</span>
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-medium">MG</div>
        </div>
      </div>
      <div className="portal-nav">
        <div className="portal-nav-item">{t('portal.home', lang)}</div>
        <div className="portal-nav-item active">{t('portal.quotes', lang)}</div>
        <div className="portal-nav-item">{t('portal.policies', lang)}</div>
        <div className="portal-nav-item">{t('portal.claims', lang)}</div>
      </div>
      {/* Integration capability banner */}
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: '#EFF6FF', borderBottom: '1px solid #DBEAFE' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span className="text-[11px] text-[#1E40AF]">
          {lang === 'es'
            ? 'Lumif.ai automatiza el llenado de formularios en cualquier portal de aseguradora via automatizacion de navegador. Ejemplo: Mapfre Portal Agentes.'
            : 'Lumif.ai auto-fills forms on any carrier portal via browser automation. Example: Mapfre Agent Portal.'}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <PortalForm />
      </div>
    </div>
  )
}

function PortalForm() {
  const { lang } = useLang()
  const [filledCount, setFilledCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => { setFilledCount(c => { if (c >= qualitasPortalFields.length) { clearInterval(timer); return c }; return c + 1 }) }, 300)
    return () => clearInterval(timer)
  }, [])
  const sectionKeys = Array.from(new Set(qualitasPortalFields.map(f => f.section?.es)))
  return (
    <div className="max-w-[800px] mx-auto">
      <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-1">{t('portal.newQuote', lang)}</h2>
      <p className="text-[13px] text-[#6B7280] mb-4">{t('portal.formSubtitle', lang)}</p>
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg" style={{ background: 'rgba(211,47,47,0.08)' }}>
        {Icon.sparkle('#d32f2f')}
        <span className="text-[13px] text-[#d32f2f] font-medium">{t('portal.autoFilling', lang)}</span>
        <span className="text-[12px] text-[#9CA3AF] ml-auto">{filledCount}/{qualitasPortalFields.length} {t('portal.fields', lang)}</span>
      </div>
      {sectionKeys.map(sectionEs => {
        const sectionFields = qualitasPortalFields.filter(f => f.section?.es === sectionEs)
        const sectionLabel = sectionFields[0]?.section ? bi(sectionFields[0].section, lang) : ''
        return (
          <div key={sectionEs} className="portal-form mb-4">
            <h3 className="text-[13px] font-semibold text-[#d32f2f] mb-3 uppercase tracking-wide">{sectionLabel}</h3>
            <div className="grid grid-cols-2 gap-x-4">
              {sectionFields.map((field, fi) => {
                const globalIndex = qualitasPortalFields.indexOf(field)
                const isFilled = globalIndex < filledCount
                const isFilling = globalIndex === filledCount
                return (
                  <div key={fi} className={`portal-field ${isFilling ? 'filling' : ''}`}>
                    <label className="portal-field-label">{bi(field.label, lang)}</label>
                    <div className="portal-field-value" style={isFilling ? { borderColor: '#d32f2f', boxShadow: '0 0 0 2px rgba(211,47,47,0.15)' } : undefined}>
                      {isFilled || isFilling ? <span className={isFilling ? 'type-in' : ''}>{bi(field.value, lang)}</span> : <span className="text-[#D1D5DB]">---</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      {/* Document upload section — staggered attachment animation */}
      <div className="portal-form mb-4">
        <h3 className="text-[13px] font-semibold text-[#d32f2f] mb-3 uppercase tracking-wide">{lang === 'es' ? 'Documentos Adjuntos' : 'Attached Documents'}</h3>
        {['Contrato_MSA_Autopista_GDL_Tepic.pdf', 'EEFF_2025_CdelP.pdf', 'Inventario_Equipo_87u.xlsx', 'Siniestralidad_5yr_CdelP.pdf', 'PRT_IMSS_2026_CdelP.pdf'].map((f, i) => {
          const docDelay = (qualitasPortalFields.length * 0.3 + 0.5) + i * 0.6
          return (
            <PortalDocAttach key={i} filename={f} delay={docDelay} />
          )
        })}
      </div>
      {/* Portal note */}
      <div className="p-3 rounded-lg mb-4 text-[12px] text-[#6B7280]" style={{ background: 'rgba(211,47,47,0.04)', border: '1px solid rgba(211,47,47,0.15)' }}>
        {lang === 'es'
          ? 'Portal disponible para lineas estandar. Riesgos complejos (CAR >Mex$30M) requieren envio por email.'
          : 'Portal submission available for standard lines. Complex risks (CAR >Mex$30M) require email submission.'}
      </div>
      <div className="flex gap-3 mt-4">
        <button className="portal-btn" style={{ background: '#d32f2f' }}>{t('portal.submit', lang)}</button>
        <button className="portal-btn" style={{ background: 'transparent', color: '#d32f2f', border: '1px solid #d32f2f' }}>{t('portal.saveDraft', lang)}</button>
      </div>
    </div>
  )
}

// Portal document attachment with stagger animation
function PortalDocAttach({ filename, delay }: { filename: string; delay: number }) {
  const [phase, setPhase] = useState<'hidden' | 'uploading' | 'done'>('hidden')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const showTimer = setTimeout(() => setPhase('uploading'), delay * 1000)
    const progressTimer = setTimeout(() => {
      let p = 0
      const iv = setInterval(() => { p += 20; setProgress(p); if (p >= 100) { clearInterval(iv); setPhase('done') } }, 80)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => { clearTimeout(showTimer); clearTimeout(progressTimer) }
  }, [delay])

  if (phase === 'hidden') return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 py-1.5 text-[13px]"
    >
      {phase === 'done' ? (
        Icon.checkCircle('#16a34a')
      ) : (
        <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full border-2 border-[#d32f2f] border-t-transparent animate-spin" />
        </div>
      )}
      <span className={phase === 'done' ? '' : 'text-[#6B7280]'}>{filename}</span>
      {phase === 'uploading' && (
        <div className="flex-1 max-w-[120px] h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden ml-2">
          <div className="h-full bg-[#d32f2f] rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
    </motion.div>
  )
}

// ============================================================
//  BEAT 12 — EMAIL APPROVAL
// ============================================================
function EmailApproval({ onApprove }: { onApprove: () => void }) {
  const { lang } = useLang()
  const [approved, setApproved] = useState<Set<number>>(new Set())
  const [editing, setEditing] = useState<number | null>(null)
  const [editedBodies, setEditedBodies] = useState<Record<number, string>>({})
  const [removedAttachments, setRemovedAttachments] = useState<Record<number, Set<number>>>({})
  const [showAddAttachment, setShowAddAttachment] = useState<number | null>(null)
  const allApproved = approved.size >= 4

  const extraAttachmentOptions = [
    { name: 'Carta_Recomendacion_CdelP.pdf', ext: 'pdf' },
    { name: 'Historial_Siniestralidad_CdelP.pdf', ext: 'pdf' },
    { name: 'Inventario_Equipo_2026.xlsx', ext: 'xlsx' },
  ]
  const [addedAttachments, setAddedAttachments] = useState<Record<number, { name: string; ext: string }[]>>({})

  const emailItems = [
    { carrier: 'Chubb Mexico', email: 'suscripcion@chubb.com.mx', reason: lang === 'es' ? 'Excede limite de portal (Mex$30M). Requiere revision de suscriptor.' : 'Exceeds portal limit (Mex$30M). Requires underwriter review.' },
    { carrier: 'Zurich Mexico', email: 'agentes.comercial@zurich.com.mx', reason: lang === 'es' ? 'Portal limitado a lineas estandar. Riesgo complejo requiere envio por email.' : 'Portal limited to standard lines. Complex risk requires email submission.' },
    { carrier: 'Afianzadora Aserta', email: 'suscripcion@aserta.com.mx', reason: lang === 'es' ? 'Solicitud de fianzas via email. Linea pre-aprobada para Constructora del Pacifico.' : 'Surety bond request via email. Pre-approved line for Constructora del Pacifico.' },
    { carrier: 'Fianzas Dorama', email: 'fianzas@dorama.com.mx', reason: lang === 'es' ? 'Solicitud de fianzas via email. Requiere estados financieros actualizados.' : 'Surety bond request via email. Requires updated financial statements.' },
  ]

  const isSurety = (carrier: string) => carrier.includes('Aserta') || carrier.includes('Dorama')

  const getSubject = (carrier: string) => {
    if (isSurety(carrier)) {
      return lang === 'es' ? 'Solicitud de Fianzas — Autopista GDL-Tepic — Constructora del Pacifico' : 'Surety Bond Request — GDL-Tepic Highway — Constructora del Pacifico'
    }
    return lang === 'es' ? 'Solicitud de Cotizacion — Todo Riesgo Construccion — Autopista GDL-Tepic' : 'Quote Request — All Risk Construction — GDL-Tepic Highway'
  }

  const getBody = (carrier: string) => {
    if (isSurety(carrier)) {
      return lang === 'es'
        ? `Estimados señores de ${carrier},\n\nPor medio de la presente, Alaya Seguros solicita la emision de fianzas para el proyecto Autopista Guadalajara-Tepic a nombre de Constructora del Pacifico S.A. de C.V.\n\nTipos de fianza requeridos:\n- Fianza de Cumplimiento (10% del contrato)\n- Fianza de Buena Calidad de Obra (10% del contrato)\n- Fianza de Anticipo (15% del contrato)\n\nMonto del Contrato: Mex$500,000,000.00 M.N.\nInicio de obra: 15/04/2026\n\nSe adjuntan estados financieros y requisitos de fianzas.\n\nAtentamente,\nLic. Maria Elena Gutierrez\nAlaya Seguros`
        : `Dear ${carrier} team,\n\nAlaya Seguros requests surety bond issuance for the Guadalajara-Tepic Highway project on behalf of Constructora del Pacifico S.A. de C.V.\n\nRequired bond types:\n- Performance Bond (10% of contract)\n- Quality Guarantee Bond (10% of contract)\n- Advance Payment Bond (15% of contract)\n\nContract Amount: Mex$500,000,000.00 MXN\nStart Date: 04/15/2026\n\nFinancial statements and bond requirements attached.\n\nSincerely,\nLic. Maria Elena Gutierrez\nAlaya Seguros`
    }
    return lang === 'es'
      ? `Estimados señores de ${carrier},\n\nPor medio de la presente, Alaya Seguros solicita cotizacion para coberturas de seguro del proyecto Autopista Guadalajara-Tepic.\n\nMonto del Contrato: Mex$500,000,000.00 M.N.\nInicio de obra: 15/04/2026\nVigencia solicitada: 24 meses\n\nSe adjuntan documentos de soporte.\n\nAtentamente,\nLic. Maria Elena Gutierrez\nAlaya Seguros`
      : `Dear ${carrier} team,\n\nAlaya Seguros requests quotes for insurance coverages for the Guadalajara-Tepic Highway project.\n\nContract Amount: Mex$500,000,000.00 MXN\nStart Date: 04/15/2026\nRequested Term: 24 months\n\nSupporting documents attached.\n\nSincerely,\nLic. Maria Elena Gutierrez\nAlaya Seguros`
  }

  const getAttachments = (carrier: string) => {
    if (isSurety(carrier)) {
      return [
        { name: 'Requisitos_Fianzas_GDL_Tepic.pdf', ext: 'pdf' },
        { name: 'Estados_Financieros_CdelP_2025.pdf', ext: 'pdf' },
        { name: 'Perfil_Riesgo_CdelP.pdf', ext: 'pdf' },
      ]
    }
    return [
      { name: 'Contrato_MSA_GDL_Tepic.pdf', ext: 'pdf' },
      { name: 'Perfil_Riesgo_CdelP.pdf', ext: 'pdf' },
    ]
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold text-[#121212]">{lang === 'es' ? 'Aprobacion de Solicitudes por Email' : 'Email Submission Approval'}</h2>
        {allApproved && (
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lumif-btn-primary text-[13px]" onClick={onApprove}>
            {lang === 'es' ? 'Continuar — Emails Enviados' : 'Continue — Emails Sent'} →
          </motion.button>
        )}
      </div>
      {emailItems.map((item, idx) => {
        const body = editedBodies[idx] ?? getBody(item.carrier)
        const isEditing = editing === idx
        return (
        <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }} className="lumif-card mb-4">
          {/* Header with carrier info and actions inline */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CarrierLogoByName name={item.carrier} size={24} />
              <span className="text-[14px] font-semibold text-[#121212]">{item.carrier}</span>
              <span className="lumif-badge lumif-badge-info">{isSurety(item.carrier) ? (lang === 'es' ? 'Fianzas' : 'Surety') : (lang === 'es' ? 'Seguros' : 'Insurance')}</span>
              <span className="lumif-badge lumif-badge-info">{lang === 'es' ? 'Via Email' : 'Via Email'}</span>
            </div>
            <div className="flex items-center gap-2">
              {approved.has(idx) ? (
                <span className="lumif-badge lumif-badge-success">{lang === 'es' ? 'Email Enviado' : 'Email Sent'} ✓</span>
              ) : isEditing ? (
                <>
                  <button className="lumif-btn-secondary text-[12px]" style={{ padding: '6px 14px' }} onClick={() => { setEditing(null); setEditedBodies(prev => { const next = { ...prev }; delete next[idx]; return next }) }}>{lang === 'es' ? 'Cancelar' : 'Cancel'}</button>
                  <button className="lumif-btn-primary text-[12px]" style={{ padding: '6px 14px' }} onClick={() => setEditing(null)}>{lang === 'es' ? 'Guardar' : 'Save'}</button>
                </>
              ) : (
                <>
                  <button className="lumif-btn-secondary text-[12px]" style={{ padding: '6px 14px' }} onClick={() => { setEditing(idx); if (!(idx in editedBodies)) setEditedBodies(prev => ({ ...prev, [idx]: getBody(item.carrier) })) }}>{lang === 'es' ? 'Editar' : 'Edit'}</button>
                  <button className="lumif-btn-primary text-[12px]" style={{ padding: '6px 14px' }} onClick={() => setApproved(prev => new Set(prev).add(idx))}>{lang === 'es' ? 'Enviar' : 'Send'}</button>
                </>
              )}
            </div>
          </div>
          <div className="text-[11px] text-[#6B7280] mb-2">{item.reason}</div>

          {/* Email preview — full width */}
          <div className="border border-[#E5E7EB] rounded-lg p-4 text-[12px] text-[#374151] leading-relaxed" style={{ background: '#FAFAFA', maxHeight: 220, overflow: 'auto' }}>
            <div className="mb-1"><span className="font-medium text-[#121212]">{t('to', lang)}:</span> {item.email}</div>
            <div className="mb-2"><span className="font-medium text-[#121212]">{t('submissions.subject', lang)}:</span> {getSubject(item.carrier)}</div>
            <div className="border-t border-[#E5E7EB] pt-2 whitespace-pre-line text-[12px]">
              {isEditing ? (
                <textarea
                  value={body}
                  onChange={(e) => setEditedBodies(prev => ({ ...prev, [idx]: e.target.value }))}
                  className="w-full text-[12px] text-[#374151] leading-relaxed font-[Inter,system-ui,sans-serif] border border-[#D1D5DB] rounded p-2 resize-y"
                  style={{ background: '#FFFFFF', minHeight: 140 }}
                />
              ) : (
                <div>{body}</div>
              )}
            </div>
          </div>

          {/* Attachments — compact inline with add/remove */}
          <div className="mt-2 flex flex-wrap gap-1.5 items-center relative">
            {getAttachments(item.carrier).map((f, fi) => {
              const isRemoved = removedAttachments[idx]?.has(fi)
              if (isRemoved) return null
              return (
                <div key={`orig-${fi}`} className="flex items-center gap-1 px-2 py-1 rounded border border-[#E5E7EB] text-[10px] bg-white group">
                  <div style={{ width: 14, height: 14, borderRadius: 2, background: f.ext === 'pdf' ? '#EA4335' : '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: 6, fontWeight: 700 }}>{f.ext.toUpperCase()}</span>
                  </div>
                  <span className="text-[#374151]">{f.name}</span>
                  {!approved.has(idx) && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setRemovedAttachments(prev => { const s = new Set(prev[idx] || []); s.add(fi); return { ...prev, [idx]: s } }) }}
                      className="ml-0.5 w-3.5 h-3.5 rounded-full hover:bg-[#fee2e2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  )}
                </div>
              )
            })}
            {(addedAttachments[idx] || []).map((f, fi) => (
              <div key={`added-${fi}`} className="flex items-center gap-1 px-2 py-1 rounded border border-[#E5E7EB] text-[10px] bg-white group">
                <div style={{ width: 14, height: 14, borderRadius: 2, background: f.ext === 'pdf' ? '#EA4335' : '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: 6, fontWeight: 700 }}>{f.ext.toUpperCase()}</span>
                </div>
                <span className="text-[#374151]">{f.name}</span>
                {!approved.has(idx) && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setAddedAttachments(prev => ({ ...prev, [idx]: (prev[idx] || []).filter((_, j) => j !== fi) })) }}
                    className="ml-0.5 w-3.5 h-3.5 rounded-full hover:bg-[#fee2e2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                )}
              </div>
            ))}
            {!approved.has(idx) && (
              <div className="relative">
                <button
                  onClick={() => setShowAddAttachment(showAddAttachment === idx ? null : idx)}
                  className="flex items-center gap-1 px-2 py-1 rounded border border-dashed border-[#D1D5DB] text-[10px] text-[#6B7280] hover:text-[#E94D35] hover:border-[#E94D35] transition-colors"
                >
                  <span>+</span> <span>{lang === 'es' ? 'Agregar Adjunto' : 'Add Attachment'}</span>
                </button>
                {showAddAttachment === idx && (
                  <div className="absolute top-full left-0 mt-1 z-20 bg-white rounded-lg border border-[#E5E7EB] shadow-lg overflow-hidden" style={{ minWidth: 220 }}>
                    {extraAttachmentOptions.map((opt, oi) => (
                      <div
                        key={oi}
                        onClick={() => { setAddedAttachments(prev => ({ ...prev, [idx]: [...(prev[idx] || []), opt] })); setShowAddAttachment(null) }}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#F3F4F6] cursor-pointer text-[11px] text-[#374151]"
                      >
                        <div style={{ width: 14, height: 14, borderRadius: 2, background: opt.ext === 'pdf' ? '#EA4335' : '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'white', fontSize: 6, fontWeight: 700 }}>{opt.ext.toUpperCase()}</span>
                        </div>
                        {opt.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
        )
      })}
    </div>
  )
}

// ============================================================
//  BEAT 14 — QUOTE GRID
// ============================================================
function QuoteGrid({ beat, partial }: { beat: number; partial: boolean }) {
  const { lang } = useLang()
  const d = lang === 'es' ? 'dias' : 'days'
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  // Insurance quotes arrive first, then surety
  const allQuoteRows = [
    { carrier: 'Mapfre Mexico', type: 'seguro' as const, premium: quotes.mapfre.primaTotal, time: `T+3 ${d}`, quoteKey: 'mapfre', arrivalOrder: 1 },
    { carrier: 'GNP Seguros', type: 'seguro' as const, premium: quotes.gnp.primaTotal, time: `T+5 ${d}`, quoteKey: 'gnp', arrivalOrder: 2 },
    { carrier: 'Chubb Mexico', type: 'seguro' as const, premium: quotes.chubb.primaTotal, time: `T+7 ${d}`, quoteKey: 'chubb', arrivalOrder: 3 },
    { carrier: 'Zurich Mexico', type: 'seguro' as const, premium: quotes.zurich.primaTotal, time: `T+8 ${d}`, quoteKey: 'zurich', arrivalOrder: 4 },
    { carrier: 'Afianzadora Aserta', type: 'fianza' as const, premium: suretyQuotes.aserta.totalConIva, time: `T+9 ${d}`, quoteKey: 'aserta', arrivalOrder: 5 },
    { carrier: 'Fianzas Dorama', type: 'fianza' as const, premium: suretyQuotes.dorama.totalConIva, time: `T+10 ${d}`, quoteKey: 'dorama', arrivalOrder: 6 },
  ]

  const quoteRows = allQuoteRows

  // For partial view: animate up to 3. For full view: start at 3, animate remaining.
  const maxVisible = partial ? 3 : quoteRows.length
  const startFrom = partial ? 0 : 3

  // Reset to appropriate starting point when switching views
  useEffect(() => {
    setVisibleCount(startFrom)
  }, [partial, startFrom])

  useEffect(() => {
    if (visibleCount >= maxVisible) return
    const timer = setTimeout(() => setVisibleCount(c => c + 1), partial ? 800 : 600)
    return () => clearTimeout(timer)
  }, [visibleCount, maxVisible, partial])

  const receivedCount = Math.min(visibleCount, maxVisible)
  const allReceived = receivedCount >= quoteRows.length

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-semibold text-[#121212]">{t('quotes.title', lang)}</h2>
          <span className="lumif-badge lumif-badge-success">{receivedCount} {lang === 'es' ? 'de' : 'of'} 6 {lang === 'es' ? 'recibidas' : 'received'}</span>
          {receivedCount < quoteRows.length && <span className="lumif-badge lumif-badge-warning pulse-soft">{quoteRows.length - receivedCount} {lang === 'es' ? 'pendientes' : 'pending'}</span>}
        </div>
        {partial && receivedCount >= 3 && (
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lumif-btn-primary text-[13px]">
            {Icon.grid('white')}
            <span>{lang === 'es' ? 'Generar Comparativo Parcial' : 'Generate Partial Comparison'}</span>
          </motion.button>
        )}
        {!partial && allReceived && (
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lumif-btn-primary text-[13px]">
            {Icon.grid('white')}
            <span>{lang === 'es' ? 'Generar Comparativo Completo' : 'Generate Full Comparison'}</span>
          </motion.button>
        )}
      </div>
      <CurrencyNote />
      <div className="lumif-card p-0 overflow-hidden mb-4">
        <table className="w-full">
          <thead><tr style={{ background: '#FAFAFA' }}>{[lang === 'es' ? 'Aseguradora' : 'Carrier', lang === 'es' ? 'Tipo' : 'Type', lang === 'es' ? 'Estado' : 'Status', lang === 'es' ? 'Prima' : 'Premium', lang === 'es' ? 'Recibida' : 'Received'].map(h => <th key={h} className="lumif-table-header text-left px-4 py-3">{h}</th>)}</tr></thead>
          <tbody>
            {quoteRows.map((q, i) => {
              const isReceived = i < receivedCount
              const justArrived = i === receivedCount - 1
              return (
                <motion.tr key={q.quoteKey}
                  initial={{ opacity: isReceived ? 1 : 0.4 }}
                  animate={{ opacity: isReceived ? 1 : 0.4, background: justArrived ? 'rgba(34,197,94,0.08)' : isReceived ? 'transparent' : 'rgba(249,115,22,0.03)' }}
                  transition={{ duration: 0.5 }}
                  className={`lumif-table-row ${isReceived ? 'cursor-pointer' : ''}`}
                  onClick={() => { if (isReceived) setSelectedQuote(q.quoteKey) }}>
                  <td className="lumif-table-cell px-4 font-medium"><span className="flex items-center gap-2"><CarrierLogoByName name={q.carrier} size={24} />{q.carrier}</span></td>
                  <td className="lumif-table-cell px-4"><span className={`lumif-badge ${q.type === 'seguro' ? 'lumif-badge-coral' : 'lumif-badge-info'}`}>{q.type === 'seguro' ? (lang === 'es' ? 'Seguro' : 'Insurance') : (lang === 'es' ? 'Fianza' : 'Surety Bond')}</span></td>
                  <td className="lumif-table-cell px-4">
                    {isReceived
                      ? <span className={`lumif-badge lumif-badge-success ${justArrived ? 'green-flash' : ''}`}>{t('quotes.received', lang)}</span>
                      : <span className="lumif-badge lumif-badge-warning pulse-soft">{lang === 'es' ? 'Pendiente' : 'Pending'}</span>}
                  </td>
                  <td className="lumif-table-cell px-4 font-bold text-[15px]">{isReceived ? fmt(q.premium) : <span className="text-[#9CA3AF]">—</span>}</td>
                  <td className="lumif-table-cell px-4 text-[#6B7280]">{isReceived ? q.time : <span className="text-[#9CA3AF] italic">{lang === 'es' ? 'esperando...' : 'waiting...'}</span>}</td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {!partial && allReceived && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card" style={{ borderLeft: '4px solid #16a34a' }}>
          <div className="text-[14px] font-semibold text-[#121212]">{t('quotes.allReceived', lang)}</div>
          <div className="text-[12px] text-[#6B7280]">{lang === 'es' ? '6 cotizaciones recibidas — 2 afianzadoras y 4 aseguradoras. Listo para comparar.' : '6 quotes received — 2 surety carriers and 4 insurance carriers. Ready to compare.'}</div>
        </motion.div>
      )}

      {/* Cotizacion modal */}
      <AnimatePresence>
        {selectedQuote && (
          <CotizacionModal quoteKey={selectedQuote} onClose={() => setSelectedQuote(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// Cotizacion / Quote Document Preview Modal — multi-page document
function CotizacionModal({ quoteKey, onClose }: { quoteKey: string; onClose: () => void }) {
  const { lang } = useLang()
  const isSurety = quoteKey === 'aserta' || quoteKey === 'dorama'

  const pageStyle: React.CSSProperties = {
    width: 680,
    background: '#fff',
    borderRadius: 2,
    boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
    fontFamily: 'serif',
    padding: 48,
    position: 'relative',
  }
  const sansStyle: React.CSSProperties = { fontFamily: 'sans-serif' }
  const sectionHeader = (text: string) => (
    <div className="text-[13px] font-bold uppercase tracking-wider mb-3 pb-1" style={{ ...sansStyle, borderBottom: '2px solid #1a1a1a' }}>{text}</div>
  )
  const pageFooter = (carrier: string, page: number, total: number) => (
    <div className="flex justify-between items-center mt-auto pt-4 text-[10px] text-[#9CA3AF]" style={{ ...sansStyle, borderTop: '1px solid #E5E7EB' }}>
      <span>{carrier} — {lang === 'es' ? 'Regulada por la CNSF' : 'Regulated by CNSF'}</span>
      <span>{lang === 'es' ? `Pagina ${page} de ${total}` : `Page ${page} of ${total}`}</span>
    </div>
  )

  // ─── SURETY (Aserta / Dorama) — 3 pages ───
  if (isSurety) {
    const sq = suretyQuotes[quoteKey]
    const refNum = quoteKey === 'aserta' ? '04521' : '03187'

    const fianzaDeclarations = [
      { key: 'A', es: 'El fiado se obliga a reembolsar a la afianzadora lo que esta pague con motivo de la fianza.', en: 'The principal is obligated to reimburse the surety for any payments made under the bond.' },
      { key: 'B', es: 'La afianzadora podra hacer efectiva la garantia de recuperacion sin necesidad de procedimiento judicial.', en: 'The surety may enforce the recovery guarantee without judicial proceedings.' },
      { key: 'C', es: 'El fiado autoriza expresamente a la afianzadora a realizar las investigaciones que considere necesarias.', en: 'The principal expressly authorizes the surety to conduct any investigations deemed necessary.' },
      { key: 'D', es: 'La presente fianza se otorga de conformidad con lo dispuesto en la Ley de Instituciones de Seguros y Fianzas.', en: 'This bond is issued in accordance with the Insurance and Surety Institutions Law.' },
      { key: 'E', es: 'Cualquier modificacion al contrato principal debera ser comunicada y aprobada por la afianzadora.', en: 'Any modification to the underlying contract must be communicated to and approved by the surety.' },
      { key: 'F', es: 'El beneficiario debera presentar su reclamacion dentro de los 180 dias naturales siguientes al incumplimiento.', en: 'The beneficiary must file their claim within 180 calendar days following default.' },
      { key: 'G', es: 'La fianza no cubre penalizaciones convencionales ni danos indirectos o consecuenciales.', en: 'The bond does not cover contractual penalties or indirect/consequential damages.' },
      { key: 'H', es: 'El monto afianzado se reducira proporcionalmente conforme al avance de obra debidamente documentado.', en: 'The bonded amount will be proportionally reduced according to documented construction progress.' },
      { key: 'I', es: 'La presente poliza es indivisible y no podra ser parcialmente cancelada.', en: 'This policy is indivisible and may not be partially cancelled.' },
      { key: 'J', es: 'Queda expresamente convenido que esta fianza no ampara obligaciones de naturaleza fiscal o laboral.', en: 'It is expressly agreed that this bond does not cover fiscal or labor obligations.' },
      { key: 'K', es: 'Para la interpretacion y cumplimiento de esta fianza, las partes se someten a la jurisdiccion de los tribunales federales de la Ciudad de Mexico.', en: 'For interpretation and compliance, the parties submit to the jurisdiction of the federal courts of Mexico City.' },
    ]

    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-center overflow-y-auto"
        style={{ background: 'rgba(82,86,89,0.85)' }}
        onClick={onClose}
      >
        <div className="py-8 flex flex-col items-center gap-6" style={{ minHeight: 'min-content' }} onClick={(e) => e.stopPropagation()}>
          {/* Close button floating */}
          <button onClick={onClose} className="fixed top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center z-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* PAGE 1 — Cover & Bond Details */}
          <div style={pageStyle}>
            <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '2px solid #1a1a1a' }}>
              <div className="flex items-center gap-3">
                <CarrierLogoByName name={sq.carrier} size={36} />
                <div>
                  <div className="text-[20px] font-bold" style={sansStyle}>{sq.carrier}</div>
                  <div className="text-[11px] text-[#6B7280]" style={sansStyle}>{lang === 'es' ? 'Institucion de Fianzas' : 'Surety Institution'}</div>
                </div>
              </div>
              <div className="text-right text-[11px] text-[#6B7280]" style={sansStyle}>
                <div>REF: FZ-2026-{refNum}</div>
                <div>{lang === 'es' ? 'Fecha' : 'Date'}: 09/04/2026</div>
              </div>
            </div>
            <div className="text-center mb-8">
              <div className="text-[18px] font-bold tracking-widest">{lang === 'es' ? 'PROPUESTA DE AFIANZAMIENTO' : 'SURETY BOND PROPOSAL'}</div>
              <div className="text-[12px] text-[#6B7280] mt-1" style={sansStyle}>{lang === 'es' ? 'Fecha de emision' : 'Issue date'}: 09/04/2026</div>
            </div>
            <div className="mb-5 p-3 rounded text-[12px]" style={{ background: '#F9FAFB', ...sansStyle, border: '1px solid #E5E7EB' }}>
              <div className="font-semibold mb-1">{lang === 'es' ? 'Vigencia' : 'Bond Period'}</div>
              <div className="text-[#374151]">{lang === 'es' ? 'Desde las 12:00 hrs. del 15/04/2026 hasta las 12:00 hrs. del 15/04/2028' : 'From 12:00 hrs. on 04/15/2026 to 12:00 hrs. on 04/15/2028'}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-[12px]" style={sansStyle}>
              <div>
                <div className="font-semibold mb-1 text-[11px] text-[#6B7280] uppercase tracking-wide">{lang === 'es' ? 'DATOS DEL FIADO' : 'PRINCIPAL DETAILS'}</div>
                <div className="font-medium">Constructora del Pacifico S.A. de C.V.</div>
                <div className="text-[#6B7280]">RFC: CPE-190315-XX1</div>
                <div className="text-[#6B7280]">Blvd. Puerta de Hierro 5065, Zapopan, Jal.</div>
              </div>
              <div>
                <div className="font-semibold mb-1 text-[11px] text-[#6B7280] uppercase tracking-wide">{lang === 'es' ? 'DATOS DEL BENEFICIARIO' : 'BENEFICIARY DETAILS'}</div>
                <div className="font-medium">{lang === 'es' ? 'Secretaria de Infraestructura y Obra Publica' : 'Ministry of Infrastructure and Public Works'}</div>
                <div className="text-[#6B7280]">{lang === 'es' ? 'Gobierno del Estado de Jalisco' : 'Government of the State of Jalisco'}</div>
                <div className="text-[#6B7280]">{lang === 'es' ? 'Proyecto: Autopista Guadalajara-Tepic' : 'Project: Guadalajara-Tepic Highway'}</div>
              </div>
            </div>
            {sectionHeader(lang === 'es' ? 'FIANZAS SOLICITADAS' : 'REQUESTED BONDS')}
            <table className="w-full text-[12px] mb-5" style={{ ...sansStyle, borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#F3F4F6' }}>
                <th className="text-left py-2 px-3 font-semibold">{lang === 'es' ? 'Tipo de Fianza' : 'Bond Type'}</th>
                <th className="text-right py-2 px-3 font-semibold">{lang === 'es' ? 'Monto Afianzado' : 'Bonded Amount'}</th>
                <th className="text-right py-2 px-3 font-semibold">{lang === 'es' ? 'Prima' : 'Premium'}</th>
              </tr></thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}><td className="py-2 px-3">{lang === 'es' ? 'Cumplimiento' : 'Performance'}</td><td className="py-2 px-3 text-right">{fmt(sq.fianzaCumplimiento.montoAfianzado)}</td><td className="py-2 px-3 text-right">{fmt(sq.fianzaCumplimiento.prima)}</td></tr>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}><td className="py-2 px-3">{lang === 'es' ? 'Buena Calidad de Obra (Vicios Ocultos)' : 'Quality Guarantee (Hidden Defects)'}</td><td className="py-2 px-3 text-right">{fmt(sq.fianzaBuenaCalidad.montoAfianzado)}</td><td className="py-2 px-3 text-right">{fmt(sq.fianzaBuenaCalidad.prima)}</td></tr>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}><td className="py-2 px-3">{lang === 'es' ? 'Anticipo' : 'Advance Payment'}</td><td className="py-2 px-3 text-right">{fmt(sq.fianzaAnticipo.montoAfianzado)}</td><td className="py-2 px-3 text-right">{fmt(sq.fianzaAnticipo.prima)}</td></tr>
              </tbody>
            </table>
            {pageFooter(sq.carrier, 1, 3)}
          </div>

          {/* PAGE 2 — Financial & Declarations */}
          <div style={pageStyle}>
            {sectionHeader(lang === 'es' ? 'RESUMEN FINANCIERO' : 'FINANCIAL SUMMARY')}
            <div className="mb-6 p-4 rounded" style={{ background: '#FAFAFA', ...sansStyle }}>
              <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Prima Neta (3 fianzas)' : 'Net Premium (3 bonds)'}</span><span className="font-medium">{fmt(sq.primaTotal)}</span></div>
              {sq.gastosExpedicion ? <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Gastos de Expedicion' : 'Issuance Fees'}</span><span className="font-medium">{fmt(sq.gastosExpedicion)}</span></div> : null}
              <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Subtotal' : 'Subtotal'}</span><span className="font-medium">{fmt(sq.primaTotal + (sq.gastosExpedicion || 0))}</span></div>
              <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">IVA (16%)</span><span className="font-medium">{fmt(sq.iva)}</span></div>
              <div className="flex justify-between text-[14px] font-bold pt-2" style={{ borderTop: '1px solid #E5E7EB' }}><span>{lang === 'es' ? 'Total con IVA' : 'Total with VAT'}</span><span>{fmt(Math.round(sq.totalConIva))}</span></div>
            </div>
            <div className="mb-4 text-[12px]" style={sansStyle}>
              <div className="flex justify-between p-2 rounded" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                <span className="text-[#6B7280]">{lang === 'es' ? 'Forma de Pago' : 'Payment Method'}</span>
                <span className="font-medium">{lang === 'es' ? 'Pago unico al momento de la emision' : 'Single payment upon issuance'}</span>
              </div>
            </div>
            {sectionHeader(lang === 'es' ? 'DECLARACIONES' : 'DECLARATIONS')}
            <div className="space-y-2 text-[11px] text-[#374151]" style={sansStyle}>
              {fianzaDeclarations.map((d) => (
                <div key={d.key} className="flex gap-2">
                  <span className="font-bold text-[#1a1a1a] shrink-0">{d.key}.</span>
                  <span>{d[lang]}</span>
                </div>
              ))}
            </div>
            {pageFooter(sq.carrier, 2, 3)}
          </div>

          {/* PAGE 3 — Conditions & Acceptance */}
          <div style={pageStyle}>
            {sectionHeader(lang === 'es' ? 'CONDICIONES GENERALES' : 'GENERAL CONDITIONS')}
            <div className="space-y-3 text-[12px] mb-6" style={sansStyle}>
              {[
                { es: 'Aviso de siniestro: dentro de los 5 dias habiles siguientes a la fecha del incumplimiento.', en: 'Claim notice: within 5 business days following the date of default.' },
                { es: 'Plazo de reclamacion: 180 dias naturales contados a partir del incumplimiento de la obligacion garantizada.', en: 'Claim period: 180 calendar days from the default of the guaranteed obligation.' },
                { es: 'La afianzadora se reserva el derecho de solicitar garantias adicionales de recuperacion.', en: 'The surety reserves the right to request additional recovery guarantees.' },
                { es: 'Las primas se consideran devengadas en su totalidad desde el inicio de vigencia de la fianza.', en: 'Premiums are considered fully earned from the bond inception date.' },
              ].map((cond, i) => (
                <div key={i} className="flex items-start gap-2 text-[#374151]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#374151] shrink-0 mt-1.5" />
                  <span>{cond[lang]}</span>
                </div>
              ))}
            </div>
            {sectionHeader(lang === 'es' ? 'CONDICIONES ESPECIALES' : 'SPECIAL CONDITIONS')}
            <div className="space-y-3 text-[12px] mb-6" style={sansStyle}>
              {[
                { es: 'Cronograma de obra requerido como parte de la documentacion soporte.', en: 'Construction schedule required as part of supporting documentation.' },
                { es: 'Reporte mensual de avance de obra con fotografia de evidencia.', en: 'Monthly construction progress report with photographic evidence.' },
                { es: 'La emision de las fianzas esta sujeta a la aprobacion del comite de credito de la afianzadora.', en: 'Bond issuance is subject to approval by the surety credit committee.' },
              ].map((cond, i) => (
                <div key={i} className="flex items-start gap-2 text-[#374151]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#374151] shrink-0 mt-1.5" />
                  <span>{cond[lang]}</span>
                </div>
              ))}
            </div>
            <div className="text-[12px] text-[#6B7280] mb-3" style={sansStyle}>
              {lang === 'es' ? 'VIGENCIA DE LA COTIZACION: 15 dias naturales a partir de la fecha de emision.' : 'QUOTE VALIDITY: 15 calendar days from the date of issue.'}
            </div>
            <div className="mt-8 p-4 rounded text-[12px]" style={{ border: '1px solid #E5E7EB', ...sansStyle }}>
              <div className="text-[#6B7280] mb-6">
                {lang === 'es'
                  ? `Esta propuesta constituye una oferta sujeta a la aceptacion del fiado y a la suscripcion formal por parte de ${sq.carrier}.`
                  : `This proposal constitutes an offer subject to the principal's acceptance and formal underwriting by ${sq.carrier}.`}
              </div>
              <div className="grid grid-cols-2 gap-8 mt-4">
                <div className="text-center">
                  <div className="border-t border-[#1a1a1a] pt-2 mt-8">
                    <div className="font-semibold">{lang === 'es' ? 'Firma del Suscriptor' : 'Underwriter Signature'}</div>
                    <div className="text-[#6B7280] text-[11px]">{sq.carrier}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t border-[#1a1a1a] pt-2 mt-8">
                    <div className="font-semibold">{lang === 'es' ? 'Aceptacion del Fiado' : 'Principal Acceptance'}</div>
                    <div className="text-[#6B7280] text-[11px]">Constructora del Pacifico S.A. de C.V.</div>
                  </div>
                </div>
              </div>
            </div>
            {pageFooter(sq.carrier, 3, 3)}
          </div>
        </div>
      </motion.div>
    )
  }

  // ─── INSURANCE (Mapfre, GNP, Chubb, Zurich) — 4 pages ───
  const q = quotes[quoteKey]
  const isZurich = quoteKey === 'zurich'

  const coverageRows = [
    { name: { es: 'Responsabilidad Civil General', en: 'General Liability' }, suma: 'Mex$5,000,000', deductible: q.deductibles.rcGeneral, condiciones: { es: 'Base — ocurrencia', en: 'Occurrence basis' } },
    { name: { es: 'Equipo de Construccion', en: 'Construction Equipment' }, suma: 'Mex$120,000,000', deductible: q.deductibles.equipoConstruccion, condiciones: { es: 'Valor de reposicion', en: 'Replacement value' } },
    { name: { es: 'Responsabilidad Patronal', en: "Employer's Liability" }, suma: 'Mex$2,000,000', deductible: q.deductibles.respPatronal, condiciones: { es: 'Por evento', en: 'Per event' } },
    { name: { es: 'Todo Riesgo Construccion (CAR)', en: 'All Risk Construction (CAR)' }, suma: 'Mex$500,000,000', deductible: q.deductibles.todoRiesgo, condiciones: { es: 'Primer riesgo absoluto', en: 'First absolute risk' } },
    { name: { es: 'Remocion de Escombros', en: 'Debris Removal' }, suma: 'Mex$5,000,000', deductible: '10% min. Mex$100,000', condiciones: { es: 'Sublimite', en: 'Sublimit' } },
    { name: { es: 'Extension de Mantenimiento', en: 'Maintenance Extension' }, suma: 'Mex$500,000,000', deductible: '10% min. Mex$250,000', condiciones: { es: '12 meses post-entrega', en: '12 months post-handover' } },
    { name: { es: 'Gastos Extraordinarios', en: 'Extraordinary Expenses' }, suma: 'Mex$10,000,000', deductible: '15% min. Mex$200,000', condiciones: { es: 'Aceleracion de obra', en: 'Work acceleration' } },
  ]

  const generalExclusions = [
    { es: 'Guerra, invasion, actos de enemigo extranjero', en: 'War, invasion, acts of foreign enemy' },
    { es: 'Terrorismo (salvo endoso especifico)', en: 'Terrorism (unless specific endorsement)' },
    { es: 'Contaminacion gradual y liberacion de contaminantes', en: 'Gradual pollution and release of contaminants' },
    { es: 'Desgaste natural, deterioro, oxidacion, corrosion', en: 'Natural wear and tear, deterioration, rust, corrosion' },
    { es: 'Defectos pre-existentes conocidos por el asegurado', en: 'Pre-existing defects known to the insured' },
    { es: 'Danos por falta de mantenimiento ordinario', en: 'Damage from lack of ordinary maintenance' },
  ]

  const zurichSpecificExclusions = [
    { es: 'Danos causados por vibracion, remocion o debilitamiento de soporte', en: 'Damage caused by vibration, removal or weakening of support' },
    { es: 'Danos a propiedades circundantes por asentamientos de terreno', en: 'Damage to surrounding properties from ground settlement' },
  ]

  const endorsementDetails = q.endosos.map((end, i) => ({
    name: end,
    description: {
      es: [
        'Cubre danos materiales y lesiones derivadas de huelgas, motines y conmocion civil durante el periodo de construccion.',
        'Extiende la cobertura de RC a reclamaciones cruzadas entre contratista y subcontratistas como si fueran partes separadas.',
        'Cubre costos extraordinarios para acelerar la reanudacion de obra tras un siniestro cubierto.',
        'Ampara danos por errores u omisiones en el diseno de la obra, sujeto a sublimite especificado.',
        'Cobertura por danos a propiedades adyacentes causados por actividades de construccion.',
        'Extiende la proteccion para riesgos sismicos en zonas clasificadas B y C por el Servicio Sismologico Nacional.',
        'Ampara propiedades existentes en el perimetro de la obra que pudieran verse afectadas.',
        'Cubre el costo de remocion y disposicion de escombros posterior a un siniestro, sujeto al sublimite indicado.',
        'Incluye cobertura por danos causados por vibracion durante hincado de pilotes y excavacion profunda.',
        'Extiende la cobertura por 12 meses posteriores a la recepcion provisional de la obra.',
        'Cobertura para actos de terrorismo durante el periodo de construccion, sujeto a condiciones especificas.',
      ][i % 11],
      en: [
        'Covers material damage and injuries arising from strikes, riots and civil commotion during the construction period.',
        'Extends liability coverage to cross-claims between contractor and subcontractors as if they were separate parties.',
        'Covers extraordinary costs to accelerate resumption of work after a covered loss.',
        'Covers damage from errors or omissions in project design, subject to specified sublimit.',
        'Coverage for damage to adjacent properties caused by construction activities.',
        'Extends protection for seismic risks in zones classified B and C by the National Seismological Service.',
        'Covers existing properties within the project perimeter that could be affected.',
        'Covers the cost of debris removal and disposal after a loss, subject to the indicated sublimit.',
        'Includes coverage for damage caused by vibration during pile driving and deep excavation.',
        'Extends coverage for 12 months following provisional acceptance of the works.',
        'Coverage for acts of terrorism during the construction period, subject to specific conditions.',
      ][i % 11],
    },
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto"
      style={{ background: 'rgba(82,86,89,0.85)' }}
      onClick={onClose}
    >
      <div className="py-8 flex flex-col items-center gap-6" style={{ minHeight: 'min-content' }} onClick={(e) => e.stopPropagation()}>
        {/* Close button floating */}
        <button onClick={onClose} className="fixed top-4 right-4 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center z-50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* PAGE 1 — Cover & Risk Details */}
        <div style={pageStyle}>
          <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '2px solid #1a1a1a' }}>
            <div className="flex items-center gap-3">
              <CarrierLogoByName name={q.carrier} size={36} />
              <div>
                <div className="text-[20px] font-bold" style={sansStyle}>{q.carrier}</div>
                <div className="text-[11px] text-[#6B7280]" style={sansStyle}>{lang === 'es' ? 'Compania de Seguros' : 'Insurance Company'}</div>
              </div>
            </div>
            <div className="text-right text-[11px] text-[#6B7280]" style={sansStyle}>
              <div>CNSF {q.cnsf || `REG-${quoteKey.toUpperCase()}-2026`}</div>
              <div>REF: COT-{quoteKey.toUpperCase()}-2026-047823</div>
            </div>
          </div>
          <div className="text-center mb-8">
            <div className="text-[18px] font-bold tracking-widest">{lang === 'es' ? 'COTIZACION / PROPUESTA DE SEGURO' : 'INSURANCE QUOTE / PROPOSAL'}</div>
            <div className="text-[12px] text-[#6B7280] mt-1" style={sansStyle}>{lang === 'es' ? 'Fecha de emision' : 'Issue date'}: 09/04/2026</div>
          </div>
          <div className="mb-5 p-3 rounded text-[12px]" style={{ background: '#F9FAFB', ...sansStyle, border: '1px solid #E5E7EB' }}>
            <div className="font-semibold mb-1">{lang === 'es' ? 'Vigencia' : 'Policy Period'}</div>
            <div className="text-[#374151]">{q.vigencia}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6 text-[12px]" style={sansStyle}>
            <div>
              <div className="font-semibold mb-1 text-[11px] text-[#6B7280] uppercase tracking-wide">{lang === 'es' ? 'DATOS DEL CONTRATANTE' : 'POLICYHOLDER DETAILS'}</div>
              <div className="font-medium">Constructora del Pacifico S.A. de C.V.</div>
              <div className="text-[#6B7280]">RFC: CPE-190315-XX1</div>
              <div className="text-[#6B7280]">Blvd. Puerta de Hierro 5065, Zapopan, Jal.</div>
            </div>
            <div>
              <div className="font-semibold mb-1 text-[11px] text-[#6B7280] uppercase tracking-wide">{lang === 'es' ? 'DATOS DEL RIESGO' : 'RISK DETAILS'}</div>
              <div className="font-medium">{lang === 'es' ? 'Autopista Guadalajara-Tepic' : 'Guadalajara-Tepic Highway'}</div>
              <div className="text-[#6B7280]">{lang === 'es' ? 'Ubicacion: Jalisco-Nayarit, 167 km' : 'Location: Jalisco-Nayarit, 167 km'}</div>
              <div className="text-[#6B7280]">{lang === 'es' ? 'Valor del contrato' : 'Contract value'}: Mex$500,000,000 M.N.</div>
            </div>
          </div>
          {pageFooter(q.carrier, 1, 4)}
        </div>

        {/* PAGE 2 — Coverages & Exclusions */}
        <div style={pageStyle}>
          {sectionHeader(lang === 'es' ? 'COBERTURAS' : 'COVERAGES')}
          <table className="w-full text-[11px] mb-5" style={{ ...sansStyle, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F3F4F6' }}>
                <th className="text-left py-2 px-2 font-semibold">{lang === 'es' ? 'Cobertura' : 'Coverage'}</th>
                <th className="text-right py-2 px-2 font-semibold">{lang === 'es' ? 'Suma Asegurada' : 'Sum Insured'}</th>
                <th className="text-left py-2 px-2 font-semibold">{lang === 'es' ? 'Deducible' : 'Deductible'}</th>
                <th className="text-left py-2 px-2 font-semibold">{lang === 'es' ? 'Condiciones' : 'Conditions'}</th>
              </tr>
            </thead>
            <tbody>
              {coverageRows.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td className="py-2 px-2 font-medium">{c.name[lang]}</td>
                  <td className="py-2 px-2 text-right text-[#374151]">{c.suma}</td>
                  <td className="py-2 px-2 text-[10px] text-[#6B7280]">{c.deductible}</td>
                  <td className="py-2 px-2 text-[10px] text-[#6B7280]">{c.condiciones[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {sectionHeader(lang === 'es' ? 'EXCLUSIONES GENERALES' : 'GENERAL EXCLUSIONS')}
          <div className="space-y-1 mb-5" style={sansStyle}>
            {generalExclusions.map((ex, i) => (
              <div key={i} className="text-[11px] text-[#374151] flex items-start gap-1.5 py-0.5">
                <span className="mt-0.5 shrink-0">{Icon.xCircle('#6B7280')}</span>
                <span>{ex[lang]}</span>
              </div>
            ))}
          </div>

          {isZurich && (
            <>
              {sectionHeader(lang === 'es' ? 'EXCLUSIONES ESPECIFICAS — ZURICH' : 'SPECIFIC EXCLUSIONS — ZURICH')}
              <div className="p-3 rounded mb-5" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', ...sansStyle }}>
                {zurichSpecificExclusions.map((ex, i) => (
                  <div key={i} className="text-[12px] text-[#dc2626] flex items-start gap-1.5 py-0.5 font-medium">
                    <span className="mt-0.5 shrink-0">{Icon.xCircle('#dc2626')}</span>
                    <span>{ex[lang]}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Show non-Zurich exclusions if present */}
          {!isZurich && q.exclusiones.length > 0 && (
            <div className="mb-5 p-3 rounded" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)', ...sansStyle }}>
              <div className="text-[11px] font-semibold text-[#dc2626] uppercase tracking-wide mb-1">{lang === 'es' ? 'Exclusiones Especificas' : 'Specific Exclusions'}</div>
              {q.exclusiones.map((ex, i) => (
                <div key={i} className="text-[12px] text-[#dc2626] flex items-start gap-1.5 py-0.5">
                  <span className="mt-0.5">{Icon.xCircle('#dc2626')}</span>
                  <span>{ex[lang]}</span>
                </div>
              ))}
            </div>
          )}
          {pageFooter(q.carrier, 2, 4)}
        </div>

        {/* PAGE 3 — Endorsements & Financial */}
        <div style={pageStyle}>
          {sectionHeader(lang === 'es' ? 'ENDOSOS INCLUIDOS' : 'INCLUDED ENDORSEMENTS')}
          <div className="space-y-2 mb-6" style={sansStyle}>
            {endorsementDetails.map((end, i) => (
              <div key={i} className="flex items-start gap-2 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shrink-0 mt-1.5" />
                <div>
                  <div className="font-medium text-[#374151]">{end.name[lang]}</div>
                  <div className="text-[#9CA3AF] text-[10px]">{end.description[lang]}</div>
                </div>
              </div>
            ))}
          </div>

          {sectionHeader(lang === 'es' ? 'RESUMEN FINANCIERO' : 'FINANCIAL SUMMARY')}
          <div className="mb-4 p-4 rounded" style={{ background: '#FAFAFA', ...sansStyle }}>
            <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Prima Neta' : 'Net Premium'}</span><span className="font-medium">{fmt(q.primaNeta)}</span></div>
            <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Gastos de Expedicion (6%)' : 'Issuance Fees (6%)'}</span><span className="font-medium">{fmt(q.gastosExpedicion)}</span></div>
            <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">{lang === 'es' ? 'Subtotal' : 'Subtotal'}</span><span className="font-medium">{fmt(q.primaNeta + q.gastosExpedicion)}</span></div>
            <div className="flex justify-between text-[12px] mb-1"><span className="text-[#6B7280]">IVA (16%)</span><span className="font-medium">{fmt(q.iva)}</span></div>
            <div className="flex justify-between text-[14px] font-bold pt-2" style={{ borderTop: '1px solid #E5E7EB' }}>
              <span>{lang === 'es' ? 'Prima Total' : 'Total Premium'}</span>
              <span>{fmt(q.primaTotal)}</span>
            </div>
          </div>
          <div className="mb-4 text-[12px]" style={sansStyle}>
            <div className="flex justify-between p-2 rounded" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <span className="text-[#6B7280]">{lang === 'es' ? 'Forma de Pago' : 'Payment Method'}</span>
              <span className="font-medium">{lang === 'es' ? 'Anual / Semestral / Trimestral' : 'Annual / Semi-annual / Quarterly'}</span>
            </div>
          </div>
          <div className="text-[12px] text-[#6B7280] font-medium mt-4" style={sansStyle}>
            {lang === 'es' ? 'VIGENCIA DE LA COTIZACION: 15 dias naturales a partir de la fecha de emision.' : 'QUOTE VALIDITY: 15 calendar days from the date of issue.'}
          </div>
          {pageFooter(q.carrier, 3, 4)}
        </div>

        {/* PAGE 4 — Conditions & Acceptance */}
        <div style={pageStyle}>
          {sectionHeader(lang === 'es' ? 'CONDICIONES GENERALES' : 'GENERAL CONDITIONS')}
          <div className="space-y-3 text-[12px] mb-6" style={sansStyle}>
            {[
              { label: { es: 'Clausula de 72 horas', en: '72-hour clause' }, desc: { es: 'Los eventos que ocurran dentro de un periodo consecutivo de 72 horas se consideraran como un solo siniestro para efectos del deducible (clausula de agregacion).', en: 'Events occurring within a consecutive 72-hour period shall be considered a single loss for deductible purposes (aggregation clause).' } },
              { label: { es: 'Aviso de siniestro', en: 'Claim notice' }, desc: { es: '5 dias habiles a partir del conocimiento del siniestro por parte del asegurado o su representante.', en: '5 business days from the insured or their representative becoming aware of the loss.' } },
              { label: { es: 'Inspeccion de riesgo', en: 'Risk inspection' }, desc: { es: 'Dentro de los 30 dias posteriores al inicio de vigencia de la poliza. La aseguradora se reserva el derecho de ajustar condiciones tras la inspeccion.', en: 'Within 30 days following policy inception. The insurer reserves the right to adjust conditions following the inspection.' } },
              { label: { es: 'Ajustador designado', en: 'Designated adjuster' }, desc: { es: quoteKey === 'mapfre' ? 'Crawford & Company Mexico' : quoteKey === 'gnp' ? 'Cunningham Lindsey Mexico' : quoteKey === 'chubb' ? 'McLarens Mexico' : 'GAB Robins Mexico', en: quoteKey === 'mapfre' ? 'Crawford & Company Mexico' : quoteKey === 'gnp' ? 'Cunningham Lindsey Mexico' : quoteKey === 'chubb' ? 'McLarens Mexico' : 'GAB Robins Mexico' } },
            ].map((cond, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#374151] shrink-0 mt-1.5" />
                <div><span className="font-semibold text-[#1a1a1a]">{cond.label[lang]}:</span> <span className="text-[#374151]">{cond.desc[lang]}</span></div>
              </div>
            ))}
          </div>

          {sectionHeader(lang === 'es' ? 'CONDICIONES ESPECIALES' : 'SPECIAL CONDITIONS')}
          <div className="space-y-3 text-[12px] mb-6" style={sansStyle}>
            {[
              { es: 'Cronograma de obra requerido como parte integral de la documentacion del riesgo.', en: 'Construction schedule required as integral part of the risk documentation.' },
              { es: 'Reporte mensual de avance de obra y estado de las medidas de prevencion de siniestros.', en: 'Monthly construction progress report and status of loss prevention measures.' },
              { es: 'Poliza sujeta a inspeccion satisfactoria del riesgo dentro del plazo establecido.', en: 'Policy subject to satisfactory risk inspection within the established timeframe.' },
            ].map((cond, i) => (
              <div key={i} className="flex items-start gap-2 text-[#374151]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#374151] shrink-0 mt-1.5" />
                <span>{cond[lang]}</span>
              </div>
            ))}
          </div>

          {/* Acceptance block */}
          <div className="mt-8 p-4 rounded text-[12px]" style={{ border: '1px solid #E5E7EB', ...sansStyle }}>
            <div className="text-[#6B7280] mb-6">
              {lang === 'es'
                ? `Esta cotizacion constituye una propuesta sujeta a la aceptacion del asegurado y a la suscripcion formal por parte de ${q.carrier}.`
                : `This quote constitutes a proposal subject to the insured's acceptance and formal underwriting by ${q.carrier}.`}
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4">
              <div className="text-center">
                <div className="border-t border-[#1a1a1a] pt-2 mt-8">
                  <div className="font-semibold">{lang === 'es' ? 'Firma del Suscriptor' : 'Underwriter Signature'}</div>
                  <div className="text-[#6B7280] text-[11px]">{q.carrier}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-[#1a1a1a] pt-2 mt-8">
                  <div className="font-semibold">{lang === 'es' ? 'Aceptacion del Asegurado' : 'Insured Acceptance'}</div>
                  <div className="text-[#6B7280] text-[11px]">Constructora del Pacifico S.A. de C.V.</div>
                </div>
              </div>
            </div>
          </div>
          {pageFooter(q.carrier, 4, 4)}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
//  BEATS 13-14 — COMPARISON MATRIX (grouped, collapsible)
// ============================================================
// ============================================================
//  BEAT 12 — PARTIAL COMPARISON
// ============================================================
function PartialComparisonView() {
  const { lang } = useLang()
  const partialInsuranceCols = ['mapfre', 'gnp', 'chubb'] as const

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold text-[#121212]">{lang === 'es' ? 'Comparativo Parcial — Seguros' : 'Partial Comparison — Insurance'}</h2>
      </div>

      {/* Partial comparison banner */}
      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-4 py-3 rounded-lg flex items-center gap-3" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}>
        {Icon.alertTriangle('#f59e0b')}
        <div>
          <span className="text-[13px] font-semibold text-[#92400e]">{lang === 'es' ? 'Comparativo parcial — 3 cotizaciones de seguro recibidas' : 'Partial comparison — 3 insurance quotes received'}</span>
          <div className="text-[11px] text-[#92400e] mt-0.5">{lang === 'es' ? 'En espera de: Zurich Mexico, Afianzadora Aserta, Fianzas Dorama' : 'Waiting for: Zurich Mexico, Afianzadora Aserta, Fianzas Dorama'}</div>
        </div>
      </motion.div>

      <CurrencyNote />

      {/* Insurance comparison — Mapfre, GNP, Chubb (3 of 4) */}
      <h3 className="text-[14px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-3">{lang === 'es' ? 'Seguros — 3 de 4 aseguradoras' : 'Insurance — 3 of 4 carriers'}</h3>
      {comparisonMatrixGrouped.map((group: ComparisonGroup, gi: number) => (
        <div key={gi} className="lumif-card mb-4 p-0 overflow-hidden">
          <div className="flex items-center px-4 py-3">
            <span className="text-[14px] font-semibold text-[#121212]">{group.group[lang]}</span>
            <span className="text-[12px] text-[#6B7280] ml-2">{group.rows.length} {lang === 'es' ? 'coberturas' : 'coverages'}</span>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="lumif-table-header text-left w-[180px] px-4">{lang === 'es' ? 'Cobertura' : 'Coverage'}</th>
                  <th className="lumif-table-header text-center w-[100px]">{lang === 'es' ? 'Requerido' : 'Required'}</th>
                  <th className="lumif-table-header text-center relative" style={{ borderTop: '3px solid #E94D35' }}>
                    <div className="text-[9px] font-bold text-[#E94D35] mb-0.5">{t('matrix.bestOption', lang)}</div>
                    Mapfre
                  </th>
                  <th className="lumif-table-header text-center">GNP</th>
                  <th className="lumif-table-header text-center">Chubb</th>
                  <th className="lumif-table-header text-center" style={{ color: '#9CA3AF' }}>Zurich <span className="text-[9px] font-normal">{lang === 'es' ? '(pendiente)' : '(pending)'}</span></th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row: ComparisonRow, ri: number) => (
                  <tr key={ri} className="lumif-table-row">
                    <td className="lumif-table-cell text-left font-medium text-[13px] px-4">{bi(row.coverage, lang)}</td>
                    <td className="lumif-table-cell text-center text-[12px] text-[#6B7280]">{bi(row.required, lang)}</td>
                    {partialInsuranceCols.map((carrierId) => {
                      const cell: MatrixCell = row[carrierId]
                      return (
                        <td key={carrierId}
                          className={`matrix-cell ${statusColor(cell.status)} ${carrierId === 'mapfre' ? 'matrix-recommended' : ''}`}
                          style={carrierId === 'mapfre' ? { borderLeft: '3px solid #E94D35' } : undefined}
                          title={cell.tooltip ? cell.tooltip[lang] : undefined}>
                          <span className="text-[13px]">{cell.value[lang]}</span>
                        </td>
                      )
                    })}
                    <td className="matrix-cell text-center text-[12px] text-[#D1D5DB]">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      ))}

      {/* Waiting note */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card" style={{ borderLeft: '4px solid #f59e0b', background: 'rgba(245,158,11,0.03)' }}>
        <div className="flex items-center gap-2 mb-1">
          {Icon.clock('#f59e0b')}
          <span className="text-[14px] font-semibold text-[#121212]">{lang === 'es' ? 'Cotizaciones pendientes' : 'Pending quotes'}</span>
        </div>
        <p className="text-[13px] text-[#374151]">
          {lang === 'es'
            ? 'Esperando respuesta de: Zurich Mexico (seguro), Afianzadora Aserta y Fianzas Dorama (fianzas). El comparativo se actualizara automaticamente conforme se reciban.'
            : 'Waiting for response from: Zurich Mexico (insurance), Afianzadora Aserta and Fianzas Dorama (surety). The comparison will update automatically as quotes arrive.'}
        </p>
      </motion.div>
    </div>
  )
}

function ComparisonMatrixView({ expandedGroupIndex, beat }: { expandedGroupIndex: number; beat: number }) {
  const { lang } = useLang()
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(() => {
    const s = new Set<number>()
    for (let i = 0; i <= expandedGroupIndex; i++) s.add(i)
    return s
  })
  const [zurichFlashed, setZurichFlashed] = useState(false)
  const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive')
  const carrierCols = ['mapfre', 'gnp', 'chubb', 'zurich'] as const

  useEffect(() => {
    setExpandedGroups(prev => {
      const s = new Set(prev)
      s.add(expandedGroupIndex)
      return s
    })
    if (expandedGroupIndex >= 1) {
      setTimeout(() => setZurichFlashed(true), 400)
    }
  }, [expandedGroupIndex])

  const toggleGroup = (idx: number) => {
    setExpandedGroups(prev => {
      const s = new Set(prev)
      if (s.has(idx)) s.delete(idx); else s.add(idx)
      return s
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold text-[#121212]">{t('matrix.title', lang)}</h2>
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
          <button
            className="px-3 py-1.5 text-[12px] font-medium transition-colors"
            style={viewMode === 'interactive' ? { background: '#121212', color: 'white' } : { background: 'white', color: '#6B7280' }}
            onClick={() => setViewMode('interactive')}
          >{lang === 'es' ? 'Interactivo' : 'Interactive'}</button>
          <button
            className="px-3 py-1.5 text-[12px] font-medium transition-colors"
            style={viewMode === 'pdf' ? { background: '#121212', color: 'white' } : { background: 'white', color: '#6B7280' }}
            onClick={() => setViewMode('pdf')}
          >{lang === 'es' ? 'PDF Cliente' : 'Client PDF Preview'}</button>
        </div>
      </div>
      <CurrencyNote />

      {viewMode === 'pdf' ? (
        <ComparisonPdfPreview lang={lang} carrierCols={carrierCols} />
      ) : (<>
      {comparisonMatrixGrouped.map((group: ComparisonGroup, gi: number) => {
        const isExpanded = expandedGroups.has(gi)
        return (
          <div key={gi} className="lumif-card mb-4 p-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#FAFAFA]" onClick={() => toggleGroup(gi)}>
              <span className="text-[14px] font-semibold text-[#121212]">{group.group[lang]}</span>
              <span className="text-[12px] text-[#6B7280] flex items-center gap-1">{group.rows.length} {lang === 'es' ? 'filas' : 'rows'} {isExpanded ? Icon.chevronDown('#6B7280') : Icon.chevronRight('#6B7280')}</span>
            </div>
            {isExpanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="lumif-table-header text-left w-[180px] px-4">{t('matrix.coverage', lang)}</th>
                      <th className="lumif-table-header text-center w-[100px]">{t('matrix.required', lang)}</th>
                      <th className="lumif-table-header text-center relative" style={{ borderTop: '3px solid #E94D35' }}>
                        <div className="text-[9px] font-bold text-[#E94D35] mb-0.5">{t('matrix.bestOption', lang)}</div>
                        Mapfre
                      </th>
                      <th className="lumif-table-header text-center">GNP</th>
                      <th className="lumif-table-header text-center">Chubb</th>
                      <th className="lumif-table-header text-center">Zurich</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row: ComparisonRow, ri: number) => {
                      const isVibrationRow = row.coverage.es === 'Vibracion y Remocion de Soporte'
                      const showFlash = isVibrationRow && gi === 1 && zurichFlashed
                      return (
                        <tr key={ri} className="lumif-table-row" style={showFlash ? { borderLeft: '3px solid #dc2626' } : undefined}>
                          <td className="lumif-table-cell text-left font-medium text-[13px] px-4">{bi(row.coverage, lang)}</td>
                          <td className="lumif-table-cell text-center text-[12px] text-[#6B7280]">{bi(row.required, lang)}</td>
                          {carrierCols.map((carrierId) => {
                            const cell: MatrixCell = row[carrierId]
                            const isZurichExclusion = carrierId === 'zurich' && cell.status === 'exclusion'
                            return (
                              <td key={carrierId}
                                className={`matrix-cell ${statusColor(cell.status)} ${carrierId === 'mapfre' ? 'matrix-recommended' : ''} ${isZurichExclusion && showFlash ? 'highlight-sweep' : ''}`}
                                style={carrierId === 'mapfre' ? { borderLeft: '3px solid #E94D35' } : undefined}
                                title={cell.tooltip ? cell.tooltip[lang] : undefined}>
                                <span className="text-[13px]">{cell.value[lang]}</span>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>
        )
      })}

      {/* Zurich alert (inline in insurance comparison) */}
      {expandedGroupIndex === 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="lumif-card mb-4" style={{ border: '2px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.03)' }}>
          <div className="flex items-start gap-3">
            {Icon.alertTriangle('#dc2626')}
            <div>
              <div className="text-[14px] font-semibold text-[#dc2626] mb-1">{t('matrix.alertTitle', lang)}</div>
              <p className="text-[13px] text-[#374151] leading-relaxed">{t('matrix.alertBody', lang)}</p>
              <div className="mt-2 flex items-center gap-2">{Icon.sparkle('#E94D35')}<span className="text-[11px] font-medium text-[#E94D35]">{t('matrix.alertAuto', lang)}</span></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Insurance insight card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card mt-4" style={{ borderLeft: '4px solid #E94D35', background: 'rgba(233,77,53,0.03)' }}>
        <div className="flex items-center gap-2 mb-2">
          {Icon.sparkle('#E94D35')}
          <span className="text-[14px] font-semibold text-[#121212]">Mapfre Mexico</span>
        </div>
        <p className="text-[13px] text-[#374151]">
          {lang === 'es'
            ? 'Prima mas baja de las 4 cotizaciones (Mex$847,000 vs promedio Mex$941,500). Cobertura completa incluyendo Endoso 014 (Vibracion) disponible por prima adicional. Sin exclusiones criticas. Deducible de Todo Riesgo negociable a 8%. Zurich excluye vibracion — riesgo contractual critico para obra carretera.'
            : 'Lowest premium of 4 quotes (Mex$847,000 vs average Mex$941,500). Full coverage including Endorsement 014 (Vibration) available for additional premium. No critical exclusions. All-Risk deductible negotiable to 8%. Zurich excludes vibration — critical contractual risk for highway project.'}
        </p>
      </motion.div>

      {/* Action buttons */}
      </>)}
    </div>
  )
}

// Comparison Matrix — Client PDF Preview
function ComparisonPdfPreview({ lang, carrierCols }: { lang: 'es' | 'en'; carrierCols: readonly string[] }) {
  return (
    <div className="flex justify-center py-6" style={{ background: '#525659', borderRadius: 8, minHeight: 600 }}>
      <div className="bg-white shadow-2xl overflow-y-auto" style={{ width: 780, maxHeight: '75vh', fontFamily: 'serif' }}>
        <div className="p-10">
          {/* Alaya letterhead */}
          <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '2px solid #1a1a1a' }}>
            <div>
              <div className="text-[20px] font-bold" style={{ fontFamily: 'sans-serif', color: '#1a1a1a' }}>Alaya Seguros</div>
              <div className="text-[11px] text-[#6B7280]" style={{ fontFamily: 'sans-serif' }}>{lang === 'es' ? 'Agente de Seguros y Fianzas' : 'Insurance & Surety Broker'}</div>
            </div>
            <div className="text-right text-[11px] text-[#6B7280]" style={{ fontFamily: 'sans-serif' }}>
              <div>REF: CC-ALY-2026-0047</div>
              <div>{lang === 'es' ? 'Fecha' : 'Date'}: 09/04/2026</div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <div className="text-[15px] font-bold tracking-wider">{lang === 'es' ? 'CUADRO COMPARATIVO DE SEGUROS' : 'INSURANCE COMPARISON MATRIX'}</div>
            <div className="text-[12px] text-[#6B7280] mt-1" style={{ fontFamily: 'sans-serif' }}>{lang === 'es' ? 'Proyecto: Autopista Guadalajara-Tepic | Constructora del Pacifico S.A. de C.V.' : 'Project: Guadalajara-Tepic Highway | Constructora del Pacifico S.A. de C.V.'}</div>
          </div>

          {/* Comparison table */}
          {comparisonMatrixGrouped.map((group: ComparisonGroup, gi: number) => (
            <div key={gi} className="mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-wide mb-2 text-[#374151]" style={{ fontFamily: 'sans-serif' }}>{group.group[lang]}</div>
              <table className="w-full text-[11px]" style={{ fontFamily: 'sans-serif', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F3F4F6' }}>
                    <th className="text-left py-1.5 px-2 font-semibold" style={{ width: 160 }}>{lang === 'es' ? 'Cobertura' : 'Coverage'}</th>
                    <th className="text-center py-1.5 px-2 font-semibold" style={{ width: 80 }}>{lang === 'es' ? 'Requerido' : 'Required'}</th>
                    {carrierCols.map(c => (
                      <th key={c} className="text-center py-1.5 px-2 font-semibold" style={c === 'mapfre' ? { borderTop: '3px solid #E94D35' } : undefined}>
                        {c === 'mapfre' && <div className="text-[8px] text-[#E94D35] font-bold">{lang === 'es' ? 'PRIMA MAS BAJA' : 'LOWEST PREMIUM'}</div>}
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row: ComparisonRow, ri: number) => (
                    <tr key={ri} style={{ borderBottom: '1px solid #E5E7EB' }}>
                      <td className="py-1.5 px-2 font-medium">{bi(row.coverage, lang)}</td>
                      <td className="py-1.5 px-2 text-center text-[#6B7280]">{bi(row.required, lang)}</td>
                      {carrierCols.map((carrierId) => {
                        const cell: MatrixCell = (row as unknown as Record<string, MatrixCell>)[carrierId]
                        const isExclusion = cell.status === 'exclusion'
                        return (
                          <td key={carrierId} className="py-1.5 px-2 text-center"
                            style={isExclusion ? { color: '#dc2626', fontWeight: 600 } : carrierId === 'mapfre' ? { borderLeft: '2px solid #E94D35' } : undefined}>
                            {cell.value[lang]}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Financial summary */}
          <div className="mb-6 p-4 rounded" style={{ background: '#FAFAFA', fontFamily: 'sans-serif' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide mb-2 text-[#374151]">{lang === 'es' ? 'Resumen Financiero' : 'Financial Summary'}</div>
            <table className="w-full text-[12px]" style={{ borderCollapse: 'collapse' }}>
              <thead><tr style={{ background: '#F3F4F6' }}>
                <th className="text-left py-1.5 px-2 font-semibold">{lang === 'es' ? 'Concepto' : 'Concept'}</th>
                {carrierCols.map(c => <th key={c} className="text-center py-1.5 px-2 font-semibold">{c.charAt(0).toUpperCase() + c.slice(1)}</th>)}
              </tr></thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td className="py-1.5 px-2 font-medium">{lang === 'es' ? 'Prima Total' : 'Total Premium'}</td>
                  {carrierCols.map(c => <td key={c} className="py-1.5 px-2 text-center font-bold" style={c === 'mapfre' ? { color: '#E94D35' } : undefined}>{fmt(quotes[c].primaTotal)}</td>)}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Insight note */}
          <div className="mb-6 p-3 rounded text-[12px]" style={{ background: 'rgba(233,77,53,0.04)', border: '1px solid rgba(233,77,53,0.15)', fontFamily: 'sans-serif' }}>
            <div className="font-semibold text-[#E94D35] mb-1">Mapfre Mexico</div>
            <div className="text-[#374151]">
              {lang === 'es'
                ? 'Prima mas baja (Mex$847,000). Cobertura completa incluyendo Endoso 014 (Vibracion) disponible. Sin exclusiones criticas. Deducible Todo Riesgo negociable a 8%.'
                : 'Lowest premium (Mex$847,000). Full coverage including Endorsement 014 (Vibration) available. No critical exclusions. All-Risk deductible negotiable to 8%.'}
            </div>
          </div>

          {/* Signature line */}
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid #E5E7EB', fontFamily: 'sans-serif' }}>
            <div className="w-[250px]">
              <div className="border-b border-[#1a1a1a] mb-2" style={{ height: 40 }} />
              <div className="text-[12px] font-semibold text-[#121212]">Lic. Maria Elena Gutierrez</div>
              <div className="text-[11px] text-[#6B7280]">Alaya Seguros</div>
              <div className="text-[11px] text-[#9CA3AF] mt-1">09/04/2026 | REF: CC-ALY-2026-0047</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
//  BEAT 14 — SURETY COMPARISON
// ============================================================
function SuretyComparisonView() {
  const { lang } = useLang()
  const suretyRows = [
    {
      bond: { es: 'Fianza de Cumplimiento', en: 'Performance Bond' },
      required: 'Mex$50,000,000',
      validity: { es: 'Vigencia: ejecucion hasta acta de entrega-recepcion', en: 'Valid: execution until acceptance certificate' },
      aserta: { amount: fmt(suretyQuotes.aserta.fianzaCumplimiento.montoAfianzado), premium: fmt(suretyQuotes.aserta.fianzaCumplimiento.prima), status: 'cumple' as const },
      dorama: { amount: fmt(suretyQuotes.dorama.fianzaCumplimiento.montoAfianzado), premium: fmt(suretyQuotes.dorama.fianzaCumplimiento.prima), status: 'cumple' as const },
    },
    {
      bond: { es: 'Fianza de Buena Calidad de Obra (Vicios Ocultos)', en: 'Quality Guarantee Bond (Hidden Defects)' },
      required: 'Mex$50,000,000',
      validity: { es: 'Vigencia: 12 meses desde entrega-recepcion', en: 'Valid: 12 months from acceptance' },
      aserta: { amount: fmt(suretyQuotes.aserta.fianzaBuenaCalidad.montoAfianzado), premium: fmt(suretyQuotes.aserta.fianzaBuenaCalidad.prima), status: 'cumple' as const },
      dorama: { amount: fmt(suretyQuotes.dorama.fianzaBuenaCalidad.montoAfianzado), premium: fmt(suretyQuotes.dorama.fianzaBuenaCalidad.prima), status: 'insuficiente' as const },
    },
    {
      bond: { es: 'Fianza de Anticipo', en: 'Advance Payment Bond' },
      required: 'Mex$75,000,000',
      validity: { es: 'Vigencia: hasta amortizacion total del anticipo', en: 'Valid: until advance is fully amortized' },
      aserta: { amount: fmt(suretyQuotes.aserta.fianzaAnticipo.montoAfianzado), premium: fmt(suretyQuotes.aserta.fianzaAnticipo.prima), status: 'cumple' as const },
      dorama: { amount: fmt(suretyQuotes.dorama.fianzaAnticipo.montoAfianzado), premium: fmt(suretyQuotes.dorama.fianzaAnticipo.prima), status: 'cumple' as const },
    },
  ]

  const detailRows = [
    {
      label: { es: 'Prima Neta (3 fianzas)', en: 'Net Premium (3 bonds)' },
      aserta: fmt(suretyQuotes.aserta.primaTotal),
      dorama: fmt(suretyQuotes.dorama.primaTotal),
    },
    {
      label: { es: 'Gastos de Expedicion', en: 'Policy Fees' },
      aserta: suretyQuotes.aserta.gastosExpedicion ? fmt(suretyQuotes.aserta.gastosExpedicion) : '—',
      dorama: suretyQuotes.dorama.gastosExpedicion ? fmt(suretyQuotes.dorama.gastosExpedicion) : '—',
    },
    {
      label: { es: 'IVA (16%)', en: 'IVA (16%)' },
      aserta: fmt(suretyQuotes.aserta.iva),
      dorama: fmt(suretyQuotes.dorama.iva),
    },
    {
      label: { es: 'Total con IVA', en: 'Total (incl. tax)' },
      aserta: fmt(Math.round(suretyQuotes.aserta.totalConIva)),
      dorama: fmt(Math.round(suretyQuotes.dorama.totalConIva)),
      bold: true,
    },
    {
      label: { es: 'Tiempo de Emision', en: 'Issuance Timeline' },
      aserta: lang === 'es' ? '~12 dias habiles' : '~12 business days',
      dorama: lang === 'es' ? '~15 dias habiles' : '~15 business days',
    },
    {
      label: { es: 'Comision', en: 'Commission' },
      aserta: '8%',
      dorama: '8%',
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold text-[#121212]">{t('matrix.suretyTitle', lang)}</h2>
      </div>
      <CurrencyNote />

      <div className="lumif-card p-0 overflow-hidden mb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="lumif-table-header text-left w-[200px] px-4">{lang === 'es' ? 'Fianza' : 'Bond'}</th>
              <th className="lumif-table-header text-center w-[120px]">{t('matrix.required', lang)}</th>
              <th className="lumif-table-header text-center relative" style={{ borderTop: '3px solid #E94D35' }}>
                <div className="text-[9px] font-bold text-[#E94D35] mb-0.5">{t('matrix.recommended', lang)}</div>
                <span className="flex items-center justify-center gap-1.5">
                  <CarrierLogoByName name="Afianzadora Aserta" size={18} />
                  Afianzadora Aserta
                </span>
              </th>
              <th className="lumif-table-header text-center">
                <span className="flex items-center justify-center gap-1.5">
                  <CarrierLogoByName name="Fianzas Dorama" size={18} />
                  Fianzas Dorama
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {suretyRows.map((row, ri) => (
              <motion.tr key={ri} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: ri * 0.08 }} className="lumif-table-row">
                <td className="lumif-table-cell text-left font-medium text-[13px] px-4">{row.bond[lang]}</td>
                <td className="lumif-table-cell text-center text-[12px] text-[#6B7280]">{row.required}</td>
                <td className={`matrix-cell matrix-cell-green matrix-recommended`} style={{ borderLeft: '3px solid #E94D35' }}>
                  <div className="text-[13px]">{row.aserta.amount}</div>
                  <div className="text-[10px] text-[#6B7280]">{lang === 'es' ? 'Prima' : 'Premium'}: {row.aserta.premium}</div>
                  <div className="text-[9px] text-[#9CA3AF] mt-0.5 italic">{row.validity[lang]}</div>
                </td>
                <td className={`matrix-cell ${row.dorama.status === 'insuficiente' ? 'matrix-cell-yellow' : 'matrix-cell-green'}`}>
                  <div className="text-[13px]">{row.dorama.amount}</div>
                  <div className="text-[10px] text-[#6B7280]">{lang === 'es' ? 'Prima' : 'Premium'}: {row.dorama.premium}</div>
                  <div className="text-[9px] text-[#9CA3AF] mt-0.5 italic">{row.validity[lang]}</div>
                  {row.dorama.status === 'insuficiente' && (
                    <div className="text-[9px] text-[#f59e0b] font-medium mt-0.5">{lang === 'es' ? 'Monto insuficiente' : 'Insufficient amount'}</div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Additional comparison details */}
      <div className="lumif-card p-0 overflow-hidden mb-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="lumif-table-header text-left px-4">{lang === 'es' ? 'Detalle' : 'Detail'}</th>
              <th className="lumif-table-header text-center" style={{ borderTop: '3px solid #E94D35' }}>
                <span className="flex items-center justify-center gap-1.5">Afianzadora Aserta</span>
              </th>
              <th className="lumif-table-header text-center">
                <span className="flex items-center justify-center gap-1.5">Fianzas Dorama</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {detailRows.map((row, ri) => (
              <motion.tr key={ri} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: (suretyRows.length + ri) * 0.08 }} className="lumif-table-row" style={(row as any).bold ? { borderTop: '2px solid #E5E7EB' } : undefined}>
                <td className={`lumif-table-cell text-left text-[13px] px-4 ${(row as any).bold ? 'font-bold' : 'font-medium'}`}>{row.label[lang]}</td>
                <td className={`matrix-cell matrix-cell-green matrix-recommended text-center text-[13px] ${(row as any).bold ? 'font-bold' : ''}`} style={{ borderLeft: '3px solid #E94D35' }}>{row.aserta}</td>
                <td className={`matrix-cell matrix-cell-green text-center text-[13px] ${(row as any).bold ? 'font-bold' : ''}`}>{row.dorama}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Insight */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card" style={{ borderLeft: '4px solid #E94D35', background: 'rgba(233,77,53,0.03)' }}>
        <div className="flex items-center gap-2 mb-2">
          {Icon.sparkle('#E94D35')}
          <span className="text-[14px] font-semibold text-[#121212]">{lang === 'es' ? 'Afianzadora Aserta' : 'Afianzadora Aserta'}</span>
        </div>
        <p className="text-[13px] text-[#374151]">
          {lang === 'es'
            ? 'Cumple al 100% con los montos requeridos. Linea pre-aprobada para este cliente. Emision estimada ~12 dias habiles vs ~15 dias (Dorama). Fianzas Dorama ofrece monto insuficiente en fianza de buena calidad de obra (Mex$45M vs Mex$50M requeridos).'
            : 'Meets 100% of required amounts. Pre-approved line for this client. Estimated issuance ~12 business days vs ~15 days (Dorama). Fianzas Dorama offers insufficient amount on quality guarantee bond (Mex$45M vs Mex$50M required).'}
        </p>
      </motion.div>
    </div>
  )
}

// ============================================================
//  BEATS 18-19 — NEGOTIATION (not rendered in v2)
// ============================================================
function NegotiationView({ beat }: { beat: number }) {
  const { lang } = useLang()
  const [selectedNeg, setSelectedNeg] = useState<number | null>(null)
  const [sentIds, setSentIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (beat >= 19 && selectedNeg === null) setSelectedNeg(0)
  }, [beat, selectedNeg])

  const handleApprove = (neg: typeof negotiations[0]) => {
    setSentIds(prev => new Set(prev).add(neg.id))
  }

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#121212] mb-2">{t('nego.title', lang)}</h2>
      <p className="text-[13px] text-[#6B7280] mb-4">{t('nego.subtitle', lang)}</p>
      <div className="flex gap-0" style={{ position: 'relative' }}>
        {/* Left: table */}
        <div className={`transition-all ${selectedNeg !== null ? 'flex-[3]' : 'flex-1'}`}>
          <div className="lumif-card p-0 overflow-hidden">
            <table className="w-full">
              <thead><tr style={{ background: '#FAFAFA' }}>{['#', lang === 'es' ? 'Aseguradora' : 'Carrier', lang === 'es' ? 'Asunto' : 'Issue', lang === 'es' ? 'Estado' : 'Status', lang === 'es' ? 'Impacto' : 'Impact'].map(h => <th key={h} className="lumif-table-header text-left px-3 py-2">{h}</th>)}</tr></thead>
              <tbody>
                {negotiations.map((neg, i) => {
                  const isSent = sentIds.has(neg.id)
                  const carrier = [...carriers, ...suretyCarriers].find(c => c.id === neg.carrierId)
                  return (
                    <tr key={neg.id} className={`lumif-table-row cursor-pointer ${selectedNeg === i ? 'bg-[rgba(233,77,53,0.04)]' : ''}`}
                      style={i === 0 && beat >= 18 ? { borderLeft: '3px solid #E94D35' } : undefined}
                      onClick={() => setSelectedNeg(i)}>
                      <td className="lumif-table-cell px-3 text-[12px] text-[#9CA3AF]">{i + 1}</td>
                      <td className="lumif-table-cell px-3 font-medium text-[13px]">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: carrier?.color || '#5f6368' }} />
                          {neg.carrier}
                        </span>
                      </td>
                      <td className="lumif-table-cell px-3 text-[13px]">{neg.issue[lang]}</td>
                      <td className="lumif-table-cell px-3"><span className={`lumif-badge ${isSent ? 'lumif-badge-success' : 'lumif-badge-warning'}`}>{isSent ? t('nego.sent', lang) : (lang === 'es' ? 'Pendiente' : 'Pending')}</span></td>
                      <td className="lumif-table-cell px-3 text-[12px] text-[#6B7280]" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{neg.estimatedImpact[lang]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: side panel */}
        {selectedNeg !== null && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[400px] shrink-0 ml-4 border border-[#E5E7EB] rounded-xl bg-white overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 260px)' }}
          >
            {(() => {
              const neg = negotiations[selectedNeg]
              const isSent = sentIds.has(neg.id)
              return (
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[15px] font-semibold text-[#121212]">{neg.carrier}</span>
                    <button className="text-[#9CA3AF] hover:text-[#121212]" onClick={() => setSelectedNeg(null)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  <div className="text-[12px] text-[#6B7280] mb-3">{neg.issue[lang]}</div>
                  <div className="text-[13px] text-[#374151] leading-relaxed mb-4">{neg.proposal[lang]}</div>
                  <div className="p-3 rounded-lg mb-4 text-[12px] text-[#6B7280]" style={{ background: '#FAFAFA' }}>{neg.estimatedImpact[lang]}</div>
                  {isSent ? (
                    <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(34,197,94,0.08)' }}>
                      {Icon.checkCircle('#16a34a')}
                      <span className="text-[13px] font-medium text-[#16a34a]">{t('nego.sent', lang)}</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button className="lumif-btn-primary text-[13px] flex-1" onClick={() => handleApprove(neg)}>{t('nego.approve', lang)}</button>
                      <button className="lumif-btn-secondary text-[13px]">{t('nego.modify', lang)}</button>
                    </div>
                  )}
                </div>
              )
            })()}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ============================================================
//  BEAT 20 — RECOMMENDATION LETTER
// ============================================================
function RecommendationLetterView() {
  const { lang } = useLang()
  const rec = recommendationLetter
  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#121212] mb-4">{rec.title[lang]}</h2>
      <div className="max-w-[700px] mx-auto">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-10 shadow-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          {/* Header with branding — Alaya only on formal documents */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5E7EB]">
            <div>
              <span className="text-[18px] font-bold text-[#121212]">Alaya</span>
              <span className="text-[13px] text-[#6B7280] ml-2">{lang === 'es' ? 'Agente de Seguros y Fianzas' : 'Insurance & Surety Agent'}</span>
            </div>
            <div className="text-right text-[12px] text-[#6B7280]">
              <div>{lang === 'es' ? 'Fecha' : 'Date'}: {rec.date}</div>
              <div>Ref: LUM-REC-2026-001</div>
            </div>
          </div>
          <div className="mb-4 text-[13px]">
            <div className="text-[#6B7280]">{lang === 'es' ? 'Para' : 'To'}: <span className="font-medium text-[#121212]">{rec.to}</span></div>
            <div className="text-[#6B7280]">{rec.toCompany}</div>
            <div className="text-[#6B7280] mt-1">{lang === 'es' ? 'Ref' : 'Re'}: {lang === 'es' ? 'Colocacion de Seguros y Fianzas — Autopista Guadalajara-Tepic' : 'Insurance & Surety Placement — Guadalajara-Tepic Highway'}</div>
          </div>
          <p className="text-[13px] text-[#374151] leading-relaxed mb-2">{rec.summary[lang]}</p>
          <p className="text-[11px] text-[#9CA3AF] mb-6">{lang === 'es' ? 'Cifras en pesos mexicanos (MXN).' : 'Amounts in Mexican Pesos (MXN).'}</p>

          {/* Insurance insight */}
          <div className="mb-4 p-4 rounded-lg" style={{ background: 'rgba(233,77,53,0.04)', border: '1px solid rgba(233,77,53,0.15)' }}>
            <div className="text-[12px] font-semibold text-[#E94D35] uppercase tracking-wide mb-2">{lang === 'es' ? 'Seguros — Prima Mas Baja' : 'Insurance — Lowest Premium'}</div>
            <div className="text-[15px] font-bold text-[#121212]">{rec.recommendation.insurance.carrier}</div>
            <div className="text-[13px] text-[#6B7280] mt-1">{rec.recommendation.insurance.reason[lang]}</div>
            <div className="text-[16px] font-bold text-[#121212] mt-2">{fmt(rec.recommendation.insurance.premium)} <span className="text-[12px] font-normal text-[#6B7280]">M.N.</span></div>
          </div>

          {/* Surety insight */}
          <div className="mb-6 p-4 rounded-lg" style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)' }}>
            <div className="text-[12px] font-semibold text-[#3B82F6] uppercase tracking-wide mb-2">{lang === 'es' ? 'Fianzas — Cumple 100%' : 'Surety — Meets 100%'}</div>
            <div className="text-[15px] font-bold text-[#121212]">{rec.recommendation.surety.carrier}</div>
            <div className="text-[13px] text-[#6B7280] mt-1">{rec.recommendation.surety.reason[lang]}</div>
            <div className="text-[16px] font-bold text-[#121212] mt-2">{fmt(rec.recommendation.surety.premium)} <span className="text-[12px] font-normal text-[#6B7280]">M.N.</span></div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mb-6">
            <span className="text-[13px] text-[#6B7280]">{lang === 'es' ? 'Prima Total del Paquete' : 'Total Package Premium'}</span>
            <span className="text-[20px] font-bold text-[#121212]">{fmt(rec.totalPremium)}</span>
          </div>

          {/* Signature */}
          <div className="text-[13px] text-[#374151]">
            <div className="mb-4">{lang === 'es' ? 'Quedamos a sus ordenes para cualquier duda o aclaracion.' : 'We remain at your disposal for any questions.'}</div>
            <div className="font-medium">{rec.from}</div>
            <div className="text-[#6B7280]">{rec.fromCompany}</div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="lumif-btn-primary">{Icon.send('white')} {lang === 'es' ? 'Enviar a Cliente' : 'Send to Client'}</button>
        </div>
      </div>
    </div>
  )
}

// ============================================================
//  BEATS 21-22 — CLIENT PORTAL
// ============================================================
function ClientPortalView({ confirmed }: { confirmed: boolean }) {
  const { lang } = useLang()
  const rec = recommendationLetter

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ minHeight: 400 }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
          <div className="w-20 h-20 bg-[#16a34a] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 className="text-[22px] font-semibold text-[#121212] text-center mb-2">{lang === 'es' ? 'Carta de Instruccion Recibida' : 'Letter of Instruction Received'}</h2>
          <p className="text-[14px] text-[#6B7280] text-center mb-2">{lang === 'es' ? 'Aprobacion digital registrada' : 'Digital approval recorded'}</p>
          <div className="flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-lg mx-auto" style={{ background: 'rgba(34,197,94,0.08)', maxWidth: 420 }}>
            {Icon.checkCircle('#16a34a')}
            <span className="text-[13px] text-[#16a34a] font-medium">
              {lang === 'es'
                ? 'Deducible negociado a Mex$200K. Cliente aprobo.'
                : 'Deductible negotiated to Mex$200K. Client approved.'}
            </span>
          </div>
          <div className="text-center text-[13px] text-[#374151]">
            <div className="font-medium">Ing. Carlos Martinez Hernandez</div>
            <div className="text-[#6B7280]">09/04/2026 11:47 AM</div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <h2 className="text-[20px] font-semibold text-[#121212] mb-4">{lang === 'es' ? 'Resumen Comparativo — Seguros y Fianzas' : 'Comparison Summary — Insurance & Surety'}</h2>
      <p className="text-[13px] text-[#6B7280] mb-6">{lang === 'es' ? 'Su agente de seguros, Alaya Seguros, ha preparado el siguiente resumen comparativo para su proyecto.' : 'Your insurance agent, Alaya Seguros, has prepared the following comparison summary for your project.'}</p>

      <div className="lumif-card mb-4">
        <div className="text-[14px] font-semibold text-[#121212] mb-2">{lang === 'es' ? 'Seguros — Mapfre Mexico' : 'Insurance — Mapfre Mexico'}</div>
        <p className="text-[13px] text-[#374151] mb-2">{rec.recommendation.insurance.reason[lang]}</p>
        <div className="text-[18px] font-bold">{fmt(rec.recommendation.insurance.premium)}</div>
      </div>

      <div className="lumif-card mb-4">
        <div className="text-[14px] font-semibold text-[#121212] mb-2">{lang === 'es' ? 'Fianzas — Afianzadora Aserta' : 'Surety — Afianzadora Aserta'}</div>
        <p className="text-[13px] text-[#374151] mb-2">{rec.recommendation.surety.reason[lang]}</p>
        <div className="text-[18px] font-bold">{fmt(rec.recommendation.surety.premium)}</div>
      </div>

      <div className="lumif-card mb-6" style={{ background: 'rgba(30,64,175,0.04)' }}>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#121212]">{lang === 'es' ? 'Total del Paquete' : 'Total Package'}</span>
          <span className="text-[22px] font-bold text-[#121212]">{fmt(rec.totalPremium)}</span>
        </div>
      </div>

      {/* Carlos's comment */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="mb-6 flex gap-3 items-start">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-medium shrink-0" style={{ background: '#e91e63' }}>C</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] font-semibold text-[#121212]">Ing. Carlos Martinez Hernandez</span>
            <span className="text-[11px] text-[#9CA3AF]">09/04/2026 10:23 AM</span>
          </div>
          <div className="p-3 rounded-xl text-[13px] text-[#374151] leading-relaxed" style={{ background: '#F3F4F6', borderTopLeftRadius: 4 }}>
            {lang === 'es'
              ? 'Pueden negociar el deducible de Mapfre a Mex$200K? Por lo demas, procedamos con Mapfre y Aserta.'
              : 'Can you get the Mapfre deductible down to Mex$200K? Otherwise let\'s proceed with Mapfre and Aserta.'}
          </div>
        </div>
      </motion.div>

      <div className="flex gap-3">
        <button className="px-6 py-3 rounded-xl text-[14px] font-medium text-white" style={{ background: '#16a34a' }}>{lang === 'es' ? 'Aprobar y Proceder' : 'Approve & Proceed'}</button>
        <button className="px-6 py-3 rounded-xl text-[14px] font-medium border-2" style={{ color: '#ea580c', borderColor: '#ea580c', background: 'transparent' }}>{lang === 'es' ? 'Solicitar Cambios' : 'Request Changes'}</button>
        <button className="px-6 py-3 rounded-xl text-[14px] font-medium text-[#6B7280] border border-[#E5E7EB]">{lang === 'es' ? 'Agregar Comentario' : 'Add Comment'}</button>
      </div>
    </div>
  )
}

// ============================================================
//  BEAT 23 — BINDING
// ============================================================
function BindingView() {
  const { lang } = useLang()
  const totalInsurance = quotes.mapfre.primaTotal
  const totalSurety = suretyQuotes.aserta.totalConIva
  const totalPrima = totalInsurance + Math.round(totalSurety)
  const insuranceCommission = Math.round(totalInsurance * 0.12)
  const suretyCommission = Math.round(totalSurety * 0.08)
  const commission = insuranceCommission + suretyCommission

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#121212] mb-4">{t('bind.title', lang)}</h2>
      <CurrencyNote />
      <div className="grid grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card lumif-card-accent">
          <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.shield('#E94D35')} {t('bind.selectedInsurance', lang)}</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: '#d32f2f' }}>M</div>
            <div><div className="text-[14px] font-semibold">Mapfre Mexico</div><div className="text-[11px] text-[#9CA3AF]">{lang === 'es' ? 'Poliza' : 'Policy'}: {caratulaData.numPoliza}</div></div>
          </div>
          <table className="w-full text-[12px]"><tbody>
            {caratulaData.coberturas.map(c => <tr key={c.nombre.es}><td className="py-1 text-[#6B7280]">{c.nombre[lang]}</td><td className="py-1 text-right font-medium">{bi(c.lmr, lang)}</td></tr>)}
          </tbody></table>
          <div className="border-t border-[#E5E7EB] mt-3 pt-3 flex items-center justify-between">
            <span className="text-[12px] text-[#6B7280]">{t('bind.totalPremium', lang)}</span>
            <span className="text-[18px] font-bold text-[#121212]">{fmt(totalInsurance)}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lumif-card lumif-card-blue">
          <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.shield('#3B82F6')} {t('bind.selectedSurety', lang)}</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: '#2E7D32' }}>A</div>
            <div><div className="text-[14px] font-semibold">Afianzadora Aserta</div></div>
          </div>
          <table className="w-full text-[12px]"><tbody>
            <tr><td className="py-1 text-[#6B7280]">{lang === 'es' ? 'Cumplimiento' : 'Performance'}</td><td className="py-1 text-right font-medium">{fmt(suretyQuotes.aserta.fianzaCumplimiento.montoAfianzado)}</td></tr>
            <tr><td className="py-1 text-[#6B7280]">{lang === 'es' ? 'Buena Calidad' : 'Quality Guarantee'}</td><td className="py-1 text-right font-medium">{fmt(suretyQuotes.aserta.fianzaBuenaCalidad.montoAfianzado)}</td></tr>
            <tr><td className="py-1 text-[#6B7280]">{lang === 'es' ? 'Anticipo' : 'Advance Payment'}</td><td className="py-1 text-right font-medium">{fmt(suretyQuotes.aserta.fianzaAnticipo.montoAfianzado)}</td></tr>
          </tbody></table>
          <div className="border-t border-[#E5E7EB] mt-3 pt-3 flex items-center justify-between">
            <span className="text-[12px] text-[#6B7280]">{t('bind.totalPremiumIva', lang)}</span>
            <span className="text-[18px] font-bold text-[#121212]">{fmt(Math.round(totalSurety))}</span>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lumif-card mb-6" style={{ background: 'linear-gradient(135deg, rgba(233,77,53,0.05), rgba(59,130,246,0.05))' }}>
        <div className="flex items-center justify-between">
          <div><div className="text-[12px] text-[#6B7280] uppercase tracking-wide">{t('bind.totalPackage', lang)}</div><div className="text-[28px] font-bold text-[#121212]">{fmt(totalPrima)} <span className="text-[14px] font-normal text-[#6B7280]">M.N.</span></div></div>
          <div className="text-right"><div className="text-[12px] text-[#6B7280] uppercase tracking-wide">{t('bind.commission', lang)}</div><div className="text-[24px] font-bold text-[#E94D35]">{fmt(commission)} <span className="text-[14px] font-normal text-[#6B7280]">M.N.</span></div></div>
        </div>
      </motion.div>

      {/* Stepper */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-[16px] font-semibold text-[#121212] mb-3">{t('bind.processTitle', lang)}</h3>
        <div className="lumif-card mb-6">
          <div className="flex items-center justify-between">
            {[
              { label: t('bind.step.provisional', lang), status: 'done' },
              { label: t('bind.step.conditions', lang), status: 'done' },
              { label: t('bind.step.certificate', lang), status: 'current' },
              { label: lang === 'es' ? 'Poliza formal — pendiente de emision (est. 5-7 dias)' : 'Formal policy — pending issuance (est. 5-7 days)', status: 'pending' },
            ].map((step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step.status === 'done' ? 'bg-[#16a34a]' : step.status === 'current' ? 'bg-[#E94D35]' : 'bg-[#E5E7EB]'}`}>
                  {step.status === 'done' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> : step.status === 'current' ? <div className="w-3 h-3 rounded-full bg-white" /> : <span className="text-[12px] text-[#9CA3AF] font-medium">{i + 1}</span>}
                </div>
                <span className="text-[11px] text-[#374151] font-medium">{step.label}</span>
                <span className={`text-[10px] mt-0.5 ${step.status === 'done' ? 'text-[#16a34a]' : step.status === 'current' ? 'text-[#E94D35]' : 'text-[#9CA3AF]'}`}>{step.status === 'done' ? t('bind.completed', lang) : step.status === 'current' ? (lang === 'es' ? 'En proceso' : 'In progress') : t('bind.pending', lang)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Removed timeline comparison — not defensible in a demo */}
      </motion.div>
    </div>
  )
}

// ============================================================
//  BEAT 24 — CLIENT FILE
// ============================================================
function ClientFile() {
  const { lang } = useLang()
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#e91e63] flex items-center justify-center text-white text-[22px] font-bold">CP</div>
          <div>
            <h2 className="text-[20px] font-semibold text-[#121212]">Constructora del Pacifico S.A. de C.V.</h2>
            <div className="flex items-center gap-2">
              <span className="lumif-badge lumif-badge-success">{t('file.activeClient', lang)}</span>
              <span className="text-[12px] text-[#6B7280]">RFC: {clientProfile.rfc}</span>
              <span className="text-[12px] text-[#6B7280]">&middot; {clientProfile.yearsInOperation} {t('file.years', lang)}</span>
            </div>
          </div>
        </div>
      </div>
      <CurrencyNote />

      {/* Project summary bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: lang === 'es' ? 'Valor del Contrato' : 'Contract Value', value: 'Mex$500M' },
          { label: lang === 'es' ? 'Prima Total' : 'Total Premium', value: fmt(3367680) },
          { label: lang === 'es' ? 'Comision' : 'Commission', value: fmt(303294), color: '#E94D35' },
          { label: lang === 'es' ? 'Proxima Renovacion' : 'Next Renewal', value: '15/04/2027', color: '#ea580c' },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="lumif-card p-4">
            <div className="text-[11px] text-[#9CA3AF] uppercase tracking-wide mb-1">{m.label}</div>
            <div className="text-[20px] font-bold" style={{ color: m.color || '#121212' }}>{m.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lumif-card">
          <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.shield('#E94D35')} {t('file.activePolicies', lang)}</h3>
          <table className="w-full text-[12px]"><thead><tr>{[t('file.policy', lang), t('file.branch', lang), t('file.carrier', lang), t('file.validity', lang)].map(h => <th key={h} className="lumif-table-header text-left">{h}</th>)}</tr></thead>
            <tbody>
              <tr className="lumif-table-row"><td className="lumif-table-cell font-medium">MAP-TR-2026-047823</td><td className="lumif-table-cell">{lang === 'es' ? 'Todo Riesgo + RC + Equipo' : 'All Risk + Liability + Equipment'}</td><td className="lumif-table-cell">Mapfre Mexico</td><td className="lumif-table-cell">15/04/2026 — 15/04/2028</td></tr>
              <tr className="lumif-table-row"><td className="lumif-table-cell font-medium">MAP-EQ-2025-11234</td><td className="lumif-table-cell">{lang === 'es' ? 'Equipo (flotante)' : 'Equipment (floater)'}</td><td className="lumif-table-cell">Mapfre</td><td className="lumif-table-cell">01/01/2026 — 01/01/2027</td></tr>
            </tbody></table>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lumif-card">
          <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.shield('#3B82F6')} {t('file.activeBonds', lang)}</h3>
          <table className="w-full text-[12px]"><thead><tr>{[t('file.bond', lang), t('file.bondType', lang), t('file.bondCarrier', lang), t('file.bondAmount', lang)].map(h => <th key={h} className="lumif-table-header text-left">{h}</th>)}</tr></thead>
            <tbody>
              <tr className="lumif-table-row"><td className="lumif-table-cell font-medium">ASR-FC-2026-08471</td><td className="lumif-table-cell">{lang === 'es' ? 'Cumplimiento' : 'Performance'}</td><td className="lumif-table-cell">Aserta</td><td className="lumif-table-cell">{fmt(50000000)}</td></tr>
              <tr className="lumif-table-row"><td className="lumif-table-cell font-medium">ASR-BC-2026-08472</td><td className="lumif-table-cell">{lang === 'es' ? 'Buena Calidad' : 'Quality Guarantee'}</td><td className="lumif-table-cell">Aserta</td><td className="lumif-table-cell">{fmt(50000000)}</td></tr>
              <tr className="lumif-table-row"><td className="lumif-table-cell font-medium">ASR-FA-2026-08473</td><td className="lumif-table-cell">{lang === 'es' ? 'Anticipo' : 'Advance Payment'}</td><td className="lumif-table-cell">Aserta</td><td className="lumif-table-cell">{fmt(75000000)}</td></tr>
            </tbody></table>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lumif-card">
          <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.truck('#6B7280')} {t('file.equipment', lang)}</h3>
          <table className="w-full text-[12px]"><thead><tr>{[t('equip.equipment', lang), 'GPS', t('equip.location', lang), t('file.policy', lang)].map(h => <th key={h} className="lumif-table-header text-left">{h}</th>)}</tr></thead>
            <tbody>{equipment.map(eq => (
              <tr key={eq.id} className="lumif-table-row">
                <td className="lumif-table-cell font-medium">{eq.name}</td>
                <td className="lumif-table-cell"><span className="flex items-center gap-1">{Icon.gps(eq.gpsStatus === 'Activo' ? '#16a34a' : '#9CA3AF')}<span>{lang === 'en' ? (eq.gpsStatus === 'Activo' ? 'Active' : 'Inactive') : eq.gpsStatus}</span></span></td>
                <td className="lumif-table-cell">{eq.location}</td>
                <td className="lumif-table-cell">{eq.currentPolicy > 0 ? fmt(eq.currentPolicy) : <span className="text-[#dc2626]">{t('file.noPolicy', lang)}</span>}</td>
              </tr>
            ))}</tbody></table>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lumif-card">
          <h3 className="text-[14px] font-semibold text-[#121212] mb-3 flex items-center gap-2">{Icon.clock('#6B7280')} {t('file.communications', lang)}</h3>
          <div className="space-y-3">
            {[
              { time: '09/04 10:15', action: { es: 'Contrato recibido y analizado', en: 'Contract received and analyzed' }, type: 'entrada' },
              { time: '09/04 10:18', action: { es: 'Solicitudes enviadas a 6 aseguradoras/afianzadoras', en: 'Requests sent to 6 carriers/sureties' }, type: 'salida' },
              { time: '09/04 12:15', action: { es: 'Cotizacion recibida de Mapfre (Mex$847,000)', en: 'Quote received from Mapfre (Mex$847,000)' }, type: 'entrada' },
              { time: '10/04 10:15', action: { es: 'Cotizacion recibida de Chubb (Mex$1,105,000)', en: 'Quote received from Chubb (Mex$1,105,000)' }, type: 'entrada' },
              { time: '10/04 10:30', action: { es: 'Exclusion de vibracion detectada en Zurich', en: 'Vibration exclusion detected in Zurich' }, type: 'alerta' },
              { time: '10/04 11:00', action: { es: 'Contra-propuesta enviada a Zurich', en: 'Counter-proposal sent to Zurich' }, type: 'salida' },
              { time: '11/04 10:15', action: { es: 'Colocacion aprobada por cliente', en: 'Placement approved by client' }, type: 'hito' },
              { time: '12/04 10:15', action: { es: 'Poliza vinculada con Mapfre + Aserta', en: 'Policy bound with Mapfre + Aserta' }, type: 'hito' },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px]">
                <span className="text-[#9CA3AF] whitespace-nowrap w-20 flex-shrink-0">{log.time}</span>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${log.type === 'entrada' ? 'bg-[#3B82F6]' : log.type === 'salida' ? 'bg-[#16a34a]' : log.type === 'alerta' ? 'bg-[#dc2626]' : 'bg-[#E94D35]'}`} />
                <span className="text-[#374151]">{log.action[lang]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
