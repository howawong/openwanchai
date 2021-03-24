import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import StackedBar from "./StackedBar";
import TreeMap from './TreeMap';
import HeatMap from './HeatMap';
import {fetchList} from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class Visuals extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [] };
  }

  stackedBarButton() {
    return (
      <Link to="/spent-by-committee">
        <Button variant="secondary">更多內容</Button> 
      </Link>
    )
  }

  treeMapButton() {
    return (
      <Link to="/treemap">
        <Button variant="secondary">更多內容</Button> 
      </Link>
    )
  }
 
  heatMapButton() {
    return (
      <Link to="/heatmap">
        <Button variant="secondary">更多內容</Button> 
      </Link>
    )
  }


  componentDidMount() {
      fetchList("", "", "", 0, 99999999, 1, 999999).then(j => {
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
       console.log(points);
        return points;
      }).then(points => this.setState({...this.state, points: points}));
  }

  render() {
    return (
      <div className={isMobile ? "heatmap-container-mobile" :"heatmap-container"}>

        <BrowserView>
        <Row>
          <Col className="ml-3" xs={3}>
            <h3>灣仔預算 Heatmap</h3>
            <br/>
            <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
            <br/>
            {this.heatMapButton()}
          </Col>
          <Col className="mr-3 no-event"><HeatMap width="100%" dragging={false} doubleClickZoom={false} scrollWheelZoom={false} touchZoom={false}/></Col>
        </Row>
        </BrowserView>
        <MobileView>
          <Row>
            <Col>
            <div className="ml-3 mb-3"> 
            <h3>邊個類別分得較多預算?</h3>
            <p className="mr-3">回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
            <br/>
            {this.heatMapButton()}
            </div>
	    <HeatMap width="100%" dragging={false} doubleClickZoom={false} scrollWheelZoom={false} touchZoom={false}/>

            <div className="mb-5"></div>
            </Col>
          </Row>
          </MobileView>
        <br/>
        <br/>

        <BrowserView>
        <Row>
          <Col lg={9}>
          <StackedBar width="100%" height={400}/>
          </Col>
          <Col lg={3}>
            <div className="right-container mr-3">
            <h3>邊個類別分得較多預算?</h3><br/>
            <p>回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p> <br/>
            {this.stackedBarButton()}
            </div>
          </Col>
        </Row>
        </BrowserView>
        <MobileView>
            <div className="ml-3 mb-3">
            <h3>邊個類別分得較多預算?</h3>

            <p className="mr-3">回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
            <br/>
            {this.stackedBarButton()}
            </div>
             <StackedBar width="100%" height={400}/>
            <div className="mb-5"></div>
        </MobileView>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <BrowserView>
        <Row>
          <Col lg={3} className="ml-3">
            <h3>邊個類別分得較多預算?</h3>
            <p>回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
            {this.treeMapButton()}
          </Col>
          <Col lg={8}>

            <TreeMap width="100%" height={400} fontSize={12}/>
          </Col>
        </Row>
        </BrowserView>
        <MobileView>

            <h3 className="ml-3">邊個類別分得較多預算?</h3>

            <p className="ml-3 mr-3">回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>

            <p className="ml-3">{this.treeMapButton()}</p>
	    <br/>
          <TreeMap width="100%" height={400} fontSize={12}/>
          <div className="mb-5"></div>
        </MobileView>
      </div>
    );
  }
}

export default Visuals;
