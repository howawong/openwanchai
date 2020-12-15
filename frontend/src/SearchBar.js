import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider, { Range } from 'rc-slider';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import 'rc-slider/assets/index.css';
import { DateRangePicker } from 'rsuite';
import SearchBarPanelMobile from './SearchBarPanelMobile';
import SearchBarPanel from './SearchBarPanel';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
	this.ref = React.createRef();
  }

  handleClose = () => { this.setState({show: false, value: this.state.value}) };
  handleShow = () => { this.setState({show: true, value: this.state.value}) };
  onChange = (value) => {this.setState({show:this.state.show, value: value});};
  
  render() {
    const { show, value } = this.state;
    return (
      <div>
        <BrowserView>
        <SearchBarPanel show={show} handleClose={this.handleClose}/>
        <div className="searchBar2">
          <Row>
            <Col>
              <Button onClick={this.handleShow} variant="light">
              <img src="/assets/icon/sort.svg" className="sort"/></Button>
              <input type="text" placeholder="輸入項目名稱/關鍵詞/地點..." />
            </Col>
           <Col className="center">
             預算 1000K <Range defaultValue={[10,10000]}/> 2000K
           </Col>
           <Col className="right">
             <DateRangePicker
               showOneCalendar
               className="data-range"
               size="md"
               placeholder="開始日期"
               align="left"
             />
             <Link to="/search"><img src="/assets/icon/search_m.svg" className="search_m"/></Link>
            </Col>
          </Row>
        </div>
        </BrowserView>
        <MobileView>
          <div className="searchBar2">
            <Row>
              <Col>
                <Button variant="light">
                <img src="/assets/icon/sort.svg" className="sort"/></Button>
                <input type="text" placeholder="輸入項目名稱/關鍵詞/地點..." />
                <img src="/assets/icon/search_m.svg" className="search_m"/>
              </Col>
            </Row>
          </div>
          <SearchBarPanelMobile />
        </MobileView>
      </div>
    );
  }
};

export default SearchBar;
