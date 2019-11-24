import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

function NavBox(props){

    return(
        <div className='nav-box'>
            <Link to='/main' className='logo'>Logo Placeholder</Link>
            {props.currentUser?
                <>
                    <div className='linkTo' ><Button variant='contained' disabled >{props.currentUser.username}</Button></div>
                    <div className='linkTo' ><Button variant='contained' color='link' onClick={props.logout}>Logout</Button></div>
                </>
                :
                <>
                    <Link to='/signup' className='linkTo' ><Button variant='contained' color='link'>Sign up</Button></Link>
                    <Link to='/login' className='linkTo' ><Button variant='contained' color='link'>Login</Button></Link>
                </>
            }
        </div>
    )

}

export default NavBox