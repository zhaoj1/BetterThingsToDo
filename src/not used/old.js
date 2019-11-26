import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import './leaflet.css'
 
const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
    provider: provider,
    autoClose: true,
    showMarker: true,
    keepResult: true,
    retainZoomLevel: true,
});

// const searchControl2 = new GeoSearchControl({
//     provider: provider,
//     autoClose: true,
//     showMarker: true,
//     keepResult: true,
//     retainZoomLevel: true,
// });

// const bounds = [
//     [40.705245 + .0015, -74.013915 + .0015],
//     [40.705245 - .0015, -74.013915 - .0015]
// ]

export default class MapContainer extends React.Component{
    
    state = {
        longitude: null,
        latitude: null,
        chosenLocations: []
    }

    componentDidMount(){
        this.map = L.map('mapid', {
            center: [40.705245, -74.013915],
            zoom: 15,
            layers: [
                L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(this.map)
            ]
        })

        L.marker([40.705245, -74.013915]).addTo(this.map);
        L.circle([40.705245, -74.013915],{
            color: 'red',
            fillcolor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(this.map)
        

        // L.rectangle(bounds, {color: '#ff7800', weight:1}).addTo(this.map)

        this.map.addControl(searchControl)
        
        this.map.on('geosearch/showlocation', function (result) {
            console.log(result.location.x, result.location.y) 
        });
        
    }   

    componentDidUpdate() {
        this.map.current.leafletElement.invalidateSize(true);
    }



    render() {
        // setTimeout(() => { this.map.invalidateSize(true)}, 800);
        return(
            <div id="mapid"></div>
            // <iframe width="600" height="450" frameborder="0" style={{border:0}}
            //     src="https://www.google.com/maps/embed/v1/undefined?origin=...&q=...&destination=...&center=...&zoom=...&key=AIzaSyDov9KfZKjI8rtKRrc-s9B0fubyJXGcW1Q" allowfullscreen>
            // </iframe>
        )
    }
}