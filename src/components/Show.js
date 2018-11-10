import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get('/api/user/'+this.props.match.params.id)
      .then(res => {
        this.setState({ user: res.data });
        console.log(this.state.user);
      });
  }

  delete(id){
    console.log(id);
    axios.delete('/api/user/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {this.state.user.phone}
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> User List</Link></h4>
            <dl>
              <dt>Name:</dt>
              <dd>{this.state.user.name}</dd>
              <dt>Phone:</dt>
              <dd>{this.state.user.phone}</dd>
              <dt>Email:</dt>
              <dd>{this.state.user.email}</dd>
              <dt>Password:</dt>
              <dd>{this.state.user.password}</dd>
            </dl>
            <Link to={`/edit/${this.state.user._id}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.user._id)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
