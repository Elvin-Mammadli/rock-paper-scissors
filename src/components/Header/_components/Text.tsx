import React from 'react'

type Props = {
  text: string;
  number: number;
}

const Text = ({ text, number }: Props) => {
  return (
    <div className=''>
      <span className='text-yellow-500 font-medium'>{text}: </span>
      <span className='text-white'>{number}</span>
    </div>
  )
}

export default Text