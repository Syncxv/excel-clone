import { getId } from '../pages/spreadsheets/[id]'

export class CellClass {
    columnLetter: string
    rowIndex: number
    selected: { isPrimary: boolean; selected: boolean }
    constructor(columnLetter: string, rowIndex: number) {
        this.columnLetter = columnLetter
        this.rowIndex = rowIndex
        this.selected = { isPrimary: false, selected: false }
    }
    get target() {
        return document.getElementById(getId(this))
    }
    onClick() {
        this.selected = { isPrimary: true, selected: true }
    }
}
