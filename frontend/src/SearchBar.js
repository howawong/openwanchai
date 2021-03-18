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
import moment from 'moment';
import { withRouter } from "react-router-dom";
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
    console.log("query", props);
    this.min = 0;
    this.max = 5000000;
    this.prefix = this.props.prefix ?? "/search";
    this.mapping = [1, 3, 4, 5, 6, 7, 8,9];
    const state = this.stateFromProps(props.query);
    this.ref = React.createRef();
    this.keywordRef = React.createRef();
    this.state = state;
  }

  stateFromProps(query) {
    const maxValue = query ? parseInt(query.maxAmount) : this.max;
    const minValue = query ? parseInt(query.minAmount) : this.min;
    console.log("query", query);
    const keyword = query ? query.keyword : "";
    const minDate = new Date(query ? query.minDate : "2010-01-01");
    const maxDate = new Date(query ? query.maxDate : "2021-03-01");
    const checked = [true, true, true, true, true, true, true, true];
    console.log("q", query);
    if (query && query.categories) {
      const categories = query.categories.split(",").filter(x => !isNaN(x)).map(x => parseInt(x));
      console.log(categories);
      if (categories.length > 0) {
      for (var i=0;i<8;i++) {
        if (categories.indexOf(this.mapping[i]) == -1){
	  checked[i] = false;
	}
      }
   

    }
	}
    return {show: false,
            minBudget: minValue, 
        maxBudget: maxValue,
        keyword: keyword,
        minDate: minDate,
        maxDate: maxDate,
            result: [],
            page: 0,
            total: 0,
            size: 6,
      checked: checked,
        value:[this.valueToPct(minValue), this.valueToPct(maxValue)]};

  }

  componentWillReceiveProps(nextProps) {
    const state = this.stateFromProps(nextProps.query);
    this.setState(state);
  }



  valueToPct = (value) => {
    const diff = this.max - this.min;
    return Math.round((value - this.min) / diff * 100.0);
  }

  toggle = () => { console.log(this.state); if (this.state.show) { this.handleClose(); } else { this.handleShow();} }
    handleClose = () => { this.setState({...this.state, show: false}) };
  handleShow = () => { this.setState({...this.state, show: true}) };
  onChange = (value) => {this.setState({...this.state, value: value});};
  onKeyDown = (evt) => {
    if (evt.key == 'Enter') {
    const link = this.getSearchURL(this.prefix);
      this.props.history.push(link);
  }
  
  };

  onKeywordChange = (evt) => {
    this.setState({...this.state, keyword: evt.target.value});
  };



  onRangeAfterChange = (evt) => { console.log(evt); 
    const diff = this.max - this.min;
    const minBudget = this.min + evt[0] / 100.0 * diff;
    const maxBudget = this.min + evt[1] / 100.0 * diff;
    this.setState({...this.state, minBudget: minBudget, maxBudget: maxBudget })
  };

  getSearchURL = (prefix="/search") => {
    const keyword = this.state.keyword;
    const {minBudget, maxBudget, minDate, maxDate, checked} = this.state;


    const format = "YYYY-MM-DD";

    var categories = []
    for (var i=0; i<8; i++) {
      if (checked[i]) {
        categories.push(this.mapping[i])
      }
    }

    categories = categories.join(",")
    var params = {
      minAmount: Math.round(minBudget),
      maxAmount: Math.round(maxBudget),
      minDate: moment(minDate).format(format),
      maxDate: moment(maxDate).format(format),
      keyword: keyword,
      categories: categories
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

  handleToggle = (evt) => { 
    console.log(evt.target);
    const checked = this.state.checked;
    const i = parseInt(evt.target.name);
    checked[i] = ! checked[i];
    console.log(checked);
    this.setState({...this.state, checked}) 
  };


  
  render() {
    const { show, value, minBudget, maxBudget, keyword, maxDate, minDate, checked } = this.state;
    const { before, allowedRange } = DateRangePicker;
  const handleStyle = {
    width: 20, 
    marginTop: -8,
    height: 20,
  }

  const input = (
    <input type="text" ref={this.keywordRef} placeholder="輸入項目名稱/關鍵詞/地點..." onChange={this.onKeywordChange} value={keyword} onKeyDown={this.onKeyDown}/>
  );

    return (
      <div>
        <BrowserView>
        <div className="searchBar2">
          <Row>
            <Col className="left d-none d-sm-block">
              <Image src="/assets/icon/sort.svg" className="sort" onClick={this.toggle}/>
        {input}
            </Col>
           <Col className="center d-none d-md-block">
             <Row>
        <Col xs="auto">預算</Col>
              <Col xs="auto"><h4>{numeral(minBudget).format("00000,0A")}</h4></Col>
              <Col>
          <Range
          defaultValue={value}
          onAfterChange={this.onRangeAfterChange}
          handleStyle={[handleStyle, handleStyle]}
        
          />
          </Col>
              <Col xs="auto"><h4>{numeral(maxBudget).format("0,0A")}</h4></Col>
             </Row>
           </Col>
           <Col className="right">
             <DateRangePicker
         value={[minDate, maxDate]}
               disabledDate={allowedRange("2012-01-01","2021-04-10")}
               showOneCalendar
               hoverRange="month"
               className="date-range"
               size="md"
               placeholder="開始日期"
               align="left"
         onChange={this.changeDateRange}
             />
             <Link to={this.getSearchURL(this.prefix)}><img src="/assets/icon/search_m.svg" className="search_m"/></Link>
            </Col>
          </Row>
        </div>
        <SearchBarPanelMobile showDateRange={false} showBudget={false} budgets={[minBudget, maxBudget]} dates={[minDate, maxDate]}  onAmountChanged={this.onRangeAfterChange} onDateRangeChanged={this.changeDateRange} visible={show} toggle={this.handleToggle} checked={checked}/>
        </BrowserView>
        <MobileView>
          <div className="searchBar2">
            <Row>
              <Col>
                <Image src="/assets/icon/sort.svg" className="sort" onClick={this.toggle} />
        {input}
               <Link to={this.getSearchURL(this.prefix)}><img src="/assets/icon/search_m.svg" className="search_m"/></Link>
              </Col>
            </Row>
          </div>
          <SearchBarPanelMobile budgets={[minBudget, maxBudget]} dates={[minDate, maxDate]}  onAmountChanged={this.onRangeAfterChange} onDateRangeChanged={this.changeDateRange} visible={show} toggle={this.handleToggle} checked={checked}/>
        </MobileView>
      </div>
    );
  }
};

export default SearchBar;
