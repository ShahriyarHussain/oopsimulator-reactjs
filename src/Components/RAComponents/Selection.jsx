import React, { useState } from "react";
import Table from "../Table/Table";

function Selection() {
    const [tableData, setTableData] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("OK");
    const [tableName, setTableName] = useState("OK");
    const [whereClause, setWhereClause] = useState({});

    const comparers = ["=", ">", " <"]


    const getTableData = () => {
        setErrorMsg("OK");
        let body = [];
        if (whereClause.attribute != null) {
            body = [whereClause];
        }

        fetch("http://localhost:15071/ra_simulator/selection/" + tableName, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch(error => setErrorMsg("Error! : " + error))
            .then(data => {
                setTableData(data);
                setErrorMsg("SUCCESS!");
            })
            .catch(error => setErrorMsg("Error! : " + error))
    };

    const onChangeHandler = e => {
        setErrorMsg("");
        setTableName(e.target.value);
    };

    const onWhereClauseChange = e => {
        setWhereClause((previousData) => {
            return {
                ...previousData,
                [e.target.name]: e.target.value,
            };
        });
    };

    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="font-bold text-2xl m-3">Selection</label>
            <label className="text-sm text-gray-500 mb-3 ">(First query table then choose selection/whereClause)</label>
            <div className="flex-row">
                <label>Select * FROM </label>
                <input className="border border-black max-w-fit m-2 p-1 rounded-md" onChange={onChangeHandler} />
                <button className="bg-cyan-400 rounded-md font-bold max-w-fit m-2 p-2" onClick={getTableData}>Fetch Data</button>
                {!errorMsg.startsWith("Error! : ") ?
                    <Table headers={Object.keys(tableData[0])} rows={tableData} /> : errorMsg
                }
                {errorMsg.startsWith("SUCCESS") ?
                    <div className="mt-2">
                        <label>Where</label>
                        <select
                            className=' p-1 text-black bg-cyan-100 border border-black ml-3'
                            name="attribute"
                            onChange={onWhereClauseChange}>
                            <option className=' text-black rounded-xl' />
                            {Object.keys(tableData[0]).map(optionValue =>
                                <option className=' text-black rounded-xl'>
                                    {optionValue}
                                </option>
                            )}
                        </select>
                        <select
                            className=' p-1 text-black bg-cyan-100 border border-black ml-3'
                            name="comparer"
                            onChange={onWhereClauseChange}>
                            <option className=' text-black rounded-xl' />
                            {comparers.map(comparer =>
                                <option className=' text-black rounded-xl'>
                                    {comparer}
                                </option>
                            )}
                        </select>
                        <input className="ml-2 border border-black max-w-md" name="value" onChange={onWhereClauseChange} />
                    </div>
                    : ""}
            </div>
        </div>
    );
}

export default Selection;