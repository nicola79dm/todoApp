import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { ITEMS_QUERY, CREATE_ITEM } from "../query";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
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
  const [invalidForm, setInvalidForm] = React.useState({ invalid: false, message: "" });
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
              if (newItemName !== "") {
                createItem({ variables: { data: { name: newItemName } } });
              } else {
                setInvalidForm({
                  invalid: true,
                  message: "campo obbligatorio"
                });
              }
            }}
          >
            <TextField id="new-todo" label="Attività" variant="outlined"
              error={invalidForm.invalid}
              helperText={invalidForm.message}
              type="text"
              disabled={loading}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className={classes.inputField}
            />
            <div className={classes.buttons}>
              <Button variant="contained" color="primary"
                disabled={loading} type="submit"
                startIcon={<SaveIcon />}>
                Salva
                </Button>
              <Button variant="contained" color="secondary"
                disabled={loading} startIcon={<CancelIcon />} onClick={() => setShowForm(false)}>
                Annulla
              </Button>
            </div>
          </form>
        </Container>
      </Drawer>
    </React.Fragment>
  )
}