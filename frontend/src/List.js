import React from 'react';
import './App.css';
import SampleMap from './SampleMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';
import SearchBar from './SearchBar';
import 'rsuite/dist/styles/rsuite-default.css';
import SwitchModeButtonGroup from './SwitchModeButtonGroup';
import CategoryCard from './CategoryCard';
import { Slider, RangeSlider } from 'rsuite';
import { fetchList } from './api';
import { SearchNoRouter } from "./Search";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class List extends SearchNoRouter {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
  }

  render() {
    const {query} = this.state;
    const paginationView = this.paginationView();
    const keyword = isMobile ? query.keyword : "";
    return (
      <div className="App page">

        <SwitchModeButtonGroup searchBarFunc={this.searchBarFunc} keyword={keyword}/>
		<MobileView>
          <div style={{display: "none"}}>
            <SearchBar query={query} ref={this.searchBarRef} prefix="/list" />
          </div>
          <div className="border-no-margin"></div>
		</MobileView>
        <BrowserView>
 		    <SearchBar ref={this.searchBarRef} prefix="/list" />
        </BrowserView>
        {paginationView}
        <BrowserView>
        <br/>
        <Row>
          <Col></Col>
          <Col xs={2}>地點</Col>
          <Col xs={2}>項目</Col>
          <Col>對象</Col>
          <Col>種類</Col>
          <Col>開始日期</Col>
          <Col>撥款</Col>
        </Row>
        </BrowserView>
        <br/>
        {
        this.state.result.map(gj =>(
          <div>

          <Link to={"/detail/" + gj.properties["identifier"]}  style={{ textDecoration: 'none' }} target="_blank">
          <CategoryCard isLong={true}
            category={gj.properties["category"]}
            name={gj.properties["project_name"]}
            budget={gj.properties["estimation"]}
            audience={gj.properties["audience"]}
            startDate={gj.properties["start_date"]}
            committee={gj.properties["committee"]}
            amount={gj.properties["amount"]}
            projectId={gj["identifier"]} 
          />
          </Link>
          <br/><br/>
		  </div>) 
        )}
      </div>
    );
  }
}

export default List;
