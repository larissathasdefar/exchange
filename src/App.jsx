import * as React from 'react'
import * as ReactDom from 'react-dom'
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom'
import Home from './components/Home'
import Exchange from './components/Exchange'
import HeadBar from './components/UI/HeadBar'

const App = () => (
  <div>
    <HeadBar />
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/exchange" />} />
        <Route exact path="/exchange" component={props => <Home {...props} />} />
        <Route exact path="/exchange/:from/to/:to" component={props => <Exchange {...props} />} />
      </Switch>
    </Router>
  </div>
)

ReactDom.render(<App />, document.getElementById('root'))
