import { useSelector, useDispatch } from "react-redux";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/authentication";
import { logout } from "../store/authSlice";
import { Button, ProfileImage, Message, Table, Loader } from "./Index";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Settings(){
    const userData = useSelector(state => state.auth.userData);
    const imageSrc = appwriteService.getFileView(`profile-image-${userData?.$id}`);

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [sessions, setSessions] = useState(null);
    const [logs, setLogs] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dateConvert = (date) => {
        const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', 
            day: 'numeric', hour: "2-digit", 
            minute: "2-digit", hour12: true };
        const time = new Date(date).toLocaleTimeString("en-GB", dateOptions);
        return time
        .replace("am", "AM")
        .replace("pm", "PM");
    }

    const getSessions = async () => {
        setLoading(true)
        const result = await authService.getSessions();
        if(result){
            setSessions(result.sessions);
            setLoading(false)
        } 
    }
    const deleteSession = async (e) => {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        if(confirm("Do you want to log out of that device?")){
            const result = await authService.deleteSession(e.target.value);
            if(result){
                setErrorMessage(null);
                setSuccessMessage("Logout successfully.");
                getSessions();
            }else{
                setSuccessMessage(null);
                setErrorMessage("Something went wrong, Please try again.");
            }
        setLoading(false);
        }
    }
    const deletAllSessions = () => {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        if(confirm("Do you want to log out of all devices?")){
            sessions?.forEach(async (session) => {
                if(!session.current){
                    const result = await authService.deleteSession(session.$id);
                    if(result){
                        setErrorMessage(null);
                        setSuccessMessage("Logout successfully.");
                    }else{
                        setSuccessMessage(null);
                        setErrorMessage("Something went wrong, Please try again.");
                    }
                }
            });
            getSessions();
            setLoading(false);
        }
    }

    const getLogs = async () =>{
        setLoading(true);
        setErrorMessage(null);
        const result = await authService.getLogs();
        if(result){
            setLogs(result.logs);
        }else setErrorMessage("Something went wrong, Please try again.");
        setLoading(false);
    }

    const logoutHandler = () => {
        setLoading(true);
        authService.logout().then(res => {
            setErrorMessage(null);
            if(res){
                dispatch(logout());
                navigate("/");
            }else setErrorMessage("Something went wrong, Please try again.");
        }).finally(() => setLoading(false));
    }

    return(
        <div className="settings column">
            {loading && <Loader />}
            <Message success={successMessage} error={errorMessage} />
            <div className="page-title">Settings</div>
            <div className="row">
                <h3 className="col-heading ml-1">User details</h3>
                <div className="col mr-3">
                    <ProfileImage src={imageSrc} />
                </div>
                <div className="col">
                <div className="userId">
                    <h3>{userData?.$id}</h3>
                    <p>{userData?.name}</p>
                </div>
                </div>
                <Button 
                    className="item-end mr-2"
                    onClick={() => navigate("/edit-profile")}
                >Edit</Button>
            </div>
            <div className="row">
                <h3 className="col-heading ml-1">Login activity</h3>
                {!sessions && 
                <Button 
                className="col-1 m-2"
                onClick={getSessions}
                ><span className="m-5">
                    Where You're Logged in
                </span></Button>}
                <div className="table-wrapper">
                    {sessions && <Table 
                        thead={["s.no.", "Browser and device", "Type", "Location", "ip", "login at", <Button onClick={deletAllSessions}>Logout all</Button>]}
                        trow={sessions?.map((session, i) => (
                            [<tr key={session.$id}>
                                <td>{i+1}</td>
                                <td>{session.clientName}
                                <br />
                                {session.clientVersion}
                                <br />
                                {session.osName} {session.osVersion}</td>
                                <td>{session.clientType}</td>
                                <td>{session.countryName}</td>
                                <td>{session.ip}</td>
                                <td>{dateConvert(session.$createdAt)}</td>
                                <td>{session.current ?
                                <p className="sessionActive">this device</p> :
                                <Button
                                    onClick={deleteSession}
                                    value={session.$id}
                                >Log out</Button>}</td>
                            </tr>]
                        ))}
                    />}
                </div>
            </div>
            <div className="row">
                <div className="col-heading ml-1">
                    <p>Account activity</p>
                    <Link to="/logs" title="Logs">
                        <i className='bx bx-arrow-out-up-right-stroke-square' />
                    </Link>
                </div>
                {!logs && 
                <Button 
                className="col-1 m-2"
                onClick={getLogs}
                ><span className="m-5">
                    Click to get Logs
                </span></Button>}
                <div className="table-wrapper">
                    {logs && <Table 
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
                    />}
                </div>
            </div>
            <div className="row">
                <h3 className="col-heading ml-1">Logout your account</h3>
                <Button
                    className="m-1"
                    onClick={logoutHandler}
                >Log Out</Button>
            </div>
            <div className="row">
                <h3 className="col-heading ml-1">Delete your account</h3>
                <p>This feature currently unavaliable !</p>
                <Button className="m-1">Delete Account</Button>
            </div>
        </div> 
    );
}

export default Settings;