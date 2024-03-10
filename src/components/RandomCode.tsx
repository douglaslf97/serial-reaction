"use client";

import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react'


interface Props {
  randomPosition?: boolean,
  randomString: string
}

const RandomCode: React.FC<Props> = ({ randomString, randomPosition }) => {
  const [styles, setStyles] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (randomPosition) {
      const bound = document.body.getBoundingClientRect()
      if (bound) {
        let top = Math.floor(Math.random() * bound.height)
        top = top + 80 > bound.height ? bound.height - 80 : top < 0 ? 80 : top
        let left = Math.floor(Math.random() * bound.width)
        left = left + 165 > bound.width ? bound.width - 165 : left < 0 ? 165 : left

        console.log('top', top)
        console.log('left', left)
        setStyles({
          position: 'absolute',
          top: top,
          left: left,
          transform: 'translate(-50%, -50%)',
          zIndex: 10000
        })
      }
    }
  }, [randomPosition])

  return <div className="relative z-10 min-h-screen bg-white" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div style={styles} className="relative transform overflow-hidden rounded-lg bg-white text-middle shadow-xl transition-all sm:my-8 p">
          <div id="item-size" className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-center sm:flex sm:items-center">
              <div className="mx-auto flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div className="mx-auto text-center sm:ml-4 sm:mt-0 sm:text-center">
                <h3 className="text-7xl font-bold leading-8 text-gray-900 uppercase tracking-widest" id="modal-title">{randomString}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default RandomCode
