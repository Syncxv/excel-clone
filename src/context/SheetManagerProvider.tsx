import { createContext, useEffect, useState } from 'react'
import { SheetManager } from '../classes/SheetManager'
import { FunctionalComponent } from '../types'

export interface ISheetManagerContext {
    sheetManager: SheetManager | null
}

export const SheetManagerContext = createContext<ISheetManagerContext>({ sheetManager: null })

export const SheetManagerProvider: FunctionalComponent = ({ children }) => {
    const [val, setManager] = useState<ISheetManagerContext>({ sheetManager: null })
    useEffect(() => {
        setManager({ sheetManager: new SheetManager() })
        console.log('SET SHEET MANAGER')
    }, [])
    console.log(val)
    return <SheetManagerContext.Provider value={val}>{children}</SheetManagerContext.Provider>
}
