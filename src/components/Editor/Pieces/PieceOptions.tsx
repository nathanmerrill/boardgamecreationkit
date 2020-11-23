import * as React from 'react';
import DataType, { IsPrimitive } from '../../../store/types/data/DataType';
import GameImage from '../../../store/types/entities/GameImage';
import PieceSet, { GetDataSet } from '../../../store/types/Prototype/PieceSet';
import Prototype from '../../../store/types/Prototype';
import { Button, Col, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap';
import { EMPTY_STRING } from '../../../store/library/LiteralValues';
import { ImageSelector } from '../../Parts/ImageSelector';
import { Literal } from '../../../store/types/data/DataSource';
import { PieceSetContext, PrototypeContext, TableSelectionContext } from '../context';
import { PieceType } from '../../../store/types/entities/Piece';
import { Select } from '../../Parts/Select';


export function readFromDataSet(pieceSet: PieceSet, prototype: Prototype, column: string, row: number): string {
    const dataSet = GetDataSet(pieceSet, prototype)
    if (!dataSet || !dataSet.data || !column){
        return ""
    }
    const dataRow = row % dataSet.data.length

    let dataColumn = Number(column);

    if (isNaN(dataColumn)){
        dataColumn = dataSet.columns.indexOf(column);
        if (dataColumn === -1){
            return ""
        }
    }

    return dataSet.data[dataRow][dataColumn] || ""
}

function DataSetInput(props: {label: string, selectedColumn: string, onColumnChange: (column: string) => void, children: React.ReactNode}){
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)
    const selection = React.useContext(TableSelectionContext)
    const dataSetId = pieceSet.dataSetId;
    const dataSet = GetDataSet(pieceSet, prototype)

    const usingDataSets = !!dataSetId
    const hasSelectedColumn = usingDataSets && !!props.selectedColumn

    let dataValueInput = props.children

    if (hasSelectedColumn){
        const dataValue = readFromDataSet(pieceSet, prototype, props.selectedColumn, selection.row);
        dataValueInput = (
            <input type="text" className="form-control" disabled value={dataValue} />
        )
    }

    return (
        <React.Fragment>
            <Row>
                <Col xs={12}>
                    <Label className="mb-0">{props.label}</Label>
                </Col>
            </Row>
            <Row>
                <Col xs={6} className="pt-0">
                    <small>Column</small>
                    <Select values={dataSet.columns} selectedValue={props.selectedColumn} disabled={!usingDataSets} noneOption="None" onChange={(e) =>{
                        if (e){
                            const index = dataSet.columns.indexOf(e)
                            const columnKey = index === -1 ? "" : ""+index
                            props.onColumnChange(columnKey)
                        } else {
                            props.onColumnChange("")
                        }
                    }}/>
                </Col>
                <Col xs={6} className="pt-0">
                    <small>Value</small>
                    { dataValueInput }
                </Col>
            </Row>
    </React.Fragment>
    )

}

function PieceNameInput() {
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)

    return (
        <DataSetInput label="Piece names" selectedColumn={pieceSet.nameDef} onColumnChange={(e) =>
                prototype.setPieceSetProps({id: pieceSet.id, nameDef: e})
            }
        >
            <input type="text" className="form-control" value={pieceSet.name} onChange={(e) =>
                    prototype.setPieceSetProps({id: pieceSet.id, piece: {...pieceSet.piece, name: e.currentTarget.value }})
                } />
        </DataSetInput>
    )
}

function PieceImageInput() {
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)

    return (
        <React.Fragment>
            <ImageSelector onSelect={(image: GameImage) => { prototype.setPieceSetProps({id: pieceSet.id, piece: {...pieceSet.piece, imageId: image.id}})}} />
            <DataSetInput label="Piece images" selectedColumn={pieceSet.imageDef} onColumnChange={(e) =>
                prototype.setPieceSetProps({id: pieceSet.id, imageDef: e})
            }
            >
                <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#imageModal">Select Image</button>
            </DataSetInput>
        </React.Fragment>
    )
}

function PieceDataInput(props: {dataName: string}) {
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)
    const gameData = pieceSet.piece.gameData
    const dataValue: Literal = gameData[props.dataName]

    const dataTypeSubset: Record<string, DataType> = Object.keys(DataType)
        .map(Number)
        .filter(IsPrimitive)
        .reduce((record, key) => {return {...record, [key]: DataType[key]}}, {})

    const typeSelector = <Select values={dataTypeSubset} selectedValue={dataValue.returnType} onChange={(selected) => {
        if (selected){
            prototype.setPieceSetPieceProps({id: pieceSet.id, gameData: {...gameData, [props.dataName]: {...gameData[props.dataName], returnType: selected}} })
        }
    }}/>

    return (
        <DataSetInput label={props.dataName} selectedColumn={pieceSet.dataDef[props.dataName]} onColumnChange={(e) =>
                prototype.setPieceSetProps({id: pieceSet.id, dataDef: {...pieceSet.dataDef, [props.dataName]: e}})
        }>
            <input type="text" className="form-control" value={dataValue.value} onChange={(e) =>{
                gameData[props.dataName].value = e.target.value
                prototype.setPieceSetPieceProps({id: pieceSet.id, gameData })
            }} />
            {typeSelector}
        </DataSetInput>
    )
}

function PieceDataInputs() {
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)

    return (
        <React.Fragment>
            <Label>Extra Data</Label>
            <InputGroup className="mb-3">
                <Input id="dataName" placeholder="Data name" />
                <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={() =>{
                        const dataName = (document.getElementById("dataName") as HTMLInputElement).value
                        if (!(dataName in pieceSet.piece.gameData)){
                            prototype.setPieceSetProps({
                                id: pieceSet.id, 
                                dataDef: {...pieceSet.dataDef, [dataName]: ""},
                                piece: {
                                    ...pieceSet.piece,
                                    gameData: {...pieceSet.piece.gameData, [dataName]: EMPTY_STRING}
                                }
                            })
                        }
                    }}>Add data</Button>
                </InputGroupAddon>
            </InputGroup>
            <div className="pl-3 border-left">
                {
                    Object.keys(pieceSet.piece.gameData).map((dataName) => {
                        return (
                            <PieceDataInput dataName={dataName} key={"DataInput-"+dataName} />
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default function PieceOptions() {
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)
    
    return (
        <form>
            <label htmlFor="pieceSetName">Pieceset name</label>
            <input type="text" className="form-control" id="pieceSetName" value={pieceSet.name} onChange={(e) =>
                prototype.setPieceSetProps({id: pieceSet.id, name: e.currentTarget.value})
            } />
            
            <label htmlFor="pieceTypeSelect">Piece type</label>
            <Select values={PieceType} id="pieceTypeSelect" selectedValue={pieceSet.piece.type} onChange={
                (e) => {
                    if (e){
                        prototype.setPieceSetPieceProps({id: pieceSet.id, type: (e as any)})
                    }
                }
            } />            
            
            <label htmlFor="copies">Copies</label>
            <input type="number" className="form-control" id="copies" value={pieceSet.copies} onChange={(e) =>
                prototype.setPieceSetProps({id: pieceSet.id, copies: e.currentTarget.valueAsNumber})
            } />

            <PieceNameInput />
            <PieceImageInput />
            <PieceDataInputs />
        </form>
    )
}