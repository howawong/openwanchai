import React, {Component} from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CategoryCard from './CategoryCard';
import './styles.css';
import SampleMap from './SampleMap';
import {fetchDetail} from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";



class Detail extends Component {
  constructor(params) {
    super(params);
  }


  render() {
    const {map} = this.props;
	  const properties = map && map.properties;
	  console.log(map);
    return (
      <div className="page fullscreen">
        <div className="detail">
          <Row>
            <Col>
	            <div className="mapContainer">
	              <SampleMap locations={map} className="map"/>
                <br/>
                <h1>粵曲歡唱娛坊眾</h1>
                <br/>
                <div>
                <Row><Col><img src="/assets/icon/application.svg" />申請團體: 灣仔區街坊福利會</Col></Row>
                <Row><Col><img src="/assets/icon/people.svg" />對象: 區內所有居民</Col></Row>
                <Row><Col><img src="/assets/icon/place.svg" />地點: 灣仔區街坊福利會</Col></Row>
                <Row><Col><img src="/assets/icon/counter.svg" />參加人數: 1,000人</Col></Row>
                <Row><Col><img src="/assets/icon/dollar.svg" />撥款: $200k</Col></Row>
                <Row><Col><img src="/assets/icon/calender.svg" />開始日期: 7/3/2020</Col></Row>
                <Row><Col><img src="/assets/icon/type.svg" />類別: 聯誼</Col></Row>
                <Row><Col><img src="/assets/icon/end date.svg" />結束日期: 7/3/2020</Col></Row>
               </div>
               <div className="border"/><br/>
               詳細:<br/><br/><br/>
               回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！
              <div className="border"/><br/>
		          計劃書: &nbsp;&nbsp;<Button color="blue"> 下載 </Button>
             </div>
           </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Detail;
