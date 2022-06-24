import { NextPage } from 'next'
import { useEffect } from 'react'
import { CellClass } from '../../classes/Cell'
import { FunctionalComponent } from '../../types'
export type Column = { letter: string; cells: CellClass[] }
export const Cell: FunctionalComponent = ({ children }) => (
    <div className="cell w-24 h-5 border-gray-800 border-opacity-50 border">{children}</div>
)

const Spreadsheet: NextPage = () => {
    useEffect(() => {
        console.log(createNewGrid())
    }, [])
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-full h-28 bg-gray-500"></div>
            <div className="w-full h-full bg-gray-300">
                <div className="cells"></div>
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
