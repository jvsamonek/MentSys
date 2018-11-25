import React, { Component } from 'react'
import { ActionBar, Action } from '../ActionBar'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';

export class AlertManager extends Component {
    constructor({}){
        super()
        this.state = {
            alerts: [...Array(10).keys()].map(n => <Alert/>)
        }        
    }
    render(){
        return (
            <div className="main-diff">
                <ActionBar title={'Central de Alertas'}/>
                <div className="main-content">
                    <List >
                        {this.state.alerts}
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