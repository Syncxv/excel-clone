import { getId } from '../pages/spreadsheets/[id]'
import { sheetStore } from '../store/sheet'
import { setEmptyImage } from '../util/setEmptyImage'
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
        this.onDragStart = this.onDragStart.bind(this)
        this.onDragOver = this.onDragOver.bind(this)
        this.initalize()
    }
    get bruhTarget() {
        return document.getElementById(getId(this))
    }

    async initalize() {
        if (this.bruhTarget == null) await sleep(20)
        Object.assign(this.bruhTarget!, { cell: this })
        this.bruhTarget!.addEventListener('click', this.onClick)
        this.bruhTarget!.addEventListener('dragstart', this.onDragStart)
        this.bruhTarget!.addEventListener('dragover', this.onDragOver)
    }

    onClick() {
        unSelectAll()
        this.select(true)
    }

    onDragStart(e: DragEvent) {
        // e.preventDefault()
        setEmptyImage(e)
        unSelectAll()
        this.select()
        console.log(this)
    }

    onDragOver(e: DragEvent) {
        console.log('DRAGING OVER')
        this.select()
    }
    select(isPrimary: boolean = false) {
        this.selected = { isPrimary, isSelected: true }
        this.bruhTarget?.classList.add(`selected${isPrimary ? '-primary' : ''}`)
    }
    unSelect() {
        this.selected = { isPrimary: false, isSelected: false }
        this.bruhTarget?.classList.remove('selected-primary', 'selected')
        console.log(this, this.bruhTarget)
    }
}

export const unSelectAll = () =>
    sheetStore
        .getState()
        .grid.map(s => s.cells)
        .flat()
        .filter(s => s.selected.isSelected)
        .forEach(s => s.unSelect())
