import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import polyline from "@mapbox/polyline";
import Select from "react-select";
import "./Map.css";

const apiKey = process.env.REACT_APP_TOLLGURU_API_KEY;


const Map = () => {
  const [decodedRoute, setDecodedRoute] = useState([]);
  const [tollInfo, setTollInfo] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const decodePolyline = (encoded) => {
    try {
      return polyline
        .decode(encoded, { precision: 5 })
        .map((point) => [parseFloat(point[0]), parseFloat(point[1])]);
    } catch (error) {
      console.error("Invalid encoded polyline:", encoded);
      return [];
    }
  };

  const handleCalculateRoute = async () => {
    if (origin && destination) {
      try {
        // const apiKey = "qhfTMMDm6MG6T3drq69Ph4LRtmRF67GP"; 
        const originStr = `${origin.value.lat},${origin.value.lng}`;
        const destinationStr = `${destination.value.lat},${destination.value.lng}`;
  
        const response = await fetch(
          `https://apis.tollguru.com/toll/v2/calc/route?origin=${originStr}&destination=${destinationStr}`,
          {
            headers: {
              "x-api-key": apiKey,
            },
          }
        );
  
        if (!response.ok) {
          console.error(
            "Error fetching toll information. HTTP status:",
            response.status
          );
          return;
        }
  
        const data = await response.json();
  
        console.log("API Response:", data);
  
        if (data.trips && data.trips.length > 0) {
          const decoded = data.trips[0].costsByType[0].route[0].sections.map(
            (section) => decodePolyline(section.polyline)
          );
          setDecodedRoute(decoded);
          setTollInfo(data.trips[0].costsByType[0].route[0].sections);
        } else {
          console.error(
            "Invalid API response format. Expected data.trips array."
          );
        }
      } catch (error) {
        console.error("Error fetching toll information:", error);
      }
    }
  };
  

  const initialCenter = [37.0902, -95.7129];
  const initialZoom = 4;

  const tollMarkers = tollInfo.map((toll, index) => (
    <Marker
      key={index}
      position={[toll.startLocation.lat, toll.startLocation.lng]}
    >
      <Popup>
        <strong>Toll Booth:</strong> {toll.startName}, <strong>Cost:</strong>{" "}
        {toll.cost}
      </Popup>
    </Marker>
  ));

  const tollTableRows = tollInfo.map((toll, index) => (
    <tr key={index}>
      <td>{toll.startName}</td>
      <td>{toll.cost}</td>
    </tr>
  ));

  const originOptions = [
    { value: { lat: 37.7749, lng: -122.4194 }, label: "San Francisco, CA" },
    { value: { lat: 34.0522, lng: -118.2437 }, label: "Los Angeles, CA" },
    { value: { lat: 40.7128, lng: -74.006 }, label: "New York, NY" },
    { value: { lat: 41.8781, lng: -87.6298 }, label: "Chicago, IL" },
    { value: { lat: 29.7604, lng: -95.3698 }, label: "Houston, TX" },
    { value: { lat: 33.4484, lng: -112.074 }, label: "Phoenix, AZ" },
    { value: { lat: 32.7767, lng: -96.797 }, label: "Dallas, TX" },
    { value: { lat: 37.3382, lng: -121.8863 }, label: "San Jose, CA" },
    { value: { lat: 30.2672, lng: -97.7431 }, label: "Austin, TX" },
    { value: { lat: 39.9526, lng: -75.1652 }, label: "Philadelphia, PA" },
   
  ];

  const destinationOptions = [
    { value: { lat: 37.7749, lng: -122.4194 }, label: "San Francisco, CA" },
    { value: { lat: 34.0522, lng: -118.2437 }, label: "Los Angeles, CA" },
    { value: { lat: 40.7128, lng: -74.006 }, label: "New York, NY" },
    { value: { lat: 41.8781, lng: -87.6298 }, label: "Chicago, IL" },
    { value: { lat: 29.7604, lng: -95.3698 }, label: "Houston, TX" },
    { value: { lat: 33.4484, lng: -112.074 }, label: "Phoenix, AZ" },
    { value: { lat: 32.7767, lng: -96.797 }, label: "Dallas, TX" },
    { value: { lat: 37.3382, lng: -121.8863 }, label: "San Jose, CA" },
    { value: { lat: 30.2672, lng: -97.7431 }, label: "Austin, TX" },
    { value: { lat: 39.9526, lng: -75.1652 }, label: "Philadelphia, PA" },
   
  ];

  return (
    <div className="map-container">
      <div className="input-container">
        <Select
          value={origin}
          onChange={setOrigin}
          options={originOptions}
          placeholder="Select origin"
        />
        <Select
          value={destination}
          onChange={setDestination}
          options={destinationOptions}
          placeholder="Select destination"
        />
        <button onClick={handleCalculateRoute}>Calculate Route</button>
      </div>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        style={{ height: "400px", width: "100%", marginTop: "60px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {decodedRoute.length > 0 ? (
          <>
            <Polyline positions={decodedRoute.flat()} color="blue" />
            {tollMarkers}
          </>
        ) : (
          <p>No route information available. Please calculate a route.</p>
        )}
      </MapContainer>
      <div className="toll-table">
        {tollInfo.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Toll Booth</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>{tollTableRows}</tbody>
          </table>
        ) : (
          <p>No toll information available.</p>
        )}
      </div>
    </div>
  );
};

export default Map;
