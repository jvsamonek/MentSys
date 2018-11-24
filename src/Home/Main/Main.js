import React, { Component } from 'react'
import { TaskCards } from './Tasks/TaskCards';
import { TaskDetails } from './Tasks/Task/TaskDetails';
import { PeopleManager } from './People/PeopleManager';

import Grid from '@material-ui/core/Grid';
import { News } from './News/News';
import { PeopleDetails } from './People/PeopleDetails';
import { AlertManager } from './Alerts/AlertManager';
import { AlertDetails } from './Alerts/AlertDetails';
import { MyStatus } from './Status/MyStatus';

export const MenuCode = {
    NEWS: 1,

    TASK_LIST: 2,
    TASK_DETAILS: 3,

    PEOPLE_LIST: 4,    
    PEOPLE_DETAILS: 5,
    
    ALERT_LIST: 6,
    ALERT_DETAILS: 7,

    STATUS: 8
}

export class Main extends Component {
    constructor(){
        super()
        this.state = {
            menuCode: MenuCode.TASK_LIST
        }
    }
    render(){
        console.log('MAIN', this.state.options,this.state.options)
        return (
            <Grid className="main-container right" ref="main">
                <div className="main">
                    {this.getMainScreen()}
                </div>
            </Grid>
        )
    }
    setContent(menuCode, row, options){
        this.setState({menuCode, row, options})
    }
    getMainScreen(){
        switch(this.state.menuCode){
            case MenuCode.NEWS:
                return <News/>
            case MenuCode.TASK_LIST: 
                return <TaskCards main={this}/>
            case MenuCode.TASK_DETAILS: 
                return <TaskDetails main={this} row={this.state.row} mode={this.state.options.mode}/>
            case MenuCode.PEOPLE_LIST:
                return <PeopleManager/>
            case MenuCode.PEOPLE_DETAILS:
                return <PeopleDetails/>
            case MenuCode.ALERT_LIST:
                return <AlertManager/>
            case MenuCode.ALERT_DETAILS:
                return <AlertDetails/>
            case MenuCode.STATUS:
                return <MyStatus/>
            default: 
                return <div>Error</div>
        }
    }
}