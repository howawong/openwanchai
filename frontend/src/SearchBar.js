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

import numeral from 'numeral';

class SearchBar extends Component {
  constructor(props) {
    super(props);
	this.ref = React.createRef();
    this.max = 900000;
    this.min = 50000;
    this.state = {show: false, minBudget: this.min, maxBudget: this.max};
  }

  handleClose = () => { this.setState({show: false, value: this.state.value}) };
  handleShow = () => { this.setState({show: true, value: this.state.value}) };
  onChange = (value) => {this.setState({show:this.state.show, value: value});};


  onRangeAfterChange = (evt) => { console.log(evt); 
    const diff = this.max - this.min;
    const minBudget = this.min + evt[0] / 100.0 * diff;
    const maxBudget = this.min + evt[1] / 100.0 * diff;
    this.setState({...this.state, minBudget: minBudget, maxBudget: maxBudget })
  };
  
  render() {
    const { show, value, minBudget, maxBudget } = this.state;
    const { before, allowedRange } = DateRangePicker;
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
             <Row>
              <Col>預算 <span>{numeral(minBudget).format("0,0a")}</span> </Col>
              <Col xs={6}><Range defaultValue={[0, 100]} onAfterChange={this.onRangeAfterChange}/></Col>
              <Col>{numeral(maxBudget).format("0,0a")}</Col>
             </Row>
           </Col>
           <Col className="right">
             <DateRangePicker
               disabledDate={allowedRange("2012-01-01","2021-04-10")}
               showOneCalendar
               hoverRange="month"
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
