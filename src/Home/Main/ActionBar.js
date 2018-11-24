import React, { Component } from 'react'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
export class ActionBar extends Component {
    constructor({actions}){
        super()
        this.state = {
            actions: [
                {label: 'Opcao 1', action(){console.log('AQQQ')}},
                {label: 'Opcao 2', action(){}},
                {label: 'Opcao 3', action(){}},
            ]
                .map(o => <BottomNavigationAction label={o.label} onClick={o.action}/>)
        }
    }
    render(){
        return (
            <BottomNavigation  
                className="action-bar"
                showLabels
            >
                {this.state.actions}
            </BottomNavigation>
        )
    }
}