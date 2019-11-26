import React, {Component} from 'react';

export default class ProfileVenues extends Component{

    render() {
        return(
            <>
                <div className='profileVenuesLineItem' onClick={(event) => this.props.handleQuerySelect(event, 'saved')}>
                    <label>{this.props.venue}</label>
                </div>         
            </>
        )
    }
}