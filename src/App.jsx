import * as React from 'react'
import * as ReactDom from 'react-dom'
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Home from './components/Home'
import Exchange from './components/Exchange'
import HeadBar from './components/UI/HeadBar'

const theme = createMuiTheme({
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
    <HeadBar />
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/currencies" />} />
        <Route exact path="/currencies" component={props => <Home {...props} />} />
        <Route exact path="/exchange" component={props => <Exchange {...props} />} />
      </Switch>
    </Router>
  </MuiThemeProvider>
)

ReactDom.render(<App />, document.getElementById('root'))
