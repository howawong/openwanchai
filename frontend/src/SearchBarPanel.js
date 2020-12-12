import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider, { Range } from 'rc-slider';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'rc-slider/assets/index.css';
import { DateRangePicker } from 'rsuite';



class SearchBarPanel extends Component {
  constructor(props) {
    super(props);
	this.ref = React.createRef();
  }

  handleClose = () => { this.setState({show: false}) };
  handleShow = () => { this.setState({show: true}) };
  onChange = (value) => {this.setState({show:this.state.show});};
  
  render() {
    const { show } = this.props;
    return (
      <div ref={this.ref}>
        <Modal show={show} onHide={this.props.handleClose} animation={false}>
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
      </div>
    );
  }
};

export default SearchBarPanel;
