import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'



class SampleMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: -61.666666,
      lng: 17.024441,
      zoom: 5,
	  result: []
    };
  }

  componentDidMount() {
    console.log("loading")
    fetch("http://192.168.1.54:8000/sample/borders").then(res => res.json()).then(
	  result => {
	    console.log(result);
		this.setState({...this.state, result: result});
	  }
	);
  }

  render() {
    const position = [this.state.lat, this.state.lng];
	console.log("render", this.state);
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
		{ this.state.result.map(gj => (<GeoJSON data={gj} />))}
      </Map>
    );
  }
}



export default SampleMap;
