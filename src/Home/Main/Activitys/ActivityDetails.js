import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import { MenuCode } from '../Main';
import TextField from '@material-ui/core/TextField';
import { Select } from '../../../Components/Select';
import { BottomActionBar } from '../BottomActionBar';
import { timeout } from '../../Home';
import { Req } from '../../../Components/Request';

export class ActivityDetails extends Component {
    constructor({ main, row }){
        super()
        this.fetchData()
        //expected row: {_id, status: {name}, task: {title}, user: {name}}
        this.state = {
            main,
            row,
            status: [
                {_id: 0, name: 'ANTES'},
                {_id: 1, name: 'ANTES'},
                {_id: 2, name: 'ANTES'}
            ],
            users: [],
            bottomAction: [
                {name: 'Salvar', action: () => this.saveTask()}
            ]
        }
    }
    async fetchData(){
        //GET REQUEST {loginSatus, activity: {_id}}
        //expected {activity: {_id} status: {_id}, task: {_id} title, startDate, endDate}, user: {_id}}}

        //GET REQUEST {}
        //expected {status: [{_id} name}, ...]}
        
        //GET REQUEST {}
        //expected {users: [{_id} name}, ...]}

        await timeout(500)
        const data = {
            row: {
                _id: 55, 
                status: {_id: 1}, 
                task: {
                    _id: 33, 
                    title: 'titulo',
                    startDate: new Date().toLocaleDateString(),
                    endDate: new Date().toLocaleDateString()
                }, 
                user: {
                    _id: 1
                }
            },
            status: [
                {_id: 0, name: 'PENDENTE'},
                {_id: 1, name: 'ATRASADO'},
                {_id: 2, name: 'CONCLUIDO'}
            ],
            users: [
                {_id: 0, name: 'Guilherme'},
                {_id: 1, name: 'Gabriel'},
                {_id: 2, name: 'Amanda'},
            ]
        }
        debugger
        //this.status._self.setState({value: data.row.status._id, options: data.status})
        this.setState(data)
    }
    render(){
        this.status = <Select className="left" title='Status' value={this.state.row.status._id} options={this.state.status}/>
        this.user = <Select className="left" title='Responsavel' value={this.state.row.user._id} options={this.state.users}/>
        
        return (
            <div className="main-diff">
                <ActionBar title="Propriedades da Atividade"
                    back={() => this.back()}
                />
                <div className="main-content">
                    <div style={{margin: '20px'}}>
                        <TextField
                            className="task-manager-title left"
                            id="outlined-name"
                            label="Tarefa"
                            value={this.state.row.task.title}
                            margin="normal"
                            variant="outlined"
                            onChange={e => {this.state.row.task.title = e.target.value}}
                        />
                        {this.status}
                        <div>
                            <TextField
                                style={{
                                    margin: '10px',
                                    width: '38%'
                                }}
                                onChange={(e) => this.state.row.task.start = e.target.value}
                                id="date"
                                label="Inicio"
                                type="date"
                                defaultValue={this.state.row.task.start}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{
                                    margin: '10px',
                                    width: '38%'
                                }}
                                onChange={(e) => this.state.row.task.end = e.target.value}
                                id="date"
                                label="Fim"
                                type="date"
                                defaultValue={this.state.row.task.start}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {this.user}
                        </div>
                    </div>
                    <BottomActionBar actions={this.state.bottomAction}/>
                </div>
            </div>
        )
    }
    back(){
        this.state.main.setContent(MenuCode.PEOPLE_LIST)
    }
    async saveTask(){
        //POST REQUEST {loginStatus, activity: {_id} status: {_id}, task: {_id} startDate, endDate}, user: {_id}}}
        //expected {success: true | false}

        await timeout(500)
        const data = {
            success: true
        }
        if(data.success){
            alert('Atividade salva com sucesso.')
        }
        else
            alert('Erro ao salvar atividade!')
    }
}