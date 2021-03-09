import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
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
  }

  componentDidMount() {
    fetchCategories().then(cat => this.setState({...this.state, "categories": cat}));  
    fetchHot().then(cat => this.setState({...this.state, "hot": cat["features"]}));  
  }

  render() {
    const { categories, hot } = this.state;
    const oneCol = isMobile;

    const categoryCards =  categories.map(c => (<ProjectCategoryCard title={c.text} img={c.img}/>));
    const hotCards =  hot.map(c => c["properties"]).map(c => (

        <Link to={"/detail/" + c["identifier"]}  style={{ textDecoration: 'none' }}>
	  <CategoryCard
	    oneCol={oneCol}
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
        <BrowserView>
	  	<div className="right-bottons">
          <span class="badge badge-secondary">查看全部</span>
		  <img src="/assets/btn/previous.svg" />
		  <img src="/assets/btn/next.svg" />
		</div>
        </BrowserView>
		</div>
        <div class="browse-gallery">
		  {hotCards}
        </div>
        <MobileView>
          <Container> 
            <span class="badge badge-secondary">查看全部</span>
          </Container>
        </MobileView>
        <div className="border"/>
        <br/>
        <div className="title">
          尋找項目種類
        </div>
        <BrowserView>
        <div className="right-bottons">
          <span class="badge badge-secondary">查看全部</span>
		  <img src="/assets/btn/previous.svg" />
		  <img src="/assets/btn/next.svg" />
		</div>
        </BrowserView>
		<br/>
        <div className="project-category-gallery">
		  {categoryCards}
        </div>
		<br/>
        <MobileView>
          <Container> 
            <span class="badge badge-secondary">查看全部</span>
          </Container>
        </MobileView>
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
