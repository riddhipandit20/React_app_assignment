import React, { Component } from 'react';
import data from './history.json';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class App extends Component {
  

  constructor(props) {
    super(props);

    this.state = {
      SortedData: [],
      sliderValues:[0,0],
      min :0,
      max :0
    };

  }


  componentWillMount() {

    let SortedData = data.sort((a, b) => a.year - b.year);
    let min = SortedData[0].year;
    let max = SortedData[SortedData.length - 1].year;
    let sliderValues = [min,max]
    this.setState({ sliderValues:sliderValues, min:min, max:max });

    this.setState({ SortedData: SortedData });
  }
 
  handleChange = (e) => {
    console.log(e);
    this.setState({ sliderValues: [e[0],e[1]]});
    
    let filterd = data.filter((d)=> {
      return d.year>=e[0] && d.year<=e[1]
    });
    this.setState({SortedData:filterd});
  };

  render() {
    var amt = 0;
    const {sliderValues,min,max} = this.state;
    let list = this.state.SortedData.map((d) => {
      amt += parseFloat(d.totalReturn);
      return <tr><td>{d.year}</td><td>{d.totalReturn}</td><td>{amt}</td></tr>
    })

    return (
      <div>
        <Range defaultValue={[min,max]} min={this.state.min} max={this.state.max}
          style={{ width: '400px', margin: '50px' }} onChange={this.handleChange}></Range>
          {sliderValues[0]}/{sliderValues[1]}
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Total Retrun</th>
              <th>Cumulative</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
          <tfoot>

            <tr>
              <th>Year</th>
              <th>Total Retrun</th>
              <th>Cumulative</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;