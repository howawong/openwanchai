import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Slider, { Range } from 'rc-slider';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'rc-slider/assets/index.css';
import { DateRangePicker } from 'rsuite';
import numeral from 'numeral';



class SearchBarPanelMobile extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
	this.ref = React.createRef();
    this.onAmountChanged = this.props.onAmountChanged;
    this.onDateRangeChanged = this.props.onDateRangeChanged;
  }

  stateFromProps = (props) => {
    const showDateRange = props.showDateRange ?? true;
    const showBudget = props.showBudget ?? true;
    const visible = props.visible ?? true;
    const newState = {...this.state, dates: props.dates, budgets: props.budgets, showDateRange, showBudget, visible};
    return newState;
  }

  componentWillReceiveProps(props) {
    this.setState(this.stateFromProps(props));
  }

  handleClose = () => { this.setState({show: false}) };
  handleShow = () => { this.setState({show: true}) };
  onChange = (value) => {this.setState({show:this.state.show});};
  
  render() {
    const { visible, dates, budgets, showDateRange, showBudget } = this.state;
    const handleStyle = {
	  width: 20, 
	  marginTop: -8,
	  height: 20,
	}

    const minBudget = budgets[0];
    const maxBudget = budgets[1];
    if (! visible) {
      return (<div></div>);
    }
    
    const dateRangeDiv = (
      <Modal.Body>
          開始日期
          <Modal.Header>
          <DateRangePicker
               value={dates}
               showOneCalendar
               hoverRange="month"
               className="data-range"
               size="md"
               placeholder="開始日期"
               align="left"
               onChange={this.onDateRangeChanged}
          />
          </Modal.Header>
        </Modal.Body>

    );

    const budgetDiv = (
      <Modal.Body>
        <Row>
          <Col>預算</Col>
          <Col className="right-col">{numeral(minBudget).format("0,0a")} - {numeral(maxBudget).format("0,0a")}</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>
            <Range
			  defaultValue={[0, 100]}
			  onAfterChange={this.onAmountChanged}
			  handleStyle={[handleStyle, handleStyle]}
			/> 
          </Col>
        </Row>
      </Modal.Body>
    );
   
    return (
      <div ref={this.ref} className="panel">
        {showBudget && budgetDiv}
        {showDateRange && dateRangeDiv}
          <Modal.Header>
			    項目種類
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
      </div>
    );
  }
};

export default SearchBarPanelMobile;
