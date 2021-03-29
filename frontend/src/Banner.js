import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CategoryCard from './CategoryCard';
import ProjectCategoryCard from './ProjectCategoryCard';
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
    const desktopView = (
      <div>
        <Row>
	   <Col><img src="/assets/logo.png"/></Col>
	   <Col>
              <div className="title">搜尋灣仔區撥款項目</div>
	   </Col>
	   <Col>
	   </Col>
        </Row>
     </div>
    );

 
    const mobileView = (
      <div>
        <Row>
	   <Col xs={3}><img src="/assets/logo.png"/></Col>
	   <Col>
              <div className="title-mobile">搜尋灣仔區撥款項目</div>
	   </Col>
        </Row>
      </div>
    );


    return (
      <div>
        <Jumbotron className={ isBrowser ? "banner" : "banner-mobile"}>
	  {isBrowser ? desktopView : mobileView}
          <SearchBar history={this.props.history}/>
        </Jumbotron>
      </div>
    );
  }
}

export default Banner;
