import React, { Component } from 'react'
import { ActionBar, Action } from '../ActionBar'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import { MenuCode } from '../Main';

export class PeopleManager extends Component {
    constructor({title, main}){
        super()
        this.state = {
            tasks: [...Array(10).keys()].map(n => <PeopleLine main={main}/>)
        }        
    }
    render(){
        return (
            <div className="main-diff">
                <ActionBar title={'Central de Atribuições'}/>
                <div className="main-content">
                    <List >
                        {this.state.tasks}
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
            row: {
                task: {
                    id: 111,
                    title: 'titulo',
                    content: 'descricao',
                    start: new Date().toLocaleDateString(),
                    end: new Date().toLocaleDateString(),
                    image: 'none',
                    userId: 1,
                    statusId: 2
                },
                user: {
                    id: 1,
                    name: 'Guilherme Rocha'                    
                },
                status: {
                    id: 2,
                    name: 'PROBLEMA'
                }
            }
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
                        onChange={e => {this.state.row.task.title = e.target.value}}
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
                        onChange={e => {this.state.row.user.name = e.target.value}}
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