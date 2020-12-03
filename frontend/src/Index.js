import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CategoryCard from './CategoryCard';
import ProjectCategoryCard from './ProjectCategoryCard';
import HeatMap from './HeatMap';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './styles.css';



class Index extends Component {
  render() {
    return (
      <div className="page">
        <Jumbotron className="banner">
          <div className="title">搜尋灣仔區撥款項目</div>
          <SearchBar />
        </Jumbotron>
        <div className="title">
          最多人查看項目
        </div>
        <div class="browse-gallery">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
        <br/>
		<br/>&nbsp;
		<br/>
        <div className="border"/>
        <div className="title">
          尋找項目種類
        </div>
        <div class="project-category-gallery">
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
          <ProjectCategoryCard />
        </div>
		<br/>&nbsp;<br/>
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
