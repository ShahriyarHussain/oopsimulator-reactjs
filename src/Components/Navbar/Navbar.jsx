import React, { useState } from "react";
import Projection from '../RAComponents/Projection';
import QueryData from '../TriggerClusters/QueryData';
import RaOperation from '../RAComponents/RaOperation';
import Selection from '../RAComponents/Selection';
import RenameColumn from "../RAComponents/RenameColumn";
import JoinOperation from "../RAComponents/JoinOperation";
import Trigger from "../TriggerClusters/Trigger";
import Insert from "../TriggerClusters/Insert";
import Cluster from "../TriggerClusters/Cluster";


function Navbar() {
    const [navIndex, setNavIndex] = useState(0);

    const navBarMenu = ['Query Table', 'Selection',
        'Projection', 'Relational Algebra',
        'Rename', 'Join Operations', 'Triggers', 'Insert', 'Cluster'];
    const operationWindows = [<QueryData />, <Selection />, <Projection />,
    <RaOperation />, <RenameColumn />, <JoinOperation />, <Trigger/>, <Insert/>, <Cluster/>];

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