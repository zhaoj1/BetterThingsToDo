import React from 'react';
import NavBox from './NavBox'
import Contents from './Contents'
import LogoutPopup from './LogoutPopup'

export default class App extends React.Component{

  state = {
    currentUser: null
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    })
  }

  logout = () => {
    this.props.history.push('./main')
    this.setState({
      currentUser: null,
      logoutPopup: true
    })

    // setTimeout(() => alert('Successfully Logged Out'), 200)

  }  

  handleLogoutBackBtn = () => {
    this.setState({
      logoutPopup:false
    })
  }

  // componentDidMount = () => {
  //   if(localStorage.token){
  //     fetch(`http://localhost:3000/auto_login`,{
  //       headers: {
  //         "Content-Type": "application/json",
  //         'Accept': "application/json",
  //         'Authorization': localStorage.token
  //       },
  //     })
  //     .then(resp => resp.json())
  //     .then(response => {
  //       console.log(response)
  //       this.setState({
  //         currentUser: response.user
  //       })
  //     })
  //   }
  // }

  render(){
    // console.log(this.state.currentUser)
    return(
      <div className='appWindow'>
        <div className='window' >
          <NavBox currentUser={this.state.currentUser} logout={this.logout} />
        </div>
        <div className='contents' >
          <Contents currentUser={this.state.currentUser} setUser={this.setUser} />
          {/* <div className='contents' >
            <Switch>
              <Route exact path='/' />
              <Route exact path='/signup' 
                render={(routerProps) => 
                  <Signup 
                    {...routerProps} 
                    setUser={this.setUser} 
                  /> 
                } 
              />
              <Route exact path='/login' 
                render={(routerProps) => 
                  <Login 
                    {...routerProps} 
                    setUser={this.setUser} 
                  /> 
                } 
              />
              <Route exact path='/main' 
                render={(routerProps) => 
                  <MainContainer 
                    {...routerProps} 
                    currentUser={this.state.currentUser} 
                  /> 
                } 
              />
            </Switch>
          </div> */}
          {this.state.logoutPopup?
            <LogoutPopup errorMessage={this.state.errorMessage} handleBackBtn={this.handleLogoutBackBtn} />
            :
            null
          }
        </div>
      </div>
    )
  }  

}
