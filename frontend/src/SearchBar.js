import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider, { Range } from 'rc-slider';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import 'rc-slider/assets/index.css';
import { DateRangePicker } from 'rsuite';
import SearchBarPanelMobile from './SearchBarPanelMobile';
import SearchBarPanel from './SearchBarPanel';
import moment from 'moment';
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
    console.log("SearchBar", this.props.query);
    const query = this.props.query;
    this.ref = React.createRef();
    this.keywordRef = React.createRef();
    this.min = 5000;
    this.max = 900000;
    const maxValue = query ? parseInt(query.maxAmount) : this.max;
    const minValue = query ? parseInt(query.minAmount) : this.min;
    const keyword = query ? query.keyword : "";
    const minDate = new Date(query ? query.minDate : "2012-01-01");
    const maxDate = new Date(query ? query.maxDate : "2020-04-01");
    this.state = {show: false,
                  minBudget: this.min, 
				  maxBudget: this.max,
				  keyword: keyword,
				  minDate: minDate,
				  maxDate: maxDate,
				  value:[minValue, maxValue]};
  }

  toggle = () => { console.log(this.state); if (this.state.show) { this.handleClose(); } else { this.handleShow();} }
  handleClose = () => { this.setState({...this.state, show: false}) };
  handleShow = () => { this.setState({...this.state, show: true}) };
  onChange = (value) => {this.setState({...this.state, value: value});};
  onKeywordChange = (evt) => {this.setState({...this.state, keyword: evt.target.value})};


  onRangeAfterChange = (evt) => { console.log(evt); 
    const diff = this.max - this.min;
    const minBudget = this.min + evt[0] / 100.0 * diff;
    const maxBudget = this.min + evt[1] / 100.0 * diff;
    this.setState({...this.state, minBudget: minBudget, maxBudget: maxBudget })
  };

  getSearchURL = (prefix="/search") => {
    const keyword = this.state.keyword;
    const {minBudget, maxBudget, minDate, maxDate} = this.state;
	const format = "YYYY-MM-DD";
    var params = {
      minAmount: Math.round(minBudget),
      maxAmount: Math.round(maxBudget),
      minDate: moment(minDate).format(format),
      maxDate: moment(maxDate).format(format),
      keyword: keyword
    };
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    if (queryString.length > 0)
      return prefix + "?" + queryString;
    return prefix;
  }

  changeDateRange = (value) => {
    this.setState({...this.state, minDate: value[0], maxDate: value[1]});
	console.log(this.state, value);
  }
  
  render() {
    const { show, value, minBudget, maxBudget, keyword, maxDate, minDate } = this.state;
    const { before, allowedRange } = DateRangePicker;
    return (
      <div>
        <BrowserView>
        <div className="searchBar2">
          <Row>
            <Col className="left">
              <Image src="/assets/icon/sort.svg" className="sort" onClick={this.toggle}/>
              <input type="text" ref={this.keywordRef} placeholder="輸入項目名稱/關鍵詞/地點..." onChange={this.onKeywordChange} value={keyword}/>
            </Col>
           <Col className="center">
             <Row>
			  <Col xs="auto">預算</Col>
              <Col xs="auto">{numeral(minBudget).format("0,0a")}</Col>
              <Col><Range defaultValue={[0, 100]} onAfterChange={this.onRangeAfterChange}/></Col>
              <Col xs="auto">{numeral(maxBudget).format("0,0a")}</Col>
             </Row>
           </Col>
           <Col className="right">
             <DateRangePicker
			   value={[minDate, maxDate]}
               disabledDate={allowedRange("2012-01-01","2021-04-10")}
               showOneCalendar
               hoverRange="month"
               className="data-range"
               size="md"
               placeholder="開始日期"
               align="left"
			   onChange={this.changeDateRange}
             />
             <Link to={this.getSearchURL()}><img src="/assets/icon/search_m.svg" className="search_m"/></Link>
            </Col>
          </Row>
        </div>
        <SearchBarPanelMobile showDateRange={false} showBudget={false} budgets={[minBudget, maxBudget]} dates={[minDate, maxDate]}  onAmountChanged={this.onRangeAfterChange} onDateRangeChanged={this.changeDateRange} visible={show}/>
        </BrowserView>
        <MobileView>
          <div className="searchBar2">
            <Row>
              <Col>
                <Image src="/assets/icon/sort.svg" className="sort" onClick={this.toggle} />
                <input type="text" placeholder="輸入項目名稱/關鍵詞/地點..."  ref={this.keywordRef} onChange={this.onKeywordChange} value={keyword} />
               <Link to={this.getSearchURL()}><img src="/assets/icon/search_m.svg" className="search_m"/></Link>
              </Col>
            </Row>
          </div>
          <SearchBarPanelMobile budgets={[minBudget, maxBudget]} dates={[minDate, maxDate]}  onAmountChanged={this.onRangeAfterChange} onDateRangeChanged={this.changeDateRange} visible={show}/>
        </MobileView>
      </div>
    );
  }
};

export default SearchBar;
