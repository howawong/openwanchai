import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class CategoryCard extends Component {
  render() {
    const {projectId, budget, name } = this.props;
    return (
      <Card className="card">
      <Row>
        <Col>
        <Card.Img className="img" variant="left" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Wan_Chai_District_Council_Logo.svg/200px-Wan_Chai_District_Council_Logo.svg.png" />  
        </Col>
        <Col md>
        <Card.Body>
          <Card.Title>灣仔區街坊福利會</Card.Title>
          <Card.Text>
          <span className="title">{name || "粵曲歡唱娛坊眾"}</span>
          對象:區內所有居民
          </Card.Text>
          <span className="price">{budget || "$100,000"}</span>
          <span class="badge badge-secondary">社區服務</span>&nbsp;&nbsp;
          <span class="badge badge-secondary">小型工程</span>
          <span class="date">22/2/2020</span>
        </Card.Body>
        </Col>
      </Row>
    </Card>  
    );
  }
}

export default CategoryCard;
