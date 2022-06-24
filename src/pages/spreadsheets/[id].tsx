import { NextPage } from 'next'

const Spreadsheet: NextPage = () => {
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="w-full h-28 bg-gray-500"></div>
            <div className="w-full h-full bg-gray-300">
                <div className="cells"></div>
            </div>
        </div>
    )
}

export default Spreadsheet
