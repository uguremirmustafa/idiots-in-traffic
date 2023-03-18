import RMap from 'components/atoms/map/base/Map';
import TileLayer from 'components/atoms/map/layers/Tile.layer';
import React, { useEffect, useState } from 'react';
import VectorLayer from 'components/atoms/map/layers/Vector.layer';
import MapContextProvider, { useMapStore } from 'components/atoms/map/context';
import { Coordinate } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import { Feature, MapBrowserEvent, Overlay } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { getReportPointStyle } from 'components/atoms/map/utils/styles';
import { removeFeaturesOnVector } from 'components/atoms/map/utils/helpers';
import NewReport from './NewReport';
import { useModal } from 'store';

interface Reporter {
  name: string;
}

interface ReportPoint {
  type: 'report';
  coordinate: Coordinate;
  reporter?: Reporter;
}
function ReportMapContent() {
  const { map } = useMapStore();
  const { setModal } = useModal();
  let overlay: Overlay | null = null;

  const [points, setPoints] = useState<ReportPoint[]>([]);

  const vectorSource = new VectorSource();

  useEffect(() => {
    if (map) {
      map?.on('singleclick', handleClick);
    }
    return () => {
      if (map) {
        map.un('singleclick', handleClick);
      }
    };
  }, [map]);

  const handleClick = async (event: MapBrowserEvent<any>) => {
    const hasFeatureOnPixel = event.map.hasFeatureAtPixel(event.pixel);

    const clickedCoord = event.map.getCoordinateFromPixel(event.pixel);
    if (clickedCoord && !hasFeatureOnPixel) {
      const lon = clickedCoord[0];
      const lat = clickedCoord[1];

      setModal({ id: 'add-report', content: <NewReport /> });

      const reportPoint: ReportPoint = {
        type: 'report',
        coordinate: [lon, lat],
        reporter: {
          name: 'ugur',
        },
      };
      setPoints((old) => {
        const pointCollection: Feature<Geometry>[] = [];
        [...old, reportPoint].forEach((point) => {
          const feature = new Feature({
            type: point.type,
            geometry: new Point(point.coordinate),
          });
          feature.set('businessData', point.reporter);
          feature.setStyle(getReportPointStyle());
          pointCollection.push(feature);
        });
        vectorSource.addFeatures(pointCollection);
        return [...old, reportPoint];
      });
    }
  };

  const readyForInit = !!vectorSource && !!map;

  useEffect(() => {
    if (readyForInit) {
      const pointCollection: Feature<Geometry>[] = [];

      removeFeaturesOnVector('report', vectorSource);

      // initialize other points
      points.forEach((point) => {
        const feature = new Feature({
          type: point.type,
          geometry: new Point(point.coordinate),
        });
        feature.set('businessData', point.reporter);
        feature.setStyle(getReportPointStyle());
        pointCollection.push(feature);
      });

      // add points to the vector
      vectorSource.addFeatures(pointCollection);
    }
  }, [readyForInit]);

  return (
    <>
      <TileLayer />
      <VectorLayer source={vectorSource} />
    </>
  );
}

function ReportMap() {
  return (
    <MapContextProvider>
      <RMap>
        <ReportMapContent />
      </RMap>
    </MapContextProvider>
  );
}

export default ReportMap;
