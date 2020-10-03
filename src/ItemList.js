import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';


const ITEMS_QUERY = gql`
 {
   allItems {
     data {
       _id
       name
       isComplete
     }
   }
 }
`;

const DELETE_ITEM = gql`
 mutation DeleteItem($id: ID!) {
   deleteItem(id: $id) {
     _id
   }
 }
`;

const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $isComplete: Boolean!) {
    updateItem(id: $id, data: { isComplete: $isComplete }) {
      _id
      isComplete
    }
  }
`;


const useStyles = makeStyles((theme) => ({
  complete: {
    textDecoration: "line-through"
  }
}));

export function ItemList() {
    const { data, loading } = useQuery(ITEMS_QUERY);
    const [deleteItem, { loading: deleteLoading }] = useMutation(DELETE_ITEM, {
        refetchQueries: [{ query: ITEMS_QUERY }],
    });
  const [updateItem, { loading: updateLoading }] = useMutation(UPDATE_ITEM);
  const classes = useStyles();

    if (loading) {
        return "Loading...";
    }
    return (
        <List>
            {data.allItems.data.map((item) => {
              return <ListItem key={item._id} button onClick={(e) => {
                e.preventDefault();
                updateItem({
                  variables: { id: item._id, isComplete: !item.isComplete },
                });
              }}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.isComplete}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': item._id}}
                  />
                </ListItemIcon>
                <ListItemText id={item._id} primary={item.name} className={item.isComplete ? classes.complete : ""} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="delete"
                    edge="end"
                    disabled={deleteLoading || updateLoading}
                    style={{ marginLeft: "10px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteItem({ variables: { id: item._id } });
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                  
                </ListItem>;
            })}
        </List>
    );
}