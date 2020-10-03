import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { ItemList } from "./ItemList";
import { AddItem } from "./AddItem";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';



function App() {
  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Cose da fare
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <ItemList />
        <AddItem/>
      </Container>
    </ApolloProvider>
  );
}

export default App;