import React, { useEffect, useRef, useState } from "react";
import { mockListings } from "../data/mockListings";

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
  const [showProperties, setShowProperties] = useState(false);

  useEffect(() => {
    const initMap = (center: any) => {
      const mapInstance = new google.maps.Map(mapRef.current!, {
        center,
        zoom: 12,
      });
      setMap(mapInstance);

      if (mockListings.length > 0) {
        mockListings.forEach((listing) => {
          new google.maps.Marker({
            position: { lat: listing.lat, lng: listing.lng },
            map: mapInstance,
            title: listing.title,
          });
        });
        setShowProperties(true);
      }
    };

    const loadMap = () => {
      // Prefer center from mock listing
      if (mockListings.length > 0) {
        const first = mockListings[0];
        initMap({ lat: first.lat, lng: first.lng });
      } else {
        // Fallback: get user's location
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            initMap({ lat: latitude, lng: longitude });
          },
          () => {
            // Fallback: default Toronto
            initMap({ lat: 43.65107, lng: -79.347015 });
          }
        );
      }
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

  return (
    <div className="w-full h-full relative flex">
      <div ref={mapRef} className="w-full h-full" />

      {showProperties && (
        <div className="absolute top-0 right-0 w-80 h-full bg-white border-l border-gray-300 overflow-y-auto shadow-lg z-10">
          <div className="p-4 border-b font-semibold text-lg">Property Results</div>
          <div className="space-y-4 p-4">
            {mockListings.map((property) => (
              <div key={property.id} className="border rounded shadow-sm p-2">
                <img src={property.image} alt="property" className="w-full h-32 object-cover rounded" />
                <div className="font-bold text-sm mt-2">{property.title}</div>
                <div className="text-sm text-gray-500">{property.address}</div>
                <div className="text-blue-600 font-semibold">${property.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
