import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import StackedBar from "./StackedBar";
import TreeMap from './TreeMap';
import HeatMap from './HeatMap';
import {fetchList} from './api';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class HeatMapLong extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [] };
  }

  stackedBarButton() {
    return (
      <Link to="/spent-by-committee">
        <Button variant="secondary">更多內容</Button> 
      </Link>
    )
  }

  treeMapButton() {
    return (
      <Link to="/treemap">
        <Button variant="secondary">更多內容</Button> 
      </Link>
    )
  }
 
  heatMapButton() {
    return (
      <Link to="/heatmap">
        <Button variant="secondary">更多內容</Button> 
      </Link>
    )
  }


  render() {
    const heatMapText = (
      <div>
        <h3>灣仔邊喥最多活動？</h3>
        <br/>
        <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>
	熱點地圖（Heat map）將愈多活動發生的地方，在地圖上以紅橙黃等暖色呈現，用家可以不斷放大地圖，仔細觀察舉辦活動的所在地及分佈情況。Heatmap 的最大功能，是讓官民雙方對區內活動或服務是否足夠、是否平均一目了然。    
	</p>
        <p className={isMobile? "ml-3 mr-3 mb-3" : ""}>
	但係，點解有啲地點咁 Hot? 點解有啲活動係超出灣仔區仲過晒海？如果我係想攪活動幫多啲灣仔街坊，我應該點去理解呢個熱點地圖呢？
	</p>
	<br/>
        {this.heatMapButton()}
      </div>
    
    );



    return (
      <div className={isMobile ? "heatmap-container-mobile" :"heatmap-container"}>

        <HeatMap width="100%"/>
        <br/>
        <h2>灣仔熱點地圖可以點睇？</h2>
        <p>熱點地圖（Heat map）將愈多活動發生的地方在地圖上以紅橙黃等暖色呈現，用家可以不斷放大地圖，仔細觀察舉辦活動的所在地及分佈情況，以及點擊地點圖示，查看活動名稱及舉行日期。</p>
	<br/>
        <h3>🔰 點解有啲地點咁熱門？</h3>
        <p>熱門地點多數是區內官方場地，例如禮頓山社區會堂（280次）、修頓球場（560次），而具優勢的團體有較大可能長期佔用官方場地。由於民政事務總署撥款機制 對曾經獲區議會撥款的團體較有利，其中每年的「指定團體」 都有優勢租用官方大型場地。機制使然，會令有志服務灣仔區的新團體，更難在此局限下與指定團體競爭籌劃大型或主題活動。</p>
	<br/>
        <h3>🔰 點解有咁多地方超出灣仔區？</h3>
        <p>按梳理的數據所示，由灣仔區議會撥款資助的活動舉辦地點不限於灣仔區。縮放全港地圖，其他團塊所示熱點，多數為「一日遊」活動所到之處（如新春到沙田車公廟作一日遊、大澳一日遊等）。但主要活動都在灣仔區，少量在北角區，例如戲曲活動在新光戲院（21次）、及東區的西灣河文娛中心（30次）舉行。這個數字及地點亦受2013年前，銅鑼灣以東是屬於另一區議會分區所影響。</p>
	<br/>
        <h3>🔰 睇到啲活動响邊咁又點呀？</h3>
        <p>Heatmap 有助官民雙方審視區內不同區域，舉行活動地點是否切合社區變化和需要。例如灣仔道一帶居民最高齡，區議會有否因時制宜，鼓勵、發掘及支持團體在該地段籌劃更多適合該群組的活動？又如灣仔區有大量公共空間（包括康文署公園及休憩空間），區議會又會如何協助及鼓勵團體多善用閒置公共空間以提供更多活動或服務？</p>
	<br/>
        <h3>❗️不過呢...</h3>
        <p>由於大量關於茶聚、聚餐或春茗的活動申請，皆沒有寫明地點，故 Heatmap 無法展示或突顯任何沒有註明活動位置的活動所在。另外，暫時灣仔區議會並沒有上載「修訂獲資助計劃通知書」，所以此數據圖無法反映已改變的活動地點。例如本項目「灣仔生猛互動數據工作坊」原定活動地點為「灣仔富德樓11樓」，但最後因為政府場地「茂蘿街7號」有檔期，工作坊改為在茂蘿街7號進行。但在此數據圖（以及活動申請書），工作坊仍顯示在「灣仔富德樓11樓」舉行。這在開放數據的定義中是「數據完整性」不足，詳細解釋見「灣仔生猛」完整報告。</p>

	<br/>
        <h3>建議：</h3>
        <p>未來處理活動申請時，區議會應盡量要求申請團體列明地點 ── 如「金御海鮮酒家（待定）」── 會比現在常見的「灣仔區的酒樓」、「灣仔區」更清晰。亦希望未來區議會可以上載「修訂獲資助計劃通知書」在相關活動中，以便完整追踪活動變化。</p>
	
     </div>
    );
  }
}

export default HeatMapLong;
