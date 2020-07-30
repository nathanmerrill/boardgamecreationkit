import * as React from 'react';
import NumbersInput from '../Parts/NumbersInput';
import { FormGroup, Label, Input } from 'reactstrap';
import { PrototypeContext } from './context';


export default function BasicInfo() {
    const prototype = React.useContext(PrototypeContext)
    return (
        <form>
            <FormGroup>
                <Label for="gameName">Game Name</Label>
                <Input id="gameName" defaultValue={prototype.name} onChange={(e) => prototype.setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="author">Author</Label>
                <Input id="author" defaultValue={prototype.authorUsername} onChange={(e) => prototype.setAuthor(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="gameDescription">Game Description</Label>
                <Input type="textarea" id="gameDescription" defaultValue={prototype.authorUsername} onChange={(e) => prototype.setDescription(e.target.value)} />
            </FormGroup>
            <label>Player Count</label>
            <NumbersInput onChange={(numbers) => prototype.setPlayerCounts(numbers)} numbers={prototype.allowedPlayerCounts} />
        </form>
    );
}
