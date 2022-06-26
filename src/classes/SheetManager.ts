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
        this.frame = requestAnimationFrame(this.sheetLoop.bind(this))
        this.grid = this.newSheetGrid()
    }

    sheetLoop() {
        this.frame = requestAnimationFrame(this.sheetLoop.bind(this))
        this.ctx.fillStyle = 'rgb(0,0,0, 0.8)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    newSheetGrid() {
        let fucky: Column[] = []
        for (let i = 65; i < 91; ++i) {
            const colLetter = String.fromCharCode(i)
            console.log('CURRENT COL LETTER: ', colLetter)
            const bruh: Column = { letter: colLetter, cells: [] }
            for (let j = 0; j < 100; ++j) {
                bruh.cells.push(new CellClass(colLetter, j))
            }
            fucky.push(bruh)
        }
        return fucky
    }
}
