import 'ol/ol.css';
import { ReactNode, useEffect, useRef } from 'react';
import { ProjectionLike } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import * as ol from 'ol';
import { useMapStore } from '../context';
import { styleCursorOnFeatures } from '../utils/helpers';
import { defaultSettings } from '../utils/constants';

interface IProps {
  center?: Coordinate;
  children: ReactNode;
  zoom?: number;
  projection?: ProjectionLike;
  height?: string;
}

function RMap(props: IProps): JSX.Element {
  const {
    center = defaultSettings.center,
    zoom = defaultSettings.zoom,
    projection = defaultSettings.projection,
    height = defaultSettings.height,
    children,
  } = props;

  const { populateMap, removeMap, map } = useMapStore();

  const mapId = useRef();

  useEffect(() => {
    const theMap = new ol.Map({
      view: new ol.View({
        center,
        zoom,
        projection,
      }),
      layers: [],
    });
    theMap.setTarget(mapId.current);
    populateMap(theMap);
    styleCursorOnFeatures(theMap);

    return () => {
      if (!theMap) return;
      theMap.setTarget(undefined);
      removeMap();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom, map]);
  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center, map]);

  return (
    // @ts-ignore
    <div ref={mapId} style={{ width: '100%', height }}>
      {children}
    </div>
  );
}

export default RMap;
