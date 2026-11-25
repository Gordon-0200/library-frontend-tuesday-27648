import React, { useState } from 'react'
import LibraryButton from './LibraryButton'

function LibraryLogin() {
  const [doYouHaveAnAccount, setDoYouHaveAnAccount] = useState(true)
  const username = 'Gordon'
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' })
  const [registerInfo, setRegisterInfo] = useState({
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleLoginClick = () => {
    alert(`Welcome, ${username}! you have successfully logged in`)
  }

  const handleRegisterClick = () => {
    alert(`Welcome, ${username}! you have successfully logged in.`)
  }

  return (
    <>
      {doYouHaveAnAccount ? (
        <div style={{ border: '3px solid blue', marginTop: '190px' }}>
          <label>UserName:</label>
          <input
            type="text"
            placeholder="Enter Your username"
            value={loginInfo.username}
            onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
          /><br />
          <label>Password:</label>
          <input
            type="password"
            value={loginInfo.password}
            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
          /><br />
          <LibraryButton buttonLabel="LOGIN" onClickButton={handleLoginClick} /> <br />
          <label>New here? </label>
          <LibraryButton buttonLabel="Create Account" onClickButton={() => setDoYouHaveAnAccount(false)} />
        </div>
      ) : (
        <div style={{ border: '3px solid indigo', marginTop: '190px' }}>
          <label>Student ID:</label>
          <input
            type="text"
            placeholder="Enter Your Student ID"
            value={registerInfo.studentId}
            onChange={(e) => setRegisterInfo({ ...registerInfo, studentId: e.target.value })}
          /><br />
          <label>Email:</label>
          <input
            type="email"
            value={registerInfo.email}
            onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
          /><br />
          <label>Password:</label>
          <input
            type="password"
            value={registerInfo.password}
            onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
          /><br />
          <label>Confirm Password:</label>
          <input
            type="password"
            value={registerInfo.confirmPassword}
            onChange={(e) => setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })}
          /><br />
          <LibraryButton buttonLabel="REGISTER" onClickButton={handleRegisterClick} /> <br />
          <label>Already have an account?? </label>
          <LibraryButton buttonLabel="Sign In" onClickButton={() => setDoYouHaveAnAccount(true)} />
        </div>
      )}
    </>
  )
}

export default LibraryLogin