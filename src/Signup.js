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
        // console.log(event.target.name, event.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
  
        if(this.state.password === this.state.passwordConfirm){
            // console.log(this.state.password)
          fetch(`http://localhost:3000/signup`, {
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
                // console.log(response.errors)
              } else {
                this.props.setUser(response.user)
                localStorage.token = response.token
                this.props.history.push('/main')
                // console.log(localStorage.token)
              }
            })
        } else {
          this.props.handleErrors(['Passwords do not match.'])
        }
      }

    render(){
        // console.log(this.state)
        return(
            <div className='wrapper'>
                <div className='signup'>
                    <form className='signupForm' onSubmit={this.handleSubmit} >
                        <h3 className='inputHeader'>Sign up</h3>
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
                        
                        <input className='buttons' type='submit' value='Signup'></input>  
                    </form>
                </div>
            </div>
        )
    }

}