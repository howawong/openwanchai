import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import CategoryCard from './CategoryCard';
import ProjectCategoryCard from './ProjectCategoryCard';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
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





class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  about() {
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <div className="text-right mr-5">
          <Link className="button" to="/">
            <b>&lt;</b> &nbsp;&nbsp;返回
          </Link>
        </div>
        <br/>
        <br/>
        <div className="text-center">
        <h3>關於灣仔生猛</h3>
        </div>
        <div className="border"></div>
                <br/><br/><br/>
                <p>目前灣仔區內的工程及社區活動資料，散落於區議會網站各頁面及不同會議文件的附件中。市民沒法方便地搜索項目地點、舉辦日期及承辦機構，了解區內各項發展工程及活動資料、社區的未來變化、所涉預算等，亦難以檢視前人的實踐經驗和效果。</p>

                <p>「灣仔生猛 ── 促進灣仔區未來社區參與的互動開放數據平台」旨在建立易於檢索的地圖化資料庫，讓公眾可以一站式搜尋過去十年（2010年1月至 2020年8月）有關灣仔區的「地區小型工程計劃」、「社區參與計劃」及各式載於區議會及散落於立法會但與灣仔區發展相關的事項及活動。</p>

                <p>生猛的公民參與，有賴資訊開放透明。我們將整理及圖像化既有的公開數據，以更親民易用的平台，讓居民了解十年間區內不同發展項目及社區活動的特性和成效，在未來構思更切合社區需要的「社區參與計劃」。</p>
          <br/>
                <img src="/about_1.png" />
          <br/>
          <p>我們已於去年底舉辦三場社區參與工作坊，向一眾灣仔街坊及市民講解「開放數據」概念、現有區議會資訊的數據問題、以及未來可行方向等；參加者並一同嘗試將區議會網站文件轉為「可機讀」（machine-readable）數據。逾八成參加者均表示對區議會的開放數據情況有更深認識，亦希望灣仔區議會能就其文件和資訊提供互動的一站式搜尋平台。</p>

      </div>
    );
  }

  source() {
    return (
      <div>
       <img src="/about_2.png" />

       <div className="text-center">
	     <h3>資料來源：灣仔區議會</h3>
       </div>
       <div className="border"></div>
       <br/>
       <br/>
       <br/>
       <br/>
       dsfsdasddsfdsfsdfsdafdsfdsadsf
       <br/>
       <br/>
       <br/>
       <br/>
      </div>
    );
  }

  render() {
    return (
      <div className="page">
	      <div className="about-page">
	        <Row>
	          <Col className="left-col">
	          </Col>
	          <Col>
              {this.about()}
              {this.source()}
	          </Col>
	        </Row>
	      </div>
	      <footer className="section footer-classic context-dark bg-image footer">
        Copyright © {new Date().getFullYear()} 灣仔生猛<br/>
        <div>
        <span className="link"><Link to="/about">關於灣仔生猛</Link></span><span className="link">資料來源</span>&nbsp;<span className="link">下載 CSV</span>
        </div>
	      </footer>
      </div>
    );
  }
}

export default About;
