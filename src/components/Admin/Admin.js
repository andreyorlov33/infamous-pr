import React, { Component } from 'react';

import { Paper } from 'material-ui';

import './Admin.css';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',

};

class Admin extends Component {
  render() {
    return (
      <div>
        <Paper style={style} zDepth={1} />
        <Paper style={style} zDepth={2} />
        <Paper style={style} zDepth={3} />
        <Paper style={style} zDepth={4} />
        <Paper style={style} zDepth={5} />
      </div>
    );
  }
}

export default Admin;
