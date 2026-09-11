import {
  buildAnimationStep,
  type RelGeoAnimationBlock,
  type RelGeoAnimationStory,
} from '../animation-story';

const header = `version: 0.5
scene:
  unit: m
  padding: 0
metaPresets:
  siteLand:
    fill: "#edf4e7"
    stroke: "#8ea67f"
  houseMass:
    fill: "#f8f5ef"
    stroke: "#49566a"
  outdoorZone:
    fill: "#eef7fb"
    stroke: "#7ea2b3"
  roomZone:
    fill: "#f7f2e8"
    stroke: "#7b6c53"
  opening:
    stroke: "#264653"
  furniture:
    fill: "#e8eef7"
    stroke: "#60738d"`;

const blocks: Record<string, RelGeoAnimationBlock> = {
  'site-base': {
    id: 'site-base',
    title: 'Tanah',
    order: 10,
    text: `params:
  lotWidth: 14
  lotDepth: 18

objects:
  site:
    type: rect
    size: [lotWidth, lotDepth]
    place:
      topLeft: [0, 0]
    metaPreset: siteLand`,
  },
  'house-shell': {
    id: 'house-shell',
    title: 'Rumah utama',
    order: 20,
    text: `params:
  houseWidth: 9
  houseDepth: 13
  frontOffset: 2.5
  sideOffset: 2

objects:
  house:
    type: rect
    size: [houseWidth, houseDepth]
    place:
      topLeft: [sideOffset, frontOffset]
    metaPreset: houseMass`,
  },
  'front-yard': {
    id: 'front-yard',
    title: 'Taman depan',
    order: 30,
    text: `objects:
  frontYard:
    type: rect
    size: [house.width, frontOffset]
    place:
      topLeft: [house.left, site.top]
    metaPreset: outdoorZone`,
  },
  'front-terrace': {
    id: 'front-terrace',
    title: 'Teras depan',
    order: 40,
    text: `params:
  terraceDepth: 1.6
  terraceWidth: 3.2

objects:
  frontTerrace:
    type: rect
    size: [terraceWidth, terraceDepth]
    place:
      bottom: house.top
      centerX: house.centerX
    metaPreset: outdoorZone`,
  },
  'back-garden': {
    id: 'back-garden',
    title: 'Kebun belakang',
    order: 50,
    text: `objects:
  backGarden:
    type: rect
    size: [house.width, site.bottom - house.bottom]
    place:
      topLeft: [house.left, house.bottom]
    metaPreset: outdoorZone`,
  },
  'living-zone': {
    id: 'living-zone',
    title: 'Ruang keluarga',
    order: 60,
    text: `params:
  livingDepth: 4.2

objects:
  livingRoom:
    type: rect
    size: [house.width, livingDepth]
    place:
      topLeft: [house.left, house.top]
    metaPreset: roomZone`,
  },
  'bedroom-main': {
    id: 'bedroom-main',
    title: 'Kamar utama',
    order: 70,
    text: `params:
  mainBedWidth: 4.5
  mainBedDepth: 3.6

objects:
  mainBedroom:
    type: rect
    size: [mainBedWidth, mainBedDepth]
    place:
      topLeft: [house.left, livingRoom.bottom]
    metaPreset: roomZone`,
  },
  'bedroom-child': {
    id: 'bedroom-child',
    title: 'Kamar anak',
    order: 80,
    text: `params:
  childBedWidth: 3.4
  childBedDepth: 3.2

objects:
  childBedroom:
    type: rect
    size: [childBedWidth, childBedDepth]
    place:
      topRight: [house.right, livingRoom.bottom]
    metaPreset: roomZone`,
  },
  bathroom: {
    id: 'bathroom',
    title: 'Kamar mandi',
    order: 90,
    text: `params:
  bathWidth: 2
  bathDepth: 2.2

objects:
  bathroom:
    type: rect
    size: [bathWidth, bathDepth]
    place:
      right: mainBedroom.right
      bottom: house.bottom
    metaPreset: roomZone`,
  },
  kitchen: {
    id: 'kitchen',
    title: 'Dapur',
    order: 100,
    text: `objects:
  kitchen:
    type: rect
    size: [house.right - mainBedroom.right, house.bottom - childBedroom.bottom]
    place:
      bottomRight: house.bottomRight
    metaPreset: roomZone`,
  },
  'door-component': {
    id: 'door-component',
    title: 'Komponen pintu',
    order: 110,
    text: `components:
  doorLeaf:
    type: line
    length: 0.9
    metaPreset: opening`,
  },
  'window-component': {
    id: 'window-component',
    title: 'Komponen jendela',
    order: 120,
    text: `components:
  windowSlot:
    type: line
    length: 1.2
    metaPreset: opening`,
  },
  'door-placement-front': {
    id: 'door-placement-front',
    title: 'Pintu depan',
    order: 130,
    text: `objects:
  frontDoor:
    use: doorLeaf
    place:
      bottomCenter: frontTerrace.bottomCenter`,
  },
  'door-placement-interior': {
    id: 'door-placement-interior',
    title: 'Pintu interior',
    order: 140,
    text: `objects:
  bedroomDoor:
    use: doorLeaf
    place:
      left: childBedroom.left
      centerY: childBedroom.top + 0.8

  bathDoor:
    use: doorLeaf
    place:
      top: bathroom.top
      centerX: bathroom.centerX`,
  },
  'window-placement-front': {
    id: 'window-placement-front',
    title: 'Jendela depan',
    order: 150,
    text: `objects:
  livingWindow:
    use: windowSlot
    place:
      bottom: house.top
      centerX: livingRoom.centerX`,
  },
  'window-placement-side': {
    id: 'window-placement-side',
    title: 'Jendela samping',
    order: 160,
    text: `objects:
  mainSideWindow:
    use: windowSlot
    place:
      right: house.left
      centerY: mainBedroom.centerY

  kitchenBackWindow:
    use: windowSlot
    place:
      top: house.bottom
      centerX: kitchen.centerX`,
  },
  'bed-symbol': {
    id: 'bed-symbol',
    title: 'Tempat tidur',
    order: 170,
    text: `objects:
  mainBed:
    type: rect
    size: [1.8, 2]
    place:
      center: mainBedroom.center
    metaPreset: furniture`,
  },
  'table-symbol': {
    id: 'table-symbol',
    title: 'Meja sederhana',
    order: 180,
    text: `objects:
  familyTable:
    type: rect
    size: [1.4, 0.8]
    place:
      center: livingRoom.center
    metaPreset: furniture`,
  },
  'kitchen-counter': {
    id: 'kitchen-counter',
    title: 'Counter dapur',
    order: 190,
    text: `objects:
  kitchenCounter:
    type: rect
    size: [kitchen.width - 0.4, 0.6]
    place:
      left: kitchen.left + 0.2
      top: kitchen.bottom - 0.8
    metaPreset: furniture`,
  },
  'param-terrace-depth': {
    id: 'param-terrace-depth',
    title: 'Ubah kedalaman teras',
    order: 200,
    text: `params:
  terraceDepth: 2.4`,
  },
  'param-house-width': {
    id: 'param-house-width',
    title: 'Ubah lebar rumah',
    order: 210,
    text: `params:
  houseWidth: 10.5`,
  },
};

const storyBase = {
  id: 'house-plan-basic',
  title: 'House Plan Basic',
  intent:
    'Show one house plan growing from lot context to room structure, openings, furniture, and parameter changes.',
  header,
  blocks,
};

export const housePlanBasicStory: RelGeoAnimationStory = {
  ...storyBase,
  steps: [
    buildAnimationStep(storyBase, {
      id: 'site-base',
      label: 'Tanah',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['site-base'] },
      activeBlockIds: ['site-base'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['site-base'] },
      previewHighlight: { kind: 'region', ids: ['site'], mode: 'outline' },
      note: 'Tapak dasar muncul.',
    }),
    buildAnimationStep(storyBase, {
      id: 'house-shell',
      label: 'Rumah utama',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['house-shell'] },
      activeBlockIds: ['site-base', 'house-shell'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['house-shell'] },
      previewHighlight: { kind: 'objects', ids: ['house'], mode: 'wash' },
      note: 'Rumah muncul relatif terhadap tanah.',
    }),
    buildAnimationStep(storyBase, {
      id: 'front-yard',
      label: 'Taman depan',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['front-yard'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['front-yard'] },
      previewHighlight: { kind: 'region', ids: ['frontYard'], mode: 'wash' },
      note: 'Area depan mulai terbaca.',
    }),
    buildAnimationStep(storyBase, {
      id: 'front-terrace',
      label: 'Teras depan',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['front-terrace'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['front-terrace'] },
      previewHighlight: { kind: 'region', ids: ['frontTerrace'], mode: 'outline' },
      note: 'Titik akses depan mulai terasa.',
    }),
    buildAnimationStep(storyBase, {
      id: 'back-garden',
      label: 'Kebun belakang',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['back-garden'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['back-garden'] },
      previewHighlight: { kind: 'region', ids: ['backGarden'], mode: 'wash' },
      note: 'Tapak rumah terasa utuh.',
    }),
    buildAnimationStep(storyBase, {
      id: 'living-zone',
      label: 'Ruang keluarga',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['living-zone'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['living-zone'] },
      previewHighlight: { kind: 'objects', ids: ['livingRoom'], mode: 'wash' },
      note: 'Zoning interior dimulai.',
    }),
    buildAnimationStep(storyBase, {
      id: 'bedroom-main',
      label: 'Kamar utama',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['bedroom-main'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['bedroom-main'] },
      previewHighlight: { kind: 'objects', ids: ['mainBedroom'], mode: 'wash' },
      note: 'Rumah mulai terbagi secara fungsional.',
    }),
    buildAnimationStep(storyBase, {
      id: 'bedroom-child',
      label: 'Kamar anak',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['bedroom-child'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['bedroom-child'] },
      previewHighlight: { kind: 'objects', ids: ['childBedroom'], mode: 'wash' },
      note: 'Jumlah ruang bertambah.',
    }),
    buildAnimationStep(storyBase, {
      id: 'bathroom',
      label: 'Kamar mandi',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['bathroom'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['bathroom'] },
      previewHighlight: { kind: 'objects', ids: ['bathroom'], mode: 'wash' },
      note: 'Ruang servis mulai tampak.',
    }),
    buildAnimationStep(storyBase, {
      id: 'kitchen',
      label: 'Dapur',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['kitchen'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['kitchen'] },
      previewHighlight: { kind: 'objects', ids: ['kitchen'], mode: 'wash' },
      note: 'Zoning dasar lengkap.',
    }),
    buildAnimationStep(storyBase, {
      id: 'door-component',
      label: 'Definisi komponen pintu',
      kind: 'definition',
      blockDelta: { op: 'add', blockIds: ['door-component'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component'],
      visualChange: false,
      sourceHighlight: { kind: 'block', blockIds: ['door-component'] },
      previewHighlight: { kind: 'none' },
      note: 'Vocabulary pintu dibangun.',
    }),
    buildAnimationStep(storyBase, {
      id: 'window-component',
      label: 'Definisi komponen jendela',
      kind: 'definition',
      blockDelta: { op: 'add', blockIds: ['window-component'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component'],
      visualChange: false,
      sourceHighlight: { kind: 'block', blockIds: ['window-component'] },
      previewHighlight: { kind: 'none' },
      note: 'Vocabulary jendela disiapkan, tetapi belum dipaksa tampil.',
    }),
    buildAnimationStep(storyBase, {
      id: 'door-placement-front',
      label: 'Pintu depan',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['door-placement-front'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['door-placement-front'] },
      previewHighlight: { kind: 'objects', ids: ['frontDoor'], mode: 'pulse' },
      note: 'Komponen definisi mulai tampak.',
    }),
    buildAnimationStep(storyBase, {
      id: 'door-placement-interior',
      label: 'Pintu antar ruang',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['door-placement-interior'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['door-placement-interior'] },
      previewHighlight: { kind: 'objects', ids: ['bedroomDoor', 'bathDoor'], mode: 'pulse' },
      note: 'Wiring ruang mulai terbaca.',
    }),
    buildAnimationStep(storyBase, {
      id: 'window-placement-front',
      label: 'Jendela depan',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['window-placement-front'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior', 'window-placement-front'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['window-placement-front'] },
      previewHighlight: { kind: 'objects', ids: ['livingWindow'], mode: 'pulse' },
      note: 'Bukaan muncul saat konteks dinding sudah cukup matang.',
    }),
    buildAnimationStep(storyBase, {
      id: 'window-placement-side',
      label: 'Jendela samping',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['window-placement-side'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior', 'window-placement-front', 'window-placement-side'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['window-placement-side'] },
      previewHighlight: { kind: 'objects', ids: ['mainSideWindow', 'kitchenBackWindow'], mode: 'pulse' },
      note: 'Ventilasi dan pencahayaan mulai terasa.',
    }),
    buildAnimationStep(storyBase, {
      id: 'bed-symbol',
      label: 'Tempat tidur',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['bed-symbol'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior', 'window-placement-front', 'window-placement-side', 'bed-symbol'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['bed-symbol'] },
      previewHighlight: { kind: 'objects', ids: ['mainBed'], mode: 'wash' },
      note: 'Detail furnitur mulai hidup.',
    }),
    buildAnimationStep(storyBase, {
      id: 'table-symbol',
      label: 'Meja sederhana',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['table-symbol'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior', 'window-placement-front', 'window-placement-side', 'bed-symbol', 'table-symbol'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['table-symbol'] },
      previewHighlight: { kind: 'objects', ids: ['familyTable'], mode: 'wash' },
      note: 'Ruang terasa lebih fungsional.',
    }),
    buildAnimationStep(storyBase, {
      id: 'kitchen-counter',
      label: 'Counter dapur',
      kind: 'manifestation',
      blockDelta: { op: 'add', blockIds: ['kitchen-counter'] },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior', 'window-placement-front', 'window-placement-side', 'bed-symbol', 'table-symbol', 'kitchen-counter'],
      visualChange: true,
      sourceHighlight: { kind: 'block', blockIds: ['kitchen-counter'] },
      previewHighlight: { kind: 'objects', ids: ['kitchenCounter'], mode: 'wash' },
      note: 'Perangkat servis mulai tampak.',
    }),
    buildAnimationStep(storyBase, {
      id: 'param-terrace-depth',
      label: 'Ubah kedalaman teras',
      kind: 'manifestation',
      blockDelta: {
        op: 'replace-value',
        blockId: 'front-terrace',
        key: 'terraceDepth',
        from: '1.6',
        to: '2.4',
      },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior', 'window-placement-front', 'window-placement-side', 'bed-symbol', 'table-symbol', 'kitchen-counter', 'param-terrace-depth'],
      visualChange: true,
      sourceHighlight: {
        kind: 'token',
        blockIds: ['front-terrace', 'param-terrace-depth'],
        tokenKeys: ['terraceDepth'],
      },
      previewHighlight: { kind: 'region', ids: ['frontTerrace', 'frontDoor'], mode: 'wash' },
      note: 'Parameter lokal mengubah area terkait.',
    }),
    buildAnimationStep(storyBase, {
      id: 'param-house-width',
      label: 'Ubah lebar rumah',
      kind: 'manifestation',
      blockDelta: {
        op: 'replace-value',
        blockId: 'house-shell',
        key: 'houseWidth',
        from: '9',
        to: '10.5',
      },
      activeBlockIds: ['site-base', 'house-shell', 'front-yard', 'front-terrace', 'back-garden', 'living-zone', 'bedroom-main', 'bedroom-child', 'bathroom', 'kitchen', 'door-component', 'window-component', 'door-placement-front', 'door-placement-interior', 'window-placement-front', 'window-placement-side', 'bed-symbol', 'table-symbol', 'kitchen-counter', 'param-terrace-depth', 'param-house-width'],
      visualChange: true,
      sourceHighlight: {
        kind: 'token',
        blockIds: ['house-shell', 'param-house-width'],
        tokenKeys: ['houseWidth'],
      },
      previewHighlight: { kind: 'objects', ids: ['house', 'livingRoom', 'kitchen', 'livingWindow'], mode: 'wash' },
      note: 'Model beradaptasi sebagai sistem, bukan shape tunggal.',
    }),
  ],
};
