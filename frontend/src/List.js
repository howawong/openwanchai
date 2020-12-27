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
  constructor(props) {
    super(props);
  }


  render() {
    const {query} = this.state;
    const paginationView = this.paginationView();
    return (
      <div className="App page">

        <SwitchModeButtonGroup searchBarFunc={this.searchBarFunc}/>
		<MobileView>
          <div style={{display: "none"}}>
            <SearchBar query={query} ref={this.searchBarRef}/>
          </div>
		</MobileView>
        <BrowserView>
 		    <SearchBar ref={this.searchBarRef}/>
        </BrowserView>
        {paginationView}
        <br/>
        {
        this.state.result.map(gj =>(
          <div>
          <CategoryCard 
            name={gj.properties["project_name"]}
            budget={gj.properties["estimation"]}
            audience={gj.properties["audience"]}
            startDate={gj.properties["start_date"]}
            committee={gj.properties["committee"]}
            amount={gj.properties["amount"]}
            projectId={gj["identifier"]} 
          />
          <br/><br/>
		  </div>) 
        )}
      </div>
    );
  }
}

export default List;
