import { useContext, useEffect } from 'react'
import { SheetManagerContext } from '../context/SheetManagerProvider'
import { FunctionalComponent } from '../types'

export const SpreadSheet: FunctionalComponent = () => {
    const woah = useContext(SheetManagerContext)
    useEffect(() => {
        console.log(woah)
        if (woah) {
            woah.sheetManager?.initalize()
        }
    }, [woah])
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-full h-28 "></div>
            <div className="w-full h-full overflow-auto">
                <div className="headThingy"></div>
                <canvas id="sheet" className="cells" />
            </div>
        </div>
    )
}
