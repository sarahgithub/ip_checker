import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import InfoCard from './components/InfoCard';
import getBrowserInfo from './utils/getBrowserInfo';

function App() {
  const [ipInfo, setIpInfo] = useState({});
  const [geoInfo, setGeoInfo] = useState(null);
  const [browserInfo, setBrowserInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchIPsAndGeo = async () => {
      try {
        // Fetch IPv4 and IPv6
        const [v4res, v6res] = await Promise.all([
          fetch('https://api.ipify.org?format=json'),
          fetch('https://api64.ipify.org?format=json')
        ]);

        const ipv4 = await v4res.json();
        const ipv6 = await v6res.json();

        setIpInfo({
          ipv4: ipv4.ip,
          ipv6: ipv6.ip
        });

        // Fetch geolocation using IPv4
        const geoRes = await fetch(`https://ipapi.co/${ipv4.ip}/json/`);
        const geoData = await geoRes.json();

        setGeoInfo(geoData);

        // Set map center
        setMapCenter({
          lat: geoData.latitude || 0,
          lng: geoData.longitude || 0
        });

      } catch (err) {
        console.error('Error fetching IP/geolocation info:', err);
      }
    };

    fetchIPsAndGeo();
    setBrowserInfo(getBrowserInfo());
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      <h1>🌍 What’s My IP Address</h1>

      <InfoCard title="Your IP Information" info={{
        'IPv4': ipInfo?.ipv4,
        'IPv6': ipInfo?.ipv6,
        'City': geoInfo?.city,
        'Region': geoInfo?.region,
        'Country': geoInfo?.country_name,
        'ISP': geoInfo?.org,
      }} />

      <InfoCard title="Your Browser Information" info={browserInfo} />

      {geoInfo && (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{
              width: '100%',
              height: '400px',
              marginBottom: '2rem',
            }}
            center={mapCenter}
            zoom={10}
          >
            <Marker position={mapCenter} />
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
}

export default App;
