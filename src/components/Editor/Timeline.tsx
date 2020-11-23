import * as React from 'react';
import DataSource, { DataSourceType } from '../../store/types/data/DataSource';
import DataType, { GetDefaultDataType, IsPrimitive, ToSingular } from '../../store/types/data/DataType';
import { Col, Input, Label, Row } from 'reactstrap';
import { GameAction, GamePhase } from '../../store/types/Timeline';
import { PrototypeContext } from './context';
import { Select } from '../Parts/Select';


function AvailableSubactions(){
    return (
        <React.Fragment />
    )
}

function DataSourceView(props: {dataSource: DataSource}){
    const returnType = props.dataSource.returnType
    const allowedValueTypes: Record<string, DataSourceType> = {}
    if(IsPrimitive(ToSingular(returnType))){
        allowedValueTypes["Literal"] = DataSourceType.Literal
    }
    
    allowedValueTypes["Piece"] = DataSourceType.Selector
    allowedValueTypes["Script"] = DataSourceType.Function
    if (!(returnType in [DataType.Action, DataType.Move, DataType.GameState, DataType.Actions, DataType.Moves])){
        allowedValueTypes["Player Selected"] = DataSourceType.PlayerSelected
    }
    

    return (
        <React.Fragment>
            { Object.keys(allowedValueTypes).length > 1 &&
                <React.Fragment>
                    <Label for="valueType">Source</Label>
                    <Select id="gameValueType" values={allowedValueTypes} selectedValue={props.dataSource.sourceType} onChange={(selected) => {
                        if (selected !== null) {
                            const additionalProps: any = {}
                            if (selected === DataSourceType.Function){
                                additionalProps.arguments = {}
                                additionalProps.scriptId = ""                                
                            }
                            if (selected === DataSourceType.Literal){
                                additionalProps.value = JSON.stringify(GetDefaultDataType(returnType))
                            }
                            if (selected === DataSourceType.PlayerSelected){
                                additionalProps.allowedOptions = {
                                    type: DataSourceType.Literal,
                                    returnType: DataType.Pieces,
                                    value: "[]"
                                }        
                            }
                            const newSource: DataSource = {

                                ...props.dataSource,
                            }
                            newSource.sourceType = selected
                        }
                    }}></Select>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

function ActionView(props: {action: GameAction}){
    const prototype = React.useContext(PrototypeContext)
    const gameValue = props.action.newGameState
    
    return (
        <React.Fragment>
            <Label for="actionName">Action name</Label>
            <Input id="actionName" value={props.action.name} onChange={(e) => prototype.setActionProps({"id": props.action.id, "name": props.action.name})} />
        </React.Fragment>
    )
}

function PhaseView(props: {phase: GamePhase}){
    
}


export default function Timeline() {
    const prototype = React.useContext(PrototypeContext)
    
    const startPhase = prototype.allPhases[prototype.startPhase]
    
    return (
        <Row>
            <Col xs={8}>
            </Col>
            <Col xs={4}>
                <AvailableSubactions />
            </Col>
        </Row>
    );
}
