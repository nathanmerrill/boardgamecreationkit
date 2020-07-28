import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import * as UserData from '../../store/types/UserData';
import { Link } from 'react-router-dom';
import * as Prototype from '../../store/types/Prototype';
import Timeago from 'react-timeago';
import { ApplicationState } from '../../store';


type GameProps =
    UserData.UserData &
    typeof UserData.actions &
    RouteComponentProps<{}>;


function PrototypeItem(prototype: Prototype.Prototype) {
    console.log("Prototype name", prototype.name);
    return (
        <Link to={`/Create/${prototype.id}`} className="list-group-item list-group-item-action flex-column align-items-start" key={prototype.id}>
            <div className="d-flex justify-content-between">
                <h5 className="mb-1">{prototype.name}</h5>
                <small><Timeago date={prototype.updatedAt} /></small>
            </div>
        </Link>
    )
}

function SelectPrototype(props: GameProps) {
    const prototypeItems = Object.values(props.prototypes).sort(a => new Date(a.updatedAt).getTime()).map(PrototypeItem);
    const history = useHistory();
    return (
        <React.Fragment>
            <div className="list-group">
                <button onClick={(e) => {
                    e.preventDefault();
                    var prototypeAction = props.newPrototype();
                    history.push('/Create/' + prototypeAction.payload.id);
                }} className="list-group-item list-group-item-action">
                    <h5 className="text-center">Create new Prototype </h5>
                </button>
            </div>
            <h5> In progress: </h5>
            <div className="list-group pl-3">
                {prototypeItems}
            </div>
        </React.Fragment>
    );
}


export default connect(
    (state: ApplicationState) => state.userData,
    UserData.actions,
)(SelectPrototype);
