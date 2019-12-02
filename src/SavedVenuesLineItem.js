import React, {Component} from 'react';

export default class SavedVenuesLineItem extends Component{

    render() {
        return(
            <>
                <div className='queryLineItem' onClick={(event) => this.props.handleQuerySelect(event, 'saved')}>
                    <label>{this.props.venue}</label>
                </div>         
            </>
        )
    }
}