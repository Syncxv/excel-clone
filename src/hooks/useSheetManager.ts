import { useContext } from 'react'
import { SheetManagerContext } from '../context/SheetManagerProvider'

export const useSheetManager = () => useContext(SheetManagerContext)
