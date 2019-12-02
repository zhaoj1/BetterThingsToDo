import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import marker from './assets/markerV2.png'

const mapStyles = {
    width: '100%',
    height: '100%',
};

let bounds = []

// export default class MapContainer extends React.Component{
class QueriesMap extends React.Component{
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: null
    }

    setBounds = () => {
        this.props.recommendedVenues.map(venue => 
            bounds.push({
                lat: venue.venue.location.lat, lng: venue.venue.location.lng
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
                        initialCenter={{lat: this.props.recommendedVenues[0].venue.location.lat, lng: this.props.recommendedVenues[0].venue.location.lng}}
                        bounds={bounds}
                        ref={this.props.map}
                    >
                    {/* <Marker
                        onClick={this.onMarkerClick}
                        name={'Flatiron School'}
                        position={{lat: 40.7052529, lng: -74.0146175}}
                    /> */}
                    {this.props.recommendedVenues.length !== 0?
                        this.props.recommendedVenues.map(venue =>
                            <Marker
                                onClick={(props,marker,e) => this.onMarkerClick(venue, marker, e)}
                                name={venue.venue.name}
                                icon={marker}
                                position={{lat: venue.venue.location.lat, lng: venue.venue.location.lng}}
                            />
                        )
                        :
                        null
                    }
                    {this.state.selectedPlace ? 
                        <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                        >
                            <div>
                                <h4>{this.state.selectedPlace.venue.name}</h4>
                                <p>{this.state.selectedPlace.venue.location.formattedAddress.join(' ')}</p>
                            </div>
                        </InfoWindow>
                        :
                        null
                    }
                    
                    <button className='mapBtn' onClick={this.props.toggleRecommendedMap} >Close Map</button>
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
)(QueriesMap)