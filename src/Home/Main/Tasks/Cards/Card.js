import React, { Component } from 'react'
import { CardTitle } from './CardTitle';
import { MenuCode } from '../../Main';

import CardM from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { TaskMode } from '../Task/TaskDetails';
import { timeout } from '../../../Home';

export class Card extends Component {

    constructor({main, row}){
        super()
        this.state = {
            row,
            main
        }
    }
    render(){
        return (
            <CardM className="card left">
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.state.row.title}
                    </Typography>
                    <Typography component="p">
                        {this.state.row.content.slice(0, 420) + '...'}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => this.showTaskDetails()}>
                        Visualizar
                    </Button>
                    <Button size="small" color="primary" onClick={() => this.editTaskDetails()}>
                        Editar
                    </Button>
                </CardActions>
            </CardM>
        )
    }
    showTaskDetails = () => {        
        this.state.main.setContent(MenuCode.TASK_DETAILS, this.state.row, {mode: TaskMode.SHOW})
    }
    editTaskDetails = () => {        
        this.state.main.setContent(MenuCode.TASK_DETAILS, this.state.row, {mode: TaskMode.EDIT})
    }
}