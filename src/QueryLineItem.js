import React, {Component} from 'react';

export default class QueryLineItem extends Component{

    render() {
        // console.timeLog(this.props.venue)
        return(
            <>
                <div className='queryLineItem' onClick={(event) => this.props.handleQuerySelect(event, 'recommended')}>
                    <label>{this.props.venue.venue.name}</label>
                </div>         
            </>
        )
    }
}