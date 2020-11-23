import * as React from 'react';
import ForEach from '../../Parts/ForEach';
import PieceOptions, { readFromDataSet } from './PieceOptions';
import PieceSet, { GetDataSet } from '../../../store/types/Prototype/PieceSet';
import Prototype from '../../../store/types/Prototype';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { DataSetEditor } from './DataSets';
import { ImageDisplay } from '../../Parts/ImageDisplay';
import { Link, useHistory } from 'react-router-dom';
import { PieceSetContext, PrototypeContext } from '../context';


const CREATE_PIECE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M0 0h512v512H0z" fill="#ffffff" fill-opacity="1"/>
<g class="" style="touch-action: none;" transform="translate(0,0)">
  <path d="M429.548 30.836c-.307-.003-.6.005-.875.024-2.212.147-3.34.653-4.576 1.89l-27.58 27.58 55.156 55.154 27.578-27.58c1.238-1.236 1.744-2.363 1.89-4.575.15-2.21-.37-5.433-1.805-9.163-2.87-7.46-9.277-16.667-17.055-24.445-7.778-7.778-16.985-14.185-24.445-17.055-3.264-1.255-6.138-1.81-8.287-1.83zm-45.758 42.22l-9.9 9.9 9.9 9.9 12.727 12.727 9.9 9.9 12.727 12.728 9.9 9.9 9.9-9.9-55.155-55.155zm-22.627 22.626L72.665 384.186l9.898 9.897 288.5-288.5-9.9-9.9zm22.627 22.63L95.29 406.808l9.9 9.902 288.5-288.5-9.9-9.9zm22.63 22.626l-288.502 288.5 9.897 9.9 288.503-288.5-9.9-9.9zM63.223 400.198l-12.12 30.306 30.393 30.394 30.305-12.12-6.61-6.612L92.46 429.44l-9.9-9.9-12.73-12.728-6.61-6.612zm-19.395 48.488l-12.993 32.478 32.478-12.992-19.486-19.485z" fill="#000000" fill-opacity="1" transform="translate(76.8, 76.8) scale(0.7, 0.7) rotate(-345, 256, 256)"/>
</g>
</svg>`

const DEFAULT_SVG = `<svg class="card-img-top" viewBox="0 0 512 512">
<path d="M256 117c-65.2 0-124.2 11.6-166.13 29.7-20.95 9.1-37.57 19.8-48.57 31.1S25 200.4 25 212c0 11.6 5.3 22.9 16.3 34.2 11 11.3 27.62 22 48.57 31.1C131.8 295.4 190.8 307 256 307c65.2 0 124.2-11.6 166.1-29.7 21-9.1 37.6-19.8 48.6-31.1S487 223.6 487 212c0-11.6-5.3-22.9-16.3-34.2-11-11.3-27.6-22-48.6-31.1C380.2 128.6 321.2 117 256 117zM25 255.1v50.2c0 6.3 5.3 17.6 16.3 28.9 11 11.3 27.62 22 48.57 31.1C131.8 383.4 190.8 395 256 395c65.2 0 124.2-11.6 166.1-29.7 21-9.1 37.6-19.8 48.6-31.1s16.3-22.6 16.3-28.9v-50.2c-1.1 1.3-2.2 2.5-3.4 3.7-13.3 13.6-31.8 25.3-54.3 35-45 19.5-106 31.2-173.3 31.2-67.3 0-128.3-11.7-173.28-31.2-22.49-9.7-41.01-21.4-54.3-35-1.19-1.2-2.32-2.5-3.42-3.7z" fill="#64491C" fill-opacity="1" transform="translate(0, 0) scale(1, 1) rotate(-345, 256, 256)" />
</svg>`

function TokenCard(props: {image: string, children: React.ReactNode, border?: boolean}){
    return (
        <Card className={"my-2" + (props.border ? " border-primary" : "")} style={{ width: "10rem" }}>
            <div className="card-img-top justify-content-center">
                <ImageDisplay image={props.image} size="9.9rem" />
            </div>
            <CardBody className="text-center">
                {props.children}
            </CardBody>
        </Card>
    )
}

function pieceSetImage(pieceSet: PieceSet, prototype: Prototype, row: number) {
    if (pieceSet.dataSetId && pieceSet.imageDef){
        return readFromDataSet(pieceSet, prototype, pieceSet.imageDef, row);
    }

    if (pieceSet.piece.imageId){
        return pieceSet.piece.imageId;
    }

    return DEFAULT_SVG;
}


function PieceListItem(props: {piece: PieceSet}) {
    const prototype = React.useContext(PrototypeContext)
    return (
        <TokenCard image={pieceSetImage(props.piece, prototype, 0)} >
            <h5>{props.piece.name}</h5>
            <Link className={"btn btn-primary"} to={"/Create/"+prototype.id+"/pieces/"+props.piece.id}>Edit</Link>
        </TokenCard>
    )
}

function PieceList(){
    const history = useHistory()
    const prototype = React.useContext(PrototypeContext)

    return (
    <Row>
        <Col xs={3} >
            <TokenCard image={CREATE_PIECE_SVG}>
                <button className="btn btn-primary" onClick={() => {
                    const newPiece = prototype.addPieceSet();
                    history.push('/Create/' + prototype.id + '/pieces/'+newPiece.payload.id);
                }}>New Pieceset</button>
            </TokenCard>
        </Col>
        <ForEach values={prototype.allPieceSets}>
            {pieceSet => 
                <Col xs={3}>
                    <PieceListItem piece={pieceSet} />
                </Col>
            }
        </ForEach>    
    </Row>
    )
}

function PieceView(props: {selectedPieceId: string}){
    return (
        <Row>
            
        </Row>
    )
}

export default function Pieces(props: {selectedPieceId: string | undefined}){
    const prototype = React.useContext(PrototypeContext)

    if (!props.selectedPieceId){
        return (
            <Row>
                <Col xs={12}>
                    <PieceList />
                </Col>
            </Row>
        )
    } else {
        const pieceSet = prototype.allPieceSets[props.selectedPieceId];
        const dataSet = GetDataSet(pieceSet, prototype)
        return (
            <PieceSetContext.Provider value={pieceSet}>
                <Row>
                    <Col xs={12} md={8} className="d-none d-md-block">
                        <PieceView selectedPieceId={props.selectedPieceId} />
                    </Col>
                    <Col xs={12} md={4} className="border-left">
                        <PieceOptions />
                    </Col>
                    <Col xs={12}>
                        <DataSetEditor dataSet={dataSet} />
                    </Col>
                </Row>
            </PieceSetContext.Provider>
        )
    }
}
