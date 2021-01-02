import React, {Component} from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import './styles.css';
import SampleMap from './SampleMap';
import DetailMobile from './DetailMobile';
import {fetchDetail} from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";



class Detail extends React.Component {
  constructor(params) {
    super(params);
	const {id} = this.props.match.params;
    this.sampleMap = React.createRef();
    this.state = {id: id, result: []};
  }



  componentDidMount() {
    const {id} = this.state;
    fetchDetail(id).then(
	  result => {
        console.log(result);
        if (this.sampleMap.current) {
		    console.log("clear");
            console.log(result);
		    this.sampleMap.current.clear([result]);
		}
		this.setState({...this.state, result: [result]});
	  }
	);
  }


  getDetail = (properties) => {
    const output = {
	  pdfURL : "",
	  title: "",
	  amount: 0,
	};
    if (properties) {
	  const type = properties["type"];
	  const metadata = properties["metadata"];
	  if (type == "dmw") {
	    output.pdfURL = metadata["project_pdf"]; 
	    output.title = metadata["project_name"];    
		output.desc = metadata["objective"];
		output.organization = metadata["committee"];
		output.audience = metadata["audience"];
		output.address = metadata["location"];
		output.audience_size = metadata["audience_size"];
		output.amount = metadata["ballpark"];
		output.start_date = metadata["expected_start_date"];
		output.end_date = metadata["expected_end_date"];

	  }
	  if (type == "comm") {
	    output.pdfURL = metadata["document_url"];
		output.title = metadata["project_name"];
		output.desc = metadata["objective"];
		output.organization = metadata["organization_name"];
		output.audience = metadata["audience"];
		output.address = metadata["address"];
		output.audience_size = metadata["audience_size"];
		output.amount = metadata["estimation"];
		output.start_date = metadata["start_date"];
		output.end_date = metadata["end_date"];
	  }
	} 
	return output;
  }



  render() {
    const {id, result} = this.state;
    const map = result;
	const properties = result.length > 0 && result[0].properties;
    const detail = this.getDetail(properties);

    if (isMobile) {
      return (
        <DetailMobile map={result} detail={detail}/>
      )
    
    }
 
   
    return (
      <div className="page fullscreen">
        <div className="detail">
        <Row className="header">
          <Col>
			<Link to="/"><img src="/assets/logo.png" /></Link>
          </Col>
          <Col><span className="title">搜尋灣仔區撥款項目</span></Col>
          <Col>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">地圖</Button>
              <Button variant="secondary">列表</Button>
              <Button variant="secondary">數據圖</Button>
            </ButtonGroup> 
          </Col>
        </Row>
        <Row>
        <Col xs={2}></Col>
        <Col>
		<div className="shadow-container">
	    <div className="mapContainer">
	      <SampleMap locations={map} className="map" ref={this.sampleMap}/>
		</div>
        <br/>
        <div>
          <Row>
            <Col><h3>{detail.title}</h3></Col>
            <Col xs={2}><img src="/assets/icon/construction_list.svg" /></Col>
          </Row>
        </div>
        <div className="border"/><br/>
        <div className="detail-field-container">  
          <Row>
            <Col><img src="/assets/icon/application.svg" />申請團體: {detail.organization}</Col>
            <Col><img src="/assets/icon/people.svg" />對象: {detail.audience}</Col>
          </Row>
          <Row>
            <Col><img src="/assets/icon/place.svg" />地點: {detail.address}</Col>
            <Col><img src="/assets/icon/counter.svg" />參加人數: {detail.audience_size}人</Col>
          </Row>
          <Row>
            <Col><img src="/assets/icon/dollar.svg" />撥款: {detail.amount}</Col>
            <Col><img src="/assets/icon/calender.svg" />開始日期: {detail.start_date}</Col>
          </Row>
          <Row>
            <Col><img src="/assets/icon/type.svg" />類別: 聯誼</Col>
            <Col><img src="/assets/icon/end date.svg" />結束日期: {detail.end_date}</Col>
          </Row>
        </div>
        <div className="border"/><br/>
        詳細:<br/><br/><br/>
		{detail.desc}
        <div className="border"/><br/>
		計劃書: &nbsp;&nbsp;<a href={detail.pdfURL} target="_blank"><Button color="blue"> 下載 </Button></a>
        </div>
        </Col>
        <Col xs={2}></Col>
        </Row>
        </div>
      </div>
    );
  }
}


export default Detail;
