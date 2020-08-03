import * as React from 'react';
import GameAction from '../../store/types/GameAction';
import { ActionContext, PrototypeContext } from './context';
import { Col, Input, Label, Row } from 'reactstrap';
import { DataType, GameValue, GameValueType, ScriptedValue } from '../../store/types/BaseTypes';
import { Select } from '../Parts/Select';


function AvailableSubactions(){
    return (
        <React.Fragment />
    )
}

function GameValueView(props: {value: GameValue}){
    const returnType = props.value.returnType
    const allowedValueTypes: Record<string, GameValueType> = {}
    if (returnType in [DataType.String, DataType.Strings, DataType.Number, DataType.Number, DataType.Boolean, DataType.Booleans]){
        allowedValueTypes["Literal"] = GameValueType.Literal
    }

    allowedValueTypes["Part"] = GameValueType.Function
    if (!(returnType in [DataType.Action, DataType.Move, DataType.GameState, DataType.Actions, DataType.Moves])){
        allowedValueTypes["Player Selected"] = GameValueType.PlayerSelected
    }
    

    return (
        <React.Fragment>
            { Object.keys(allowedValueTypes).length > 1 &&
                <React.Fragment>
                    <Label for="valueType">Source</Label>
                    <Select id="gameValueType" values={allowedValueTypes} selectedValue={props.value.type} onChange={(selected) => {
                        if (selected === null) {
                            const additionalProps: any = {}
                            if (selected === GameValueType.Function){
                                additionalProps.arguments = {}
                                additionalProps.scriptId = ""                                
                            }
                            if (selected === GameValueType.Literal){
                                switch (returnType){
                                    case DataType.Number:
                                        additionalProps.value = "0"
                                    case DataType.String:
                                        additionalProps.value = ""
                                    case DataType.Boolean:
                                        additionalProps.value = "false"
                                    case DataType.Numbers:
                                    case DataType.Booleans:
                                    case DataType.Strings:
                                        additionalProps.value = "[]"
                                }                              
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


export default function Timeline() {
    const prototype = React.useContext(PrototypeContext)
    const rootAction = prototype.allActions[prototype.rootAction]
    
    return (
        <ActionContext.Provider value={rootAction}>
            <Row>
                <Col xs={8}>
                    <ActionView action={rootAction} />
                </Col>
                <Col xs={4}>
                    <AvailableSubactions />
                </Col>
            </Row>
        </ActionContext.Provider>
    );
}
