import * as React from 'react';
import $ from 'jquery';
import ForEach from '../../Parts/ForEach';
import Handsontable from 'handsontable';
import ReactDOMServer from 'react-dom/server';
import {
    Badge,
    Col,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Row
    } from 'reactstrap';
import { DataSet } from '../../../store/types/Prototype/PieceSet';
import { HotTable } from '@handsontable/react';
import { ImageDisplay } from '../../Parts/ImageDisplay';
import { ImageSelector } from '../../Parts/ImageSelector';
import { isString } from 'util';
import { Link } from 'react-router-dom';
import { PrototypeContext } from '../context';
import { useHistory } from 'react-router';
import 'handsontable/dist/handsontable.full.css';

function DataSetButton(props: {dataSet: DataSet, selectedDataSetId: string | undefined}){
    const prototype = React.useContext(PrototypeContext)
    const editing = props.selectedDataSetId === props.dataSet.id;
    
    return (
        <Link className={"list-group-item list-group-item-action d-flex justify-content-between align-items-center" + (editing ? " active": "")} to={"/Create/"+prototype.id+"/datasets/"+props.dataSet.id}>
            {props.dataSet.name}
            <Badge color="dark">{props.dataSet.data.length}</Badge>
        </Link>
    );
}

export function DataSetEditor(props: {dataSet: DataSet}){
    const prototype = React.useContext(PrototypeContext)

    const dataSet = JSON.parse(JSON.stringify(props.dataSet))
    
    let coords: Handsontable.wot.CellCoords | null = null;

    return (
        <React.Fragment>
            <FormGroup inline>
                <Label for="sheedName">Sheet name:</Label>
                <Input className="ml-2" id="sheetName" value={dataSet.name} onChange={(e) => prototype.setDataSetProps({name: e.target.value, id: dataSet.id})} />
            </FormGroup>
            <ImageSelector onSelect={(image) => {
                if (coords){
                    let newDataSet = extendDataTo(dataSet, coords);
                    newDataSet.data[coords.row][coords.col] = '{"id":"'+image.id+'"}'
                    setTimeout(() => prototype.setDataSet(newDataSet));
                }
            }}/>
            <HotTable colWidths={150} manualColumnResize={true} colHeaders={dataSet.columns} rowHeaders={true} licenseKey="non-commercial-and-evaluation" data={dataSet.data} afterChange={(changes) => {
                if (changes){
                    setTimeout(() => prototype.setDataSet(recalculateColumns(dataSet)));
                }
            }}  contextMenu={{
                items: {
                    "row_above": {},
                    "row_below": {},
                    "col_left": {},
                    "col_right": {},
                    "remove_row": {},
                    "remove_col": {},
                    "set_col_name": {
                        name: "Rename column",
                        callback: function(key, selection, clickEvent) {
                            let name = prompt('Enter column name:')
                            if (name){
                                dataSet.columns[selection[0].start.col] = name;
                                setTimeout(() => prototype.setDataSet(dataSet));
                            }
                        }
                    },
                    "set_image": {
                        name: "Set image",
                        callback: function(key, selection, clickEvent) {
                            coords = selection[0].start;
                            ($("#imageModal") as any).modal()
                        }
                    }
                }
            }} 
            afterRenderer={(TD, row, column, prop, value, cellProps) => {
                    if (isString(value) && value.startsWith('{')){
                    TD.innerHTML = ReactDOMServer.renderToString(<ImageDisplay image={value} size={25} />)
                }
            }}
            
            />
        </React.Fragment>
    );
}

function extendDataTo(dataset: DataSet, coords: Handsontable.wot.CellCoords){
    if (!dataset.data){
        dataset.data = []
    }
    for (let y = 0; y < coords.row; y++){
        if (!dataset.data[y]){
            dataset.data[y] = []
        }
        if (!dataset.data[y][coords.col]){
            dataset.data[y][coords.col] = ""
        }
    }

    return recalculateColumns(dataset);
}

function recalculateColumns(dataset: DataSet){
    if (!dataset.data){
        return dataset;
    }

    const columnCount = dataset.data[0].length

    const newColumns: Array<string> = []
    for (let i = 0; i < columnCount; i++){
        newColumns[i] = dataset.columns[i] || String.fromCharCode(65+i)
    }

    dataset.columns = newColumns;
    return dataset;
}