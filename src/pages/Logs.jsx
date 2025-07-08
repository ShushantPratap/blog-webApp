import { useEffect, useState } from "react";
import { Container, Table, Loader } from "../components/Index";
import authService from "../appwrite/authentication";

function Logs(){
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "Account activity";

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authService.getLogs()
        .then(res => {
            if(res){
                setLogs(res.logs);
            }
        })
        .finally(() => setLoading(false));
    }, []);

    const dateConvert = (date) => {
        const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', 
            day: 'numeric', hour: "2-digit", 
            minute: "2-digit", hour12: true };
        const time = new Date(date).toLocaleTimeString("en-GB", dateOptions);
        return time
        .replace("am", "AM")
        .replace("pm", "PM");
    }

    return !loading ? (
        <Container>
            <h3 className="page-title">Login activity</h3>
            <div className="table-wrapper h-100">
                <Table 
                    className="m-0"
                    thead={["s.no.", "event", "Browser and device", "Location", "ip", "date"]}
                    trow={logs.map((log, i) => (
                        [<tr key={log.time}>
                            <td>{i+1}</td>
                            <td>{log.event}</td>
                            <td>{log.clientName}
                            <br />
                            {log.clientVersion}
                            <br />
                            {log.osName} {log.osVersion}</td>
                            <td>{log.countryName}</td>
                            <td>{log.ip}</td>
                            <td>{dateConvert(log.time)}</td>
                        </tr>]
                    ))}
                />
            </div>
        </Container>
    ) : <Loader />;
}

export default Logs;