import { useEffect } from 'react';
import OLTileLayer from 'ol/layer/Tile';
import { useMapStore } from '../context';
import OSM from 'ol/source/OSM';

function TileLayer({ zIndex = 0 }) {
  const tileSource = new OSM();

  const { map } = useMapStore();
  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      source: tileSource,
      zIndex,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    // eslint-disable-next-line consistent-return
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
}
export default TileLayer;
