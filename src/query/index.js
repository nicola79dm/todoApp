import gql from "graphql-tag";

export const ITEMS_QUERY = gql`
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

export const DELETE_ITEM = gql`
 mutation DeleteItem($id: ID!) {
   deleteItem(id: $id) {
     _id
   }
 }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $isComplete: Boolean!) {
    updateItem(id: $id, data: { isComplete: $isComplete }) {
      _id
      isComplete
    }
  }
`;

export const CREATE_ITEM = gql`
 mutation CreateItem($data: ItemInput!) {
   createItem(data: $data) {
     _id
   }
 }
`;