import React, {Component} from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";




class SwitchModeButtonGroup extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.searchBarFunc = props.searchBarFunc;
	this.keyword = props.keyword;
  }

  mobileView(mapURL, listURL) {
    return (
      <Row className="page-header">
        <Col>
          <Link to="/"><img src="/assets/logo.png" /></Link>
		</Col>
		<Col>
		  尋找項目:  {this.keyword}
		</Col>
        <Col className="text-right">
          <Button onClick={this.props.clickMap}><img className="img-btn" src="/assets/icon/place.svg" /></Button>
          <Button onClick={this.props.clickList}><img className="img-btn" src="/assets/icon/sort.svg" /></Button>&nbsp;
        </Col>
      </Row>
    )
  }
  
  desktopView(mapURL, listURL) {
    return (
      <Row className="header">
        <Col sm={3}>
          <Link to="/"><img src="/assets/logo.png" /></Link>
		</Col>
        <Col><span className="title">搜尋灣仔區撥款項目</span></Col>
        <Col>
          <ButtonGroup>
            <Button variant="secondary" onClick={this.props.clickMap}>地圖</Button>
            <Button variant="secondary" onClick={this.props.clickList}>列表</Button>
            <Button variant="secondary">數據圖</Button>
          </ButtonGroup> 
        </Col>
      </Row>

    );
  }

  render() {
    const ref = this.searchBarFunc().current;
    const mapURL = ref === null ? "" : ref.getSearchURL("/search");
    const listURL = ref === null ? "" : ref.getSearchURL("/list");
    console.log(ref, mapURL, listURL, this.searchBarFunc());
    return (
      <div>
        <BrowserView>{this.desktopView(mapURL, listURL)}</BrowserView>
        <MobileView>{this.mobileView(mapURL, listURL)}</MobileView>
      </div>
    );
  }


}

export default SwitchModeButtonGroup;
