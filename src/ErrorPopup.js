import React, {Component} from 'react';

export default class ErrorPopup extends Component{

    render() {
        return(
                <div className='popup' >
                    <div className='error_popup_inner'>
                        <h1 className='errorHeading'>Error!</h1>
                        {this.props.errorMessage.map(error => 
                            <p className='error'>{error}</p>
                        )}
                        <button className='buttons' onClick={this.props.handleErrorBackBtn} ref={this.props.errorMsgBtn} >OK</button>
                    </div>
                </div>
        )
    }
}