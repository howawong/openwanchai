import React, {Component} from 'react';
import { Button, IconButton, ButtonGroup, ButtonToolbar } from 'rsuite';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class SwitchModeButtonGroup extends Component {
  render() {
    return (
      <div>
        <Row className="header">
          <Col>
			<img src="/assets/logo.png" /> 
		  </Col>
          <Col><span className="title">搜尋灣仔區撥款項目</span></Col>
          <Col>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">地圖</Button>
              <Button variant="secondary">列表</Button>
              <Button variant="secondary">數據圖</Button>
            </ButtonGroup> 
          </Col>
        </Row>
      </div>
    );
  }


}

export default SwitchModeButtonGroup;
