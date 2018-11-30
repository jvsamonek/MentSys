import React, { Component } from 'react'
import { ActionBar, Action } from '../ActionBar'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import { MenuCode, MainWaiting, MainMessage } from '../Main';
import { timeout } from '../../Home';
import { getLoginStatus } from '../../../Components/LoginStatus';
import { Req } from '../../../Components/Request';

export class TaskManagement extends Component {
    constructor({title, main}){
        super()
        this.fetchData()
        this.state = {
            loading: true,
            row: [],
            main
        }        
    }
    async fetchData(){
        const loginStatus = getLoginStatus()
        const data = await Req.get('/todasTarefas', {loginStatus})
        if(data.success)
            this.setState({row: data.allTarefas, loading: false})
        else
            this.setState({loading: false})
    }
    render(){
        if(this.state.loading)
            return <MainWaiting></MainWaiting>
        if(this.state.row.length === 0)
            return <MainMessage message="Não existem atividades no momento."/>
        return (
            <div className="main-diff">
                <ActionBar title={'Central de Atividades'}/>
                <div className="main-content">
                    <List >
                        {this.state.row.map(activity => 
                            <TaskLine main={this.state.main} row={activity}/>
                        )}
                    </List>
                </div>
            </div>
        )
    }
}

export class TaskLine extends Component {
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