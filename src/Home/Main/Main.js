import React, { Component } from 'react'
import { TaskCards } from './Tasks/TaskCards';
import { TaskDetails } from './Tasks/Task/TaskDetails';
import { PeopleManager } from './Activitys/ActivityManager';

import Grid from '@material-ui/core/Grid';
import { News } from './News/News';
import { ActivityDetails } from './Activitys/ActivityDetails';
import { AlertManager } from './Alerts/AlertManager';
import { UserStatus } from './Status/UserStatus';
import { ActionBar } from './ActionBar';
import CircularProgress from '@material-ui/core/CircularProgress';

export const MenuCode = {
    NEWS: 1,

    TASK_LIST: 2,
    TASK_DETAILS: 3,

    PEOPLE_LIST: 4,    
    PEOPLE_DETAILS: 5,
    
    ALERT_LIST: 6,

    STATUS: 8
}

export class Main extends Component {
    constructor(){
        super()
        this.state = {
            menuCode: MenuCode.NEWS
        }
    }
    render(){
        console.log('MAIN', this.state.options,this.state.options)
        return (
            <Grid className="main-container right bounceInLeft" ref="main">
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
                return <PeopleManager main={this}/>
            case MenuCode.PEOPLE_DETAILS:
                return <ActivityDetails main={this} row={this.state.row}/>
            case MenuCode.ALERT_LIST:
                return <AlertManager/>
            case MenuCode.STATUS:
                return <UserStatus/>
            default: 
                return <div>Error</div>
        }
    }
}

export class MainWaiting extends Component{
    constructor({ message, loading = true}){
        super()
        this.state = {
            message: message || 'Carregando',
            loading
        }
    }
    render(){        
        return (
        <div className="main-diff">
            <ActionBar/>
            <div className="main-content center-message">
                {this.state.loading && <CircularProgress/>}
                <div style={{margin: '20px'}}>
                    {this.state.message}
                </div>
            </div>
        </div>)
    }
}
