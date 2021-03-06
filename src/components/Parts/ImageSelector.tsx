import * as React from 'react';
import ForEach from './ForEach';
import GameImage, { EMPTY_GAME_IMAGE } from '../../store/types/entities/GameImage';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ImageDisplay } from './ImageDisplay';
import { nanoid } from '@reduxjs/toolkit';
import { PrototypeContext } from '../Editor/context';


export function ImageSelector(props: {onSelect: ((image: GameImage) => void)}){
    const prototype = React.useContext(PrototypeContext)
    return (
        <Modal fade tabIndex={-1} id="imageModal" size="lg">
            <ModalHeader>Select image</ModalHeader>
            <ModalBody>
                <ForEach values={prototype.allImages}>
                    {image => 
                        <Button onClick={() => props.onSelect(image)} data-dismiss="modal">
                            <ImageDisplay image={image.svg} />
                        </Button>
                    }
                </ForEach>
            </ModalBody>
            <ModalFooter>
                <Input id="svgUpload" type="file" accept=".svg" onChange={(e) =>{
                    if (e.target.files){
                        const fileReader = new FileReader();
                        fileReader.onload = () => {
                            if (fileReader.result){
                                prototype.addImage({...EMPTY_GAME_IMAGE, id: nanoid(),svg: fileReader.result as string});
                            }
                        }
                        fileReader.readAsText(e.target.files[0])
                    }
                }} />
                <Label for="svgUpload">Upload SVG</Label>
                <Button>Save changes</Button>
                <Button color="secondary" data-dismiss="modal">Close</Button>
            </ModalFooter>
        </Modal>
    )
}
