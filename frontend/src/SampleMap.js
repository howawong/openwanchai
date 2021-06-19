import React, { Component } from 'react'
import { bbox, center } from '@turf/turf'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { uuid } from 'uuidv4';
import ContainerDimensions from 'react-container-dimensions';
import L from 'leaflet';
import { withRouter } from "react-router";



class SampleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 22.27702,
      lng: 114.17232,
      zoom: 13,
	  result: []
    };
    this.geoJsonLayer = React.createRef();
    this.binJsonLayer = React.createRef();
    this.map = React.createRef();
  }

  

  clear(newData, newBins) {
    newData = newData.filter(w => w.geometry)
    newBins = newBins ?? [];
    const l = newData.length;
    newData.forEach((d, i) => {
      d["index"] = i;
    });

    this.geoJsonLayer.current.leafletElement.clearLayers().addData(newData);
    this.geoJsonLayer.current.leafletElement.clearLayers().addData(newBins);
    if (l > 0) {
      const boundary = this.geoJsonLayer.current.leafletElement.getBounds();
      const sw = boundary._southWest;
      const ne = boundary._northEast
      boundary._southWest = L.latLng(sw.lat - 0.1 , sw.lng + 0.075);
      boundary._northEast = L.latLng(ne.lat - 0.1 , ne.lng - 0.075);
      this.map.current.leafletElement.fitBounds(boundary);

    setTimeout(() => {
     if (this.map.current)
      this.map.current.leafletElement.invalidateSize(); 

    }, 500);
    }
  }

  clickToFeature(e) {
    var layer = e.target;
    let history = this.props.history;
    history && history.push("/detail/" + layer.feature.properties.pk)
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.clickToFeature.bind(this)
    });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
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
    console.log("wtf", this.props.locations);
    this.props.locations.forEach((d, i) => {
      d["index"] = i;
    });

     if (this.props.bins)
    this.props.bins.forEach((d, i) => {
      d["index"] = i;
    });
    var blueBinIcon = new L.Icon({
      iconUrl: '/assets/recycle-bin.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [32, 32],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const binIcons = [blueBinIcon];


    return (
      <Map key={Math.random()} ref={this.map} center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON ref={this.geoJsonLayer} data={this.props.locations} style={{color: '#ff00ff'}} pointToLayer={(gj, latlng)=> { return new L.Marker(latlng, {icon: icons[gj["index"] % 4]});}} onEachFeature={this.onEachFeature.bind(this)} scrollWheelZoom={false}/>
        (this.props.bins && <GeoJSON ref={this.binJsonLayer} data={this.props.bins} style={{color: '#ff00ff'}} pointToLayer={(gj, latlng)=> { return new L.Marker(latlng, {icon: binIcons[gj["index"] % 1]});}}  scrollWheelZoom={false}/>}
      </Map>
    );
  }
}


export default SampleMap;
