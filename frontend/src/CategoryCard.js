import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class CategoryCard extends Component {
  render() {
    const {projectId, budget, name } = this.props;
    return (
      <div className="card">
      <Row>
        <Col className="left">
          <img src="/assets/icon/gift_list.svg"/>
        </Col>
        <Col xs={8}>
          灣仔區街坊福利會<br/>
          <span className="title">{name || "粵曲歡唱娛坊眾"}</span><br/>
          對象:區內所有居民<br/>
          <br/>
          <div>
          <span className="price">{budget || "$100,000"}</span>
          <span class="badge badge-secondary">社區服務</span>&nbsp;&nbsp;
          <span class="badge badge-secondary">小型工程</span>
          <span class="date">22/2/2020</span>
          </div>
        </Col>
      </Row>
    </div>  
    );
  }
}

export default CategoryCard;
