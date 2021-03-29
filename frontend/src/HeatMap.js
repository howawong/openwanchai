import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './styles.css';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import StackedBarChart from './StackedBar';
import Footer from './Footer';
import BackButton from './BackButton';
import MarkerCluster from './MarkerCluster';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


import {fetchList} from './api';

var L = window.L;


class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [], r: [] };
    this._isMounted = false;
  }

  componentWillUnmount() {
   this._isMounted = false;
  }

  componentDidMount() {

    this._isMounted = true;
      fetchList("", "", "", 0, 99999999, 1, 99999).then(j => {
        const points = [];
        const r = j["results"]["features"];
      
    r.forEach(f => {
      if (f["geometry"]) {
          const c = f["geometry"]["coordinates"];
        const type = f["geometry"]["type"]
        if (type == "Point") {
           points.push([c[1],c[0]])
        } else {
        c.forEach(d => {
            if (d.length == 2) {
             if ((d[1] > 23 || d[1] < 10) && ( d[0] < 114)){
             }else {
              points.push([d[1], d[0]]);
              }
            }
          });
         
      }}
    });
        return [points, r];
      }).then(l => this._isMounted && this.setState({...this.state, points: l[0], r: l[1]}));
  }



  clickToFeature(e) {
    var layer = e.target;
    let history = this.props.history;
    history && history.push("/detail/" + layer.feature.properties.pk)
  }



 onEachFeature = (feature, layer) => {
    layer.on({
      click: this.clickToFeature.bind(this)
    });
  }

  heatMap() {
    const gradient = {
      0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
      0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
    };
    const width = this.props.width || (isMobile ? "100vw" : "70vw");
    const height = isMobile ? "500px" : "600px";

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
    const geoPoints = this.state.points.map((p, i) => ({geometry: {coordinates: [p[1], p[0]], type: "Point"}, type: "Feature", properties: {}, index: i}));
    const getFirst = (g) => {
      if (g.type == "Point") {
        return g.coordinates;
      }
      if (g.type == "MultiPolygon") {
        return g.coordinates[0][0][0]
      }
      return g.coordinates[0];
    }
    const markers = this.state.r.filter(p => p.geometry && p.geometry.coordinates).map((p, i) => ({position: {lat: getFirst(p.geometry)[1], lng: getFirst(p.geometry)[0] }, text: p.properties.project_name + "<br/>" + p.properties.address}));
    const icons = [blueIcon, purpleIcon, redIcon, greenIcon];
    return (
      <Map center={[22.275, 114.17]} zoom={14} className="index-heatmap" style={{width: width, height: height}}  maxZoom={20} dragging={this.props.dragging ?? true} scrollWheelZoom={this.props.scrollWheelZoom ?? true} touchZoom={this.props.touchZoom ?? true}  doubleClickZoom={this.props.doubleClickZoom ?? true}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <HeatmapLayer
          points={this.state.points}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          gradient={gradient}
          intensityExtractor={m => 120}
          radius={50.0}
          blur={70.0}
          max={50.0}
        /> 
	<MarkerCluster markers={markers} />
     </Map>
    );
  }

  render() {
    return (this.heatMap());
  }
}

export default HeatMap;
