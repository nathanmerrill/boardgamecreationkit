import * as React from 'react';
import $ from 'jquery';
import Handsontable from 'handsontable';
import PieceSet, { DataSet, GetDataSet } from '../../../store/types/Prototype/PieceSet';
import ReactDOMServer from 'react-dom/server';
import { HotTable } from '@handsontable/react';
import { ImageDisplay } from '../../Parts/ImageDisplay';
import { ImageSelector } from '../../Parts/ImageSelector';
import { isString } from 'util';
import { PieceSetContext, PrototypeContext, PrototypeProps } from '../context';
import 'handsontable/dist/handsontable.full.css';


export function DataSetEditor(props: {onSelect:(row: number, column:number) => void}){
    const prototype = React.useContext(PrototypeContext)
    const pieceSet = React.useContext(PieceSetContext)

    const dataSet = JSON.parse(JSON.stringify(GetDataSet(pieceSet, prototype)))
    
    let coords: Handsontable.wot.CellCoords | null = null;

    const updateDataSet = (dataSet: DataSet) => {
        setTimeout(() => prototype.setPieceSetProps({id: pieceSet.id, dataSet: recalculateColumns(dataSet)}));
    }

    return (
        <React.Fragment>
            <ImageSelector onSelect={(image) => {
                if (coords){
                    let newDataSet = extendDataTo(dataSet, coords);
                    newDataSet.data[coords.row][coords.col] = '{"id":"'+image.id+'"}'
                    updateDataSet(newDataSet)
                }
            }}/>
            <HotTable colWidths={150} manualColumnResize={true} colHeaders={dataSet.columns} rowHeaders={true} licenseKey="non-commercial-and-evaluation" data={dataSet.data} 
            afterSelection = {props.onSelect}
            afterChange={(changes) => {
                if (changes){
                    updateDataSet(recalculateColumns(dataSet))
                }
            }} contextMenu={{
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
                                updateDataSet(dataSet)
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
            afterRenderer={(TD, row, column, prop, value) => {
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
