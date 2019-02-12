import * as React from 'react'
import * as ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Home from 'containers/HomeContainer'
import Exchange from 'components/Exchange'
import AppBar from 'containers/AppBarContainer'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f44336',
    },
  },
})

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <AppBar />
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/pockets" />} />
          <Route exact path="/pockets" component={props => <Home {...props} />} />
          <Route exact path="/exchange" component={props => <Exchange {...props} />} />
          <Route exact path='*' render={() => <Redirect to="/pockets" />} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

ReactDom.render(<App />, document.getElementById('root'))
