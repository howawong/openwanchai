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
import Visuals from './Visuals';
import Footer from './Footer';
import HeatMapLong from './HeatMapLong';
import TreeMapLong from './TreeMapLong';
import StackedBarChartLong from './StackedBarChartLong';
import { fetchCategories, fetchHot } from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { withRouter } from "react-router";
import SwitchModeButtonGroup from './SwitchModeButtonGroup';



class VisualPage extends Component {
  constructor(props) {
    super(props);
    this.state = {"categories": [], "hot": []}
    this.galleryRef = React.createRef();
    this.galleryRef2 = React.createRef();
    this.galleryRef3 = React.createRef();
  }

  handleNav = (ref, direction) => {
    var delta = 100;
    console.log("clicked", ref.current, ref.current.scrollLeft);
    if (direction == "left") {
      delta = delta * -1;
    }
    ref.current.scrollLeft += delta;
  }

  searchBarFunc() {
    return {current: null};
  }

  render() {
    const { categories, hot } = this.state;
    

    return (
      <div className="page">
	<div className="most-visited">
          <div className="title">
            <h3>數據圖 : 灣仔的活動可以咁睇</h3>
          </div>
	</div>
        <br/>
        <div className="border"/>
	<br/>
	<br/>
	<br/>
	<div className="ml-5 mr-5">
        <h1>數據圖：灣仔啲活動可以咁樣睇</h1><br/>

	<p>是次項目邀請兼具地理規劃知識、數據科學及系統開發經驗的專業團隊架設「灣仔生猛」網上平台，將研究員整理好的數據及合共文件，並以三款圖表作數據可視化（Data visualization）呈現，在「數據圖」分頁整理為：熱點地圖（Heat map）、堆疊棒形圖（Stacked bar chart）、矩形樹狀圖（Tree map）。</p>
	<p>一齊嚟逐個解讀數據圖：</p>
	<section id="heatmap">
	<HeatMapLong />
	</section>
	<section id="stacked">
	<StackedBarChartLong />
	</section>
	<TreeMapLong />
	<section id="treemap">
	</section>
	</div>
	<Footer />
      </div>
    );
  }
}

export default withRouter(VisualPage);
