import React, { useState } from "react";
import Table from "../Table/Table";

function Projection() {
    const [tableData, setTableData] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("OK");
    const [tableName, setTableName] = useState("OK");
    const [projection, setProjection] = useState([]);



    const getTableData = () => {
        // fetch("http://localhost:15071/ra_simulator/projection" + tableName
        fetch(process.env.REACT_APP_BASE_URL + "ra_simulator/projection/" + tableName, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(projection)
        })
            .then(response => response.json())
            .catch(error => setErrorMsg("Error! : " + error))
            .then(data => setTableData(data))
            .catch(error => setErrorMsg("Error! : " + error))
    };

    const onTableNameChange = e => {
        setErrorMsg("");
        setTableName(e.target.value);
    };

    const onAttributeSelection = e => {
        let value = e.target.value;
        if (projection.includes(value)) {
            projection.splice(projection.indexOf(value), 1);
        } else {
            projection.push(value);
        }
        setProjection([
            ...projection,
            
        ]);
    };


    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="font-bold text-2xl mt-3 mx-3">Projection(π)</label>
            <label className="text-sm text-gray-500 mb-3 ">(First query table then choose projection/columns)</label>
            <label>Enter table name</label>
            <input className="border border-black max-w-fit m-2 p-1 rounded-md" onChange={onTableNameChange}/>
            <div className="flex-row">
            {Object.keys(tableData[0]).map(attribute =>
                <label>
                    <input className="m-2 border-2 border-green-500"
                        type="checkbox"
                        checked={projection.includes(attribute)}
                        value={attribute}
                        onClick={onAttributeSelection} />
                    {attribute}
                </label>)
            }
            </div>
            <button className="bg-cyan-400 rounded-md font-bold max-w-fit my-3 p-2" onClick={getTableData}>View Table Data</button>
            {errorMsg !== "OK" ? errorMsg : ""}
            {tableData != null ?
                <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }            
        </div>
    );
}

export default Projection;