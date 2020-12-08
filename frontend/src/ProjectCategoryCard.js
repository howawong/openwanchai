import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class ProjectCategoryCardCard extends Component {
  render() {
    return (
      <div className="project-type-card">
        <div className="label">
        <img className="img" src="/assets/icon/arts_home.svg" /><br/>
        嘉年華<br/>
		＜大坑節、慶回歸＞</div>
    </div>  
    );
  }
}

export default ProjectCategoryCardCard;
