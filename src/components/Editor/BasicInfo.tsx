import * as React from 'react';
import NumbersInput from '../Parts/NumbersInput';
import { prototypeConnect, PrototypeProps } from './scope';


function BasicInfo(props: PrototypeProps) {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="gameName">Game Name</label>
                <input type="text" className="form-control" id="gameName" defaultValue={props.name} onChange={(e) => {
                    const val = props.setName(e.target.value);
                    console.log("Set name", val);
                }} />
            </div>
            <div className="form-group">
                <label htmlFor="gameName">Author</label>
                <input type="text" className="form-control" id="gameName" defaultValue={props.authorUsername} onChange={(e) => props.setAuthor(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="gameName">Game Description</label>
                <textarea className="form-control" id="gameName" defaultValue={props.description} onChange={(e) => props.setDescription(e.target.value)} />
            </div>
            <span>Player Count</span>
            <NumbersInput onChange={(numbers) => {
                console.log("Set player counts", props.setPlayerCounts(numbers));
            }} numbers={props.allowedPlayerCounts} />
        </form>
    );
}

export default prototypeConnect()(BasicInfo);
