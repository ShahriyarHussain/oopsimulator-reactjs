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
        <div className="text-lg">
            <label>Enter table name</label>
            <input className="ml-2 border border-black" onChange={onChangeHandler}/>
            <button className="bg-cyan-400 rounded-sm font-bold" onClick={getTableData}>Fetch Data</button>
            {errorMsg !== "OK" ? errorMsg : ""}
            {tableData != null ?
            <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }
        </div>
    );
}

export default QueryData;