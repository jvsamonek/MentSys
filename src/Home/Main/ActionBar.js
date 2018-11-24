import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export class ActionBar extends Component {
    constructor({title, back, actions = []}){
        super()
        this.state = {
            title,
            back,
            actions: actions
                .map(a => 
                    <Action 
                        title={a.name} 
                        action={a.action} 
                    />)
        }        
    }
    render(){
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                    <div className="back-buton">
                        {this.state.back &&
                            <Action title="Voltar" action={this.state.back}/>
                        }
                    </div>
                    <Typography variant="h6" color="inherit">
                        {this.state.title}
                    </Typography>
                    <div className="right">
                        {this.state.actions}
                    </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

class Action extends Component {
    constructor({title, action}){
        super()
        this.state = {
            title,
            action
        }
    }
    render(){
        return (
            <div class="action-button">
                <Button 
                variant="outlined" 
                size="small"
                onClick={this.state.action}
                >
                    {this.state.title}
                </Button>
            </div>
        )
    }
}
