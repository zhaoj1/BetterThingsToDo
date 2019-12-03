import React from 'react';
import MainContainer from './MainContainer'
import { Route, Switch } from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import ErrorPopup from './ErrorPopup'
import MapContainer from './MapContainer'

export default class Contents extends React.Component{

    constructor(){
        super();
        this.state={
            popup: false,
            errorMessage: '',
            savedVenues: [],
            showMap: false
        }

        this.handleErrors = this.handleErrors.bind(this);
        this.handleErrorBackBtn = this.handleErrorBackBtn.bind(this);
        this.handleSaveVenue = this.handleSaveVenue.bind(this);
        this.toggleMap=this.toggleMap.bind(this);
        this.handleDeleteVenue=this.handleDeleteVenue.bind(this);
        this.handleProfileDelete=this.handleProfileDelete.bind(this);

        this.errorMsgBtn = React.createRef();
        this.map = React.createRef();
    }

    handleErrors = (error) => {
        this.setState({
          popup: true,
          errorMessage: error
        })
        this.props.toggleDisableNav()
      }

      handleErrorBackBtn = () => {
        this.setState({
            popup: false,
            errorMessage: ''
        })
        this.props.toggleDisableNav()
      }

      componentDidMount(){
        if(this.props.currentUser !== null){
            this.fetchSavedVenues()
        }
        this.setState({
            showMap:false
        })
      }

      componentDidUpdate(prevProps, prevState){
        //   console.log(prevProps)
        //   console.log(this.props)
        if(this.props.currentUser !== prevProps.currentUser && this.props.currentUser !== null){
            // this.setState({
            //     savedVenues: []
            // })
            // setTimeout(this.fetchSavedVenues(), 1000)
            this.fetchSavedVenues()
            this.setState({
                savedVenues: this.state.savedVenues.filter(venue => venue.user_id === this.props.currentUser)
            })
        }
        if(this.errorMsgBtn.current !== null){
            this.errorMsgBtn.current.focus();
        }
        if(this.map.current !== null){
            this.map.current.focus();
        }
      }
    
      fetchSavedVenues = () => {
        fetch(`http://localhost:3000/activities`)
        .then(resp => resp.json())
        .then(data => 
            // data.length === 0 ?
            //     []
            //     :
            //     data.length === 1 ?
            //         data[0].user_id === this.props.currentUser.id ? 
            //         this.setState({
            //             savedVenues: data[0]
            //         }) 
            //         :
            //         []
            //     :
            //     this.setState({
            //         savedVenues: data.filter(activity => activity.user_id === this.props.currentUser.id)
            //     })

            // data.length > 0?
            //     data.filter(activity => activity.user_id === this.props.currentUser.id).length > 0?
            //         this.setState({
            //             // savedVenues: data
            //             savedVenues: data.filter(activity => activity.user_id === this.props.currentUser.id)
            //         })
            //         :
            //         null
            //     :
            //     null

            this.setState({
                savedVenues: data
            })
          )
      }
    
    handleSaveVenue(venue){
    //   console.log(venue)
        fetch(`http://localhost:3000/activities`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                venue_name: venue.name,
                venue_api_id: venue.id,
                lat: venue.location.lat,
                lng: venue.location.lng,
                address: venue.location.formattedAddress.join(' ')
            })
        })
        .then(() => this.fetchSavedVenues())
    }

    handleDeleteVenue = (venue) => {
        // console.log(this.state.savedVenues.find(savedVenue => savedVenue.venue_api_id === venue.venue.id && savedVenue.user_id === this.props.currentUser.id).id)
        fetch(`http://localhost:3000/activities/${this.state.savedVenues.find(savedVenue => savedVenue.venue_api_id === venue.venue.id && savedVenue.user_id === this.props.currentUser.id).id}`, {
            method: "DELETE"
        })
        .then(() => this.fetchSavedVenues())  
    }

    handleProfileDelete = (selectedVenue) => {
        fetch(`http://localhost:3000/activities/${selectedVenue.id}`, {
            method: "DELETE"
        })
        .then(() => this.fetchSavedVenues())  
    }

    toggleMap = (venues) => {
        this.setState({
            showMap: !this.state.showMap
        })
        this.props.toggleDisableNav()
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.props.toggleDisableNav()
    }

    render(){
        // console.log(this.state.errorMessage)
        // console.log(this.props.currentUser)
        // console.log(this.state.savedVenues)
        // console.log(this.props)
        return(
            <div >
                <div>
                    <Switch>
                    <Route exact path='/' />
                    <Route exact path='/signup' 
                        render={(routerProps) => 
                        <Signup 
                            {...routerProps} 
                            setUser={this.props.setUser} 
                            handleErrors={this.handleErrors}
                        /> 
                        } 
                    />
                    <Route exact path='/login' 
                        render={(routerProps) => 
                        <Login 
                            {...routerProps} 
                            setUser={this.props.setUser} 
                            handleErrors={this.handleErrors}
                            fetchSavedVenues={this.fetchSavedVenues}
                        /> 
                        } 
                    />
                    <Route exact path='/main' 
                        render={(routerProps) => 
                        <MainContainer 
                            {...routerProps} 
                            currentUser={this.props.currentUser} 
                            handleErrors={this.handleErrors}
                            // savedVenues={this.state.savedVenues.filter(venue => venue.user_id === this.props.currentUser.id)}
                            savedVenues={this.state.savedVenues}
                            handleSaveVenue={this.handleSaveVenue}
                            toggleMap={this.toggleMap}
                            handleDeleteVenue={this.handleDeleteVenue}
                            map={this.map}
                            showMap={this.state.showMap}
                            toggleDisableNav={this.props.toggleDisableNav}
                        /> 
                        } 
                    />
                    <Route exact path='/profile' 
                        render={(routerProps) => 
                        <Profile 
                            {...routerProps} 
                            currentUser={this.props.currentUser} 
                            // savedVenues={this.state.savedVenues.filter(venue => venue.user_id === this.props.currentUser.id)}
                            savedVenues={this.state.savedVenues}
                            fetchSavedVenues={this.fetchSavedVenues}
                            handleProfileDelete={this.handleProfileDelete}
                            toggleMap={this.toggleMap}
                        /> 
                        } 
                    />
                    </Switch>
                </div>
                {this.state.popup ?
                    <ErrorPopup errorMessage={this.state.errorMessage} handleErrorBackBtn={this.handleErrorBackBtn} errorMsgBtn={this.errorMsgBtn} />
                    :
                    null
                }

                {this.state.showMap?
                    <MapContainer savedVenues={this.state.savedVenues.filter(venue => venue.user_id === this.props.currentUser.id)} map={this.map} toggleMap={this.toggleMap} /> 
                    :
                    null
                }
            </div>
            
        )
    }
}