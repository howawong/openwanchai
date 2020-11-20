import React from 'react';
import './App.css';
import SampleMap from './SampleMap';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import { Slider, RangeSlider } from 'rsuite';



class Search extends React.Component {
  constructor() {
    super();
    this.state = {result: [], yearRange: [2008, 2016]}
  }

  fetchData() {
    const {yearRange} = this.state;
    fetch("http://192.168.1.54:8000/sample/dmw?min_year=" + yearRange[0] + "&max_year=" + yearRange[1]).then(res => res.json()).then(
	  result => {
	    console.log(result);
		this.setState({...this.state, result: result});
	  }
	);
  }

  componentDidMount() {
    console.log("loading")
    this.fetchData();	
  }

  setValue(value) {
    console.log(value);
  }

  setYearRange(yearRange) {
    this.setState({...this.state, yearRange: yearRange});
	this.fetchData();
  }

  render() {
    const {yearRange} = this.state;
    return (
      <div className="App">
        <div class="flexbox">
          <div class="col2">
		    年份:
			<br/>
			<br/>
			<RangeSlider progress max={2020} min={2008} defaultValue={yearRange} onChange={value =>  {this.setYearRange(value);} }/>
			<br/>
            {
            this.state.result.slice(0, 8).map(gj =>(<div><Card>
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

export default Search;
