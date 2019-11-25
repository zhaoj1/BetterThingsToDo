import React, {Component} from 'react';
import InfoCardPopup from './InfoCardPopup'
import SavedVenuesLineItem from './SavedVenuesLineItem'

export default class Profile extends Component{

    constructor(){
        super();
        this.state = {
            
        }
    }

    render() {
        // console.log(this.props.currentUser.username)
        return(
            this.props.currentUser?
            <>
                <div className='wrapper'>
                    <div className='profilePage'>
                        <div className='profile'>
                            <div className='userInfo'>
                                <h1>{this.props.currentUser.username}</h1>
                                <img src='http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png' height='120' width='120' />
                            </div>
                        </div>
                        <div className='profileVenues' >
                            
                        </div>
                    </div>
                </div>    
            </>
            :
            <>
                {this.props.history.push('/main')}
            </>
        )
    }
}