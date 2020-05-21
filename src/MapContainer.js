import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import marker from './assets/markerV3.png'

const mapStyles = {
    width: '100%',
    height: '100%'
};

let bounds = []

class MapContainer extends React.Component{
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    setBounds = () => {
        this.props.savedVenues.map(venue => 
            bounds.push({
                lat: venue.lat, lng: venue.lng
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
                    <Map
                        google={this.props.google}
                        zoom={15}
                        zoomControl={false}
                        mapTypeControl={false}
                        styles={[
                            {
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#1d2c4d"
                                }
                              ]
                            },
                            {
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#8ec3b9"
                                }
                              ]
                            },
                            {
                              "elementType": "labels.text.stroke",
                              "stylers": [
                                {
                                  "color": "#1a3646"
                                }
                              ]
                            },
                            {
                              "featureType": "administrative",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "administrative.country",
                              "elementType": "geometry.stroke",
                              "stylers": [
                                {
                                  "color": "#4b6878"
                                }
                              ]
                            },
                            {
                              "featureType": "administrative.land_parcel",
                              "elementType": "labels",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "administrative.land_parcel",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#64779e"
                                }
                              ]
                            },
                            {
                              "featureType": "administrative.province",
                              "elementType": "geometry.stroke",
                              "stylers": [
                                {
                                  "color": "#4b6878"
                                }
                              ]
                            },
                            {
                              "featureType": "landscape.man_made",
                              "elementType": "geometry.stroke",
                              "stylers": [
                                {
                                  "color": "#334e87"
                                }
                              ]
                            },
                            {
                              "featureType": "landscape.natural",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#023e58"
                                }
                              ]
                            },
                            {
                              "featureType": "poi",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "poi",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#283d6a"
                                }
                              ]
                            },
                            {
                              "featureType": "poi",
                              "elementType": "labels.text",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "poi",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#6f9ba5"
                                }
                              ]
                            },
                            {
                              "featureType": "poi",
                              "elementType": "labels.text.stroke",
                              "stylers": [
                                {
                                  "color": "#1d2c4d"
                                }
                              ]
                            },
                            {
                              "featureType": "poi.park",
                              "elementType": "geometry.fill",
                              "stylers": [
                                {
                                  "color": "#023e58"
                                }
                              ]
                            },
                            {
                              "featureType": "poi.park",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#3C7680"
                                }
                              ]
                            },
                            {
                              "featureType": "road",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#304a7d"
                                }
                              ]
                            },
                            {
                              "featureType": "road",
                              "elementType": "labels.icon",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "road",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#98a5be"
                                }
                              ]
                            },
                            {
                              "featureType": "road",
                              "elementType": "labels.text.stroke",
                              "stylers": [
                                {
                                  "color": "#1d2c4d"
                                }
                              ]
                            },
                            {
                              "featureType": "road.arterial",
                              "elementType": "labels",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#2c6675"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "geometry.stroke",
                              "stylers": [
                                {
                                  "color": "#255763"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "labels",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#b0d5ce"
                                }
                              ]
                            },
                            {
                              "featureType": "road.highway",
                              "elementType": "labels.text.stroke",
                              "stylers": [
                                {
                                  "color": "#023e58"
                                }
                              ]
                            },
                            {
                              "featureType": "road.local",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "road.local",
                              "elementType": "labels",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "transit",
                              "stylers": [
                                {
                                  "visibility": "off"
                                }
                              ]
                            },
                            {
                              "featureType": "transit",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#98a5be"
                                }
                              ]
                            },
                            {
                              "featureType": "transit",
                              "elementType": "labels.text.stroke",
                              "stylers": [
                                {
                                  "color": "#1d2c4d"
                                }
                              ]
                            },
                            {
                              "featureType": "transit.line",
                              "elementType": "geometry.fill",
                              "stylers": [
                                {
                                  "color": "#283d6a"
                                }
                              ]
                            },
                            {
                              "featureType": "transit.station",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#3a4762"
                                }
                              ]
                            },
                            {
                              "featureType": "water",
                              "elementType": "geometry",
                              "stylers": [
                                {
                                  "color": "#0e1626"
                                }
                              ]
                            },
                            {
                              "featureType": "water",
                              "elementType": "labels.text.fill",
                              "stylers": [
                                {
                                  "color": "#4e6d70"
                                }
                              ]
                            }
                          ]}
                        initialCenter={{lat: this.props.savedVenues[0].lat, lng: this.props.savedVenues[0].lng}}
                        bounds={bounds}
                        ref={this.props.map}
                        
                    >
                    {this.props.savedVenues.length !== 0?
                        this.props.savedVenues.map(venue =>
                            <Marker
                                onClick={(props,marker,e) => this.onMarkerClick(venue, marker, e)}
                                name={venue.venue_name}
                                content='content'
                                icon={marker}
                                position={{lat: venue.lat, lng: venue.lng}}
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
                            <h4>{this.state.selectedPlace.venue_name}</h4>
                            <p>{this.state.selectedPlace.address}</p>
                        </div>
                    </InfoWindow>
                    <button className='mapBtn' onClick={this.props.toggleMap} >Close Map</button>
                    </Map>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: process.env.REACT_APP_GOOGLE
    })
)(MapContainer)