/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import TextField from '@material-ui/core/TextField';
import { Req } from '../../Components/Request';
import { setLoginStatus, getLoginStatus } from '../../Components/LoginStatus';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

class SimpleDialog extends React.Component {
    state = {
        row: {
            email: '',
            password: ''
        }
    }
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };
  makeLogin = async () => {
    const loginStatus = {
      email: this.state.row.email,
      password: this.state.row.password
    }
    const data = await Req.post('/login', {loginStatus})
    if(data.success){
      
      localStorage.setItem('loginStatus', JSON.stringify(data.user))
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
    else
      alert('Não foi possivel se conectar.')
  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Se conectar como...</DialogTitle>
        <div>
          <List>
          <ListItem button>                
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={e => {this.state.row.email = e.target.value}}
                />
            </ListItem>
            <ListItem button>                
                <TextField
                    required
                    type="password"
                    id="outlined-required"
                    label="Senha"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={e => {this.state.row.password = e.target.value}}
                />
            </ListItem>
            <ListItem button onClick={() => this.makeLogin()}>
              <ListItemAvatar>
                <Avatar>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Entrar" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
    constructor({}){
        super()
        this.state = {
            open: false,
            selectedValue: emails[1],
        };
    }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const loginStatus = getLoginStatus()
    let content
    if(loginStatus._id)
        content = <Button onClick={this.logout}>{loginStatus.name} - DESCONECTAR</Button>
    else
        content = <Button onClick={this.handleClickOpen}>Login</Button>
    return (
      <div
      className="login-box full">
        {content}
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
  logout = async () => {
    const loginStatus = getLoginStatus()
    
    const data = await Req.post('/logoff', {loginStatus})
    if(data.success){
      alert("Você foi desconectado.")
      
      setLoginStatus(null)
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
    else
      alert("Não foi possivel desconectar.")
  }
}

export default SimpleDialogDemo;

//JSON.parse(localStorage.getItem('loginStatus'))
//localStorage.setItem('loginStatus', JSON.stringify({name: 'Guilherme'}))