import React ,{ Component } from 'react'

export class LoginBox extends Component{
    render(){
        return (
            <div className="login-box right">
                <table>
                    <tbody>
                        <tr>
                            <td>Nome</td>
                            <td><input type="text" id="password"></input></td>
                        </tr>
                        <tr>
                            <td>Senha</td>
                            <td><input type="text" id="name"></input></td>
                            <td><button>Entrar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}