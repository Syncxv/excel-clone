import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { CellClass } from '../../classes/Cell'
import { FunctionalComponent } from '../../types'
export type Column = { letter: string; cells: CellClass[] }
export const Cell: FunctionalComponent<{ className?: string }> = ({ children, className = '' }) => (
    <div className={`cell w-24 h-5 border-gray-800 border-opacity-50 border ${className}`}>{children}</div>
)

const ColumnComponent: FunctionalComponent<{ col: Column }> = ({ col }) => (
    <div key={col.letter} className={`${col.letter}`}>
        <Cell className="flex items-center justify-center text-center bg-gray-300 font-semibold">{col.letter}</Cell>
        {/* <div className="border-t border-gray-800 border-opacity-30"></div> */}
        {col.cells.map(cell => (
            <Cell key={cell.rowIndex}></Cell>
        ))}
    </div>
)

const Spreadsheet: NextPage = () => {
    const [grid, setGrid] = useState(createNewGrid())
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-full h-28 "></div>
            <div className="w-full h-full overflow-auto">
                <div className="headThingy"></div>
                <div className="cells flex">
                    {grid.map(col =>
                        col.letter === 'A' ? (
                            <div className="flex">
                                <div className="flex flex-col">
                                    <Cell className="w-14"></Cell>
                                    {col.cells.map(cell => (
                                        <Cell className="flex items-center justify-center text-center bg-gray-300 w-14">
                                            {cell.rowIndex}{' '}
                                        </Cell>
                                    ))}
                                </div>
                                <ColumnComponent col={col} />
                            </div>
                        ) : (
                            <ColumnComponent col={col} />
                        )
                    )}
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
        for (let j = 0; j < 100; ++j) {
            bruh.cells.push(new CellClass(colLetter, j))
        }
        fucky.push(bruh)
    }
    return fucky
}

export default Spreadsheet
