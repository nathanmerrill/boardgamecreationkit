import * as React from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import { DataType, GameValue, GameValueType, ScriptedValue } from '../../store/types/BaseTypes';
import { GameAction, GamePhase } from '../../store/types/Timeline';
import { PrototypeContext } from './context';
import { Select } from '../Parts/Select';


function AvailableSubactions(){
    return (
        <React.Fragment />
    )
}

function GameValueView(props: {value: GameValue}){
    const returnType = props.value.returnType
    const allowedValueTypes: Record<string, GameValueType> = {}
    if (DataType.IsPrimitive(DataType.ToSingular(returnType))){
        allowedValueTypes["Literal"] = GameValueType.Literal
    }
    
    allowedValueTypes["Piece"] = GameValueType.Selector
    allowedValueTypes["Script"] = GameValueType.Function
    if (!(returnType in [DataType.Action, DataType.Move, DataType.GameState, DataType.Actions, DataType.Moves])){
        allowedValueTypes["Player Selected"] = GameValueType.PlayerSelected
    }
    

    return (
        <React.Fragment>
            { Object.keys(allowedValueTypes).length > 1 &&
                <React.Fragment>
                    <Label for="valueType">Source</Label>
                    <Select id="gameValueType" values={allowedValueTypes} selectedValue={props.value.type} onChange={(selected) => {
                        if (selected !== null) {
                            const additionalProps: any = {}
                            if (selected === GameValueType.Function){
                                additionalProps.arguments = {}
                                additionalProps.scriptId = ""                                
                            }
                            if (selected === GameValueType.Literal){
                                additionalProps.value = JSON.stringify(DataType.Default(returnType))
                            }
                            if (selected === GameValueType.PlayerSelected){
                                additionalProps.allowedOptions = {
                                    type: GameValueType.Literal,
                                    returnType: DataType.Pieces,
                                    value: "[]"
                                }
                                additionalProps.         
                            }
                            const newValue: GameValue = {

                                ...props.value,
                            }
                            newValue.type = selected
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
