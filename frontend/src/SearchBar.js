import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider, { Range } from 'rc-slider';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'rc-slider/assets/index.css';
import { DateRangePicker } from 'rsuite';



class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
	this.ref = React.createRef();
  }

  handleClose = () => { this.setState({show: false, value: this.state.value}) };
  handleShow = () => { this.setState({show: true, value: this.state.value}) };
  onChange = (value) => {this.setState({show:this.state.show, value: value});};
  
  render() {
    const { show, value } = this.state;
    return (
      <div ref={this.ref}>
        <Modal show={show} onHide={this.handleClose} animation={false}>
		  <Modal.Header closeButton>
			<Modal.Title>項目種類</Modal.Title>
		  </Modal.Header>

		  <Modal.Body>
		    <Form.Check type="checkbox" label="小型工程" />
		    <Form.Check type="checkbox" label="社區參與" />
		    <Form.Check type="checkbox" label="聯誼" />
		    <Form.Check type="checkbox" label="嘉年華" />
		    <Form.Check type="checkbox" label="教學及訓練" />
		    <Form.Check type="checkbox" label="比賽" />
		    <Form.Check type="checkbox" label="直接服務" />
		    <Form.Check type="checkbox" label="研究" />
		    <Form.Check type="checkbox" label="文化活動" />
			<br/>
		  </Modal.Body>
		</Modal>
		<div className="searchBar2">
		  <Row>
		    <Col>
			  <Button onClick={this.handleShow} variant="light">
			    <img src="/assets/icon/sort.svg" className="sort"/></Button>
			  <input type="text" placeholder="輸入項目名稱/關鍵詞/地點..." />
			</Col>
		    <Col className="center">
			  預算 1000K <Range defaultValue={[10,10000]}/> 2000K
			</Col>
		    <Col className="right">
			  <DateRangePicker
			    showOneCalendar
			    className="data-range"
			    size="md"
				placeholder="開始日期"
				align="left"
			  />
              <img src="/assets/icon/search_m.svg" className="search_m"/>

			</Col>
		  </Row>
		</div>
      </div>
    );
  }
};

export default SearchBar;
