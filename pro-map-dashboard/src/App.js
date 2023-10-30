import React, { Component } from 'react';
import L from 'leaflet';
import Plotly from 'plotly.js';

// Define a Marker class
class Marker {
  constructor(id, latitude, longitude, elevation) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.elevation = elevation;
  }
}

// Create the App component
class App extends Component {
  constructor() {
    super();
    this.state = {
      markersData: [],
      map: null
    };
    this.tableBodyRef = React.createRef();
    this.mapRef = React.createRef();
    this.contourPlotRef = React.createRef();
  }

  // Component lifecycle method: Runs after the component has mounted
  componentDidMount() {
    this.initializeMap();
    this.initializeContourPlot();
    this.fetchMarkersFromBackend();
  }

  // Initialize the Leaflet map
  initializeMap() {
    const map = L.map(this.mapRef.current).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.on('click', this.handleMapClick.bind(this));
    this.setState({ map });
  }

  // Handle a click on the map
  handleMapClick(e) {
    const { map } = this.state;
    const { lat, lng } = e.latlng;
    const id = Date.now(); // Generate a unique ID (timestamp)
    const elevation = 0; // Initial elevation value
    const marker = new Marker(id, lat, lng, elevation);
    this.addMarker(marker);
    map.flyTo([lat, lng], 13);
  }

  // Fetch marker data from the backend (you can implement this)
  fetchMarkersFromBackend() {
    // ... [Fetch markers data from the backend and update state]
  }

  // Add a marker to the state
  addMarker(marker) {
    // ... [Add a marker to the state]
  }

  // Update elevation of a marker
  updateElevation(id, elevation) {
    // ... [Update the elevation of a marker]
  }

  // Initialize the contour plot (you can implement this)
  initializeContourPlot() {
    // ... [Initialize the contour plot]
  }

  // Render table rows with marker data
  renderTableRows() {
    return this.state.markersData.map(marker => (
      <tr key={marker.id} onClick={() => this.state.map.flyTo([marker.latitude, marker.longitude], 13)}>
        <td className="py-2 px-4 border-b border-gray-700">{marker.id}</td>
        <td className="py-2 px-4 border-b border-gray-700">{marker.latitude.toFixed(4)}</td>
        <td className="py-2 px-4 border-b border-gray-700">{marker.longitude.toFixed(4)}</td>
        <td className="py-2 px-4 border-b border-gray-700">
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-black"
            defaultValue={marker.elevation}
            onChange={e => this.updateElevation(marker.id, e.target.value)}
          />
        </td>
      </tr>
    ));
  }

  // Render the component
  render() {
    return (
      <div>
        <div ref={this.mapRef} id="map" style={{ width: '100%', height: '500px' }}></div>
        <div ref={this.contourPlotRef} id="contourPlot" style={{ width: '100%', height: '500px' }}></div>
        <table id="markersTable">
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

// Export the App component
export default App;
