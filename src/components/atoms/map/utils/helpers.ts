import { Map, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Geometry } from 'ol/geom';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

export function to3857(coord: Coordinate): Coordinate {
  return transform(coord, 'EPSG:4326', 'EPSG:3857');
}
export function to4326(coord: Coordinate): Coordinate {
  return transform(coord, 'EPSG:3857', 'EPSG:4326');
}

export function removeFeaturesOnVector(type: string, vectorSource: VectorSource<Geometry>): void {
  const features = vectorSource.getFeatures();
  if (features.length > 0) {
    features.forEach((feature) => {
      const featureType = feature.get('type');
      if (featureType === type) {
        vectorSource.removeFeature(feature);
      }
    });
  }
}

export function styleCursorOnFeatures(map: Map): void {
  map.on('pointermove', (event) => {
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : '';
  });
}

export function addOverlayToMap(map: Map, onClose?: () => void): Overlay {
  const container = document.getElementById('popup') ?? undefined;
  const closer = document.getElementById('popup-closer');

  const overlay = new Overlay({
    element: container,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });
  map.addOverlay(overlay);

  if (closer) {
    closer.onclick = () => {
      if (onClose) {
        onClose();
      }
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  } else {
    console.error('closer not found');
  }
  return overlay;
}
