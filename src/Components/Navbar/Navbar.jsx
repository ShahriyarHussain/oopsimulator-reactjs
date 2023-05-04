import React, { useState } from "react";
import Projection from '../RAComponents/Projection';
import QueryData from '../RAComponents/QueryData';
import RaOperation from '../RAComponents/RaOperation';
import Selection from '../RAComponents/Selection';


function Navbar() {
    const [navIndex, setNavIndex] = useState(0);

    const navBarMenu = ['Query Any Table', 'Selection Operation',
        'Projection Operation', 'Basic Relational Algebra Operations',
        'Join Operations'];
    const operationWindows = [<QueryData />, <Selection />, <Projection />, <RaOperation />];

    return (
        <div>
            <div className="border-b-2 border-black rounded-lg">
                {navBarMenu.map((name, index) =>
                    <button className="rounded-lg mx-2 my-1 p-3 font-bold text-xl border border-slate-600"
                        style={{ backgroundColor: index === navIndex ? "rgb(165 243 252)" : "rgb(236 254 255)" }}
                        key={index} onClick={() => setNavIndex(index)}>{name}</button>
                )}
            </div>
            <div>
                {operationWindows[navIndex]}
            </div>
        </div>
    );
}

export default Navbar;