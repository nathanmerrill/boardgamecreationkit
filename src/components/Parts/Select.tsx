import * as React from 'react';
import { isObject } from 'util';
import { Nameable } from '../../store/types/Interfaces';


export function Select<T = string | string[] | number | Nameable>(props: {values: { [s: string]: T } | ArrayLike<T> , onChange: (selected: T | null) => void, selectedValue: T | null | string, disabled?: boolean, noneOption?: string, id?: string}) {
    let preselectedKey: string | null = null;
    
    const keys = Object.keys(props.values);
    const filteredKeys = keys.filter(a => !isNaN(Number(a))) // Enum contains twice as many keys, so if there is an option, we filter to just the numerics

    const items = (filteredKeys || keys).reduce((record: Record<string, T>, key) => {
        const item = ((props.values as any)[key] as T)
        const itemKey = isObject(item) && "id" in item ? (item as any).id : key   
        if (item === props.selectedValue || itemKey === props.selectedValue){
            preselectedKey = itemKey
        }

        record[itemKey] = item
        return record
    }, {})

    return (
        <select className="form-control" value={preselectedKey || ""} disabled={props.disabled} id={props.id} onChange={(e) => {
            const selectedKey: string = e.currentTarget.selectedOptions[0].value
            const newValue: T | null = selectedKey ? items[selectedKey] : null
            props.onChange(newValue)
        }}>
            {
                props.noneOption ? <option key={"select-"} value="">{props.noneOption}</option> : ""
            }
            {
                Object.keys(items).map((key) => {
                    const item = items[key]
                    return (
                    <option key={"dataSet-"+key} value={key} >{
                        isObject(item) && "name" in item ? (item as any).name : item
                    }</option>
                    )
                })
            }
        </select>
    )
}