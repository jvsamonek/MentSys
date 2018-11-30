import React, { Component } from 'react'
import { ActionBar, Action } from '../ActionBar'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import { MainWaiting, MainMessage } from '../Main';
import { getLoginStatus } from '../../../Components/LoginStatus';
import { Req } from '../../../Components/Request';

export class AlertManager extends Component {
    constructor(){
        super()
        this.state = {
            loading: true,
            row: []
        }
        this.fetchDta()
    }
    async fetchDta(){

        const loginStatus = getLoginStatus()
        const data = await Req.get('/alertasUsuario', {loginStatus})
        if(data.success)
            this.setState({row: data.alertas, loading: false})
        else
            this.setState({row: [], loading: false})
    }
    render(){
        if(this.state.loading)
            return <MainWaiting/>
        if(this.state.row.length === 0)
            return <MainMessage message="Não existem alertas no momento."/>
        return (
            <div className="main-diff">
                <ActionBar title={'Central de Alertas'}/>
                <div className="main-content">
                    <List >
                        {this.state.row.map(r => (
                            <Alert row={r}/>
                        ))}
                    </List>
                </div>
            </div>
        )
    }
}

export class Alert extends Component {
    constructor({ row }){
        super()
        this.state = {
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
                        value={this.state.row.project.title}
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
                </ListItem>
                <Divider />
            </div>
        )
    }
}