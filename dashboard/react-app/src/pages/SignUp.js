import React from 'react';

export default function SignUp(){
  return (
    <div className="page container">
      <h2>Sign Up</h2>
      <form className="form">
        <label>
          Name
          <input name="name" />
        </label>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
