import React, {Component} from 'react';
import ResultLineItem from './ResultLineItem'

export default class Home extends Component{

    constructor(){
        super();

        this.state = {
            firstSelected: {},
            secondSelected: {},
            midpoint: []
        }

        this.handleResultSelect = this.handleResultSelect.bind(this)
    }
    
    calculateMidpoint = (firstAddress, secondAddress) => {
        // let midptLat = this.degToRads(firstAddress.lat - secondAddress.lat)
        // let midptLng = this.degToRads(firstAddress.lng - secondAddress.lng)
        // let distance = 
        //     Math.sin(midptLat/2) ** 2 +
        //     Math.cos(this.degToRads(firstAddress.lat)) * Math.cos(this.degToRads(secondAddress.lat)) *
        //     Math.sin(midptLng/2) ** 2
        // let midpointResult = 2 * Math.atan2(Math.sqrt(distance), Math.sqrt(1-distance))
        // return midpointResult
        //-------------------------------------------------------//
        // ny lat: 40.7127281, lng: -74.0060152
        // nj lat: 40.0757384, lng: -74.4041622
        // "midpoint" lat: 40.39423325, lng: -74.2050887
        //-------------------------------------------------------//
        let lat1 = this.degToRads(firstAddress.lat);
        let lat2 = this.degToRads(secondAddress.lat);
        let lng1 = this.degToRads(firstAddress.lng);

        let lngDistance = this.degToRads(secondAddress.lng - firstAddress.lng);

        let bX = Math.cos(lat2) * Math.cos(lngDistance);
        let bY = Math.cos(lat2) * Math.sin(lngDistance);

        let mdptLat = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY**2));
        let mdptLng = lng1 + Math.atan2(bY, Math.cos(lat1) + bX)
        let mdptCoor = [this.radsToDeg(mdptLat), this.radsToDeg(mdptLng)]
        
        this.setState({
            midpoint: mdptCoor
        })
        //-------------------------------------------------------//
        // let mdptLat = (secondAddress.lat + firstAddress.lat)/2
        // let mdptLng = (secondAddress.lng + firstAddress.lng)/2
        // let mdptCoor = [mdptLat, mdptLng]
        // // return mdptCoor
        // console.log(mdptCoor)
    }

    degToRads = (deg) => {
        return deg * Math.PI/180
    }

    radsToDeg = (rads) => {
        return rads * 180/Math.PI
    }

    handleSubmitQuery = (firstAddress, secondAddress) => {

        this.calculateMidpoint(this.state.firstSelected.geometry, this.state.secondSelected.geometry);

        // let lat1 = this.degToRads(firstAddress.lat);
        // let lat2 = this.degToRads(secondAddress.lat);
        // let lng1 = this.degToRads(firstAddress.lng);

        // let lngDistance = this.degToRads(secondAddress.lng - firstAddress.lng);

        // let bX = Math.cos(lat2) * Math.cos(lngDistance);
        // let bY = Math.cos(lat2) * Math.sin(lngDistance);

        // let mdptLat = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY**2));
        // let mdptLng = lng1 + Math.atan2(bY, Math.cos(lat1) + bX)
        // let mdptCoor = [this.radsToDeg(mdptLat), this.radsToDeg(mdptLng)]
        
        // this.setState({
        //     midpoint: mdptCoor
        // })

        // fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET+ `&v=20180323&limit=1&ll=${this.state.midpoint[0]},${this.state.midpoint[1]}`)
        // .then(resp => resp.json())
        // .then(console.log)
    }

    componentDidUpdate(prevState){
        if(this.state.midpoint !== prevState.midpoint){
            this.fetchVenues();
        }
    }

    fetchVenues = () => {
        fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET+ `&v=20180323&limit=1&ll=${this.state.midpoint[0]},${this.state.midpoint[1]}`)
        .then(resp => resp.json())
        .then(console.log)
    }

    handleResultSelect = (event) => {
        if(event.target.id === 'firstSelected'){
            this.setState({
                firstSelected: this.props.firstSearchResults.find(result => result.formatted === event.target.innerText)
            })
        } else if(event.target.id === 'secondSelected'){
            this.setState({
                secondSelected: this.props.secondSearchResults.find(result => result.formatted === event.target.innerText)
            })
        }
    }

    render() {
        return(
            <div>
                <div className='searchResultsMajorDiv'>
                    
                        <div className='searchResults' style={{'float':'left'}}>
                            {this.props.firstSearchResults.map(result => 
                                < ResultLineItem 
                                    handleResultSelect={this.handleResultSelect} 
                                    class='firstSelected' 
                                    result={result} 
                                    firstSelected={this.state.firstSelected} 
                                />
                            )}
                        </div>
                        <div className='searchResults' style={{'float':'right'}}>
                            {this.props.secondSearchResults.map(result => 
                                < ResultLineItem 
                                    handleResultSelect={this.handleResultSelect} 
                                    class='secondSelected' 
                                    result={result} 
                                    firstSelected={this.state.secondSelected} 
                                />
                            )}
                        </div>

                    <div className='searchResultsBtns'>
                        <button onClick={() => this.handleSubmitQuery(this.state.firstSelected.geometry, this.state.secondSelected.geometry)} >OK</button> 
                        <button onClick={this.props.handleBackBtn}>Back</button>
                    </div>
                </div>
                
            </div>
        )
    }
}