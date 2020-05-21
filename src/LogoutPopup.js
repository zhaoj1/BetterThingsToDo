import React, {Component} from 'react';

export default class ErrorPopup extends Component{

    render() {
        return(
                <div className='popup' >
                    <div className='logout_popup_inner'>
                        <p className='logout'>Successfully logged out.</p>
                        <button className='buttons' onClick={this.props.handleBackBtn} ref={this.props.logoutMsg} >Back</button>
                    </div>
                </div>
        )
    }
}