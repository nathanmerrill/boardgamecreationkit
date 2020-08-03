import { nanoid } from '@reduxjs/toolkit';

export function fillData<T>(emptyType: T, data: Partial<T> = {}) {
    return () => {
        return {
            payload: {
                ...emptyType,
                id: nanoid(),
                ...data
            }
        }
    }
}

export function mapObject<T, U>(object: Record<string, U>, func: (value: U, key: string) => T) : Record<string, T>{
    return Object.keys(object).reduce((record, key) => {
        return {
            ...record,
            key: func(object[key], key)
        }
    }, {})
}