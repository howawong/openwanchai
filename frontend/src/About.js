import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import CategoryCard from './CategoryCard';
import ProjectCategoryCard from './ProjectCategoryCard';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import './styles.css';
import { fetchCategories, fetchHot } from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import BackButton from './BackButton';




class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  paragraph() {
    return (
      <div>
        <p>由灣仔區議會屬下開放灣仔區議會工作小組資助，「灣仔生猛 ── 促進灣仔區未來社區參與的互動開放數據平台」旨在建立易於檢索的地圖化資料庫，讓公眾可以一站式搜尋過去十年有關灣仔區的「地區小型工程計劃」、「社區參與計劃」及各式載於區議會及散落於立法會但與灣仔區發展相關的事項及活動。</p>

       <p>目前灣仔區內的工程及社區活動資料，散落於區議會網站各頁面及不同會議文件的附件中。市民沒法方便地搜索項目地點、舉辦日期及承辦機構，了解區內各項發展工程及活動資料、社區的未來變化、所涉預算等，亦難以檢視前人的實踐經驗和效果。</p>

       <p>是次研究涵蓋的時期由 2010 年 1 月至 2020 年 8 月、梳理現載於灣仔區議會網站的約 8,000 份文件。其中，研究團隊重點處理 5,310 份來自灣仔區議會各委員會、工作小組及大會文件，約 60 份關於工程撥款進度現況，其餘包括結算表／未完成／滾存區議會活動等跨年活動的相關文件。團隊亦搜集了立法會會議裡與灣仔區發展相關的文件作對證及對比。</p>

       <p>研究員以逐份閱讀的方式，找出期內的社區參與計劃活動申請、地區小型工程申請（包括由議員提出或由政府主導的工程）資料，並將每項活動／工程的（1）申請團體、（2）地點（包括文字描述及 GPS 座標）、（3）撥款金額、（4）活動類別、（5）服務對象、（6）參加人數、（7）活動／工程的開始日期、（8）結束日期、（9）性質、（10）活動詳細內容及（11）活動是否獲得資助等十一項資料，整理成統一格式的數據。</p>

      <p>團隊並將十年間共 2,323 項社區參與活動及地區小型工程的會議文件（包括申請書及撥款討論文件）轉為可機讀（Machine-readable）格式。</p>

      <p>生猛的公民參與，有賴資訊開放透明。我們將整理及圖像化既有的公開數據，以更親民易用的平台，讓居民了解十年間區內不同發展項目及社區活動的特性和成效，在未來構思更切合社區需要的「社區參與計劃」。</p>

      </div>
    
    );
  
  }

  paragraph2() {
    const chartMobileClassName = isBrowser ? "chart" : "chart-mobile";
    return (
      <div className="ml-3 mr-3">
        <p className="ml-3 mr-3">我們已於2020年10月舉辦三場社區參與工作坊，向一眾灣仔街坊及市民講解「開放數據」概念、現有區議會資訊的數據問題、以及未來可行方向等；參加者並一同嘗試將區議會網站文件轉為「可機讀」（machine-readable）數據。逾八成參加者均表示對區議會的開放數據情況有更深認識，亦希望灣仔區議會能就其文件和資訊提供互動的一站式搜尋平台。</p>

        <p className="ml-3 mr-3">從工作坊所知，公眾對灣仔區議會開放數據的情況有以下回應：<br/><br/></p>
	<div className="mr-3" style={{overflowWrap: "break-word"}}>
	  <Row>
	    <Col className="text-center">
	      <img src="/014_S1.png" className={chartMobileClassName}/>
	    </Col>
	    <Col className="text-center">
	      <img src="/016_S3.png"  className={chartMobileClassName}/>
	    </Col>
	  </Row>
	  <Row>
	    <Col className="text-center">
    	      <img src="/017_S4.png" className={chartMobileClassName} />
              <br/><b>(1 = 非常不滿意, 10 = 非常滿意)</b>
	    </Col>
	    <Col className="text-center">
              <img src="/018_S5.png" className={chartMobileClassName} />
              <br/><b>(1 = 非常不希望, 10 = 非常希望)</b>
	    </Col>
	  </Row>
	</div>
	<br/>
	<br/>
	<br/>
      </div>
    );
  }

  about() {
    const chartMobileClassName = isBrowser ? "chart" : "chart-mobile";
    return (
      <div className="ml-3" style={{display: "block"}}>
        <br/>
        <br/>
        <br/>
        <div className="text-right mr-5">
	  <BackButton />
        </div>
        <br/>
        <br/>
        <div className="text-center">
        <h3>關於灣仔生猛</h3>
        </div>
        <div className="border"></div>
                <br/><br/><br/>
	        <Row className="ml-3 mr-3">
	          <Col>
                    <img src="/about_1.png" className={chartMobileClassName} />
	          </Col>
	          <Col>
	            {this.paragraph()}
	          </Col>
	       </Row>
          <br/>
	        {this.paragraph2()}

      </div>
    );
  }

  source() {
    return (
      <div className="ml-3 mr-3">
       <br/>
       <div className="text-center ml-3 mr-3">
	 <h3 className="wrap-header">下載「灣仔生猛」研究報告全文&nbsp;
       <Button  as="a" variant="primary" className="ml-5" href="/Report_Open data_v4.pdf" target="_blank">下載</Button></h3>
         <div className="border"></div>
	 <br/><br/>

       <div className="small ml-3 mr-3">免責聲明：「灣仔生猛」平台及其內容所示所有圖片及資料僅供參考。我們已盡最大的努力提供準確的信息，但亦有可能會出現非故意的技術或同一文件更新的版本錯誤和排版錯誤。我們並不會因平台內容或因使用任何數據所引起的任何損失而作直接、間接、意外、衍生性的及懲罰性的損害賠償（包括金錢利益及無形的損失）及負上法律責任。資料如有任何落差，皆以灣仔區議會官方網頁原文件為準。</div>
       </div>
       <br/>
       <br/>
      </div>
    );
  }

  render() {
    return (
      <div className="page">
	<div className="about-page mr-3">
              {this.about()}
              {this.source()}
	</div>
	<Footer />
      </div>
    );
  }
}

export default About;
