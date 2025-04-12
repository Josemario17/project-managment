import React from 'react'

export default function FormLayout({children}: { children: React.ReactNode }) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
        <div className='container max-w-lg flex flex-col items-center justify-center rounded-2xl shadow py-12 border border-gray-300 bg-white'>
            {children}
        </div>
    </div>
  )
}
