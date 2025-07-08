
function Table({
    className = "",
    thead = ["value"],
    trow = [[<tr key={1}><td></td></tr>]],
}){
    return(
        <table cellSpacing="0" className={className}>
            <tbody>
                <tr>
                    {thead.map((th, index) => (
                        <th key={`th${th+index}`}>{th}</th>
                    ))}
                </tr>
                {trow?.map(tr => (tr))}
            </tbody>
        </table>
    );

}

export default Table;