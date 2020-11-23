enum DataType {
    String, Number, Boolean, Piece, Player, Location, Side, Action, Move, GameState,
    Strings, Numbers, Booleans, Pieces, Players, Locations, Sides, Actions, Moves,
}

export const GetDefaultDataType = function(dataType: DataType){
    if (IsPlural(dataType)){
        return []
    }
    
    switch (dataType){
        case DataType.String: return ""
        case DataType.Number: return 0
        case DataType.Boolean: return false
    }

    return null
}

export function IsPlural(dataType: DataType){
    return dataType.valueOf() >= DataType.Strings.valueOf()
}

export function ToPlural(dataType: DataType){
    if (IsPlural(dataType) || dataType === DataType.GameState){
        return dataType
    }
    
    return dataType + DataType.Strings.valueOf();
}

export function ToSingular(dataType: DataType){
    if (IsPlural(dataType)){
        return dataType - DataType.Strings.valueOf();
    }
    
    return dataType;
}

export function IsPrimitive(dataType: DataType){
    switch (dataType){
        case DataType.String:
        case DataType.Number:
        case DataType.Boolean:
            return true;
    }
    
    return false;
}

export default DataType