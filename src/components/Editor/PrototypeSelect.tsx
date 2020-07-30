import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import * as UserData from '../../store/types/UserData';
import { Link } from 'react-router-dom';
import * as Prototype from '../../store/types/Prototype';
import Timeago from 'react-timeago';
import { ApplicationState } from '../../store';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ForEach from '../Parts/ForEach';


type GameProps =
    UserData.UserData &
    typeof UserData.actions &
    RouteComponentProps<{}>;


function PrototypeItem(props: {prototype: Prototype.Prototype}) {
    return (
        <Link to={`/Create/${props.prototype.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex justify-content-between">
                <h5 className="mb-1">{props.prototype.name}</h5>
                <small><Timeago date={props.prototype.updatedAt} /></small>
            </div>
        </Link>
    )
}

function SelectPrototype(props: GameProps) {
    const prototypeItems = Object.values(props.prototypes).sort(a => new Date(a.updatedAt).getTime());
    const history = useHistory();
    return (
        <React.Fragment>
            <ListGroup>
                <ListGroupItem tag="button" action onClick={(e) => {
                    var prototypeAction = props.newPrototype();
                    history.push('/Create/' + prototypeAction.payload.id);
                }}>
                    <h5 className="text-center">Create new Prototype </h5>
                </ListGroupItem>
            </ListGroup>
            <h5> In progress: </h5>
            <ListGroup className="pl-3">
                <ForEach values={prototypeItems}>
                    {prototype => <PrototypeItem prototype={prototype} />}
                </ForEach>
            </ListGroup>
        </React.Fragment>
    );
}


export default connect(
    (state: ApplicationState) => state.userData,
    UserData.actions,
)(SelectPrototype);
