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
import Search from "./Search";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";



class List extends Search {
  constructor() {
    super();
  }

  render2() {
    const {yearRange,result, total, page, size} = this.state;
	const start = (page - 1) * size + 1 ;
	const end = Math.min((page) * size , total);
    const resultView = result.map(gj =>(
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
    const pagination = (
	  <div className="pagination">
        <span className="page-number"> {start} - {end}/ {total} </span>&nbsp;&nbsp;
        <Button type="button" class="btn btn-circle" onClick={this.prevPage}>&#x3c;</Button>&nbsp;&nbsp;&nbsp;
        <Button type="button" class="btn btn-circle" onClick={this.nextPage}>&#x3e;</Button>
      </div>
	);
    return (
      <div className="App page">
        <MobileView>
          <div className="leaflet-container-mobile">
            <SampleMap locations={result}/>
          </div>
          <br/>
          <br/>
          {resultView}
		  <br/>
		  {pagination}
        </MobileView>
        <BrowserView>
        <div className="flexbox">
          <div className="col2">

            <SwitchModeButtonGroup />
            <SearchBar />
            {pagination}<br/>
            {resultView}
            </div>
          <div className="leaflet-container col">
            <SampleMap locations={result}/>
          </div>
        </div>
        </BrowserView>
      </div>
    );

  }

  render() {
    const {yearRange} = this.state;
    const paginationView = this.paginationView();
    return (
      <div className="App page">
        <SwitchModeButtonGroup />
        <BrowserView>
 		    <SearchBar />
        </BrowserView>
        {paginationView}
        <br/>
        {
        this.state.result.map(gj =>(
          <div>
          <CategoryCard 
            name={gj.properties["project_name"]}
            budget={gj.properties["metadata"]["ballpark"]}
            projectId={gj.properties["metadata"]["identifier"]} 
          />
          <br/><br/>
		  </div>) 
        )}
      </div>
    );
  }
}

export default List;
