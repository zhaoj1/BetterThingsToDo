import React, {Component} from 'react';
import ProfileVenueInfoCard from './ProfileVenueInfoCard'
import ProfileVenues from './ProfileVenues'

export default class Profile extends Component{

    constructor(){
        super();
        this.state = {
            selectedLineItem: null,
            selectedLineItemInfo: null
        }

        this.handleDeleteBtn=this.handleDeleteBtn.bind(this)
        this.handleBackBtn=this.handleBackBtn.bind(this)
    }

    fetchVenueInfo = () => { // commented out to save on API calls
        fetch(`https://api.foursquare.com/v2/venues/${this.state.selectedLineItem.venue_api_id}?&client_id=` + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET +'&v=20180323')
        .then(resp => resp.json())
        .then(data => this.setState({
            selectedLineItemInfo: data.response.venue
        }))
        .catch(error => {
            throw(error)
          })
    }

    handleQuerySelect = (event, list) => { // commented out to save on API calls
        this.setState({
            selectedLineItem: this.props.savedVenues.find(venue => venue.venue_name === event.target.innerText)
        })
        setTimeout(() => this.fetchVenueInfo(), 100)
    }

    handleBackBtn = () => {
        this.setState({
            selectedLineItem: null,
            selectedLineItemInfo: null
        })
    }

    handleDeleteBtn= () => {
        // console.log(this.state.selectedLineItem)
        this.props.handleProfileDelete(this.state.selectedLineItem)
        this.handleBackBtn()
    }

    render() {
        // console.log(this.props)
        // console.log(this.state.selectedLineItem)
        return(
            this.props.currentUser?
            <>
                <div className='wrapper'>
                    <div className='profilePage'>
                        <div className='profile'>
                            <div className='userInfo'>
                                <h2>{this.props.currentUser.username}</h2>
                                <img src='http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png' height='120' width='120' style={{'margin-bottom':10}}/>
                                <br></br>
                                <button className='buttons' onClick={this.props.toggleMap} >Map View</button>
                            </div>
                        </div>
                        <div className='profileVenues' >
                            <p className='profileVenuesHeader'>Saved Venues</p>
                            {this.props.savedVenues.length === 0 ?
                                null
                                :
                                this.props.savedVenues.map(venue => 
                                <ProfileVenues 
                                    venue={venue.venue_name} 
                                    selectedLineItem={this.state.selectedLineItem}
                                    handleQuerySelect={this.handleQuerySelect}
                                />
                                )
                            }
                        </div>
                    </div>
                </div>    
                {this.state.selectedLineItemInfo?
                    <ProfileVenueInfoCard 
                        selectedLineItem={this.state.selectedLineItem} 
                        selectedLineItemInfo={this.state.selectedLineItemInfo} 
                        handleBackBtn={this.handleBackBtn} 
                        currentUser={this.props.currentUser}
                        fetchVenueInfo={this.fetchVenueInfo}
                        handleDeleteBtn={this.handleDeleteBtn}
                    />
                    :
                    null
                }

            </>
            :
            <>
                {this.props.history.push('/main')}
            </>
        )
    }
}