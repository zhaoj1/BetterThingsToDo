import React, {Component} from 'react';
import QueryLineItem from './QueryLineItem'
import InfoCardPopup from './InfoCardPopup'
import ProfileVenueInfoCard from './ProfileVenueInfoCard'
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
            showRecommendedMap:false,
            firstLineItem: 0
            // savedVenues: null
        }
    }

    fetchVenueInfo = async (id) => { //quoted out to save on API calls
        let venueInfo = await fetch(`https://api.foursquare.com/v2/venues/${id}?&client_id=` + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET +'&v=20180323')
        .then(resp => resp.json())
        
        this.setState({selectedLineItemInfo: venueInfo.response.venue})
    }

    componentDidMount(){
        this.setState({
            showRecommendedMap:false,
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
        event.target.parentNode.getAttribute('class') == 'recommendedList' ? 
            this.setState({
                selectedLineItem: this.props.recommendedVenues.find(venue => venue.venue.id === event.target.dataset.apiId),
                list: list
            }, () => {this.fetchVenueInfo(this.state.selectedLineItem.venue.id)})
            :
            this.setState({
                selectedLineItem: this.props.savedVenues.find(venue => venue.venue_name === event.target.innerText),
                list: list
            }, () => {this.fetchVenueInfo(this.state.selectedLineItem.venue_api_id)})
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

    nextButton = () => {
        this.setState(prevState => ({
            firstLineItem: prevState.firstLineItem + 5,
        }))
    }

    prevButton = () => {
        this.setState  (prevState => ({
            firstLineItem: prevState.firstLineItem - 5
        }))
    }

    render() {
        return(
            <>
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
                            {this.props.recommendedVenues.slice(this.state.firstLineItem, this.state.firstLineItem + 5).map(venue => 
                                <QueryLineItem 
                                    venue={venue} 
                                    recommendedVenues={this.props.recommendedVenues} 
                                    selectedLineItem={this.state.selectedLineItem} 
                                    handleQuerySelect={this.handleQuerySelect} 
                                />
                            )}
                            
                            {this.state.firstLineItem === 0?
                                <button className='disabledButtons' disabled >Prev</button>
                                : 
                                <button className='buttons' onClick={this.prevButton} >Prev</button>
                            }

                            {this.state.firstLineItem === 15?
                                <button className='disabledButtons' disabled >Next</button>
                                :
                                <button className='buttons' onClick={this.nextButton} >Next</button>
                            }
                            
                            <button className='buttons' onClick={this.toggleRecommendedMap}>Map View</button>
                        </div>
                    </div>
                    <div className='queryPageBtn'>
                        <button className='buttons' onClick={this.props.handleRecommendationsBack}>Back</button><br></br>
                        <img src={foursquare} width='200px' />
                    </div>
                </div>

                {this.state.selectedLineItemInfo?
                    this.state.list == 'recommended' ?
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
                        <ProfileVenueInfoCard
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