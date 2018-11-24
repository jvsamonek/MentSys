import React, { Component } from 'react'
import { TaskList } from './TaskCards/TaskList';
import { TaskDetails } from './Task/TaskDetails';
import { PeopleManager } from './PeopleManager/PeopleMagaer';

import Grid from '@material-ui/core/Grid';

export const MenuCode = {
    TASK_DETAILS: 0,
    TASK_LIST: 1,
    TASK_MANAGER: 2
}

export class Main extends Component {
    constructor(){
        super()
        this.state = {
            menuCode: MenuCode.TASK_LIST
        }
    }
    setContent(menuCode){
        this.setState({menuCode})
    }
    render(){
        let content = ''
        switch(this.state.menuCode){
            case MenuCode.TASK_LIST: 
                content = <TaskList main={this}/>
                break
            case MenuCode.TASK_DETAILS: 
                content = <TaskDetails main={this}/>
                break
            case MenuCode.TASK_MANAGER: 
                content = <PeopleManager/>
                break
            default: 
                content = <div>Error</div>
        }
        return (
            <Grid className="main-container right" ref="main">
                <div className="main">
                    {content}
                </div>
            </Grid>
        )
    }
}