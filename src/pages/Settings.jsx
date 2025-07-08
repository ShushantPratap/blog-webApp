import {Container, Settings as SettingsComponent} from "../components/Index";

function Settings(){
    const tabTitle = document.querySelector("title");
    tabTitle.innerText = "Settings";
    
    return(
        <Container>
            <SettingsComponent />
        </Container>
    );

}

export default Settings;