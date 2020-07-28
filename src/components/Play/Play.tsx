import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { UserData, actions } from '../../store/types/UserData';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../../store';

type GameProps =
    UserData &
    typeof actions &
    RouteComponentProps<{}>;

class HomePage extends React.PureComponent<GameProps> {
    public render() {
        return (
            <React.Fragment>
                <h1>Welcome to BoardGameKit!</h1>

                <p>BoardGameKit lets you create games and play them with your friends.</p>

                <Link to="/Create" className="btn btn-primary btn-lg">Create</Link>
                <Link to="/Play" className="btn btn-primary btn-lg">Play</Link>
            </React.Fragment>
        );
    }
};


export default connect(
    (state: ApplicationState) => state.userData,
    actions,
)(HomePage);
