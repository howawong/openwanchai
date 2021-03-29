import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import SearchBar from './SearchBar';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import './styles.css';
import TreeMap from './TreeMap';
import Footer from './Footer';
import BackButton from './BackButton';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";





class TreeMapPage extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  onChange(event) {
    this.ref.current.changeYear(event.target.value);
  }

  render() {
    const content = (height, ratio) => (
      <div>
            <TreeMap width="100%" ratio={ratio} height={height} ref={this.ref} max={12} w={5}  fontSize={isMobile ? 12 : 16}/>
            <div className="mb-3"><br/></div>
              <div>
              <Form.Group controlId="treemap.year">
                <Form.Control as="select" onChange={this.onChange.bind(this)}>
                  <option value="-1">所有年份</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                </Form.Control>
              </Form.Group>
            </div>
       </div>
    );


    return (
      <div className="page">
        <BrowserView>
        <Row className="justify-content-md-center mt-5 mb-5">
          <Col xs={2} className="ml-3 mb-3">
            <BackButton />    
          </Col>
          <Col>
            <div className="detail text-center">
            <div className="shadow-container">
            <h2 className="mb-5">灣仔預算樹狀圖</h2>
            {content(isMobile ? 200 : 800)}
            </div>
        </div>
      </Col>
      <Col xs={2}>
      </Col>
  <br/>
  <br/>
  <br/>
  <br/>
  </Row>
  </BrowserView>
  <MobileView>
    <Row className="ml-2 mb-2 mt-2">
      <BackButton/>&nbsp;&nbsp;&nbsp;&nbsp;
      <h3 className="">灣仔預算樹狀圖</h3>
    </Row>
    <Row>
      <Col>
      {content(400, isMobile ? 10 / 3 : null)}
      </Col>
    </Row>
  </MobileView>
  <br/>
  <br/>
  <br/>
  <br/>
  <Footer />
      </div>
    );
  }
}

export default TreeMapPage;
