import * as React from 'react';
import Prototype from '../../store/types/Prototype';
import { PrototypeContext } from '../Editor/context';

const svgError = '<svg style="height: 512px; width: 512px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 0h512v512H0z" fill="#ffffff" fill-opacity="1"></path><g class="" style="touch-action: none;" transform="translate(0,0)"><path d="M254.97 34.75c-30.48-.167-59.02 22.12-79.532 62.156-.075.146-.176.26-.25.406L43.063 326.783l-.22.343C18.5 365.413 13.377 401.515 28.47 428.03c15.08 26.498 48.627 40.126 93.5 37.908H387.063c44.887 2.227 78.445-11.404 93.53-37.907 15.09-26.51 9.956-62.595-14.375-100.874l-.22-.375L335.28 98.064c-.06-.12-.124-.225-.186-.344-20.948-40.263-49.626-62.803-80.125-62.97zm.06 18.844c13.576.13 26.453 6.93 38.126 18.343 11.606 11.347 22.554 27.453 33.406 48.344.063.122.125.224.188.345l115.22 201.563c.033.053.058.102.092.156l.125.22c12.92 20.274 21.395 38.06 25.282 53.967 3.91 16.01 3.063 30.648-3.845 42.408-6.908 11.76-19.222 19.533-34.78 23.906-15.444 4.34-34.508 5.656-57.408 4.5H137.625c-24.845 1.258-44.73-.32-60.405-5.125-15.78-4.84-27.68-13.45-33.72-25.69-6.04-12.237-5.862-26.797-1.5-42.436 4.333-15.535 12.815-32.608 24.875-51.53l.22-.377L183.562 120c.08-.157.17-.28.25-.438C194.51 98.644 205.32 82.6 216.875 71.376c11.642-11.307 24.58-17.913 38.156-17.78zm47.657 62.093l-28.53 224.032h-41.844L204.438 120.5c-1.404 2.556-2.81 5.205-4.22 7.97l-.093.218-.125.218-116.938 202.97-.093.187-.126.187C71.28 350.346 63.598 366.226 60 379.125c-3.598 12.9-3.108 22.322.25 29.125 3.358 6.803 9.925 12.28 22.47 16.125 12.542 3.845 30.67 5.547 54.405 4.313l.25-.032h234.313l.25.03c21.85 1.138 39.308-.28 51.875-3.81 12.566-3.533 19.822-8.827 23.687-15.407 3.865-6.58 4.978-15.545 1.813-28.5-3.166-12.958-10.732-29.374-23.094-48.72l-.126-.188-.125-.218-115.658-202.28-.093-.158-.064-.187c-2.5-4.828-4.99-9.326-7.47-13.532zM231.28 361.875h43.907v43.906H231.28v-43.905z" fill="#000000" fill-opacity="1" transform="translate(76.8, 76.8) scale(0.7, 0.7) rotate(-360, 256, 256)"></path></g></svg>'

function FetchImage(image: string, prototype: Prototype): string {
    let imageId = image;
    if (image){
        if (image.startsWith('<')){
            return image;
        }
        if (image.startsWith('{')){
            try {
                imageId = JSON.parse(imageId).id;
            } catch(e){}
        }
    }

    if (prototype && imageId){
        const image = prototype.allImages[imageId]
        if (image){
            return image.svg
        }
    }

    return svgError
}

export function ImageDisplay(props: {image: string, size?: number|string, errorImage?: string}){
    const prototype = React.useContext(PrototypeContext)

    const imageResolved = FetchImage(props.image, prototype);

    const size = props.size || 100;
    
    return <div className="svg-container" style={{width: size, height: size}} dangerouslySetInnerHTML={{__html: imageResolved}}/>    
}