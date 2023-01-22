import { MouseEventHandler, useState } from 'react'

interface ButtonType {
    onCLick: MouseEventHandler;
    children?: React.ReactNode;
}

function Button({ onCLick, children }: ButtonType) {

  return (
    <button onClick={onCLick} className="text-white bg-blue-700 hover:bg-blue-800 p-2 border rounded-lg">
        {children}
    </button>
  )
}

export default Button
