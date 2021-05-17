//import { useEffect, useState } from 'react';

function Loader() {
    return (
        <div className="loaded">
            <div className="bg-indigo-500 relative flex justify-center items-center h-20">
                <div className="rounded animate-spin ease duration-300 w-5 h-5 border-2 border-white"></div>
            </div>
        </div>
    )
}

export default Loader;
