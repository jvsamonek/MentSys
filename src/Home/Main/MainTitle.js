import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export class MainTitle extends Component {
    constructor({title, back}){
        super()
        this.state = {
            title,
            back
        }        
    }
    render(){
        let backButton = ''
        if(this.state.back)
            backButton = <Button className="left" onClick={this.state.back}>Voltar</Button>
                
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        {backButton}
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        {this.state.title}
                    </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
        
            /*return (
            <div className="main-title">
                {backButton}
                {this.state.title}
            </div>
        )*/
    }
}