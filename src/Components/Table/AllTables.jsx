import React, { useEffect, useState } from "react";

function AllTables() {
    const [version, setVersion] = useState({});
    const [errorMsg, setErrorMsg] = useState("OK");
    const [tableNames, setTableNames] = useState([]);


    useEffect(() => {
        fetch("http://localhost:15071/trigger_&_cluster/queryTableData/getAllTables"
        )
            .then(response => response.json())
            .then(data => setTableNames(data))
            .catch(error => setErrorMsg("Error! : " + error));
        fetch("http://localhost:15071/trigger_&_cluster/queryTableData/getDbInfo",        
        )
            .then(response => response.json())
            .then(data => setVersion(data))
            .catch(error => setErrorMsg("Error! : " + error));
    }, []);


    return (
        <div className="flex flex-col text-lg mb-4">
            {errorMsg !== "OK" ? errorMsg : ""}
            <label className="font-bold text-lg text-gray-600 m-3">Db Info : {version.version}</label>
            <label className="font-bold text-2xl m-3">Tables In Current Db Session</label>
            <table className="max-w-screen-sm m-3">
                <tbody>
                    <tr>
                        {tableNames.map(col => {
                            return <td className="p-1 m-1 border border-black">{col}</td>
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AllTables;