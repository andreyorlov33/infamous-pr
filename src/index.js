import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import * as actions from './src/actions/index'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index.js';


import './normalize.css';
import Landing from './components/Landing_News/Landing';
import About from './components/About/About';
import Admin from './components/Admin/Admin';
import Clients from './components/Client/Clients';
import ClientPage from './components/SingleClient/ClientPage';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


const muiTheme = getMuiTheme({
  fontFamily: 'Montserrat, sans-serif',
  palette: {
    primary1Color: '#2196F3',
    accent1Color: '#000'
  }
});

class App extends Component {
  constructor(props){

  }
  componentWillMount(){
    this.props.actions.fetch_dynamic_info()
    this.props.actions.fetch_all_news()
    this.props.actions.fetch_all_artists()
  }
  componentWillReceiveProps(next_props){
    this.props != next_props ? this.setState({...next_props}) : null
  }
  render(){
    return(
      <Switch>
        <Route path="/clients/pete-tong" component={ClientPage} />
        <Route path="/services" component={About} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={About} />
        <Route path="/clients" component={Clients} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Landing} />
    </Switch>
    )
  }
}

function map_dispatch_to_props(dispatch){
    return{
      actions : bindActionCreators(actions, dispatch)
    }
}

connect(null, map_dispatch_to_props)(App)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <App />
        </div>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
  ,document.querySelector('.container')
);
