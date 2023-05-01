import React, { useState } from "react";
import Table from "../Table/Table";

function JoinOperation() {
    const [tableData, setTableData] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("OK");
    const [joinRequest, setJoinRequest] = useState([]);

    const operations = ["THETA JOIN", "NATURAL JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "RIGHT FULL JOIN"];



    const getTableData = () => {
        // fetch("http://localhost:15071/ra_simulator/projection" + tableName
        fetch("http://localhost:15071/ra_simulator/operation", {
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
        <div className="text-lg">
            <label>Enter table name</label>
            <input className="ml-2 border border-black" onChange={onTableNameChange} />
            <button className="bg-cyan-400 rounded-sm font-bold" onClick={getTableData}>Fetch Data</button>
            {errorMsg !== "OK" ? errorMsg : ""}
            {tableData != null ?
                <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }
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
    );
}

export default JoinOperation;