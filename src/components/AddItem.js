import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { ITEMS_QUERY, CREATE_ITEM } from "../query";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  addForm: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  inputField: {
    marginBottom: theme.spacing(2),
    width: "100%"
  }
}));



export function AddItem() {
  const [showForm, setShowForm] = React.useState(false);
  const [newItemName, setNewItemName] = React.useState("");
  const [createItem, { loading }] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: ITEMS_QUERY }],
    onCompleted: () => {
      setNewItemName("");
      setShowForm(false);
    },
  });
  const classes = useStyles();

  //return <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>Add Item</Button>;
  return (
    <React.Fragment>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => { setShowForm(true) }}><AddIcon /></Fab>
      <Drawer anchor="bottom" open={showForm} onClose={() => setShowForm(false)}>
        <Container maxWidth="sm">
          <form
            className={classes.addForm}
            onSubmit={(e) => {
              e.preventDefault();
              createItem({ variables: { data: { name: newItemName } } });
            }}
          >
            <TextField id="new-todo" label="Todo text" variant="outlined"
              type="text"
              disabled={loading}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className={classes.inputField}
            /><br />
            <Button variant="contained" color="primary"
              disabled={loading} type="submit"
              startIcon={<SaveIcon />}>
              Save
                </Button>
          </form>
        </Container>
      </Drawer>
    </React.Fragment>
  )
}