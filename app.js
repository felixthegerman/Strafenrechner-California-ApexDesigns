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
  {code:'HSC 11350',name:'Besitz kontrollierter Substanzen',short:'Drogenbesitz',type:'Misd.',months:12,fine:70,jail:'1 Jahr',fineText:'$70',aliases:['drug possession','controlled substance possession','kokainbesitz','heroinbesitz'],note:'Grundfall ohne einschlägige schwere Vorstrafe; Sonderregeln und Diversion können gelten.',source:source('HSC','11350')},
  {code:'HSC 11351',name:'Besitz kontrollierter Substanzen zum Verkauf',short:'Drogenbesitz z. Verkauf',type:'Felony',months:48,fine:20000,jail:'4 Jahre',fineText:'$20.000',aliases:['possession for sale','drug sales possession'],note:'Felony mit Straftriade von zwei, drei oder vier Jahren; zusätzliche mengen- oder vorstrafenbezogene Folgen möglich.',source:source('HSC','11351')},
  {code:'HSC 11359',name:'Cannabisbesitz zum Verkauf',short:'Cannabisverkaufsbesitz',type:'Wobbler',months:36,fine:10000,jail:'3 J. / 6 Mon.',fineText:'$10.000 / $500',aliases:['marijuana for sale','cannabis for sale'],note:'Grundfall ab 18: bis zu sechs Monate und $500; bei gesetzlichen Erschwerungsgründen Felony nach PC 1170(h).',source:source('HSC','11359')},
  {code:'HSC 11377',name:'Besitz bestimmter kontrollierter Substanzen',short:'Besitz kontroll. Stoffe',type:'Misd.',months:12,fine:70,jail:'1 Jahr',fineText:'$70',aliases:['meth possession','amphetamine possession','drug possession'],note:'Grundfall; bei bestimmten schweren Vorverurteilungen ist Felony-Behandlung möglich.',source:source('HSC','11377')}
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
  const category = item.code.startsWith('VC ')
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
    jail: item.lifeTerms ? 'Lebenslang' : `${estimated ? '≈ ' : ''}${generatedMonthsLabel(estimatedMonths)}`,
    fineText: `${estimated ? '≈ ' : ''}${generatedMoneyLabel(estimatedFine)}`,
    estimated,
    originalText: item.generated ? item.name : null,
    nameDe: item.generated ? (friendly?.[0] || `Straftatbestand nach ${item.code}`) : item.name,
    nameEn: item.generated ? (friendly?.[1] || `Offense under ${item.code}`) : (englishNames[item.code] || item.name),
    category,
    catalogId: index
  };
});

const state = { entries: [], sequence: 1, language: 'de', agency: '' };
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
  if (months === 0) return '0 Monate';
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'Jahr' : 'Jahre'}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? 'Monat' : 'Monate'}`);
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
    ? `${known} verifiziert · ${state.entries.length - known} offen`
    : 'Noch keine Auswahl';
  document.querySelector('#total-jail').textContent = totalJailLabel(total);
  document.querySelector('#total-fine').textContent = totalFineLabel(total);
  const bail = totalBail();
  document.querySelector('#total-bail').textContent = bail.label;
  document.querySelector('#bail-reason').textContent = bail.reason;
  clearButton.disabled = state.entries.length === 0;

  if (!state.entries.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h8M9 3h6v4H9zM6 5h12v16H6zM9 11h6M9 15h6"/></svg></div>
      <h3>Noch keine Delikte</h3><p>Gib links einen Code oder Suchbegriff ein, um die Berechnung zu starten.</p>
    </div>`;
  } else {
    list.innerHTML = state.entries.map((entry, index) => offenseCard(entry, index)).join('');
  }
  discordOutput.textContent = discordTable();
  document.querySelector('#embed-output').textContent = discordEmbedJson();
  if (!document.querySelector('#panel-catalog').hidden) renderCatalog();
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
        <div class="offense-title-row"><span class="code-badge">${escapeHtml(entry.code)}</span><h3>${escapeHtml(itemName(entry))}</h3>${entry.estimated ? '<span class="estimate-badge">geschätzt</span>' : ''}</div>
        <div class="offense-data"><span class="type-tag">${escapeHtml(entry.type)}</span><span>Haft: <b>${escapeHtml(prison)}</b></span><span>Geldstrafe: <b>${escapeHtml(entry.fineText)}</b></span><span>Kaution: <b>${escapeHtml(bail.label)}</b></span></div>
      </div>
      <div class="offense-actions">
        <button class="icon-button" type="button" data-remove="${entry.instanceId}" aria-label="Zeile ${index + 1} entfernen" title="Entfernen">
          <svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M8 11v7M12 11v7M16 11v7M6 7l1 14h10l1-14"/></svg>
        </button>
      </div>
    </div>
    <div class="offense-meta"><p>${escapeHtml(entry.note)} <strong>Kaution:</strong> ${escapeHtml(bail.reason)}</p><a href="${escapeHtml(entry.source)}" target="_blank" rel="noopener">Gesetzestext ↗</a></div>
  </article>`;
}

function truncate(value, max) {
  const text = String(value);
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function discordTable() {
  const widths = [25, 15, 10, 20, 14];
  const headers = ['Delikt', 'Code', 'Typ', 'Max. Haft', 'Max. Strafe'];
  const fit = (value, width) => truncate(value, width).padEnd(width, ' ');
  const border = `+${widths.map(width => '-'.repeat(width + 2)).join('+')}+`;
  const row = values => `| ${values.map((value, i) => fit(value, widths[i])).join(' | ')} |`;
  const rows = state.entries.map(entry => row([
    itemShort(entry), entry.code, entry.type, entry.jail, entry.fineText
  ]));
  const total = totals();
  const totalRow = row(['GESAMT (Maximum)', '', '', totalJailLabel(total, true), `${totalFineLabel(total)}*`]);
  const agency = (state.agency || 'Nicht angegeben').replace(/[\r\n`_]/g, ' ').trim();
  const bail = totalBail();
  const content = [`Akte von ${agency}`, '', border, row(headers), border, ...(rows.length ? rows : [row(['—', '—', '—', '—', '—'])]), border, totalRow, border,
    `Mögliche Kaution (LA County 2026): ${bail.label}`,
    `Grund: ${bail.reason}`,
    '* zzgl. gerichtlicher Aufschläge & Gebühren',
    '* kumulative Maximalrechnung; concurrent sentencing und PC 654 möglich',
    '* ≈ / geschätzt = Näherung, kein verbindlicher Gerichts- oder Kautionswert'
  ].join('\n');
  return `\`\`\`\n${content}\n\`\`\``;
}

function discordEmbedJson() {
  const total = totals();
  const bail = totalBail();
  const agency = (state.agency || 'Nicht angegeben').replace(/[\r\n`_*]/g, ' ').trim();
  const lines = state.entries.length
    ? state.entries.map((entry, index) => `**${index + 1}. ${itemShort(entry)}** · \`${entry.code}\`\n${entry.type} · Haft: ${entry.jail} · Geld: ${entry.fineText} · Kaution: ${bailFor(entry).label}`).join('\n\n')
    : '*Noch keine Delikte ausgewählt.*';
  const payload = {
    flags: 32768,
    components: [{
      type: 17,
      accent_color: 14133851,
      components: [
        { type: 10, content: `## Akte von ${agency}\nCalifornia Strafrechner` },
        { type: 14, divider: true, spacing: 1 },
        { type: 10, content: lines.slice(0, 3800) },
        { type: 14, divider: true, spacing: 1 },
        { type: 10, content: `### Gesamt (Maximum)\n**Haft:** ${totalJailLabel(total, true)}\n**Geldstrafe:** ${totalFineLabel(total)}*\n**Mögliche Kaution:** ${bail.label}\n-# ${bail.reason}` },
        { type: 14, divider: true, spacing: 1 },
        { type: 10, content: '-# Schätzwerte sind unverbindlich. Zuschläge, Gebühren, Enhancements, concurrent sentencing und PC 654 können das Ergebnis verändern.' }
      ]
    }]
  };
  return JSON.stringify(payload, null, 2);
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
}

function reportHtml() {
  const total = totals();
  const bail = totalBail();
  const agency = escapeHtml(state.agency || 'Nicht angegeben');
  const rows = state.entries.length ? state.entries.map(entry => `<tr><td>${escapeHtml(itemName(entry))}</td><td>${escapeHtml(entry.code)}</td><td>${escapeHtml(entry.type)}</td><td>${escapeHtml(entry.jail)}</td><td>${escapeHtml(entry.fineText)}</td></tr>`).join('') : '<tr><td colspan="5">Keine Delikte ausgewählt</td></tr>';
  return `<!doctype html><html><head><meta charset="utf-8"><title>California Strafrechner</title><style>body{font-family:Arial,sans-serif;color:#17202a;margin:36px}h1{margin-bottom:4px}p{color:#59636f}table{width:100%;border-collapse:collapse;margin:22px 0}th,td{border:1px solid #aab1ba;padding:8px;text-align:left;font-size:12px}th{background:#e9edf1}.total{font-weight:bold}.note{font-size:11px;color:#555}</style></head><body><h1>California Strafrechner</h1><p><strong>Akte von ${agency}</strong></p><table><thead><tr><th>Delikt</th><th>Code</th><th>Typ</th><th>Max. Haft</th><th>Max. Geldstrafe</th></tr></thead><tbody>${rows}<tr class="total"><td>GESAMT (Maximum)</td><td></td><td></td><td>${escapeHtml(totalJailLabel(total,true))}</td><td>${escapeHtml(totalFineLabel(total))}*</td></tr></tbody></table><p><strong>Mögliche Kaution (LA County 2026):</strong> ${escapeHtml(bail.label)}<br>${escapeHtml(bail.reason)}</p><p class="note">* zzgl. gerichtlicher Aufschläge & Gebühren. Kumulative Maximalrechnung; concurrent sentencing und PC 654 können die Gesamtstrafe verändern. ≈ kennzeichnet Schätzwerte. Keine Rechtsberatung.</p></body></html>`;
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
document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
  state.language = button.dataset.language;
  document.documentElement.lang = state.language;
  document.querySelectorAll('[data-language]').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  render();
  showSuggestions();
}));
const agencyInput = document.querySelector('#agency-input');
agencyInput.addEventListener('input', () => { state.agency = agencyInput.value; render(); });
document.querySelectorAll('[data-agency]').forEach(button => button.addEventListener('click', () => {
  agencyInput.value = button.dataset.agency;
  state.agency = button.dataset.agency;
  render();
}));
document.querySelector('#export-pdf').addEventListener('click', () => { activateTab('export'); window.print(); });
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

render();
registerWebMcp();
