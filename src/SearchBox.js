import React, {Component} from 'react';

export default class Home extends Component{
    
    render() {
        return(
            <div>
                <div className='wrapper'>
                    <form className='inputForm' onSubmit={this.props.handleAddressSubmit}>
                        <input 
                            type='text' 
                            className='input' 
                            name='firstAddress'
                            placeholder='Please enter first address' 
                            onChange={(event) => this.props.handleAddressInputChange(event)}
                        /><br></br>
                        <input 
                            type='text' 
                            className='input' 
                            name='secondAddress'
                            placeholder='Please enter second address' 
                            onChange={(event) => this.props.handleAddressInputChange(event)}
                        /><br></br>
                        <input type='submit' value='Submit' />
                    </form>  
                </div>
            </div>
        )
    }
}