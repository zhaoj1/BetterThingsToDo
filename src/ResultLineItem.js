import React, {Component} from 'react';

export default class ResultLineItem extends Component{
    
    render() {
        return(
            <div>
                <div 
                    id={this.props.class}
                    className={
                        this.props.firstSelected === this.props.result || this.props.secondSelected === this.props.result ?
                        'selectedLineItem'
                        :
                        'resultLineItem'
                    }
                    onClick={this.props.handleResultSelect} 
                >
                    <h5 id={this.props.class} >{this.props.result.formatted}</h5>
                </div>
            </div>
        )
    }
}