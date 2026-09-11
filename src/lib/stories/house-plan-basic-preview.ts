import type { RelGeoAnimationPreviewHighlight } from '../animation-story';

const SCALE = 24;
const MARGIN = 20;

type PreviewState = {
  blocks: Set<string>;
  houseWidth: number;
  terraceDepth: number;
};

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function toPx(value: number): number {
  return value * SCALE;
}

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function makeState(activeBlockIds: string[]): PreviewState {
  const blocks = new Set(activeBlockIds);
  return {
    blocks,
    houseWidth: blocks.has('param-house-width') ? 10.5 : 9,
    terraceDepth: blocks.has('param-terrace-depth') ? 2.4 : 1.6,
  };
}

function buildGeometry(state: PreviewState) {
  const site = { x: MARGIN, y: MARGIN, width: toPx(14), height: toPx(18) };
  const frontOffset = 2.5;
  const sideOffset = 2;
  const houseDepth = 13;
  const livingDepth = 4.2;
  const mainBedWidth = 4.5;
  const mainBedDepth = 3.6;
  const childBedWidth = 3.4;
  const childBedDepth = 3.2;
  const bathWidth = 2;
  const bathDepth = 2.2;
  const terraceWidth = 3.2;

  const house = {
    x: site.x + toPx(sideOffset),
    y: site.y + toPx(frontOffset),
    width: toPx(state.houseWidth),
    height: toPx(houseDepth),
  };

  const frontYard = { x: house.x, y: site.y, width: house.width, height: toPx(frontOffset) };
  const frontTerrace = {
    x: house.x + (house.width - toPx(terraceWidth)) / 2,
    y: house.y - toPx(state.terraceDepth),
    width: toPx(terraceWidth),
    height: toPx(state.terraceDepth),
  };
  const backGarden = {
    x: house.x,
    y: house.y + house.height,
    width: house.width,
    height: site.y + site.height - (house.y + house.height),
  };
  const livingRoom = { x: house.x, y: house.y, width: house.width, height: toPx(livingDepth) };
  const mainBedroom = {
    x: house.x,
    y: livingRoom.y + livingRoom.height,
    width: toPx(mainBedWidth),
    height: toPx(mainBedDepth),
  };
  const childBedroom = {
    x: house.x + house.width - toPx(childBedWidth),
    y: livingRoom.y + livingRoom.height,
    width: toPx(childBedWidth),
    height: toPx(childBedDepth),
  };
  const bathroom = {
    x: mainBedroom.x + mainBedroom.width - toPx(bathWidth),
    y: house.y + house.height - toPx(bathDepth),
    width: toPx(bathWidth),
    height: toPx(bathDepth),
  };
  const kitchen = {
    x: mainBedroom.x + mainBedroom.width,
    y: childBedroom.y + childBedroom.height,
    width: house.x + house.width - (mainBedroom.x + mainBedroom.width),
    height: house.y + house.height - (childBedroom.y + childBedroom.height),
  };

  return {
    site,
    house,
    frontYard,
    frontTerrace,
    backGarden,
    livingRoom,
    mainBedroom,
    childBedroom,
    bathroom,
    kitchen,
  };
}

function highlightClass(id: string, highlight?: RelGeoAnimationPreviewHighlight): string {
  if (!highlight || highlight.kind === 'none' || !highlight.ids.includes(id)) {
    return '';
  }

  return ` story-preview-highlight story-preview-highlight--${highlight.mode ?? 'outline'}`;
}

function rectSvg(
  id: string,
  rect: Rect,
  className: string,
  highlight?: RelGeoAnimationPreviewHighlight
): string {
  return `<rect id="${esc(id)}" class="${esc(className + highlightClass(id, highlight))}" x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" rx="0" ry="0" />`;
}

function lineSvg(
  id: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  className: string,
  highlight?: RelGeoAnimationPreviewHighlight
): string {
  return `<line id="${esc(id)}" class="${esc(className + highlightClass(id, highlight))}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
}

export function renderHousePlanPreviewSvg(
  activeBlockIds: string[],
  highlight?: RelGeoAnimationPreviewHighlight
): string {
  const state = makeState(activeBlockIds);
  const b = state.blocks;
  const g = buildGeometry(state);
  const shapes: string[] = [];

  if (b.has('site-base')) shapes.push(rectSvg('site', g.site, 'story-site', highlight));
  if (b.has('house-shell')) shapes.push(rectSvg('house', g.house, 'story-house', highlight));
  if (b.has('front-yard')) shapes.push(rectSvg('frontYard', g.frontYard, 'story-zone', highlight));
  if (b.has('front-terrace')) shapes.push(rectSvg('frontTerrace', g.frontTerrace, 'story-zone', highlight));
  if (b.has('back-garden')) shapes.push(rectSvg('backGarden', g.backGarden, 'story-zone', highlight));
  if (b.has('living-zone')) shapes.push(rectSvg('livingRoom', g.livingRoom, 'story-room', highlight));
  if (b.has('bedroom-main')) shapes.push(rectSvg('mainBedroom', g.mainBedroom, 'story-room', highlight));
  if (b.has('bedroom-child')) shapes.push(rectSvg('childBedroom', g.childBedroom, 'story-room', highlight));
  if (b.has('bathroom')) shapes.push(rectSvg('bathroom', g.bathroom, 'story-room', highlight));
  if (b.has('kitchen')) shapes.push(rectSvg('kitchen', g.kitchen, 'story-room', highlight));

  if (b.has('door-placement-front')) {
    const frontDoorY = g.frontTerrace.y + g.frontTerrace.height;
    shapes.push(
      lineSvg(
        'frontDoor',
        g.frontTerrace.x + g.frontTerrace.width / 2 - toPx(0.45),
        frontDoorY,
        g.frontTerrace.x + g.frontTerrace.width / 2 + toPx(0.45),
        frontDoorY,
        'story-opening',
        highlight
      )
    );
  }

  if (b.has('door-placement-interior')) {
    shapes.push(
      lineSvg('bedroomDoor', g.childBedroom.x, g.childBedroom.y + toPx(0.8), g.childBedroom.x, g.childBedroom.y + toPx(1.7), 'story-opening', highlight)
    );
    shapes.push(
      lineSvg('bathDoor', g.bathroom.x + g.bathroom.width / 2 - toPx(0.45), g.bathroom.y, g.bathroom.x + g.bathroom.width / 2 + toPx(0.45), g.bathroom.y, 'story-opening', highlight)
    );
  }

  if (b.has('window-placement-front')) {
    shapes.push(
      lineSvg(
        'livingWindow',
        g.livingRoom.x + g.livingRoom.width / 2 - toPx(0.6),
        g.house.y,
        g.livingRoom.x + g.livingRoom.width / 2 + toPx(0.6),
        g.house.y,
        'story-opening',
        highlight
      )
    );
  }

  if (b.has('window-placement-side')) {
    shapes.push(
      lineSvg('mainSideWindow', g.house.x, g.mainBedroom.y + g.mainBedroom.height / 2 - toPx(0.6), g.house.x, g.mainBedroom.y + g.mainBedroom.height / 2 + toPx(0.6), 'story-opening', highlight)
    );
    shapes.push(
      lineSvg('kitchenBackWindow', g.kitchen.x + g.kitchen.width / 2 - toPx(0.6), g.house.y + g.house.height, g.kitchen.x + g.kitchen.width / 2 + toPx(0.6), g.house.y + g.house.height, 'story-opening', highlight)
    );
  }

  if (b.has('bed-symbol')) {
    const bed: Rect = {
      x: g.mainBedroom.x + (g.mainBedroom.width - toPx(1.8)) / 2,
      y: g.mainBedroom.y + (g.mainBedroom.height - toPx(2)) / 2,
      width: toPx(1.8),
      height: toPx(2),
    };
    shapes.push(rectSvg('mainBed', bed, 'story-furniture', highlight));
  }

  if (b.has('table-symbol')) {
    const table: Rect = {
      x: g.livingRoom.x + (g.livingRoom.width - toPx(1.4)) / 2,
      y: g.livingRoom.y + (g.livingRoom.height - toPx(0.8)) / 2,
      width: toPx(1.4),
      height: toPx(0.8),
    };
    shapes.push(rectSvg('familyTable', table, 'story-furniture', highlight));
  }

  if (b.has('kitchen-counter')) {
    const counter: Rect = {
      x: g.kitchen.x + toPx(0.2),
      y: g.kitchen.y + g.kitchen.height - toPx(0.8),
      width: g.kitchen.width - toPx(0.4),
      height: toPx(0.6),
    };
    shapes.push(rectSvg('kitchenCounter', counter, 'story-furniture', highlight));
  }

  const width = g.site.width + MARGIN * 2;
  const height = g.site.height + MARGIN * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="story-preview-svg" role="img" aria-label="House plan story preview">
  <rect x="0" y="0" width="${width}" height="${height}" fill="#fbfcf8" />
  ${shapes.join('\n  ')}
</svg>`;
}
