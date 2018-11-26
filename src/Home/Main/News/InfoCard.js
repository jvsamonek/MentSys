import React, {Component} from 'react';
import CardM from '@material-ui/core/Card';

export class InfoCard extends React.Component {
  render() {
    return (      
        <CardM className="info-card ">
            {[...Array(10).keys()].map(n => <BarInfo value={0 | Math.random()* 100}/>)}
        </CardM>
    )
  }
}

class BarInfo extends Component{
    constructor({ value }){
        super()
        this.state = {
            row: {
                name: 'Tarefas Pendentes',
                value
            }
        }
    }
    render(){
        return (
            <div className="info-bar">
                    <div className="info-bar-value">
                        {this.state.row.value}
                    </div>
                <div className="info-bar-status"
                    style={{
                        height: this.state.row.value + '%'
                    }}
                >
                    <div className='info-bar-title'>
                        Tarefas
                    </div>
                </div>                
            </div>
        )
    }
}