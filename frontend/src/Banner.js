import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CategoryCard from './CategoryCard';
import ProjectCategoryCard from './ProjectCategoryCard';
import HeatMap from './HeatMap';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './styles.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";




class Banner extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="banner">
		      <Row>
		        <Col xs={6}>
			        <img src="/assets/logo.png" /> 
			      </Col>
            <BrowserView>
			      <Col>
              <div className="title">搜尋灣仔區撥款項目</div>
			      </Col>
		        <Col>
              &nbsp;
			      </Col>
            </BrowserView>
            <MobileView>
            <Col>
              搜尋灣仔區撥款項目
            </Col>
            </MobileView>
		      </Row>
          <SearchBar />
        </Jumbotron>
      </div>
    );
  }
}

export default Banner;
