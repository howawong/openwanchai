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
        <img className="img" src={"/assets/icon/" +  (this.props.img ||"arts_home.svg")} /><br/>
        { this.props.title || "嘉年華" }<br/>
        </div>
    </div>  
    );
  }
}

export default ProjectCategoryCardCard;
