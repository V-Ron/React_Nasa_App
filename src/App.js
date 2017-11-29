import React, { Component } from 'react';
import './App.css';
import {
  PageHeader,
  Table
} from 'react-bootstrap'
import neoData from './sample-neo'

class App extends Component {
  constructor(props) {
    super(props)
      let today = new Date()
      this.state = {
        apiKey: "62PQ3uGPzw3behKOVcpFqmr6z6CxuF69Z5PBCP4q",
        startDate: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
        apiUrl: "https://api.nasa.gov/neo/rest/v1/feed",
        asteroids: []
      }
    }
    componentWillMount(){
      fetch(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse)=>{
        return rawResponse.json()
      }).then((parsedResponse)=> {
        let neoData = parsedResponse.near_earth_objects

      let newAsteroids = []

    Object.keys(neoData).forEach((date)=>{

      neoData[date].forEach((asteroid) =>{

        newAsteroids.push({
          id: asteroid.neo_reference_id,
          name: asteroid.name,
          date: asteroid.close_approach_data[0].close_approach_date,

          diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
          diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
          closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
          velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
          distance: asteroid.close_approach_data[0].miss_distance.miles
        })
      })
    })

    this.setState({asteroids: newAsteroids})
  })
}
  render() {
    return (
      <div className="App">
        <PageHeader>
          <div class="background">
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <img class="asteroid" src="asteroid-icon.ico"/>
            </div>
          </div>
        </nav>
          <h1>Asteroid Watch</h1>
          <h3>Keep track of all the asteroids that are currently heading towards Earth. <br /> Live data from <a  href="http://www.nasa.gov" target="_blank">NASA</a> </h3>
          <br/>
          </div>
        </PageHeader>
        <div class="nasaTable">
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Estimated Diameter (feet)</th>
                <th>Date of Closest Approach</th>
                <th>Distance (miles)</th>
                <th>Velocity (miles/hour)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.asteroids.map((asteroid) => {
                return(
                  <tr key={asteroid.id}>
                    <td>{asteroid.name}</td>
                    <td>{asteroid.diameterMin} - {asteroid.diameterMax}</td>
                    <td>{asteroid.date}</td>
                    <td>{asteroid.distance}</td>
                    <td>{asteroid.velocity}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
export default App
