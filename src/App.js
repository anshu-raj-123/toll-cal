
import './App.css';
import Education from './components/Education';
import Map from './components/Map';


function App() {
  const routeCoordinates = [
    [37.7749, -122.4194], // San Francisco, CA
    [34.0522, -118.2437], // Los Angeles, CA
  ];

  return (
    <>
      <Education/>
      <Map routeCoordinates={routeCoordinates} />
    </>
  );
}

export default App;
