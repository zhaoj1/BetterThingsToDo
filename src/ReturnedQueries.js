import React, {Component} from 'react';
import QueryLineItem from './QueryLineItem'
import InfoCardPopup from './InfoCardPopup'
import SavedVenuesLineItem from './SavedVenuesLineItem'
import foursquare from './assets/powered-by-foursquare-white.png'
import QueriesMap from './QueriesMap'

export default class ReturnedQueries extends Component{
    
    constructor(){
        super();
        this.handleQuerySelect = this.handleQuerySelect.bind(this);
        this.handleBackBtn = this.handleBackBtn.bind(this);
        this.handleSaveBtn = this.handleSaveBtn.bind(this);
        this.toggleRecommendedMap=this.toggleRecommendedMap.bind(this);

        this.infoCardBackBtn = React.createRef();

        this.state = {
            selectedLineItem: null,
            selectedLineItemInfo: null,
            list: null,
            showRecommendedMap:false
            // savedVenues: null
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         selectedLineItem: null
    //     })
    //     this.fetchSavedVenues()
    // }

    // fetchSavedVenues = () => {
    //     fetch(`http://localhost:3000/activities`)
    //     .then(resp => resp.json())
    //     .then(data => 
    //         this.setState({
    //             savedVenues: data
    //         })
    //     )
    // }

    // handleSaveVenue = (venue) => {
    //     // console.log(venue)
    //     fetch(`http://localhost:3000/activities`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           'Accept': "application/json"
    //         },
    //         body: JSON.stringify({
    //             user_id: this.props.currentUser.id,
    //             // venue_API_id: venue.id,
    //             venue_name: venue.name
    //         })
    //     })
    //     .then(
    //         this.setState({
    //             selectedLineItem: null
    //         })
    //     )
    //     .then(() => this.fetchSavedVenues())  
    // }

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

    componentDidMount(){
        this.setState({
            showRecommendedMap:false
        })
    }

    componentDidUpdate(){
        if(this.infoCardBackBtn.current !== null){
          this.infoCardBackBtn.current.focus();   
        }
        if(this.props.map.current !== null){
            this.props.map.current.focus();
        }
      }

    handleQuerySelect = (event, list) => {
        this.setState({
            selectedLineItem: this.props.recommendedVenues.find(venue => venue.venue.name === event.target.innerText),
            list: list
        })
        setTimeout(()=> this.fetchVenueInfo(), 200)
    }

    handleBackBtn = () => {
        this.setState({
            selectedLineItem: null,
            selectedLineItemInfo: null
        })
    }

    handleSaveBtn = () => {
        this.props.handleSaveVenue(this.state.selectedLineItem.venue)
        this.handleBackBtn()
        // this.setState({
        //     selectedLineItem: null,
        //     selectedLineItemInfo: null
        // })
    }

    handleDeleteBtn = () => {
        this.props.handleDeleteVenue(this.state.selectedLineItem)
        this.handleBackBtn()
    }

    toggleRecommendedMap=()=>{
        this.setState({
            showRecommendedMap: !this.state.showRecommendedMap
        })
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.props.toggleDisableNav()
    }

    render() {
        // console.log(this.state.savedVenues)
        // console.log(this.props.currentUser)
        // console.log(this.state)
        // console.log(this.props.recommendedVenues)
        // console.log(this.props.showMap)
        // console.log(this.state.showRecommendedMap)
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

                    <div className='queriesPage' style={this.state.showRecommendedMap || this.props.showMap ? {'display':'none'} : {'display':'block'}}>
                        <div className='savedRecommendedLists'>
                            {this.props.currentUser ? 
                                this.props.savedVenues ? 
                                    <div className='savedVenues'>
                                        <h1 className='venueListsHeaders'>Saved Venues</h1>
                                        {this.props.savedVenues.filter(venue => venue.user_id === this.props.currentUser.id).length > 0 ?
                                            this.props.savedVenues.filter(venue => venue.user_id === this.props.currentUser.id).map(venue =>
                                                <SavedVenuesLineItem 
                                                    venue={venue.venue_name} 
                                                    selectedLineItem={this.state.selectedLineItem} 
                                                    handleQuerySelect={this.handleQuerySelect} 
                                                />    
                                            )
                                            :
                                            null
                                        }

                                        {/* {this.props.savedVenues.map(venue =>
                                            <SavedVenuesLineItem 
                                                venue={venue.venue_name} 
                                                selectedLineItem={this.state.selectedLineItem} 
                                                handleQuerySelect={this.handleQuerySelect} 
                                            />    
                                        )} */}

                                        {this.props.savedVenues.filter(venue => venue.user_id === this.props.currentUser.id).length === 0 ?
                                            null
                                            :
                                            <button className='buttons' onClick={this.props.toggleMap} >Map View</button>
                                        }
                                    </div>
                                : 
                                null
                            :
                            null
                            }   

                            <div className='recommendedList'>
                                <h1 className='venueListsHeaders' >Venues</h1>
                                {this.props.recommendedVenues.map(venue => 
                                    <QueryLineItem 
                                        venue={venue} 
                                        recommendedVenues={this.props.recommendedVenues} 
                                        selectedLineItem={this.state.selectedLineItem} 
                                        handleQuerySelect={this.handleQuerySelect} 
                                    />
                                )}
                                <button className='buttons' onClick={this.toggleRecommendedMap} >Map View</button>
                            </div>
                        </div>
                        <div className='queryPageBtn'>
                            <button className='buttons' onClick={this.props.handleBackBtn}>Back</button><br></br>
                            <img src={foursquare} width='200px' />
                        </div>
                    </div>

                {this.state.selectedLineItemInfo?
                    <InfoCardPopup 
                        selectedLineItem={this.state.selectedLineItem} 
                        selectedLineItemInfo={this.state.selectedLineItemInfo} 
                        handleBackBtn={this.handleBackBtn} 
                        handleSaveVenue={this.handleSaveVenue} 
                        currentUser={this.props.currentUser}
                        list={this.state.list}
                        handleSaveBtn={this.handleSaveBtn}
                        infoCardBackBtn={this.infoCardBackBtn}
                        handleDeleteBtn={this.handleDeleteBtn}
                    />
                    :
                    null
                }
                {this.state.showRecommendedMap ?
                    <QueriesMap recommendedVenues={this.props.recommendedVenues} toggleRecommendedMap={this.toggleRecommendedMap} map={this.props.map} />
                    :
                    null
                }
                
            </>
        )
    }
}