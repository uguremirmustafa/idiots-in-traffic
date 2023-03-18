import { useEffect } from 'react';
import OLVectorLayer from 'ol/layer/Vector';
import { Geometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import { useMapStore } from '../context';

interface IProps {
  source: VectorSource<Geometry>;
  zIndex?: number;
}

function VectorLayer(props: IProps) {
  const { source, zIndex = 0 } = props;
  const { map } = useMapStore();
  useEffect(() => {
    if (!map) return;
    const vectorLayer = new OLVectorLayer({
      source,
      zIndex,
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    // eslint-disable-next-line consistent-return
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
}
export default VectorLayer;
