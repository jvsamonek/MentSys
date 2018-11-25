import React, { Component } from 'react'
import { ActionBar } from '../ActionBar';

export class News extends Component {
    constructor({}){
        super()
    }
    render(){
        return (            
            <div className="main-diff">
                <ActionBar title={'Novidades'} actions={[]}/>
                <div className="main-content">
                    {this.state}
                </div>
            </div>
        )
    }
}