import * as React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PrototypeBasicInfo from './BasicInfo';
import PrototypePieces from './Pieces';
import PrototypeTimeline from './Timeline';
import { PrototypeProps, prototypeConnect } from './scope';

function SubpageLink(props: { subpage: string, title: string, props: PrototypeProps }) {
    const matched = props.props.match.params;
    const currentSubpage = matched.subpage ? matched.subpage : '';
    const currentId = matched.prototypeid;

    return (
        <li className="nav-item">
            <Link className={`nav-link${props.subpage === currentSubpage ? ' active' : ''}`} to={"/Create/" + currentId + "/" + props.subpage}>{props.title}</Link>
        </li>
    )
}

function SubPageContent(props: { props: PrototypeProps }) {
    switch (props.props.match.params.subpage) {
        case 'pieces':
            return <PrototypePieces match={props.props.match} />;
        case 'timeline':
            return <PrototypeTimeline match={props.props.match} />;
        default:
            return <PrototypeBasicInfo match={props.props.match} />;        
    }
}

function Editor(props: PrototypeProps) {
    if (!props.id) {
        return (<Redirect to="/Create" />)
    }

    return (
        <React.Fragment>
            <ul className="nav nav-tabs">
                <SubpageLink subpage="" title="Basic Info" props={props} />
                <SubpageLink subpage="pieces" title="Pieces" props={props} />
                <SubpageLink subpage="timeline" title="Timeline" props={props} />
            </ul>
            <SubPageContent props={props} />
        </React.Fragment>
    );
}

export default prototypeConnect()(Editor);
