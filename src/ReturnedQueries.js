import React, {Component} from 'react';
import QueryLineItem from './QueryLineItem'
import InfoCard from './InfoCard'
import InfoCardPopup from './InfoCardPopup'
import SavedVenuesLineItem from './SavedVenuesLineItem'
import foursquare from './assets/powered-by-foursquare-blue.png'

export default class ReturnedQueries extends Component{
    
    constructor(){
        super();
        this.handleQuerySelect = this.handleQuerySelect.bind(this)
        this.handleBackBtn = this.handleBackBtn.bind(this)

        this.state = {
            selectedLineItem: null,
            selectedLineItemInfo: null,
            savedVenues: null
        }
    }

    componentDidMount(){
        this.setState({
            selectedLineItem: null
        })

        this.fetchSavedVenues()
        
    }

    fetchSavedVenues = () => {
        fetch(`http://localhost:3000/activities`)
        .then(resp => resp.json())
        .then(data => 
            this.setState({
                savedVenues: data
            })
        )
        // .then(console.log)
    }

    handleSaveVenue = (venueId) => {
        fetch(`http://localhost:3000/activities`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                venue_API_id: venueId
            })
          })
            .then(res => res.json())
            .then(
                this.setState({
                    selectedLineItem: null
                })
            )
    }

    fetchVenueInfo = () => { //quoted out to save on API calls
        fetch(`https://api.foursquare.com/v2/venues/${this.state.selectedLineItem.venue.id}?&client_id=` + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET +'&v=20180323')
        .then(resp => resp.json())
        .then(data => this.setState({
            selectedLineItemInfo: data.response.venue
        }))
        .catch(error => {
            throw(error)
          })
    }

    handleQuerySelect = (event) => {
        this.setState({
            selectedLineItem: this.props.recommendedVenues.find(venue => venue.venue.name === event.target.innerText)
        })
        setTimeout(()=> this.fetchVenueInfo(), 200)
    }

    handleBackBtn = () => {
        this.setState({
            selectedLineItem: null,
            selectedLineItemInfo: null
        })
    }

    render() {
        console.log(this.state.savedVenues)
        // console.log(this.props.currentUser)
        return(
            <>
                {/* {this.state.selectedLineItem?
                    <InfoCard selectedLineItem={this.state.selectedLineItem} selectedLineItemInfo={this.state.selectedLineItemInfo} handleBackBtn={this.handleBackBtn} />
                    :
                    <div className='queriesPage'>
                        <div className='recommendedList'>
                            {this.props.recommendedVenues.map(venue => 
                                <QueryLineItem venue={venue} recommendedVenues={this.props.recommendedVenues} selectedLineItem={this.state.selectedLineItem} handleQuerySelect={this.handleQuerySelect} />
                            )}
                        </div>
                        <button className='buttons' onClick={this.props.handleBackBtn}>Back</button><br></br>
                        <img src={foursquare}  width='200px' />
                    </div>
                } */}

                <div className='queriesPage'>
                    {this.props.currentUser ? 
                    <div className='savedVenues'>
                        {this.state.savedVenues ? 
                            this.state.savedVenues.map(venue =>
                                <SavedVenuesLineItem venue={venue} recommendedVenues={this.props.recommendedVenues} selectedLineItem={this.state.selectedLineItem} handleQuerySelect={this.handleQuerySelect} />    
                            )
                            : 
                            null}
                    </div>
                    :
                    null
                    }   

                    <div className='recommendedList'>
                        {this.props.recommendedVenues.map(venue => 
                            <QueryLineItem venue={venue} recommendedVenues={this.props.recommendedVenues} selectedLineItem={this.state.selectedLineItem} handleQuerySelect={this.handleQuerySelect} />
                        )}
                    </div>
                    <div className='queryPageBtn'>
                        <button className='buttons' onClick={this.props.handleBackBtn}>Back</button><br></br>
                        <img src={foursquare} width='200px' />
                    </div>
                </div>

                {this.state.selectedLineItem?
                    <InfoCardPopup 
                        selectedLineItem={this.state.selectedLineItem} 
                        selectedLineItemInfo={this.state.selectedLineItemInfo} 
                        handleBackBtn={this.handleBackBtn} 
                        handleSaveVenue={this.handleSaveVenue} 
                        currentUser={this.props.currentUser}
                    />
                    :
                    null
                }
                
            </>
        )
    }
}