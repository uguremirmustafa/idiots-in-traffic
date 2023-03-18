import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { MAP_ICON_HEIGHT } from './constants';
// import house_marker from 'assets/shared/images/house_marker.svg';
// import island_container from 'assets/shared/images/island_container.svg';

const icon = '//cdn.rawgit.com/openlayers/ol3/master/examples/data/icon.png';

// export const homeStyle = new Style({
//   image: new Icon({
//     anchor: [0.5, 1],
//     src: house_marker,
//     height: MAP_ICON_HEIGHT,
//   }),
// });
// export const islandStyle = new Style({
//   image: new Icon({
//     anchor: [0.5, 1],
//     src: island_container,
//     height: (MAP_ICON_HEIGHT * 80) / 100,
//   }),
// });

interface ContainerStyleParams {
  url: string;
}

export const getReportPointStyle = (): Style => {
  return new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: icon,
      height: MAP_ICON_HEIGHT,
    }),
  });
};
