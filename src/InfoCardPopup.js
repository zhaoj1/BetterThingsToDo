import React, {Component} from 'react';
import foursquare from './assets/powered-by-foursquare-blue.png'

export default class InfoCardPopup extends Component{

    render() {
        // console.log(this.props)
        return(
            <div className='popup' >
                {/* <div className='wrapper'> */}
                    <div className='popup\_inner'>
                        {!this.props.selectedLineItemInfo === null? //dont forget to remove ( ! )
                            null
                            :
                            // <div className='wrapper'>
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
                                    {this.props.currentUser ? 
                                        this.props.list == 'recommended' ?
                                            <button className='buttons' onClick={this.props.handleSaveBtn}>Save</button> 
                                            : 
                                            <button className='buttons' onClick={this.props.handleDeleteBtn} >Remove from Saved</button> 
                                        :null
                                    }
                                    <button className='buttons' onClick={this.props.handleBackBtn} ref={this.props.infoCardBackBtn}>Back</button><br></br>
                                    <img src={foursquare} width='200px' style={{'margin-top':10}} />
                                </div>
                            // </div>
                        }
                    </div>
                {/* </div> */}
            </div>         
        )
    }
}