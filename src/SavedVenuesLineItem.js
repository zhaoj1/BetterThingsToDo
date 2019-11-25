import React, {Component} from 'react';

export default class SavedVenuesLineItem extends Component{

    render() {
        return(
            <>
                <div className='queryLineItem' onClick={(event) => this.props.handleQuerySelect(event, 'saved')}>
                    <h5>{this.props.venue}</h5>
                </div>         
            </>
        )
    }
}