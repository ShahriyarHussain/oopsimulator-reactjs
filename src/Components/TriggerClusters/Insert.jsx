import React, { useState } from "react";

function Insert() {
    const [errorMsg, setErrorMsg] = useState("SUCCESS");
    const [tableData, setTableData] = useState([{}]);
    const [insertMap, setInsertMap] = useState({});
    const [tableName, setTableName] = useState("");


    const insertData = () => {
        console.log(insertMap);
        console.log(tableName);
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/insertData/" + tableName, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(insertMap)
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("CHANGED ERROR MESG!")
                    setErrorMsg("Trigger Created!");
                }
            })
            .catch(error => setErrorMsg("Error! : " + error));
    }

    const onChangeHandler = e => {        
        setInsertMap((previousData) => {
            return {
                ...previousData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const onTableNameChange = e => {
        setErrorMsg("");
        setTableName(e.target.value);
    };

    function getTableData() {
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/queryTableData/" + tableName
        )
            .then(response => response.json())
            .then(data => {
                setTableData(data);
                setErrorMsg("SUCCESS1");
            })
            .catch(error => setErrorMsg("Error! : " + error));
        console.log(tableData);
    };


    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="font-bold text-2xl m-3">Insert a Row Into Table</label>
            <div className="rounded-lg mt-1">
                <span>{"INSERT INTO TABLE"}</span>
                <input className="border border-black w-fit max-w-fit ml-2 p-1 rounded-md" name="tableName" onChange={onTableNameChange} placeholder="Trigger Name" /><br />
                <button className="bg-cyan-400 rounded-md font-bold max-w-fit my-3 p-2" onClick={getTableData}>View Table Columns</button>
                {errorMsg === "SUCCESS1" ? 
                <table className="max-w-screen-sm m-3">
                    <thead>
                        <tr>
                            <th className="p-1 m-1 border border-black bg-slate-300" key={2}>Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(tableData[0]).map(
                            columnName =>
                                <tr>
                                    <td className="p-1 m-1 border border-black" key={columnName}>
                                        <input className="border border-black w-fit max-w-fit ml-2 p-1 rounded-md" name={columnName} onChange={onChangeHandler} placeholder={columnName} />
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table> : ""}
            </div>
            {errorMsg === "SUCCESS1" ? 
            <button className="bg-cyan-400 rounded-md font-bold max-w-fit my-3 p-2" onClick={insertData}>Insert Data</button> : ""
            }
            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
        </div>
    );
}

export default Insert;