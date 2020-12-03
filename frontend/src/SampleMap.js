import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'



class SampleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 22.27702,
      lng: 114.17232,
      zoom: 18,
	  result: []
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
	console.log(this.props.locations);
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
		{ this.props.locations.map((gj, index )=> (<GeoJSON key={index} data={gj} style={{color: '#ff0000'}} />))}
      </Map>
    );
  }
}



export default SampleMap;
