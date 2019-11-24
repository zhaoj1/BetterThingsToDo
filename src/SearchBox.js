import React, {Component} from 'react';

export default class Home extends Component{
    
    render() {
        return(
            <div>
                <div className='wrapper'>
                    <form className='inputForm' onSubmit={this.props.handleAddressSubmit}>
                        <h3 className='inputHeader'>Search</h3>
                        <input 
                            type='text' 
                            className='input' 
                            name='firstAddress'
                            placeholder='Please enter first address' 
                            onChange={(event) => this.props.handleAddressInputChange(event)}
                            required
                        /><br></br>
                        <input 
                            type='text' 
                            className='input' 
                            name='secondAddress'
                            placeholder='Please enter second address' 
                            onChange={(event) => this.props.handleAddressInputChange(event)}
                            required
                        /><br></br>
                        <input className='buttons' type='submit' value='Search' />
                    </form>  
                </div>
            </div>
        )
    }
}