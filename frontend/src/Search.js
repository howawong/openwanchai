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
import { withRouter } from "react-router";

class Search extends React.Component {
  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search.slice(1));
    this.searchBarRef = React.createRef();
    this.state = {result: [], total: 0, size: this.getSize(), loading:false, query: query, bins:[]}
    this.sampleMap = React.createRef();
  }

  getSize() {
    return 10;
  }

  componentWillReceiveProps(nextProps) {
    const query = qs.parse(nextProps.location.search.slice(1));
    console.log("query2", query);
    this.setState({result: [], page: 1, total: 0, size: this.getSize(), loading:false, query: query, bins:[]}, () => { this.fetchData(1);})
  }

  fetchData() {
    const {minDate, maxDate, size, loading, query} = this.state;

    console.log("query2", this.state);
	if (! loading) {
      console.log("query", query);
      if (query.categories === undefined) {
        query.categories = ""
      }
      const page = query.page ?? 1;
      fetchList(query.keyword, query.minDate, query.maxDate, query.minAmount ?? 0, query.maxAmount ?? 3000000, page, size, query.categories.split(","), query.showBin).then(
	    result => {
		  if (this.sampleMap.current) {
		
		  }
		  console.log(this.sampleMap);
		  this.setState({...this.state, 
		     			 loading: false,
					   page: page,
					     result: result.results["features"], 
			                     bins: result.layers["bins"]["features"] ?? [],
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
	  const newpage = (parseInt(page) + 1).toString();
	  const url = this.searchBarRef.current.getSearchURL(this.props.location.pathname,newpage);
          this.props.history.replace(url);
	  //this.fetchData(newpage);
	}
  }

  prevPage = () => {
    const { firstPage, loading, page } = this.state;
	console.log(firstPage, loading, page);
	if (! loading && ! firstPage) {
	  const newpage = (parseInt(page) - 1).toString();
	  const url = this.searchBarRef.current.getSearchURL(this.props.location.pathname,newpage);
          this.props.history.replace(url);
	  //this.fetchData(newpage);
          //this.props.history.replace();
	}
 
  }

  paginationView = () => {
    const {total, page, size} = this.state;
    const start = (page - 1) * size + 1 ;
	const end = Math.min((page) * size , total);

    return (
	  <div className="pagination">
	 <table>
	    <tr><td>
        <div className="page-number h-100  justify-content-center h-100"> <h5>{start} - {end} / {total}</h5> </div>&nbsp;&nbsp;</td>
        <td>
        <button className="btn btn-link" onClick={() => this.prevPage()}><img src="/assets/btn/previous.svg"/></button></td>
        <td><button className="btn btn-link" onClick={() => this.nextPage()}><img src="/assets/btn/next.svg"/></button></td>
	    </tr>
        </table>
      </div>

	);
  }
  
  searchBarFunc = () => {
    console.log("ref", this.searchBarRef);
    return this.searchBarRef;
  }

  render() {
    const {yearRange,result, total, page, size, query, bins} = this.state;
    console.log(this.props);
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
    const pagination = this.paginationView();
    return (
      <div className="App page">
        <MobileView>
          <div className="leaflet-container-mobile">
            <SwitchModeButtonGroup searchBarFunc={this.searchBarFunc} keyword={query.keyword}
	    clickMap={() => this.goTo("/search")} clickList={() => this.goTo("/list")} clickFullMap={() => this.goTo("/visuals", false)}/>
            <div style={{display: "none"}}>
              <SearchBar query={query} ref={this.searchBarRef} history={this.props.history}/>
            </div>
            <SampleMap locations={result} ref={this.sampleMap} bins={bins}/>
          </div>
          {pagination}
          {resultView}
		  <br/>
        </MobileView>
        {isBrowser && ( 
        <div className="flexbox">
          <div className="col2 result-column">
            <SwitchModeButtonGroup searchBarFunc={this.searchBarFunc} clickMap={() => this.goTo("/search_full")} clickList={() => this.goTo("/list")} clickFullMap={() => this.goTo("/search_full")}/>
            <SearchBar query={query} ref={this.searchBarRef} history={this.props.history}/>
            {pagination}<br/>
            {resultView}
            </div>
            <div className="leaflet-container-parent col">
              <SampleMap locations={result} ref={this.sampleMap} history={this.props.history} bins={bins}/>
            </div>
        </div>)}
      </div>
    );
  }

  goTo(x, shouldGet=true) {
    const url = shouldGet ? this.searchBarRef.current.getSearchURL(x) : x;
    this.props.history.push(url);
  }
}

const SearchNoRouter = Search;

export { SearchNoRouter };
export default withRouter(Search);
