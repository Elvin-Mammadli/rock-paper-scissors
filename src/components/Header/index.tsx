import React from 'react'
import Text from './_components/Text'

type Props = {}

const Header = (props: Props) => {
  const headerDatas = [
    { label: 'BALANCE', value: 5000 },
    { label: 'BET', value: 500 },
    { label: 'WIN', value: 1500 },
  ]
  return (
    <header>
      <div className='h-8 flex justify-center items-center gap-x-16 bg-neutral-950'>
        {headerDatas.map(({ label, value }) => (
          <Text text={label} number={value} />
        ))}
      </div>
    </header>
  )
}

export default Header