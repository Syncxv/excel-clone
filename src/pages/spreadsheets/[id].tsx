import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { CellClass } from '../../classes/Cell'
import { FunctionalComponent } from '../../types'
export type Column = { letter: string; cells: CellClass[] }
export const Cell: FunctionalComponent<{ className?: string }> = ({ children, className = '' }) => (
    <div className={`cell w-24 h-5 border-gray-800 border-opacity-50 border ${className}`}>{children}</div>
)

const Spreadsheet: NextPage = () => {
    const [grid, setGrid] = useState(createNewGrid())
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-full h-28 "></div>
            <div className="w-full h-full bg-gray-300 overflow-auto">
                <div className="headThingy"></div>
                <div className="cells flex">
                    {grid.map(col => (
                        <div key={col.letter} className={`${col.letter}`}>
                            <Cell>{col.letter}</Cell>
                            <div className="border-t border-gray-800 border-opacity-30"></div>
                            {col.cells.map(cell => (
                                <Cell key={cell.rowIndex}></Cell>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const createNewGrid = () => {
    let fucky: Column[] = []
    for (let i = 65; i < 91; ++i) {
        const colLetter = String.fromCharCode(i)
        console.log('CURRENT COL LETTER: ', colLetter)
        const bruh: Column = { letter: colLetter, cells: [] }
        for (let j = 0; j < 1000; ++j) {
            bruh.cells.push(new CellClass(colLetter, j))
        }
        fucky.push(bruh)
    }
    return fucky
}

export default Spreadsheet
