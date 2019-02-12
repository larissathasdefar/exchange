import * as React from 'react'
import * as ReactDom from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Home from 'components/Home'
import Exchange from 'components/Exchange'
import AppBar from 'containers/AppBarContainer'
import rootReducer from './reducers'

const store = createStore(rootReducer)

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
          <Route exact path="/" render={() => <Redirect to="/currencies" />} />
          <Route exact path="/currencies" component={props => <Home {...props} />} />
          <Route exact path="/exchange" component={props => <Exchange {...props} />} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

ReactDom.render(<App />, document.getElementById('root'))
