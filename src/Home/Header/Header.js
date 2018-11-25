import React ,{ Component } from 'react'
import LoginBox  from './LoginBox'

export class Header extends Component{
    render(){
        return (
            <div className="header">
                <div className="header-content">
                    <div className="left" Style="font-size:50px">MentSys</div>
                    <LoginBox/>
                </div>
            </div>
        )
    }
}