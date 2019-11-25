import React, {Component} from 'react';
import foursquare from './assets/powered-by-foursquare-blue.png'

export default class ErrorPopup extends Component{

    render() {
        console.log(this.props.errorMessage)
        return(
                <div className='popup' >
                    <div className='error_popup_inner'>
                        <h1 className='errorHeading'>Error!</h1>
                        {this.props.errorMessage.map(error => 
                            <p className='error'>{error}</p>
                        )}
                        <button className='buttons' onClick={this.props.handleErrorBackBtn}>Back</button>
                    </div>
                </div>
        )
    }
}