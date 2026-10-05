const OFFICIAL = 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml';
const source = (lawCode, section) => `${OFFICIAL}?lawCode=${lawCode}&sectionNum=${encodeURIComponent(section)}.`;

const generatedMonthsLabel = months => {
  if (months === null || months === undefined) return '—';
  if (months === 0) return 'Keine Haft';
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const values = [];
  if (years) values.push(`${years} ${years === 1 ? 'Jahr' : 'Jahre'}`);
  if (rest) values.push(`${rest} ${rest === 1 ? 'Monat' : 'Monate'}`);
  return values.join(' ');
};
const generatedMoneyLabel = amount => amount === null || amount === undefined
  ? '—'
  : `$${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(amount)}`;

const curatedCatalog = [
  {
    code: 'PC 187', name: 'Mord', short: 'Mord', type: 'Felony', months: 0, lifeTerms: 1, fine: 10000,
    jail: 'Lebenslang / LWOP', fineText: '$10.000', aliases: ['murder', 'tötung', 'toetung'],
    note: 'Strafe folgt PC 190; je nach Grad 15/25 Jahre bis lebenslang, LWOP oder gesetzlich auch Todesstrafe. Enhancements möglich.',
    source: source('PEN', '190')
  },
  {
    code: 'PC 211', name: 'Raub', short: 'Raub', type: 'Felony', months: 108, fine: 10000,
    jail: '9 Jahre', fineText: '$10.000', aliases: ['robbery', 'überfall', 'ueberfall'],
    note: 'Höchstrahmen von 9 Jahren betrifft First-Degree-Robbery in concert; andere Varianten haben niedrigere Triaden.',
    source: source('PEN', '213')
  },
  {
    code: 'PC 459', name: 'Einbruch', short: 'Einbruch', type: 'Wobbler', months: 72, fine: 10000,
    jail: '6 J. (Fel.) / 1 J. (Misd.)', fineText: '$10.000 / $1.000', aliases: ['burglary', 'einbruchdiebstahl'],
    note: 'First-degree burglary ist Felony bis 6 Jahre. Second-degree burglary ist Wobbler bis 3 Jahre oder 1 Jahr.',
    source: source('PEN', '461')
  },
  {
    code: 'PC 245(a)(1)', name: 'Angriff mit tödlicher Waffe', short: 'Angriff m. Waffe', type: 'Wobbler', months: 48, fine: 10000,
    jail: '4 J. / 1 J.', fineText: '$10.000', aliases: ['assault deadly weapon', 'adw', 'gefährliche körperverletzung', 'gefaehrliche koerperverletzung'],
    note: 'Für eine Waffe außer einer Schusswaffe: Felony 2/3/4 Jahre oder County Jail bis 1 Jahr.',
    source: source('PEN', '245')
  },
  {
    code: 'PC 422', name: 'Kriminelle Drohung', short: 'Kriminelle Drohung', type: 'Wobbler', months: 36, fine: 10000,
    jail: '3 J. / 1 J.', fineText: '$10.000 / $1.000', aliases: ['criminal threats', 'bedrohung', 'drohung'],
    note: 'Wobbler; bis zu 3 Jahre als Felony oder bis zu 1 Jahr im County Jail als Misdemeanor.',
    source: source('PEN', '422')
  },
  {
    code: 'PC 487', name: 'Grand Theft', short: 'Grand Theft', type: 'Wobbler', months: 36, fine: 10000,
    jail: '3 J. / 1 J.', fineText: '$10.000 / $1.000', aliases: ['großer diebstahl', 'grosser diebstahl', 'diebstahl über 950', 'diebstahl ueber 950'],
    note: 'Allgemeiner Höchstrahmen; besondere Gegenstände oder Umstände können andere Regeln auslösen.',
    source: source('PEN', '489')
  },
  {
    code: 'PC 490.2', name: 'Petty Theft bis $950', short: 'Petty Theft', type: 'Misd.', months: 6, fine: 1000,
    jail: '6 Monate', fineText: '$1.000', aliases: ['petty theft', 'kleindiebstahl', 'diebstahl bis 950'],
    note: 'Grundfall. Vorstrafen und besondere Tatobjekte können die Einordnung verändern.',
    source: source('PEN', '490')
  },
  {
    code: 'PC 594(b)(1)', name: 'Vandalismus ab $400', short: 'Vandalismus ≥ $400', type: 'Wobbler', months: 36, fine: 10000,
    jail: '3 J. / 1 J.', fineText: '$10.000', aliases: ['vandalism', 'sachbeschädigung', 'sachbeschaedigung'],
    note: 'Bei Schaden ab $400: Wobbler; bei sehr hohem Schaden kann die Geldstrafe bis $50.000 steigen.',
    source: source('PEN', '594')
  },
  {
    code: 'PC 148(a)(1)', name: 'Widerstand gegen Beamte', short: 'Widerstand', type: 'Misd.', months: 12, fine: 1000,
    jail: '1 Jahr', fineText: '$1.000', aliases: ['resisting arrest', 'beamtenwiderstand', 'widerstand'],
    note: 'Widerstand, Verzögerung oder Behinderung eines Beamten bei rechtmäßiger Dienstausübung.',
    source: source('PEN', '148')
  },
  {
    code: 'PC 273.5(a)', name: 'Körperverletzung Partner', short: 'Verletzung Partner', type: 'Wobbler', months: 48, fine: 6000,
    jail: '4 J. / 1 J.', fineText: '$6.000', aliases: ['domestic violence', 'häusliche gewalt', 'haeusliche gewalt', 'spousal abuse'],
    note: 'Grundfall mit traumatischer Verletzung; Vorverurteilungen können Geldstrafe und Strafrahmen erhöhen.',
    source: source('PEN', '273.5')
  },
  {
    code: 'PC 26350', name: 'Offenes Führen ungeladener Handfeuerwaffe', short: 'Offenes Führen', type: 'Misd.', months: 12, fine: 1000,
    jail: '1 Jahr', fineText: '$1.000', aliases: ['offenes führen', 'offenes fuehren', 'open carry', 'unloaded handgun'],
    note: 'Der 1-Jahres-Höchstrahmen gilt bei sofort verfügbarem Munitionsbesitz und unrechtmäßigem Waffenbesitz; sonst allgemeiner Misdemeanor-Rahmen.',
    source: source('PEN', '26350')
  },
  {
    code: 'PC 25610', name: 'Gesetzmäßiger verschlossener Transport', short: 'Transport-Ausnahme', type: 'Ausnahme', months: 0, fine: 0,
    jail: 'Keine Strafe', fineText: '$0', aliases: ['waffentransport', 'locked container', 'falscher transport'],
    note: 'PC 25610 ist eine Ausnahme zu PC 25400, kein eigenständiges Delikt. Nur ungeladen und im Kofferraum/verschlossenen Behälter.',
    source: source('PEN', '25610'), excluded: true
  },
  {
    code: 'PC 25400', name: 'Verdecktes Führen einer Schusswaffe', short: 'Verdecktes Führen', type: 'Wobbler', months: 36, fine: 10000,
    jail: '3 J. / 1 J.', fineText: '$10.000 / $1.000', aliases: ['concealed carry', 'verdeckte waffe', 'ccw'],
    note: 'Je nach Umständen Misdemeanor, Wobbler oder zwingendes Felony. Die Summe nutzt den höchsten Grundrahmen ohne Enhancement.',
    source: source('PEN', '25400')
  },
  {
    code: 'PC 25850', name: 'Geladene Schusswaffe öffentlich führen', short: 'Geladene Waffe', type: 'Wobbler', months: 36, fine: 10000,
    jail: '3 J. / 1 J.', fineText: '$10.000 / $1.000', aliases: ['loaded firearm', 'geladene waffe', 'loaded carry'],
    note: 'Einordnung hängt u. a. von Vorstrafen, Eigentum/Registrierung und Waffenart ab.',
    source: source('PEN', '25850')
  },
  {
    code: 'PC 30605', name: 'Besitz einer Assault Weapon', short: 'Assault-Weapon-Besitz', type: 'Wobbler', months: 36, fine: 10000,
    jail: '3 J. / 1 J.', fineText: '$10.000 / $1.000', aliases: ['assault weapon', 'sturmgewehr', 'tec-9', 'vollautomat'],
    note: 'Bis 1 Jahr County Jail oder Felony nach PC 1170(h), regelmäßig bis 3 Jahre. Eng begrenzte Erstverstoß-Ausnahme: Geldstrafe bis $500.',
    source: source('PEN', '30605')
  },
  {
    code: 'PC 29800', name: 'Schusswaffenbesitz durch Felon', short: 'Felon mit Schusswaffe', type: 'Felony', months: 36, fine: 10000,
    jail: '3 Jahre', fineText: '$10.000', aliases: ['felon in possession', 'felon mit waffe', 'verbotener waffenbesitz'],
    note: 'Grundrahmen nach PC 1170(h): 16 Monate, 2 oder 3 Jahre; zusätzliche Verbote und Enhancements möglich.',
    source: source('PEN', '29800')
  },
  {
    code: 'VC 23152', name: 'DUI – erster Verstoß', short: 'DUI (1. Verstoß)', type: 'Misd.', months: 6, fine: 1000,
    jail: '6 Monate', fineText: '$1.000', aliases: ['dui', 'drunk driving', 'alkohol am steuer', 'fahren unter einfluss'],
    note: 'Grundfall des ersten Verstoßes ohne Verletzung. Mindesthaft, DUI-Programm, Führerscheinmaßnahmen und Aufschläge kommen hinzu; Vorverstöße erhöhen die Strafe.',
    source: source('VEH', '23536')
  },
  {
    code: 'VC 23153', name: 'DUI mit Verletzung – erster Verstoß', short: 'DUI mit Verletzung', type: 'Wobbler', months: 36, fine: 1000,
    jail: '3 J. / 1 J.', fineText: '$1.000', aliases: ['dui injury', 'dui verletzung', 'alkohol unfall verletzung'],
    note: 'Erster Verstoß: State Prison (allgemeiner Triad bis 3 Jahre) oder 90 Tage bis 1 Jahr County Jail; DMV-Suspension zusätzlich.',
    source: source('VEH', '23554')
  },
  {
    code: 'VC 22348(b)', name: 'Geschwindigkeit über 100 mph – erster Verstoß', short: '>100 mph', type: 'Infraction', months: 0, fine: 500,
    jail: 'Keine Haft', fineText: '$500', aliases: ['100 mph', 'speeding', 'rasen', 'geschwindigkeit'],
    note: 'Erster Verstoß. Das Gericht kann die Fahrerlaubnis bis zu 30 Tage aussetzen; Wiederholungen haben höhere Geldstrafen.',
    source: source('VEH', '22348')
  },
  {
    code: 'VC 14601.1(a)', name: 'Fahren trotz ausgesetzter Fahrerlaubnis', short: 'Fahren trotz Sperre', type: 'Misd.', months: 6, fine: 1000,
    jail: '6 Monate', fineText: '$1.000', aliases: ['suspended license', 'führerscheinentzug', 'fuehrerscheinentzug', 'fahren ohne fahrerlaubnis'],
    note: 'Erster Verstoß im allgemeinen Fall; Mindeststrafe und Wiederholungstatbestände sind gesondert geregelt.',
    source: source('VEH', '14601.1')
  },
  {
    code: 'VC 2800.1', name: 'Flucht vor Polizeifahrzeug', short: 'Flucht vor Polizei', type: 'Misd.', months: 12, fine: 1000,
    jail: '1 Jahr', fineText: '$1.000', aliases: ['evading', 'polizeiflucht', 'flucht polizei'],
    note: 'Grundtatbestand ohne rücksichtsloses Fahren; konkrete Signal- und Kennzeichnungsanforderungen müssen erfüllt sein.',
    source: source('VEH', '2800.1')
  },
  {
    code: 'VC 2800.2', name: 'Rücksichtslose Flucht vor Polizei', short: 'Rücksichtslose Flucht', type: 'Wobbler', months: 36, fine: 10000,
    jail: '3 J. / 1 J.', fineText: '$10.000', aliases: ['reckless evading', 'rücksichtslose flucht', 'ruecksichtslose flucht'],
    note: 'State Prison oder 6 Monate bis 1 Jahr County Jail; Geldstrafe von $1.000 bis $10.000 möglich.',
    source: source('VEH', '2800.2')
  },
  {
    code: 'VC 20001(b)(2)', name: 'Unfallflucht mit Tod/schwerer Dauerverletzung', short: 'Schwere Unfallflucht', type: 'Wobbler', months: 48, fine: 10000,
    jail: '4 J. / 1 J.', fineText: '$10.000', aliases: ['hit and run injury', 'unfallflucht', 'fahrerflucht'],
    note: 'Bei Tod oder dauerhafter schwerer Verletzung. Ein zusätzliches konsekutives 5-Jahres-Enhancement kann in bestimmten Tötungsfällen gelten.',
    source: source('VEH', '20001')
  },
  {
    code: 'VC 10851(a)', name: 'Unbefugte Fahrzeugnahme', short: 'Fahrzeugnahme', type: 'Wobbler', months: 36, fine: 5000,
    jail: '3 J. / 1 J.', fineText: '$5.000', aliases: ['vehicle theft', 'autodiebstahl', 'joyriding', 'fahrzeugdiebstahl'],
    note: 'Grundfall. Bestimmte Einsatz- oder Behindertenfahrzeuge sowie einschlägige Vorstrafen erhöhen den Rahmen.',
    source: source('VEH', '10851')
  }
];

curatedCatalog.push(
  {code:'PC 69',name:'Gewaltsamer Widerstand oder Drohung gegen Amtsträger',short:'Widerstand m. Gewalt',type:'Wobbler',months:36,fine:10000,jail:'3 J. / 1 J.',fineText:'$10.000',aliases:['resisting executive officer','force against officer','gewalt gegen beamte','widerstand beamte'],note:'Drohung oder Gewalt zur Verhinderung einer Amtspflicht bzw. gewaltsamer Widerstand. Wobbler: County Jail bis 1 Jahr oder Felony nach PC 1170(h).',source:source('PEN','69')},
  {code:'PC 415',name:'Störung des öffentlichen Friedens',short:'Ruhestörung / Streit',type:'Misd.',months:3,fine:400,jail:'90 Tage',fineText:'$400',aliases:['disturbing the peace','fighting in public','ruhestörung'],note:'Öffentlicher Kampf, störender Lärm oder provokative Worte; je nach Fall auch als Infraction verfolgbar.',source:source('PEN','415')},
  {code:'PC 242',name:'Körperverletzung (Battery)',short:'Battery',type:'Misd.',months:6,fine:2000,jail:'6 Monate',fineText:'$2.000',aliases:['battery','körperverletzung','unlawful force'],note:'Die Definition steht in PC 242; der allgemeine Strafrahmen folgt PC 243(a). Verletzungen oder geschützte Opfer erhöhen den Rahmen.',source:source('PEN','243')},
  {code:'PC 207',name:'Entführung',short:'Entführung',type:'Felony',months:96,fine:10000,jail:'8 Jahre',fineText:'$10.000',aliases:['kidnapping','entführung'],note:'Grundtatbestand; PC 208(a) sieht eine Triade von 3, 5 oder 8 Jahren vor. Erschwerungen können lebenslange Strafen auslösen.',source:source('PEN','208')},
  {code:'PC 215',name:'Carjacking',short:'Carjacking',type:'Felony',months:108,fine:10000,jail:'9 Jahre',fineText:'$10.000',aliases:['carjacking','fahrzeugraub','autoraub'],note:'Straftriade 3, 5 oder 9 Jahre; Waffen- und Gang-Enhancements können hinzukommen.',source:source('PEN','215')},
  {code:'HSC 11350',name:'Besitz kontrollierter Substanzen',short:'Drogenbesitz',type:'Misd.',months:12,fine:70,jail:'1 Jahr',fineText:'$70',aliases:['drug possession','controlled substance possession','kokainbesitz','heroinbesitz'],note:'Grundfall ohne einschlägige schwere Vorstrafe; Sonderregeln und Diversion können gelten.',source:source('HSC','11350')},
  {code:'HSC 11351',name:'Besitz kontrollierter Substanzen zum Verkauf',short:'Drogenbesitz z. Verkauf',type:'Felony',months:48,fine:20000,jail:'4 Jahre',fineText:'$20.000',aliases:['possession for sale','drug sales possession'],note:'Felony mit Straftriade von zwei, drei oder vier Jahren; zusätzliche mengen- oder vorstrafenbezogene Folgen möglich.',source:source('HSC','11351')},
  {code:'HSC 11359',name:'Cannabisbesitz zum Verkauf',short:'Cannabisverkaufsbesitz',type:'Wobbler',months:36,fine:10000,jail:'3 J. / 6 Mon.',fineText:'$10.000 / $500',aliases:['marijuana for sale','cannabis for sale'],note:'Grundfall ab 18: bis zu sechs Monate und $500; bei gesetzlichen Erschwerungsgründen Felony nach PC 1170(h).',source:source('HSC','11359')},
  {code:'HSC 11377',name:'Besitz bestimmter kontrollierter Substanzen',short:'Besitz kontroll. Stoffe',type:'Misd.',months:12,fine:70,jail:'1 Jahr',fineText:'$70',aliases:['meth possession','amphetamine possession','drug possession'],note:'Grundfall; bei bestimmten schweren Vorverurteilungen ist Felony-Behandlung möglich.',source:source('HSC','11377')},
  {code:'VC 22349(a) · 1–15 mph',name:'1–15 mph über dem Tempolimit',short:'Tempo +1–15 mph',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['speeding 1-15','zu schnell 1-15','tempo 1-15'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $274. County und Einzelfall können abweichen.',source:source('VEH','22349')},
  {code:'VC 22349(a) · 16–25 mph',name:'16–25 mph über dem Tempolimit',short:'Tempo +16–25 mph',type:'Infraction',months:0,fine:438,jail:'Keine Haft',fineText:'≈ $438 gesamt',baseFine:85,totalFee:438,points:1,trafficFine:true,aliases:['speeding 16-25','zu schnell 16-25','tempo 16-25'],note:'Grundbuße $85; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $438. County und Einzelfall können abweichen.',source:source('VEH','22349')},
  {code:'VC 22349(a) · 26+ mph',name:'Mindestens 26 mph über dem Tempolimit',short:'Tempo +26 mph',type:'Infraction',months:0,fine:567,jail:'Keine Haft',fineText:'≈ $567 gesamt',baseFine:120,totalFee:567,points:1,trafficFine:true,aliases:['speeding 26+','zu schnell 26','tempo 26'],note:'Grundbuße $120; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $567. County und Einzelfall können abweichen.',source:source('VEH','22349')},
  {code:'VC 22348(b) · >100 mph',name:'Geschwindigkeit über 100 mph',short:'Tempo über 100 mph',type:'Infraction',months:0,fine:1059,jail:'Keine Haft',fineText:'≈ $1.059 gesamt',baseFine:240,totalFee:1059,points:2,trafficFine:true,aliases:['speeding over 100','über 100 mph','ueber 100 mph'],note:'Erstverstoß: veröffentlichte Grundbuße $240 und Gesamtbetrag ca. $1.059; bis zu 30 Tage Führerscheinsperre möglich. County und Fall können abweichen.',source:source('VEH','22348')},
  {code:'VC 21453(a),(c)',name:'Rote Ampel missachtet',short:'Rotlichtverstoß',type:'Infraction',months:0,fine:567,jail:'Keine Haft',fineText:'≈ $567 gesamt',baseFine:120,totalFee:567,points:1,trafficFine:true,aliases:['red light','rote ampel','rotlicht'],note:'Grundbuße $120; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $567. Rechtsabbiegen bei Rot ist gesondert günstiger gelistet.',source:source('VEH','21453')},
  {code:'VC 22450(a)',name:'Stoppschild nicht beachtet',short:'Stoppschild',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['stop sign','stoppschild','nicht gestoppt'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $274.',source:source('VEH','22450')},
  {code:'VC 23123.5(a)',name:'Handy während der Fahrt benutzt',short:'Handy am Steuer',type:'Infraction',months:0,fine:179,jail:'Keine Haft',fineText:'≈ $179 gesamt',baseFine:20,totalFee:179,points:0,trafficFine:true,aliases:['handy am steuer','cell phone','telefon fahren'],note:'Erstverstoß: Grundbuße $20; veröffentlichter Gesamtbetrag ca. $179. Wiederholungen können Punkte und höhere Beträge auslösen.',source:source('VEH','23123.5')},
  {code:'VC 21703',name:'Zu geringer Sicherheitsabstand',short:'Zu dicht aufgefahren',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['following too closely','tailgating','sicherheitsabstand'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $274.',source:source('VEH','21703')},
  {code:'VC 22107',name:'Unsicherer Spurwechsel oder Abbiegevorgang',short:'Unsicherer Spurwechsel',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['unsafe lane change','spurwechsel','unsafe turn'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $274.',source:source('VEH','22107')},
  {code:'VC 22108',name:'Abbiegen oder Spurwechsel ohne Signal',short:'Nicht geblinkt',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['failure to signal','nicht geblinkt','no turn signal'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag inkl. Assessments/Gebühren ca. $274.',source:source('VEH','22108')}
);

curatedCatalog.push(
  {code:'HNC 655(a) · Bow/Gunwale',name:'Unsicheres Mitfahren auf Bug, Bordwand oder Heck',short:'Unsicheres Mitfahren Boot',type:'Infraction',months:0,fine:280,jail:'Keine Haft',fineText:'≈ $280 gesamt',baseFine:50,totalFee:280,points:0,trafficFine:true,boating:true,aliases:['bow riding','gunwale riding','boot bug sitzen'],note:'Bootsverkehr: Grundbuße $50; veröffentlichter Gesamtbetrag ca. $280.',source:source('HNC','655')},
  {code:'HNC 655.2(a)',name:'Geschwindigkeitsregel für Motorboote missachtet',short:'Motorboot zu schnell',type:'Infraction',months:0,fine:280,jail:'Keine Haft',fineText:'≈ $280 gesamt',baseFine:50,totalFee:280,points:0,trafficFine:true,boating:true,aliases:['boat speeding','power boat speed','motorboot zu schnell'],note:'Bootsverkehr: Grundbuße $50; veröffentlichter Gesamtbetrag ca. $280.',source:source('HNC','655.2')},
  {code:'HNC 655.3 · Equipment',name:'Vorgeschriebene Bootsausrüstung fehlt',short:'Bootsausrüstung fehlt',type:'Infraction',months:0,fine:280,jail:'Keine Haft',fineText:'≈ $280 gesamt',baseFine:50,totalFee:280,points:0,trafficFine:true,boating:true,aliases:['vessel equipment','boat equipment','rettungsweste ausrüstung'],note:'Bootsverkehr: Grundbuße $50; veröffentlichter Gesamtbetrag ca. $280.',source:source('HNC','655.3')},
  {code:'HNC 655.7(a-d)',name:'Regeln für Personal Watercraft missachtet',short:'Jet-Ski-Verstoß',type:'Infraction',months:0,fine:280,jail:'Keine Haft',fineText:'≈ $280 gesamt',baseFine:50,totalFee:280,points:0,trafficFine:true,boating:true,aliases:['personal watercraft','jet ski violation','jetski'],note:'Bootsverkehr: Grundbuße $50; veröffentlichter Gesamtbetrag ca. $280.',source:source('HNC','655.7')},
  {code:'HNC 655.7(e)(1)',name:'Motorabschalter fehlt oder funktioniert nicht',short:'Engine-Cutoff fehlt',type:'Infraction',months:0,fine:280,jail:'Keine Haft',fineText:'≈ $280 gesamt',baseFine:50,totalFee:280,points:0,trafficFine:true,boating:true,aliases:['engine cutoff switch','kill switch boat'],note:'Bootsverkehr: Grundbuße $50; veröffentlichter Gesamtbetrag ca. $280.',source:source('HNC','655.7')},
  {code:'HNC 654(b)',name:'Unzulässiger Bootsauspuff oder Cutout',short:'Bootsauspuff',type:'Infraction',months:0,fine:280,jail:'Keine Haft',fineText:'≈ $280 gesamt',baseFine:50,totalFee:280,points:0,trafficFine:true,boating:true,aliases:['boat muffler','boat exhaust','cutout'],note:'Bootsverkehr: Grundbuße $50; veröffentlichter Gesamtbetrag ca. $280.',source:source('HNC','654')},
  {code:'HNC 654.05(a)',name:'Lärmgrenze für motorisiertes Boot überschritten',short:'Bootslärm',type:'Infraction',months:0,fine:280,jail:'Keine Haft',fineText:'≈ $280 gesamt',baseFine:50,totalFee:280,points:0,trafficFine:true,boating:true,aliases:['motorized vessel noise','boat noise'],note:'Bootsverkehr: Grundbuße $50; veröffentlichter Gesamtbetrag ca. $280.',source:source('HNC','654.05')},
  {code:'HNC 655(a) · Reckless',name:'Rücksichtsloses oder fahrlässiges Führen eines Boots',short:'Rücksichtsloses Bootfahren',type:'Misd.',months:6,fine:1300,jail:'bis 6 Monate',fineText:'≈ $1.300 gesamt',baseFine:300,totalFee:1300,points:0,boating:true,arrestWarning:true,aliases:['reckless boating','negligent vessel operation'],note:'Bootsverkehr-Misdemeanor; Festnahme und Haft sind möglich.',source:source('HNC','655')},
  {code:'HNC 655(b)',name:'Bootfahren unter Alkohol- oder Drogeneinfluss',short:'BUI',type:'Misd.',months:6,fine:2735,jail:'bis 6 Monate',fineText:'≈ $2.735 gesamt',baseFine:650,totalFee:2735,points:0,boating:true,arrestWarning:true,aliases:['bui','boating under influence','alkohol boot'],note:'Boating under the influence ist kein einfacher Strafzettel; Festnahme möglich.',source:source('HNC','655')},
  {code:'HNC 656(a)',name:'Unfallflucht mit einem Boot',short:'Boot-Unfallflucht',type:'Misd.',months:6,fine:1300,jail:'bis 6 Monate',fineText:'≈ $1.300 gesamt',baseFine:300,totalFee:1300,points:0,boating:true,arrestWarning:true,aliases:['boat hit and run','vessel collision assist'],note:'Pflichten nach einer Bootskollision verletzt; Festnahme möglich.',source:source('HNC','656')}
);

curatedCatalog.push(
  {code:'VC 22350 · 1–15 mph',name:'Unsichere Geschwindigkeit, 1–15 mph darüber',short:'Basic Speed +1–15',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['basic speed law 1-15','unsafe speed 1-15'],note:'Gilt bei für die Verhältnisse unangepasster Geschwindigkeit. Grundbuße $45; Gesamtbetrag ca. $274.',source:source('VEH','22350')},
  {code:'VC 22350 · 16–25 mph',name:'Unsichere Geschwindigkeit, 16–25 mph darüber',short:'Basic Speed +16–25',type:'Infraction',months:0,fine:438,jail:'Keine Haft',fineText:'≈ $438 gesamt',baseFine:85,totalFee:438,points:1,trafficFine:true,aliases:['basic speed law 16-25','unsafe speed 16-25'],note:'Gilt bei für die Verhältnisse unangepasster Geschwindigkeit. Grundbuße $85; Gesamtbetrag ca. $438.',source:source('VEH','22350')},
  {code:'VC 22350 · 26+ mph',name:'Unsichere Geschwindigkeit, mindestens 26 mph darüber',short:'Basic Speed +26',type:'Infraction',months:0,fine:567,jail:'Keine Haft',fineText:'≈ $567 gesamt',baseFine:120,totalFee:567,points:1,trafficFine:true,aliases:['basic speed law 26','unsafe speed 26'],note:'Gilt bei für die Verhältnisse unangepasster Geschwindigkeit. Grundbuße $120; Gesamtbetrag ca. $567.',source:source('VEH','22350')},
  {code:'VC 21453(b)',name:'Rechtsabbiegen bei Rot ohne vorgeschriebenen Halt',short:'Rechts bei Rot',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['right turn on red','rechts bei rot'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag ca. $274.',source:source('VEH','21453')},
  {code:'VC 21809(a)',name:'Move-Over-Regel missachtet',short:'Move-Over-Verstoß',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['move over law','einsatzfahrzeug seitenstreifen'],note:'Nicht verlangsamt oder Spur gewechselt bei stehendem Einsatz-/Abschleppfahrzeug. Gesamtbetrag ca. $274.',source:source('VEH','21809')},
  {code:'VC 21950(a),(c)',name:'Fußgängern am Zebrastreifen keinen Vorrang gewährt',short:'Fußgänger-Vorrang',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['failure to yield pedestrian','crosswalk','fußgänger'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag ca. $274.',source:source('VEH','21950')},
  {code:'VC 21951',name:'An einem für Fußgänger haltenden Fahrzeug vorbeigefahren',short:'Haltendes Fahrzeug überholt',type:'Infraction',months:0,fine:567,jail:'Keine Haft',fineText:'≈ $567 gesamt',baseFine:120,totalFee:567,points:1,trafficFine:true,aliases:['passing stopped vehicle pedestrian'],note:'Grundbuße $120; veröffentlichter Gesamtbetrag ca. $567.',source:source('VEH','21951')},
  {code:'VC 22450(b)',name:'Stoppschild am Bahnübergang missachtet',short:'Bahnübergang-Stopp',type:'Infraction',months:0,fine:567,jail:'Keine Haft',fineText:'≈ $567 gesamt',baseFine:120,totalFee:567,points:1,trafficFine:true,aliases:['railroad stop sign','bahnübergang'],note:'Grundbuße $120; veröffentlichter Gesamtbetrag ca. $567.',source:source('VEH','22450')},
  {code:'VC 22454(a)',name:'Schulbus mit blinkenden Signalen passiert',short:'Schulbus passiert',type:'Infraction',months:0,fine:813,jail:'Keine Haft',fineText:'≈ $813 gesamt',baseFine:180,totalFee:813,points:1,trafficFine:true,aliases:['passing school bus','schulbus überholt'],note:'Grundbuße $180; veröffentlichter Gesamtbetrag ca. $813.',source:source('VEH','22454')},
  {code:'VC 27315(d)',name:'Sicherheitsgurt nicht benutzt',short:'Gurtpflicht',type:'Infraction',months:0,fine:192,jail:'Keine Haft',fineText:'≈ $192 gesamt',baseFine:25,totalFee:192,points:0,trafficFine:true,aliases:['seat belt','gurtpflicht','nicht angeschnallt'],note:'Erstverstoß; veröffentlichter Tabellenwert ca. $192. Das Gesetz nennt eine Grundstrafe bis $20, der Plan setzt Gebühren hinzu.',source:source('VEH','27315')},
  {code:'VC 27360(a)',name:'Kind nicht im vorgeschriebenen Rückhaltesystem gesichert',short:'Kindersitz-Verstoß',type:'Infraction',months:0,fine:567,jail:'Keine Haft',fineText:'≈ $567 gesamt',baseFine:120,totalFee:567,points:1,trafficFine:true,aliases:['child restraint','kindersitz'],note:'Grundbuße $120; veröffentlichter Gesamtbetrag ca. $567. Ausnahmen und Bildungsprogramm möglich.',source:source('VEH','27360')},
  {code:'VC 22500.1',name:'In gekennzeichneter Feuerwehrzufahrt gehalten',short:'Feuerwehrzufahrt',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:0,trafficFine:true,aliases:['fire lane','feuerwehrzufahrt'],note:'Veröffentlichter Grundwert $45 und Gesamtbetrag ca. $274; örtliche Parkregeln können abweichen.',source:source('VEH','22500.1')},
  {code:'VC 23222(a)',name:'Offener Alkoholbehälter beim Fahren',short:'Open Container',type:'Infraction',months:0,fine:364,jail:'Keine Haft',fineText:'≈ $364 gesamt',baseFine:70,totalFee:364,points:1,trafficFine:true,aliases:['open container','offener alkoholbehälter'],note:'Grundbuße $70; veröffentlichter Gesamtbetrag ca. $364.',source:source('VEH','23222')},
  {code:'VC 21461(a)',name:'Verkehrszeichen oder Signal missachtet',short:'Zeichen missachtet',type:'Infraction',months:0,fine:274,jail:'Keine Haft',fineText:'≈ $274 gesamt',baseFine:45,totalFee:274,points:1,trafficFine:true,aliases:['failure to obey sign','verkehrszeichen missachtet'],note:'Grundbuße $45; veröffentlichter Gesamtbetrag ca. $274.',source:source('VEH','21461')}
);

const englishNames = {
  'PC 187':'Murder','PC 211':'Robbery','PC 459':'Burglary','PC 245(a)(1)':'Assault with a deadly weapon',
  'PC 422':'Criminal threats','PC 487':'Grand theft','PC 490.2':'Petty theft up to $950',
  'PC 594(b)(1)':'Vandalism of $400 or more','PC 148(a)(1)':'Resisting or obstructing an officer',
  'PC 273.5(a)':'Corporal injury to spouse or partner','PC 26350':'Open carry of an unloaded handgun',
  'PC 25610':'Lawful locked-container transport','PC 25400':'Carrying a concealed firearm',
  'PC 25850':'Carrying a loaded firearm in public','PC 30605':'Possession of an assault weapon',
  'PC 29800':'Firearm possession by a felon','VC 23152':'DUI — first offense',
  'VC 23153':'DUI causing injury — first offense','VC 22348(b)':'Speeding over 100 mph — first offense',
  'VC 14601.1(a)':'Driving with a suspended license','VC 2800.1':'Evading a peace officer',
  'VC 2800.2':'Reckless evading','VC 20001(b)(2)':'Hit-and-run causing death or permanent serious injury',
  'VC 10851(a)':'Unlawful taking or driving of a vehicle',
  'HSC 11350':'Possession of a controlled substance','HSC 11351':'Possession of a controlled substance for sale',
  'HSC 11359':'Possession of cannabis for sale','HSC 11377':'Possession of specified controlled substances'
};

Object.assign(englishNames, {
  'PC 69':'Resisting or deterring an executive officer by force','PC 415':'Disturbing the peace','PC 242':'Battery','PC 207':'Kidnapping','PC 215':'Carjacking',
  'VC 22349(a) · 1–15 mph':'Speeding 1–15 mph over the limit','VC 22349(a) · 16–25 mph':'Speeding 16–25 mph over the limit',
  'VC 22349(a) · 26+ mph':'Speeding 26+ mph over the limit','VC 22348(b) · >100 mph':'Speeding over 100 mph',
  'VC 21453(a),(c)':'Running a red light','VC 22450(a)':'Failure to stop at a stop sign',
  'VC 23123.5(a)':'Handheld phone use while driving','VC 21703':'Following too closely',
  'VC 22107':'Unsafe turn or lane change','VC 22108':'Failure to signal before turning or changing lanes',
  'VC 22350 · 1–15 mph':'Unsafe speed, 1–15 mph over','VC 22350 · 16–25 mph':'Unsafe speed, 16–25 mph over','VC 22350 · 26+ mph':'Unsafe speed, 26+ mph over',
  'VC 21453(b)':'Improper right turn on red','VC 21809(a)':'Move-over violation','VC 21950(a),(c)':'Failure to yield to a pedestrian',
  'VC 21951':'Passing a vehicle stopped for a pedestrian','VC 22450(b)':'Failure to stop at a railroad crossing',
  'VC 22454(a)':'Passing a school bus with flashing signals','VC 27315(d)':'Seat belt violation','VC 27360(a)':'Child restraint violation',
  'VC 22500.1':'Stopping in a fire lane','VC 23222(a)':'Open alcohol container while driving','VC 21461(a)':'Failure to obey a traffic sign or signal',
  'HNC 655(a) · Bow/Gunwale':'Unsafe riding on bow, gunwale, or transom','HNC 655.2(a)':'Power boat speed restriction',
  'HNC 655.3 · Equipment':'Required vessel equipment missing','HNC 655.7(a-d)':'Personal watercraft violation',
  'HNC 655.7(e)(1)':'Missing or inoperable engine cutoff switch','HNC 654(b)':'Improper vessel muffler or cutout',
  'HNC 654.05(a)':'Motorized vessel noise violation','HNC 655(a) · Reckless':'Reckless or negligent vessel operation',
  'HNC 655(b)':'Boating under the influence','HNC 656(a)':'Vessel hit-and-run'
});

const friendlyGeneratedNames = {
  'PC 32':['Beihilfe nach der Tat','Accessory after the fact'],'PC 67':['Bestechung eines Staatsbeamten','Bribery of a state executive officer'],
  'PC 68':['Bestechlichkeit eines Amtsträgers','Bribe solicitation by a public officer'],'PC 69':['Widerstand oder Drohung gegen Amtsträger','Resisting or threatening an executive officer'],
  'PC 92':['Bestechung von Richter oder Juror','Bribery of a judge or juror'],'PC 118':['Meineid','Perjury'],
  'PC 136.1':['Zeugenbeeinflussung','Dissuading a witness'],'PC 207':['Entführung','Kidnapping'],
  'PC 213':['Strafe für Raub','Robbery penalty provision'],'PC 215':['Carjacking','Carjacking'],
  'PC 220':['Angriff mit Sexual- oder Raubabsicht','Assault with intent to commit a sex offense or robbery'],
  'PC 242':['Körperverletzung (Battery)','Battery'],'PC 243':['Strafen für Battery','Battery penalty provision'],
  'PC 261':['Vergewaltigung','Rape'],'PC 288':['Sexueller Missbrauch eines Kindes','Lewd acts with a child'],
  'PC 415':['Störung des öffentlichen Friedens','Disturbing the peace'],'PC 484':['Diebstahl','Theft'],
  'PC 496':['Hehlerei','Receiving stolen property'],'PC 503':['Veruntreuung','Embezzlement'],
  'PC 647':['Ordnungswidriges Verhalten','Disorderly conduct'],'VC 12500':['Fahren ohne gültige Fahrerlaubnis','Driving without a valid license'],
  'VC 20002':['Unfallflucht mit Sachschaden','Hit-and-run causing property damage'],'VC 23103':['Rücksichtsloses Fahren','Reckless driving'],
  'VC 23109':['Illegales Straßenrennen','Illegal speed contest'],'VC 2800.3':['Flucht mit Verletzung oder Tod','Evading causing injury or death']
};

const curatedCodes = new Set(curatedCatalog.map(item => item.code.toUpperCase()));
const generatedCatalog = Array.isArray(window.OFFICIAL_CATALOG)
  ? window.OFFICIAL_CATALOG.filter(item => !curatedCodes.has(String(item.code).toUpperCase()))
  : [];
const catalog = [...curatedCatalog, ...generatedCatalog].map((item, index) => {
  const numeric = Number.parseFloat(String(item.code).replace(/^[A-Z]+\s+/, '')) || 0;
  const category = item.code.startsWith('HNC ')
    ? 'boating'
    : item.code.startsWith('VC ')
    ? 'vehicle'
    : item.code.startsWith('HSC ')
      ? 'health'
    : numeric >= 16000
      ? 'weapons'
      : 'penal';
  const friendly = friendlyGeneratedNames[item.code];
  const inferredType = item.type === 'Unklar'
    ? (item.lifeTerms || item.months > 12 ? 'Felony' : item.months > 0 ? 'Misd.' : item.fine > 0 ? 'Infraction' : 'Unklar')
    : item.type;
  const estimatedMonths = item.months == null && ['Felony','Wobbler','Misd.'].includes(inferredType)
    ? (inferredType === 'Misd.' ? 6 : 36) : item.months;
  const estimatedFine = item.fine == null && ['Felony','Wobbler','Misd.','Infraction'].includes(inferredType)
    ? (inferredType === 'Felony' || inferredType === 'Wobbler' ? 10000 : inferredType === 'Misd.' ? 1000 : 250) : item.fine;
  const estimated = item.generated && (item.months == null || item.fine == null || item.type === 'Unklar');
  return {
    aliases: [],
    ...item,
    type: inferredType,
    months: estimatedMonths,
    fine: estimatedFine,
    jail: item.jail || (item.lifeTerms ? 'Lebenslang' : `${estimated ? '≈ ' : ''}${generatedMonthsLabel(estimatedMonths)}`),
    fineText: item.fineText || `${estimated ? '≈ ' : ''}${generatedMoneyLabel(estimatedFine)}`,
    estimated,
    originalText: item.generated ? item.name : null,
    nameDe: item.generated ? (friendly?.[0] || `Straftatbestand nach ${item.code}`) : item.name,
    nameEn: item.generated ? (friendly?.[1] || `Offense under ${item.code}`) : (englishNames[item.code] || item.name),
    category,
    catalogId: index
  };
});

const state = { entries: [], sequence: 1, language: 'de', agency: '' };
const ticketState = new Map();
const ticketFormState = {
  personName:'', caseNumber:'', citationNumber:'', violationDate:'', violationTime:'', location:'',
  licensePlate:'', vehicle:'', officer:'', badgeNumber:'', court:'', signatureText:'', signatureData:''
};
const trafficArrestCodes = new Set(['VC 23152','VC 23153','VC 14601.1(A)','VC 2800.1','VC 2800.2','VC 20001(B)(2)','VC 20002','VC 23103','VC 12500']);
const input = document.querySelector('#offense-input');
const form = document.querySelector('#offense-form');
const list = document.querySelector('#offense-list');
const suggestions = document.querySelector('#suggestions');
const discordOutput = document.querySelector('#discord-output');
const clearButton = document.querySelector('#clear-all');
const toast = document.querySelector('#toast');
const catalogList = document.querySelector('#catalog-list');
const catalogSearch = document.querySelector('#catalog-search');
const catalogUi = { filter: 'all', selected: new Set(), visibleIds: [] };

const L = (de, en) => state.language === 'en' ? en : de;

function randomDigits(length) {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return String(bytes[0] % (10 ** length)).padStart(length, '0');
}

function localDateTimeParts() {
  const now = new Date();
  const pad = value => String(value).padStart(2, '0');
  return { date:`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`, time:`${pad(now.getHours())}:${pad(now.getMinutes())}` };
}

function syncTicketIdentifiers(regenerate = false) {
  const current = localDateTimeParts();
  if (!ticketFormState.violationDate) ticketFormState.violationDate = current.date;
  if (!ticketFormState.violationTime) ticketFormState.violationTime = current.time;
  if (!ticketFormState.citationNumber || regenerate) ticketFormState.citationNumber = randomDigits(8);
  if (!ticketFormState.caseSuffix || regenerate) ticketFormState.caseSuffix = randomDigits(6);
  const agency = (state.agency || 'AGENCY').replace(/[^A-Z0-9]+/gi,'').toUpperCase() || 'AGENCY';
  ticketFormState.caseNumber = `${agency}-${ticketFormState.caseSuffix}`;
  const dateInput = document.querySelector('[data-ticket-field="violationDate"]');
  if (dateInput && !dateInput.value) dateInput.value = ticketFormState.violationDate;
  const caseNode = document.querySelector('#auto-case-number');
  const citationNode = document.querySelector('#auto-citation-number');
  const dateNode = document.querySelector('#auto-ticket-datetime');
  if (caseNode) caseNode.textContent = ticketFormState.caseNumber;
  if (citationNode) citationNode.textContent = ticketFormState.citationNumber;
  if (dateNode) dateNode.textContent = `${ticketDate(ticketFormState.violationDate)} · ${ticketFormState.violationTime}`;
}

function itemName(item) {
  return state.language === 'en'
    ? (item.nameEn || item.nameDe || item.name)
    : (item.nameDe || item.nameEn || item.name);
}

function itemShort(item) {
  const value = state.language === 'en'
    ? (item.nameEn || item.short || item.name)
    : (item.nameDe || item.short || item.nameEn || item.name);
  return truncate(value, 40);
}

function normalize(value) {
  return String(value || '')
    .toLocaleLowerCase('de-DE')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/penal\s*code/g, 'pc')
    .replace(/vehicle\s*code/g, 'vc')
    .replace(/california/g, '')
    .replace(/§/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function exactMatch(term) {
  const q = normalize(term).replace(/\s/g, '');
  if (!q) return null;
  return catalog.find(item => {
    const code = normalize(item.code).replace(/\s/g, '');
    if (q === code) return true;
    return item.aliases.some(alias => q === normalize(alias).replace(/\s/g, ''));
  }) || null;
}

function fuzzyMatches(term, limit = 5) {
  const q = normalize(term);
  if (!q) return [];
  return catalog
    .map(item => {
      const haystack = normalize([item.code, item.name, item.nameDe, item.nameEn, ...item.aliases].join(' '));
      let score = haystack.includes(q) ? 20 : 0;
      const parts = q.split(/\s+/).filter(Boolean);
      score += parts.filter(part => haystack.includes(part)).length * 4;
      if (normalize(item.code).startsWith(q)) score += 12;
      return { item, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.item.code.localeCompare(b.item.code))
    .slice(0, limit)
    .map(result => result.item);
}

function splitTerms(value) {
  return value.split(/[\n,;]+/).map(part => part.trim()).filter(Boolean);
}

function addTerms(terms) {
  if (!Array.isArray(terms)) terms = [terms];
  let added = 0;
  for (const raw of terms) {
    const clean = String(raw || '').trim();
    if (!clean) continue;
    let item = exactMatch(clean);
    if (!item) {
      const fuzzy = fuzzyMatches(clean, 2);
      if (fuzzy.length === 1) item = fuzzy[0];
    }
    state.entries.push(item
      ? { ...item, instanceId: state.sequence++ }
      : unknownEntry(clean));
    added += 1;
  }
  render();
  return added;
}

function unknownEntry(raw) {
  const codeMatch = raw.match(/^\s*(PC|VC|HSC)\s*([0-9]+(?:\.[0-9]+)?(?:\([a-z0-9]+\))*)\s*$/i);
  let official = 'https://leginfo.legislature.ca.gov/faces/codes.xhtml';
  if (codeMatch) official = source(codeMatch[1].toUpperCase() === 'PC' ? 'PEN' : codeMatch[1].toUpperCase() === 'VC' ? 'VEH' : 'HSC', codeMatch[2]);
  return {
    instanceId: state.sequence++, code: raw.toUpperCase(), name: 'Geschätzter Tatbestand', nameDe:'Geschätzter Tatbestand', nameEn:'Estimated offense', short: raw,
    type: 'Schätzung', months: 12, fine: 1000, jail: '≈ 1 Jahr', fineText: '≈ $1.000', unknown: true, estimated: true,
    note: 'Kein eindeutiger Katalogtreffer. Als konservative Näherung mit allgemeinem Misdemeanor-Höchstrahmen angesetzt; unbedingt prüfen.', source: official
  };
}

function formatMoney(amount) {
  if (amount === null || amount === undefined) return '—';
  return `$${new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(amount)}`;
}

function formatMonths(months) {
  if (months === null || months === undefined) return '—';
  if (months === 0) return L('0 Monate','0 months');
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${state.language === 'en' ? (years === 1 ? 'year' : 'years') : (years === 1 ? 'Jahr' : 'Jahre')}`);
  if (rest) parts.push(`${rest} ${state.language === 'en' ? (rest === 1 ? 'month' : 'months') : (rest === 1 ? 'Monat' : 'Monate')}`);
  return parts.join(' ');
}

function totals() {
  return state.entries.reduce((sum, entry) => {
    if (entry.excluded && !entry.lifeTerms) return sum;
    if (typeof entry.months === 'number') sum.months += entry.months;
    else if (!entry.lifeTerms) sum.openJail += 1;
    if (typeof entry.fine === 'number') sum.fine += entry.fine;
    else sum.openFine += 1;
    sum.lifeTerms += entry.lifeTerms || 0;
    return sum;
  }, { months: 0, fine: 0, lifeTerms: 0, openJail: 0, openFine: 0 });
}

function totalJailLabel(total, compact = false) {
  const finite = total.months ? formatMonths(total.months) : '';
  const open = total.openJail ? ' + offen' : '';
  if (total.lifeTerms) {
    const life = `${total.lifeTerms}× lebenslang`;
    return (finite ? `${life} + ${finite}` : life) + open;
  }
  return (finite || (compact ? '0 Monate' : '0 Monate')) + open;
}

function totalFineLabel(total) {
  return `${formatMoney(total.fine)}${total.openFine ? ' + offen' : ''}`;
}

function bailFor(entry) {
  const code = String(entry.code).toUpperCase();
  if (code === 'PC 187') return { amount: 2000000, label: '$2.000.000 / ggf. keine', reason: 'Mord; bei special circumstance kann Freilassung ausgeschlossen sein.' };
  if (entry.type === 'Infraction') return { amount: 0, label: '$0 / Erscheinen', reason: 'Bei Infractions ist regelmäßig Erscheinen ohne Kautionshinterlegung möglich.' };
  if (entry.type === 'Misd.' || entry.type === 'Ausnahme') return { amount: 0, label: '$0 / OR möglich', reason: 'LA County PARP: häufig Cite/Book & Release oder Own Recognizance; Ausnahmen möglich.' };
  if (entry.unknown) return { amount: 75000, label: '≈ $0–$75.000', reason: 'Tatbestand unklar; Magistrate Review oder richterliche Festsetzung möglich.' };
  const violent = ['PC 211','PC 215','PC 220','PC 245(A)(1)','PC 273.5(A)','VC 23153'];
  if (violent.includes(code)) return { amount: 100000, label: '≈ bis $100.000', reason: 'Gewalt-/Verletzungsdelikt; Geldkaution oder richterliche Prüfung möglich.' };
  if (entry.lifeTerms) return { amount: 1000000, label: '≈ $1.000.000+ / ggf. keine', reason: 'Lebenslange Strafdrohung; Kaution kann sehr hoch oder ausgeschlossen sein.' };
  const years = Math.max(3, Math.ceil((entry.months || 36) / 12));
  const schedule = {3:20000,4:25000,5:30000,6:35000,7:40000,8:45000,9:50000,10:55000,11:65000,12:70000,13:75000,14:80000,15:90000,16:100000};
  const amount = schedule[Math.min(16, years)] || 20000;
  return { amount, label: `≈ $0–${formatMoney(amount)}`, reason: 'LA County 2026: $0/Release-Protokoll oder richterlich festgesetzte Geldkaution; Schätzung nach Höchststrafe.' };
}

function totalBail() {
  if (!state.entries.length) return { amount:0, label:'$0 / OR', reason:'Noch keine Auswahl · LA County 2026' };
  const values = state.entries.map(bailFor);
  const highest = values.reduce((best, item) => item.amount > best.amount ? item : best, values[0]);
  return { ...highest, reason: `${highest.reason} Mehrere Delikte werden meist nicht einfach addiert.` };
}

function render() {
  const total = totals();
  const known = state.entries.filter(entry => !entry.unknown).length;
  document.querySelector('#total-count').textContent = String(state.entries.length);
  document.querySelector('#known-count').textContent = state.entries.length
    ? L(`${known} verifiziert · ${state.entries.length - known} offen`,`${known} verified · ${state.entries.length - known} unresolved`)
    : L('Noch keine Auswahl','No selection yet');
  document.querySelector('#total-jail').textContent = totalJailLabel(total);
  document.querySelector('#total-fine').textContent = totalFineLabel(total);
  const bail = totalBail();
  document.querySelector('#total-bail').textContent = bail.label;
  document.querySelector('#bail-reason').textContent = bail.reason;
  clearButton.disabled = state.entries.length === 0;

  if (!state.entries.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8M9 3h6v4H9zM6 5h12v16H6zM9 11h6M9 15h6"/></svg></div>
      <h3>${L('Noch keine Delikte','No offenses yet')}</h3><p>${L('Gib links einen Code oder Suchbegriff ein, um die Berechnung zu starten.','Enter a code or search term on the left to begin.')}</p>
    </div>`;
  } else {
    list.innerHTML = state.entries.map((entry, index) => offenseCard(entry, index)).join('');
  }
  discordOutput.textContent = discordTable();
  document.querySelector('#embed-output').textContent = discordEmbedJson();
  renderDiscordPreview();
  if (!document.querySelector('#panel-catalog').hidden) renderCatalog();
  if (!document.querySelector('#panel-tickets').hidden) renderTickets();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
}

function offenseCard(entry, index) {
  const prison = entry.lifeTerms ? entry.jail : entry.jail;
  const bail = bailFor(entry);
  return `<article class="offense-card ${entry.unknown ? 'unknown-card' : ''}">
    <div class="offense-main">
      <div>
        <div class="offense-title-row"><span class="code-badge">${escapeHtml(entry.code)}</span><h3>${escapeHtml(itemName(entry))}</h3>${entry.estimated ? `<span class="estimate-badge">${L('geschätzt','estimated')}</span>` : ''}</div>
        <div class="offense-data"><span class="type-tag">${escapeHtml(entry.type)}</span><span>${L('Haft','Custody')}: <b>${escapeHtml(prison)}</b></span><span>${entry.trafficFine ? L('Ticket gesamt','Ticket total') : L('Geldstrafe','Fine')}: <b>${escapeHtml(entry.fineText)}</b></span>${entry.trafficFine ? `<span>${L('Grundbuße','Base fine')}: <b>${escapeHtml(formatMoney(entry.baseFine))}</b></span><span>DMV: <b>${entry.points} ${L(`Punkt${entry.points === 1 ? '' : 'e'}`,`point${entry.points === 1 ? '' : 's'}`)}</b></span>` : `<span>${L('Kaution','Bail')}: <b>${escapeHtml(bail.label)}</b></span>`}</div>
      </div>
      <div class="offense-actions">
        <button class="icon-button add-one" type="button" data-increment="${entry.instanceId}" aria-label="${escapeHtml(entry.code)} ein weiteres Mal hinzufügen" title="Weiteres hinzufügen">＋</button>
        <button class="icon-button" type="button" data-remove="${entry.instanceId}" aria-label="Zeile ${index + 1} entfernen" title="Entfernen">
          <svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M8 11v7M12 11v7M16 11v7M6 7l1 14h10l1-14"/></svg>
        </button>
      </div>
    </div>
    <div class="offense-meta"><p>${escapeHtml(entry.note)} <strong>${L('Kaution','Bail')}:</strong> ${escapeHtml(bail.reason)}</p><a href="${escapeHtml(entry.source)}" target="_blank" rel="noopener">${L('Gesetzestext','Statute text')} ↗</a></div>
  </article>`;
}

function truncate(value, max) {
  const text = String(value);
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function discordTable() {
  const widths = [25, 15, 10, 20, 14];
  const headers = state.language === 'en' ? ['Offense','Code','Type','Max. custody','Max. penalty'] : ['Delikt', 'Code', 'Typ', 'Max. Haft', 'Max. Strafe'];
  const fit = (value, width) => truncate(value, width).padEnd(width, ' ');
  const border = `+${widths.map(width => '-'.repeat(width + 2)).join('+')}+`;
  const row = values => `| ${values.map((value, i) => fit(value, widths[i])).join(' | ')} |`;
  const rows = state.entries.map(entry => row([
    itemShort(entry), entry.code, entry.type, entry.jail, entry.fineText
  ]));
  const total = totals();
  const totalRow = row([L('GESAMT (Maximum)','TOTAL (Maximum)'), '', '', totalJailLabel(total, true), `${totalFineLabel(total)}*`]);
  const agency = (state.agency || L('Nicht angegeben','Not provided')).replace(/[\r\n`_]/g, ' ').trim();
  const bail = totalBail();
  const content = [`${L('Akte von','Record by')} ${agency}`, '', border, row(headers), border, ...(rows.length ? rows : [row(['—', '—', '—', '—', '—'])]), border, totalRow, border,
    `${L('Mögliche Kaution','Possible bail')} (LA County 2026): ${bail.label}`,
    `${L('Grund','Reason')}: ${bail.reason}`,
    L('* Ticket-Gesamtwerte enthalten die aufgeführten 2026-Aufschläge; bei anderen Delikten kommen Gebühren extra hinzu','* Ticket totals include listed 2026 assessments; other offenses may have additional fees'),
    L('* kumulative Maximalrechnung; concurrent sentencing und PC 654 möglich','* cumulative maximum; concurrent sentencing and PC 654 may apply'),
    L('* ≈ / geschätzt = Näherung, kein verbindlicher Gerichts- oder Kautionswert','* ≈ / estimated = nonbinding approximation')
  ].join('\n');
  return `\`\`\`\n${content}\n\`\`\``;
}

function discordEmbedJson() {
  const total = totals();
  const bail = totalBail();
  const agency = (state.agency || 'Nicht angegeben').replace(/[\r\n`_*]/g, ' ').trim();
  const lines = state.entries.length
    ? state.entries.map((entry, index) => `**${index + 1}. ${itemShort(entry)}** · \`${entry.code}\`\n${entry.type} · Haft: ${entry.jail} · ${entry.trafficFine ? `Ticket: ${entry.fineText} · Grundbuße: ${formatMoney(entry.baseFine)} · DMV: ${entry.points}` : `Geld: ${entry.fineText} · Kaution: ${bailFor(entry).label}`}`).join('\n\n')
    : '*Noch keine Delikte ausgewählt.*';
  const payload = {
    flags: 32768,
    components: [{
      type: 17,
      accent_color: 14133851,
      components: [
        { type: 10, content: `## ⚖️ Akte von ${agency}\n-# California Strafrechner · vorläufige Maximalberechnung` },
        { type: 14, divider: true, spacing: 1 },
        { type: 10, content: lines.slice(0, 3800) },
        { type: 14, divider: true, spacing: 1 },
        { type: 10, content: `### 📊 Gesamt (Maximum)\n> **Haft:** ${totalJailLabel(total, true)}\n> **Geldstrafe / Tickets:** ${totalFineLabel(total)}*\n> **Mögliche Kaution:** ${bail.label}\n-# ${bail.reason}` },
        { type: 14, divider: true, spacing: 1 },
        { type: 10, content: '-# Schätzwerte sind unverbindlich. Zuschläge, Gebühren, Enhancements, concurrent sentencing und PC 654 können das Ergebnis verändern.' }
      ]
    }]
  };
  return JSON.stringify(payload, null, 2);
}

function renderDiscordPreview() {
  const target = document.querySelector('#discord-preview');
  if (!target) return;
  const total = totals();
  const bail = totalBail();
  const agency = escapeHtml((state.agency || 'Nicht angegeben').replace(/[\r\n`_*]/g, ' ').trim());
  const entries = state.entries.length ? state.entries.map((entry, index) => `<div class="discord-offense"><strong>${index + 1}. ${escapeHtml(itemShort(entry))}</strong><code>${escapeHtml(entry.code)}</code><span>${escapeHtml(entry.type)} · Haft ${escapeHtml(entry.jail)} · ${entry.trafficFine ? `Ticket ${escapeHtml(entry.fineText)}` : `Geld ${escapeHtml(entry.fineText)}`}</span></div>`).join('') : '<p class="discord-empty">Noch keine Delikte ausgewählt.</p>';
  target.innerHTML = `<div class="discord-message"><div class="discord-avatar">CA</div><div class="discord-message-body"><div class="discord-author">California Strafrechner <span>APP</span><time>Heute um ${new Date().toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})}</time></div><div class="discord-component"><h3>⚖️ Akte von ${agency}</h3><small>California Strafrechner · vorläufige Maximalberechnung</small><div class="discord-separator"></div>${entries}<div class="discord-separator"></div><h4>📊 Gesamt (Maximum)</h4><p><b>Haft:</b> ${escapeHtml(totalJailLabel(total,true))}<br><b>Geldstrafe / Tickets:</b> ${escapeHtml(totalFineLabel(total))}*<br><b>Mögliche Kaution:</b> ${escapeHtml(bail.label)}</p><div class="discord-separator"></div><small>Schätzwerte sind unverbindlich. Gebühren, Enhancements, concurrent sentencing und PC 654 können das Ergebnis verändern.</small></div></div></div>`;
}

function showSuggestions() {
  const terms = splitTerms(input.value);
  const active = terms[terms.length - 1] || '';
  const matches = fuzzyMatches(active);
  if (!active || !matches.length || terms.length > 1) {
    suggestions.classList.remove('open');
    suggestions.innerHTML = '';
    return;
  }
  suggestions.innerHTML = matches.map((item, index) => `<button class="suggestion" type="button" role="option" data-suggestion="${index}"><strong>${escapeHtml(itemName(item))}</strong><small>${escapeHtml(item.code)}</small></button>`).join('');
  suggestions._matches = matches;
  suggestions.classList.add('open');
}

function catalogResults() {
  const query = normalize(catalogSearch.value);
  return catalog.filter(item => {
    const filterMatch = catalogUi.filter === 'all'
      || (catalogUi.filter === 'trafficFine' && item.trafficFine)
      || item.category === catalogUi.filter
      || item.type === catalogUi.filter;
    if (!filterMatch) return false;
    if (!query) return true;
    const searchable = normalize([item.code, item.name, item.nameDe, item.nameEn, item.type, ...(item.aliases || [])].join(' '));
    return query.split(/\s+/).every(part => searchable.includes(part));
  });
}

function renderCatalog() {
  const results = catalogResults();
  catalogUi.visibleIds = results.map(item => item.catalogId);
  document.querySelector('#catalog-result-count').textContent = `${results.length} von ${catalog.length} Delikten`;
  const allVisibleSelected = results.length > 0 && results.every(item => catalogUi.selected.has(item.catalogId));
  document.querySelector('#select-visible').textContent = allVisibleSelected ? 'Sichtbare abwählen' : 'Sichtbare auswählen';
  catalogList.innerHTML = results.length
    ? results.map(item => `<label class="catalog-row">
        <input type="checkbox" data-catalog-item="${item.catalogId}" ${catalogUi.selected.has(item.catalogId) ? 'checked' : ''}>
        <span class="catalog-row-main">
          <span class="catalog-row-title"><span class="code-badge">${escapeHtml(item.code)}</span><strong>${escapeHtml(item.type)}</strong>${item.estimated ? '<span class="estimate-badge">geschätzt</span>' : ''}</span>
          <p>${escapeHtml(itemName(item))}${state.language === 'de' && !item.nameDe ? ' · EN Original' : ''}</p>
        </span>
        <span class="catalog-row-meta"><span>Haft <b>${escapeHtml(item.jail)}</b></span><span>Geld <b>${escapeHtml(item.fineText)}</b></span></span>
      </label>`).join('')
    : '<div class="catalog-empty">Keine passenden Delikte gefunden.</div>';
  document.querySelector('#catalog-selected-count').textContent = String(catalogUi.selected.size);
  document.querySelector('#add-catalog-selection').disabled = catalogUi.selected.size === 0;
}

function openCatalog() {
  activateTab('catalog');
  renderCatalog();
  window.setTimeout(() => catalogSearch.focus(), 0);
}

function closeCatalog() {
  activateTab('calculator');
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function activateTab(name) {
  document.querySelectorAll('[data-tab]').forEach(button => {
    const active = button.dataset.tab === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.tab-panel').forEach(panel => {
    const active = panel.id === `panel-${name}`;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
  if (name === 'catalog') renderCatalog();
  if (name === 'tickets') { syncTicketIdentifiers(); renderTickets(); }
}

function renderTickets() {
  const query = normalize(document.querySelector('#ticket-search')?.value || '');
  const tickets = catalog.filter(item => item.trafficFine && (!query || normalize([item.code,item.nameDe,item.nameEn,...item.aliases].join(' ')).includes(query)));
  const warnings = catalog.filter(item => (item.arrestWarning || trafficArrestCodes.has(String(item.code).toUpperCase())) && (!query || normalize([item.code,item.nameDe,item.nameEn,...item.aliases].join(' ')).includes(query)));
  let count = 0, total = 0, points = 0;
  for (const [id, quantity] of ticketState) {
    const item = catalog[id];
    if (!item || !item.trafficFine) continue;
    count += quantity; total += item.totalFee * quantity; points += (item.points || 0) * quantity;
  }
  document.querySelector('#ticket-count').textContent = String(count);
  document.querySelector('#ticket-total').textContent = formatMoney(total);
  document.querySelector('#ticket-points').textContent = String(points);
  document.querySelector('#clear-tickets').disabled = count === 0;
  document.querySelector('#ticket-result-count').textContent = state.language === 'en' ? `${tickets.length} fines · ${warnings.length} arrest warnings` : `${tickets.length} Bußgelder · ${warnings.length} Festnahmehinweise`;
  const ticketCards = tickets.map(item => {
    const quantity = ticketState.get(item.catalogId) || 0;
    return `<article class="ticket-card ${quantity ? 'selected-ticket' : ''}">
    <div class="ticket-card-top"><span class="code-badge">${escapeHtml(item.code)}</span><span class="points-badge">${item.points} DMV ${state.language === 'en' ? `point${item.points === 1 ? '' : 's'}` : `P${item.points === 1 ? 'unkt' : 'unkte'}`}</span></div>
    <h3>${escapeHtml(itemName(item))}</h3>
    <div class="ticket-money"><div><span>${L('Grundbuße','Base fine')}</span><strong>${escapeHtml(formatMoney(item.baseFine))}</strong></div><div class="ticket-total"><span>${L('Gesamt ca.','Est. total')}</span><strong>${escapeHtml(formatMoney(item.totalFee))}</strong></div></div>
    <p>${escapeHtml(item.note)}</p>
    <div class="ticket-quantity"><button type="button" data-ticket-action="minus" data-ticket="${item.catalogId}" ${quantity ? '' : 'disabled'} aria-label="${L('Ein Ticket entfernen','Remove one ticket')}">−</button><strong>${quantity}</strong><button type="button" data-ticket-action="plus" data-ticket="${item.catalogId}" aria-label="${L('Ein Ticket hinzufügen','Add one ticket')}">＋</button></div>
  </article>`; }).join('');
  const warningCards = warnings.map(item => `<article class="ticket-card arrest-card"><div class="ticket-card-top"><span class="code-badge">${escapeHtml(item.code)}</span><span class="arrest-badge">${L('Festnahme möglich','Arrest possible')}</span></div><h3>${escapeHtml(itemName(item))}</h3><p><strong>${L('Warum:','Why:')}</strong> ${escapeHtml(arrestReason(item))}</p><div class="arrest-penalty"><span>${escapeHtml(item.type)}</span><b>${L('Haft','Custody')}: ${escapeHtml(item.jail)}</b><b>${L('Geld','Fine')}: ${escapeHtml(item.fineText)}</b></div><button type="button" class="ticket-add danger-ticket" data-arrest-add="${item.catalogId}">${L('Im Strafrechner prüfen','Open in calculator')}</button></article>`).join('');
  document.querySelector('#ticket-grid').innerHTML = ticketCards + warningCards || `<div class="catalog-empty">${L('Keine passenden Verkehrsverstöße gefunden.','No matching traffic violations found.')}</div>`;
}

function arrestReason(item) {
  const code = String(item.code).toUpperCase();
  if (code.startsWith('HNC ')) return L('Dieser Bootsverstoß ist ein Misdemeanor; Festnahme und Haft sind möglich.','This boating violation is a misdemeanor; arrest and custody are possible.');
  if (code.startsWith('VC 23152') || code.startsWith('VC 23153')) return L('DUI ist regelmäßig ein Misdemeanor bzw. bei Verletzung ein Wobbler; Gewahrsam, chemischer Test und Führerscheinmaßnahmen sind möglich.','DUI is generally a misdemeanor, or a wobbler when injury is involved; detention, chemical testing, and license action are possible.');
  if (code.startsWith('VC 20001') || code === 'VC 20002') return L('Fahrerflucht ist je nach Schaden, Verletzung oder Tod ein Misdemeanor oder Felony und nicht nur eine Infraction.','Hit-and-run may be a misdemeanor or felony depending on damage, injury, or death—not merely an infraction.');
  if (code.startsWith('VC 2800')) return L('Flucht vor einem Polizeifahrzeug ist eine Straftat; rücksichtsloses Fahren oder Verletzungen verschärfen sie.','Evading a police vehicle is a crime; reckless driving or injury increases the severity.');
  if (code.startsWith('VC 14601')) return L('Bewusstes Fahren trotz ausgesetzter Fahrerlaubnis ist ein Misdemeanor mit möglicher Haft.','Knowingly driving on a suspended license is a misdemeanor with possible custody.');
  if (code === 'VC 23103') return L('Rücksichtsloses Fahren ist ein Misdemeanor und kann zu Festnahme, Haft und Führerscheinfolgen führen.','Reckless driving is a misdemeanor and can lead to arrest, custody, and license consequences.');
  return L('Dieser Vehicle-Code kann als Misdemeanor verfolgt werden und ist deshalb kein einfacher Strafzettel.','This Vehicle Code violation may be prosecuted as a misdemeanor and is not a simple ticket.');
}

function ticketDate(value) {
  if (!value) return L('Nicht angegeben','Not provided');
  const [year, month, day] = value.split('-').map(Number);
  return year && month && day ? new Intl.DateTimeFormat(state.language === 'en' ? 'en-US' : 'de-DE').format(new Date(year, month - 1, day)) : value;
}

function ticketField(key, fallback = null) {
  const value = String(ticketFormState[key] || '').trim();
  return escapeHtml(value || fallback || L('Nicht angegeben','Not provided'));
}

function ticketDocumentHtml() {
  const selected = [...ticketState.entries()].map(([id, quantity]) => ({ item: catalog[id], quantity })).filter(row => row.item?.trafficFine && row.quantity > 0);
  const total = selected.reduce((sum, row) => sum + row.item.totalFee * row.quantity, 0);
  const points = selected.reduce((sum, row) => sum + (row.item.points || 0) * row.quantity, 0);
  const rows = selected.length ? selected.map((row, index) => `<tr><td>${index + 1}</td><td><b>${escapeHtml(row.item.code)}</b><br>${escapeHtml(itemName(row.item))}</td><td>${row.quantity}</td><td>${escapeHtml(formatMoney(row.item.baseFine))}</td><td>${escapeHtml(formatMoney(row.item.totalFee))}</td><td>${escapeHtml(formatMoney(row.item.totalFee * row.quantity))}</td><td>${row.item.points * row.quantity}</td></tr>`).join('') : `<tr><td colspan="7" class="empty-row">${L('Keine Verstöße ausgewählt','No violations selected')}</td></tr>`;
  const agency = escapeHtml(state.agency || L('Nicht angegeben','Not provided'));
  const generated = new Intl.DateTimeFormat(state.language === 'en' ? 'en-US' : 'de-DE', { dateStyle:'medium', timeStyle:'short' }).format(new Date());
  const logoUrl = new URL('city-of-los-angeles-seal.png', window.location.href).href;
  const signature = ticketFormState.signatureData ? `<img src="${escapeHtml(ticketFormState.signatureData)}" alt="Signature">` : `<span>${ticketField('signatureText')}</span>`;
  return `<!doctype html><html lang="${state.language}"><head><meta charset="utf-8"><title>${L('Strafzettel','Citation')}-${ticketField('citationNumber')}</title><style>
    @page{size:A4;margin:12mm}*{box-sizing:border-box}body{margin:0;color:#111;background:#fff;font-family:Arial,Helvetica,sans-serif;font-size:10.5px;line-height:1.35}header{display:grid;grid-template-columns:70px 1fr;align-items:center;gap:15px;padding-bottom:10px;border-bottom:3px solid #111}header img{width:64px;height:64px;object-fit:contain}h1{margin:0;font-size:19px;text-transform:uppercase;letter-spacing:.04em}header p{margin:3px 0 0;color:#444}.document-tag{display:inline-block;margin-top:5px;padding:3px 7px;border:1px solid #555;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:.08em}.section{margin-top:12px}.section-title{padding:4px 6px;border:1px solid #222;background:#e8e8e8;font-size:10px;font-weight:bold;text-transform:uppercase}.fields{display:grid;grid-template-columns:1fr 1fr;border:1px solid #222;border-top:0}.field{min-height:37px;padding:6px 8px;border-right:1px solid #bbb;border-bottom:1px solid #bbb}.field:nth-child(even){border-right:0}.field.wide{grid-column:1/-1;border-right:0}.field span{display:block;margin-bottom:2px;color:#555;font-size:8px;font-weight:bold;text-transform:uppercase}.field b{font-size:10.5px}.charges{width:100%;border-collapse:collapse;border:1px solid #222;border-top:0}.charges th,.charges td{padding:6px;border-right:1px solid #aaa;border-bottom:1px solid #aaa;text-align:left;vertical-align:top}.charges th{background:#f2f2f2;font-size:8px;text-transform:uppercase}.charges th:last-child,.charges td:last-child{border-right:0}.charges td:nth-child(n+3){white-space:nowrap;text-align:right}.summary{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:10px;border:2px solid #111}.summary div{padding:9px;border-right:1px solid #555}.summary div:last-child{border-right:0}.summary span{display:block;color:#555;font-size:8px;text-transform:uppercase}.summary strong{display:block;margin-top:3px;font-size:15px}.notice{margin-top:12px;padding:9px;border:1px solid #555;background:#f6f6f6;font-size:9px}.signature-box{height:75px;display:flex;align-items:end;padding:8px;border:1px solid #222;border-top:0}.signature-box img{max-width:260px;max-height:60px}.signature-box span{font:italic 24px "Segoe Script",cursive}.footer{display:flex;justify-content:space-between;margin-top:18px;padding-top:6px;border-top:1px solid #777;color:#666;font-size:8px}.empty-row{text-align:center!important;color:#777}
  </style></head><body><header><img src="${escapeHtml(logoUrl)}" alt=""><div><h1>California Traffic Citation Record</h1><p>${L('Strafzettelakte','Citation record')} · ${agency}</p><span class="document-tag">${L('Informationsdokument – keine amtliche Gerichtsurkunde','Information document — not an official court record')}</span></div></header>
  <section class="section"><div class="section-title">${L('Akte und Person','Case and person')}</div><div class="fields"><div class="field"><span>${L('Fallakte','Case file')}</span><b>${ticketField('caseNumber')}</b></div><div class="field"><span>${L('Citation-Nummer','Citation number')}</span><b>${ticketField('citationNumber')}</b></div><div class="field"><span>${L('Name','Name')}</span><b>${ticketField('personName')}</b></div><div class="field"><span>${L('Datum / Uhrzeit','Date / time')}</span><b>${escapeHtml(ticketDate(ticketFormState.violationDate))} · ${escapeHtml(ticketFormState.violationTime)}</b></div><div class="field"><span>${L('Kennzeichen','License plate')}</span><b>${ticketField('licensePlate')}</b></div><div class="field"><span>${L('Fahrzeug','Vehicle')}</span><b>${ticketField('vehicle')}</b></div><div class="field"><span>Officer</span><b>${ticketField('officer')}</b></div><div class="field"><span>${L('Badge-Nummer','Badge number')}</span><b>${ticketField('badgeNumber')}</b></div><div class="field wide"><span>${L('Ort','Location')}</span><b>${ticketField('location')}</b></div><div class="field wide"><span>${L('Gericht / Department','Court / department')}</span><b>${ticketField('court')}</b></div></div></section>
  <section class="section"><div class="section-title">${L('Verstöße und Geldbeträge','Violations and amounts')}</div><table class="charges"><thead><tr><th>#</th><th>${L('Code / Verstoß','Code / violation')}</th><th>${L('Anzahl','Qty.')}</th><th>${L('Grundbuße','Base fine')}</th><th>${L('Gesamt je Verstoß','Total each')}</th><th>${L('Zwischensumme','Subtotal')}</th><th>${L('Punkte','Points')}</th></tr></thead><tbody>${rows}</tbody></table><div class="summary"><div><span>${L('Verstöße','Violations')}</span><strong>${selected.reduce((sum,row)=>sum+row.quantity,0)}</strong></div><div><span>${L('Mögliche DMV-Punkte','Possible DMV points')}</span><strong>${points}</strong></div><div><span>${L('Geschätzter Gesamtbetrag','Estimated total')}</span><strong>${escapeHtml(formatMoney(total))}</strong></div></div></section>
  <section class="section"><div class="section-title">${L('Unterschrift','Signature')}</div><div class="signature-box">${signature}</div></section><div class="notice"><b>${L('Hinweis','Notice')}:</b> ${L('Die Beträge sind unverbindliche Näherungen nach veröffentlichten Plänen 2026. County, Gericht, Vorverstöße und weitere Umstände können den tatsächlichen Betrag verändern. Dieses Dokument ist keine Rechtsberatung und keine amtliche Citation.','Amounts are nonbinding estimates based on published 2026 schedules. County, court, prior violations, and other circumstances can change the actual amount. This document is not legal advice or an official citation.')}</div><div class="footer"><span>${L('Erstellt mit California Strafrechner','Created with California Penalty Calculator')} · ${escapeHtml(generated)}</span><span>${L('Seite 1 von 1','Page 1 of 1')}</span></div><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),250));<\/script></body></html>`;
}

function downloadTicketPdf() {
  const missing = [...document.querySelectorAll('#ticket-form [required]')].find(field => !String(field.value || '').trim());
  if (missing) { missing.focus(); notify(L('Bitte alle Pflichtfelder ausfüllen','Please complete all required fields')); return; }
  if (signatureMode === 'draw' && !ticketFormState.signatureData) { notify(L('Bitte eine Unterschrift zeichnen','Please draw a signature')); return; }
  if (!ticketState.size) { notify(L('Bitte mindestens einen Verstoß auswählen','Please select at least one violation')); return; }
  const popup = window.open('', '_blank');
  if (!popup) { notify(L('Pop-up blockiert – bitte Pop-ups erlauben','Pop-up blocked — please allow pop-ups')); return; }
  popup.document.open();
  popup.document.write(ticketDocumentHtml());
  popup.document.close();
  notify(L('PDF-Druckansicht geöffnet','PDF print view opened'));
}

function reportHtml() {
  const total = totals();
  const bail = totalBail();
  const agency = escapeHtml(state.agency || L('Nicht angegeben','Not provided'));
  const generated = new Intl.DateTimeFormat(state.language === 'en' ? 'en-US' : 'de-DE',{dateStyle:'long',timeStyle:'short'}).format(new Date());
  const logoUrl = new URL('city-of-los-angeles-seal.png', window.location.href).href;
  const rows = state.entries.length ? state.entries.map((entry,index) => `<tr><td>${index+1}</td><td><b>${escapeHtml(entry.code)}</b><br>${escapeHtml(itemName(entry))}</td><td>${escapeHtml(entry.type)}</td><td>${escapeHtml(entry.jail)}</td><td>${escapeHtml(entry.fineText)}</td></tr>`).join('') : `<tr><td colspan="5" class="empty">${L('Keine Delikte ausgewählt','No offenses selected')}</td></tr>`;
  return `<!doctype html><html lang="${state.language}"><head><meta charset="utf-8"><title>${L('California Strafakte','California penalty record')}</title><style>@page{size:A4;margin:13mm}*{box-sizing:border-box}body{margin:0;color:#15191f;font:10.5px/1.4 Arial,Helvetica,sans-serif}header{display:grid;grid-template-columns:70px 1fr;gap:15px;align-items:center;padding-bottom:11px;border-bottom:4px solid #d7a93f}header img{width:64px;height:64px;object-fit:contain}h1{margin:0;font-size:22px;letter-spacing:.03em}header p{margin:3px 0;color:#555}.tag{display:inline-block;padding:3px 7px;border:1px solid #999;font-size:8px;text-transform:uppercase}.section{margin-top:15px}.title{padding:5px 7px;background:#172433;color:#fff;font-weight:bold;text-transform:uppercase;letter-spacing:.06em}table{width:100%;border-collapse:collapse}th,td{padding:7px;border:1px solid #aeb5bd;text-align:left;vertical-align:top}th{background:#edf0f3;font-size:8px;text-transform:uppercase}td:nth-child(n+4),th:nth-child(n+4){white-space:nowrap}.empty{text-align:center;color:#777}.totals{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:12px;border:2px solid #172433}.totals div{padding:10px;border-right:1px solid #87909a}.totals div:last-child{border:0}.totals span{display:block;color:#68717a;font-size:8px;text-transform:uppercase}.totals strong{display:block;margin-top:3px;font-size:15px}.bail{margin-top:12px;padding:10px;border-left:4px solid #d7a93f;background:#f5f2e9}.notice{margin-top:13px;padding:10px;border:1px solid #bbb;background:#f6f7f8;font-size:9px}.footer{display:flex;justify-content:space-between;margin-top:20px;padding-top:6px;border-top:1px solid #777;color:#666;font-size:8px}</style></head><body><header><img src="${escapeHtml(logoUrl)}" alt=""><div><h1>${L('California Strafakte','California Penalty Record')}</h1><p>${L('Akte von','Record by')} <b>${agency}</b> · ${escapeHtml(generated)}</p><span class="tag">${L('Informationsdokument – keine amtliche Gerichtsurkunde','Information document — not an official court record')}</span></div></header><section class="section"><div class="title">${L('Delikte und Strafrahmen','Offenses and penalty ranges')}</div><table><thead><tr><th>#</th><th>${L('Delikt / Code','Offense / code')}</th><th>${L('Typ','Type')}</th><th>${L('Max. Haft','Max. custody')}</th><th>${L('Max. Geld / Ticket','Max. fine / ticket')}</th></tr></thead><tbody>${rows}</tbody></table><div class="totals"><div><span>${L('Einträge','Entries')}</span><strong>${state.entries.length}</strong></div><div><span>${L('Maximale Haft','Maximum custody')}</span><strong>${escapeHtml(totalJailLabel(total,true))}</strong></div><div><span>${L('Maximales Geld','Maximum money')}</span><strong>${escapeHtml(totalFineLabel(total))}*</strong></div></div></section><div class="bail"><b>${L('Mögliche Kaution (LA County 2026)','Possible bail (LA County 2026)')}:</b> ${escapeHtml(bail.label)}<br>${escapeHtml(bail.reason)}</div><div class="notice"><b>${L('Wichtiger Hinweis','Important notice')}:</b> ${L('Kumulative Maximalrechnung. Gerichte können Strafen concurrent verhängen; PC 654 kann Mehrfachbestrafung ausschließen. Zuschläge, Gebühren und Enhancements können hinzukommen. Schätzwerte sind unverbindlich. Keine Rechtsberatung.','Cumulative maximum calculation. Courts may impose concurrent sentences; PC 654 may bar multiple punishment. Assessments, fees, and enhancements may apply. Estimates are nonbinding. Not legal advice.')}</div><div class="footer"><span>California Strafrechner · ${escapeHtml(generated)}</span><span>${L('Seite 1 von 1','Page 1 of 1')}</span></div><script>window.addEventListener('load',()=>setTimeout(()=>window.print(),250));<\/script></body></html>`;
}

function downloadCasePdf() {
  const popup = window.open('', '_blank');
  if (!popup) { notify(L('Pop-up blockiert – bitte Pop-ups erlauben','Pop-up blocked — please allow pop-ups')); return; }
  popup.document.open(); popup.document.write(reportHtml()); popup.document.close();
  notify(L('PDF-Druckansicht geöffnet','PDF print view opened'));
}

function downloadDoc() {
  const blob = new Blob(['\ufeff', reportHtml()], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `California-Strafakte-${(state.agency || 'Behoerde').replace(/[^a-z0-9_-]+/gi,'-')}.doc`;
  document.body.appendChild(link); link.click(); link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 500);
  notify('Google-Docs-kompatible DOC-Datei erstellt');
}

let signatureMode = 'type';
const signatureCanvas = document.querySelector('#signature-canvas');
const signatureContext = signatureCanvas?.getContext('2d');
let drawingSignature = false;

function setSignatureMode(mode) {
  signatureMode = mode;
  const typePanel = document.querySelector('#signature-type-panel');
  const drawPanel = document.querySelector('#signature-draw-panel');
  const typed = document.querySelector('[data-ticket-field="signatureText"]');
  typePanel.hidden = mode !== 'type';
  drawPanel.hidden = mode !== 'draw';
  typed.required = mode === 'type';
  document.querySelectorAll('[data-signature-mode]').forEach(button => button.classList.toggle('active', button.dataset.signatureMode === mode));
}

function signaturePoint(event) {
  const rect = signatureCanvas.getBoundingClientRect();
  return { x:(event.clientX-rect.left)*(signatureCanvas.width/rect.width), y:(event.clientY-rect.top)*(signatureCanvas.height/rect.height) };
}

function clearDrawnSignature() {
  if (signatureContext) signatureContext.clearRect(0,0,signatureCanvas.width,signatureCanvas.height);
  ticketFormState.signatureData = '';
}

async function sendDiscordWebhook() {
  const inputNode = document.querySelector('#webhook-url');
  const button = document.querySelector('#send-webhook');
  const status = document.querySelector('#webhook-status');
  let url;
  try { url = new URL(inputNode.value.trim()); } catch { url = null; }
  const allowedHost = url && (url.hostname === 'discord.com' || url.hostname === 'discordapp.com');
  if (!url || url.protocol !== 'https:' || !allowedHost || !/^\/api\/webhooks\/\d+\/[A-Za-z0-9._-]+\/?$/.test(url.pathname)) {
    status.textContent = L('Bitte einen gültigen Discord-Webhook-Link eingeben.','Enter a valid Discord webhook URL.');
    status.className = 'error'; inputNode.focus(); return;
  }
  button.disabled = true; status.className = ''; status.textContent = L('Wird gesendet …','Sending …');
  try {
    const response = await fetch(url.href,{method:'POST',headers:{'Content-Type':'application/json'},body:discordEmbedJson()});
    if (!response.ok) throw new Error(`Discord HTTP ${response.status}`);
    status.className = 'success'; status.textContent = L('Erfolgreich an Discord gesendet.','Successfully sent to Discord.');
  } catch (error) {
    status.className = 'error'; status.textContent = L(`Senden fehlgeschlagen: ${error.message}`,`Send failed: ${error.message}`);
  } finally { button.disabled = false; }
}

function applyUiLanguage() {
  document.documentElement.lang = state.language;
  document.title = L('California Strafrechner','California Penalty Calculator');
  const set = (selector,de,en) => { const node=document.querySelector(selector); if(node) node.textContent=L(de,en); };
  const html = (selector,de,en) => { const node=document.querySelector(selector); if(node) node.innerHTML=L(de,en); };
  const placeholder = (selector,de,en) => { const node=document.querySelector(selector); if(node) node.placeholder=L(de,en); };
  set('.status-pill','● Datenstand 04.10.2026','● Data current 10/04/2026');
  set('#page-title','Strafrahmen. Klar. Einsatzbereit.','Penalty ranges. Clear. Ready.');
  set('.hero #page-title + p','Gesetze durchsuchen, Höchstwerte kumulieren und eine fertige Akte für Discord, PDF oder Google Docs erstellen.','Search laws, total maximum penalties, and create a finished record for Discord, PDF, or Google Docs.');
  set('.hero-stat span','durchsuchbare Einträge','searchable entries');
  html('#tab-calculator','<span>01</span> Rechner','<span>01</span> Calculator'); html('#tab-catalog','<span>02</span> Deliktkatalog','<span>02</span> Offense catalog'); html('#tab-export','<span>03</span> Export','<span>03</span> Export'); html('#tab-embed','<span>04</span> Embed JSON','<span>04</span> Embed JSON'); html('#tab-tickets','<span>05</span> Strafzettel','<span>05</span> Citations');
  set('#panel-calculator .entry-panel h2','Akte vorbereiten','Prepare record'); set('.agency-field label','Fraktion / Behörde','Agency / department'); placeholder('#agency-input','z. B. LAPD, LASD oder CHP','e.g. LAPD, LASD, or CHP');
  set('#offense-form > label','Gesetzesnummer oder Beschreibung','Code section or description'); placeholder('#offense-input','z. B. PC 26350, DUI, robbery','e.g. PC 26350, DUI, robbery'); set('.field-help','Mehrere Einträge mit Komma, Semikolon oder neuer Zeile trennen.','Separate multiple entries with commas, semicolons, or new lines.');
  html('#offense-form .primary-button','<span>＋</span> Zur Berechnung hinzufügen','<span>＋</span> Add to calculation'); html('#open-catalog','Katalog öffnen <span id="catalog-button-count">'+catalog.length+'</span>','Open catalog <span id="catalog-button-count">'+catalog.length+'</span>'); set('.quick-section .section-label','Häufig gesucht','Popular searches');
  set('#panel-calculator .results-panel h2','Berechnung','Calculation'); set('#clear-all','Alle entfernen','Remove all');
  set('.principle-note strong','Wichtig','Important'); set('.principle-note p','Die Summe unterstellt aufeinanderfolgende Höchststrafen. Gerichte können Strafen concurrent verhängen; PC 654 kann Mehrfachbestrafung ausschließen.','The total assumes consecutive maximum sentences. Courts may impose concurrent sentences; PC 654 may bar multiple punishment.');
  set('.summary-card:nth-child(1) > span','Delikte','Offenses'); set('.summary-card:nth-child(2) > span','Max. Haft','Max. custody'); set('.summary-card:nth-child(2) small','Kumulativ gerechnet','Calculated cumulatively'); set('.summary-card:nth-child(3) > span','Max. Geldstrafe / Ticket','Max. fine / ticket'); set('.summary-card:nth-child(3) small','Ticketwerte ggf. inkl. Aufschläge','Ticket totals may include assessments'); set('.summary-card:nth-child(4) > span','Mögliche Kaution','Possible bail');
  set('#panel-catalog .catalog-header .eyebrow','Offizieller Deliktindex','Official offense index'); set('#panel-catalog .catalog-header h2','Gesetze auswählen','Select laws'); set('#panel-catalog .catalog-header h2 + p','Suche deutsch oder englisch, filtere nach Rechtsgebiet und füge mehrere Tatbestände gemeinsam hinzu.','Search in German or English, filter by area of law, and add several offenses together.'); placeholder('#catalog-search','Code oder Tatbestand suchen','Search code or offense');
  set('[data-filter="all"]','Alle','All'); set('[data-filter="trafficFine"]','Bußgelder','Fines'); set('[data-filter="boating"]','Bootsverkehr','Boating'); set('[data-filter="weapons"]','Waffenrecht','Weapons'); set('#add-catalog-selection','Auswahl hinzufügen','Add selection');
  set('#panel-export .export-panel h2','Discord-Codeblock','Discord code block'); set('#copy-output','Kopieren','Copy'); set('#panel-export .export-actions h2','Akte exportieren','Export record'); set('#panel-export .export-actions h2 + p','Das PDF wird über den Druckdialog gespeichert. Die DOC-Datei lässt sich direkt in Google Docs oder Word öffnen.','Save the PDF through the print dialog. The DOC file opens in Google Docs or Word.');
  set('#export-pdf strong','Als PDF speichern','Save as PDF'); set('#export-pdf small','Druckfertige Akte','Print-ready record'); set('#export-doc strong','Für Google Docs','For Google Docs'); set('#export-doc small','Compatible Word file','Compatible Word file');
  set('#panel-embed .export-panel h2','Discord Components V2 JSON','Discord Components V2 JSON'); set('#copy-embed','JSON kopieren','Copy JSON'); set('.discord-preview-panel h2','So erscheint die Akte','How the record appears'); set('.webhook-panel h2','Embed direkt senden','Send embed directly'); set('.webhook-panel h2 + p','Der Link wird nur für diesen Versand im Browser verwendet und nicht gespeichert.','The URL is used only for this browser request and is not stored.'); set('.webhook-controls label','Webhook-Link','Webhook URL'); set('#send-webhook','An Discord senden','Send to Discord');
  set('#panel-tickets .catalog-header h2','Strafzettel & Verkehrsverstöße','Citations & traffic violations'); set('#panel-tickets .catalog-header h2 + p','Grundbuße, mögliche Gesamtsumme mit Aufschlägen und DMV-Punkte auf einen Blick. Mit + und − lassen sich Verstöße mehrfach berechnen.','See base fines, estimated totals with assessments, and DMV points. Use + and − to add repeated violations.'); set('.ticket-note strong','Warum ist „Gesamt“ höher?','Why is the total higher?');
  set('.ticket-note span','Zur Grundbuße kommen staatliche und örtliche Penalty Assessments sowie Gerichtsgebühren. Die angezeigten Gesamtwerte orientieren sich am veröffentlichten Yolo-County-Plan 2026; der konkrete Betrag kann je nach County und Fall abweichen.','State and local penalty assessments and court fees are added to the base fine. Displayed totals follow the published 2026 Yolo County schedule; the actual amount varies by county and case.');
  set('#ticket-form-title','Strafzettel ausfüllen','Complete citation'); set('.ticket-form-heading > span','Angaben erscheinen im PDF und bleiben im Browser','Details appear in the PDF and remain in your browser'); placeholder('#ticket-search','z. B. rote Ampel, Handy, 20 mph, DUI','e.g. red light, phone, 20 mph, DUI'); set('#clear-tickets','Auswahl leeren','Clear selection'); set('#download-ticket-pdf','PDF speichern','Save PDF');
  set('.ticket-auto-grid > div:nth-child(1) span','Fallakte','Case file'); set('.ticket-auto-grid > div:nth-child(2) span','Citation-Nummer','Citation number'); set('.ticket-auto-grid > div:nth-child(3) span','Automatisch erfasst','Recorded automatically');
  const formLabels = [['Name','Name'],['Datum','Date'],['Kennzeichen / License Plate','License plate'],['Fahrzeug','Vehicle'],['Officer','Officer'],['Badge-Nummer','Badge number'],['Ort','Location'],['Gericht / Department','Court / department']];
  document.querySelectorAll('#ticket-form > label > span').forEach((node,index) => { if(formLabels[index]) node.textContent=L(...formLabels[index]); });
  set('.signature-heading > span','Unterschrift','Signature'); set('[data-signature-mode="type"]','Schreiben','Type'); set('[data-signature-mode="draw"]','Malen','Draw'); set('#clear-signature','Löschen','Clear'); set('#signature-draw-panel p','Mit Maus, Stift oder Finger unterschreiben.','Sign with mouse, pen, or finger.');
  set('.ticket-calculator > div:nth-child(1) span','Ausgewählte Strafzettel','Selected citations'); set('.ticket-calculator > div:nth-child(2) span','Geschätzte Gesamtsumme','Estimated total'); set('.ticket-calculator > div:nth-child(3) span','Mögliche DMV-Punkte','Possible DMV points');
  set('.arrest-warning-box strong','Festnahme statt einfachem Ticket möglich','Arrest may replace a simple citation'); set('.arrest-warning-box span','DUI, Fahrerflucht, rücksichtsloses Fahren, Flucht vor der Polizei, Fahren trotz Sperre und weitere Misdemeanors/Felonies sind keine normalen Bußgeldfälle. Die roten Warnkarten erklären warum.','DUI, hit-and-run, reckless driving, evading police, driving while suspended, and other misdemeanors/felonies are not ordinary citation cases. Red warning cards explain why.');
  set('.ticket-document-actions strong','Strafzettelakte als PDF','Citation record as PDF'); set('.ticket-document-actions span','Erstellt ein druckfertiges Dokument mit den Angaben oben und allen ausgewählten Verstößen.','Creates a print-ready document with the information above and all selected violations.');
  set('footer p','Allgemeine Information · Kein Ersatz für anwaltliche Beratung.','General information · Not a substitute for legal advice.');
  document.querySelectorAll('[data-language]').forEach(item => { const active=item.dataset.language===state.language; item.classList.toggle('active',active); item.setAttribute('aria-pressed',String(active)); });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const terms = splitTerms(input.value);
  if (!terms.length) { input.focus(); return; }
  const count = addTerms(terms);
  input.value = '';
  suggestions.classList.remove('open');
  notify(`${count} ${count === 1 ? 'Eintrag hinzugefügt' : 'Einträge hinzugefügt'}`);
});

input.addEventListener('input', showSuggestions);
input.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') form.requestSubmit();
});

suggestions.addEventListener('click', event => {
  const button = event.target.closest('[data-suggestion]');
  if (!button) return;
  const item = suggestions._matches?.[Number(button.dataset.suggestion)];
  if (!item) return;
  addTerms([item.code]);
  input.value = '';
  suggestions.classList.remove('open');
  notify(`${item.code} hinzugefügt`);
});

list.addEventListener('click', event => {
  const increment = event.target.closest('[data-increment]');
  if (increment) {
    const item = state.entries.find(entry => entry.instanceId === Number(increment.dataset.increment));
    if (!item) return;
    state.entries.push({ ...item, instanceId: state.sequence++ });
    render();
    notify(`${item.code} ein weiteres Mal hinzugefügt`);
    return;
  }
  const button = event.target.closest('[data-remove]');
  if (!button) return;
  const id = Number(button.dataset.remove);
  const index = state.entries.findIndex(entry => entry.instanceId === id);
  if (index < 0) return;
  state.entries.splice(index, 1);
  render();
  notify('Eintrag entfernt');
});

clearButton.addEventListener('click', () => {
  state.entries = [];
  render();
  notify('Berechnung geleert');
});

document.querySelector('#copy-output').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(discordOutput.textContent);
    notify('Discord-Codeblock kopiert');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(discordOutput);
    selection.removeAllRanges();
    selection.addRange(range);
    notify('Text markiert – jetzt kopieren');
  }
});

document.querySelector('#copy-embed').addEventListener('click', async () => {
  const output = document.querySelector('#embed-output');
  try {
    await navigator.clipboard.writeText(output.textContent);
    notify('Discord Components V2 JSON kopiert');
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(output);
    selection.removeAllRanges();
    selection.addRange(range);
    notify('JSON markiert – jetzt kopieren');
  }
});

const quickCodes = ['PC 26350', 'VC 23152', 'PC 30605', 'PC 211', 'PC 25400', 'VC 2800.2'];
document.querySelector('#quick-chips').innerHTML = quickCodes.map(code => `<button class="quick-chip" type="button" data-quick="${code}">${code}</button>`).join('');
document.querySelector('#quick-chips').addEventListener('click', event => {
  const button = event.target.closest('[data-quick]');
  if (!button) return;
  addTerms([button.dataset.quick]);
  notify(`${button.dataset.quick} hinzugefügt`);
});

document.querySelector('#catalog-count').textContent = `${catalog.length} Delikte`;
document.querySelector('#catalog-button-count').textContent = String(catalog.length);
document.querySelector('#hero-catalog-count').textContent = String(catalog.length);

document.querySelector('#open-catalog').addEventListener('click', openCatalog);
document.querySelector('#ticket-grid').addEventListener('click', event => {
  const arrestButton = event.target.closest('[data-arrest-add]');
  if (arrestButton) {
    const item = catalog[Number(arrestButton.dataset.arrestAdd)];
    if (!item) return;
    state.entries.push({ ...item, instanceId: state.sequence++ });
    activateTab('calculator'); render(); notify(`${item.code} im Strafrechner geöffnet`); return;
  }
  const button = event.target.closest('[data-ticket-action]');
  if (!button) return;
  const id = Number(button.dataset.ticket);
  const current = ticketState.get(id) || 0;
  if (button.dataset.ticketAction === 'plus') ticketState.set(id, current + 1);
  else if (current > 1) ticketState.set(id, current - 1);
  else ticketState.delete(id);
  renderTickets();
});
document.querySelector('#ticket-search').addEventListener('input', renderTickets);
document.querySelector('#clear-tickets').addEventListener('click', () => { ticketState.clear(); renderTickets(); notify('Strafzettel-Rechner geleert'); });
document.querySelector('#ticket-form').addEventListener('input', event => {
  const field = event.target.closest('[data-ticket-field]');
  if (!field) return;
  ticketFormState[field.dataset.ticketField] = field.value;
});
document.querySelectorAll('[data-signature-mode]').forEach(button => button.addEventListener('click', () => setSignatureMode(button.dataset.signatureMode)));
document.querySelector('#clear-signature').addEventListener('click', () => {
  clearDrawnSignature();
  const typed = document.querySelector('[data-ticket-field="signatureText"]');
  typed.value = ''; ticketFormState.signatureText = '';
  notify(L('Unterschrift gelöscht','Signature cleared'));
});
if (signatureCanvas && signatureContext) {
  signatureContext.lineWidth = 5; signatureContext.lineCap = 'round'; signatureContext.lineJoin = 'round'; signatureContext.strokeStyle = '#111827';
  signatureCanvas.addEventListener('pointerdown', event => { drawingSignature=true; signatureCanvas.setPointerCapture(event.pointerId); const p=signaturePoint(event); signatureContext.beginPath(); signatureContext.moveTo(p.x,p.y); });
  signatureCanvas.addEventListener('pointermove', event => { if(!drawingSignature) return; const p=signaturePoint(event); signatureContext.lineTo(p.x,p.y); signatureContext.stroke(); });
  const finishSignature = () => { if(!drawingSignature) return; drawingSignature=false; ticketFormState.signatureData=signatureCanvas.toDataURL('image/png'); };
  signatureCanvas.addEventListener('pointerup', finishSignature); signatureCanvas.addEventListener('pointercancel', finishSignature); signatureCanvas.addEventListener('pointerleave', finishSignature);
}
document.querySelector('#download-ticket-pdf').addEventListener('click', downloadTicketPdf);
document.querySelector('#send-webhook').addEventListener('click', sendDiscordWebhook);
document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
  state.language = button.dataset.language;
  applyUiLanguage();
  render();
  showSuggestions();
  syncTicketIdentifiers();
}));
const agencyInput = document.querySelector('#agency-input');
agencyInput.addEventListener('input', () => { state.agency = agencyInput.value; syncTicketIdentifiers(); render(); });
document.querySelectorAll('[data-agency]').forEach(button => button.addEventListener('click', () => {
  agencyInput.value = button.dataset.agency;
  state.agency = button.dataset.agency;
  syncTicketIdentifiers();
  render();
}));
document.querySelector('#export-pdf').addEventListener('click', downloadCasePdf);
document.querySelector('#export-doc').addEventListener('click', downloadDoc);
catalogSearch.addEventListener('input', renderCatalog);
document.querySelector('#catalog-filters').addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  catalogUi.filter = button.dataset.filter;
  document.querySelectorAll('#catalog-filters [data-filter]').forEach(item => item.classList.toggle('active', item === button));
  renderCatalog();
});
catalogList.addEventListener('change', event => {
  const input = event.target.closest('[data-catalog-item]');
  if (!input) return;
  const id = Number(input.dataset.catalogItem);
  if (input.checked) catalogUi.selected.add(id);
  else catalogUi.selected.delete(id);
  renderCatalog();
});
document.querySelector('#select-visible').addEventListener('click', () => {
  const shouldSelect = catalogUi.visibleIds.some(id => !catalogUi.selected.has(id));
  catalogUi.visibleIds.forEach(id => shouldSelect ? catalogUi.selected.add(id) : catalogUi.selected.delete(id));
  renderCatalog();
});
document.querySelector('#add-catalog-selection').addEventListener('click', () => {
  const selectedItems = [...catalogUi.selected].map(id => catalog[id]).filter(Boolean);
  if (!selectedItems.length) return;
  addTerms(selectedItems.map(item => item.code));
  const count = selectedItems.length;
  catalogUi.selected.clear();
  activateTab('calculator');
  notify(`${count} ${count === 1 ? 'Delikt hinzugefügt' : 'Delikte hinzugefügt'}`);
});

function registerWebMcp() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const add = terms => {
    const count = addTerms(terms);
    return { added: count, totalEntries: state.entries.length, discordTable: discordTable() };
  };
  try {
    context.registerTool({
      name: 'add_california_offenses', title: 'Delikte hinzufügen',
      description: 'Fügt kalifornische Delikte per Code oder deutschem/englischem Suchbegriff zur sichtbaren Berechnung hinzu.',
      inputSchema: { type: 'object', properties: { offenses: { type: 'array', items: { type: 'string' }, minItems: 1 } }, required: ['offenses'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(args) {
        if (!args || !Array.isArray(args.offenses) || !args.offenses.length || args.offenses.some(x => typeof x !== 'string')) throw new Error('offenses muss eine nicht leere Liste aus Textwerten sein.');
        return add(args.offenses);
      }
    });
    context.registerTool({
      name: 'clear_california_offenses', title: 'Berechnung leeren',
      description: 'Entfernt alle Delikte aus der sichtbaren Berechnung.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute() { state.entries = []; render(); return { cleared: true }; }
    });
    context.registerTool({
      name: 'read_discord_penalty_table', title: 'Discord-Tabelle lesen',
      description: 'Liest die aktuelle kumulative Maximalberechnung als fertigen Discord-Codeblock.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() { return { entries: state.entries.length, discordTable: discordTable() }; }
    });
  } catch (error) {
    console.warn('WebMCP konnte nicht registriert werden.', error);
  }
}

syncTicketIdentifiers();
setSignatureMode('type');
applyUiLanguage();
render();
registerWebMcp();
