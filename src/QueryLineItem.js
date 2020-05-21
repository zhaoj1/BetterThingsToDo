import React, {Component} from 'react';

export default class QueryLineItem extends Component{

    render() {
        return(
            <>
                <div className='queryLineItem' data-api-id={this.props.venue.venue.id} onClick={(event) => this.props.handleQuerySelect(event, 'recommended')}>
                    <label>{this.props.venue.venue.name}</label>
                </div>         
            </>
        )
    }
}