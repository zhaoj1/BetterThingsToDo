import React, {Component} from 'react'

export default class Login extends Component{

    state = {
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    
        fetch(`http://localhost:3000/login`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
          },
          body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => {
          if (response.errors){
            // alert('Username or Password incorrect')
            this.props.handleErrors(['Username or password is incorrect.'])
          } else {
            this.props.setUser(response.user)
            this.props.fetchSavedVenues()
            // localStorage.token = response.token
            // localStorage.setItem('token', response.token)
            this.props.history.push('./main')
          }
        })

        this.props.setUser();
    }

    render(){
        return(
            <div className='wrapper'>
                <div className='login'>
                    <form className='loginForm' onSubmit={this.handleSubmit} >
                        <h3 className='inputHeader'>Login</h3>
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
                            <br></br>
                        <input className='buttons' type='submit' value="Login"></input>
                    </form>
                </div>
            </div>
        )
    }

}