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
    const Joao = new User({name: 'Joao', email:'Joao@email.com', password:'123', logged: false})
    const Eduardo = new User({name: 'Eduardo', email:'Eduardo@email.com', password:'123', logged: false})
    const Flavia = new User({name: 'Flavia', email:'Flavia@email.com', password:'123', logged: false})
    await Joao.save()
    await Eduardo.save()
    await Flavia.save()
    const allUsers = await User.find().exec();

    const P1 = new Projeto({title: 'Software 1', descricao: 'Software um deve ser feito assim', startDate: new Date(2018, 11, 24), endDate: new Date(2019, 2, 15), imagePath: 'p1.jpg'})
    const P2 = new Projeto({title: 'Software 2', descricao: 'Software um deve ser feito assim', startDate: new Date(2018, 11, 24), endDate: new Date(2018, 12, 24), imagePath: 'p2.jpg'})
    await P1.save()
    await P2.save()
    const allProjetos = await Projeto.find().exec();

    const S1 = new Status({name: 'URGENTE'})
    const S2 = new Status({name: 'PENDENTE'})
    const S3 = new Status({name: 'COMPLETO'})
    await S1.save()
    await S2.save()
    await S3.save()
    const allStatus = await Status.find().exec();

    const A1 = new Tarefa({status: allStatus[0]._id, user: [allUsers[0]._id, allUsers[1]._id, allUsers[2]._id], projeto: allProjetos[0]._id})
    const A2 = new Tarefa({status: allStatus[1]._id, user: [allUsers[2]._id], projeto: allProjetos[1]._id})
    await A1.save()
    await A2.save()
    const allTarefas = await Tarefa.find().exec();

    const Al1 = new Alerta({reason: 'Prazo', projeto: allProjetos[0]._id, user: allUsers[2]._id})
    const Al2 = new Alerta({reason: 'Motivo', projeto: allProjetos[1]._id, user: allUsers[2]._id})
    await Al1.save()
    await Al2.save()
    const allAlertas = await Alerta.find().exec()

    mongoose.disconnect()
}()
