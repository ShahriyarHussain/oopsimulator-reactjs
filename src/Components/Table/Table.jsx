function Table({ headers, rows }) {
    return (
        <table className="max-w-screen-sm m-3">
            <thead>
                <tr>
                    {headers.map(
                        columnName => <th className="p-1 m-1 border border-black bg-slate-300" key={columnName}>{columnName}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => {
                    return <tr className="p-1 m-1 border border-black" key={index}>
                        {headers.map((key, index) => { return <td className="p-1 m-1 border border-black" key={row[key]}>{row[key]}</td> })}
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default Table;