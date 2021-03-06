import React from 'react';
import MainContainer from './MainContainer'
import { Route, Switch, Redirect } from 'react-router-dom';
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
        if(this.props.currentUser !== prevProps.currentUser && this.props.currentUser !== null){
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
        fetch(`https://better-things-to-do-backend.herokuapp.com/activities`)
        .then(resp => resp.json())
        .then(data => this.setState({
                savedVenues: data
            })
          )
      }
    
    handleSaveVenue(venue){
        fetch(`https://better-things-to-do-backend.herokuapp.com/activities`, {
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

    handleProfileDelete = (selectedVenue) => {
        fetch(`https://better-things-to-do-backend.herokuapp.com/activities/${selectedVenue.id}`, {
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
        return(
            <div >
                <div>
                    <Switch>
                    <Route exact path='/' 
                        render={(routerProps) => 
                            <MainContainer 
                                {...routerProps} 
                                currentUser={this.props.currentUser} 
                                handleErrors={this.handleErrors}
                                savedVenues={this.state.savedVenues}
                                handleSaveVenue={this.handleSaveVenue}
                                toggleMap={this.toggleMap}
                                handleProfileDelete={this.handleProfileDelete}
                                map={this.map}
                                showMap={this.state.showMap}
                                toggleDisableNav={this.props.toggleDisableNav}
                            />
                        }
                    />
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
                    <Route exact path='/profile' 
                        render={(routerProps) => 
                        <Profile 
                            {...routerProps} 
                            currentUser={this.props.currentUser} 
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