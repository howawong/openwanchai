import React, {Component} from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CategoryCard from './CategoryCard';
import './styles.css';
import SampleMap from './SampleMap';



class Detail extends Component {
  constructor(params) {
    super(params);
	const {id} = this.props.match.params;
    this.state = {id: id, result: []};
  }



  componentDidMount() {
    const {id} = this.state;
    fetch("http://192.168.1.54:8000/sample/detail?objectID=2018MWP008").then(res => res.json()).then(
	  result => {
		this.setState({...this.state, result: [result]});
	  }
	);
  }



  render() {
    const {id, result} = this.state;
    const map = result;
	const properties = result && result.properties;
	console.log(map);
    return (
      <div className="page fullscreen">
        <div className="detail">
        <Row className="header">
          <Col>OPENDATA</Col>
          <Col><span className="title">搜尋灣仔區撥款項目</span></Col>
          <Col>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">地圖</Button>
              <Button variant="secondary">列表</Button>
              <Button variant="secondary">數據圖</Button>
            </ButtonGroup> 
          </Col>
        </Row>
        <Row>
        <Col xs={2}></Col>
        <Col>
		<div className="shadow-container">
	    <div className="mapContainer">
	      <SampleMap locations={map} className="map"/>
		</div>
        <br/>
        <h1>粵曲歡唱娛坊眾</h1>
        <br/>
        <div>
        <Row>
        <Col>地點: 灣仔區街坊福利會</Col><Col>對象: 區內所有居民</Col>
        </Row><Row>
        <Col>預算撥款: $200k</Col><Col>開始日期: 7/3/2020</Col>
        </Row><Row>
        <Col>類別: 聯誼  </Col><Col>結束日期: 7/3/2020</Col>
        </Row>
        </div>
        <div className="border"/><br/>
        詳細:<br/><br/><br/>
        回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！
        <div className="border"/><br/>
		計劃書: &nbsp;&nbsp;<Button color="blue"> 下載 </Button>
        </div>
        </Col>
        <Col xs={2}></Col>
        </Row>
        </div>
      </div>
    );
  }
}

export default Detail;
