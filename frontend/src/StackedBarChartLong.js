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
import { NavHashLink } from 'react-router-hash-link';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class StackedBarChartLong extends Component {
  constructor(props) {
    super(props);
    this.state = { points: [] };
  }

  render() {
    return (
      <div className="mb-3">
        <StackedBar width="100%" height={400}/>
	<br/>
	<h2>🔰 堆疊棒形圖（Stacked bar chart）又點睇呢？</h2>
	<p>按年度、委員會／工作小組／大會去呈現成功批出的預算金額，讓使用者一目了然，看到每個年度灣仔區議會的預算分佈，以及十年來所批資助的增減變化。</p>
	<br/>
	<h3>🔰 點解個棒形圖係由2014年開始？</h3>
	<p>2010至2013年的撥款委員會以閉門形式進行，所以沒有數據可以劃分各預算是分別批予那一個工作小組／委員會，抑或是大會主導的項目。區議會的撥款是由款額決定要「上會」多少次、要經過那些會兩度、甚至三度審批。基本上超過一萬五千元的活動是要經過：工作小組 > 委員會 > 區議會大會 > 撥款及財務委員會（2016年起改稱「撥款及常務委員會」，下略為「撥款會」）表決通過。申請團體到區議會闡釋活動（俗稱「上會」）時，申請團體需要接受議員提問，以解釋其申請內容，讓議員及公眾了解該活動是否適切可行。</p>
	<br/>
	<p>由於撥款會是「守尾門」的會，除了負責討論、表決一般由政府主導的灣仔區活動、亦直接審批一萬五千元以下的活動撥款申請，所以在堆疊棒形圖中佔的比例最大。</p>
	<br/>
	<p>2014 和 2015年「撥款及財務委員會」的部份以紅色表示，2016年起改稱「撥款及常務委員會」則以橙色表示，但所代表的皆是撥款會。</p>
	<br/>
	<h3>🔰 點解又會睇到2021年呢？</h3>
	<p>有些活動會橫跨財政年度，所以在此亦有包括。</p>
	<br/>
	<h3>❗️不過呢...</h3>
	<p>其實有些項目在通過撥款後，未必真正開始（例如團體最後決定取消活動、政府遲遲沒有發出附有活動編號的確認信，令團體無法正式開展活動），這些例外就無法在這個數據圖反映了。</p>
	<br/>
	<br/>
     </div>
    );
  }
}

export default StackedBarChartLong;
