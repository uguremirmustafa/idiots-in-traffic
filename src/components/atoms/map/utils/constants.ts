import { to3857 } from './helpers';

export const defaultSettings = {
  center: to3857([40.33281103990997, 40.0091020666939]),
  height: '100vh',
  projection: 'EPSG:3857',
  zoom: 10,
};

export const MAP_ICON_HEIGHT = 50;
export const MAIN_ICON_HEIGHT = 40;
