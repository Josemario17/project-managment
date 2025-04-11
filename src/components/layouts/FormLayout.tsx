import React from 'react'

export default function FormLayout({children}: { children: React.ReactNode }) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
        <div className='container max-w-screen-sm flex flex-col items-center justify-center rounded-lg  shadow-lg'>
            {children}
        </div>
    </div>
  )
}
