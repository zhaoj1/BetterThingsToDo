import React, {Component} from 'react';
import './App.css';
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

var NodeGeocoder = require('node-geocoder');
 
var geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: process.env.REACT_APP_OCD_API_KEY
});

export default class MainContainer extends Component{

    constructor(){
        super();
        this.handleAddressInputChange = this.handleAddressInputChange.bind(this)
        this.handleAddressSubmit = this.handleAddressSubmit.bind(this)
        this.handleBackBtn = this.handleBackBtn.bind(this)
    
        this.state = {
          firstAddress: null,
          firstSearchResults: [],
          secondAddress: null,
          secondSearchResults: [],
          page: 'search',
          // firstAddress: {
          //   longitude: 40.7243,
          //   latitude: -74.0018,
          // },
          // secondAddress: {
          //   longitude: 40.7243,
          //   latitude: -74.0018,
          // },
          // query: 'coffee',
          // midpoint: null
        }
      }
    
      handleAddressInputChange(event){
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleBackBtn(event){
        this.setState({
          page: 'search'
        })
      }
    
      handleAddressSubmit(event){
        event.preventDefault();
    
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.firstAddress}&key=` + process.env.REACT_APP_OCD_API_KEY)
        .then(resp => resp.json())
        .then(data => 
          this.setState({
            firstSearchResults: data.results // annotations/geometry/ {lat/lng}
          })  
        )

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.secondAddress}&key=` + process.env.REACT_APP_OCD_API_KEY)
        .then(resp => resp.json())
        .then(data => 
          this.setState({
            secondSearchResults: data.results // annotations/geometry/ {lat/lng}
          })  
        )

        this.setState({
          page: 'results'
        })
    
      }
    
      // componentDidMount(){
      //   fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET+ `&v=20180323&limit=1&ll=${this.state.longitude},${this.state.latitude}&query=${this.state.query}`)
      //   .then(resp => resp.json())
      //   .then(console.log)
      // }
    
    render() {
      // console.log(this.state)
        return(
          <>
            {this.state.page === 'search' ? 
              < SearchBox 
                handleAddressInputChange={this.handleAddressInputChange} 
                handleAddressSubmit={this.handleAddressSubmit}
              />
              :
              this.state.page === 'results' ?
                < SearchResults 
                  firstSearchResults={this.state.firstSearchResults}
                  secondSearchResults={this.state.secondSearchResults}
                  handleBackBtn={this.handleBackBtn}
                />
              :
              null
            }
            
                
          </>

        )
    }
}