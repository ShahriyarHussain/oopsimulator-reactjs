import React, { useState } from "react";
import Table from "../Table/Table";

function JoinOperation() {
    const [tableData, setTableData] = useState([{}]);
    const [table1Data, setTable1Data] = useState([{}]);
    const [table2Data, setTable2Data] = useState([{}]);
    const [errorMsg, setErrorMsg] = useState("SUCCESS");
    const [joinOperationBody, setJoinOperationBody] = useState({});
    const [operation, setOperation] = useState("");
    const [whereClause, setWhereClause] = useState({});
    const [query, setQuery] = useState("");

    const operations = ["CROSS PRODUCT", "NATURAL JOIN", "THETA JOIN", "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "RIGHT FULL JOIN"];
    const comparers = ["=", ">", " <"];

    const executeJoin = () => {
        getQueryPreview();
        setErrorMsg("SUCCESS");

        let body = joinOperationBody;
        if (operation !== "NATURAL JOIN" && operation !== "CROSS PRODUCT") {
            body["whereClause"] = [whereClause];
        }

        getTableData(joinOperationBody.tableName1, 1);
        getTableData(joinOperationBody.tableName2, 2);
        fetch(process.env.REACT_APP_BASE_URL + "ra_simulator/joinOperation", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .catch(error => setErrorMsg("Error! : " + error))
            .then(data => {
                setTableData(data)
                setErrorMsg("SUCCESS!");
            })
            .catch(error => setErrorMsg("Error! : " + error));
    };

    function getTableData(tableName, tableNo) {
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/queryTableData/" + tableName
        )
            .then(response => response.json())
            .then(data => tableNo === 1 ? setTable1Data(data) : setTable2Data(data))
            .catch(error => setErrorMsg("Error! : " + error))
    };

    const onChangeHandler = e => {
        setQuery("");
        setErrorMsg("SUCCESS");
        setJoinOperationBody((previousData) => {
            return {
                ...previousData,
                [e.target.name]: e.target.value,
            };
        });
    };

    const onOperationChange = e => {
        setQuery("");
        setErrorMsg("SUCCESS");
        setOperation(e.target.value);
        if (operation !== "CROSS PRODUCT" && operation !== "NATURAL JOIN") {
            getTableData(joinOperationBody.tableName1, 1);
            if (operation !== "THETA JOIN") {
                setJoinOperationBody((previousData) => {
                    return {
                        ...previousData,
                        "joinType": operation,
                    };
                });
            }
        }
    };

    const onWhereClauseChange = e => {
        setQuery("");
        setWhereClause((previousData) => {
            return {
                ...previousData,
                [e.target.name]: e.target.value,
            };
        });
        // setJoinOperationBody((previousData) => {
        //     return {
        //         ...previousData,
        //         "whereClause": [whereClause],
        //     };
        // });
    };

    function getQueryPreview() {
        let queryString = "Query Preview: SELECT * FROM " + joinOperationBody.tableName1 + " a ";
        if (operation === "NATURAL JOIN" || operation === "CROSS PRODUCT" || operation === "THETA JOIN") {
            queryString = queryString + " , " + joinOperationBody.tableName2 + " b ";
        } else {
            queryString = queryString + " " + operation + " " + joinOperationBody.tableName2 + " b ";
        }

        if (operation === "NATURAL JOIN" || operation === "CROSS PRODUCT") {
            setQuery(queryString);
            return;
        } else if (operation === "THETA JOIN") {
            queryString = queryString + " WHERE ";
        } else {
            queryString = queryString + " ON ";
        }
        queryString = queryString + "a." + whereClause.attribute + " " + whereClause.comparer + " b." + whereClause.attribute;
        setQuery(queryString);
    }

    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="text-2xl font-bold my-4">Join Operations</label>
            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
            <div>
                <input className="border border-black w-40 max-w-fit m-2 p-1 rounded-md" name="tableName1" onChange={onChangeHandler} placeholder="Table 1 Name" />
                <select
                    className=' p-1 text-black bg-cyan-100 border border-black ml-3 max-w-sm rounded-md'
                    placeholder="JOIN TYPE"
                    name="operation"
                    onChange={onOperationChange}>
                    <option className=' text-black rounded-xl' />
                    {operations.map(operation =>
                        <option className=' text-black rounded-xl' value={operation}>
                            {operation}
                        </option>
                    )}
                </select>
                <input className="border border-black w-40 max-w-fit m-2 p-1 rounded-md" name="tableName2" onChange={onChangeHandler} placeholder="Table 2 Name" />
            </div>

            {/* Theta Join Where Clause */}

            {operation !== "NATURAL JOIN" && operation !== "CROSS PRODUCT" && operation.length !== 0 ?
                <div className="mt-2">
                    <label>Where</label>
                    <select
                        className=' p-1 text-black bg-cyan-100 border border-black ml-3'
                        name="attribute"
                        onChange={onWhereClauseChange}>
                        <option className=' text-black rounded-xl' />
                        {Object.keys(table1Data[0]).map(optionValue =>
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
                    {/* <input className="ml-2 border border-black w-28" name="value" onChange={onWhereClauseChange} /> */}
                </div>
                : ""}

            {/* Query Preview*/}

            <label className="text-md text-gray-500 mb-3 mt-3">{query}</label>


            {/* Show Results*/}

            <div className="flex-row"></div>

            <button className="bg-cyan-400 rounded-md font-bold max-w-fit my-3 p-2" onClick={executeJoin}>Perform Join</button>

            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
            {errorMsg.startsWith("SUCCESS!") ? <label className="text-xl font-bold mb-4">Data Before Join</label> : ""}
            <div className="flex flex-row">
                {errorMsg.startsWith("SUCCESS!") ?
                    <Table headers={Object.keys(table1Data[0])} rows={table1Data} /> : ""
                }
                {errorMsg.startsWith("SUCCESS!") ?
                    <Table headers={Object.keys(table2Data[0])} rows={table2Data} /> : ""
                }
            </div>
            {errorMsg.startsWith("SUCCESS!") ? <label className="text-xl font-bold mb-4">Data After Join</label> : ""}
            {errorMsg.startsWith("SUCCESS!") ?
                <Table headers={Object.keys(tableData[0])} rows={tableData} /> : ""
            }
        </div>
    );
}

export default JoinOperation;