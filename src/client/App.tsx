import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import './styles/main.css';
import { Switch, Route, Redirect } from 'react-router';
import Page from './pages/Page';
import History from './pages/History';
import { AppRoute } from './components/shared/AppRoute';
import DefaultLayout from './layouts/DefaultLayout';
import Search from './pages/Search';
export default class App extends Component<{}> {
  componentDidMount() {

  }

  render() {
    //const routes = RoutesModule.routes;
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
    const history = createBrowserHistory({ basename: baseUrl });
    //const store = configureStore(history);

    return (
      <Switch>
        <AppRoute layout={DefaultLayout} exact path="/" component={Page} />
        <AppRoute layout={DefaultLayout} path="/pages/:slug/:mode?" component={Page} />
        <AppRoute layout={DefaultLayout} path="/histories/:slug/:mode?" component={History} />
        <AppRoute layout={DefaultLayout} path="/search/:keyword" component={Search} />
        <Redirect to="/" />
      </Switch>
        );
  }
}

{/* <Provider store={store}>
        <ConnectedRouter history={history} children={routes} />
      </Provider> */}