import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => (
    <React.Fragment>
        <h1>Welcome to BoardGameKit!</h1>

        <p>BoardGameKit lets you create games and play them with your friends.</p>

        <Link to="/Create" className="btn btn-primary btn-lg">Create</Link>
        <Link to="/Play" className="btn btn-primary btn-lg">Play</Link>
    </React.Fragment>
);

export default connect()(Home);
