import React, { useEffect, useRef, useState } from "react";

// Declare google as a global variable
declare global {
  interface Window {
    google: typeof google;
  }
  var google: any;
}

const MapContainer = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const loadMap = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 13,
          };
          const map = new google.maps.Map(mapRef.current!, mapOptions);
          setMap(map);
        },
        () => {
          // fallback to default location (e.g., Toronto)
          const map = new google.maps.Map(mapRef.current!, {
            center: { lat: 43.65107, lng: -79.347015 },
            zoom: 12,
          });
          setMap(map);
        }
      );
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

      script.async = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  return <div ref={mapRef} className="absolute inset-0" />;
};

export default MapContainer;
