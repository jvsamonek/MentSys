import React, { Component } from 'react'
import { ActionBar } from './ActionBar';

export class BottomActionBar extends Component {
    constructor({ actions }){
        super()
        this.state = {
            actions          
        }
    }
    render(){
        return (
            <div
                className="action-bar"
            >
                <ActionBar actions={this.state.actions}/>
            </div>
        )
    }
}