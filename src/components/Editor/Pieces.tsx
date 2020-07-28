import * as React from 'react';
import { prototypeConnect, PrototypeProps } from './scope';
import { Piece } from '../../store/types/Pieces';
import { Link } from 'react-router-dom';



function PieceListItem(piece: Piece, props: PrototypeProps) {
    return (
        <div className="card" style={{ width: "12rem" }}>
            <svg className="card-img-top" viewBox="0 0 512 512">
                {piece.imageId ? props.allImages[piece.imageId].svg : ""}
            </svg>
            <div className="card-body text-center">
                <Link className="btn btn-primary" to={"/Create/"+props.id+"/pieces/"+piece.id}>Edit</Link>
            </div>
        </div>
    )
}

function Pieces(props: PrototypeProps) {
    return (
        <React.Fragment>
            <div className="card" style={{ width: "12rem" }}>
                <svg className="card-img-top" viewBox="0 0 512 512">
                    <rect width="100%" height="100%" fill="#cccccc" />

                    <path d="M256 117c-65.2 0-124.2 11.6-166.13 29.7-20.95 9.1-37.57 19.8-48.57 31.1S25 200.4 25 212c0 11.6 5.3 22.9 16.3 34.2 11 11.3 27.62 22 48.57 31.1C131.8 295.4 190.8 307 256 307c65.2 0 124.2-11.6 166.1-29.7 21-9.1 37.6-19.8 48.6-31.1S487 223.6 487 212c0-11.6-5.3-22.9-16.3-34.2-11-11.3-27.6-22-48.6-31.1C380.2 128.6 321.2 117 256 117zM25 255.1v50.2c0 6.3 5.3 17.6 16.3 28.9 11 11.3 27.62 22 48.57 31.1C131.8 383.4 190.8 395 256 395c65.2 0 124.2-11.6 166.1-29.7 21-9.1 37.6-19.8 48.6-31.1s16.3-22.6 16.3-28.9v-50.2c-1.1 1.3-2.2 2.5-3.4 3.7-13.3 13.6-31.8 25.3-54.3 35-45 19.5-106 31.2-173.3 31.2-67.3 0-128.3-11.7-173.28-31.2-22.49-9.7-41.01-21.4-54.3-35-1.19-1.2-2.32-2.5-3.42-3.7z" fill="#64491C" fill-opacity="1" transform="translate(0, 0) scale(1, 1) rotate(-345, 256, 256)" />
                </svg>
                <div className="card-body text-center">
                    <button className="btn btn-primary" onClick={props.addPiece}>New Piece</button>
                </div>
            </div>
            {Object.values(props.allPieceSets).map(p => PieceListItem(p, props))}
        </React.Fragment>
    );
}


export default prototypeConnect()(Pieces);
