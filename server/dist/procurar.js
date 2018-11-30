const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp')
const {User} = require('./models/User')
const {Projeto} = require('./models/Projeto')
const {Alerta} = require('./models/Alerta')
const {Tarefa} = require('./models/Tarefa')
const {Status} = require('./models/Status')

function popular(){
    
}
!async function main(){
    const allUsers = await User.find().exec();

    const allProjetos = await Projeto.find().exec();

    const allStatus = await Status.find().exec();

    const allTarefas = await Tarefa.find().exec();

    const allAlertas = await Alerta.find().exec()

    console.log(allTarefas)
    mongoose.disconnect()
}()
