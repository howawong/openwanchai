import React from 'react';
import './App.css';
import SampleMap from './SampleMap';
import 'leaflet/dist/leaflet.css';




function App() {
  return (
    <div className="App">
	  <div class="leaflet-container">
		<SampleMap />
	  </div>
    </div>
  );
}

export default App;
