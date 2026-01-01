import React from 'react';

export default function SignIn(){
  return (
    <div className="page container">
      <h2>Sign In</h2>
      <form className="form">
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
