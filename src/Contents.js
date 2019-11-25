import React from 'react';
import MainContainer from './MainContainer'
import { Route, Switch } from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import ErrorPopup from './ErrorPopup'

export default class Contents extends React.Component{

    constructor(){
        super();
        this.state={
            popup: false,
            errorMessage: ''
        }
        this.handleErrors = this.handleErrors.bind(this)
        this.handleErrorBackBtn = this.handleErrorBackBtn.bind(this)
    }

    handleErrors = (error) => {
        this.setState({
          popup: true,
          errorMessage: error
        })
      }

      handleErrorBackBtn = () => {
        this.setState({
            popup: false,
            errorMessage: ''
        })
      }

    render(){
        // console.log(this.state.errorMessage)
        // console.log(this.props.currentUser)
        return(
            <div className='contents' >
                <div>
                    <Switch>
                    <Route exact path='/' />
                    <Route exact path='/signup' 
                        render={(routerProps) => 
                        <Signup 
                            {...routerProps} 
                            setUser={this.props.setUser} 
                            handleErrors={this.handleErrors}
                        /> 
                        } 
                    />
                    <Route exact path='/login' 
                        render={(routerProps) => 
                        <Login 
                            {...routerProps} 
                            setUser={this.props.setUser} 
                            handleErrors={this.handleErrors}
                        /> 
                        } 
                    />
                    <Route exact path='/main' 
                        render={(routerProps) => 
                        <MainContainer 
                            {...routerProps} 
                            currentUser={this.props.currentUser} 
                            handleErrors={this.handleErrors}
                        /> 
                        } 
                    />
                    <Route exact path='/profile' 
                        render={(routerProps) => 
                        <Profile 
                            {...routerProps} 
                            currentUser={this.props.currentUser} 
                        /> 
                        } 
                    />
                    </Switch>
                </div>
                {this.state.popup ?
                    <ErrorPopup errorMessage={this.state.errorMessage} handleErrorBackBtn={this.handleErrorBackBtn} />
                    :
                    null
                }
            </div>
            
        )
    }
}