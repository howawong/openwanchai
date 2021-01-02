import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CategoryCard from './CategoryCard';
import ProjectCategoryCard from './ProjectCategoryCard';
import HeatMap from './HeatMap';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Banner from './Banner';
import './styles.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";





class Index extends Component {
  render() {
    const oneCol = isMobile;
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
          <CategoryCard oneCol={oneCol}/>
          <CategoryCard oneCol={oneCol}/>
          <CategoryCard oneCol={oneCol}/>
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
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
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
          Copyright © 2020灣仔生猛<br/>
          <div>
          <span className="link">關於灣仔生猛</span><span className="link">資料來源</span>&nbsp;<span className="link">下載 CSV</span>
          </div>
		  &nbsp;
		  &nbsp;
		</footer>
      </div>
    );
  }
}

export default Index;
