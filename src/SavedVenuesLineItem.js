import React, {Component} from 'react';

export default class SavedVenuesLineItem extends Component{

    render() {
        return(
            <>
                <div className='queryLineItem' onClick={this.props.handleQuerySelect}>
                    <h5>{this.props.venue.venue.name}</h5>
                </div>         
            </>
        )
    }
}