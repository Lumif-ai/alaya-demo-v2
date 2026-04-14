// ============================================================================
// GRUPO TRACSA / ALAYA — Insurance Broker Demo Fixtures
// All data for the Mexican insurance broker contract analysis demo
// Bilingual: ES/EN
// ============================================================================

export type BiStr = { es: string; en: string }

/** Resolve a bilingual or plain string to the selected language */
export function bi(v: string | BiStr, lang: 'es' | 'en'): string {
  if (typeof v === 'string') return v
  return v[lang]
}

// ---- INBOX EMAILS (Gmail style) ----
export interface Email {
  id: number
  from: string
  email: string
  subject: BiStr
  snippet: BiStr
  time: string
  unread: boolean
  starred: boolean
  hasAttachment: boolean
  avatar: string
  avatarColor: string
}

export const emails: Email[] = [
  { id: 1, from: 'Carlos Martinez', email: 'carlos.martinez@constructorapacifico.com.mx', subject: { es: 'Solicitud de seguro y fianza — Autopista Guadalajara-Tepic', en: 'Insurance & surety bond request — Guadalajara-Tepic Highway' }, snippet: { es: 'Estimada Lic. Gutierrez, adjunto el Contrato Maestro de Servicios y el documento de requisitos de fianzas para el proyecto Autopista Guadalajara-Tepic...', en: 'Dear Ms. Gutierrez, please find attached the Master Services Contract and the surety bond requirements document for the Guadalajara-Tepic Highway project...' }, time: '9:14 AM', unread: true, starred: false, hasAttachment: true, avatar: 'C', avatarColor: '#e91e63' },
  { id: 2, from: 'GNP Seguros — Renovaciones', email: 'renovaciones@gnp.com.mx', subject: { es: 'Aviso de Renovacion — Poliza RC-2025-08734', en: 'Renewal Notice — Policy RC-2025-08734' }, snippet: { es: 'Estimado agente, le informamos que la poliza de Responsabilidad Civil de Grupo ICA vence el 30/04/2026. Favor de indicar si procede renovacion...', en: 'Dear agent, we inform you that Grupo ICA\'s Liability policy expires on 04/30/2026. Please indicate whether renewal should proceed...' }, time: '9:02 AM', unread: true, starred: false, hasAttachment: true, avatar: 'G', avatarColor: '#F47920' },
  { id: 3, from: 'Roberto Sanchez Vega', email: 'rsanchez@mapfre.com.mx', subject: { es: 'Re: Confirmacion de Cotizacion — Todo Riesgo Construccion', en: 'Re: Quote Confirmation — All Risk Construction' }, snippet: { es: 'Lic. Gutierrez, confirmamos la cotizacion MAP-TR-2026-047823 por prima total de Mex$847,000.00 Vigencia 24 meses. Quedo a sus ordenes para cualquier aclaracion...', en: 'Ms. Gutierrez, we confirm quote MAP-TR-2026-047823 for a total premium of Mex$847,000.00 MXN. 24-month term. Please let me know if you need any clarification...' }, time: '8:47 AM', unread: false, starred: true, hasAttachment: true, avatar: 'R', avatarColor: '#d32f2f' },
  { id: 4, from: 'Fernando Medina Lozano', email: 'fmedina@grupoica.com.mx', subject: { es: 'Ampliacion de cobertura — Proyecto Metro Linea 4', en: 'Coverage extension — Metro Line 4 Project' }, snippet: { es: 'Buen dia, necesitamos ampliar la suma asegurada del seguro de equipo pesado. El nuevo inventario incluye 3 tuneladoras adicionales valoradas en...', en: 'Good morning, we need to increase the insured amount for the heavy equipment policy. The updated inventory includes 3 additional tunnel boring machines valued at...' }, time: '8:31 AM', unread: false, starred: false, hasAttachment: false, avatar: 'F', avatarColor: '#2196f3' },
  { id: 5, from: 'Sergio Avelar Torres', email: 'sergio.avelar@alayaseguros.com.mx', subject: { es: 'Estatus fianza Constructora del Pacifico — URGENTE', en: 'Constructora del Pacifico bond status — URGENT' }, snippet: { es: 'Maria Elena, necesito saber el estatus de la fianza de cumplimiento de Constructora del Pacifico. El cliente esta presionando y la afianzadora no ha respondido...', en: 'Maria Elena, I need an update on Constructora del Pacifico\'s performance bond. The client is pressing and the surety carrier hasn\'t responded...' }, time: '8:22 AM', unread: true, starred: true, hasAttachment: false, avatar: 'S', avatarColor: '#4caf50' },
  { id: 6, from: 'CNSF — Avisos Regulatorios', email: 'avisos@cnsf.gob.mx', subject: { es: 'Circular S-40.1 — Nuevos requisitos de reservas tecnicas', en: 'Circular S-40.1 — New technical reserve requirements' }, snippet: { es: 'Se informa a los agentes y aseguradoras que a partir del 01/05/2026, se modifican los requisitos de reservas tecnicas para ramos de danos. Ver documento adjunto...', en: 'Agents and insurers are hereby informed that effective 05/01/2026, technical reserve requirements for property lines are being modified. See attached document...' }, time: '8:15 AM', unread: false, starred: false, hasAttachment: true, avatar: 'C', avatarColor: '#795548' },
  { id: 7, from: 'Ana Lucia Rojas', email: 'arojas@cemex.com', subject: { es: 'Re: Poliza flotante de equipo — Planta Monterrey', en: 'Re: Equipment floater policy — Monterrey Plant' }, snippet: { es: 'Gracias por las opciones. Nos vamos con la opcion de GNP por el tema del deducible. Favor de proceder con la emision de la poliza...', en: 'Thank you for the options. We\'ll go with GNP due to the deductible terms. Please proceed with policy issuance...' }, time: '8:03 AM', unread: false, starred: false, hasAttachment: false, avatar: 'A', avatarColor: '#ff9800' },
  { id: 8, from: 'Contabilidad Alaya', email: 'contabilidad@alayaseguros.com.mx', subject: { es: 'Comisiones Marzo 2026 — Revision pendiente', en: 'March 2026 Commissions — Review pending' }, snippet: { es: 'Lic. Gutierrez, favor de revisar el desglose de comisiones del mes de marzo. Hay una diferencia de Mex$23,450 en el ramo de fianzas que necesitamos conciliar...', en: 'Ms. Gutierrez, please review the March commission breakdown. There is a Mex$23,450 discrepancy in the surety line that needs reconciliation...' }, time: '7:51 AM', unread: false, starred: false, hasAttachment: true, avatar: 'C', avatarColor: '#607d8b' },
  { id: 9, from: 'Patricia Nava Duran', email: 'pnava@gobiernojalisco.gob.mx', subject: { es: 'Requerimiento de seguros — Licitacion LP-2026-0047', en: 'Insurance requirements — Public Tender LP-2026-0047' }, snippet: { es: 'Informamos que la licitacion publica para mantenimiento de carreteras estatales requiere fianza de sostenimiento de oferta. Fecha limite para presentar...', en: 'We inform you that the public tender for state highway maintenance requires a bid bond. Deadline for submission...' }, time: 'Abr 8', unread: false, starred: false, hasAttachment: true, avatar: 'P', avatarColor: '#9c27b0' },
  { id: 10, from: 'Chubb Mexico — Portal', email: 'portal@chubb.com.mx', subject: { es: 'Notificacion: Poliza emitida CHB-RC-2026-11293', en: 'Notification: Policy issued CHB-RC-2026-11293' }, snippet: { es: 'Se ha emitido exitosamente la poliza de Responsabilidad Civil para el asegurado Constructora Reforma S.A. de C.V. Puede descargar la caratula...', en: 'The Liability policy for insured Constructora Reforma S.A. de C.V. has been successfully issued. You may download the cover page...' }, time: 'Abr 8', unread: false, starred: false, hasAttachment: false, avatar: 'C', avatarColor: '#000000' },
  { id: 11, from: 'Eduardo Villarreal', email: 'evillarreal@constructorapemex.com.mx', subject: { es: 'Cotizacion RC y Todo Riesgo — Refineria Dos Bocas', en: 'Liability & All-Risk quote — Dos Bocas Refinery' }, snippet: { es: 'Buenas tardes, estamos por iniciar trabajos en la refineria y necesitamos seguros de RC y todo riesgo de construccion. El valor de la obra es de Mex$1,200 millones...', en: 'Good afternoon, we are about to begin work at the refinery and need liability and all-risk construction insurance. The project value is Mex$1.2 billion MXN...' }, time: 'Abr 8', unread: false, starred: false, hasAttachment: false, avatar: 'E', avatarColor: '#f44336' },
  { id: 12, from: 'Mapfre Mexico', email: 'agentes@mapfre.com.mx', subject: { es: 'Nuevo producto: Seguro Integral de Obra Publica', en: 'New product: Comprehensive Public Works Insurance' }, snippet: { es: 'Estimado agente, nos complace presentarle nuestro nuevo producto diseñado especificamente para proyectos de obra publica. Incluye coberturas de RC, equipo...', en: 'Dear agent, we are pleased to introduce our new product designed specifically for public works projects. It includes liability, equipment coverage...' }, time: 'Abr 7', unread: false, starred: false, hasAttachment: true, avatar: 'M', avatarColor: '#d32f2f' },
  { id: 13, from: 'Sergio Avelar Torres', email: 'sergio.avelar@alayaseguros.com.mx', subject: { es: 'Junta de revision semanal — Agenda', en: 'Weekly review meeting — Agenda' }, snippet: { es: 'Equipo, recuerden la junta de revision mañana a las 10:00. Temas: cartera vencida, renovaciones pendientes, y el pipeline de fianzas del trimestre...', en: 'Team, reminder about the review meeting tomorrow at 10:00. Topics: past-due portfolio, pending renewals, and the quarterly surety pipeline...' }, time: 'Abr 7', unread: false, starred: false, hasAttachment: false, avatar: 'S', avatarColor: '#4caf50' },
  { id: 14, from: 'Zurich Mexico — Siniestros', email: 'siniestros@zurich.com.mx', subject: { es: 'Aviso de siniestro SIN-2026-00412 — Resolucion', en: 'Claim notice SIN-2026-00412 — Resolution' }, snippet: { es: 'Informamos que el siniestro reportado para la poliza ZUR-EQ-2025-08891 ha sido resuelto favorablemente. Monto indemnizado: Mex$340,000.00..', en: 'We inform you that the claim reported under policy ZUR-EQ-2025-08891 has been favorably resolved. Indemnity amount: Mex$340,000.00 MXN...' }, time: 'Abr 7', unread: false, starred: false, hasAttachment: true, avatar: 'Z', avatarColor: '#0060AE' },
  { id: 15, from: 'Alejandra Fuentes', email: 'afuentes@constructoranorte.com.mx', subject: { es: 'Renovacion anual — Todas las polizas', en: 'Annual renewal — All policies' }, snippet: { es: 'Buen dia, se acerca la fecha de renovacion de todas nuestras polizas. Somos 4 polizas en total. Podrian preparar las cotizaciones comparativas...', en: 'Good morning, our renewal dates for all policies are approaching. We have 4 policies in total. Could you prepare comparative quotes...' }, time: 'Abr 6', unread: false, starred: false, hasAttachment: false, avatar: 'A', avatarColor: '#00bcd4' },
]

// ---- KEY EMAIL BODY (Carlos Martinez's contract request) ----
export const carlosEmailBody: Record<'es' | 'en', string> = {
  es: `Estimada Lic. Gutierrez,

Adjunto el Contrato Maestro de Servicios y el documento de requisitos de fianzas para el proyecto Autopista Guadalajara-Tepic. Requerimos cotizaciones de seguro y fianzas. Inicio de obra: 15 de abril de 2026.

Quedo a sus ordenes para cualquier informacion adicional.

Atentamente,

Ing. Carlos Martinez Hernandez
Director de Proyectos
Constructora del Pacifico S.A. de C.V.
Tel: (33) 3615-2847
carlos.martinez@constructorapacifico.com.mx`,
  en: `Dear Ms. Gutierrez,

Please find attached the Master Services Contract and the surety bond requirements document for the Guadalajara-Tepic Highway project. We need insurance and surety bond quotes. Construction starts April 15, 2026.

I remain at your disposal for any additional information.

Sincerely,

Eng. Carlos Martinez Hernandez
Director of Projects
Constructora del Pacifico S.A. de C.V.
Tel: (33) 3615-2847
carlos.martinez@constructorapacifico.com.mx`,
}

// ---- CONTRACT TEXT (Mexican legal document) ----
export const contractText: Record<'es' | 'en', string> = {
  es: `CONTRATO DE PRESTACION DE SERVICIOS DE CONSTRUCCION PARA PROYECTO AUTOPISTA GUADALAJARA-TEPIC

CONTRATO NUMERO: SIOP-LP-2026-0023

CONTRATO DE OBRA PUBLICA A PRECIOS UNITARIOS QUE CELEBRAN, POR UNA PARTE, EL GOBIERNO DEL ESTADO DE JALISCO, A TRAVES DE LA SECRETARIA DE INFRAESTRUCTURA Y OBRA PUBLICA, EN LO SUCESIVO "EL CONTRATANTE", REPRESENTADA POR EL LIC. JORGE ALBERTO RAMOS VELAZQUEZ, EN SU CARACTER DE SECRETARIO DE INFRAESTRUCTURA Y OBRA PUBLICA, CON DOMICILIO EN AVENIDA ALCALDE No. 1351, COLONIA MIRAFLORES, C.P. 44260, GUADALAJARA, JALISCO, CON R.F.C. GEJ-850101-123; Y POR LA OTRA, CONSTRUCTORA DEL PACIFICO S.A. DE C.V., EN LO SUCESIVO "EL CONTRATISTA", REPRESENTADA POR EL ING. CARLOS MARTINEZ HERNANDEZ, EN SU CARACTER DE DIRECTOR GENERAL, CON DOMICILIO EN BOULEVARD PUERTA DE HIERRO No. 5065, COLONIA PUERTA DE HIERRO, C.P. 45116, ZAPOPAN, JALISCO, CON R.F.C. CPE-190315-AB1, AL TENOR DE LAS SIGUIENTES:

D E C L A R A C I O N E S

I. "EL CONTRATANTE" DECLARA:

I.1. Que es una dependencia del Poder Ejecutivo del Estado de Jalisco, con facultades para celebrar el presente contrato, de conformidad con los articulos 2, 5 y 30 de la Ley Organica del Poder Ejecutivo del Estado de Jalisco.

I.2. Que el Lic. Jorge Alberto Ramos Velazquez cuenta con las facultades suficientes para suscribir el presente instrumento, de conformidad con el nombramiento expedido por el C. Gobernador del Estado con fecha 01 de octubre de 2024.

I.3. Que la presente contratacion se realiza al amparo de la Ley de Obra Publica del Estado de Jalisco, y se adjudico mediante el procedimiento de licitacion publica nacional numero SIOP-LP-2026-0023.

I.4. Que cuenta con la suficiencia presupuestal para cubrir el compromiso derivado del presente contrato, segun oficio de autorizacion presupuestal numero SEPAF/DGP/2026/0847, de fecha 15 de febrero de 2026.

I.5. Que para efectos del presente contrato señala como domicilio el ubicado en Avenida Alcalde No. 1351, Colonia Miraflores, C.P. 44260, Guadalajara, Jalisco.

II. "EL CONTRATISTA" DECLARA:

II.1. Que es una sociedad mercantil legalmente constituida conforme a las leyes de los Estados Unidos Mexicanos, segun consta en la escritura publica numero 12,847, de fecha 15 de marzo de 2014, otorgada ante la fe del Lic. Roberto Nuñez Tenorio, Notario Publico No. 7 de Zapopan, Jalisco, e inscrita en el Registro Publico de la Propiedad y del Comercio bajo el folio mercantil electronico N-2014-034721.

II.2. Que su representante, Ing. Carlos Martinez Hernandez, cuenta con las facultades suficientes para obligar a la empresa en los terminos del presente contrato, segun poder general otorgado en escritura publica numero 15,293, de fecha 20 de enero de 2020.

II.3. Que su Registro Federal de Contribuyentes es CPE-190315-AB1 y que se encuentra al corriente en el cumplimiento de sus obligaciones fiscales.

II.4. Que cuenta con la experiencia tecnica, los recursos humanos, materiales y financieros necesarios para la ejecucion de los trabajos objeto del presente contrato.

II.5. Que conoce plenamente el contenido y los requisitos del presente contrato, asi como las condiciones del sitio donde se ejecutaran los trabajos.

II.6. Que para efectos del presente contrato señala como domicilio el ubicado en Boulevard Puerta de Hierro No. 5065, Colonia Puerta de Hierro, C.P. 45116, Zapopan, Jalisco.

C L A U S U L A S

PRIMERA.- OBJETO DEL CONTRATO.

"EL CONTRATANTE" encomienda a "EL CONTRATISTA", y este se obliga a ejecutar los trabajos de construccion, modernizacion y ampliacion del tramo carretero "Autopista Guadalajara-Tepic", que comprende los trabajos de terraceria, pavimentacion, obras de drenaje, señalamiento, iluminacion y obras complementarias, en una longitud aproximada de 167 kilometros, desde el entronque con la carretera federal 15D en el municipio de Zapopan, Jalisco, hasta el entronque con el libramiento de Tepic, Nayarit, de conformidad con las especificaciones tecnicas, catalogo de conceptos, proyecto ejecutivo y demas documentos que forman parte integrante del presente contrato.

SEGUNDA.- MONTO DEL CONTRATO.

El monto total del presente contrato es por la cantidad de Mex$500,000,000.00 (QUINIENTOS MILLONES DE PESOS 00/100 M.N.), mas el Impuesto al Valor Agregado correspondiente, resultando un monto total con IVA de Mex$580,000,000.00 (QUINIENTOS OCHENTA MILLONES DE PESOS 00/100 M.N.), a precios unitarios, de conformidad con el catalogo de conceptos anexo al presente instrumento.

Los precios unitarios incluyen los costos directos, los costos indirectos, el costo por financiamiento, el cargo por utilidad y los cargos adicionales, de conformidad con lo establecido en la Ley de Obra Publica del Estado de Jalisco y su Reglamento.

TERCERA.- PLAZO DE EJECUCION.

El plazo de ejecucion de los trabajos objeto del presente contrato sera de 24 (VEINTICUATRO) meses calendario, contados a partir de la fecha de inicio de los trabajos, misma que sera a partir de las 00:01 horas del dia 15 de abril de 2026, por lo que la fecha de terminacion sera el 14 de abril de 2028.

En caso de que "EL CONTRATISTA" no concluya los trabajos en el plazo establecido, se hara acreedor a las penas convencionales previstas en la clausula vigesima del presente contrato.

CUARTA.- FORMA DE PAGO.

Los trabajos ejecutados seran pagados mediante estimaciones mensuales, las cuales seran presentadas por "EL CONTRATISTA" dentro de los primeros 5 (cinco) dias habiles del mes siguiente al que correspondan. "EL CONTRATANTE" tendra un plazo de 15 (quince) dias habiles para su revision y aprobacion, y el pago se realizara dentro de los 20 (veinte) dias naturales siguientes a la fecha de aprobacion.

QUINTA.- ANTICIPO.

"EL CONTRATANTE" otorgara a "EL CONTRATISTA" un anticipo por la cantidad de Mex$75,000,000.00 (SETENTA Y CINCO MILLONES DE PESOS 00/100 M.N.), equivalente al 15% (quince por ciento) del monto total del contrato antes de IVA, el cual se destinara para la compra de materiales y el inicio de los trabajos. Dicho anticipo sera amortizado proporcionalmente en cada una de las estimaciones que se presenten durante la ejecucion de la obra.

La entrega del anticipo estara condicionada a la presentacion de la fianza correspondiente en terminos de la clausula octava del presente contrato.

SEXTA.- SUPERVISION Y VIGILANCIA.

"EL CONTRATANTE" designara un residente de obra que fungira como su representante ante "EL CONTRATISTA", con facultades para verificar que los trabajos se ejecuten conforme al proyecto ejecutivo, las especificaciones tecnicas, el programa de obra y las demas condiciones pactadas en el presente contrato.

"EL CONTRATISTA" designara un superintendente de construccion, quien sera responsable de la direccion tecnica de los trabajos y sera el enlace directo con el residente de obra designado por "EL CONTRATANTE".

SEPTIMA.- SEGUROS Y FIANZAS.

"EL CONTRATISTA" se obliga a contratar y mantener vigentes durante toda la ejecucion de los trabajos y hasta la recepcion formal de la obra, los seguros que a continuacion se describen, los cuales deberan ser contratados con instituciones de seguros autorizadas por la Comision Nacional de Seguros y Fianzas (CNSF), y deberan nombrar como beneficiario preferente a "EL CONTRATANTE":

7.1. SEGURO DE RESPONSABILIDAD CIVIL GENERAL.- "EL CONTRATISTA" debera contratar un seguro de Responsabilidad Civil General con un limite minimo de responsabilidad de Mex$5,000,000.00 (CINCO MILLONES DE PESOS 00/100 M.N.) por evento y en agregado anual, que cubra los daños que con motivo de la ejecucion de los trabajos se causen a terceros en su persona o en sus bienes, incluyendo daños a las vias de comunicacion, infraestructura adyacente y servicios publicos. La poliza debera incluir las coberturas de responsabilidad civil por actividades de construccion, responsabilidad civil por productos terminados, y gastos medicos de terceros.

7.2. SEGURO DE EQUIPO DE CONSTRUCCION.- "EL CONTRATISTA" debera contratar un seguro que ampare la totalidad de la maquinaria y equipo de construccion que se utilice en la obra, tanto propio como arrendado, subarrendado o en comodato, contra los riesgos de daño material, robo total, daños por colision, volcadura, y desastres naturales. El limite de responsabilidad de la poliza debera ser suficiente para cubrir el valor de reposicion de la totalidad del equipo presente en la obra en cualquier momento. La poliza debera incluir clausula de operacion las 24 horas del dia, los 7 dias de la semana, asi como cobertura en transito dentro del territorio nacional.

7.3. RESPONSABILIDAD PATRONAL.- "EL CONTRATISTA" debera contratar un seguro de Responsabilidad Patronal, tambien conocido como seguro de Riesgos de Trabajo complementario, con un limite minimo de responsabilidad de Mex$2,000,000.00 (DOS MILLONES DE PESOS 00/100 M.N.) por trabajador y por evento, que ampare las obligaciones patronales derivadas de accidentes o enfermedades de trabajo del personal de "EL CONTRATISTA" que labore en la obra, en exceso de las prestaciones otorgadas por el Instituto Mexicano del Seguro Social (IMSS). Dicho seguro debera cubrir muerte accidental, incapacidad total permanente, incapacidad parcial permanente, gastos medicos y gastos funerarios.

OCTAVA.- FIANZAS.

Los requisitos de fianzas aplicables al presente contrato se detallan en el documento complementario "Requisitos de Fianzas — Proyecto Autopista Guadalajara-Tepic", el cual forma parte integrante del presente contrato. "EL CONTRATISTA" debera cumplir con todos los requisitos de fianza establecidos en dicho documento.

NOVENA.- OBLIGACIONES DE "EL CONTRATISTA".

Ademas de las señaladas en las clausulas anteriores, "EL CONTRATISTA" tendra las siguientes obligaciones:

I. Ejecutar los trabajos conforme al proyecto ejecutivo aprobado, las especificaciones tecnicas, normas aplicables y el programa de obra.

II. Mantener permanentemente en la obra al personal tecnico, administrativo y obrero necesario para la correcta ejecucion de los trabajos.

III. Proporcionar la maquinaria y equipo necesarios, en cantidad y calidad suficientes, para cumplir con el programa de obra.

IV. Cumplir con todas las leyes, reglamentos, normas oficiales mexicanas y disposiciones vigentes aplicables a los trabajos objeto del presente contrato.

V. Asumir la responsabilidad total por los daños que se causen a terceros, a "EL CONTRATANTE" o a sus propios trabajadores, con motivo de la ejecucion de los trabajos.

VI. Presentar la documentacion comprobatoria del pago de cuotas obrero-patronales ante el IMSS, INFONAVIT y SAR, correspondiente al personal que labore en la obra.

DECIMA.- GARANTIA DE LOS TRABAJOS.

"EL CONTRATISTA" garantiza que los trabajos ejecutados al amparo del presente contrato se realizaran con la calidad requerida, de conformidad con las especificaciones tecnicas y normas aplicables. En caso de que se detecten deficiencias, vicios ocultos o defectos en los trabajos durante el periodo de garantia de 12 (doce) meses, "EL CONTRATISTA" se obliga a corregirlos a su costa, sin perjuicio de la responsabilidad civil que pudiera resultar.

DECIMA PRIMERA.- MODIFICACIONES AL CONTRATO.

El presente contrato podra ser modificado en cuanto a monto, plazo y alcance de los trabajos, de conformidad con lo establecido en la Ley de Obra Publica del Estado de Jalisco. Las modificaciones no podran exceder del 25% (veinticinco por ciento) del monto originalmente pactado y deberan formalizarse mediante convenio modificatorio suscrito por ambas partes.

DECIMA SEGUNDA.- RESCISION DEL CONTRATO.

"EL CONTRATANTE" podra rescindir administrativamente el presente contrato, sin responsabilidad para el mismo, en los siguientes supuestos:

I. Si "EL CONTRATISTA" no inicia los trabajos en la fecha pactada, o los suspende injustificadamente.

II. Si "EL CONTRATISTA" no cumple con el programa de obra y el atraso supera el 20% (veinte por ciento) del avance programado.

III. Si "EL CONTRATISTA" no otorga las fianzas o seguros requeridos en los plazos establecidos.

IV. Si "EL CONTRATISTA" subcontrata la totalidad de los trabajos sin autorizacion previa de "EL CONTRATANTE".

V. Por incumplimiento de cualquiera de las obligaciones establecidas en el presente contrato.

DECIMA TERCERA.- LEGISLACION APLICABLE Y JURISDICCION.

Para la interpretacion, cumplimiento y ejecucion del presente contrato, las partes se someten a la jurisdiccion de los tribunales competentes de la ciudad de Guadalajara, Jalisco, renunciando expresamente a cualquier otro fuero que pudiera corresponderles por razon de su domicilio presente o futuro.

Son aplicables al presente contrato la Ley de Obra Publica del Estado de Jalisco y su Reglamento, la Ley Sobre el Contrato de Seguro, la Ley de Instituciones de Seguros y Fianzas (LISF), el Codigo Civil del Estado de Jalisco, el Codigo de Comercio, y demas disposiciones legales aplicables.

DECIMA CUARTA.- DISPOSICIONES ESPECIALES.

14.1. PROTECCION AMBIENTAL.- "EL CONTRATISTA" debera cumplir con todas las disposiciones ambientales aplicables y obtener las autorizaciones necesarias en materia de impacto ambiental, uso de suelo, aprovechamiento de materiales petreos y disposicion de residuos de construccion.

14.2. SEGURIDAD E HIGIENE.- "EL CONTRATISTA" debera implementar un programa de seguridad e higiene en la obra, de conformidad con las normas oficiales mexicanas NOM-031-STPS-2011 y NOM-009-STPS-2011, el cual debera incluir capacitacion periodica al personal, equipo de proteccion personal, señalizacion adecuada y un plan de emergencia.

14.3. COBERTURAS ADICIONALES.

14.3.1. "EL CONTRATISTA" debera contratar un seguro de Responsabilidad Civil Profesional que cubra los errores u omisiones del personal tecnico y de ingenieria involucrado en el proyecto, con un limite minimo de Mex$3,000,000.00 (TRES MILLONES DE PESOS 00/100 M.N.).

14.3.2. "EL CONTRATISTA" debera contratar una poliza de seguro de todo riesgo de construccion (Seguro CAR — Contractors All Risks, por sus siglas en ingles) por un monto no inferior a Mex$50,000,000.00 (CINCUENTA MILLONES DE PESOS 00/100 M.N.), que ampare los daños materiales a la obra en proceso de construccion, incluyendo materiales, mano de obra, equipo instalado y obras temporales, contra los riesgos de incendio, explosion, fenomenos hidrometeorologicos, deslizamientos de tierra, inundacion, sismo, erupcion volcanica, marejada, y cualquier otro riesgo inherente a los trabajos de construccion. Dicha poliza debera incluir la cobertura de remocion de escombros por un sublimite minimo de Mex$5,000,000.00 (CINCO MILLONES DE PESOS 00/100 M.N.), la extension de mantenimiento por un periodo de 12 (doce) meses posteriores a la terminacion de los trabajos, y la cobertura de gastos extraordinarios para la aceleracion de los trabajos en caso de siniestro. La poliza de todo riesgo de construccion debera nombrar como asegurados a "EL CONTRATANTE", "EL CONTRATISTA" y todos los subcontratistas que participen en la obra.

14.3.3. "EL CONTRATISTA" debera contratar un seguro de Responsabilidad Civil Cruzada que ampare las reclamaciones entre las partes aseguradas bajo la poliza de todo riesgo de construccion.

14.4. CUMPLIMIENTO NORMATIVO.- Todas las polizas de seguro y fianzas deberan cumplir con las disposiciones de la Ley de Instituciones de Seguros y Fianzas (LISF), las Disposiciones de caracter general que emita la Comision Nacional de Seguros y Fianzas (CNSF), y las Circulares aplicables al ramo de que se trate.

14.5. PLAZO DE ENTREGA DE POLIZAS.- Las polizas de seguro y endosos correspondientes deberan ser entregados a "EL CONTRATANTE" dentro de los 15 (quince) dias naturales anteriores al inicio de los trabajos. La falta de entrega oportuna de las polizas sera causa de rescision del contrato.

DECIMA QUINTA.- PENALIZACIONES.

En caso de atraso en la ejecucion de los trabajos imputable a "EL CONTRATISTA", se aplicara una pena convencional del 1% (uno por ciento) sobre el monto de los trabajos no ejecutados en la fecha pactada, por cada dia natural de atraso, sin que la suma total de las penalizaciones exceda del 10% (diez por ciento) del monto total del contrato.

DECIMA SEXTA.- CONFIDENCIALIDAD.

Las partes se obligan a mantener la mas estricta confidencialidad respecto de la informacion tecnica, financiera y administrativa que se genere o intercambie con motivo de la ejecucion del presente contrato. Esta obligacion subsistira por un periodo de 5 (cinco) años posteriores a la terminacion del contrato.

Enteradas las partes del contenido y alcance legal del presente instrumento, lo firman de conformidad en tres tantos, en la ciudad de Guadalajara, Jalisco, a los 01 dias del mes de abril de 2026.

POR "EL CONTRATANTE"

_________________________________
LIC. JORGE ALBERTO RAMOS VELAZQUEZ
SECRETARIO DE INFRAESTRUCTURA Y OBRA PUBLICA
DEL ESTADO DE JALISCO

POR "EL CONTRATISTA"

_________________________________
ING. CARLOS MARTINEZ HERNANDEZ
DIRECTOR GENERAL
CONSTRUCTORA DEL PACIFICO S.A. DE C.V.

TESTIGOS:

_________________________________
LIC. ANDREA PATRICIA MUÑOZ DELGADO
DIRECTORA JURIDICA DE LA SIOP

_________________________________
C.P. FRANCISCO JAVIER LOPEZ NAVARRO
DIRECTOR ADMINISTRATIVO DE LA SIOP`,
  en: `CONSTRUCTION SERVICES CONTRACT FOR THE GUADALAJARA-TEPIC HIGHWAY PROJECT

CONTRACT NUMBER: SIOP-LP-2026-0023

PUBLIC WORKS CONTRACT AT UNIT PRICES ENTERED INTO BY AND BETWEEN, ON ONE HAND, THE GOVERNMENT OF THE STATE OF JALISCO, THROUGH THE DEPARTMENT OF INFRASTRUCTURE AND PUBLIC WORKS, HEREINAFTER "THE OWNER", REPRESENTED BY LIC. JORGE ALBERTO RAMOS VELAZQUEZ, IN HIS CAPACITY AS SECRETARY OF INFRASTRUCTURE AND PUBLIC WORKS, WITH DOMICILE AT AVENIDA ALCALDE No. 1351, COLONIA MIRAFLORES, ZIP CODE 44260, GUADALAJARA, JALISCO, TAX ID GEJ-850101-123; AND ON THE OTHER HAND, CONSTRUCTORA DEL PACIFICO S.A. DE C.V., HEREINAFTER "THE CONTRACTOR", REPRESENTED BY ENG. CARLOS MARTINEZ HERNANDEZ, IN HIS CAPACITY AS GENERAL DIRECTOR, WITH DOMICILE AT BOULEVARD PUERTA DE HIERRO No. 5065, COLONIA PUERTA DE HIERRO, ZIP CODE 45116, ZAPOPAN, JALISCO, TAX ID CPE-190315-AB1, UNDER THE FOLLOWING:

R E C I T A L S

I. "THE OWNER" DECLARES:

I.1. That it is a department of the Executive Branch of the State of Jalisco, with authority to enter into this contract, in accordance with articles 2, 5 and 30 of the Organic Law of the Executive Branch of the State of Jalisco.

I.2. That Lic. Jorge Alberto Ramos Velazquez has sufficient authority to execute this instrument, in accordance with the appointment issued by the Governor of the State dated October 1, 2024.

I.3. That this procurement is carried out under the Public Works Law of the State of Jalisco, and was awarded through national public tender procedure number SIOP-LP-2026-0023.

I.4. That it has the budgetary sufficiency to cover the commitment arising from this contract, per budget authorization letter number SEPAF/DGP/2026/0847, dated February 15, 2026.

I.5. That for purposes of this contract it designates as its domicile the address at Avenida Alcalde No. 1351, Colonia Miraflores, ZIP Code 44260, Guadalajara, Jalisco.

II. "THE CONTRACTOR" DECLARES:

II.1. That it is a commercial entity legally incorporated under the laws of the United Mexican States, as evidenced in public deed number 12,847, dated March 15, 2014, granted before Lic. Roberto Nunez Tenorio, Notary Public No. 7 of Zapopan, Jalisco, and registered in the Public Registry of Property and Commerce under electronic mercantile folio N-2014-034721.

II.2. That its representative, Eng. Carlos Martinez Hernandez, has sufficient authority to bind the company under the terms of this contract, pursuant to a general power of attorney granted in public deed number 15,293, dated January 20, 2020.

II.3. That its Federal Taxpayer Registry number is CPE-190315-AB1 and that it is current in the fulfillment of its tax obligations.

II.4. That it has the technical experience, human resources, materials and financial capacity necessary for the execution of the work under this contract.

II.5. That it is fully aware of the contents and requirements of this contract, as well as the conditions of the site where the work will be performed.

II.6. That for purposes of this contract it designates as its domicile the address at Boulevard Puerta de Hierro No. 5065, Colonia Puerta de Hierro, ZIP Code 45116, Zapopan, Jalisco.

C L A U S E S

FIRST.- PURPOSE OF THE CONTRACT.

"THE OWNER" entrusts "THE CONTRACTOR", who hereby agrees, to execute the construction, modernization and expansion of the "Guadalajara-Tepic Highway" road section, comprising earthwork, paving, drainage works, signage, lighting and complementary works, over an approximate length of 167 kilometers, from the junction with federal highway 15D in the municipality of Zapopan, Jalisco, to the junction with the Tepic bypass, Nayarit, in accordance with the technical specifications, unit price catalog, executive project and other documents that form an integral part of this contract.

SECOND.- CONTRACT AMOUNT.

The total amount of this contract is Mex$500,000,000.00 (FIVE HUNDRED MILLION PESOS 00/100 MXN), plus the corresponding Value Added Tax, resulting in a total amount including VAT of Mex$580,000,000.00 (FIVE HUNDRED EIGHTY MILLION PESOS 00/100 MXN), at unit prices, in accordance with the unit price catalog attached to this instrument.

The unit prices include direct costs, indirect costs, financing costs, profit margins and additional charges, in accordance with the provisions of the Public Works Law of the State of Jalisco and its Regulations.

THIRD.- TERM OF EXECUTION.

The term for execution of the work under this contract shall be 24 (TWENTY-FOUR) calendar months, counted from the start date of the work, which shall be as of 00:01 hours on April 15, 2026, with a completion date of April 14, 2028.

Should "THE CONTRACTOR" fail to complete the work within the established term, it shall be subject to the contractual penalties set forth in the twentieth clause of this contract.

FOURTH.- PAYMENT TERMS.

Completed work shall be paid through monthly progress estimates, which shall be submitted by "THE CONTRACTOR" within the first 5 (five) business days of the month following the period they cover. "THE OWNER" shall have a period of 15 (fifteen) business days for review and approval, and payment shall be made within the 20 (twenty) calendar days following the approval date.

FIFTH.- ADVANCE PAYMENT.

"THE OWNER" shall grant "THE CONTRACTOR" an advance payment of Mex$75,000,000.00 (SEVENTY-FIVE MILLION PESOS 00/100 MXN), equivalent to 15% (fifteen percent) of the total contract amount before VAT, to be used for the purchase of materials and commencement of works. Said advance shall be proportionally amortized in each of the progress estimates submitted during the execution of the work.

Delivery of the advance payment shall be contingent upon submission of the corresponding surety bond under the terms of the eighth clause of this contract.

SIXTH.- SUPERVISION AND OVERSIGHT.

"THE OWNER" shall designate a site resident who shall serve as its representative before "THE CONTRACTOR", with authority to verify that the work is executed in accordance with the executive project, technical specifications, construction schedule and other conditions agreed upon in this contract.

"THE CONTRACTOR" shall designate a construction superintendent, who shall be responsible for the technical direction of the work and shall serve as the direct liaison with the site resident designated by "THE OWNER".

SEVENTH.- INSURANCE AND SURETY BONDS.

"THE CONTRACTOR" is obligated to procure and maintain in force throughout the execution of the work and until the formal acceptance of the project, the insurance coverages described below, which shall be procured with insurance institutions authorized by the National Insurance and Surety Commission (CNSF), and shall name "THE OWNER" as preferred beneficiary:

7.1. GENERAL LIABILITY INSURANCE.- "THE CONTRACTOR" shall procure a General Liability insurance policy with a minimum limit of liability of Mex$5,000,000.00 (FIVE MILLION PESOS 00/100 MXN) per occurrence and in the annual aggregate, covering damages caused to third parties in their person or property as a result of the execution of the work, including damage to roads, adjacent infrastructure and public utilities. The policy shall include coverage for construction activity liability, completed operations liability, and third-party medical expenses.

7.2. CONSTRUCTION EQUIPMENT INSURANCE.- "THE CONTRACTOR" shall procure insurance covering all machinery and construction equipment used on the project, whether owned, leased, subleased or loaned, against the risks of physical damage, total theft, collision damage, overturning, and natural disasters. The policy limit shall be sufficient to cover the replacement value of all equipment present on the project at any given time. The policy shall include a 24/7 operations clause as well as inland transit coverage within national territory.

7.3. EMPLOYER'S LIABILITY.- "THE CONTRACTOR" shall procure an Employer's Liability insurance policy, also known as supplementary occupational risk insurance, with a minimum limit of liability of Mex$2,000,000.00 (TWO MILLION PESOS 00/100 MXN) per worker and per occurrence, covering the employer's obligations arising from workplace accidents or occupational diseases of "THE CONTRACTOR's" personnel working on the project, in excess of benefits provided by the Mexican Social Security Institute (IMSS). Said insurance shall cover accidental death, total permanent disability, partial permanent disability, medical expenses and funeral expenses.

EIGHTH.- SURETY BONDS.

The surety bond requirements applicable to this contract are detailed in the supplementary document "Surety Bond Requirements — Guadalajara-Tepic Highway Project", which forms an integral part of this contract. "THE CONTRACTOR" shall comply with all bond requirements set forth in said document.

NINTH.- OBLIGATIONS OF "THE CONTRACTOR".

In addition to those set forth in the preceding clauses, "THE CONTRACTOR" shall have the following obligations:

I. Execute the work in accordance with the approved executive project, technical specifications, applicable standards and the construction schedule.

II. Maintain permanently on the project the technical, administrative and labor personnel necessary for the proper execution of the work.

III. Provide the necessary machinery and equipment, in sufficient quantity and quality, to comply with the construction schedule.

IV. Comply with all laws, regulations, Mexican official standards and applicable provisions governing the work under this contract.

V. Assume full responsibility for damages caused to third parties, to "THE OWNER" or to its own workers, in connection with the execution of the work.

VI. Submit documentation evidencing payment of employer-employee contributions to IMSS, INFONAVIT and SAR for all personnel working on the project.

TENTH.- WARRANTY OF WORK.

"THE CONTRACTOR" warrants that the work performed under this contract shall meet the required quality standards, in accordance with the applicable technical specifications and standards. Should deficiencies, hidden defects or faults be detected in the work during the 12 (twelve) month warranty period, "THE CONTRACTOR" is obligated to correct them at its own expense, without prejudice to any civil liability that may arise.

ELEVENTH.- MODIFICATIONS TO THE CONTRACT.

This contract may be modified with respect to amount, term and scope of work, in accordance with the Public Works Law of the State of Jalisco. Modifications may not exceed 25% (twenty-five percent) of the originally agreed amount and shall be formalized through a modification agreement signed by both parties.

TWELFTH.- TERMINATION OF THE CONTRACT.

"THE OWNER" may administratively terminate this contract, without any liability, under the following circumstances:

I. If "THE CONTRACTOR" fails to commence work on the agreed date, or suspends it without justification.

II. If "THE CONTRACTOR" fails to comply with the construction schedule and the delay exceeds 20% (twenty percent) of the scheduled progress.

III. If "THE CONTRACTOR" fails to provide the required surety bonds or insurance within the established timeframes.

IV. If "THE CONTRACTOR" subcontracts the entirety of the work without prior authorization from "THE OWNER".

V. For breach of any of the obligations established in this contract.

THIRTEENTH.- APPLICABLE LAW AND JURISDICTION.

For the interpretation, fulfillment and execution of this contract, the parties submit to the jurisdiction of the competent courts of the city of Guadalajara, Jalisco, expressly waiving any other jurisdiction that may correspond to them by reason of their present or future domicile.

Applicable to this contract are the Public Works Law of the State of Jalisco and its Regulations, the Insurance Contract Law, the Law on Insurance and Surety Institutions (LISF), the Civil Code of the State of Jalisco, the Commercial Code, and other applicable legal provisions.

FOURTEENTH.- SPECIAL PROVISIONS.

14.1. ENVIRONMENTAL PROTECTION.- "THE CONTRACTOR" shall comply with all applicable environmental provisions and obtain the necessary authorizations regarding environmental impact, land use, aggregate material extraction and construction waste disposal.

14.2. OCCUPATIONAL HEALTH AND SAFETY.- "THE CONTRACTOR" shall implement an occupational health and safety program on the project, in accordance with Mexican official standards NOM-031-STPS-2011 and NOM-009-STPS-2011, which shall include periodic personnel training, personal protective equipment, adequate signage and an emergency plan.

14.3. ADDITIONAL COVERAGES.

14.3.1. "THE CONTRACTOR" shall procure a Professional Liability insurance policy covering errors or omissions by technical and engineering personnel involved in the project, with a minimum limit of Mex$3,000,000.00 (THREE MILLION PESOS 00/100 MXN).

14.3.2. "THE CONTRACTOR" shall procure a Contractors All Risks (CAR) insurance policy for an amount not less than Mex$50,000,000.00 (FIFTY MILLION PESOS 00/100 MXN), covering physical damage to the work under construction, including materials, labor, installed equipment and temporary works, against the risks of fire, explosion, hydrometeorological phenomena, landslides, flooding, earthquake, volcanic eruption, tidal surge, and any other risk inherent to construction work. Said policy shall include debris removal coverage with a minimum sublimit of Mex$5,000,000.00 (FIVE MILLION PESOS 00/100 MXN), a maintenance extension for a period of 12 (twelve) months following completion of the work, and extraordinary expense coverage for the acceleration of work in the event of a loss. The all risks construction policy shall name "THE OWNER", "THE CONTRACTOR" and all subcontractors participating in the work as named insureds.

14.3.3. "THE CONTRACTOR" shall procure Cross Liability insurance covering claims between the insured parties under the all risks construction policy.

14.4. REGULATORY COMPLIANCE.- All insurance policies and surety bonds shall comply with the provisions of the Law on Insurance and Surety Institutions (LISF), the general provisions issued by the National Insurance and Surety Commission (CNSF), and the applicable Circulars for the relevant line of business.

14.5. POLICY DELIVERY DEADLINE.- Insurance policies and corresponding endorsements shall be delivered to "THE OWNER" within 15 (fifteen) calendar days prior to the commencement of work. Failure to timely deliver the policies shall constitute grounds for termination of the contract.

FIFTEENTH.- PENALTIES.

In the event of delay in the execution of the work attributable to "THE CONTRACTOR", a contractual penalty of 1% (one percent) of the amount of work not completed by the agreed date shall be applied for each calendar day of delay, provided that the total sum of penalties shall not exceed 10% (ten percent) of the total contract amount.

SIXTEENTH.- CONFIDENTIALITY.

The parties agree to maintain the strictest confidentiality with respect to the technical, financial and administrative information generated or exchanged in connection with the execution of this contract. This obligation shall survive for a period of 5 (five) years following the termination of the contract.

Having been informed of the contents and legal scope of this instrument, the parties sign in agreement in three counterparts, in the city of Guadalajara, Jalisco, on the 1st day of April, 2026.

FOR "THE OWNER"

_________________________________
LIC. JORGE ALBERTO RAMOS VELAZQUEZ
SECRETARY OF INFRASTRUCTURE AND PUBLIC WORKS
STATE OF JALISCO

FOR "THE CONTRACTOR"

_________________________________
ENG. CARLOS MARTINEZ HERNANDEZ
GENERAL DIRECTOR
CONSTRUCTORA DEL PACIFICO S.A. DE C.V.

WITNESSES:

_________________________________
LIC. ANDREA PATRICIA MUNOZ DELGADO
LEGAL DIRECTOR OF SIOP

_________________________________
C.P. FRANCISCO JAVIER LOPEZ NAVARRO
ADMINISTRATIVE DIRECTOR OF SIOP`,
}

export const bondDocumentText: Record<'es' | 'en', string> = {
  es: `REQUISITOS DE FIANZAS — PROYECTO AUTOPISTA GUADALAJARA-TEPIC

DOCUMENTO COMPLEMENTARIO AL CONTRATO SIOP-LP-2026-0023

FECHA: 01 de abril de 2026

PARTES:
- CONTRATANTE: Gobierno del Estado de Jalisco, a traves de la Secretaria de Infraestructura y Obra Publica
- CONTRATISTA: Constructora del Pacifico S.A. de C.V.
- MONTO DEL CONTRATO: Mex$500,000,000.00 M.N.

OBJETO: El presente documento establece los requisitos de fianzas que "EL CONTRATISTA" debera constituir para garantizar el cumplimiento de las obligaciones derivadas del Contrato de Obra Publica SIOP-LP-2026-0023.

FUNDAMENTO LEGAL: Ley de Instituciones de Seguros y Fianzas (LISF), Ley de Obra Publica del Estado de Jalisco, y disposiciones aplicables de la Comision Nacional de Seguros y Fianzas (CNSF).

1. FIANZA DE CUMPLIMIENTO

1.1. Monto: 10% (diez por ciento) del monto total del contrato antes de IVA, equivalente a Mex$50,000,000.00 (CINCUENTA MILLONES DE PESOS 00/100 M.N.).

1.2. Objeto: Garantizar el fiel y exacto cumplimiento de todas y cada una de las obligaciones derivadas del contrato.

1.3. Vigencia: Desde la fecha de firma del contrato hasta la emision del acta de entrega-recepcion de los trabajos.

1.4. Requisitos adicionales: La fianza debera ser expedida por una institucion afianzadora autorizada por la CNSF y debera contener las clausulas de no cancelacion, de vigencia continuada y de cumplimiento fiel y exacto.

2. FIANZA DE BUENA CALIDAD DE OBRA (VICIOS OCULTOS)

2.1. Monto: 10% (diez por ciento) del monto total del contrato antes de IVA, equivalente a Mex$50,000,000.00 (CINCUENTA MILLONES DE PESOS 00/100 M.N.).

2.2. Objeto: Garantizar la calidad de los trabajos ejecutados y responder por los defectos o vicios ocultos que pudieran presentarse.

2.3. Vigencia: 12 (doce) meses contados a partir de la fecha del acta de entrega-recepcion de los trabajos.

2.4. Condiciones especiales: Debera cubrir la reparacion o sustitucion de cualquier trabajo defectuoso identificado durante el periodo de garantia.

3. FIANZA DE ANTICIPO

3.1. Monto: 100% (cien por ciento) del monto del anticipo otorgado, equivalente a Mex$75,000,000.00 (SETENTA Y CINCO MILLONES DE PESOS 00/100 M.N.).

3.2. Objeto: Garantizar la correcta aplicacion y amortizacion del anticipo en los trabajos contratados.

3.3. Vigencia: Hasta la amortizacion total del anticipo.

3.4. Cancelacion: La fianza se cancelara una vez que se haya amortizado totalmente el importe del anticipo otorgado, lo cual debera constar en las estimaciones aprobadas.

DISPOSICIONES GENERALES:

A. Las fianzas deberan ser entregadas a "EL CONTRATANTE" dentro de los 10 (diez) dias naturales siguientes a la firma del contrato y en todo caso antes del inicio de los trabajos.

B. Las fianzas deberan ser expedidas por instituciones afianzadoras autorizadas conforme a la LISF.

C. En caso de incumplimiento, "EL CONTRATANTE" podra hacer efectivas las fianzas conforme al procedimiento establecido en la LISF.

D. Las fianzas podran ser ajustadas proporcionalmente en caso de modificaciones al monto del contrato mediante convenio modificatorio.

E. Cualquier modificacion al contrato principal debera ser comunicada y aprobada por la afianzadora.

FIRMAS:

_________________________________
LIC. JORGE ALBERTO RAMOS VELAZQUEZ
SECRETARIO DE INFRAESTRUCTURA Y OBRA PUBLICA

_________________________________
ING. CARLOS MARTINEZ HERNANDEZ
DIRECTOR GENERAL
CONSTRUCTORA DEL PACIFICO S.A. DE C.V.`,
  en: `SURETY BOND REQUIREMENTS — GUADALAJARA-TEPIC HIGHWAY PROJECT

SUPPLEMENTARY DOCUMENT TO CONTRACT SIOP-LP-2026-0023

DATE: April 1, 2026

PARTIES:
- OWNER: Government of the State of Jalisco, through the Department of Infrastructure and Public Works
- CONTRACTOR: Constructora del Pacifico S.A. de C.V.
- CONTRACT AMOUNT: Mex$500,000,000.00 MXN

PURPOSE: This document establishes the surety bond requirements that "THE CONTRACTOR" must constitute to guarantee compliance with the obligations arising from Public Works Contract SIOP-LP-2026-0023.

LEGAL BASIS: Law on Insurance and Surety Institutions (LISF), Public Works Law of the State of Jalisco, and applicable provisions of the National Insurance and Surety Commission (CNSF).

1. PERFORMANCE BOND

1.1. Amount: 10% (ten percent) of the total contract amount before VAT, equivalent to Mex$50,000,000.00 (FIFTY MILLION PESOS 00/100 MXN).

1.2. Purpose: To guarantee the faithful and exact fulfillment of each and every obligation arising from the contract.

1.3. Term: From the date of contract execution until the issuance of the delivery-acceptance certificate.

1.4. Additional requirements: The bond must be issued by a surety institution authorized by the CNSF and must contain non-cancellation clauses, continuous validity clauses and faithful performance clauses.

2. QUALITY GUARANTEE BOND (HIDDEN DEFECTS)

2.1. Amount: 10% (ten percent) of the total contract amount before VAT, equivalent to Mex$50,000,000.00 (FIFTY MILLION PESOS 00/100 MXN).

2.2. Purpose: To guarantee the quality of work performed and cover any defects or hidden defects that may arise.

2.3. Term: 12 (twelve) months from the date of the delivery-acceptance certificate.

2.4. Special conditions: Must cover repair or replacement of any defective work identified during the warranty period.

3. ADVANCE PAYMENT BOND

3.1. Amount: 100% (one hundred percent) of the advance payment granted, equivalent to Mex$75,000,000.00 (SEVENTY-FIVE MILLION PESOS 00/100 MXN).

3.2. Purpose: To guarantee the proper application and amortization of the advance payment toward the contracted work.

3.3. Term: Until full amortization of the advance payment.

3.4. Cancellation: The bond shall be cancelled once the advance payment amount has been fully amortized, which must be evidenced in the approved progress estimates.

GENERAL PROVISIONS:

A. Bonds must be delivered to "THE OWNER" within 10 (ten) calendar days following execution of the contract and in all cases prior to commencement of work.

B. Bonds must be issued by surety institutions authorized under the LISF.

C. In the event of default, "THE OWNER" may enforce the bonds in accordance with the procedure established in the LISF.

D. Bonds may be proportionally adjusted in the event of modifications to the contract amount through a modification agreement.

E. Any modification to the underlying contract must be communicated to and approved by the surety company.

SIGNATURES:

_________________________________
LIC. JORGE ALBERTO RAMOS VELAZQUEZ
SECRETARY OF INFRASTRUCTURE AND PUBLIC WORKS

_________________________________
ENG. CARLOS MARTINEZ HERNANDEZ
GENERAL DIRECTOR
CONSTRUCTORA DEL PACIFICO S.A. DE C.V.`,
}

// ---- EXTRACTED REQUIREMENTS ----
export interface InsuranceRequirement {
  id: string
  type: BiStr
  limit: number
  limitText: BiStr
  deductible: BiStr
  clause: string
  confidence: number
  description: BiStr
  isAiRecommended?: boolean
}

export const insuranceRequirements: InsuranceRequirement[] = [
  {
    id: 'ins-1',
    type: { es: 'Responsabilidad Civil General', en: 'General Liability' },
    limit: 5000000,
    limitText: { es: 'Cinco Millones de Pesos', en: 'Five Million Pesos' },
    deductible: { es: '5% del monto del siniestro, minimo Mex$50,000', en: '5% of loss amount, minimum Mex$50,000 MXN' },
    clause: '7.1',
    confidence: 98,
    description: { es: 'Seguro de RC General con limite minimo de Mex$5,000,000.00 por evento y en agregado anual. Debe cubrir daños a terceros, vias de comunicacion, infraestructura adyacente y servicios publicos. Incluir RC por actividades de construccion, productos terminados y gastos medicos.', en: 'General Liability insurance with a minimum limit of Mex$5,000,000.00 MXN per occurrence and annual aggregate. Must cover third-party damage, roads, adjacent infrastructure and public utilities. Include construction activity liability, completed operations and medical expenses.' },
    isAiRecommended: false,
  },
  {
    id: 'ins-2',
    type: { es: 'Equipo de Construccion', en: 'Construction Equipment' },
    limit: 120000000,
    limitText: { es: 'Ciento Veinte Millones de Pesos', en: 'One Hundred Twenty Million Pesos' },
    deductible: { es: '10% del monto del siniestro, minimo Mex$100,000', en: '10% of loss amount, minimum Mex$100,000 MXN' },
    clause: '7.2',
    confidence: 97,
    description: { es: 'Seguro que ampare toda la maquinaria y equipo de construccion (propio, arrendado, subarrendado o en comodato) contra daño material, robo total, colision, volcadura y desastres naturales. Valor de reposicion total. Operacion 24/7 y cobertura en transito nacional.', en: 'Insurance covering all machinery and construction equipment (owned, leased, subleased or loaned) against physical damage, total theft, collision, overturning and natural disasters. Full replacement value. 24/7 operations and domestic transit coverage.' },
    isAiRecommended: false,
  },
  {
    id: 'ins-3',
    type: { es: 'Responsabilidad Patronal', en: "Employer's Liability" },
    limit: 2000000,
    limitText: { es: 'Dos Millones de Pesos', en: 'Two Million Pesos' },
    deductible: { es: 'Sin deducible', en: 'No deductible' },
    clause: '7.3',
    confidence: 99,
    description: { es: 'Seguro de Responsabilidad Patronal / Riesgos de Trabajo complementario con limite minimo de Mex$2,000,000.00 por trabajador y por evento. Cubre en exceso de IMSS: muerte accidental, incapacidad total y parcial permanente, gastos medicos y funerarios.', en: "Employer's Liability / Supplementary Occupational Risk insurance with minimum limit of Mex$2,000,000.00 MXN per worker and per occurrence. Covers in excess of IMSS: accidental death, total and partial permanent disability, medical and funeral expenses." },
    isAiRecommended: false,
  },
  {
    id: 'ins-4',
    type: { es: 'Todo Riesgo de Construccion (CAR)', en: 'Contractors All Risks (CAR)' },
    limit: 50000000,
    limitText: { es: 'Cincuenta Millones de Pesos', en: 'Fifty Million Pesos' },
    deductible: { es: '10% del monto del siniestro, minimo Mex$250,000', en: '10% of loss amount, minimum Mex$250,000 MXN' },
    clause: '14.3.2',
    confidence: 94,
    description: { es: 'Poliza CAR por minimo Mex$50,000,000.00 que ampare daños materiales a obra en proceso, materiales, mano de obra, equipo instalado y obras temporales. Incluir remocion de escombros (sublimite Mex$5M), extension de mantenimiento 12 meses, gastos extraordinarios. NOTA: Esta clausula esta ubicada en la seccion de Disposiciones Especiales (clausula 14), no en la seccion principal de Seguros (clausula 7).', en: 'CAR policy for minimum Mex$50,000,000.00 MXN covering physical damage to work in progress, materials, labor, installed equipment and temporary works. Include debris removal (sublimit Mex$5M), 12-month maintenance extension, extraordinary expenses. NOTE: This clause is located in the Special Provisions section (clause 14), not in the main Insurance section (clause 7).' },
    isAiRecommended: false,
  },
  // ---- Liability (additional) ----
  {
    id: 'ins-5',
    type: { es: 'Responsabilidad Civil Profesional (E&O)', en: 'Professional Liability (E&O)' },
    limit: 3000000,
    limitText: { es: 'Tres Millones de Pesos', en: 'Three Million Pesos' },
    deductible: { es: '10% del monto del siniestro, minimo Mex$100,000', en: '10% of loss amount, minimum Mex$100,000 MXN' },
    clause: '14.3.1',
    confidence: 95,
    description: { es: 'Seguro de RC Profesional que cubra errores u omisiones del personal tecnico y de ingenieria involucrado en el proyecto. Limite minimo de Mex$3,000,000.00 Referencia cruzada con clausula 14.3.1 (Disposiciones Especiales).', en: 'Professional Liability insurance covering errors or omissions by technical and engineering personnel involved in the project. Minimum limit of Mex$3,000,000.00 MXN. Cross-referenced with clause 14.3.1 (Special Provisions).' },
    isAiRecommended: false,
  },
  {
    id: 'ins-6',
    type: { es: 'Responsabilidad Civil Ambiental', en: 'Environmental Liability' },
    limit: 10000000,
    limitText: { es: 'Diez Millones de Pesos', en: 'Ten Million Pesos' },
    deductible: { es: '15% del monto del siniestro, minimo Mex$200,000', en: '15% of loss amount, minimum Mex$200,000 MXN' },
    clause: '7.4',
    confidence: 92,
    description: { es: 'Seguro de RC Ambiental obligatorio desde 2013 bajo la Ley Federal de Responsabilidad Ambiental. Debe cubrir daños al medio ambiente, remediacion de suelos y cuerpos de agua afectados por actividades de construccion. Limite minimo de Mex$10,000,000.00', en: 'Environmental Liability insurance mandatory since 2013 under the Federal Environmental Liability Law (Ley Federal de Responsabilidad Ambiental). Must cover environmental damage, soil remediation, and affected water bodies from construction activities. Minimum limit of Mex$10,000,000.00 MXN.' },
    isAiRecommended: false,
  },
  {
    id: 'ins-7',
    type: { es: 'Responsabilidad Civil Cruzada', en: 'Cross Liability' },
    limit: 0,
    limitText: { es: 'Incluida (sin limite separado)', en: 'Included (no separate limit)' },
    deductible: { es: 'Sujeto al deducible de la poliza principal', en: 'Subject to main policy deductible' },
    clause: 'AI',
    confidence: 96,
    description: { es: 'Endoso de RC Cruzada que ampare reclamaciones entre las partes aseguradas bajo la poliza de Todo Riesgo CAR. Referencia cruzada con clausula 14.3.3. No requiere limite separado; se incluye como extension de la poliza CAR.', en: 'Cross Liability endorsement covering claims between insured parties under the CAR All Risks policy. Cross-referenced with clause 14.3.3. No separate limit required; included as extension of the CAR policy.' },
    isAiRecommended: true,
  },
  {
    id: 'ins-8',
    type: { es: 'Contaminacion Subita', en: 'Sudden Pollution' },
    limit: 5000000,
    limitText: { es: 'Cinco Millones de Pesos', en: 'Five Million Pesos' },
    deductible: { es: '15% del monto del siniestro, minimo Mex$150,000', en: '15% of loss amount, minimum Mex$150,000 MXN' },
    clause: 'AI',
    confidence: 88,
    description: { es: 'Cobertura de contaminacion subita y accidental derivada de actividades de construccion. Complementa la poliza de RC Ambiental para eventos agudos (derrames, fugas, emisiones accidentales). Limite minimo de Mex$5,000,000.00', en: 'Sudden and accidental pollution coverage arising from construction activities. Complements the Environmental Liability policy for acute events (spills, leaks, accidental emissions). Minimum limit of Mex$5,000,000.00 MXN.' },
    isAiRecommended: true,
  },
  // ---- Property & Consequential (additional) ----
  {
    id: 'ins-9',
    type: { es: 'Transporte de Carga', en: 'Cargo in Transit' },
    limit: 8000000,
    limitText: { es: 'Ocho Millones de Pesos', en: 'Eight Million Pesos' },
    deductible: { es: '5% del monto del siniestro, minimo Mex$50,000', en: '5% of loss amount, minimum Mex$50,000 MXN' },
    clause: 'AI',
    confidence: 90,
    description: { es: 'Seguro de transporte de carga que ampare materiales de construccion, equipo y componentes durante su traslado terrestre al sitio de obra. Cobertura puerta a puerta en territorio nacional. Limite minimo de Mex$8,000,000.00 por embarque.', en: 'Cargo transit insurance covering construction materials, equipment and components during ground transportation to the project site. Door-to-door coverage within national territory. Minimum limit of Mex$8,000,000.00 MXN per shipment.' },
    isAiRecommended: true,
  },
  {
    id: 'ins-10',
    type: { es: 'Remocion de Escombros', en: 'Debris Removal' },
    limit: 5000000,
    limitText: { es: 'Cinco Millones de Pesos (sublimite)', en: 'Five Million Pesos (sublimit)' },
    deductible: { es: '10% del monto del siniestro, minimo Mex$100,000', en: '10% of loss amount, minimum Mex$100,000 MXN' },
    clause: 'AI',
    confidence: 94,
    description: { es: 'Sublimite de remocion de escombros dentro de la poliza CAR. Cubre los costos de limpieza, retiro y disposicion de escombros despues de un siniestro cubierto. Referencia cruzada con clausula 14.3.2.', en: 'Debris removal sublimit within the CAR policy. Covers cleanup, removal, and disposal costs following a covered loss. Cross-referenced with clause 14.3.2.' },
    isAiRecommended: true,
  },
  {
    id: 'ins-11',
    type: { es: 'Periodo de Mantenimiento', en: 'Maintenance Period' },
    limit: 0,
    limitText: { es: '12 meses post-terminacion', en: '12 months post-completion' },
    deductible: { es: 'Mismo deducible que poliza CAR', en: 'Same deductible as CAR policy' },
    clause: 'AI',
    confidence: 96,
    description: { es: 'Extension de cobertura CAR durante el periodo de mantenimiento de 12 meses posteriores a la terminacion de obra. Cubre defectos de construccion descubiertos durante este periodo. Alineado con la fianza de buena calidad (clausula 8.2).', en: 'Extension of CAR coverage during the 12-month maintenance period following project completion. Covers construction defects discovered during this period. Aligned with quality guarantee bond (clause 8.2).' },
    isAiRecommended: true,
  },
  {
    id: 'ins-12',
    type: { es: 'Perdida Consecuencial DSU (Retraso en Arranque)', en: 'Delay in Start-Up (DSU)' },
    limit: 20000000,
    limitText: { es: 'Veinte Millones de Pesos', en: 'Twenty Million Pesos' },
    deductible: { es: 'Periodo de espera: 30 dias; 10% del monto del siniestro', en: 'Waiting period: 30 days; 10% of loss amount' },
    clause: 'AI',
    confidence: 85,
    description: { es: 'Cobertura de perdida consecuencial por retraso en arranque (DSU — Delay in Start-Up). Indemniza las perdidas financieras derivadas del retraso en la puesta en operacion de la autopista por un siniestro cubierto bajo la poliza CAR. Limite minimo de Mex$20,000,000.00', en: 'Consequential loss coverage for delay in start-up (DSU). Indemnifies financial losses from delayed commissioning of the highway due to a covered loss under the CAR policy. Minimum limit of Mex$20,000,000.00 MXN.' },
    isAiRecommended: true,
  },
]

export interface SuretyRequirement {
  id: string
  type: BiStr
  percentage: string
  amount: number
  amountText: BiStr
  clause: string
  confidence: number
  description: BiStr
}

export const suretyRequirements: SuretyRequirement[] = [
  {
    id: 'sur-1',
    type: { es: 'Fianza de Cumplimiento', en: 'Performance Bond' },
    percentage: '10%',
    amount: 50000000,
    amountText: { es: 'Cincuenta Millones de Pesos', en: 'Fifty Million Pesos' },
    clause: '8.1',
    confidence: 99,
    description: { es: 'Fianza de cumplimiento por el 10% del monto del contrato (Mex$50,000,000.00) que garantice el cumplimiento fiel y exacto de todas las obligaciones. Vigente durante ejecucion y hasta acta de entrega-recepcion.', en: 'Performance bond for 10% of contract amount (Mex$50,000,000.00 MXN) guaranteeing the faithful and exact fulfillment of all obligations. Valid during execution and until delivery-acceptance certificate.' },
  },
  {
    id: 'sur-2',
    type: { es: 'Fianza de Buena Calidad de Obra (Vicios Ocultos)', en: 'Quality Guarantee Bond (Hidden Defects)' },
    percentage: '10%',
    amount: 50000000,
    amountText: { es: 'Cincuenta Millones de Pesos', en: 'Fifty Million Pesos' },
    clause: '8.2',
    confidence: 98,
    description: { es: 'Fianza de buena calidad / vicios ocultos por el 10% del monto del contrato (Mex$50,000,000.00) que garantice la calidad de trabajos ejecutados. Vigente por 12 meses a partir del acta de entrega-recepcion.', en: 'Quality guarantee / hidden defects bond for 10% of contract amount (Mex$50,000,000.00 MXN) guaranteeing the quality of work performed. Valid for 12 months from the delivery-acceptance certificate.' },
  },
  {
    id: 'sur-3',
    type: { es: 'Fianza de Anticipo', en: 'Advance Payment Bond' },
    percentage: '100% del anticipo',
    amount: 75000000,
    amountText: { es: 'Setenta y Cinco Millones de Pesos', en: 'Seventy-Five Million Pesos' },
    clause: '8.3',
    confidence: 97,
    description: { es: 'Fianza de anticipo por el 100% del monto del anticipo otorgado (Mex$75,000,000.00) que garantice la correcta aplicacion y amortizacion del anticipo. Se cancela al amortizar totalmente el anticipo.', en: 'Advance payment bond for 100% of the advance amount (Mex$75,000,000.00 MXN) guaranteeing the proper application and amortization of the advance. Cancelled once the advance is fully amortized.' },
  },
]

// ---- CLIENT EXISTING COVERAGE ----
export interface ClientCoverage {
  rcGeneral: number
  equipoConstruccion: number
  respPatronal: number
  todoRiesgo: number
  cumplimiento: number
  buenaCalidad: number
  anticipo: number
}

export const clientCoverage: ClientCoverage = {
  rcGeneral: 5000000,
  equipoConstruccion: 8000000,
  respPatronal: 2000000,
  todoRiesgo: 0,
  cumplimiento: 0,
  buenaCalidad: 0,
  anticipo: 0,
}

// ---- CLIENT PROFILE ----
export interface LossHistoryEntry {
  year: number
  claims: number
  amount: number
  status: BiStr
}

export interface SimilarProject {
  name: string
  year: number
  value: number
}

export interface SafetyMetrics {
  primaRiesgoIMSS: { rate: number; class: string; adjusted: boolean }
  indiceSiniestralidad: { value: number; sectorAvg: number; rating: string }
  indiceFrecuencia: { value: number; sectorAvg: number; unit: string }
  indiceGravedad: { value: number; sectorAvg: number; unit: string }
  lastIncident: BiStr
  certifications: string[]
}

export interface ClientProfile {
  name: string
  rfc: string
  yearsInOperation: number
  specialty: BiStr
  annualRevenue: string
  safetyMetrics: SafetyMetrics
  lossHistory: LossHistoryEntry[]
  similarProjects: SimilarProject[]
}

export const clientProfile: ClientProfile = {
  name: 'Constructora del Pacifico S.A. de C.V.',
  rfc: 'CPE-190315-AB1',
  yearsInOperation: 12,
  specialty: { es: 'Construccion de autopistas y carreteras', en: 'Highway and road construction' },
  annualRevenue: 'Mex$180,000,000 M.N.',
  safetyMetrics: {
    primaRiesgoIMSS: { rate: 7.59, class: 'V (Construccion)', adjusted: true },
    indiceSiniestralidad: { value: 0.42, sectorAvg: 0.68, rating: 'Favorable' },
    indiceFrecuencia: { value: 12.3, sectorAvg: 18.7, unit: 'accidentes/millon hrs' },
    indiceGravedad: { value: 0.89, sectorAvg: 1.45, unit: 'dias perdidos/millon hrs' },
    lastIncident: { es: '14 meses sin incidente reportable', en: '14 months without reportable incident' },
    certifications: ['ISO 45001:2018', 'NOM-031-STPS-2011', 'NOM-030-STPS-2009'],
  },
  lossHistory: [
    { year: 2025, claims: 1, amount: 340000, status: { es: 'Cerrado', en: 'Closed' } },
    { year: 2024, claims: 0, amount: 0, status: { es: '-', en: '-' } },
    { year: 2023, claims: 2, amount: 890000, status: { es: 'Cerrado', en: 'Closed' } },
  ],
  similarProjects: [
    { name: 'Autopista Colima-Manzanillo', year: 2024, value: 320000000 },
    { name: 'Libramiento Tepic', year: 2023, value: 180000000 },
    { name: 'Puente Rio Santiago', year: 2022, value: 95000000 },
  ],
}

// ---- EQUIPMENT (for cross-reference) ----
export interface EquipmentCategory {
  name: BiStr
  units: number
  value: number
}

export interface EquipmentSummary {
  totalUnits: number
  totalInsuredValue: number
  categories: EquipmentCategory[]
}

export const equipmentSummary: EquipmentSummary = {
  totalUnits: 87,
  totalInsuredValue: 178000000,
  categories: [
    { name: { es: 'Movimiento de Tierras', en: 'Earthmoving' }, units: 43, value: 87000000 },
    { name: { es: 'Compactacion y Pavimentacion', en: 'Compaction & Paving' }, units: 18, value: 24000000 },
    { name: { es: 'Gruas e Izaje', en: 'Cranes & Lifting' }, units: 6, value: 34000000 },
    { name: { es: 'Apoyo y Transporte', en: 'Support & Transport' }, units: 20, value: 33000000 },
  ],
}

export interface Equipment {
  id: string
  name: string
  gpsStatus: string
  location: string
  currentPolicy: number
  policyCarrier: string | null
}

export const equipment: Equipment[] = [
  { id: 'eq-1', name: 'CAT 320 Excavadora', gpsStatus: 'Activo', location: 'Guadalajara', currentPolicy: 8000000, policyCarrier: 'Mapfre' },
  { id: 'eq-2', name: 'CAT 950 Cargador', gpsStatus: 'Activo', location: 'Tepic', currentPolicy: 5000000, policyCarrier: 'GNP' },
  { id: 'eq-3', name: 'Liebherr LTM 1100 Grua', gpsStatus: 'Activo', location: 'Guadalajara', currentPolicy: 0, policyCarrier: null },
  { id: 'eq-4', name: 'Komatsu PC200 Excavadora', gpsStatus: 'Activo', location: 'Zapopan', currentPolicy: 4500000, policyCarrier: 'Mapfre' },
  { id: 'eq-5', name: 'Volvo A30G Articulado', gpsStatus: 'Inactivo', location: 'Taller Zapopan', currentPolicy: 6000000, policyCarrier: 'GNP' },
  { id: 'eq-6', name: 'CAT D6T Bulldozer', gpsStatus: 'Activo', location: 'Tepic', currentPolicy: 7000000, policyCarrier: 'Mapfre' },
  { id: 'eq-7', name: 'CAT D8T Bulldozer', gpsStatus: 'Activo', location: 'Guadalajara', currentPolicy: 4500000, policyCarrier: 'Mapfre' },
  { id: 'eq-8', name: 'Wirtgen W210 Fresadora', gpsStatus: 'Activo', location: 'Tepic', currentPolicy: 6000000, policyCarrier: 'GNP' },
  { id: 'eq-9', name: 'Planta de Trituracion Metso', gpsStatus: 'Activo', location: 'Km 47 Autopista', currentPolicy: 0, policyCarrier: null },
]

// ---- CARRIER DATA ----
export interface Carrier {
  id: string
  name: string
  color: string
  matchScore: number
  method: 'portal' | 'email'
  rationale: BiStr
  cnsf: string
}

export const carriers: Carrier[] = [
  {
    id: 'mapfre',
    name: 'Mapfre Mexico',
    color: '#d32f2f',
    matchScore: 94,
    method: 'portal',
    rationale: { es: 'Mejor precio en ramo de construccion. Experiencia comprobada en proyectos de infraestructura carretera en Jalisco. Deducibles competitivos y proceso de emision rapido via portal.', en: 'Best price in the construction line. Proven experience in highway infrastructure projects in Jalisco. Competitive deductibles and fast issuance process via portal.' },
    cnsf: '',
  },
  {
    id: 'gnp',
    name: 'GNP Seguros',
    color: '#F47920',
    matchScore: 91,
    method: 'portal',
    rationale: { es: 'Amplia red de ajustadores en la ruta Guadalajara-Tepic. Ya aseguran equipo del cliente. Endoso de RC cruzada incluido sin costo adicional. Proceso de siniestros eficiente.', en: 'Wide adjuster network along the Guadalajara-Tepic route. Already insures client equipment. Cross liability endorsement included at no additional cost. Efficient claims process.' },
    cnsf: '',
  },
  {
    id: 'chubb',
    name: 'Chubb Mexico',
    color: '#000000',
    matchScore: 87,
    method: 'email',
    rationale: { es: 'Cobertura mas amplia en endosos especiales. Experiencia internacional en mega proyectos. Clausula de gastos extraordinarios con sublimites mas altos. Proceso de cotizacion por email (48hrs).', en: 'Broadest coverage in special endorsements. International experience in mega projects. Extraordinary expense clause with higher sublimits. Quote process via email (48hrs).' },
    cnsf: '',
  },
  {
    id: 'zurich',
    name: 'Zurich Mexico',
    color: '#0060AE',
    matchScore: 82,
    method: 'email',
    rationale: { es: 'Precio competitivo en prima neta. Buena experiencia en obras de infraestructura. ATENCION: historicamente excluye daños por vibracion en obras carreteras, verificar condiciones.', en: 'Competitive net premium pricing. Good experience in infrastructure projects. WARNING: historically excludes vibration damage in highway projects, verify terms.' },
    cnsf: '',
  },
]

export interface SuretyCarrier {
  id: string
  name: string
  color: string
  matchScore: number
  method: 'portal' | 'email'
  rationale: BiStr
}

export const suretyCarriers: SuretyCarrier[] = [
  {
    id: 'aserta',
    name: 'Afianzadora Aserta',
    color: '#2E7D32',
    matchScore: 92,
    method: 'email',
    rationale: { es: 'Lider en fianzas de obra publica (parte de Grupo Financiero Banorte). Proceso agil para montos superiores a Mex$50M. Ya tiene linea aprobada para Constructora del Pacifico. Tiempo de emision estimado: 12 dias.', en: 'Leader in public works surety bonds (part of Grupo Financiero Banorte). Agile process for amounts over Mex$50M. Already has an approved line for Constructora del Pacifico. Estimated issuance time: 12 days.' },
  },
  {
    id: 'dorama',
    name: 'Fianzas Dorama',
    color: '#1565C0',
    matchScore: 85,
    method: 'email',
    rationale: { es: 'Primas competitivas en fianzas de cumplimiento. Buena presencia en el noroccidente. Requiere estados financieros actualizados. Tiempo de emision estimado: 15 dias.', en: 'Competitive premiums for performance bonds. Strong presence in the northwestern region. Requires updated financial statements. Estimated issuance time: 15 days.' },
  },
]

// ---- QUOTES (Mexican format) ----
export interface InsuranceQuote {
  carrier: string
  carrierId: string
  primaNeta: number
  gastosExpedicion: number
  iva: number
  primaTotal: number
  vigencia: string
  deductibles: {
    rcGeneral: string
    equipoConstruccion: string
    respPatronal: string
    todoRiesgo: string
  }
  endosos: BiStr[]
  exclusiones: BiStr[]
  arrivalTime: string
  cnsf: string
}

export const quotes: Record<string, InsuranceQuote> = {
  mapfre: {
    carrier: 'Mapfre Mexico',
    carrierId: 'mapfre',
    primaNeta: 729310,
    gastosExpedicion: 43759,
    iva: 123691,
    primaTotal: 847000,
    vigencia: 'Desde las 12:00 hrs. del 15/04/2026 hasta las 12:00 hrs. del 15/04/2028',
    deductibles: {
      rcGeneral: '5% del monto del siniestro, minimo Mex$50,000',
      equipoConstruccion: '10% del monto del siniestro, minimo Mex$100,000',
      respPatronal: 'Sin deducible',
      todoRiesgo: '10% del monto del siniestro, minimo Mex$250,000',
    },
    endosos: [
      { es: 'Endoso 001 — Huelga, Motin y Alboroto Popular', en: 'Endorsement 001 — Strike, Riot and Civil Commotion' },
      { es: 'Endoso 002 — Responsabilidad Civil Cruzada', en: 'Endorsement 002 — Cross Liability' },
      { es: 'Endoso 008 — Cobertura de Zonas Sismicas', en: 'Endorsement 008 — Seismic Zone Coverage' },
      { es: 'Endoso 012 — Remocion de Escombros (Mex$5,000,000 sublimite)', en: 'Endorsement 012 — Debris Removal (Mex$5,000,000 sublimit)' },
      { es: 'Endoso 015 — Extension de Mantenimiento 12 meses', en: 'Endorsement 015 — 12-Month Maintenance Extension' },
    ],
    exclusiones: [],
    arrivalTime: '5 dias',
    cnsf: '',
  },
  gnp: {
    carrier: 'GNP Seguros',
    carrierId: 'gnp',
    primaNeta: 795690,
    gastosExpedicion: 47741,
    iva: 134949,
    primaTotal: 923000,
    vigencia: 'Desde las 12:00 hrs. del 15/04/2026 hasta las 12:00 hrs. del 15/04/2028',
    deductibles: {
      rcGeneral: '5% del monto del siniestro, minimo Mex$75,000',
      equipoConstruccion: '10% del monto del siniestro, minimo Mex$150,000',
      respPatronal: 'Sin deducible',
      todoRiesgo: '10% del monto del siniestro, minimo Mex$300,000',
    },
    endosos: [
      { es: 'Endoso 001 — Huelga, Motin y Alboroto Popular', en: 'Endorsement 001 — Strike, Riot and Civil Commotion' },
      { es: 'Endoso 002 — Responsabilidad Civil Cruzada', en: 'Endorsement 002 — Cross Liability' },
      { es: 'Endoso 005 — Error de Diseño (sublimite Mex$3,000,000)', en: 'Endorsement 005 — Design Error (sublimit Mex$3,000,000)' },
      { es: 'Endoso 008 — Cobertura de Zonas Sismicas', en: 'Endorsement 008 — Seismic Zone Coverage' },
      { es: 'Endoso 010 — Propiedad Existente Circundante', en: 'Endorsement 010 — Existing Surrounding Property' },
      { es: 'Endoso 012 — Remocion de Escombros (Mex$5,000,000 sublimite)', en: 'Endorsement 012 — Debris Removal (Mex$5,000,000 sublimit)' },
      { es: 'Endoso 015 — Extension de Mantenimiento 12 meses', en: 'Endorsement 015 — 12-Month Maintenance Extension' },
    ],
    exclusiones: [],
    arrivalTime: '7 dias',
    cnsf: '',
  },
  chubb: {
    carrier: 'Chubb Mexico',
    carrierId: 'chubb',
    primaNeta: 951724,
    gastosExpedicion: 57103,
    iva: 161413,
    primaTotal: 1105000,
    vigencia: 'Desde las 12:00 hrs. del 15/04/2026 hasta las 12:00 hrs. del 15/04/2028',
    deductibles: {
      rcGeneral: '3% del monto del siniestro, minimo Mex$40,000',
      equipoConstruccion: '8% del monto del siniestro, minimo Mex$80,000',
      respPatronal: 'Sin deducible',
      todoRiesgo: '8% del monto del siniestro, minimo Mex$200,000',
    },
    endosos: [
      { es: 'Endoso 001 — Huelga, Motin y Alboroto Popular', en: 'Endorsement 001 — Strike, Riot and Civil Commotion' },
      { es: 'Endoso 002 — Responsabilidad Civil Cruzada', en: 'Endorsement 002 — Cross Liability' },
      { es: 'Endoso 003 — Gastos Extraordinarios por Aceleracion', en: 'Endorsement 003 — Extraordinary Acceleration Expenses' },
      { es: 'Endoso 005 — Error de Diseño (sublimite Mex$5,000,000)', en: 'Endorsement 005 — Design Error (sublimit Mex$5,000,000)' },
      { es: 'Endoso 007 — Daños a Propiedad Circundante', en: 'Endorsement 007 — Surrounding Property Damage' },
      { es: 'Endoso 008 — Cobertura de Zonas Sismicas', en: 'Endorsement 008 — Seismic Zone Coverage' },
      { es: 'Endoso 010 — Propiedad Existente Circundante', en: 'Endorsement 010 — Existing Surrounding Property' },
      { es: 'Endoso 012 — Remocion de Escombros (Mex$8,000,000 sublimite)', en: 'Endorsement 012 — Debris Removal (Mex$8,000,000 sublimit)' },
      { es: 'Endoso 014 — Vibracion, Remocion de Soporte', en: 'Endorsement 014 — Vibration, Removal of Support' },
      { es: 'Endoso 015 — Extension de Mantenimiento 12 meses', en: 'Endorsement 015 — 12-Month Maintenance Extension' },
      { es: 'Endoso 018 — Cobertura de Terrorismo', en: 'Endorsement 018 — Terrorism Coverage' },
    ],
    exclusiones: [],
    arrivalTime: '10 dias',
    cnsf: '',
  },
  zurich: {
    carrier: 'Zurich Mexico',
    carrierId: 'zurich',
    primaNeta: 767241,
    gastosExpedicion: 46034,
    iva: 130125,
    primaTotal: 891000,
    vigencia: 'Desde las 12:00 hrs. del 15/04/2026 hasta las 12:00 hrs. del 15/04/2028',
    deductibles: {
      rcGeneral: '5% del monto del siniestro, minimo Mex$60,000',
      equipoConstruccion: '10% del monto del siniestro, minimo Mex$120,000',
      respPatronal: 'Sin deducible',
      todoRiesgo: '12% del monto del siniestro, minimo Mex$350,000',
    },
    endosos: [
      { es: 'Endoso 001 — Huelga, Motin y Alboroto Popular', en: 'Endorsement 001 — Strike, Riot and Civil Commotion' },
      { es: 'Endoso 002 — Responsabilidad Civil Cruzada', en: 'Endorsement 002 — Cross Liability' },
      { es: 'Endoso 008 — Cobertura de Zonas Sismicas', en: 'Endorsement 008 — Seismic Zone Coverage' },
      { es: 'Endoso 012 — Remocion de Escombros (Mex$5,000,000 sublimite)', en: 'Endorsement 012 — Debris Removal (Mex$5,000,000 sublimit)' },
      { es: 'Endoso 015 — Extension de Mantenimiento 12 meses', en: 'Endorsement 015 — 12-Month Maintenance Extension' },
    ],
    exclusiones: [
      { es: 'Daños causados por vibracion, remocion o debilitamiento de soporte', en: 'Damage caused by vibration, removal or weakening of support' },
      { es: 'Daños a propiedades circundantes por asentamientos de terreno', en: 'Damage to surrounding properties from ground settlement' },
    ],
    arrivalTime: '8 dias',
    cnsf: '',
  },
}

export interface SuretyQuote {
  carrier: string
  carrierId: string
  fianzaCumplimiento: {
    montoAfianzado: number
    prima: number
  }
  fianzaBuenaCalidad: {
    montoAfianzado: number
    prima: number
  }
  fianzaAnticipo: {
    montoAfianzado: number
    prima: number
  }
  primaTotal: number
  gastosExpedicion?: number
  iva: number
  totalConIva: number
  arrivalTime: string
}

export const suretyQuotes: Record<string, SuretyQuote> = {
  aserta: {
    carrier: 'Afianzadora Aserta',
    carrierId: 'aserta',
    fianzaCumplimiento: {
      montoAfianzado: 50000000,
      prima: 600000,
    },
    fianzaBuenaCalidad: {
      montoAfianzado: 50000000,
      prima: 550000,
    },
    fianzaAnticipo: {
      montoAfianzado: 75000000,
      prima: 900000,
    },
    primaTotal: 2050000,
    gastosExpedicion: 123000,
    iva: 347680,
    totalConIva: 2520680,
    arrivalTime: '12 dias',
  },
  dorama: {
    carrier: 'Fianzas Dorama',
    carrierId: 'dorama',
    fianzaCumplimiento: {
      montoAfianzado: 50000000,
      prima: 650000,
    },
    fianzaBuenaCalidad: {
      montoAfianzado: 45000000, // SHORT — only Mex$45M instead of Mex$50M required
      prima: 600000,
    },
    fianzaAnticipo: {
      montoAfianzado: 75000000,
      prima: 975000,
    },
    primaTotal: 2225000,
    gastosExpedicion: 0,
    iva: 508000,
    totalConIva: 2733000,
    arrivalTime: '15 dias',
  },
}

// ---- NEGOTIATION PROPOSALS ----
export interface NegotiationProposal {
  id: string
  carrier: string
  carrierId: string
  issue: BiStr
  proposal: BiStr
  estimatedImpact: BiStr
}

export const negotiations: NegotiationProposal[] = [
  {
    id: 'neg-1',
    carrier: 'Zurich Mexico',
    carrierId: 'zurich',
    issue: { es: 'Exclusion de daños por vibracion', en: 'Vibration damage exclusion' },
    proposal: { es: 'Solicitar la inclusion del Endoso 014 — Vibracion, Remocion o Debilitamiento de Soporte, con un sublimite de Mex$10,000,000 y deducible del 15%. Argumentar que el proyecto involucra trabajos de terraceria en zonas pobladas donde la vibracion es un riesgo operativo inherente y que el contrato lo requiere implicitamente en la clausula 7.1.', en: 'Request the inclusion of Endorsement 014 — Vibration, Removal or Weakening of Support, with a sublimit of Mex$10,000,000 MXN and a 15% deductible. Argue that the project involves earthwork in populated areas where vibration is an inherent operational risk and that the contract implicitly requires this under clause 7.1.' },
    estimatedImpact: { es: 'Incremento estimado de prima: +Mex$45,000 a Mex$65,000 Prima total ajustada: ~Mex$945,000', en: 'Estimated premium increase: +Mex$45,000 to Mex$65,000 MXN. Adjusted total premium: ~Mex$945,000 MXN.' },
  },
  {
    id: 'neg-2',
    carrier: 'Mapfre Mexico',
    carrierId: 'mapfre',
    issue: { es: 'Deducible elevado en Todo Riesgo', en: 'High All-Risk deductible' },
    proposal: { es: 'Negociar reduccion del deducible de Todo Riesgo de Construccion del 10% actual a 8%, con minimo de Mex$200,000 (vs. Mex$250,000 actual). Justificar con el historial de siniestralidad favorable del cliente (EMR 0.85) y la experiencia en proyectos similares (Autopista Colima-Manzanillo completada sin siniestros mayores).', en: 'Negotiate reduction of the All-Risk Construction deductible from the current 10% to 8%, with a minimum of Mex$200,000 MXN (vs. current Mex$250,000). Justify with the client\'s favorable loss history (EMR 0.85) and experience on similar projects (Colima-Manzanillo Highway completed without major losses).' },
    estimatedImpact: { es: 'Incremento estimado de prima: +Mex$18,000 a Mex$25,000 Prima total ajustada: ~Mex$870,000', en: 'Estimated premium increase: +Mex$18,000 to Mex$25,000 MXN. Adjusted total premium: ~Mex$870,000 MXN.' },
  },
  {
    id: 'neg-3',
    carrier: 'GNP Seguros',
    carrierId: 'gnp',
    issue: { es: 'Limite de equipo de construccion insuficiente', en: 'Insufficient equipment coverage limit' },
    proposal: { es: 'Solicitar aumento del limite de la cobertura de Equipo de Construccion de Mex$15,000,000 a Mex$20,000,000 para cubrir adecuadamente la incorporacion de la grua Liebherr LTM 1100 (valor de reposicion: Mex$12,000,000) que actualmente no tiene poliza. El contrato (clausula 7.2) requiere cubrir "la totalidad de la maquinaria y equipo" incluyendo equipo arrendado.', en: 'Request an increase of the Construction Equipment coverage limit from Mex$15,000,000 to Mex$20,000,000 MXN to adequately cover the addition of the Liebherr LTM 1100 crane (replacement value: Mex$12,000,000 MXN) currently uninsured. The contract (clause 7.2) requires covering "all machinery and equipment" including leased equipment.' },
    estimatedImpact: { es: 'Incremento estimado de prima: +Mex$32,000 a Mex$40,000 Prima total ajustada: ~Mex$958,000', en: 'Estimated premium increase: +Mex$32,000 to Mex$40,000 MXN. Adjusted total premium: ~Mex$958,000 MXN.' },
  },
  {
    id: 'neg-4',
    carrier: 'Fianzas Dorama',
    carrierId: 'dorama',
    issue: { es: 'Monto de fianza de buena calidad insuficiente', en: 'Insufficient quality guarantee bond amount' },
    proposal: { es: 'El monto afianzado para la Fianza de Buena Calidad de Obra es de Mex$45,000,000, pero el contrato (clausula 8.2) requiere el 10% del valor del contrato, es decir, Mex$50,000,000 Solicitar incremento del monto afianzado a Mex$50,000,000 para cumplir con el requisito contractual. El monto actual dejaria un faltante de Mex$5,000,000', en: 'The bonded amount for the Quality Guarantee Bond is Mex$45,000,000 MXN, but the contract (clause 8.2) requires 10% of the contract value, i.e., Mex$50,000,000 MXN. Request an increase of the bonded amount to Mex$50,000,000 MXN to meet the contractual requirement. The current amount would leave a shortfall of Mex$5,000,000 MXN.' },
    estimatedImpact: { es: 'Incremento estimado de prima: +Mex$16,500 Prima total ajustada de buena calidad: ~Mex$165,000', en: 'Estimated premium increase: +Mex$16,500 MXN. Adjusted quality guarantee bond premium: ~Mex$165,000 MXN.' },
  },
]

// ---- PORTAL FORM FIELDS (carrier portal simulation) ----
export interface PortalField {
  label: BiStr
  value: string | BiStr
  section?: BiStr
}

export const qualitasPortalFields: PortalField[] = [
  { label: { es: 'Clave de Agente', en: 'Agent Code' }, value: 'ALY-2847', section: { es: 'Datos del Agente', en: 'Agent Details' } },
  { label: { es: 'Numero de Cuenta', en: 'Account Number' }, value: '0029-4521-GDL', section: { es: 'Datos del Agente', en: 'Agent Details' } },
  { label: { es: 'Sucursal', en: 'Branch' }, value: 'Guadalajara Poniente', section: { es: 'Datos del Agente', en: 'Agent Details' } },
  { label: { es: 'Tipo de Seguro', en: 'Insurance Type' }, value: { es: 'Todo Riesgo de Construccion', en: 'All Risk Construction' }, section: { es: 'Datos de la Poliza', en: 'Policy Details' } },
  { label: { es: 'Ramo', en: 'Line of Business' }, value: { es: 'Daños — Construccion', en: 'Property — Construction' }, section: { es: 'Datos de la Poliza', en: 'Policy Details' } },
  { label: { es: 'Moneda', en: 'Currency' }, value: { es: 'Moneda Nacional (MXN)', en: 'National Currency (MXN)' }, section: { es: 'Datos de la Poliza', en: 'Policy Details' } },
  { label: { es: 'Contratante', en: 'Policyholder' }, value: 'Constructora del Pacifico S.A. de C.V.', section: { es: 'Datos del Asegurado', en: 'Insured Details' } },
  { label: { es: 'RFC', en: 'Tax ID' }, value: 'CPE-190315-AB1', section: { es: 'Datos del Asegurado', en: 'Insured Details' } },
  { label: { es: 'Domicilio Fiscal', en: 'Fiscal Address' }, value: 'Blvd. Puerta de Hierro 5065, Col. Puerta de Hierro, C.P. 45116, Zapopan, Jal.', section: { es: 'Datos del Asegurado', en: 'Insured Details' } },
  { label: { es: 'Giro', en: 'Business Activity' }, value: { es: 'Construccion de obras de ingenieria civil', en: 'Civil engineering construction' }, section: { es: 'Datos del Asegurado', en: 'Insured Details' } },
  { label: { es: 'Descripcion del Proyecto', en: 'Project Description' }, value: { es: 'Construccion y modernizacion de Autopista Guadalajara-Tepic, 167 km', en: 'Construction and modernization of Guadalajara-Tepic Highway, 167 km' }, section: { es: 'Datos del Riesgo', en: 'Risk Details' } },
  { label: { es: 'Ubicacion del Riesgo', en: 'Risk Location' }, value: 'Autopista Guadalajara-Tepic, Jalisco-Nayarit', section: { es: 'Datos del Riesgo', en: 'Risk Details' } },
  { label: { es: 'Suma Asegurada', en: 'Sum Insured' }, value: 'Mex$50,000,000.00 M.N.', section: { es: 'Datos del Riesgo', en: 'Risk Details' } },
  { label: { es: 'Vigencia Desde', en: 'Valid From' }, value: '12:00 hrs. del 15/04/2026', section: { es: 'Datos del Riesgo', en: 'Risk Details' } },
  { label: { es: 'Vigencia Hasta', en: 'Valid Until' }, value: '12:00 hrs. del 15/04/2028', section: { es: 'Datos del Riesgo', en: 'Risk Details' } },
  { label: { es: 'Periodo de Construccion', en: 'Construction Period' }, value: { es: '24 meses', en: '24 months' }, section: { es: 'Datos del Riesgo', en: 'Risk Details' } },
  { label: { es: 'Periodo de Mantenimiento', en: 'Maintenance Period' }, value: { es: '12 meses', en: '12 months' }, section: { es: 'Datos del Riesgo', en: 'Risk Details' } },
  { label: { es: 'Forma de Pago', en: 'Payment Method' }, value: { es: 'Trimestral (4 exhibiciones)', en: 'Quarterly (4 installments)' }, section: { es: 'Datos de Pago', en: 'Payment Details' } },
  { label: { es: 'Beneficiario Preferente', en: 'Preferred Beneficiary' }, value: { es: 'Secretaria de Infraestructura y Obra Publica de Jalisco', en: 'Jalisco Dept. of Infrastructure and Public Works' }, section: { es: 'Datos de Pago', en: 'Payment Details' } },
]

// ---- CARATULA (Policy cover page) ----
export interface CoberturaDetalle {
  nombre: BiStr
  lmr: string | BiStr
  deducible: string | BiStr
  prima: number
}

export interface CaratulaData {
  numPoliza: string
  fechaEmision: string
  vigenciaDesde: string
  vigenciaHasta: string
  contratante: {
    name: string
    rfc: string
    domicilio: string
    estado: string
    cp: string
    telefono: string
    email: string
  }
  asegurado: {
    name: string
    rfc: string
  }
  coberturas: CoberturaDetalle[]
  financials: {
    primaNeta: number
    gastosExpedicion: number
    recargoFraccionado: number
    iva: number
    primaTotal: number
    primerRecibo: number
    recibosSubsecuentes: number
  }
  condusef: string
  cnsf: string
  articulo25: BiStr
}

export const caratulaData: CaratulaData = {
  numPoliza: 'MAP-TR-2026-047823',
  fechaEmision: '15/04/2026',
  vigenciaDesde: '12:00 hrs. del 15/04/2026',
  vigenciaHasta: '12:00 hrs. del 15/04/2028',
  contratante: {
    name: 'Constructora del Pacifico S.A. de C.V.',
    rfc: 'CPE-190315-AB1',
    domicilio: 'Boulevard Puerta de Hierro No. 5065, Col. Puerta de Hierro',
    estado: 'Zapopan, Jalisco',
    cp: '45116',
    telefono: '(33) 3615-2847',
    email: 'carlos.martinez@constructorapacifico.com.mx',
  },
  asegurado: {
    name: 'Constructora del Pacifico S.A. de C.V.',
    rfc: 'CPE-190315-AB1',
  },
  coberturas: [
    { nombre: { es: 'Responsabilidad Civil General', en: 'General Liability' }, lmr: 'Mex$5,000,000.00 M.N.', deducible: '5% min. Mex$50,000', prima: 89500 },
    { nombre: { es: 'Equipo de Construccion', en: 'Construction Equipment' }, lmr: 'Mex$120,000,000.00 M.N.', deducible: '10% min. Mex$100,000', prima: 142300 },
    { nombre: { es: 'Responsabilidad Patronal', en: "Employer's Liability" }, lmr: 'Mex$2,000,000.00 M.N.', deducible: { es: 'Sin deducible', en: 'No deductible' }, prima: 38700 },
    { nombre: { es: 'Todo Riesgo de Construccion (CAR)', en: 'Contractors All Risks (CAR)' }, lmr: 'Mex$50,000,000.00 M.N.', deducible: '10% min. Mex$250,000', prima: 385810 },
    { nombre: { es: 'Remocion de Escombros (sublimite)', en: 'Debris Removal (sublimit)' }, lmr: 'Mex$5,000,000.00 M.N.', deducible: '10% min. Mex$100,000', prima: 28400 },
    { nombre: { es: 'Gastos Extraordinarios', en: 'Extraordinary Expenses' }, lmr: 'Mex$3,000,000.00 M.N.', deducible: '20%', prima: 22100 },
    { nombre: { es: 'Extension de Mantenimiento', en: 'Maintenance Extension' }, lmr: { es: 'Incluida (12 meses)', en: 'Included (12 months)' }, deducible: '10% min. Mex$250,000 M.N.', prima: 22500 },
  ],
  financials: {
    primaNeta: 729310,
    gastosExpedicion: 43759,
    recargoFraccionado: 36466,
    iva: 129494,
    primaTotal: 939029,
    primerRecibo: 282029,
    recibosSubsecuentes: 219000,
  },
  condusef: 'CONDUSEF: Tel. 800 999 8080 | www.condusef.gob.mx',
  cnsf: '',
  articulo25: { es: 'De acuerdo con el Articulo 25 de la Ley Sobre el Contrato de Seguro, el contratante o asegurado dispondra de un plazo de 30 (treinta) dias naturales, contados a partir de la entrega de la poliza, para solicitar rectificaciones o aclaraciones de la misma.', en: 'In accordance with Article 25 of the Insurance Contract Law, the policyholder or insured shall have a period of 30 (thirty) calendar days, counted from the delivery of the policy, to request rectifications or clarifications thereof.' },
}

// ---- COMPARISON MATRIX DATA ----
export type CellStatus = 'cumple' | 'excede' | 'insuficiente' | 'no-incluido' | 'exclusion'

export interface MatrixCell {
  value: BiStr
  status: CellStatus
  tooltip?: BiStr
}

export interface ComparisonRow {
  coverage: BiStr
  required: string | BiStr
  mapfre: MatrixCell
  gnp: MatrixCell
  chubb: MatrixCell
  zurich: MatrixCell
}

/** Legacy flat matrix (kept for backward compat) */
export const comparisonMatrix: { rows: ComparisonRow[] } = {
  rows: [], // See comparisonMatrixGrouped below
}

export interface ComparisonGroup {
  group: BiStr
  rows: ComparisonRow[]
}

export const comparisonMatrixGrouped: ComparisonGroup[] = [
  {
    group: { es: 'Coberturas y Limites', en: 'Coverage & Limits' },
    rows: [
      {
        coverage: { es: 'RC General', en: 'General Liability' },
        required: 'Mex$5,000,000',
        mapfre: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo requerido', en: 'Meets the minimum requirement exactly' } },
        gnp: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo requerido', en: 'Meets the minimum requirement exactly' } },
        chubb: { value: { es: 'Mex$7,500,000', en: 'Mex$7,500,000' }, status: 'excede', tooltip: { es: 'Excede el minimo requerido en Mex$2,500,000', en: 'Exceeds the minimum by Mex$2,500,000' } },
        zurich: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo requerido', en: 'Meets the minimum requirement exactly' } },
      },
      {
        coverage: { es: 'Equipo de Construccion', en: 'Construction Equipment' },
        required: 'Mex$120,000,000',
        mapfre: { value: { es: 'Mex$120,000,000', en: 'Mex$120,000,000' }, status: 'cumple', tooltip: { es: 'Cumple con el valor maximo en sitio estimado', en: 'Meets the estimated maximum on-site value' } },
        gnp: { value: { es: 'Mex$120,000,000', en: 'Mex$120,000,000' }, status: 'cumple', tooltip: { es: 'Cumple con el valor maximo en sitio estimado', en: 'Meets the estimated maximum on-site value' } },
        chubb: { value: { es: 'Mex$150,000,000', en: 'Mex$150,000,000' }, status: 'excede', tooltip: { es: 'Excede el valor estimado, incluye equipo futuro', en: 'Exceeds estimated value, includes future equipment' } },
        zurich: { value: { es: 'Mex$100,000,000', en: 'Mex$100,000,000' }, status: 'insuficiente', tooltip: { es: 'Insuficiente: no cubre valor maximo en sitio de Mex$120M', en: 'Insufficient: does not cover maximum on-site value of Mex$120M' } },
      },
      {
        coverage: { es: 'Resp. Patronal', en: "Employer's Liability" },
        required: 'Mex$2,000,000',
        mapfre: { value: { es: 'Mex$2,000,000', en: 'Mex$2,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo requerido', en: 'Meets the minimum requirement exactly' } },
        gnp: { value: { es: 'Mex$2,000,000', en: 'Mex$2,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo requerido', en: 'Meets the minimum requirement exactly' } },
        chubb: { value: { es: 'Mex$3,000,000', en: 'Mex$3,000,000' }, status: 'excede', tooltip: { es: 'Excede el minimo requerido en Mex$1,000,000', en: 'Exceeds the minimum by Mex$1,000,000' } },
        zurich: { value: { es: 'Mex$2,000,000', en: 'Mex$2,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo requerido', en: 'Meets the minimum requirement exactly' } },
      },
      {
        coverage: { es: 'Todo Riesgo (CAR)', en: 'All Risks (CAR)' },
        required: 'Mex$50,000,000',
        mapfre: { value: { es: 'Mex$50,000,000', en: 'Mex$50,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo de clausula 14.3.2', en: 'Meets the exact minimum per clause 14.3.2' } },
        gnp: { value: { es: 'Mex$50,000,000', en: 'Mex$50,000,000' }, status: 'cumple', tooltip: { es: 'Cumple exactamente con el minimo de clausula 14.3.2', en: 'Meets the exact minimum per clause 14.3.2' } },
        chubb: { value: { es: 'Mex$60,000,000', en: 'Mex$60,000,000' }, status: 'excede', tooltip: { es: 'Excede el minimo requerido en Mex$10,000,000', en: 'Exceeds the minimum by Mex$10,000,000' } },
        zurich: { value: { es: 'Mex$50,000,000', en: 'Mex$50,000,000' }, status: 'cumple', tooltip: { es: 'Cumple monto pero tiene exclusion de vibracion', en: 'Meets amount but has vibration exclusion' } },
      },
      {
        coverage: { es: 'RC Ambiental', en: 'Environmental Liability' },
        required: 'Mex$10,000,000',
        mapfre: { value: { es: 'Mex$10,000,000', en: 'Mex$10,000,000' }, status: 'cumple', tooltip: { es: 'Cumple con el minimo requerido por Ley Federal de Responsabilidad Ambiental', en: 'Meets minimum required by Federal Environmental Liability Law' } },
        gnp: { value: { es: 'Mex$10,000,000', en: 'Mex$10,000,000' }, status: 'cumple', tooltip: { es: 'Cumple con el minimo requerido', en: 'Meets the minimum requirement' } },
        chubb: { value: { es: 'Mex$15,000,000', en: 'Mex$15,000,000' }, status: 'excede', tooltip: { es: 'Excede el minimo requerido en Mex$5,000,000', en: 'Exceeds the minimum by Mex$5,000,000' } },
        zurich: { value: { es: 'Mex$8,000,000', en: 'Mex$8,000,000' }, status: 'insuficiente', tooltip: { es: 'Insuficiente: no alcanza el minimo contractual de Mex$10M', en: 'Insufficient: does not reach the Mex$10M contractual minimum' } },
      },
      {
        coverage: { es: 'RC Profesional (E&O)', en: 'Professional Liability (E&O)' },
        required: 'Mex$3,000,000',
        mapfre: { value: { es: 'Mex$3,000,000', en: 'Mex$3,000,000' }, status: 'cumple', tooltip: { es: 'Cumple con clausula 14.3.1', en: 'Meets clause 14.3.1' } },
        gnp: { value: { es: 'Mex$3,000,000', en: 'Mex$3,000,000' }, status: 'cumple', tooltip: { es: 'Cumple con clausula 14.3.1', en: 'Meets clause 14.3.1' } },
        chubb: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'excede', tooltip: { es: 'Excede el minimo requerido en Mex$2,000,000', en: 'Exceeds the minimum by Mex$2,000,000' } },
        zurich: { value: { es: 'Mex$3,000,000', en: 'Mex$3,000,000' }, status: 'cumple', tooltip: { es: 'Cumple con el minimo requerido', en: 'Meets the minimum requirement' } },
      },
      {
        coverage: { es: 'Transporte de Carga', en: 'Cargo in Transit' },
        required: 'Mex$8,000,000',
        mapfre: { value: { es: 'Mex$8,000,000', en: 'Mex$8,000,000' }, status: 'cumple', tooltip: { es: 'Incluido como endoso a poliza de equipo', en: 'Included as endorsement to equipment policy' } },
        gnp: { value: { es: 'Mex$8,000,000', en: 'Mex$8,000,000' }, status: 'cumple', tooltip: { es: 'Poliza independiente de transporte', en: 'Standalone cargo transit policy' } },
        chubb: { value: { es: 'Mex$10,000,000', en: 'Mex$10,000,000' }, status: 'excede', tooltip: { es: 'Limite superior con cobertura multimodal', en: 'Higher limit with multimodal coverage' } },
        zurich: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'insuficiente', tooltip: { es: 'Insuficiente: limite por debajo del requerido de Mex$8M', en: 'Insufficient: limit below the required Mex$8M' } },
      },
      {
        coverage: { es: 'Remocion de Escombros', en: 'Debris Removal' },
        required: 'Mex$5,000,000',
        mapfre: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'cumple', tooltip: { es: 'Sublimite incluido en endoso 012', en: 'Sublimit included in endorsement 012' } },
        gnp: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'cumple', tooltip: { es: 'Sublimite incluido en endoso 012', en: 'Sublimit included in endorsement 012' } },
        chubb: { value: { es: 'Mex$8,000,000', en: 'Mex$8,000,000' }, status: 'excede', tooltip: { es: 'Sublimite superior al requerido', en: 'Sublimit exceeds requirement' } },
        zurich: { value: { es: 'Mex$5,000,000', en: 'Mex$5,000,000' }, status: 'cumple', tooltip: { es: 'Sublimite incluido en endoso 012', en: 'Sublimit included in endorsement 012' } },
      },
    ],
  },
  {
    group: { es: 'Deducibles y Condiciones', en: 'Deductibles & Terms' },
    rows: [
      {
        coverage: { es: 'Deducible RC General', en: 'General Liability Deductible' },
        required: { es: 'Lo mas bajo posible', en: 'As low as possible' },
        mapfre: { value: { es: '5% min. Mex$50K', en: '5% min. Mex$50K' }, status: 'cumple', tooltip: { es: 'Estandar de mercado', en: 'Market standard' } },
        gnp: { value: { es: '5% min. Mex$75K', en: '5% min. Mex$75K' }, status: 'cumple', tooltip: { es: 'Ligeramente superior al estandar', en: 'Slightly above standard' } },
        chubb: { value: { es: '3% min. Mex$40K', en: '3% min. Mex$40K' }, status: 'excede', tooltip: { es: 'Mejor deducible RC del mercado', en: 'Best liability deductible on the market' } },
        zurich: { value: { es: '5% min. Mex$60K', en: '5% min. Mex$60K' }, status: 'cumple', tooltip: { es: 'Estandar de mercado', en: 'Market standard' } },
      },
      {
        coverage: { es: 'Deducible Equipo', en: 'Equipment Deductible' },
        required: { es: 'Lo mas bajo posible', en: 'As low as possible' },
        mapfre: { value: { es: '10% min. Mex$100K', en: '10% min. Mex$100K' }, status: 'cumple', tooltip: { es: 'Estandar de mercado para equipo pesado', en: 'Market standard for heavy equipment' } },
        gnp: { value: { es: '10% min. Mex$150K', en: '10% min. Mex$150K' }, status: 'cumple', tooltip: { es: 'Superior al estandar', en: 'Above standard' } },
        chubb: { value: { es: '8% min. Mex$80K', en: '8% min. Mex$80K' }, status: 'excede', tooltip: { es: 'Deducible mas bajo disponible', en: 'Lowest deductible available' } },
        zurich: { value: { es: '10% min. Mex$120K', en: '10% min. Mex$120K' }, status: 'cumple', tooltip: { es: 'Estandar de mercado', en: 'Market standard' } },
      },
      {
        coverage: { es: 'Deducible Todo Riesgo', en: 'All-Risk Deductible' },
        required: { es: 'Lo mas bajo posible', en: 'As low as possible' },
        mapfre: { value: { es: '10% min. Mex$250K', en: '10% min. Mex$250K' }, status: 'cumple', tooltip: { es: 'Estandar de mercado', en: 'Market standard' } },
        gnp: { value: { es: '10% min. Mex$300K', en: '10% min. Mex$300K' }, status: 'cumple', tooltip: { es: 'Ligeramente superior al estandar', en: 'Slightly above standard' } },
        chubb: { value: { es: '8% min. Mex$200K', en: '8% min. Mex$200K' }, status: 'excede', tooltip: { es: 'Mejor deducible del mercado', en: 'Best deductible on the market' } },
        zurich: { value: { es: '12% min. Mex$350K', en: '12% min. Mex$350K' }, status: 'insuficiente', tooltip: { es: 'Deducible mas alto que el promedio del mercado', en: 'Deductible higher than market average' } },
      },
      {
        coverage: { es: 'Periodo de Mantenimiento', en: 'Maintenance Period' },
        required: { es: '12 meses', en: '12 months' },
        mapfre: { value: { es: '12 meses', en: '12 months' }, status: 'cumple', tooltip: { es: 'Endoso 015 incluido', en: 'Endorsement 015 included' } },
        gnp: { value: { es: '12 meses', en: '12 months' }, status: 'cumple', tooltip: { es: 'Endoso 015 incluido', en: 'Endorsement 015 included' } },
        chubb: { value: { es: '12 meses', en: '12 months' }, status: 'cumple', tooltip: { es: 'Endoso 015 incluido', en: 'Endorsement 015 included' } },
        zurich: { value: { es: '12 meses', en: '12 months' }, status: 'cumple', tooltip: { es: 'Endoso 015 incluido', en: 'Endorsement 015 included' } },
      },
      {
        coverage: { es: 'Escalamiento de Costos', en: 'Cost Escalation' },
        required: { es: 'Recomendado', en: 'Recommended' },
        mapfre: { value: { es: '10% sublimite', en: '10% sublimit' }, status: 'cumple', tooltip: { es: 'Sublimite del 10% sobre suma asegurada para escalamiento inflacionario', en: '10% sublimit on sum insured for inflationary escalation' } },
        gnp: { value: { es: '10% sublimite', en: '10% sublimit' }, status: 'cumple', tooltip: { es: 'Sublimite del 10% sobre suma asegurada', en: '10% sublimit on sum insured' } },
        chubb: { value: { es: '15% sublimite', en: '15% sublimit' }, status: 'excede', tooltip: { es: 'Sublimite mas alto del mercado para escalamiento', en: 'Highest market sublimit for escalation' } },
        zurich: { value: { es: 'No incluido', en: 'Not included' }, status: 'no-incluido', tooltip: { es: 'No ofrecen cobertura de escalamiento automatica', en: 'No automatic escalation coverage offered' } },
      },
      {
        coverage: { es: 'Vibracion y Remocion de Soporte', en: 'Vibration & Removal of Support' },
        required: { es: 'Requerido', en: 'Required' },
        mapfre: { value: { es: 'No incluido', en: 'Not included' }, status: 'no-incluido', tooltip: { es: 'No incluido en cotizacion base, se puede agregar por prima adicional', en: 'Not included in base quote, can be added for additional premium' } },
        gnp: { value: { es: 'No incluido', en: 'Not included' }, status: 'no-incluido', tooltip: { es: 'No incluido en cotizacion base, se puede agregar', en: 'Not included in base quote, can be added' } },
        chubb: { value: { es: 'Incluido', en: 'Included' }, status: 'cumple', tooltip: { es: 'Endoso 014 incluido sin costo adicional — cobertura completa de vibracion, remocion y debilitamiento de soporte', en: 'Endorsement 014 included at no additional cost — full vibration, removal and weakening of support coverage' } },
        zurich: { value: { es: 'EXCLUIDO', en: 'EXCLUDED' }, status: 'exclusion', tooltip: { es: 'ALERTA CRITICA: Exclusion expresa de daños por vibracion, remocion o debilitamiento de soporte. Riesgo inaceptable para obra carretera con trabajos de terraceria en zonas pobladas. La vibracion es inherente a este tipo de proyecto.', en: 'CRITICAL ALERT: Express exclusion of vibration, removal or weakening of support damage. Unacceptable risk for highway project with earthwork in populated areas. Vibration is inherent to this type of project.' } },
      },
    ],
  },
  {
    group: { es: 'Prima y Condiciones de Pago', en: 'Premium & Payment' },
    rows: [
      {
        coverage: { es: 'Prima CAR (Todo Riesgo)', en: 'CAR Premium (All Risks)' },
        required: '-',
        mapfre: { value: { es: 'Mex$385,810', en: 'Mex$385,810' }, status: 'excede', tooltip: { es: 'Precio mas competitivo en CAR', en: 'Most competitive CAR price' } },
        gnp: { value: { es: 'Mex$420,000', en: 'Mex$420,000' }, status: 'cumple', tooltip: { es: 'Precio intermedio', en: 'Mid-range price' } },
        chubb: { value: { es: 'Mex$510,000', en: 'Mex$510,000' }, status: 'insuficiente', tooltip: { es: 'Mas alto pero coberturas mas amplias', en: 'Higher but broader coverage' } },
        zurich: { value: { es: 'Mex$400,000', en: 'Mex$400,000' }, status: 'cumple', tooltip: { es: 'Buen precio pero con exclusiones', en: 'Good price but with exclusions' } },
      },
      {
        coverage: { es: 'Prima RC General', en: 'General Liability Premium' },
        required: '-',
        mapfre: { value: { es: 'Mex$89,500', en: 'Mex$89,500' }, status: 'cumple' },
        gnp: { value: { es: 'Mex$98,000', en: 'Mex$98,000' }, status: 'cumple' },
        chubb: { value: { es: 'Mex$115,000', en: 'Mex$115,000' }, status: 'cumple' },
        zurich: { value: { es: 'Mex$95,000', en: 'Mex$95,000' }, status: 'cumple' },
      },
      {
        coverage: { es: 'Prima Equipo', en: 'Equipment Premium' },
        required: '-',
        mapfre: { value: { es: 'Mex$142,300', en: 'Mex$142,300' }, status: 'cumple' },
        gnp: { value: { es: 'Mex$155,000', en: 'Mex$155,000' }, status: 'cumple' },
        chubb: { value: { es: 'Mex$180,000', en: 'Mex$180,000' }, status: 'cumple' },
        zurich: { value: { es: 'Mex$150,000', en: 'Mex$150,000' }, status: 'cumple' },
      },
      {
        coverage: { es: 'Prima Resp. Patronal', en: "Employer's Liability Premium" },
        required: '-',
        mapfre: { value: { es: 'Mex$38,700', en: 'Mex$38,700' }, status: 'cumple' },
        gnp: { value: { es: 'Mex$42,000', en: 'Mex$42,000' }, status: 'cumple' },
        chubb: { value: { es: 'Mex$48,000', en: 'Mex$48,000' }, status: 'cumple' },
        zurich: { value: { es: 'Mex$40,000', en: 'Mex$40,000' }, status: 'cumple' },
      },
      {
        coverage: { es: 'Gastos de Expedicion', en: 'Issuance Fees' },
        required: '-',
        mapfre: { value: { es: 'Mex$43,759 (6%)', en: 'Mex$43,759 (6%)' }, status: 'cumple' },
        gnp: { value: { es: 'Mex$47,741 (6%)', en: 'Mex$47,741 (6%)' }, status: 'cumple' },
        chubb: { value: { es: 'Mex$57,103 (6%)', en: 'Mex$57,103 (6%)' }, status: 'cumple' },
        zurich: { value: { es: 'Mex$46,034 (6%)', en: 'Mex$46,034 (6%)' }, status: 'cumple' },
      },
      {
        coverage: { es: 'IVA (16%)', en: 'VAT (16%)' },
        required: '-',
        mapfre: { value: { es: 'Mex$123,691', en: 'Mex$123,691' }, status: 'cumple' },
        gnp: { value: { es: 'Mex$134,949', en: 'Mex$134,949' }, status: 'cumple' },
        chubb: { value: { es: 'Mex$161,413', en: 'Mex$161,413' }, status: 'cumple' },
        zurich: { value: { es: 'Mex$130,125', en: 'Mex$130,125' }, status: 'cumple' },
      },
      {
        coverage: { es: 'Prima Total (con IVA)', en: 'Total Premium (incl. VAT)' },
        required: '-',
        mapfre: { value: { es: 'Mex$847,000', en: 'Mex$847,000' }, status: 'excede', tooltip: { es: 'Precio mas competitivo', en: 'Most competitive price' } },
        gnp: { value: { es: 'Mex$923,000', en: 'Mex$923,000' }, status: 'cumple', tooltip: { es: 'Precio intermedio', en: 'Mid-range price' } },
        chubb: { value: { es: 'Mex$1,105,000', en: 'Mex$1,105,000' }, status: 'insuficiente', tooltip: { es: 'Precio mas alto pero coberturas mas amplias', en: 'Highest price but broadest coverage' } },
        zurich: { value: { es: 'Mex$891,000', en: 'Mex$891,000' }, status: 'cumple', tooltip: { es: 'Buen precio pero con exclusiones criticas', en: 'Good price but with critical exclusions' } },
      },
      {
        coverage: { es: 'Forma de Pago', en: 'Payment Terms' },
        required: { es: 'Trimestral', en: 'Quarterly' },
        mapfre: { value: { es: 'Trimestral (4 exhibiciones)', en: 'Quarterly (4 installments)' }, status: 'cumple', tooltip: { es: 'Sin recargo por pago fraccionado', en: 'No surcharge for installment payment' } },
        gnp: { value: { es: 'Trimestral (4 exhibiciones)', en: 'Quarterly (4 installments)' }, status: 'cumple', tooltip: { es: 'Recargo 5% por fraccionamiento', en: '5% surcharge for installments' } },
        chubb: { value: { es: 'Semestral (2 exhibiciones)', en: 'Semi-annual (2 installments)' }, status: 'insuficiente', tooltip: { es: 'Solo ofrecen pago semestral o anual', en: 'Only semi-annual or annual payment offered' } },
        zurich: { value: { es: 'Trimestral (4 exhibiciones)', en: 'Quarterly (4 installments)' }, status: 'cumple', tooltip: { es: 'Recargo 3% por fraccionamiento', en: '3% surcharge for installments' } },
      },
    ],
  },
]

// ---- PIPELINE DATA (for dashboard) ----
export interface PipelineProject {
  id: number
  client: string
  project: BiStr
  premium: number
  stage: string
  stageLabel: BiStr
  daysInStage: number
  alert?: boolean
}

export const pipelineProjects: PipelineProject[] = [
  { id: 1, client: 'Constructora del Pacifico', project: { es: 'Autopista GDL-Tepic', en: 'GDL-Tepic Highway' }, premium: 3367680, stage: 'new', stageLabel: { es: 'Nueva Solicitud', en: 'New Request' }, daysInStage: 0, alert: true },
  { id: 2, client: 'Grupo ICA', project: { es: 'Metro Linea 4 CDMX', en: 'Metro Line 4 CDMX' }, premium: 8900000, stage: 'quoting', stageLabel: { es: 'Cotizando', en: 'Quoting' }, daysInStage: 3 },
  { id: 3, client: 'CEMEX', project: { es: 'Planta Monterrey Expansion', en: 'Monterrey Plant Expansion' }, premium: 1450000, stage: 'comparison', stageLabel: { es: 'Comparativo Enviado', en: 'Comparison Sent' }, daysInStage: 5 },
  { id: 4, client: 'Constructora Reforma', project: { es: 'Torre Diana CDMX', en: 'Diana Tower CDMX' }, premium: 2800000, stage: 'negotiating', stageLabel: { es: 'En Negociacion', en: 'Negotiating' }, daysInStage: 8 },
  { id: 5, client: 'Grupo Carso', project: { es: 'Centro Comercial Perisur', en: 'Perisur Shopping Center' }, premium: 1200000, stage: 'placed', stageLabel: { es: 'Poliza Emitida', en: 'Policy Issued' }, daysInStage: 15 },
  { id: 6, client: 'Constructora Norte', project: { es: 'Puente Industrial Saltillo', en: 'Saltillo Industrial Bridge' }, premium: 980000, stage: 'active', stageLabel: { es: 'Vigente', en: 'Active' }, daysInStage: 45 },
  { id: 7, client: 'Gobierno de Jalisco', project: { es: 'Mantenimiento Carreteras', en: 'Highway Maintenance' }, premium: 1850000, stage: 'renewal', stageLabel: { es: 'Renovacion (30 dias)', en: 'Renewal (30 days)' }, daysInStage: 0, alert: true },
  { id: 8, client: 'Constructora del Valle', project: { es: 'Hospital Regional Tepic', en: 'Tepic Regional Hospital' }, premium: 1650000, stage: 'submitted', stageLabel: { es: 'Enviado a Aseguradoras', en: 'Submitted to Carriers' }, daysInStage: 2 },
]

// ---- SUBMISSION PACKAGE DOCUMENTS ----
export interface SubmissionDocument {
  id: number
  category: BiStr
  name: BiStr
  filename: string | null
  size: string | null
  status: 'received' | 'pending'
  date: string | null
}

export const submissionDocuments: SubmissionDocument[] = [
  { id: 1, category: { es: 'Proyecto', en: 'Project' }, name: { es: 'Contrato MSA', en: 'MSA Contract' }, filename: 'Contrato_MSA_Autopista_GDL_Tepic.pdf', size: '2.4 MB', status: 'received', date: '09/04/2026' },
  { id: 2, category: { es: 'Proyecto', en: 'Project' }, name: { es: 'Presupuesto Detallado', en: 'Detailed Budget' }, filename: 'Presupuesto_Autopista_GDL.xlsx', size: '1.1 MB', status: 'received', date: '09/04/2026' },
  { id: 3, category: { es: 'Proyecto', en: 'Project' }, name: { es: 'Programa de Obra', en: 'Project Schedule' }, filename: 'Cronograma_Autopista_GDL.pdf', size: '890 KB', status: 'received', date: '09/04/2026' },
  { id: 4, category: { es: 'Proyecto', en: 'Project' }, name: { es: 'Planos y Especificaciones', en: 'Drawings & Specs' }, filename: 'Planos_Autopista_GDL.zip', size: '45 MB', status: 'pending', date: null },
  { id: 5, category: { es: 'Proyecto', en: 'Project' }, name: { es: 'Estudio de Mecanica de Suelos', en: 'Geotechnical Study' }, filename: 'EMS_Autopista_GDL.pdf', size: '3.2 MB', status: 'received', date: '08/04/2026' },
  { id: 6, category: { es: 'Contratista', en: 'Contractor' }, name: { es: 'Acta Constitutiva', en: 'Articles of Incorporation' }, filename: 'Acta_Constitutiva_CdelP.pdf', size: '1.8 MB', status: 'received', date: '08/04/2026' },
  { id: 7, category: { es: 'Contratista', en: 'Contractor' }, name: { es: 'Estados Financieros (2025)', en: 'Financial Statements (2025)' }, filename: 'EEFF_2025_CdelP.pdf', size: '4.5 MB', status: 'received', date: '08/04/2026' },
  { id: 8, category: { es: 'Contratista', en: 'Contractor' }, name: { es: 'Estados Financieros (2024)', en: 'Financial Statements (2024)' }, filename: 'EEFF_2024_CdelP.pdf', size: '4.2 MB', status: 'received', date: '08/04/2026' },
  { id: 9, category: { es: 'Contratista', en: 'Contractor' }, name: { es: 'Constancia Situacion Fiscal', en: 'Tax Status Certificate' }, filename: 'CSF_CdelP.pdf', size: '340 KB', status: 'received', date: '09/04/2026' },
  { id: 10, category: { es: 'Contratista', en: 'Contractor' }, name: { es: 'Relacion de Obras Ejecutadas', en: 'Completed Projects Record' }, filename: 'Track_Record_CdelP.pdf', size: '2.1 MB', status: 'received', date: '08/04/2026' },
  { id: 11, category: { es: 'Seguros', en: 'Insurance' }, name: { es: 'Inventario de Maquinaria', en: 'Equipment Schedule' }, filename: 'Inventario_Equipo_87u.xlsx', size: '890 KB', status: 'received', date: '09/04/2026' },
  { id: 12, category: { es: 'Seguros', en: 'Insurance' }, name: { es: 'Historial de Siniestros (5 anos)', en: 'Claims History (5 years)' }, filename: 'Siniestralidad_5yr_CdelP.pdf', size: '1.3 MB', status: 'received', date: '08/04/2026' },
  { id: 13, category: { es: 'Seguros', en: 'Insurance' }, name: { es: 'Prima Riesgo Trabajo IMSS', en: 'IMSS Work Risk Premium' }, filename: 'PRT_IMSS_2026_CdelP.pdf', size: '420 KB', status: 'received', date: '09/04/2026' },
  { id: 14, category: { es: 'Seguros', en: 'Insurance' }, name: { es: 'Polizas Vigentes', en: 'Current Policies' }, filename: 'Polizas_Vigentes_CdelP.pdf', size: '5.6 MB', status: 'received', date: '08/04/2026' },
  { id: 15, category: { es: 'Seguros', en: 'Insurance' }, name: { es: 'Informe Inspeccion de Riesgo', en: 'Risk Survey Report' }, filename: null, size: null, status: 'pending', date: null },
  { id: 16, category: { es: 'Obra Publica', en: 'Public Works' }, name: { es: 'Fallo de Licitacion', en: 'Bid Award Notice' }, filename: 'Fallo_LP-2026-0023.pdf', size: '780 KB', status: 'received', date: '07/04/2026' },
  { id: 17, category: { es: 'Obra Publica', en: 'Public Works' }, name: { es: 'Oficio de Adjudicacion', en: 'Award Letter' }, filename: 'Oficio_Adjudicacion.pdf', size: '540 KB', status: 'received', date: '07/04/2026' },
  { id: 18, category: { es: 'Obra Publica', en: 'Public Works' }, name: { es: 'Ficha Tecnica SIOP', en: 'SIOP Technical Sheet' }, filename: 'Ficha_Tecnica_SIOP.pdf', size: '1.2 MB', status: 'received', date: '07/04/2026' },
]

// ---- ROUTING RULES ----
export interface RoutingRule {
  carrier: string
  method: 'portal' | 'email'
  rule: BiStr
  icon: string
}

export const routingRules: RoutingRule[] = [
  { carrier: 'Mapfre Mexico', method: 'portal' as const, rule: { es: 'Portal disponible. Limite de cotizacion: Mex$80M MXN. Proyecto: Mex$50M — dentro del limite.', en: 'Portal available. Quote limit: Mex$80M MXN. Project: Mex$50M — within limit.' }, icon: 'auto' },
  { carrier: 'GNP Seguros', method: 'portal' as const, rule: { es: 'Portal disponible. Limite de cotizacion: Mex$100M MXN. Proyecto: Mex$50M — dentro del limite.', en: 'Portal available. Quote limit: Mex$100M MXN. Project: Mex$50M — within limit.' }, icon: 'auto' },
  { carrier: 'Chubb Mexico', method: 'email' as const, rule: { es: 'Limite de portal: Mex$30M MXN. Proyecto: Mex$50M — excede limite. Requiere solicitud via email con revision de suscriptor.', en: 'Portal limit: Mex$30M MXN. Project: Mex$50M — exceeds limit. Requires email submission with underwriter review.' }, icon: 'email' },
  { carrier: 'Zurich Mexico', method: 'email' as const, rule: { es: 'Portal limitado a lineas estandar. Riesgos complejos de construccion requieren envio por email a mesa de suscripcion.', en: 'Portal limited to standard lines. Complex construction risks require email submission to underwriting desk.' }, icon: 'email' },
  // Surety bond carriers (Afianzadoras)
  { carrier: 'Afianzadora Aserta', method: 'email' as const, rule: { es: 'Fianzas de obra publica. Todas las solicitudes via email a mesa de suscripcion. Linea pre-aprobada para Constructora del Pacifico.', en: 'Public works surety bonds. All submissions via email to underwriting desk. Pre-approved line for Constructora del Pacifico.' }, icon: 'email' },
  { carrier: 'Fianzas Dorama', method: 'email' as const, rule: { es: 'Fianzas de cumplimiento. Solicitudes via email. Requiere estados financieros actualizados.', en: 'Performance bonds. Submissions via email. Requires updated financial statements.' }, icon: 'email' },
]

// ---- RECOMMENDATION LETTER ----
export interface RecommendationLetter {
  title: BiStr
  date: string
  to: string
  toCompany: string
  from: string
  fromCompany: string
  summary: BiStr
  recommendation: {
    insurance: { carrier: string; premium: number; reason: BiStr }
    surety: { carrier: string; premium: number; reason: BiStr }
  }
  totalPremium: number
  totalCommission: number
}

export const recommendationLetter: RecommendationLetter = {
  title: { es: 'Carta de Recomendacion', en: 'Recommendation Letter' },
  date: '09/04/2026',
  to: 'Ing. Carlos Martinez Hernandez',
  toCompany: 'Constructora del Pacifico S.A. de C.V.',
  from: 'Lic. Maria Elena Gutierrez',
  fromCompany: 'Alaya — Agente de Seguros y Fianzas',
  // NOTE: Lumif.ai branding should NOT appear on formal client documents
  summary: {
    es: 'Tras analizar el Contrato Maestro de Servicios del proyecto Autopista Guadalajara-Tepic y solicitar cotizaciones a cuatro aseguradoras y dos afianzadoras, nos permitimos presentar nuestra recomendacion para la colocacion de coberturas.',
    en: 'After analyzing the Master Services Contract for the Guadalajara-Tepic Highway project and requesting quotes from four insurers and two surety carriers, we present our recommendation for coverage placement.',
  },
  recommendation: {
    insurance: { carrier: 'Mapfre Mexico', premium: 847000, reason: { es: 'Mejor combinacion precio-cobertura. Competitivo en deducibles. Experiencia comprobada en proyectos carreteros.', en: 'Best price-coverage combination. Competitive deductibles. Proven experience in highway projects.' } },
    surety: { carrier: 'Afianzadora Aserta', premium: 2520680, reason: { es: 'Lider en fianzas de obra publica (Grupo Financiero Banorte). Linea pre-aprobada para Constructora del Pacifico. Emision estimada en 12 dias.', en: 'Leader in public works surety bonds (Grupo Financiero Banorte). Pre-approved line for Constructora del Pacifico. Estimated issuance in 12 days.' } },
  },
  totalPremium: 3367680,
  totalCommission: 303294,
}
