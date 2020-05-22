import React, {Component} from 'react'
import Button from '@material-ui/core/Button';

export default class Signup extends Component{

    state = {
        username: '',
        password: '',
        passwordConfirm: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
  
        if(this.state.password === this.state.passwordConfirm){
          fetch(`https://better-things-to-do-backend.herokuapp.com/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          })
            .then(res => res.json())
            .then(response => {
              if (response.errors){
                this.props.handleErrors(response.errors)
              } else {
                this.props.setUser(response.user)
                this.props.history.push('/')
              }
            })
        } else {
          this.props.handleErrors(['Passwords do not match.'])
        }
      }

    render(){
        return(
            <div className='wrapper'>
                <div className='signup'>
                    <form className='signupForm' onSubmit={this.handleSubmit} >
                        <h3 className='inputHeader'>Sign Up</h3>
                        <input 
                            type='text' 
                            name='username' 
                            placeholder='Username' 
                            className='input'
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        ></input>
                        <input 
                            type='password' 
                            name='password' 
                            placeholder='Password' 
                            className='input'
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        ></input>
                        <input 
                            type='password' 
                            name='passwordConfirm' 
                            placeholder='Confirm password'
                            className='input' 
                            value={this.state.passwordConfirm}
                            onChange={this.handleChange}
                            required
                        ></input>
                        
                        <br></br>
                        
                        <input className='buttons' type='submit' value='Sign Up'></input>  
                    </form>
                </div>
            </div>
        )
    }

}