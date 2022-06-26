import { ISelected } from './Cell'

export class CanvasAPI {
    private ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.rect = this.rect.bind(this)
        this.stroke = this.stroke.bind(this)
        this.fill = this.fill.bind(this)
        this.drawCell = this.drawCell.bind(this)
    }
    rect(x: number, y: number, width: number, height: number) {
        this.ctx.beginPath()
        this.ctx.rect(x, y, width, height)
    }
    fill() {
        this.ctx.fill()
    }
    stroke() {
        this.ctx.stroke()
    }

    drawCell(x: number, y: number, width: number, height: number, selected: ISelected) {
        this.ctx.fillStyle = '#FFFFFF'
        this.ctx.fillRect(x, y, width, height)

        this.ctx.strokeStyle = selected.isPrimary ? '#62A1FF' : '#7C7C7C'
        this.ctx.lineWidth = selected.isPrimary ? 3 : 1
        this.ctx.strokeRect(x, y, width, height)
    }
}
