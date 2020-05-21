import React, {Component} from 'react';
import foursquare from './assets/powered-by-foursquare-white.png'

export default class ProfileVenueInfoCard extends Component{

    render() {
        return(
            <div className='popup' >
                <div className='popup\_inner'>
                    {!this.props.selectedLineItemInfo === null? //dont forget to remove ( ! )
                        null
                        :
                        <div className='infoCardBorder'>
                            <div className='infoCard'>
                                <div className='venueNameLocation'>
                                    <h1 className='infoCardVenueName' >{this.props.selectedLineItem.venue_name}</h1>
                                    <p><a href={`https://foursquare.com/v/${this.props.selectedLineItem.venue_api_id}?ref=` + process.env.REACT_APP_CLIENTID} target='blank' >Click here for more info on venue</a></p>
                                    
                                    <label>{this.props.selectedLineItemInfo.location.formattedAddress.join(' ')}</label>
                                </div>
                                <div className='venueCategRating'>
                                    <p>{this.props.selectedLineItemInfo.categories[0].name}</p>
                                    
                                    <p>Rating:&nbsp;
                                        {this.props.selectedLineItemInfo.rating?
                                            this.props.selectedLineItemInfo.rating
                                            :
                                            ' No ratings'
                                        }
                                    </p>

                                </div>
                                <div className='venueDesc'>
                                    <p>
                                        {this.props.selectedLineItemInfo.description?
                                            this.props.selectedLineItemInfo.description
                                            :
                                            'No Description'
                                        }
                                    </p>
                                </div>
                                <div className='venueInfo' >
                                    
                                    <p>Phone:&nbsp;
                                        {this.props.selectedLineItemInfo.contact.formattedPhone? 
                                            this.props.selectedLineItemInfo.contact.formattedPhone
                                            :
                                            ' N/A'
                                        }
                                    </p>

                                    <p>Days Open:&nbsp;
                                        {this.props.selectedLineItemInfo.hours? 
                                            this.props.selectedLineItemInfo.hours.timeframes[0].days
                                            :
                                            ' N/A'
                                        } 
                                    </p>

                                    <p>Hours:&nbsp;
                                        {this.props.selectedLineItemInfo.hours?
                                            this.props.selectedLineItemInfo.hours.timeframes[0].open[0].renderedTime
                                            :
                                            ' N/A'
                                        } 
                                    </p>
                                    
                                    <p>Price Tier:&nbsp;
                                        {this.props.selectedLineItemInfo.price?
                                            this.props.selectedLineItemInfo.price.currency
                                            :
                                            ' N/A'
                                        } 
                                    </p>
                                </div>
                            </div>
                            <br></br>
                            <button className='buttons' onClick={this.props.handleDeleteBtn} >Remove from Saved</button> 
                            <button className='buttons' onClick={this.props.handleBackBtn}>Back</button><br></br>
                            <img src={foursquare} width='200px' style={{'margin-top':10}} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

