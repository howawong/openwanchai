import React, { Component } from 'react'
import { bbox, center } from '@turf/turf'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { uuid } from 'uuidv4';
import ContainerDimensions from 'react-container-dimensions';


class SampleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 22.27702,
      lng: 114.17232,
      zoom: 12,
	  result: []
    };
    this.geoJsonLayer = React.createRef();
    this.map = React.createRef();
  }

  clear(newData) {
    console.log("sample", this.geoJsonLayer.current);
    this.geoJsonLayer.current.leafletElement.clearLayers().addData(newData);
	const boundary = this.geoJsonLayer.current.leafletElement.getBounds();
	this.map.current.leafletElement.fitBounds(boundary);
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    if (this.props.locations.length > 0) {
	    console.log(this.props.locations[0]);
    }
    console.log("sampleMap", this.geoJsonLayer);
    return (
      <ContainerDimensions>
      <Map ref={this.map} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON ref={this.geoJsonLayer} data={this.props.locations} style={{color: '#ff00ff'}} />
      </Map>
      </ContainerDimensions>
    );
  }
}


export default SampleMap;
