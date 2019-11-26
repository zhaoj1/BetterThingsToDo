import React from 'react';
import NavBox from './NavBox'
import Contents from './Contents'
import LogoutPopup from './LogoutPopup'
import MapContainer from './MapContainer'

export default class App extends React.Component{

  constructor(){
    super();

    this.state = {
      currentUser: null
    }

    this.logoutMsg = React.createRef();
  
  }

  setUser = (user) => {
    this.setState({
      currentUser: user,
      savedVenues: null
    })
  }

  logout = () => {
    this.setState({
      currentUser: null,
      logoutPopup: true
    })
    this.props.history.push('./main')
    // setTimeout(() => alert('Successfully Logged Out'), 200)
  }  

  componentDidUpdate(){
    if(this.logoutMsg.current !== null){
      this.logoutMsg.current.focus();   
    }
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
  //       // console.log(response.user)
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
          <Contents currentUser={this.state.currentUser} setUser={this.setUser} logoutMsg={this.logoutMsg} />
          {this.state.logoutPopup?
            <LogoutPopup handleBackBtn={this.handleLogoutBackBtn} logoutMsg={this.logoutMsg} />
            :
            null
          }
        </div>
      </div>
    )
  }  

}
