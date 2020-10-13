import React from 'react';
import './App.css';
import SampleMap from './SampleMap';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';



class App extends React.Component {
  constructor() {
    super();
    this.state = {result: []};
  }

  componentDidMount() {
    console.log("loading")
    fetch("http://192.168.1.54:8000/sample/dmw").then(res => res.json()).then(
	  result => {
	    console.log(result);
		this.setState({...this.state, result: result});
	  }
	);
  }

  setValue(value) {
    console.log(value);
  }

  render() {
    return (
      <div className="App">
        <div class="flexbox">
          <div class="col2">
		    <RangeSlider min={5000} max={100000} onAfterChange={changeEvent => this.setValue(changeEvent.target.value)} />
            {
            this.state.result.slice(0, 3).map(gj =>(<div><Card>
							<Card.Body>
								<Card.Title><b>{gj.properties["address"]}</b></Card.Title>
							  <hr/>
								<Card.Text>
                  名稱: {gj.properties["project_name"]} <br/>
                  預算: {gj.properties["budget"]}
								</Card.Text>
							</Card.Body>
						</Card><br/></div>) 
            )}
          </div>
          <div class="leaflet-container col">
            <SampleMap locations={this.state.result}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
