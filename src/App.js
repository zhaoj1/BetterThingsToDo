import React from 'react';
import NavBox from './NavBox'
import Contents from './Contents'
import LogoutPopup from './LogoutPopup'

let backgrounds = ['url(./assets/bg.png)', 'url(./assets/bgTransitionV2.png)']
let i = 0

export default class App extends React.Component{

  constructor(){
    super();

    this.state = {
      currentUser: null,
      toggleNav: false
    }

    this.logoutMsg = React.createRef();
    this.toggleDisableNav = this.toggleDisableNav.bind(this);
  
  }

  toggleDisableNav = () => {
    this.setState({
      toggleNav: !this.state.toggleNav
    })
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
      logoutPopup: true,
      toggleNav: !this.state.toggleNav
    })
    this.props.history.push('./login')
    // setTimeout(() => alert('Successfully Logged Out'), 200)
  }  

  componentDidUpdate(){
    if(this.logoutMsg.current !== null){
      this.logoutMsg.current.focus();   
    }
  }

  handleLogoutBackBtn = () => {
    this.setState({
      logoutPopup:false,
      toggleNav: !this.state.toggleNav
    })
  }

  nextBackground = () => {
    i++;
    i = i % backgrounds.length
    document.body.setAttribute('background-image', backgrounds[i])
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
    setInterval(this.nextBackground(), 1000)
    document.body.setAttribute('background-image', backgrounds[0])
    return(
      <div className='appWindow'>
        <div className='window' >
          <NavBox currentUser={this.state.currentUser} logout={this.logout} toggleNav={this.state.toggleNav} searchBack={this.state.searchBack} />
        </div>
        <div className='contents' >
          <Contents currentUser={this.state.currentUser} setUser={this.setUser} logoutMsg={this.logoutMsg} toggleDisableNav={this.toggleDisableNav} searchBack={this.state.searchBack} />
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
