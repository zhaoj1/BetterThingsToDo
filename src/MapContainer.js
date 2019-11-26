import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapsrc = "https://www.google.com/maps/embed/v1/view?&zoom=13&center=40.771699, -73.832559&zoom=8&key=" + process.env.REACT_APP_GOOGLE
const mapStyles = {
    width: '100%',
    height: '100%',
};

let bounds = []

// export default class MapContainer extends React.Component{
class MapContainer extends React.Component{
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    setBounds = () => {
        this.props.savedVenues.map(venue => 
            bounds.push({
                lat: venue.latitude, lng: venue.longitude
            })
        )
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render(){
        this.setBounds();
        return(
            <div className='wrapper' style={{'height':'100%'}}>
                <div className='mapContainer'>
                    {/* <iframe 
                        className='map'
                        width="100%" 
                        height="100%" 
                        frameborder="0" 
                        src={mapsrc}
                        allowfullscreen>
                    </iframe> */}

                    <Map
                        google={this.props.google}
                        zoom={15}
                        style={mapStyles}
                        // initialCenter={{lat: 40.7052529, lng: -74.0146175}}
                        bounds={bounds}
                    >
                    {/* <Marker
                        onClick={this.onMarkerClick}
                        name={'Flatiron School'}
                        position={{lat: 40.7052529, lng: -74.0146175}}
                    /> */}
                    {this.props.savedVenues.length !== 0?
                        this.props.savedVenues.map(venue =>
                            <Marker
                                onClick={this.onMarkerClick}
                                name={venue.venue_name}
                                position={{lat: venue.latitude, lng: venue.longitude}}
                            />
                        )
                        :
                        null
                    }

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                    </Map>
                </div>
            </div>
        )
    }
}

// export default GoogleApiWrapper({
//     // apiKey: process.env.REACT_APP_GOOGLE
//   })(MapContainer);

export default GoogleApiWrapper(
    (props) => ({
        // apiKey: process.env.REACT_APP_GOOGLE
    })
)(MapContainer)