import React from 'react';
import { useUserAuth } from "../context/UserAuthContext";

function Account() {
  const {user} = useUserAuth();

  return (
      <>
        <h1>Account page</h1>
        <span>{user.email}</span>
      </>
  )
}

export default Account;
