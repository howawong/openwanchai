import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class ProjectCategoryCardCard extends Component {
  render() {
    return (
      <Card>
        <Card.Img className="img" variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Wan_Chai_District_Council_Logo.svg/200px-Wan_Chai_District_Council_Logo.svg.png" />       嘉年華
		＜大坑節、慶回歸＞
    </Card>  
    );
  }
}

export default ProjectCategoryCardCard;
