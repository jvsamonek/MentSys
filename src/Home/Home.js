import  React, { Component } from 'react'
import { Header } from './Header/Header'
import { SideMenu } from './SideMenu/SideMenu';
import { Main } from './Main/Main';

export class Home extends Component { 
  render() {
    this.main = {}
    return (
      <div>
        <div>
          <Header/>
        </div>
        <div className="content">
            <SideMenu home={this}/>
            <Main ref={e => this.main = e}/>
        </div>
      </div>
    )
  }
}
