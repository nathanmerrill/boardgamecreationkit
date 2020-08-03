import * as React from 'react';
import Editor from './components/Editor';
import Home from './components/Home';
import Layout from './components/Layout';
import PrototypeSelect from './components/Editor/PrototypeSelect';
import { Route, Switch } from 'react-router';
import './custom.css';


export default () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Create' component={PrototypeSelect} />
            <Route path="/Create/:prototypeid/:subpage?/:subitemid?" component={Editor} />
        </Switch>
    </Layout>
);