import React, { useState, useEffect } from 'react';
import { stores } from '../data/mock';
import { MapPin, Navigation } from 'lucide-react';

const NearbyStores = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get user's current location
  const getCurrentLocation = () => {
    setLoading(true);
    setNotification(null);

    if (!navigator.geolocation) {
      setNotification({ type: 'error', message: 'Geolocation is not supported by this browser.' });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        // Find nearby stores within 50km radius
        const nearby = stores
          .map(store => {
            const distance = calculateDistance(
              latitude, longitude,
              store.location.lat, store.location.lng
            );
            return { ...store, distance };
          })
          .filter(store => store.distance <= 50)
          .sort((a, b) => a.distance - b.distance);

        setNearbyStores(nearby);

        if (nearby.length > 0) {
          setNotification({ type: 'success', message: `Found ${nearby.length} stores near you.` });
        } else {
          setNotification({ type: 'info', message: 'No nearby stores found within 50km.' });
        }
        setLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            break;
        }
        setNotification({ type: 'error', message: errorMessage });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Auto-hide notification after 2 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Notification UI
  return (
    <div>
      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3
            ${notification.type === 'success' ? 'bg-green-100 text-green-800' : ''}
            ${notification.type === 'error' ? 'bg-red-100 text-red-800' : ''}
            ${notification.type === 'info' ? 'bg-blue-100 text-blue-800' : ''}
          `}
        >
          <MapPin className="h-5 w-5" />
          <span>{notification.message}</span>
          {loading && <Navigation className="h-4 w-4 animate-spin" />}
        </div>
      )}
    </div>
  );
};

export default NearbyStores;