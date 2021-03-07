import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import StackedBar from "./StackedBar";
import {fetchList} from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [] };
  }


  componentDidMount() {
      fetchList("", "", "", 0, 99999999, 1, 200).then(j => {
        const points = [];
        const r = j["results"]["features"];
    r.forEach(f => {
          const c = f["geometry"]["coordinates"];
        c.forEach(d => {
            if (d.length == 2) {
              points.push([d[1], d[0]]);
            }
          });
        });
        console.log(points);
        return points;
      }).then(points => this.setState({...this.state, points: points}));
  }

  heatmap() {
    const gradient = {
      0.1: '#89BDE0', 0.2: '#96E3E6', 0.4: '#82CEB6',
      0.6: '#FAF3A5', 0.8: '#F5D98B', '1.0': '#DE9A96'
    };
    const width = isMobile ? "80vw" : "30vw";
    const height = isMobile ? "400px" : "200px";
    return (
      <Map center={[0, 0]} zoom={13} className="index-heatmap" style={{width: width, height: height}}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={this.state.points}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          gradient={gradient}
          intensityExtractor={m => parseFloat(m[2])}
          radius={20.0}
          blur={20.0}
          max={10.0}
        /> 
     </Map>
    );
  }

  render() {
    const heatmap = this.heatmap();
    return (
      <div className="heatmap-container">
        <Row>
          <Col>
            <h3>灣仔預算 Heatmap</h3>
            <br/>
            <p>回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
          </Col>
          <BrowserView>
          <Col>{heatmap}</Col>
          </BrowserView>
        </Row>
        <MobileView>
          <Row>
            <Col>{heatmap}</Col>
          </Row>
          </MobileView>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <BrowserView>
          <Col>
	    <StackedBar />
          </Col>
          </BrowserView>
          <Col>
            <div class="right-container">
            <h3>邊個類別分得較多預算?</h3>
            <br/>
            <p>回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
            </div>
          </Col>
        </Row>
        <MobileView>
          <Row>
            <Col>
  	      <StackedBar />
            </Col>
          </Row>
        </MobileView>
      </div>
    );
  }
}

export default HeatMap;
