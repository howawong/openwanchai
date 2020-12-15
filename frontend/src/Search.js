import React from 'react';
import './App.css';
import SampleMap from './SampleMap';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import SearchBar from './SearchBar';
import SwitchModeButtonGroup from './SwitchModeButtonGroup';
import CategoryCard from './CategoryCard';
import { Slider, RangeSlider } from 'rsuite';
import { fetchList } from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class Search extends React.Component {
  constructor() {
    super();
    this.state = {result: [], yearRange: [2008, 2016]}
  }

  fetchData() {
    const {yearRange} = this.state;
    fetchList(yearRange[0], yearRange[1]).then(
	  result => {
	    console.log(result);
		this.setState({...this.state, result: result});
	  }
	);
  }

  componentDidMount() {
    console.log("loading")
    this.fetchData();	
  }

  setValue(value) {
    console.log(value);
  }

  setYearRange(yearRange) {
    this.setState({...this.state, yearRange: yearRange});
	this.fetchData();
  }

  render() {
    const {yearRange,result} = this.state;
    const resultView = result.slice(0, 10).map(gj =>(
      <div>
        <Link to={"/detail/" + gj.properties["metadata"]["identifier"]}  style={{ textDecoration: 'none' }}>
        <CategoryCard 
          name={gj.properties["project_name"]}
          budget={gj.properties["metadata"]["ballpark"]}
          projectId={gj.properties["metadata"]["identifier"]} 
        />
        </Link>
        <br/><br/>
			</div>));

    return (
      <div className="App page">
        <MobileView>
          <div className="leaflet-container-mobile">
            <SampleMap locations={this.state.result.slice(0,3)}/>
          </div>
          <br/>
          <br/>
          {resultView}
        </MobileView>
        <BrowserView>
        <div className="flexbox">
          <div className="col2">

            <SwitchModeButtonGroup />
            <SearchBar />
            <div className="pagination">
              <span className="page-number"> 1 - 10/ 300 </span>&nbsp;&nbsp;
              <button type="button" class="btn btn-circle">&#x3c;</button>&nbsp;&nbsp;&nbsp;
              <button type="button" class="btn btn-circle">&#x3e;</button>
            </div>
            <br/>
            {resultView}
            </div>
          <div className="leaflet-container col">
            <SampleMap locations={this.state.result.slice(0,3)}/>
          </div>
        </div>
        </BrowserView>
      </div>
    );
  }
}

export default Search;
