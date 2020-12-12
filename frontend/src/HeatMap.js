import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class HeatMap extends Component {
  render() {
    return (
      <div className="heatmap-container">
        <Row>
          <Col>
            <h3>灣仔預算 Heatmap</h3>
            <br/>
            <p>回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
          </Col>
          <BrowserView>
          <Col>
            <img src="https://i.stack.imgur.com/kbMwI.png" style={{width: "25vw"}}/>
          </Col>
          </BrowserView>
        </Row>
				<MobileView>
          <Row>
            <Col><img src="https://i.stack.imgur.com/kbMwI.png" style={{width: "100%"}}/></Col>
          </Row>
        </MobileView>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <BrowserView>
          <Col>
            <img src="https://i.stack.imgur.com/kbMwI.png" style={{width: "25vw"}}/>
          </Col>
          </BrowserView>
          <Col>
            <div class="right-container">
            <h3>邊個類別分得較多預算?</h3>
            <br/>
            <p>回力場住得親十聽防美！離的高怎的可讀發合。何觀自了期還對……身近了相新急應體？告現開他年中學：土新人坐考理價金有的他，想達去治人媽決東習中信回主弟；英那北天有關時的配一作、光可然日生、歡方神次界是車如現定我黨小的出現告自天例屋市一！</p>
            </div>
          </Col>
        </Row>
				<MobileView>
          <Row>
            <Col><img src="https://i.stack.imgur.com/kbMwI.png" style={{width: "100%"}}/></Col>
          </Row>
        </MobileView>
      </div>
    );
  }
}

export default HeatMap;
