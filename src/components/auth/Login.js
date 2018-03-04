import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/index.js';

class Login extends Component {
  constructor(props){
    super(props)
  }

  handleImageInput=e=>{
    e.preventDefault()
    this.props.actions.upload_image(this.uploadInput.files[0])
  }
  render() {
    return (
      <div>
           <input ref={ref => { this.uploadInput = ref; }} type="file" onChange={this.handleImageInput}/>
      </div>
    );
  }
}

// function map_state_to_props(state, ownProps) {
//   return {
    
//   };
// }

function map_dispatch_to_props(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(null, map_dispatch_to_props)(Login);
