import { createContext, useContext } from 'react'

export type Lang = 'es' | 'en'

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'es', setLang: () => {} })
export const useLang = () => useContext(LangContext)

export const translations: Record<string, Record<Lang, string>> = {
  // Headers & Navigation
  'analysis.title': { es: 'Analisis de Contrato', en: 'Contract Analysis' },
  'gaps.title': { es: 'Analisis de Brechas de Cobertura', en: 'Coverage Gap Analysis' },
  'gaps.met': { es: 'Cumplidos', en: 'Met' },
  'gaps.gaps': { es: 'Brechas', en: 'Gaps' },
  'gaps.urgency': { es: 'Urgencia: Inicio en 5 dias', en: 'Urgency: Start in 5 days' },
  'gaps.required': { es: 'Requerido', en: 'Required' },
  'gaps.actual': { es: 'Actual', en: 'Current' },
  'gaps.gap': { es: 'Brecha', en: 'Gap' },
  'gaps.clause': { es: 'Clausula', en: 'Clause' },
  'gaps.status': { es: 'Estado', en: 'Status' },
  'gaps.coverage': { es: 'Cobertura', en: 'Coverage' },
  'gaps.meets': { es: 'Cumple', en: 'Meets' },
  'gaps.insufficient': { es: 'Insuficiente', en: 'Insufficient' },
  'gaps.noCoverage': { es: 'Sin Cobertura', en: 'No Coverage' },

  // Insurance requirements
  'req.insurance': { es: 'Requisitos de Seguro', en: 'Insurance Requirements' },
  'req.surety': { es: 'Requisitos de Fianzas', en: 'Surety Bond Requirements' },
  'req.detected': { es: 'detectados', en: 'detected' },
  'req.limit': { es: 'Limite', en: 'Limit' },
  'req.deductible': { es: 'Deducible', en: 'Deductible' },
  'req.deepClause': { es: 'Detectado en clausula profunda — revision manual podria omitir este requisito', en: 'Detected in deep clause — manual review could miss this requirement' },
  'req.criticalFinding': { es: 'IA — Hallazgo Critico', en: 'AI — Critical Finding' },
  'analyzing': { es: 'Analizando contrato...', en: 'Analyzing contract...' },
  'analyzing.sub': { es: 'Extrayendo requisitos de seguro y fianza', en: 'Extracting insurance and surety requirements' },

  // Risk Profile
  'risk.title': { es: 'Perfil de Riesgo del Cliente', en: 'Client Risk Profile' },
  'risk.clientInfo': { es: 'Informacion de la Empresa', en: 'Company Information' },
  'risk.lossHistory': { es: 'Historial de Siniestralidad', en: 'Loss History' },
  'risk.lossHistory3yr': { es: 'Historial de Siniestralidad (3 años)', en: 'Loss History (3 years)' },
  'risk.projects': { es: 'Proyectos Similares Completados', en: 'Completed Similar Projects' },
  'risk.safety': { es: 'Programa de Seguridad', en: 'Safety Program' },
  'risk.package': { es: 'Paquete de Solicitud', en: 'Submission Package' },
  'risk.years': { es: 'Años en Operacion', en: 'Years in Operation' },
  'risk.specialty': { es: 'Especialidad', en: 'Specialty' },
  'risk.revenue': { es: 'Facturacion Anual', en: 'Annual Revenue' },
  'risk.lastIncident': { es: 'Ultimo Incidente', en: 'Last Incident' },
  'risk.year': { es: 'Año', en: 'Year' },
  'risk.claims': { es: 'Reclamaciones', en: 'Claims' },
  'risk.amount': { es: 'Monto Total', en: 'Total Amount' },
  'risk.status': { es: 'Estado', en: 'Status' },
  'risk.project': { es: 'Proyecto', en: 'Project' },
  'risk.value': { es: 'Valor', en: 'Value' },
  'risk.certifications': { es: 'Certificaciones', en: 'Certifications' },
  'risk.razonSocial': { es: 'Razon Social', en: 'Company Name' },

  // Risk profile checklist items
  'check.contract': { es: 'Contrato maestro analizado', en: 'Master contract analyzed' },
  'check.insuranceReqs': { es: 'Requisitos de seguro extraidos', en: 'Insurance requirements extracted' },
  'check.suretyReqs': { es: 'Requisitos de fianza extraidos', en: 'Surety bond requirements extracted' },
  'check.riskProfile': { es: 'Perfil de riesgo compilado', en: 'Risk profile compiled' },
  'check.lossHistory': { es: 'Historial de siniestralidad verificado', en: 'Loss history verified' },
  'check.equipment': { es: 'Inventario de equipo cruzado', en: 'Equipment inventory cross-referenced' },
  'check.fiscal': { es: 'Documentacion fiscal del cliente', en: 'Client tax documentation' },

  // Carrier Selection
  'carriers.title': { es: 'Seleccion de Aseguradoras y Afianzadoras', en: 'Insurance & Surety Carrier Selection' },
  'carriers.insurance': { es: 'Aseguradoras — Seguros', en: 'Insurance Carriers' },
  'carriers.surety': { es: 'Afianzadoras — Fianzas', en: 'Surety Companies' },
  'carriers.match': { es: 'Match', en: 'Match' },
  'carriers.viaPortal': { es: 'Enviado via Portal', en: 'Sent via Portal' },
  'carriers.viaEmail': { es: 'Enviado via Email', en: 'Sent via Email' },
  'carriers.sendPortal': { es: 'Envio via Portal', en: 'Submit via Portal' },
  'carriers.sendEmail': { es: 'Envio via Email', en: 'Submit via Email' },

  // Submissions
  'submissions.title': { es: 'Dashboard de Envios', en: 'Submissions Dashboard' },
  'submissions.sent': { es: 'Enviado', en: 'Sent' },
  'submissions.docs': { es: 'Docs: Contrato, Perfil de riesgo, Solicitud', en: 'Docs: Contract, Risk profile, Application' },
  'submissions.preview': { es: 'Vista Previa — Email a Chubb Mexico', en: 'Preview — Email to Chubb Mexico' },
  'submissions.to': { es: 'Para', en: 'To' },
  'submissions.subject': { es: 'Asunto', en: 'Subject' },

  // Gmail Sent
  'sent.title': { es: 'Enviados', en: 'Sent' },
  'sent.generated': { es: 'solicitudes generadas por Lumif.ai', en: 'requests generated by Lumif.ai' },
  'sent.sent': { es: 'enviados', en: 'sent' },
  'sent.sending': { es: 'enviando', en: 'sending' },
  'sent.drafting': { es: 'redactando', en: 'drafting' },
  'sent.statusSent': { es: 'Enviado', en: 'Sent' },
  'sent.statusSending': { es: 'Enviando...', en: 'Sending...' },
  'sent.statusDrafting': { es: 'Redactando...', en: 'Drafting...' },
  'sent.autoGenerated': { es: 'Auto-generado', en: 'Auto-generated' },

  // Quote Timeline
  'quotes.title': { es: 'Seguimiento de Cotizaciones', en: 'Quote Tracking' },
  'quotes.insuranceQuotes': { es: 'Cotizaciones de Seguros', en: 'Insurance Quotes' },
  'quotes.suretyQuotes': { es: 'Cotizaciones de Fianzas', en: 'Surety Bond Quotes' },
  'quotes.received': { es: 'Recibida', en: 'Received' },
  'quotes.reminder': { es: 'Recordatorio enviado', en: 'Reminder sent' },
  'quotes.allReceived': { es: 'Todas las cotizaciones recibidas', en: 'All quotes received' },
  'quotes.allReceivedSub': { es: '6 cotizaciones de 4 aseguradoras y 2 afianzadoras', en: '6 quotes from 4 insurance carriers and 2 surety carriers' },
  'quotes.totalTime': { es: 'Tiempo total', en: 'Total time' },
  'quotes.typicalDays': { es: 'Tipico habiles', en: 'Typical business days' },

  // Comparison Matrix
  'matrix.title': { es: 'Matriz Comparativa de Seguros', en: 'Insurance Comparison Matrix' },
  'matrix.suretyTitle': { es: 'Comparativo de Fianzas', en: 'Surety Bond Comparison' },
  'matrix.bestOption': { es: 'Mejor Opcion', en: 'Best Option' },
  'matrix.recommended': { es: 'Recomendada', en: 'Recommended' },
  'matrix.coverage': { es: 'Cobertura', en: 'Coverage' },
  'matrix.required': { es: 'Requerido', en: 'Required' },
  'matrix.bond': { es: 'Fianza', en: 'Bond' },
  'matrix.totalPremium': { es: 'Prima Total (c/IVA)', en: 'Total Premium (w/tax)' },
  'matrix.alertTitle': { es: 'ALERTA: Exclusion Critica Detectada', en: 'ALERT: Critical Exclusion Detected' },
  'matrix.alertBody': {
    es: 'Exclusion expresa de daños por vibracion detectada en cotizacion de Zurich. Clausula 9.1 del contrato requiere esta cobertura explicitamente. Una obra carretera de 167 km involucra inevitablemente trabajos de terraceria con maquinaria pesada que genera vibracion significativa. Esta exclusion representa un riesgo critico de incumplimiento contractual.',
    en: 'Express exclusion of vibration damage detected in Zurich quote. Contract clause 9.1 explicitly requires this coverage. A 167 km highway project inevitably involves earthwork with heavy machinery generating significant vibration. This exclusion represents a critical risk of contractual non-compliance.'
  },
  'matrix.alertAuto': {
    es: 'Detectado automaticamente por Lumif.ai — revision manual podria no identificar esta exclusion',
    en: 'Automatically detected by Lumif.ai — manual review might not identify this exclusion'
  },
  'matrix.shortfall': { es: 'Faltante', en: 'Shortfall' },

  // Negotiation
  'nego.title': { es: 'Propuestas de Negociacion', en: 'Negotiation Proposals' },
  'nego.subtitle': {
    es: 'Lumif.ai ha generado contra-propuestas basadas en el analisis del contrato y las cotizaciones recibidas.',
    en: 'Lumif.ai has generated counter-proposals based on contract analysis and received quotes.'
  },
  'nego.approve': { es: 'Aprobar y Enviar', en: 'Approve & Send' },
  'nego.modify': { es: 'Modificar', en: 'Modify' },
  'nego.sent': { es: 'Enviada', en: 'Sent' },
  'nego.emailTitle': { es: 'Email Enviado — Contra-propuesta a Zurich', en: 'Email Sent — Counter-proposal to Zurich' },

  // Binding
  'bind.title': { es: 'Confirmacion de Vinculacion', en: 'Binding Confirmation' },
  'bind.selectedInsurance': { es: 'Seguros Seleccionados', en: 'Selected Insurance' },
  'bind.selectedSurety': { es: 'Fianzas Seleccionadas', en: 'Selected Surety Bonds' },
  'bind.totalPremium': { es: 'Prima Total', en: 'Total Premium' },
  'bind.totalPremiumIva': { es: 'Prima Total (c/IVA)', en: 'Total Premium (w/tax)' },
  'bind.totalPackage': { es: 'Paquete Total — Seguros + Fianzas', en: 'Total Package — Insurance + Surety Bonds' },
  'bind.commission': { es: 'Comision Estimada (12% seguros / 8% fianzas)', en: 'Estimated Commission (12% insurance / 8% surety)' },
  'bind.processTitle': { es: 'Proceso de Emision', en: 'Issuance Process' },
  'bind.step.provisional': { es: 'Carta Provisional', en: 'Provisional Cover Note' },
  'bind.step.conditions': { es: 'Condiciones Particulares', en: 'Particular Conditions' },
  'bind.step.certificate': { es: 'Certificado de Seguro', en: 'Insurance Certificate' },
  'bind.step.formal': { es: 'Poliza Formal', en: 'Formal Policy' },
  'bind.completed': { es: 'Completado', en: 'Completed' },
  'bind.pending': { es: 'Pendiente', en: 'Pending' },
  'bind.timeTitle': { es: 'Tiempo de Proceso', en: 'Process Time' },
  'bind.withLumif': { es: 'Con Lumif.ai', en: 'With Lumif.ai' },
  'bind.traditional': { es: 'Proceso Tradicional', en: 'Traditional Process' },
  'bind.days3': { es: '~3 dias', en: '~3 days' },
  'bind.days15': { es: '10-15+ dias habiles', en: '10-15+ business days' },

  // Client File
  'file.activeClient': { es: 'Cliente Activo', en: 'Active Client' },
  'file.years': { es: 'años', en: 'years' },
  'file.activePolicies': { es: 'Polizas Vigentes', en: 'Active Policies' },
  'file.activeBonds': { es: 'Fianzas Vigentes', en: 'Active Bonds' },
  'file.equipment': { es: 'Inventario de Equipo', en: 'Equipment Inventory' },
  'file.communications': { es: 'Bitacora de Comunicaciones', en: 'Communication Log' },
  'file.policy': { es: 'Poliza', en: 'Policy' },
  'file.branch': { es: 'Ramo', en: 'Branch' },
  'file.carrier': { es: 'Aseguradora', en: 'Carrier' },
  'file.validity': { es: 'Vigencia', en: 'Validity' },
  'file.bond': { es: 'Fianza', en: 'Bond' },
  'file.bondType': { es: 'Tipo', en: 'Type' },
  'file.bondCarrier': { es: 'Afianzadora', en: 'Surety Carrier' },
  'file.bondAmount': { es: 'Monto', en: 'Amount' },
  'file.noPolicy': { es: 'Sin poliza', en: 'No policy' },

  // Equipment cross-reference
  'equip.title': { es: 'Cruce con Inventario de Equipo', en: 'Equipment Inventory Cross-Reference' },
  'equip.equipment': { es: 'Equipo', en: 'Equipment' },
  'equip.location': { es: 'Ubicacion', en: 'Location' },
  'equip.currentPolicy': { es: 'Poliza Actual', en: 'Current Policy' },
  'equip.carrier': { es: 'Aseguradora', en: 'Carrier' },
  'equip.gap': { es: 'Brecha', en: 'Gap' },
  'equip.noPolicy': { es: 'Sin poliza', en: 'No policy' },

  // Gmail
  'gmail.inbox': { es: 'Bandeja', en: 'Inbox' },
  'gmail.starred': { es: 'Destacados', en: 'Starred' },
  'gmail.snoozed': { es: 'Pospuestos', en: 'Snoozed' },
  'gmail.sent': { es: 'Enviados', en: 'Sent' },
  'gmail.drafts': { es: 'Borradores', en: 'Drafts' },
  'gmail.more': { es: 'Mas', en: 'More' },
  'gmail.compose': { es: 'Redactar', en: 'Compose' },
  'gmail.labels': { es: 'Etiquetas', en: 'Labels' },
  'gmail.clients': { es: 'Clientes', en: 'Clients' },
  'gmail.carriers': { es: 'Aseguradoras', en: 'Carriers' },
  'gmail.bonds': { es: 'Fianzas', en: 'Bonds' },
  'gmail.analyzeWith': { es: 'Analizar con Lumif.ai', en: 'Analyze with Lumif.ai' },
  'gmail.searchMail': { es: 'Buscar en el correo', en: 'Search mail' },
  'gmail.primary': { es: 'Principal', en: 'Primary' },
  'gmail.promotions': { es: 'Promociones', en: 'Promotions' },
  'gmail.social': { es: 'Social', en: 'Social' },
  'gmail.of': { es: 'de', en: 'of' },

  // Lumif header
  'lumif.project': { es: 'Proyecto:', en: 'Project:' },
  'lumif.activeProject': { es: 'Proyecto Activo', en: 'Active Project' },

  // Lumif sidebar
  'sidebar.contrato': { es: 'Analisis de Contrato', en: 'Contract Analysis' },
  'sidebar.brechas': { es: 'Brechas de Cobertura', en: 'Coverage Gaps' },
  'sidebar.cliente': { es: 'Perfil del Cliente', en: 'Client Profile' },
  'sidebar.aseguradoras': { es: 'Seleccion de Aseguradoras', en: 'Carrier Selection' },
  'sidebar.envios': { es: 'Envios y Solicitudes', en: 'Submissions & Requests' },
  'sidebar.cotizaciones': { es: 'Seguimiento de Cotizaciones', en: 'Quote Tracking' },
  'sidebar.comparativo': { es: 'Matriz Comparativa', en: 'Comparison Matrix' },
  'sidebar.negociacion': { es: 'Negociacion', en: 'Negotiation' },
  'sidebar.vinculacion': { es: 'Vinculacion', en: 'Binding' },
  'sidebar.expediente': { es: 'Expediente del Cliente', en: 'Client File' },

  // Lumif tab
  'tab.lumif': { es: 'Lumif.ai — Analisis de Contratos', en: 'Lumif.ai — Contract Analysis' },

  // Portal
  'portal.newQuote': { es: 'Nueva Cotizacion — Todo Riesgo Construccion', en: 'New Quote — All Risk Construction' },
  'portal.formSubtitle': { es: 'Formulario de solicitud de cotizacion', en: 'Quote request form' },
  'portal.autoFilling': { es: 'Lumif.ai esta llenando el formulario automaticamente...', en: 'Lumif.ai is auto-filling the form...' },
  'portal.fields': { es: 'campos', en: 'fields' },
  'portal.submit': { es: 'Enviar Solicitud', en: 'Submit Request' },
  'portal.saveDraft': { es: 'Guardar Borrador', en: 'Save Draft' },
  'portal.success': { es: 'Solicitud Enviada', en: 'Request Submitted' },
  'portal.successSub': { es: 'Su solicitud de cotizacion ha sido recibida exitosamente', en: 'Your quote request has been received successfully' },
  'portal.refNumber': { es: 'Numero de Referencia', en: 'Reference Number' },
  'portal.responseTime': { es: 'Tiempo estimado de respuesta: 5-7 dias', en: 'Estimated response time: 5-7 days' },
  'portal.home': { es: 'Inicio', en: 'Home' },
  'portal.quotes': { es: 'Cotizaciones', en: 'Quotes' },
  'portal.policies': { es: 'Polizas', en: 'Policies' },
  'portal.claims': { es: 'Siniestros', en: 'Claims' },
  'portal.collections': { es: 'Cobranza', en: 'Collections' },
  'portal.reports': { es: 'Reportes', en: 'Reports' },

  // Contract document note
  'contract.originalNote': { es: '', en: '(Original document in Spanish)' },
  'contract.pageOf': { es: 'Pagina', en: 'Page' },

  // Misc
  'closed': { es: 'Cerrado', en: 'Closed' },
  'page': { es: 'Pagina', en: 'Page' },
  'of': { es: 'de', en: 'of' },
  'to': { es: 'Para', en: 'To' },
  'time.ago': { es: 'hace', en: 'ago' },
  'time.minutes': { es: 'minutos', en: 'minutes' },
  'seguro': { es: 'Seguro', en: 'Insurance' },
  'fianza': { es: 'Fianza', en: 'Surety Bond' },
}

// Helper function
export function t(key: string, lang: Lang): string {
  return translations[key]?.[lang] ?? key
}
