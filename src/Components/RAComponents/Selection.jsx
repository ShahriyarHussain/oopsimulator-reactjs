import React, { useState } from "react";
import Table from "../Table/Table";

function Selection() {
    const [tableData, setTableData] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("OK");
    const [tableName, setTableName] = useState("OK");
    const [whereClause, setWhereClause] = useState({});

    const comparers = ["=", ">", " <"]


    const getTableData = () => {
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
            .then(data => setTableData(data))
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
        console.log(whereClause);
    };

    return (
        <div className="text-lg">
            <label>Select * FROM </label>
            <input className="ml-2 border border-black" onChange={onChangeHandler} />
            <button className="bg-cyan-400 rounded-sm font-bold" onClick={getTableData}>Fetch Data</button>
            {errorMsg !== "OK" ? errorMsg : ""}
            {tableData != null ?
                <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }
            <label>Where</label>
            {errorMsg !== "OK" ?
                <select
                    className=' p-1 text-black bg-cyan-100 border border-black ml-3'
                    name="attribute"
                    onChange={onWhereClauseChange}>
                    <option className=' text-black rounded-xl'/>
                    {Object.keys(tableData[0]).map(optionValue =>
                        <option className=' text-black rounded-xl'>
                            {optionValue}
                        </option>
                    )}                    
                </select> : ""}
            <input className="ml-2 border border-black" name="value" onChange={onWhereClauseChange} />
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
        </div>
    );
}

export default Selection;