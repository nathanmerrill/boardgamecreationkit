import * as React from 'react';
import { PieceSet } from '../../store/types/PrototypeDefs';
import { Select } from '../Parts/Select';
import { PieceType } from '../../store/types/Pieces';
import { GameImage, LiteralValue, DataType, EMPTY_LITERAL_VALUE } from '../../store/types/BaseTypes';
import { ImageSelector } from '../Parts/ImageSelector';
import { ImageDisplay } from '../Parts/ImageDisplay';
import { Carousel } from 'react-responsive-carousel';
import { PrototypeContext, PieceSetContext } from './context';
import { InputGroup, Label, Input, InputGroupAddon, Button, Col, Row } from 'reactstrap';
import { Prototype } from '../../store/types/Prototype';


export function readFromDataSet(pieceSet: PieceSet, prototype: Prototype, column: string, row: number): string {
    const dataSet = prototype.allDataSets[pieceSet.dataSetId]
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

function DataSetInput(props: {label: string, selectedColumn: string, onColumnChange: (column: string) => void, children: React.ReactNode, renderValue: (value: string) => React.ReactNode}){
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)
    const dataSetId = pieceSet.dataSetId;
    const dataSet = prototype.allDataSets[dataSetId] || {columns: [], data: []}
    const dataValue: Array<string> = [];
    dataValue[0] = ""

    if (props.selectedColumn){
        for (var i = 0; i < dataSet.data.length; i++){
            dataValue[i] = readFromDataSet(pieceSet, prototype, props.selectedColumn, i)
        }
    }

    const usingDataSets = !!dataSetId
    const hasSelectedColumn = usingDataSets && !!props.selectedColumn

    let dataValueInput = props.children

    if (hasSelectedColumn){
        if (dataValue.length === 1){
        } else {
            dataValueInput = (
                <Carousel showThumbs={false} showIndicators={false} showStatus={false}>
                    {dataValue.map((value, index) => {
                        return (
                            <div key={"carousel-"+props.label+index}>
                                {props.renderValue(value)}
                            </div>
                        )
                    })}
                </Carousel>
            )
        }
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
                    <small>Dataset Row</small>
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
                    <small>{hasSelectedColumn ? "Sample" : "Constant"} Value</small>
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
            renderValue={(value: string) =>
                <span>{value}</span>
                
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
                renderValue={(value: string) =>
                    <ImageDisplay image={value} size={50} />
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
    const dataValue: LiteralValue = gameData[props.dataName]

    const dataTypeSubset: Record<string, DataType> = Object.keys(DataType)
        .slice(0,3)
        .reduce((record, key) => {return {...record, [key]: DataType[Number(key)]}}, {})

    const typeSelector = <Select values={dataTypeSubset} selectedValue={dataValue.returnType} onChange={(selected) => {
        if (selected){
            prototype.setPieceSetPieceProps({id: pieceSet.id, gameData: {...gameData, [props.dataName]: {...gameData[props.dataName], returnType: selected}} })
        }
    }}/>

    return (
        <DataSetInput label={props.dataName} selectedColumn={pieceSet.dataDef[props.dataName]} onColumnChange={(e) =>
                prototype.setPieceSetProps({id: pieceSet.id, dataDef: {...pieceSet.dataDef, [props.dataName]: e}})
        }
            renderValue={(value: string) => 
            <React.Fragment>
                <input type="text" className="form-control" disabled value={value} />
                {typeSelector} 
            </React.Fragment>
            }
        >
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
                                    gameData: {...pieceSet.piece.gameData, [dataName]: EMPTY_LITERAL_VALUE}
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
    const dataSets = Object.values(prototype.allDataSets);
    
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

            <label htmlFor="datasetSelect">Dataset</label>
            <Select id="dataSetSelect" values={dataSets} noneOption="None" selectedValue={pieceSet.dataSetId} onChange={(e) => {
                prototype.setPieceSetProps({id: pieceSet.id, dataSetId: (e || {id:""}).id });
            }}/>
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