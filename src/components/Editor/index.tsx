import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import PrototypeBasicInfo from './BasicInfo';
import PrototypePieces from './Pieces';
import PrototypeTimeline from './Timeline';
import { prototypeConnect } from './scope';
import DataSets from './DataSets';
import { PrototypeContext, PrototypeProps } from './context';
import { Nav, NavItem } from 'reactstrap';

export type RouteProps = { subpage: string | undefined, prototypeid: string, subitemid: string | undefined }

function SubpageLink(props: { subpage: string, title: string, match: RouteProps}) {
    const matched = props.match;
    const currentSubpage = matched.subpage ? matched.subpage : '';
    const currentId = matched.prototypeid;

    return (
        <NavItem>
            <Link className={`nav-link${props.subpage === currentSubpage ? ' active' : ''}`} to={"/Create/" + currentId + "/" + props.subpage}>{props.title}</Link>
        </NavItem>
    )
}

function SubPageContent(props: { match: RouteProps }) {
    switch (props.match.subpage) {
        case 'pieces':
            return <PrototypePieces selectedPieceId={props.match.subitemid}/>;
        case 'datasets':
            return <DataSets selectedDataSetId={props.match.subitemid} />;
        case 'timeline':
            return <PrototypeTimeline />;
        default:
            return <PrototypeBasicInfo />;        
    }
}

function Editor(prototype: PrototypeProps & RouteComponentProps<RouteProps>) {
    if (!prototype.id) {
        return (<Redirect to="/Create" />)
    }

    const match = prototype.match.params;

    return (
        <PrototypeContext.Provider value={prototype}>
            <Nav tabs>
                <SubpageLink subpage="" title="Basic Info" match={match} />
                <SubpageLink subpage="pieces" title="Pieces" match={match}  />
                <SubpageLink subpage="datasets" title="Data Sets" match={match}  />
                <SubpageLink subpage="timeline" title="Timeline" match={match}  />
            </Nav>
            <SubPageContent match={match}  />
        </PrototypeContext.Provider>
    );
}

export default prototypeConnect()(Editor);
