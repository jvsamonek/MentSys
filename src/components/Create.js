import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      email: '',
      password: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, phone, email, password } = this.state;

    axios.post('/api/user', { name, phone, email, password })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { name, phone, email, password } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD USER
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> User List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" class="form-control" name="phone" value={phone} onChange={this.onChange} placeholder="Phone" />
              </div>
              <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="text" class="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
