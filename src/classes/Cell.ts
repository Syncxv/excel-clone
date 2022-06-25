import { getId } from '../pages/spreadsheets/[id]'
import { sleep } from '../util/sleep'

export class CellClass {
    columnLetter: string
    rowIndex: number
    selected: { isPrimary: boolean; selected: boolean }
    constructor(columnLetter: string, rowIndex: number) {
        this.columnLetter = columnLetter
        this.rowIndex = rowIndex
        this.selected = { isPrimary: false, selected: false }
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
        this.selected = { isPrimary: true, selected: true }
        this.bruhTarget?.classList.add('selected-primary')
        console.log(this, this.selected)
    }
}
