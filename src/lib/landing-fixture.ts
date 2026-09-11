import { compileRelGeo } from '@relgeo/core';
import { renderToSVG } from '@relgeo/renderer-svg';
import { RelGeoLanguageService } from '@relgeo/language-service';
import { buildHighlightedHtml } from '@relgeo/remark-relgeo-hl';

export const landingFixtureSource = `version: 0.5
metaPresets:
  plate:
    fill: "#e2e8f0"
    stroke: "#162033"
  detail:
    fill: "#f7fbfa"
    stroke: "#0f6370"
  guide:
    fill: "none"
    stroke: "#0f6370"
objects:
  panel:
    type: rect
    size: [120, 72]
    place:
      topLeft: [0, 0]
    metaPreset: plate
  screen:
    type: rect
    size: [72, 34]
    place:
      centerX: panel.centerX
      centerY: panel.centerY
    metaPreset: detail
  hub:
    type: circle
    radius: 8
    place:
      center: panel.center
    metaPreset: detail
  leftMark:
    type: circle
    radius: 3
    place:
      centerX: panel.left + 18
      centerY: panel.centerY
    metaPreset: detail
  rightMark:
    type: circle
    radius: 3
    place:
      centerX: panel.right - 18
      centerY: panel.centerY
    metaPreset: detail
  orbit:
    type: ellipse
    size: [58, 40]
    center: panel.center
    rotation: 0.18
    metaPreset: guide
  axis:
    type: line
    from: [panel.left, panel.centerY]
    to: [panel.right, panel.centerY]
    metaPreset: detail`;

const languageService = new RelGeoLanguageService();
const sourceLines = landingFixtureSource.split('\n');

export const landingFixtureSourceHtml = buildHighlightedHtml(
  sourceLines.map((text, index) => ({ text, lineNumber: index + 1 })),
  languageService.getSemanticTokens(landingFixtureSource),
  'relgeo-hl'
);

export const landingFixtureSvg = renderToSVG(
  compileRelGeo(landingFixtureSource, { targetUnit: 'px' }),
  { padding: 12 }
);
