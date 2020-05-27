import React, {Component} from 'react'

export default class Login extends Component{

    state = {
        username: '',
        password: '',
        isLoading: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    
        fetch(`https://better-things-to-do-backend.herokuapp.com/login`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
          },
          body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => {
        console.log(response)
          if (response.errors){
            this.props.handleErrors(['Username or password is incorrect.'])
          } else {
            this.setState({isLoading: true})
            this.props.setUser(response.user)
            this.props.fetchSavedVenues()
            this.props.history.push('/')
          }
        })

        this.props.setUser();
        this.setState({isLoading: false});
    }

    render(){
        return(
            <div className='wrapper'>
                <div className='login'>
                    <form className='loginForm' onSubmit={this.handleSubmit} >
                        <h3 className='inputHeader'>Login</h3>
                        {this.state.isLoading ? 
                            <p>Loading...</p>
                            :
                            <>
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
                            </>
                        }
                    </form>
                </div>
            </div>
        )
    }

}