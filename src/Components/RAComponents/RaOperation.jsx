import React, { useState } from "react";
import Table from "../Table/Table";

function RaOperation() {
    const [tableData, setTableData] = useState([{}]);
    const [table1Data, setTable1Data] = useState([{}]);
    const [table2Data, setTable2Data] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("SUCCESS");
    const [raOperationBody, setRaOperationBody] = useState({});

    const operations = ["Union(U)", "Difference(-)", "Intersect(∩)"];

    function getTableData(tableName, tableNo) {
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/queryTableData/" + tableName
        )
            .then(response => response.json())
            .then(data => tableNo === 1 ? setTable1Data(data) : setTable2Data(data))
            .catch(error => setErrorMsg("Error! : " + error))
    };


    const getRaOperationData = () => {
        console.log(raOperationBody);
        getTableData(raOperationBody.tableName1, 1);
        getTableData(raOperationBody.tableName2, 2);

        fetch(process.env.REACT_APP_BASE_URL + "ra_simulator/operation", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(raOperationBody)
        })
            .then(response => response.json())
            .catch(error => setErrorMsg("Error! : " + error))
            .then(data => {
                setTableData(data);
                setErrorMsg("SUCCESS!");
            })
            .catch(error => setErrorMsg("Error! : " + error));
    };

    function getRaOperationValue(value) {
        if (value === "Union(U)") {
            return "union";
        }
        if (value === "Difference(-)") {
            return "except";
        }
        if (value === "Intersect(∩)") {
            return "intersect";
        }
        else {
            return value;
        }
    }

    const onChangeHandler = e => {
        setErrorMsg("SUCCESS");
        let value = getRaOperationValue(e.target.value);
        setRaOperationBody((previousData) => {
            return {
                ...previousData,
                [e.target.name]: value,
            };
        });
    };


    return (
        <div className="flex flex-col text-lg  mt-4 mb-10">
            <label className="text-2xl font-bold mb-4">Relational Algebra Operations</label>
            <label className="text-md text-gray-500 mb-3 ">(choose Operation and name of 2 tables, table attributes must be similar)</label>
            <label className="text-md text-gray-500 mb-3">(i.e. student and student2 are similar type tables, click below to view data)</label>

            <div>
                <input className="border border-black w-40 max-w-fit m-2 p-1 rounded-md" name="tableName1" onChange={onChangeHandler} placeholder="Table 1 Name" />
                <select
                    className=' p-1 text-black bg-cyan-100 border border-black mb-3 max-w-sm rounded-md'
                    name="operation"
                    onChange={onChangeHandler}>
                    <option className=' text-black rounded-xl'>

                    </option>
                    {operations.map((operation,index) =>
                        <option className=' text-black rounded-xl' key={index}>
                            {operation}
                        </option>
                    )}
                </select>
                <input className="border border-black w-40 max-w-fit m-2 p-1 rounded-md" name="tableName2" onChange={onChangeHandler} placeholder="Table 2 Name" />
            </div>

            <button className="bg-cyan-400 rounded-lg font-bold px-4 py-2 mt-2 max-w-fit" onClick={getRaOperationData}>Perform Operation</button>
            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
            {errorMsg.startsWith("SUCCESS!") ? <label className="text-xl font-bold mb-2 mt-4">Data Before {raOperationBody.operation}</label> : ""}
            <div className="flex flex-row">
                {errorMsg.startsWith("SUCCESS!") ?
                    <Table headers={Object.keys(table1Data[0])} rows={table1Data} /> : ""
                }
                {errorMsg.startsWith("SUCCESS!") ?
                    <Table headers={Object.keys(table2Data[0])} rows={table2Data} /> : ""
                }
            </div>
            {errorMsg.startsWith("SUCCESS!") ? <label className="text-xl font-bold mb-2 mt-4">Data After {raOperationBody.operation}</label> : ""}
            {errorMsg.startsWith("SUCCESS!") ?
                <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }
        </div>
    );
}

export default RaOperation;