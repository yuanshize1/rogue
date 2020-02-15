import React, { Component, useState, useEffect } from "react";
import firebase from 'firebase/app'
function handleDelete(documentIDs) {
  const firestore = firebase.firestore();
  documentIDs.map(ID => {
    firestore
      .collection("Calender")
      .doc(ID)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  });
  return documentIDs;
}
const DeleteButton = props => {
  return <button onClick={() => handleDelete(props.deleteList)}>Delete</button>;
};

export default DeleteButton;
