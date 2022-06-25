import create from 'zustand'
import { Column, createNewGrid } from '../pages/spreadsheets/[id]'

export interface ISheetStore {
    grid: Column[]
    createNewGrid: () => void
}

export const sheetStore = create<ISheetStore>(set => ({
    grid: [],
    createNewGrid: () => {
        set((): Partial<ISheetStore> => ({ grid: createNewGrid() }))
    }
}))
