import React, { useState } from "react";

function Cluster() {
    const [errorMsg, setErrorMsg] = useState("");
    const [tableName, setTableName] = useState("");


    const performCluster = () => {        
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/createCluster/" + tableName, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST"
        })
            .then(response => {
                if (response.status === 200) {
                    setErrorMsg("Table Clustering Complete");
                }
            })
            .catch(error => setErrorMsg("Error! : " + error))
    }

    const onTableNameChange = e => {
        setErrorMsg("");
        setTableName(e.target.value);
    };

    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="font-bold text-2xl m-3">Clustering</label>
            <label className="text-sm text-gray-500 mb-3 ">Clustering re-organizes the data in a table for faster query time</label>
            <label className="text-sm text-gray-500 mb-3 ">To have have noticeable improvement the table must have a large amount of Data</label>
            <label className="text-sm text-gray-500 mb-3 ">Periodically clustering table can help improve application</label>
            <div className="bg-slate-100 p-5 w-1/3 rounded-lg mt-1 font-bold">
                <span>{"CLUSTER"}</span> 
                <input className="border border-black w-fit max-w-fit mx-2 p-1 rounded-md" name="tableName" onChange={onTableNameChange} placeholder="Table Name" />
                <span>{"USING PRIMARY KEY"}</span> <br />
            </div>
            <button className="bg-cyan-400 rounded-md font-bold max-w-fit my-3 p-2" onClick={performCluster}>Cluster Table</button>
            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
        </div>
    );
}

export default Cluster;