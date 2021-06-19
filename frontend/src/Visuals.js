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
import { HashLink } from 'react-router-hash-link';


class Visuals extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [] };
  }

  stackedBarButton() {
    return (
      <HashLink to="/visuals#stacked">
        <Button variant="secondary">更多內容</Button> 
      </HashLink>
    )
  }

  treeMapButton() {
    return (
      <HashLink to="/visuals#treemap">
        <Button variant="secondary">更多內容</Button> 
      </HashLink>
    )
  }
 
  heatMapButton() {
    return (
      <HashLink to="/visuals#heatmap">
        <Button variant="secondary">更多內容</Button> 
      </HashLink>
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
    const heatMapText = (
      <div>
        <h3>灣仔邊喥最多活動？</h3>
        <br/>
        <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>
	熱點地圖（Heat map）將愈多活動發生的地方，在地圖上以紅橙黃等暖色呈現，用家可以不斷放大地圖，仔細觀察舉辦活動的所在地及分佈情況。Heatmap 的最大功能，是讓官民雙方對區內活動或服務是否足夠、是否平均一目了然。    
	</p>
        <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>
	但係，點解有啲地點咁 Hot? 點解有啲活動係超出灣仔區仲過晒海？如果我係想攪活動幫多啲灣仔街坊，我應該點去理解呢個熱點地圖呢？
	</p>
	<br/>
        {this.heatMapButton()}
      </div>
    
    );


    const stackedBarChartText = (
      <div>
        <h3>每年邊個委員會、工作小組，批咗幾多錢？</h3>
        <br/>
        <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>
	堆疊棒形圖（Stacked bar chart）按年度、委員會／工作小組／大會去呈現成功批出的預算金額，你可以一目了然看到每個年度灣仔區議會的預算分佈，以及十年來所批資助的增減變化。不過，點解個棒形圖係由2014年開始？2010到2013年啲錢呢？點解又會睇到2021年呢？
	</p>
	<br/>
        {this.stackedBarButton()}
      </div>
    
    );

   const treeMapText = (
      <div>
        <h3>每年乜嘢團體拎得最多（少）錢呀？</h3>
        <br/>
        <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>
	  矩形樹狀圖（Tree map）以申請團體及其獲資助金額為主體，按年將各申請團體所得的資助金額化為相對應大小的矩形。矩形樹狀圖按年分類，是故同矩形大小是相對於當年總批出預算轉化大小。
	</p>
        <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>
	  咦，點解「其他」會咁大嚿？「其他」即係咩呀？年年個框一樣大細係咪即係拎一樣嘅錢呀？
	</p>
	<br/>
	<br/>
	<br/>
        {this.treeMapButton()}
      </div>
    
    );


   const heatMapImg = (
     <img src="/heatmap.png" style={{width: "100%"}} />
   )


    return (
      <div className={isMobile ? "heatmap-container-mobile" :"heatmap-container"}>

        <BrowserView>
        <Row>
          <Col className="ml-3" xs={3}>
	    {heatMapText}
          </Col>
          <Col className="mr-3 no-event">{heatMapImg}</Col>
        </Row>
        </BrowserView>
        <MobileView>
          <Row>
            <Col>
            <div className="ml-3 mb-3"> 
	    {heatMapText}
            </div>
	    {heatMapImg}
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
	    {stackedBarChartText}
            </div>
          </Col>
        </Row>
        </BrowserView>
        <MobileView>
            <div className="ml-3 mb-3">
	    {stackedBarChartText}
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
            {treeMapText}	    
          </Col>
          <Col lg={8}>

            <TreeMap width="100%" height={400} fontSize={12}/>
          </Col>
        </Row>
        </BrowserView>
        <MobileView>
          {treeMapText}	    
          <TreeMap width="100%" height={400} fontSize={12}/>
          <div className="mb-5"></div>
        </MobileView>
      </div>
    );
  }
}

export default Visuals;
