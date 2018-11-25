import React, { Component } from 'react'
import { ActionBar } from '../../ActionBar';
import { BottomActionBar } from '../../BottomActionBar';
import { MenuCode } from '../../Main';
import TextField from '@material-ui/core/TextField';

export const TaskMode = {
    SHOW: 1,
    EDIT: 2
}

export class TaskDetails extends Component {
    constructor({main, row, mode}){
        super()
        this.state = {
            main,
            row,
            mode
        }
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
                                defaultValue={this.state.row.title}
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
                                defaultValue={this.state.row.content}
                                margin="normal"
                                variant="outlined"
                                onChange={e => {this.state.row.content = e.target.value}}
                            />
                        </div>
                    </div>
                    <div className="task-right">
                    
                            <TextField
                                ref={e => this.ref.image = e}
                                className="task-right-element"
                                id="outlined-name"
                                label="Link da imagem"
                                defaultValue={this.state.row.image}
                                margin="normal"
                                variant="outlined"
                                onChange={e => {this.state.row.image = e.target.value}}
                            />
                    </div>
                    <BottomActionBar actions={this.state.bottomAction}/>
                </div>
            </div>
        )
    }
    saveTask(){
        //make post request
        this.state.setMode(TaskMode.SHOW, this.state.row)

    }
}
class TaskDetailsShow extends Component {
    constructor({ setMode, back, row }){
        super()
        this.state = {
            back,
            row,
            bottomAction: [
                {name: 'Editar',action: () => setMode(TaskMode.EDIT)}                
            ]
        }
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
                        <img src={this.state.row.image} className="center-cropped" alt="imagem"></img>
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

