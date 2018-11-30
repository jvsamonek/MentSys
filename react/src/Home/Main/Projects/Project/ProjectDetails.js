import React, { Component } from 'react'
import { ActionBar } from '../../ActionBar';
import { BottomActionBar } from '../../BottomActionBar';
import { MenuCode, MainWaiting } from '../../Main';
import TextField from '@material-ui/core/TextField';
import { timeout } from '../../../Home';
import { Req } from '../../../../Components/Request';

export const TaskMode = {
    SHOW: 1,
    EDIT: 2
}

export class ProjectDetails extends Component {
    constructor({main, row, mode}){
        super()
        this.fetchData()
        //expected row = {task: {_id, title, content}}
        this.state = {
            loading: true,
            main,
            row,
            mode
        }
    }
    async fetchData(){
        //GET REQUEST {loginStatus, task: {_id}}
        //expected {task: {_id, title, content, imagePath}}
        
        await timeout(500)
        const data = {
            loading: false,
            row: {
                _id: this.state.row._id || 0,
                title: this.state.row.title || 'Novo titulo',
                content: this.state.row.content || 'Novo content',
                startDate: new Date().toISOString().slice(0, 10),
                endDate: new Date().toISOString().slice(0, 10),
                imagePath: '/images/ind3.jpg'//'localhost:3000/image' + this.state.row.id
            }
        }

        this.setState(data)
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

class ProjectDetailsEdit extends Component {
    constructor({ setMode, back, row }){
        super()
        this.state = {
            setMode,
            back,
            row,
            bottomAction: [
                {name: 'Salvar', action: () => this.saveTask()}
            ]
        }
        this.ref = {

        }
    }
    render(){
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
                                defaultValue={this.state.row.content || ''}
                                margin="normal"
                                variant="outlined"
                                onChange={e => {this.state.row.content = e.target.value}}
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
                                    onChange={(e) => this.state.row.startDate = e.target.value}
                                    id="date"
                                    label="Inicio"
                                    type="date"
                                    defaultValue={this.state.row.startDate || '2018-11-26'}
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
                                    onChange={(e) => this.state.row.endDate = e.target.value}
                                    id="date"
                                    label="Fim"
                                    type="date"
                                    defaultValue={this.state.row.endDate || '2018-11-26'}
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
    async saveTask(){

        /*const form = this.verifyFields()

        if(!form.valid){
            alert(form.message)
            return
        }*/
        //POST REQUEST {loginStatus, task: {_id, title, content, imagePath}}
        //expected {success: true | false}
        const projeto = {
            title: this.state.row.title,
            imagePath: this.state.row.imagePath,
            description: this.state.row.content
        }
        debugger
        const data = await Req.post("/salvarProjeto", projeto)
        debugger
        if(data.success){
            alert('Projeto salvo com sucesso.')
            this.state.setMode(TaskMode.SHOW, this.state.row)
        }
        else
            alert('Erro ao salvar projeto!')
        
    }
    verifyFields(){
        if(this.state.row.title)
            return {message: 'É necessario preencher o titulo.', valid: false}
        if(this.state.row.content)
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
                {name: 'Deletar tarefa', action: () => this.deleteTask()}
            ]
        }
    }
    async deleteTask(){
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm('Tem certeza de que quer deletar a tarefa?')
        if(!confirmed)
            return

        //POST REQUEST {loginStatus, task: {_id}}
        //expected {success: true | false}

        await timeout(500)
        const data = {
            success: true
        }

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
                            {this.state.row.content}
                        </div>
                    </div>
                    <div className="task-right">
                        <div className="estimate-field">
                            Inicio <b>{this.state.row.startDate}</b>   Fim estimado: <b>{this.state.row.startDate}</b>
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

