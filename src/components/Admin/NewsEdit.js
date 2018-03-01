import React, { Component } from 'react';
import { Paper, TextField, DatePicker, SelectField, MenuItem, RaisedButton, Checkbox } from 'material-ui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actionCreators from '../../actions/index.js';

import './NewsEdit.css';
import Data from '../../utils/FillerData';

class NewsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      outlet: '',
      title: '',
      news_link: '',
      news_dek: '',
      client: '',
      image: '',
      social: '',
      facebookChecked: false,
      twitterChecked: false,
      loaded: false
    }
  }

  componentWillMount() {
    this.props.all_news && this.props.location.hash !== '' ? this.handleLoad() : this.props.actions.fetch_all_news();
    !this.props.all_artists ? this.props.actions.fetch_all_artists() : '';
    console.log(this.props.location);
  }

  componentWillUnmount() {
    this.setState({loaded: false});
  }

  handleLoad = () => {
    if(this.props.location.hash !== ''){
      const id = this.props.location.hash.replace('#', '')
      const newsData = this.props.all_news ? this.props.all_news.data.filter(news => news.id === id) : false;
      if(newsData && !this.state.loaded){
        newsData[0].data.date = moment(newsData[0].data.date, 'MMMM DD, YYYY').toDate();
        this.setState({loaded: true});
        this.setState({...newsData[0].data});
      }
    }
  }

  componentDidUpdate() {
    this.handleLoad()
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleDate = (event, date) => {
    this.setState({ date }, () => {
      console.log(this.state.date);
    });
  }

  handleDropdown = (event, index, value) => {
    this.setState({ client: value });
  }

  handleFacebookCheck = () => {
    this.setState((oldState) => {
      return { facebookChecked: !oldState.facebookChecked };
    });
  }

  handleTwitterCheck = () => {
    this.setState((oldState) => {
      return { twitterChecked: !oldState.twitterChecked };
    });
  }

  handleSave = () => {
    console.log('saved!')
    // do database saving here
  }

  render() {
    const items = this.props.all_artists ? this.props.all_artists.data.fullList.map((client, index) => {
      return (
        <MenuItem key={index+1} value={client.name} primaryText={client.name} />
      );
    }) : '';

    const style = {
      display: !this.state.facebookChecked && !this.state.twitterChecked ? 'none' : 'inline-block'
    }

    return (
      <div styleName={'container'}>
        <Paper styleName={'content-container'} zDepth={3}>
          <h1 styleName={'title'}>NEWS</h1>
          <div>
            <ul styleName={'top-list'}>
              <li>
                <TextField
                  id="outlet"
                  floatingLabelText="Outlet"
                  value={this.state.outlet}
                  onChange={this.handleChange}
                  fullWidth={true}
                />
              </li>
              <li>
                <DatePicker
                  hintText="Article Publish Date"
                  value={this.state.date}
                  onChange={this.handleDate}
                  fullWidth={true}
                  styleName={'date-input'}
                  formatDate={(date) => moment(date).format('MMMM DD, YYYY')}
                />
              </li>
              <li>
                <SelectField
                  value={this.state.client}
                  onChange={this.handleDropdown}
                  floatingLabelText="Select Client"
                  fullWidth={true}
                >
                  {items}
                </SelectField>
              </li>
            </ul>
            <TextField
              id="news_link"
              floatingLabelText="Article URL"
              value={this.state.news_link}
              onChange={this.handleChange}
              fullWidth={true}
            />
            <TextField
              id="image_url"
              floatingLabelText="Image URL"
              value={this.state.image_url}
              onChange={this.handleChange}
              fullWidth={true}
            />
            <TextField
              id="title"
              floatingLabelText="Title"
              value={this.state.title}
              onChange={this.handleChange}
              fullWidth={true}
              multiLine={true}
              rows={2}
            />
            <TextField
              id="news_dek"
              floatingLabelText="Dek / Subtext"
              value={this.state.news_dek}
              onChange={this.handleChange}
              fullWidth={true}
              multiLine={true}
              rows={3}
            />
            <Checkbox
              label="Post to Facebook"
              checked={this.state.facebookChecked}
              onCheck={this.handleFacebookCheck}
            />
            <Checkbox
              label="Post to Twitter"
              checked={this.state.twitterChecked}
              onCheck={this.handleTwitterCheck}
            />
            <TextField
              id="social"
              floatingLabelText="Social Copy"
              value={this.state.social}
              onChange={this.handleChange}
              fullWidth={true}
              style={style}
            />
            <button styleName={'save-button'} onClick={this.handleSave}>SAVE</button>
          </div>
        </Paper>
      </div>
    );
  }
}

function map_state_to_props(state, ownProps){
  return {
     all_news: state.clientReducer.all_news,
     all_artists: state.clientReducer.all_artists
  }
}

function map_dispatch_to_props(dispatch){
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(map_state_to_props, map_dispatch_to_props)(NewsEdit);
