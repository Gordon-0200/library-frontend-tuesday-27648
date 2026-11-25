import React from 'react'

function SendButton({buttonLabel,onClickButton}) {
  return (
    <div>  <button onClick={onClickButton}>{buttonLabel}</button></div>
  )
}

export default SendButton