import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import logo from './assets/logo4.png'

function NavBox(props){

    return(
        <div className='nav-box'>
            <Link to={props.toggleNav ? null :'/main'} className={props.toggleNav ? 'disabledLogo' :'logo'} ><img src={logo} /> </Link>
            <div className='title' ><span className='titleRed'>Better</span><span className='titleWhite'>ThingsTo</span><span className='titleRed'>Do</span></div>
            {props.currentUser?
                <>
                    <Link to={props.toggleNav ? null : '/profile'} className={props.toggleNav? 'disabledLinkTo' : 'linkTo'} ><Button className='profileBtn' variant={!props.toggleNav ? 'contained' : 'disabled'} >{props.currentUser.username}</Button></Link>
                    <div className={props.toggleNav? 'disabledLinkTo' : 'linkTo'} ><Button className='navBtns' variant={!props.toggleNav ? 'contained' : 'disabled'}  onClick={props.logout}>Logout</Button></div>
                </>
                :
                <>
                    <Link to={props.toggleNav ? null : '/signup'} className={props.toggleNav? 'disabledLinkTo' : 'linkTo'} ><Button className='navBtns' variant={!props.toggleNav ? 'contained' : 'disabled'} >Sign up</Button></Link>
                    <Link to={props.toggleNav ? null : '/login'} className={props.toggleNav? 'disabledLinkTo' : 'linkTo'} ><Button className='navBtns' variant={!props.toggleNav ? 'contained' : 'disabled'} >Login</Button></Link>
                </>
            }
        </div>
    )

}

export default NavBox