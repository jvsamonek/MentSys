import React, { Component } from 'react'
import { ActionBar, Action } from '../ActionBar'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import { timeout } from '../../Home';

export class AlertManager extends Component {
    constructor(){
        super()
        this.fetchDta()
        this.state = {
            row: []
        }        
    }
    async fetchDta(){
        //GET REQUEST {loginStatus}
        //expected {alerts: [{reason, task: {_id, name}, status: {name},...]}
        
        await timeout(500)
        const data = {
            row: 
                [...Array(0 | (5 + Math.random() * 10)).keys()]
                    .map(n => ({
                        reason: 'Passou do prazo', 
                        task: {
                            _id: n, 
                            name: 'Tarefa ' + n
                        }, 
                        status: {
                            name: 'GRAVE'
                        }
                    }))
        }
        this.setState(data)
    }
    render(){
        return (
            <div className="main-diff">
                <ActionBar title={'Central de Alertas'}/>
                <div className="main-content">
                    <List >
                        {this.state.row.map(() => (
                            <Alert/>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export class Alert extends Component {
    constructor({ }){
        super()
        this.state = {
            row: {
                status: 'GRAVE',
                task: 'Primeira Tarefa',
                reason: 'Passou do prazo'
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
                        label="Motivo"
                        value={this.state.row.reason}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '30%',
                            margin: '10px'
                        }}
                    />
                    <TextField
                        className="task-manager-title left"
                        id="outlined-name"
                        label="Tarefa"
                        value={this.state.row.task}
                        margin="normal"
                        variant="outlined"
                        style={{
                            width: '30%',
                            margin: '10px'
                        }}
                    />
                    <ListItemIcon className="row-status">
                        {this.state.row.status}
                    </ListItemIcon>
                </ListItem>
                <Divider />
            </div>
        )
    }
}