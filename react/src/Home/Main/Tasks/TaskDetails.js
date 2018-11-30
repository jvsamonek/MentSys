import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';
import { MenuCode, MainWaiting } from '../Main';
import TextField from '@material-ui/core/TextField';
import { Select } from '../../../Components/Select';
import { BottomActionBar } from '../BottomActionBar';
import { timeout } from '../../Home';
import { getLoginStatus } from '../../../Components/LoginStatus';
import { Req } from '../../../Components/Request';
import { formatDate } from '../Projects/Project/ProjectDetails'

export class TaskDetails extends Component {
    constructor({ main, row }){
        super()
        this.state = {
            loading: true,
            main,
            row,
            status: [],
            users: [],
            bottomAction: [
                {name: 'Salvar', action: () => this.saveTask()}
            ]
        }
        this.fetchData()
    }
    async fetchData(){
        const data = {}
        const loginStatus = getLoginStatus()
        const statusRequest = await Req.get('/todosStatus')
        if(statusRequest.success)
            data.status = statusRequest.allStatus
        const usersRequest = await Req.get('/todosUsuarios')
        if(usersRequest.success)
            data.users = usersRequest.allUsers
        const taskRequest = await Req.get('/tarefaEspecifica', {loginStatus, task: {_id: this.state.row._id}})
        if(taskRequest.success)
            data.row = taskRequest.task
        data.loading = false
        this.setState(data)
    }
    render(){
        if(this.state.loading)
            return <MainWaiting/>
        this.status = <Select className="left" title='Status' value={this.state.row.status._id} options={this.state.status}/>
        this.user = <Select className="left" title='Responsavel' value={this.state.row.user._id} options={this.state.users}/>

        const s = new Date(this.state.row.startDate)
        const e = new Date(this.state.row.endDate)
        return (
            <div className="main-diff">
                <ActionBar title="Propriedades da Atividade"
                    back={() => this.back()}
                />
                <div className="main-content">
                    <div style={{margin: '0 60px 0 20px'}}>
                        {this.status}
                        <TextField
                                style={{
                                    margin: '10px',
                                    width: '80%'
                                }}
                            className="task-manager-title left"
                            id="outlined-name"
                            label="Projeto"
                            value={this.state.row.project.title}
                            margin="normal"
                            variant="outlined"
                            onChange={e => {this.state.row.project.title = e.target.value}}
                        />
                        <div>
                            <TextField
                                style={{
                                    margin: '10px',
                                    width: '38%'
                                }}
                                onChange={ (e) => {
                                    const [year, month, day] = e.target.value.split('-').map(s => +s)
                                    this.state.row.startDate = new Date(year, month - 1, day).toString()
                                }}
                                id="date"
                                label="Inicio"
                                type="date"
                                defaultValue={formatDate(s)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                style={{
                                    margin: '10px',
                                    width: '38%'
                                }}
                                onChange={ (e) => {
                                    const [year, month, day] = e.target.value.split('-').map(s => +s)
                                    this.state.row.endDate = new Date(year, month - 1, day).toString()
                                }}
                                id="date"
                                label="Fim"
                                type="date"
                                defaultValue={formatDate(e)}
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