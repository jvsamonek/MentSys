import React, { Component } from 'react'
import { ActionBar, Action } from '../ActionBar'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import { MenuCode } from '../Main';
import { timeout } from '../../Home';

export class PeopleManager extends Component {
    constructor({title, main}){
        super()
        this.fetchData()
        this.state = {
            row: [],
            main
        }        
    }
    async fetchData(){
        //GET REQUEST {loginStatus}
        //expected [{_id, status: {name}, task: {title}, user: {name}}]

        await timeout(500)
        const data = {
            row: [...Array(10).keys()]
                .map(n => ({
                    _id: n,
                    status: {
                        name: 'PENDENTE'
                    },
                    task: {
                        title: 'Tarefa ' + n + 1
                    }, 
                    user: {
                        name: 'Guilherme'
                    }
                }))
        }
        this.setState(data)
    }
    render(){
        return (
            <div className="main-diff">
                <ActionBar title={'Central de Atividades'}/>
                <div className="main-content">
                    <List >
                        {this.state.row.map(activity => 
                            <PeopleLine main={this.state.main} row={activity}/>
                        )}
                    </List>
                </div>
            </div>
        )
    }
}

export class PeopleLine extends Component {
    constructor({ row, main }){
        super()
        this.state = {
            main,
            row       
        }
    }
    render(){
        return (            
            <div>
                <ListItem button className="task-line">
                    
                    <TextField
                        className="task-manager-title left"
                        id="outlined-name"
                        label="Tarefa"
                        value={this.state.row.task.title}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '30%',
                            margin: '10px'
                        }}
                    />
                    <ListItemIcon className="row-status">
                        {this.state.row.status.name}
                    </ListItemIcon>
                    <TextField
                        className="task-manager-title left"
                        id="outlined-name"
                        label="Responsavel"
                        value={this.state.row.user.name}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '30%',
                            margin: '10px'
                        }}
                    />
                    <Action 
                        title={'MODIFICAR'} 
                        size={'large'} 
                        action={() => this.openTaskManager()}/>
                </ListItem>
                <Divider />
            </div>
        )
    }
    openTaskManager(){
        this.state.main.setContent(MenuCode.PEOPLE_DETAILS, this.state.row)
    }
}