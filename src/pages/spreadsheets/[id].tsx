import { NextPage } from 'next'
import { CellClass } from '../../classes/Cell'
import { Column } from '../../classes/SheetManager'
import { SpreadSheet } from '../../components/SpreadSheet'
import { SheetManagerProvider } from '../../context/SheetManagerProvider'

const SpreadsheetBruhMoment: NextPage = () => {
    return (
        <SheetManagerProvider>
            <SpreadSheet />
        </SheetManagerProvider>
    )
}

export const getId = (item: Column | CellClass, prefix: string = ''): string => {
    if (item instanceof CellClass) {
        return `${prefix}col-${item.columnLetter}-cell-${item.rowIndex}`
    }
    return `${prefix}col-${item.letter}`
}

export default SpreadsheetBruhMoment
