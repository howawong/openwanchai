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
    this.state = {result: [], yearRange: [2008, 2016], page: 2, total: 0, size: 3, loading:false}
  }

  fetchData(page) {
    const {yearRange, size, loading} = this.state;
	if (! loading) {
      fetchList(yearRange[0], yearRange[1], page, size).then(
	    result => {
		  this.setState({...this.state, 
		     			 loading: false,
						 page: page,
					     result: result.results["features"], 
					     totalPages: result.total_pages,
					     total: result.count,
					     lastPage: result.links.next === null,
					     firstPage: result.links.previous === null});
	  }
	);
	}
  }

  componentDidMount() {
    console.log("loading")
    this.fetchData(1);	
  }

  setValue(value) {
    console.log(value);
  }

  setYearRange(yearRange) {
    this.setState({...this.state, yearRange: yearRange});
	this.fetchData();
  }

  nextPage = () => {
    const { lastPage, loading, page } = this.state;
	console.log(lastPage, loading, page);
	if (! loading && ! lastPage) {
	  const newpage = page + 1;
	  this.fetchData(newpage);
	}
  }

  prevPage = () => {
    const { firstPage, loading, page } = this.state;
	console.log(firstPage, loading, page);
	if (! loading && ! firstPage) {
	  const newpage = page - 1;
	  this.fetchData(newpage);
	}
 
  }


  render() {
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
              <span className="page-number"> {start} - {end}/ {total} </span>&nbsp;&nbsp;
              <Button type="button" class="btn btn-circle" onClick={this.prevPage}>&#x3c;</Button>&nbsp;&nbsp;&nbsp;
              <Button type="button" class="btn btn-circle" onClick={this.nextPage}>&#x3e;</Button>
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
