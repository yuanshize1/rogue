import React, { Component } from "react";
import firebase from 'firebase/app'

function deleteFunction(documentIDs) {
  // console.log(documentIDs);
  const firestore = firebase.firestore();
  if (documentIDs !== null && typeof documentIDs !== undefined) {
    documentIDs.map(ID => {
      firestore
        .collection("Task")
        .doc(ID)
        .delete()
        .then(function() {
          console.log("Invoice successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    });
  } else {
    console.log("there has nothing to delete.");
  }
}

const DeleteButton = props => {
  return (
    <button onClick={() => deleteFunction(props.deletionList)}>Delete</button>
  );
};

export default DeleteButton;
