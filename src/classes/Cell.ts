const letterMap: { [key: string]: number } = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25
}

export class CellClass {
    columnLetter: string
    rowIndex: number
    selected: { isPrimary: boolean; isSelected: boolean }
    height: number
    ctx: CanvasRenderingContext2D
    width: number
    constructor(columnLetter: string, rowIndex: number, ctx: CanvasRenderingContext2D) {
        this.columnLetter = columnLetter
        this.rowIndex = rowIndex
        this.ctx = ctx
        this.selected = { isPrimary: false, isSelected: false }
        this.height = 10
        this.width = 40
        this.onClick = this.onClick.bind(this)
        this.initalize()
    }

    async initalize() {}

    draw() {
        const { ctx } = this
        ctx.beginPath()
        ctx.rect(letterMap[this.columnLetter] * this.width, this.rowIndex * this.height, this.width, this.height)
        ctx.stroke()
    }

    onClick() {
        unSelectAll()
        this.select(true)
    }

    select(isPrimary: boolean = false) {
        this.selected = { isPrimary, isSelected: true }
    }
    unSelect() {
        this.selected = { isPrimary: false, isSelected: false }
    }
}

export const unSelectAll = () => {}
// sheetManager.grid
//     .map(s => s.cells)
//     .flat()
//     .filter(s => s.selected.isSelected)
//     .forEach(s => s.unSelect())
