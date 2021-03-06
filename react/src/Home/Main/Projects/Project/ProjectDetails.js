import React, { Component } from 'react'
import { ActionBar } from '../../ActionBar';
import { BottomActionBar } from '../../BottomActionBar';
import { MenuCode, MainWaiting } from '../../Main';
import TextField from '@material-ui/core/TextField';
import { Req } from '../../../../Components/Request';
import { getLoginStatus } from '../../../../Components/LoginStatus';

export const TaskMode = {
    SHOW: 1,
    EDIT: 2
}

export class ProjectDetails extends Component {
    constructor({main, row, mode}){
        super()
        this.state = {
            loading: true,
            main,
            row,
            mode
        }
        this.fetchData()
    }
    async fetchData(){
        const loginStatus = getLoginStatus()
        const task = {_id: this.state.row._id}
        const data = await Req.get('/especificoProjeto', {loginStatus, task})

        if(data.success)
            this.setState({row: data.task, loading: false})
        else
            this.setState({loading: false})
    }
    render(){
        if(this.state.loading)
            return <MainWaiting/>
        if(this.state.mode === TaskMode.EDIT)
            return <ProjectDetailsEdit setMode={this.setMode.bind(this)} back={() => this.backToMain()} row={this.state.row}/>
        if(this.state.mode === TaskMode.SHOW)
            return <ProjectDetailsShow setMode={this.setMode.bind(this)} back={() => this.backToMain()} row={this.state.row}/>
        else
            return <div>Error in Task details</div>
    }
    backToMain(){
        this.state.main.setContent(MenuCode.TASK_LIST)
    }
    setMode(mode){
        this.setState({mode})
    }
}

export function formatDate(d){
    let [year, month, day] = [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    if(month < 10)
        month = '0' + month
    if(day < 10)
        day = '0' + day
    return [year, month, day].join('-')

}
class ProjectDetailsEdit extends Component {
    constructor({ setMode, back, row }){
        super()
        this.state = {
            setMode,
            back,
            row,
            bottomAction: [
                {name: 'Salvar', action: () => this.saveProject()}
            ]
        }
        this.ref = {

        }
    }
    render(){
        const s = new Date(this.state.row.startDate)
        const e = new Date(this.state.row.endDate)
        return (
            <div className="main-diff">
                <ActionBar back={() => this.state.back()}/>
                <div className="main-content">
                    <div className="task-left">
                        <div className="task-title">
                            <TextField
                                id="outlined-name"
                                label="Título"
                                defaultValue={this.state.row.title || ''}
                                margin="normal"
                                variant="outlined"
                                onChange={e => {this.state.row.title = e.target.value}}
                            />
                        </div>
                        <div className="task-description">
                            <TextField
                                className="full"
                                id="outlined-multiline-static"
                                label="Descrição"
                                multiline
                                rows="25"
                                defaultValue={this.state.row.description}
                                margin="normal"
                                variant="outlined"
                                onChange={e => {this.state.row.description = e.target.value}}
                            />
                        </div>
                    </div>
                    <div className="task-right">
                            <div style={{width: '100%', height: '30px', margin: '35px 0 0 0'}}>                    
                                <TextField
                                    style={{
                                        margin: '10px',
                                        width: '45%',
                                        float: 'left'
                                    }}
                                    onChange={ (e) => {
                                            const [year, month, day] = e.target.value.split('-').map(s => +s)
                                            this.state.startDate = new Date(year, month - 1, day).toString()
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
                                        width: '45%',
                                        float: 'left'
                                    }}
                                    onChange={(e) => {
                                        const [year, month, day] = e.target.value.split('-').map(s => +s)
                                            this.state.endDate = new Date(year, month - 1, day).toString()
                                    }}
                                    id="date"
                                    label="Fim"
                                    type="date"
                                    defaultValue={formatDate(e)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="task-right-element">
                                <TextField
                                    style={{width: '100%'}}
                                    ref={e => this.ref.imagePath = e}
                                    id="outlined-name"
                                    label="Link da imagem"
                                    defaultValue={this.state.row.imagePath || ''}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={e => {this.state.row.imagePath = e.target.value}}
                                />
                            </div>
                    </div>
                    <BottomActionBar actions={this.state.bottomAction}/>
                </div>
            </div>
        )
    }
    async saveProject(){
        const loginStatus = getLoginStatus()
        const project = this.state.row
        const data = await Req.post("/salvarProjeto", {loginStatus, project})
        if(data.success){
            alert('Projeto salvo com sucesso.')
            this.state.setMode(TaskMode.SHOW)
        }
        else
            alert('Erro ao salvar projeto!')
        
    }
    verifyFields(){
        if(this.state.row.title)
            return {message: 'É necessario preencher o titulo.', valid: false}
        if(this.state.row.description)
            return {message: 'É necessario preencher a descrição.', valid: false}
        if(this.state.row.startDate)
            return {message: 'É necessario preencher a data de inicio.', valid: false}
        if(this.state.row.endDate)
            return {message: 'É necessario preencher a data final.', valid: false}
        else
            return {valid: true}
    }
}
class ProjectDetailsShow extends Component {
    constructor({ setMode, back, row }){
        super()
        this.state = {
            back,
            row,
            bottomAction: [
                {name: 'Editar',action: () => setMode(TaskMode.EDIT)},
                {name: 'Deletar tarefa', action: () => this.deleteProject()}
            ]
        }
    }
    async deleteProject(){
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm('Tem certeza de que quer deletar a tarefa?')
        if(!confirmed)
            return
        const project = this.state.row
        const data = await Req.post('/deletarProjeto', {project})
        if(data.success){
            alert('Tarefa deletada com sucesso')
            this.state.back()
        }
        else
            alert('Não foi possivel deletar a tarefa!')
    }
    render(){
        return (
            <div className="main-diff">
                <ActionBar back={() => this.state.back()}/>
                <div  className="main-content">
                    <div className="task-left">
                        <div className="task-title">
                            {this.state.row.title}
                        </div>
                        <div className="task-description">
                            {this.state.row.description}
                        </div>
                    </div>
                    <div className="task-right">
                        <div className="estimate-field">
                            Inicio 
                                <b>{this.state.row.startDate &&
                                    this.state.row.startDate.slice(0, 10)}</b>   
                            Fim estimado:                                 
                                <b>{this.state.row.startDate && 
                                    this.state.row.startDate.slice(0, 10)}</b>
                        </div>
                        <br></br>
                        <div className="task-image" >
                            <img 
                                src={this.state.row.imagePath} 
                                alt=" Imagem não disponivel."></img>
                        </div>
                    </div>
                    <BottomActionBar actions={this.state.bottomAction}/>
                </div>
            </div>
        )
    }
    editTask(){
        this.setState({mode: TaskMode.EDIT})
    }
}

