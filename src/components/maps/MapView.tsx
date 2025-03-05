
import React, { useEffect, useRef } from 'react';
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
}

const MapView: React.FC<MapViewProps> = ({ 
  markers = [], 
  center = [-95.7129, 37.0902], // Default center of US
  zoom = 3.5,
  onMarkerClick 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: number]: mapboxgl.Marker }>({});

  useEffect(() => {
    // Initialize Mapbox only once
    if (!map.current && mapContainer.current) {
      mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZWFpIiwiYSI6ImNsbWs0cGZsZDBmcHAyam9zNTl0NTNvcWMifQ.aaM9sqJyNY_0HU5lltmY2g';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: zoom,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    return () => {
      // Clean up markers on unmount
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};
    };
  }, []);

  // Update map center and zoom when props change
  useEffect(() => {
    if (map.current) {
      map.current.flyTo({
        center: center,
        zoom: zoom,
        essential: true
      });
    }
  }, [center, zoom]);

  // Update markers when they change
  useEffect(() => {
    if (!map.current) return;

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
  }, [markers, onMarkerClick]);

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
