import dynamic from 'next/dynamic'
import { CellClass } from './Cell'
export type Column = { letter: string; cells: CellClass[] }

export class SheetManager {
    canvas!: HTMLCanvasElement
    ctx!: CanvasRenderingContext2D
    frame!: number
    grid!: Column[]

    initalize() {
        this.canvas = document.getElementById('sheet') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d')!
        this.grid = this.newSheetGrid()
        this.canvas.width = this.grid.reduce((prev, curr) => prev + curr.cells[0].width, 0)
        this.canvas.height = this.grid[0].cells.reduce((prev, curr) => prev + curr.height, 0)
        this.frame = requestAnimationFrame(this.sheetLoop.bind(this))
    }

    sheetLoop() {
        const { ctx } = this
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
}
