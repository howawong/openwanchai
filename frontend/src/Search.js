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
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class Search extends React.Component {
  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search.slice(1));
    this.searchBarRef = React.createRef();
    this.state = {result: [], page: 2, total: 0, size: 6, loading:false, query: query}
	this.sampleMap = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    const query = qs.parse(nextProps.location.search.slice(1));
    this.setState({result: [], page: 2, total: 0, size: 6, loading:false, query: query}, () => { this.fetchData(1);})
  }

  fetchData(page) {
    const {minDate, maxDate, size, loading, query} = this.state;
	if (! loading) {
      console.log(query);
      fetchList(query.keyword, query.minDate, query.maxDate, query.minAmount, query.maxAmount, page, size).then(
	    result => {

		  if (this.sampleMap.current) {
		    console.log("clear");
		    this.sampleMap.current.clear(result.results["features"]);
		  }
		  console.log(this.sampleMap);
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

  paginationView = () => {
    const {total, page, size} = this.state;
    const start = (page - 1) * size + 1 ;
	const end = Math.min((page) * size , total);

    return (
	  <div className="pagination">
        <span className="page-number"> {start} - {end}/ {total} </span>&nbsp;&nbsp;
        <Button type="button" className="btn btn-circle" onClick={this.prevPage}>&#x3c;</Button>&nbsp;&nbsp;&nbsp;
        <Button type="button" className="btn btn-circle" onClick={this.nextPage}>&#x3e;</Button>
      </div>

	);
  }
  
  searchBarFunc = () => {
    return this.searchBarRef;
  }

  render() {
    const {yearRange,result, total, page, size, query} = this.state;
    console.log("Search", query);
	const resultView = result.map((gj, index) =>(
      <div key={index}>
        <Link to={"/detail/" + gj.properties["identifier"]}  style={{ textDecoration: 'none' }} target="_blank">
        <CategoryCard key={index}
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
    const pagination = this.paginationView();
    return (
      <div className="App page">
        <MobileView>
          <div className="leaflet-container-mobile">
            <SwitchModeButtonGroup searchBarFunc={this.searchBarFunc} keyword={query.keyword}/>
            <div style={{display: "none"}}>
              <SearchBar query={query} ref={this.searchBarRef}/>
            </div>
            <SampleMap locations={result} ref={this.sampleMap}/>
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
            <SwitchModeButtonGroup searchBarFunc={this.searchBarFunc}/>
            <SearchBar query={query} ref={this.searchBarRef}/>
            {pagination}<br/>
            {resultView}
            </div>
            <div className="leaflet-container col">
              <SampleMap locations={result} ref={this.sampleMap}/>
            </div>
        </div>
        </BrowserView>
      </div>
    );
  }
}

export default Search;
