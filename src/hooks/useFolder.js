import { React, useReducer, useEffect, useState } from 'react';
import { db, database } from "../firebase";
import { useUserAuth } from '../context/UserAuthContext';
import { doc, getDoc, collection, query, getDocs, where, orderBy, onSnapshot } from "firebase/firestore"

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files'
}

export const ROOT_FOLDER = {
  name: 'Home',
  id: null,
  path: [],
}

function reducer(state, {type, payload}){
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: []
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders
      }
      case ACTIONS.SET_CHILD_FILES:
        return {
          ...state,
          childFiles: payload.childFiles
        }
    default:
      return state
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  })

  const { user } = useUserAuth();
  // console.log(user.uid)

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {folderId, folder}
    })
  }, [folderId, folder])

  useEffect(() => {
    if(folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: ROOT_FOLDER}
      })
    }

    const folderRef = doc(db, "folders", folderId)

    getDoc(folderRef)
    .then((doc) => {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: database.formatDoc(doc)}
      })
    }).catch(() => {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {folder: ROOT_FOLDER}
      })
    })


  }, [folderId])

  useEffect(() => {
  console.log(user.uid)
  const q = query(database.folder, 
    where("parentId", "==", folderId),
    where("members", "array-contains", user.email),
    orderBy("createdAt")
  )
  const os = onSnapshot(q, (snapshot) => {
    dispatch({
      type: ACTIONS.SET_CHILD_FOLDERS,
      payload: {childFolders: snapshot.docs.map(database.formatDoc)}
    })
  })
  }, [folderId]);

  useEffect(() => {
    const q = query(database.files, 
      where("folderId", "==", folderId),
      where("members", "array-contains", user.email),
      orderBy("createdAt")
    )
    const os = onSnapshot(q, (snapshot) => {
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: {childFiles: snapshot.docs.map(database.formatDoc)}
      })
    })
    }, [folderId]);


  return state
}

