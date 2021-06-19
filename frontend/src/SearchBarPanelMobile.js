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
    console.log(props);
    this.toggle = this.props.toggle;
    this.handleShowBin = this.props.handleShowBin;
    this.state = this.stateFromProps(props);
    this.ref = React.createRef();
    this.onAmountChanged = this.props.onAmountChanged;
    this.onDateRangeChanged = this.props.onDateRangeChanged;
  }

  stateFromProps = (props) => {
    const showDateRange = props.showDateRange ?? true;
    const showBudget = props.showBudget ?? true;
    const visible = props.visible ?? true;
    const checked = props.checked;
    const showBin = props.showBin ?? false;
    const newState = {...this.state, dates: props.dates, budgets: props.budgets, showDateRange, showBudget, visible, checked, showBin};
    return newState;
  }

  componentWillReceiveProps(props) {
    this.setState(this.stateFromProps(props));
  }


  handleClose = () => { this.setState({show: false}) };
  handleShow = () => { this.setState({show: true}) };
  onChange = (value) => {this.setState({show:this.state.show});};
  
  render() {
    const { visible, dates, budgets, showDateRange, showBudget, checked, showBin } = this.state;
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
          <Col className="right-col">
	    <h4>預算&nbsp;{numeral(minBudget).format("0,0A")} - {numeral(maxBudget).format("0,0A")}</h4></Col>
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
		      <Form.Check type="checkbox" label="小型工程" checked={checked[0]} onChange={e => this.toggle(e)} name="0"/>
		      <Form.Check type="checkbox" label="聯誼" checked={checked[1]} onChange={e => this.toggle(e)} name="1"/>
		      <Form.Check type="checkbox" label="嘉年華" checked={checked[2]}  onChange={e => this.toggle(e)} name="2"/>
		      <Form.Check type="checkbox" label="教學及訓練" checked={checked[3]} onChange={e => this.toggle(e)} name="3"/>
		      <Form.Check type="checkbox" label="比賽" checked={checked[4]} onChange={e => this.toggle(e)} name="4"/>
		      <Form.Check type="checkbox" label="直接服務" checked={checked[5]} onChange={e => this.toggle(e)} name="5"/>
		      <Form.Check type="checkbox" label="研究" checked={checked[6]} onChange={e => this.toggle(e)} name="6"/>
		      <Form.Check type="checkbox" label="文化活動" checked={checked[7]} onChange={e => this.toggle(e)} name="7"/>
	              <hr/>
		      <Form.Check type="checkbox" label="垃圾筒" checked={showBin} onChange={e => this.handleShowBin(e)} name="7"/>
			  <br/>
		    </Modal.Body>
      </div>
    );
  }
};

export default SearchBarPanelMobile;
