import React from 'react';
import MainContainer from './MainContainer'
import { Route, Switch } from 'react-router-dom';
import Signup from './Signup'
import Login from './Login'
import ErrorPopup from './ErrorPopup'

export default class Contents extends React.Component{

    constructor(){
        super();
        this.state={
            popup: false,
            errorMessage: ''
        }
        this.handleErrors = this.handleErrors.bind(this)
        this.handleBackBtn = this.handleBackBtn.bind(this)
    }

    handleErrors = (error) => {
        this.setState({
          popup: true,
          errorMessage: error
        })
      }

      handleBackBtn = () => {
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
                    </Switch>
                </div>
                {this.state.popup ?
                    <ErrorPopup errorMessage={this.state.errorMessage} handleBackBtn={this.handleBackBtn} />
                    :
                    null
                }
            </div>
            
        )
    }
}