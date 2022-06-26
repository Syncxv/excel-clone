import dynamic from 'next/dynamic'
import { CellClass } from './Cell'
export type Column = { letter: string; cells: CellClass[] }

export class SheetManager {
    canvas!: HTMLCanvasElement
    ctx!: CanvasRenderingContext2D
    frame!: number
    grid!: Column[]
    pos = {
        x: 0,
        y: 0
    }

    initalize() {
        this.canvas = document.getElementById('sheet') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d')!
        this.grid = this.newSheetGrid()
        this.canvas.width = this.grid.reduce((prev, curr) => prev + curr.cells[0].width, 0)
        this.canvas.height = this.grid[0].cells.reduce((prev, curr) => prev + curr.height, 0)
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        this.canvas.addEventListener('mouseout', this.onMouseOut.bind(this))
        this.canvas.addEventListener('click', this.onClick.bind(this))
        this.frame = requestAnimationFrame(this.sheetLoop.bind(this))
    }
    getCells() {
        return this.grid.map(s => s.cells).flat()
    }
    sheetLoop() {
        this.frame = requestAnimationFrame(this.sheetLoop.bind(this))
        this.grid
            .map(s => s.cells)
            .flat()
            .forEach(s => s.draw())
    }
    newSheetGrid() {
        let fucky: Column[] = []
        for (let i = 65; i < 91; ++i) {
            const colLetter = String.fromCharCode(i)
            console.log('CURRENT COL LETTER: ', colLetter)
            const bruh: Column = { letter: colLetter, cells: [] }
            for (let j = 0; j < 100; ++j) {
                bruh.cells.push(new CellClass(colLetter, j, this.ctx))
            }
            fucky.push(bruh)
        }
        return fucky
    }

    onMouseMove(e: MouseEvent) {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
        this.pos.x = e.clientX - rect.left
        this.pos.y = e.clientY - rect.top
    }
    onMouseOut() {
        this.pos.x = -1
        this.pos.y = -1
    }
    onClick(e: MouseEvent) {
        console.log(this.pos)
        const { pos } = this
        const cells = this.getCells()
        const cell = cells.find(cell => pos.x < cell.x + cell.width && pos.y < cell.y + cell.height)
        console.log(cell)
        if (cell) cell.select(true)
    }
}
