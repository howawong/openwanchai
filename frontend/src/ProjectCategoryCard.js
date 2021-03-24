import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class ProjectCategoryCardCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.large) {
      return (
      <div className="project-type-card long-card">
        <div className="label">
        <img className="img" src={"/assets/icon/" +  (this.props.img ||"arts_home.svg")} /><br/>
        { this.props.title || "嘉年華" }<br/>
        </div>
      </div>);
    }
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
