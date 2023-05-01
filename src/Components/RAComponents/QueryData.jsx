import React, { useState } from "react";
import Table from "../Table/Table";

function QueryData() {
    const [tableData, setTableData] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("OK");
    const [tableName, setTableName] = useState("OK");


    const getTableData = () => {
        fetch("http://localhost:15071/trigger_&_cluster/queryTableData/" + tableName
        )
    .then(response => response.json())
    .then(data => setTableData(data))
    .catch(error => setErrorMsg("Error! : " + error))
    };

    const onChangeHandler = e => {
        setErrorMsg("");
        setTableName(e.target.value);
      };


    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="font-bold text-2xl m-3">Query Any Table</label>
            <label>Enter table name</label>
            <input className="border border-black max-w-fit m-2 p-1 rounded-md" onChange={onChangeHandler}/>
            <button className="bg-cyan-400 rounded-md font-bold max-w-fit m-2 p-2" onClick={getTableData}>Fetch Data</button>
            {errorMsg !== "OK" ? errorMsg : ""}
            {tableData != null ?
            <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }
        </div>
    );
}

export default QueryData;