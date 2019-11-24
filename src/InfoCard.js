import React, {Component} from 'react';
import foursquare from './assets/powered-by-foursquare-blue.png'

export default class InfoCard extends Component{

    render() {
        return(
            <>
                {!this.props.selectedLineItemInfo === null? //dont forget to remove ( ! )
                    null
                    :
                    <div className='wrapper'>
                        <div className='infoCardBorder'>
                            <div className='infoCard'>
                                <div className='venueNameLocation'>
                                    <a href={`https://foursquare.com/v/${this.props.selectedLineItem.venue.id}?ref=` + process.env.REACT_APP_CLIENTID}><h1>{this.props.selectedLineItem.venue.name}</h1></a>
                                    
                                    <br></br>
                                    <label>{this.props.selectedLineItem.venue.location.formattedAddress.join(' ')}</label>
                                </div>
                                <div className='venueCategRating'>
                                    <p>{this.props.selectedLineItem.venue.categories[0].name}</p>
                                    
                                    <p>Rating:&nbsp;
                                        {/* {this.props.selectedLineItemInfo.rating?
                                            this.props.selectedLineItemInfo.rating
                                            :
                                            ' No ratings'
                                        } */}
                                        rating
                                    </p>

                                </div>
                                <div className='venueDesc'>
                                    <p>
                                        {/* {this.props.selectedLineItemInfo.description?
                                            this.props.selectedLineItemInfo.description
                                            :
                                            'No Description'
                                        } */}
                                        description
                                    </p>
                                </div>
                                <div className='venueInfo' >
                                    
                                    <p>Phone:&nbsp;
                                        {/* {this.props.selectedLineItemInfo.contact.formattedPhone? 
                                            this.props.selectedLineItemInfo.contact.formattedPhone
                                            :
                                            ' N/A'
                                        } */}
                                        phone number
                                    </p>

                                    <p>Days Open:&nbsp;
                                        {/* {this.props.selectedLineItemInfo.hours? 
                                            this.props.selectedLineItemInfo.hours.timeframes[0].days
                                            :
                                            ' N/A'
                                        }  */}
                                        days
                                    </p>

                                    <p>Hours:&nbsp;
                                        {/* {this.props.selectedLineItemInfo.hours?
                                            this.props.selectedLineItemInfo.hours.timeframes[0].open[0].renderedTime
                                            :
                                            ' N/A'
                                        }  */}
                                        hours
                                    </p>
                                    
                                    <p>Price Tier:&nbsp;
                                        {/* {this.props.selectedLineItemInfo.price?
                                            this.props.selectedLineItemInfo.price.currency
                                            :
                                            ' N/A'
                                        }  */}
                                        price
                                    </p>
                                    {/* {console.log(this.props.selectedLineItemInfo)} */}
                                </div>
                            </div>
                            <br></br>
                            <button className='buttons' onClick={this.props.handle}>Save</button>
                            <button className='buttons' onClick={this.props.handleBackBtn}>Back</button><br></br>
                            <img src={foursquare} height='20px' width='200px' style={{'margin-top':10}} />
                        </div>
                    </div>
                }
            </>
        )
    }
}