
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  markers?: Array<{
    id: number;
    latitude: number;
    longitude: number;
    title: string;
    description?: string;
  }>;
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (id: number) => void;
  mapboxToken?: string;
}

const MapView: React.FC<MapViewProps> = ({ 
  markers = [], 
  center = [-95.7129, 37.0902], // Default center of US
  zoom = 3.5,
  onMarkerClick,
  mapboxToken
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});
  const [error, setError] = useState<string | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Clear any previous errors when token changes
  useEffect(() => {
    if (mapboxToken) {
      setError(null);
    }
  }, [mapboxToken]);

  useEffect(() => {
    // Clean up previous map instance if it exists
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    // Initialize Mapbox
    if (mapContainer.current && mapboxToken) {
      if (!mapboxToken.trim()) {
        setError("Please enter a valid Mapbox access token");
        return;
      }
      
      try {
        console.log("Initializing map with token:", mapboxToken.substring(0, 5) + "...");
        mapboxgl.accessToken = mapboxToken;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: center,
          zoom: zoom,
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.current.on('load', () => {
          console.log("Map loaded successfully");
          setMapInitialized(true);
        });

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          // Fix: Check for unauthorized errors without relying on status property
          if (e.error && e.error.message && e.error.message.includes('unauthorized')) {
            setError("Invalid Mapbox token. Please enter a valid access token.");
          } else {
            setError(`Map error: ${e.error ? e.error.message : 'Unknown error'}`);
          }
        });
      } catch (err) {
        console.error('Error initializing map:', err);
        setError(`Error initializing map: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    } else if (!mapboxToken) {
      setError("Please enter a valid Mapbox access token");
    }

    return () => {
      // Clean up markers on unmount
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};
      
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (map.current && mapInitialized) {
      map.current.flyTo({
        center: center,
        zoom: zoom,
        essential: true
      });
    }
  }, [center, zoom, mapInitialized]);

  // Update markers when they change
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    // Remove all existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    markers.forEach(marker => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${marker.title}</h3>${marker.description ? `<p>${marker.description}</p>` : ''}`
      );

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/pin.png)';
      el.style.width = '32px';
      el.style.height = '32px';
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';

      if (onMarkerClick) {
        el.addEventListener('click', () => onMarkerClick(marker.id));
      }

      const mapboxMarker = new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current[marker.id] = mapboxMarker;
    });
  }, [markers, onMarkerClick, mapInitialized]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-sm text-gray-600">
          You need to provide a valid Mapbox access token.<br />
          Visit <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">mapbox.com</a> and sign up for an account to get your token.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-md" />
      <style>
        {`.mapboxgl-marker {
          cursor: pointer;
        }`}
      </style>
    </div>
  );
};

export default MapView;
