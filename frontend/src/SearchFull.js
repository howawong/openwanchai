import React from 'react';
import './App.css';
import SampleMap from './SampleMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import SearchBar from './SearchBar';
import SwitchModeButtonGroup from './SwitchModeButtonGroup';
import CategoryCard from './CategoryCard';
import { fetchList } from './api';
import qs from 'qs';
import { SearchNoRouter } from "./Search";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class SearchFull extends SearchNoRouter {

  getSize() {
    return 500;
  }

  render() {
    const {yearRange,result, total, page, size, query} = this.state;
    console.log("Search", query);
      const resultView = result.map((gj, index) =>(
      <div key={index}>
        <Link to={"/detail/" + gj.properties["identifier"]}  style={{ textDecoration: 'none' }}>
        <CategoryCard key={index}
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
    </div>));
    const { history } = this.props;
    const pagination = this.paginationView();
    const switchButton = (<SwitchModeButtonGroup searchBarFunc={this.searchBarFunc} clickFullMap={() => this.goTo("/visuals", false)} clickMap={() => this.goTo("/search")} clickList={() => this.goTo("/list")}  />);
    return (
      <div className="App page">
        <MobileView>
	  <div className="searchbar-overlay">

        {switchButton}
	  </div>
          <div className="map-fullscreen">
            <SampleMap locations={result} ref={this.sampleMap} history={history}/>
          </div>
        </MobileView>
        {isBrowser && ( 
        <div className="flexbox">
          <div className="col2 searchbar-overlay">
            <div className="no-scroll">
              {switchButton}
              <SearchBar query={query} ref={this.searchBarRef} prefix="search_full"/>
            </div>
          </div>
          <div className="map-fullscreen">
            <SampleMap locations={result} ref={this.sampleMap} history={history}/>
          </div>
        </div>)}
      </div>
    );
  }
}

export default SearchFull;
