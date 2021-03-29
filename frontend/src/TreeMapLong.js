import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import StackedBar from "./StackedBar";
import Form from 'react-bootstrap/Form';
import TreeMap from './TreeMap';
import HeatMap from './HeatMap';
import {fetchList} from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class TreeMapLong extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [] };
    this.ref = React.createRef();
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

  onChange(event) {
    this.ref.current.changeYear(event.target.value);
  }

  yearForm() {
    return (
      <Form.Group controlId="treemap.year">
	<Form.Control as="select" onChange={this.onChange.bind(this)}>
	  <option value="-1">所有年份</option>
	  <option value="2014">2014</option>
	  <option value="2015">2015</option>
	  <option value="2016">2016</option>
	  <option value="2017">2017</option>
	  <option value="2018">2018</option>
	  <option value="2019">2019</option>
	  <option value="2020">2020</option>
	  <option value="2021">2021</option>
	</Form.Control>
      </Form.Group>
    );
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



    return (
      <div className={isMobile ? "heatmap-container-mobile" :"heatmap-container"}>
        <TreeMap width="100%" height={400} fontSize={12} ref={this.ref}/>
	<div className="mt-3">
	  {this.yearForm()}
	</div>
        <br/>
        <h2>🔰 矩形樹狀圖（Tree map）以申請團體及其獲資助金額為主體，按年將各申請團體所得的資助金額化為相對應大小的矩形。</h2>

       <h3>🔰 點解「其他」會咁大嚿？「其他」即係咩呀？</h3>
      <p>由於每年申請團體眾多，在這個數據圖的「所有年份」選項（即觀察十年以來邊啲團體拎最多資助），「其他」代表十年來獲灣仔區議會資助金額少於200,000元的團體，所獲批的資助總和。而其他矩型，每個團體都是十年來獲區議會資助總金額大於200,001元。</p>
      <br/>
	<h3>🔰 如果團體年年個框一樣大細，係咪即係拎一樣嘅錢呀？</h3>
<p>不是。這個數據圖的矩型是依選定的年份、及該年所獲資助款額，依全年批出的預算縮放成相對的矩型大小。就算同一申請團體的矩型，在兩年的Tree map 內看起來一樣，金額也不一定一樣。確實的金額在鼠標移到相關矩型時，即會顯示。</p>


	
     </div>
    );
  }
}

export default TreeMapLong;
