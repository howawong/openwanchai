import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import CategoryCard from './CategoryCard';
import ProjectCategoryCard from './ProjectCategoryCard';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Banner from './Banner';
import './styles.css';
import HeatMap from './HeatMap';
import { fetchCategories, fetchHot } from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";





class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {"categories": [], "hot": []}
    this.galleryRef = React.createRef();
    this.galleryRef2 = React.createRef();
  }

  componentDidMount() {
    fetchCategories().then(cat => this.setState({...this.state, "categories": cat}));  
    fetchHot().then(cat => this.setState({...this.state, "hot": cat["features"]}));  
  }

  handleNav = (ref, direction) => {
    var delta = 100;
    console.log("clicked", ref.current, ref.current.scrollLeft);
    if (direction == "left") {
      delta = delta * -1;
    }
    ref.current.scrollLeft += delta;
  }

  render() {
    const { categories, hot } = this.state;
    const oneCol = isMobile;

    const categoryCards =  categories.map(c => (<Link to={"/search?minAmount=0&maxAmount=5000000&minDate=2010-01-01&maxDate=2021-03-01&categories=" + c.code.toString() + "&keyword="}><ProjectCategoryCard title={c.text} img={c.img}/></Link>));
    const hotCards =  hot.map(c => c["properties"]).map(c => (

        <Link to={"/detail/" + c["identifier"]}  style={{ textDecoration: 'none' }}>
	  <CategoryCard
	    oneCol={oneCol}
	        category={c["category"]}
		committee={c["committee"]}
		projectId={c["identifier"]}
		budget={c["estimation"]}
		name={c["project_name"]}
		audience={c["audience"]}
        startDate={c["start_date"]}
      /></Link>
	));

    return (
      <div className="page">
	    <Banner />    
	    	<div className="most-visited">
        <div className="title">
          最多人查看項目
        </div>
        <br/>
	  	<div className="right-bottons">
		  <button className="btn btn-link" onClick={() => this.handleNav(this.galleryRef, "left")}><img src="/assets/btn/previous.svg"/></button>
		  <button className="btn btn-link" onClick={() => this.handleNav(this.galleryRef, "right")}><img src="/assets/btn/next.svg"/></button>
		</div>
		</div>
	<div style={{clear:"both"}}></div>
        <div className="browse-gallery" ref={this.galleryRef}>
		  {hotCards}
        </div>
        <div className="border"/>
        <br/>
        <div className="title">
          尋找項目種類
        </div>
        <div className="right-bottons">
	          <button className="btn btn-link" onClick={() => this.handleNav(this.galleryRef2, "left")}><img src="/assets/btn/previous.svg"/></button>
		  <button className="btn btn-link" onClick={() => this.handleNav(this.galleryRef2, "right")}><img src="/assets/btn/next.svg"/></button>

		</div>
		<br/>

	<div style={{clear:"both"}}></div>
        <div className="project-category-gallery" ref={this.galleryRef2}>
		  {categoryCards}
        </div>
		<br/>
        <div className="border"/>
		<br/>
		<HeatMap />
		<footer className="section footer-classic context-dark bg-image footer">
		  &nbsp;
		  &nbsp;
          Copyright © {new Date().getFullYear()} 灣仔生猛<br/>
          <div>
          <span className="link"><Link to="/about">關於灣仔生猛</Link></span><span className="link">資料來源</span>&nbsp;<span className="link">下載 CSV</span>
          </div>
		  &nbsp;
		  &nbsp;
		</footer>
      </div>
    );
  }
}

export default Index;
