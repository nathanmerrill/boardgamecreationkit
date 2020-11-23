import * as React from 'react';
import { HasId } from '../../store/types/Interfaces';

export default function ForEach<T extends HasId> (props: {values: ArrayLike<T> | {[s: string]: T}, children: (val: T) => React.ReactNode}){
    return (
        <React.Fragment>
            {
                Object.values(props.values).map((val) =>
                    <React.Fragment key={val.id}>
                        {props.children(val)}
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}