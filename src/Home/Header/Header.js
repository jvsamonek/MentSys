import React ,{ Component } from 'react'
import LoginBox  from './LoginBox'

export class Header extends Component{
    render(){
        return (
            <div className="header">
                <div className="header-content">
                    <div className="left" 
                        style={{
                            fontSize: '50px',
                            position: 'relative', 
                            top: '-10px'
                        }}
                    >
                        MentSys
                    </div>
                    <LoginBox/>
                </div>
            </div>
        )
    }
}