import { Map, Overlay } from 'ol';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface InitialValues {
  map: null | Map;
  populateMap: (map: Map) => void;
  removeMap: () => void;
  // overlay: null | Overlay;
  // setOverlay: React.Dispatch<React.SetStateAction<Overlay | null>>;
}

const initialValues: InitialValues = {
  map: null,
  populateMap: (map: unknown) => {},
  removeMap: () => {},
  // overlay: null,
  // setOverlay: () => {},
};

const MapContext = createContext<InitialValues>(initialValues);

function MapContextProvider({ children }: { children: ReactNode }): JSX.Element {
  const [map, setMap] = useState<Map | null>(null);
  // const [overlay, setOverlay] = useState<Overlay | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function populateMap(mapGenerated: Map) {
    setMap(mapGenerated);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function removeMap() {
    setMap(null);
  }

  const contextValue = useMemo(
    () => ({
      map,
      populateMap,
      removeMap,
    }),
    [map, populateMap, removeMap]
  );

  return <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>;
}
export default MapContextProvider;

export const useMapStore = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapStore must be used in a component within a MapContextProvider.');
  }
  return context;
};
