import { compileRelGeo } from 'relgeo-core';
import { renderToSVG } from 'relgeo-renderer-svg';

import heroFixtureSource from './landing-hero.relgeo.yaml?raw';

export { heroFixtureSource };

export const heroFixtureSvg = renderToSVG(
  compileRelGeo(heroFixtureSource, { targetUnit: 'px' }),
  { padding: 0 }
);
