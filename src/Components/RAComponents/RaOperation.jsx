import React, { useState } from "react";
import Table from "../Table/Table";

function RaOperation() {
    const [tableData, setTableData] = useState([{}]);
    const [table1Data, setTable1Data] = useState([{}]);
    const [table2Data, setTable2Data] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("SUCCESS");
    const [operation, setOperation] = useState("");

    const operations = ["Union(U)", "Difference(-)", "Intersect(∩)"];

    const loadInitialTableData = () => {
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/queryTableData/student"
        )
            .then(response => response.json())
            .then(data => {
                setTable1Data(data);
                setErrorMsg("SUCCESS!");
            })
            .catch(error => setErrorMsg("Error! : " + error));
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/queryTableData/student2"
        )
            .then(response => response.json())
            .then(data => {
                setTable2Data(data);
                setErrorMsg("SUCCESS!");
            })
            .catch(error => setErrorMsg("Error! : " + error));
    };


    const getTableData = () => {
        let objectBody = {
            "operation" : operation,
            "tableName1" : "student",
            "tableName2" : "student2",
        };
        
        fetch(process.env.REACT_APP_BASE_URL + "ra_simulator/operation", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(objectBody)
        })
            .then(response => response.json())
            .catch(error => setErrorMsg("Error! : " + error))
            .then(data => {
                setTableData(data);
                setErrorMsg("SUCCESS2");
            })
            .catch(error => setErrorMsg("Error! : " + error));
    };
    

    const onOperationSelection = e => {
        let value = e.target.value;
        if (value === "DIFFERENCE") {
            value = "EXCEPT"            
        }
        setOperation(value);
    };


    return (
        <div className="flex flex-col text-lg  mt-4 mb-10">
            <label className="text-2xl font-bold mb-4">Relational Algebra Operations</label>
            <label className="text-md text-gray-500 mb-3 ">(choose Operation and name of 2 tables, table attributes must be similar)</label>
            <label className="text-md text-gray-500 mb-3">(i.e. student and student2 are similar type tables, click below to view data)</label>

            <button className="bg-cyan-400 rounded-lg font-bold px-4 py-2 m-1 max-w-fit" 
            onClick={loadInitialTableData}>View Data</button>
            <div className="flex flex-row">
            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
            {errorMsg.startsWith("SUCCESS") ?
                <Table headers={Object.keys(table1Data[0])} rows={table1Data} /> : ""
            }
            {errorMsg.startsWith("SUCCESS") ?
                <Table headers={Object.keys(table2Data[0])} rows={table2Data} /> : ""
            }
            </div>
            <select
                className=' p-1 text-black bg-cyan-100 border border-black ml-3 max-w-sm'
                name="operation"
                onChange={onOperationSelection}>
                <option className=' text-black rounded-xl'>
                        
                    </option>
                {operations.map(operation =>
                    <option className=' text-black rounded-xl'>
                        {operation}
                    </option>
                )}
            </select>
            <button className="bg-cyan-400 rounded-lg font-bold px-4 py-2 mt-2 max-w-fit" 
            onClick={getTableData}>Perform Operation</button>
            {errorMsg.startsWith("SUCCESS2") ?
                <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }
        </div>
    );
}

export default RaOperation;