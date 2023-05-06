import React, { useState } from "react";

function Trigger() {
    const [errorMsg, setErrorMsg] = useState("");
    const [triggerObject, setTriggerObject] = useState({});


    const performTrigger = () => {
        console.log(triggerObject);
        fetch(process.env.REACT_APP_BASE_URL + "trigger_&_cluster/createTrigger", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(triggerObject)
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("CHANGED ERROR MESG!")
                    setErrorMsg("Trigger Created!");
                }
            })
            .catch(error => setErrorMsg("Error! : " + error))
    }

    const onChangeHandler = e => {
        setErrorMsg("");
        setTriggerObject((previousData) => {
            return {
                ...previousData,
                [e.target.name]: e.target.value,
            };
        });
    };

    return (
        <div className="flex flex-col text-lg mb-4">
            <label className="font-bold text-2xl m-3">Triggers</label>
            <label className="text-sm text-gray-500 mb-3 ">Triggers need a function which will be used during the trigger action
                Following is a function, save_insert_record, that we will use for our Trigger</label>
            <label className="text-sm text-gray-500 mb-3 ">The task of the function is to insert a row in entries table whenever a row is inserted in trigger table.</label>
            <div className="text-sm bg-slate-200 p-5 w-fit rounded-lg mt-1 mb-3">
                <span>{"create function save_insert_record() returns trigger"} </span><br />
                <span className="p-3">{"language plpgsql"} </span> <br />
                <span>{"as"} </span> <br />
                <span>{"$$"} </span> <br />
                <span>{"BEGIN"} </span> <br />
                <span className="p-3">{"INSERT INTO entries(table_name, time) values (tg_table_name, current_timestamp);"} </span> <br />
                <span className="p-3">{"RETURN NEW;"} </span> <br />
                <span>{"END;"} </span> <br />
                <span>{"$$"} </span> <br />
            </div>
            <div className="bg-cyan-100 p-5 w-1/3 rounded-lg mt-1 font-bold">
                <span>{"CREATE TRIGGER"}</span> <input className="border border-black w-fit max-w-fit ml-2 p-1 rounded-md" name="triggerName" onChange={onChangeHandler} placeholder="Trigger Name" /> <br />
                <span>{"BEFORE INSERT"}</span> <br />
                <span>{"ON"}</span> <input className="border border-black w-fit max-w-fit ml-2 p-1 rounded-md" name="tableName" onChange={onChangeHandler} placeholder="Table Name" /> <br />
                <span>{"EXECUTE PROCEDURE save_insert_record();"} </span> <br />
            </div>
            <button className="bg-cyan-400 rounded-md font-bold max-w-fit my-3 p-2" onClick={performTrigger}>Execute Query</button>
            {!errorMsg.startsWith("SUCCESS") ? errorMsg : ""}
        </div>
    );
}

export default Trigger;