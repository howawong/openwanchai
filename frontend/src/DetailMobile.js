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
import SwitchModeButtonGroup from './SwitchModeButtonGroup';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class DetailMobile extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {map, detail, detailRef} = this.props;
    const properties = map && map.properties;
    console.log(map);
    return (
      <div className="page w-100">
        <SwitchModeButtonGroup searchBarFunc={() => {return {current: null}}}/>
        <div className="detail">
          <Row className="ml-0 mr-0">
             <Col className="pl-0 pr-0">
	            <div className="mapContainer">
	              <SampleMap locations={map} className="map" ref={detailRef}/>
                </div>
             </Col>
           </Row>
           <Row className="p-3 ml-0 mr-0">
             <Col className="pl-0 pr-0">
                <h2>{detail.title}</h2>
                <br/>
                <div className="detail-field-container">
                <Row><Col><img src="/assets/icon/application.svg" />申請團體: {detail.organization}</Col></Row>
                <Row><Col><img src="/assets/icon/people.svg" />對象: {detail.audience}</Col></Row>
                <Row><Col><img src="/assets/icon/place.svg" />地點: {detail.address}</Col></Row>
                <Row><Col><img src="/assets/icon/counter.svg" />參加人數: {detail.audience_size}人</Col></Row>
                <Row><Col><img src="/assets/icon/dollar.svg" />撥款: ${detail.amount}</Col></Row>
                <Row><Col><img src="/assets/icon/calender.svg" />開始日期: {detail.start_date}</Col></Row>
                <Row><Col><img src="/assets/icon/type.svg" />類別: 聯誼</Col></Row>
                <Row><Col><img src="/assets/icon/end date.svg" />結束日期: {detail.end_date}</Col></Row>
                </div>
                <div className="border"/><br/>
                 詳細:<br/><br/><br/>
			     {detail.desc}
                 <div className="border"/><br/>
		          計劃書: &nbsp;&nbsp;
				 <a href={detail.pdfURL} target="_blank">
				    <Button color="blue">下載</Button>
			      </a>
             </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default DetailMobile;
