import React, {Component} from 'react';

export default class QueryLineItem extends Component{

    render() {
        // console.timeLog(this.props.venue)
        return(
            <>
                <div className='queryLineItem' onClick={(event) => this.props.handleQuerySelect(event, 'recommended')}>
                    <h5>{this.props.venue.venue.name}</h5>
                </div>         
            </>
        )
    }
}