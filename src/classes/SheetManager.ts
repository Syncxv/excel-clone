import dynamic from 'next/dynamic'
import { CanvasAPI } from './CanvasAPI'
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
    canvasAPI!: CanvasAPI
    startingCell!: CellClass
    initalize() {
        this.canvas = document.getElementById('sheet') as HTMLCanvasElement
        this.ctx = this.canvas.getContext('2d')!
        this.grid = this.newSheetGrid()
        this.canvas.width =
            this.grid.reduce((prev, curr) => prev + curr.cells[0].width + curr.cells[0].strokeWidth, 0) + 1
        this.canvas.height = this.grid[0].cells.reduce((prev, curr) => prev + curr.height + curr.strokeWidth, 0) + 1
        this.canvasAPI = new CanvasAPI(this.ctx)
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this))
        this.canvas.addEventListener('mouseout', this.onMouseOut.bind(this))
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this))
        this.frame = requestAnimationFrame(this.sheetLoop.bind(this))
    }
    getCells() {
        return this.grid.map(s => s.cells).flat()
    }
    sheetLoop() {
        this.frame = requestAnimationFrame(this.sheetLoop.bind(this))
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.grid
            .map(s => s.cells)
            .flat()
            .forEach(s => s.draw(this.canvasAPI))
        this.renderPrimaryBoxThigy()
    }
    renderPrimaryBoxThigy() {
        const primarySelected = this.getCells().find(s => s.selected.isPrimary)
        if (primarySelected) {
            this.ctx.strokeStyle = 'black'
            this.ctx.lineWidth = 1
            this.ctx.fillStyle = '#62A1FF'
            this.ctx.fillRect(
                primarySelected.x + primarySelected.width - primarySelected.boxBottomOffset,
                primarySelected.y + primarySelected.height - primarySelected.boxBottomOffset,
                10,
                10
            )
            this.ctx.strokeStyle = 'white'
            this.ctx.lineWidth = 1
            this.ctx.strokeRect(
                primarySelected.x + primarySelected.width - primarySelected.boxBottomOffset,
                primarySelected.y + primarySelected.height - primarySelected.boxBottomOffset,
                10,
                10
            )
        }
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
    onMouseDown() {
        this.startingCell = this.getCells().find(
            cell => this.pos.x < cell.x + cell.width && this.pos.y < cell.y + cell.height
        )!
    }

    onMouseUp() {
        const cell = this.getCells().find(
            cell => this.pos.x < cell.x + cell.width && this.pos.y < cell.y + cell.height
        )!
        if (this.startingCell === cell) return cell.onClick()
        console.log({ startingCell: this.startingCell, cell })
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
        if (cell) cell.onClick()
    }
}
