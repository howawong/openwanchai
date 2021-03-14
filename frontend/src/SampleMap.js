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
    newData = newData.filter(w => w.geometry)
    const l = newData.length;
    newData.forEach((d, i) => {
      d["index"] = i;
    });

    this.geoJsonLayer.current.leafletElement.clearLayers().addData(newData);
    if (l > 0) {
	  	  const boundary = this.geoJsonLayer.current.leafletElement.getBounds();
	  console.log("bound", boundary);
	  this.map.current.leafletElement.fitBounds(boundary, {maxZoom: 12});
    }
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    if (this.props.locations.length > 0) {
	    console.log(this.props.locations[0]);
    }
    console.log("sampleMap", this.geoJsonLayer);
    var greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var purpleIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    var blueIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const icons = [blueIcon, purpleIcon, redIcon, greenIcon];

    return (
      <ContainerDimensions>
      <Map ref={this.map} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON ref={this.geoJsonLayer} data={this.props.locations} style={{color: '#ff00ff'}} pointToLayer={(gj, latlng)=> {console.log("Marker", gj); return new L.Marker(latlng, {icon: icons[gj["index"] % 4]});}} />
      </Map>
      </ContainerDimensions>
    );
  }
}


export default SampleMap;
