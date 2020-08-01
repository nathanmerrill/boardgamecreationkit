import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { PrototypeContext } from './context';



export default function Timeline() {
    const prototype = React.useContext(PrototypeContext)


    return (
        <React.Fragment>
            <Row>
                <Col xs={8}>

                </Col>
                <Col xs={4}>

                </Col>
            </Row>
        </React.Fragment>
    );
}
