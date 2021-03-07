import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class CategoryCard extends Component {
  render() {
    const {projectId, budget, name, audience, startDate, committee, isLong, oneCol } = this.props;
    if (isBrowser) {
	  if (isLong) {
	    return (
        <div className="card">
          <Row>
            <Col className="my-auto" xs={1}>
              <img src="/assets/icon/gift_list.svg"/>
            </Col>
            <Col xs={2}>
              {committee || "灣仔區街坊福利會"}<br/>
			</Col>
		    <Col xs={2}>
              <div>{name || "粵曲歡唱娛坊眾"}</div><br/>
			</Col>
			<Col>
              {audience || "對象:區內所有居民"}<br/>
			</Col>
			<Col>
              <span className="badge badge-secondary">社區服務</span>&nbsp;&nbsp;
			</Col>
			<Col>
              <span className="date">{startDate||"22/2/2020"}</span>
			</Col>
			<Col>
              <span className="price">${budget || "$100,000"}</span>
            </Col>
          </Row>
        </div>); 
	  }
      return (
        <div className="card">
          <Row>
            <Col className="left my-auto" xs={2}>
              <img src="/assets/icon/gift_list.svg"/>
            </Col>
            <Col xs={9}>
              {committee || "灣仔區街坊福利會"}<br/>
              <div className="title">{name || "粵曲歡唱娛坊眾"}</div><br/>
              {audience || "對象:區內所有居民"}<br/>
              <br/>
              <div>
              <span className="price">${budget || "$100,000"}</span>
              <span className="badge badge-secondary">社區服務</span>&nbsp;&nbsp;
              <span className="badge badge-secondary">小型工程</span>
              <span className="date">{startDate||"22/2/2020"}</span>
              </div>
            </Col>
          </Row>
      </div> 
      );
    }
    
    if (oneCol) {
      return (
        <div className="card card-mobile">
          <img src="/assets/icon/gift_list.svg"/><br/>
          {committee || "灣仔區街坊福利會"}<br/>
          <div className="title">{name || "粵曲歡唱娛坊眾"}</div><br/>
          <span className="badge badge-secondary">社區服務</span><br/>
          <span className="price" style={{paddingRight: "0.5em"}}>${budget || "$100,000"}</span><br/>
          <span className="date">{startDate||"22/2/2020"}</span>
        </div>
      );   
    
    
    }


    return (
      <div className="card card-mobile">
        <Row>
          <Col className="my-auto" xs={2}>
           <img src="/assets/icon/gift_list.svg"/>
          </Col>
          <Col xs={9}>
            {committee || "灣仔區街坊福利會"}<br/>
            <div className="title">{name || "粵曲歡唱娛坊眾"}</div><br/>

            <span className="price" style={{paddingRight: "0.5em"}}>${budget || "$100,000"}</span>
            <span className="badge badge-secondary">社區服務</span>
            <span className="date">{startDate||"22/2/2020"}</span>
          </Col>
        </Row>
    </div> 
    );
  }
}

export default CategoryCard;
