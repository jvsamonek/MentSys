import React, { Component } from 'react'
import { ActionBar } from '../../ActionBar';
import { BottomActionBar } from '../../BottomActionBar';
import { MenuCode } from '../../Main';
import TextField from '@material-ui/core/TextField';
import { timeout } from '../../../Home';
import { Req } from '../../../../Components/Request';

export const TaskMode = {
    SHOW: 1,
    EDIT: 2
}

export class TaskDetails extends Component {
    constructor({main, row, mode}){
        super()
        this.fecthData()
        //expected row = {task: {id, title, content}}
        this.state = {
            main,
            row,
            mode
        }
    }
    async fecthData(){
        //GET REQUEST {loginStatus, task: {id}}
        //expected {task: {id, title, content, imagePath}}
        
        await timeout(500)
        const data = {
            row: {
                id: this.state.row.id,
                title: this.state.row.title,
                content: this.state.row.content,
                imagePath: 'localhost:3000/image' + this.state.row.id
            }
        }

        this.setState(data)
        console.log('Mudou tarefa')
    }
    render(){
        console.log('TASKDETAILS ', this.state)
        if(this.state.mode === TaskMode.EDIT)
            return <TaskDetailsEdit setMode={this.setMode.bind(this)} back={() => this.backToMain()} row={this.state.row}/>
        if(this.state.mode === TaskMode.SHOW)
            return <TaskDetailsShow setMode={this.setMode.bind(this)} back={() => this.backToMain()} row={this.state.row}/>
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

class TaskDetailsEdit extends Component {
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
                    
                            <TextField
                                ref={e => this.ref.imagePath = e}
                                className="task-right-element"
                                id="outlined-name"
                                label="Link da imagem"
                                defaultValue={this.state.row.imagePath || ''}
                                margin="normal"
                                variant="outlined"
                                onChange={e => {this.state.row.imagePath = e.target.value}}
                            />
                    </div>
                    <BottomActionBar actions={this.state.bottomAction}/>
                </div>
            </div>
        )
    }
    async saveTask(){
        //POST REQUEST {loginStatus, task: {id, title, content, imagePath}}
        //expected {success: true | false}
        
        await timeout(500)
        const data = {
            success: true
        }
        if(data.success){
            alert('Tarefa salva com sucesso.')
            this.state.setMode(TaskMode.SHOW, this.state.row)
        }
        else
            alert('Erro ao salvar tarefa!')
        
    }
}
class TaskDetailsShow extends Component {
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

        //POST REQUEST {loginStatus, task: {id}}
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
                            {this.state.row.title || ''}
                        </div>
                        <div className="task-description">
                            {this.state.row.content || ''}
                        </div>
                    </div>
                    <div className="task-right">
                        <img src={this.state.row.imagePath || ''} className="center-cropped" alt="imagem"></img>
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

