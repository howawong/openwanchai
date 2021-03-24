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
import StackedBarChart from './StackedBar';
import Footer from './Footer';
import BackButton from './BackButton';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";





class StackedBarChartPage extends Component {
  constructor(props) {
    super(props);
  }

  content(height) {
    return (<StackedBarChart width="100%" height={height}/>);
  }

  render() {
    return (
      <div className="page">
        <BrowserView>
	<Row className="justify-content-md-center mt-5 mb-5">
        <Col xs={2} className="ml-3">
	  <BackButton />    
	</Col>
	<Col>
	<div className="detail text-center">
          <div className="shadow-container">
	    <h2 className="mb-5">邊個類別分得最多預算 ?</h2>
            {this.content(800)}
	    <div className="mb-5"><br/><br/><br/><br/></div>
	  </div>
	</div>
	</Col>
	<Col xs={2}>
	</Col>
	<br/>
	<br/>
	<br/>
	<br/>
	</Row>
        </BrowserView>
  <MobileView>
    <Row className="ml-2 mb-2 mt-2">
      <BackButton/>&nbsp;&nbsp;&nbsp;&nbsp;
      <h3 className="">邊個類別分得最多預算 ?</h3>
    </Row>
    <Row>
      <Col>
      {this.content(400)}
      </Col>
    </Row>
  </MobileView>

	<br/>
	<br/>
	<br/>
	<br/>
	<Footer />
      </div>
    );
  }
}

export default StackedBarChartPage;
