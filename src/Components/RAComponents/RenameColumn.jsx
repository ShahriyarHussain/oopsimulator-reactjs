import React, { useState } from "react";

function RenameColumn() {    
    const [errorMsg, setErrorMsg] = useState("");
    const [renameObject, setRenameObject] = useState({});


    const renameColumn = () => {        
        fetch(process.env.REACT_APP_BASE_URL + "ra_simulator/rename", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(renameObject)
        })
            .then(response => {
                if (response.status === 200) {
                    setErrorMsg("Column Altered!")
                }
            })
            .catch(error => setErrorMsg("Error! : " + error))
    }
    

    const onChangeHandler = e => {
        setErrorMsg("");
        setRenameObject((previousData) => {
            return {
                ...previousData,
                [e.target.name] : e.target.value,
            };
        });
      };


    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="font-bold text-2xl m-3">Rename A Column</label>
            <label className="text-sm text-gray-500 mb-3 ">Use Query Table Tab to learn About the table's attributes</label>
            <div>
            <label>ALTER TABLE</label>
            <input className="border border-black w-40 max-w-fit m-2 p-1 rounded-md" name="tableName" onChange={onChangeHandler}/>
   
            <label>RENAME</label>
            <input className="border border-black w-40 max-w-fit m-2 p-1 rounded-md" name="columnName" onChange={onChangeHandler}/>
            <label>TO</label>
            <input className="border border-black w-40 max-w-fit m-2 p-1 rounded-md" name="newColumnName" onChange={onChangeHandler}/>
            </div>
            <button className="bg-cyan-400 rounded-md font-bold max-w-fit m-2 p-2" onClick={renameColumn}>Execute Query</button>
            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
        </div>
    );
}

export default RenameColumn;