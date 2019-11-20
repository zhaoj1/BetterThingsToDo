import React, {Component} from 'react';

export default class Home extends Component{
    
    render() {
        return(
            <div>
                <div 
                    id={this.props.class}
                    className='resultLineItem'
                    onClick={this.props.handleResultSelect} 
                >
                    <h5 id={this.props.class} >{this.props.result.formatted}</h5>
                </div>
            </div>
        )
    }
}