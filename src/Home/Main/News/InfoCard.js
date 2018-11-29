import React, {Component} from 'react';
import CardM from '@material-ui/core/Card';

export class InfoCard extends React.Component {
    constructor({ bars }){
        super()
        this.state = {
            bars
        }
    }

    render() {
        return (      
            <CardM className="info-card">
                {this.state.bars.map(b => <BarInfo name ={b.name} value={b.value}/>)}
            </CardM>
        )
    }
}

class BarInfo extends Component{
    constructor({ value, name }){
        super()
        this.state = {
            name,
            value
        }
    }
    render(){
        return (
            <div className="info-bar">
                    <div className="info-bar-value">
                        {this.state.value}
                    </div>
                <div className="info-bar-status"
                    style={{
                        height: this.state.value + '%'
                    }}
                >
                    <div className='info-bar-title'>
                        {this.state.name}
                    </div>
                </div>                
            </div>
        )
    }
}