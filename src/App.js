import {Route, Switch} from "react-router-dom";
import {Container, createTheme, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@emotion/react";

import Layout from "./components/Layout/Layout";
import Contacts from "./containers/Contacts/Contacts";
import ContactFormPage from "./containers/ContactFormPage/ContactFormPage";

const theme = createTheme();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout />
            <Container>
                <Switch>
                    <Route path="/" exact component={Contacts} />
                    <Route path="/contacts" exact component={Contacts} />
                    <Route path="/add" component={ContactFormPage} />
                    <Route path="/edit/:id" component={ContactFormPage} />
                    <Route render={() => <h1>Not found</h1>} />
                </Switch>
            </Container>
        </ThemeProvider>
    );
};

export default App;