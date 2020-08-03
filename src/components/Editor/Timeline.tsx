import * as React from 'react';
import { ActionContext, PrototypeContext } from './context';
import { Col, Row } from 'reactstrap';


function AvailableSubactions(){
    return (
        <React.Fragment />
    )
}

function ActionView(){
    return (
        <React.Fragment />
    )
}


export default function Timeline() {
    const prototype = React.useContext(PrototypeContext)
    const rootAction = prototype.allActions[prototype.rootAction]
    
    return (
        <ActionContext.Provider value={rootAction}>
            <Row>
                <Col xs={8}>
                    <ActionView />
                </Col>
                <Col xs={4}>
                    <AvailableSubactions />
                </Col>
            </Row>
        </ActionContext.Provider>
    );
}
