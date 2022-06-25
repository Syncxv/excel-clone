import { getId } from '../pages/spreadsheets/[id]'
import { sheetStore } from '../store/sheet'
import { sleep } from '../util/sleep'

export class CellClass {
    columnLetter: string
    rowIndex: number
    selected: { isPrimary: boolean; isSelected: boolean }
    constructor(columnLetter: string, rowIndex: number) {
        this.columnLetter = columnLetter
        this.rowIndex = rowIndex
        this.selected = { isPrimary: false, isSelected: false }
        this.onClick = this.onClick.bind(this)
        this.initalize()
    }
    get bruhTarget() {
        return document.getElementById(getId(this))
    }

    async initalize() {
        if (this.bruhTarget == null) await sleep(20)
        this.bruhTarget!.addEventListener('click', this.onClick)
    }

    onClick() {
        unSelectAll()
        this.selected = { isPrimary: true, isSelected: true }
        this.bruhTarget?.classList.add('selected-primary')
    }
    unSelectCurrent() {
        this.selected = { isPrimary: false, isSelected: false }
        this.bruhTarget?.classList.remove('selected-primary')
        console.log(this, this.bruhTarget)
    }
}

export const unSelectAll = () =>
    sheetStore
        .getState()
        .grid.map(s => s.cells)
        .flat()
        .filter(s => s.selected.isSelected)
        .forEach(s => s.unSelectCurrent())
