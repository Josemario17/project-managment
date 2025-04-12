import React from 'react'

export default function Spin() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <svg
        className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4.93 4.93a10 10 0 0114.14 14.14l1.41 1.41a12 12 0 00-16.97-16.97l1.42 1.42z"
        ></path>
      </svg>
    </div>
  )
}
