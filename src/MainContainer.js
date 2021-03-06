import React, {Component} from 'react';
import './App.css';
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'
import ReturnedQueries from './ReturnedQueries';

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
        this.setRecommendations = this.setRecommendations.bind(this)
        this.handleRecommendationsBack = this.handleRecommendationsBack.bind(this)
    
        this.state = {
          firstAddress: null,
          firstSearchResults: [],
          secondAddress: null,
          secondSearchResults: [],
          page: 'search',
          recommendedVenues: [],
          loading: true,
        }
      }
    
      handleAddressInputChange(event){
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleBackBtn(event){
        this.setState({
          firstAddress: null,
          firstSearchResults: [],
          secondAddress: null,
          secondSearchResults: [],
          page: 'search',
          recommendedVenues: [],
        })
      }

      handleRecommendationsBack = () => {
        this.setState({
          page: 'results',
          recommendedVenues: []
        })
      }
    
      handleAddressSubmit(event){
        event.preventDefault();
    
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.firstAddress}&key=` + process.env.REACT_APP_OCD_API_KEY + '&limit=3')
        .then(resp => resp.json())
        .then(data => 
          this.setState({
            firstSearchResults: data.results, // .annotations.geometry. {lat/lng}
            loading: false
          })
        )
        .catch(error => {
          {throw(error)}
        })

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.secondAddress}&key=` + process.env.REACT_APP_OCD_API_KEY + '&limit=3')
        .then(resp => resp.json())
        .then(data => 
          this.setState({
            secondSearchResults: data.results, // annotations.geometry. {lat/lng}
            loading: false
          })  
        )
        .catch(error => {
          throw(error)
        })

        this.setState({
          page: 'results'
        })
    
      }

      setRecommendations = (queryResults) => {
        this.setState({
          recommendedVenues: queryResults,
          page: 'suggestions'
        })
      }
    
    render() {
        return(
          <div className='MainContainer'>
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
                  setRecommendations={this.setRecommendations}
                  loading={this.state.loading}
                  handleErrors={this.props.handleErrors}
                />
              :
              this.state.page === 'suggestions' ?
                <ReturnedQueries 
                  recommendedVenues={this.state.recommendedVenues} 
                  handleBackBtn={this.handleBackBtn}
                  currentUser={this.props.currentUser}
                  handleErrors={this.props.handleErrors}
                  savedVenues={this.props.savedVenues}
                  handleSaveVenue={this.props.handleSaveVenue}
                  handleProfileDelete={this.props.handleProfileDelete}
                  toggleMap={this.props.toggleMap}
                  map={this.props.map}
                  showMap={this.props.showMap}
                  toggleDisableNav={this.props.toggleDisableNav}
                  handleRecommendationsBack={this.handleRecommendationsBack}
                />
              :
              null
            }
            
                
          </div>

        )
    }
}