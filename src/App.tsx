import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import PrototypeSelect from './components/Editor/PrototypeSelect';
import Editor from './components/Editor';

import './custom.css'

export default () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/Create' component={PrototypeSelect} />
            <Route path="/Create/:prototypeid/:subpage?/:subitemid?" component={Editor} />
        </Switch>
    </Layout>
);