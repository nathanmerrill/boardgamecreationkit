import * as React from 'react';

function range(start: number, stop: number): number[] {
    return Array.from({ length: stop - start })
        .map((_, index) => index + start)
}

function NumberCheckbox(num: number, onChange: ((event: number[]) => void), numbers: number[]) {
    return (
        <div className="form-check form-check-inline">
            <input type="checkbox" className="form-check-input" id={"numberCheck" + num} defaultChecked={numbers.includes(num)} onChange={(e) => {
                if (e.target.checked) {
                    onChange(numbers.concat([num]));
                } else {
                    onChange(numbers.filter(a => a !== num))
                }
            }} />
            <label className="form-check-label" htmlFor={"numberCheck" + num}>{num}</label>
        </div>
    );
}


export default function NumbersInput(props: { numbers: number[], onChange: ((event: number[]) => void) }) {
    const minCount = props.numbers.reduce((a, b) => a < b ? a : b, 100);
    const maxCount = props.numbers.reduce((a, b) => a > b ? a : b, 1);
    const checkboxes = range(minCount, maxCount + 1).map(num => NumberCheckbox(num, props.onChange, props.numbers));

    return (
        <div className="form-group">
            <div className="form-group form-inline">
                <label htmlFor="minCount" className="mr-2">Min</label>
                <input type="number" className="form-control" id="minCount" value={minCount} min={1} onChange={(e) => {
                    const newMin = e.target.valueAsNumber;
                    if (newMin > minCount) {
                        props.onChange(props.numbers.filter((a) => a >= e.target.valueAsNumber));
                    } else if (newMin < minCount) {
                        props.onChange(range(newMin, minCount).concat(props.numbers));
                    }
                    }} />
                <label htmlFor="maxCount" className="mx-2">Max</label>
                <input type="number" className="form-control" id="maxCount" value={maxCount} max={100} onChange={(e) => {
                    const newMax = e.target.valueAsNumber;
                    if (newMax < maxCount) {
                        console.log("Shrinking range")
                        props.onChange(props.numbers.filter((a) => a <= e.target.valueAsNumber));
                    } else if (newMax > maxCount) {
                        props.onChange(props.numbers.concat(range(maxCount + 1, newMax + 1)))
                    }
                }} />
            </div>
            {
                maxCount - minCount > 1 ? checkboxes : ''
            } 
        </div>
    );
}
