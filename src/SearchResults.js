import React, {Component} from 'react';
import ResultLineItem from './ResultLineItem'
import Filter from './Filter'

export default class SearchResults extends Component{

    constructor(){
        super();

        this.state = {
            firstSelected: null,
            secondSelected: null,
            midpoint: null,
            selectedCategory: 'None'
        }

        this.handleResultSelect = this.handleResultSelect.bind(this)
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this)
    }

    componentDidMount = () => {
        this.setState({
            selectedCategory: null
        })
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

        if(this.state.firstSelected === null || this.state.secondSelected === null){
            this.props.handleErrors(['Please select suggested addresses'])
        } else{
            this.calculateMidpoint(this.state.firstSelected.geometry, this.state.secondSelected.geometry);
            setTimeout(()=> this.fetchVenues(), 100);
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    fetchVenues = () => {
        this.state.selectedCategory === 'None' ?
            fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET + `&v=20180323&limit=20&near=${this.state.midpoint[0]},${this.state.midpoint[1]}`)
            .then(resp => resp.json())
            .then(data => this.props.setRecommendations(data.response.groups[0].items))
            :
            fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET + `&v=20180323&limit=20&section=${this.state.selectedCategory}&near=${this.state.midpoint[0]},${this.state.midpoint[1]}`)
            .then(resp => resp.json())
            .then(data => this.props.setRecommendations(data.response.groups[0].items))

    }

    // fetchVenues = () => {
    //     // console.log(this.state.midpoint)
    //     fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET + `&v=20180323&limit=20&near=${this.state.midpoint[0]},${this.state.midpoint[1]}`)
    //     .then(resp => resp.json())
    //     .then(data => this.props.setRecommendations(data.response.groups[0].items))
    //     .catch(error => {
    //         throw(error)
    //       })
    // }

    // fetchCategories = () => {
    //     fetch('https://api.foursquare.com/v2/venues/categories?client_id=' + process.env.REACT_APP_CLIENTID + '&client_secret=' + process.env.REACT_APP_CLIENTSECRET + `&v=20180323` )
    //     .then(resp => resp.json())
    //     .then(console.log)
    // }

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

    handleDropdownSelect = (event) => {
        this.setState({
            selectedCategory: event.target.value
        })
    }

    render() {
        // console.log(this.props.firstSearchResults)
        // console.log(this.props.secondSearchResults)
        // console.log(this.state.categories)
        // console.log(this.props.recommendedList)
        // console.log(this.state.midpoint)
        console.log(this.state.selectedCategory)
        return(
            <div>              
                <div className='searchResultsMajorDiv'>
                    <div className='searchResultsHeader'>
                        <h3>Please specify addresses:</h3>
                    </div>

                    <div className='filterDiv'>
                        <Filter handleDropdownSelect={this.handleDropdownSelect} />
                    </div>

                    <div className='searchResultsLists' >
                        <div className='searchResults' style={{'float':'left'}}>
                            {this.props.loading ?

                                <h1>Loading...</h1>
                                :
                                this.props.firstSearchResults.length !== 0 ?
                                    this.props.firstSearchResults.map(result => 
                                        < ResultLineItem 
                                            handleResultSelect={this.handleResultSelect} 
                                            class='firstSelected' 
                                            result={result} 
                                            firstSelected={this.state.firstSelected} 
                                        />
                                    )
                                    :
                                    <p style={{'font-weight':'bold'}}>No results found. Please try again</p>
                            }
                        </div>
                        <div className='searchResults' style={{'float':'right'}}>
                            {this.props.loading ?
                                <h1>Loading...</h1>
                                :
                                this.props.secondSearchResults.length !== 0 ?
                                    this.props.secondSearchResults.map(result => 
                                        < ResultLineItem 
                                            handleResultSelect={this.handleResultSelect} 
                                            class='secondSelected' 
                                            result={result} 
                                            firstSelected={this.state.secondSelected} 
                                        />
                                    )
                                    :
                                    <p style={{'font-weight':'bold'}}>No results found. Please try again</p>
                            }
                        </div>
                    </div>

                    <div className='searchResultsBtns'>
                        <button className='buttons' onClick={() => this.handleSubmitQuery(this.state.firstSelected, this.state.secondSelected)} >Continue</button> 
                        <button className='buttons' onClick={this.props.handleBackBtn}>Back</button><br></br>
                        <label style={{'font-size':10, 'margin-top':10, 'color':'whitesmoke'}}>Geodata copyright OpenStreetMap contributors</label>
                    </div>
                </div>
            </div>
        )
    }
}