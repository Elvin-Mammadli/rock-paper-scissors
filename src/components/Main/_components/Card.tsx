type Props = {
  bet: number,
  type: 'scissors' | 'rock' | 'paper'
}

const colors = {
  rock: {
    bg: '#211f4f',
    border: '#2e4270',
    text: '#2680ea'
  },
  paper: {
    bg: '#1a381d',
    border: '#187e3a',
    text: '#15c158'
  },
  scissors: {
    bg: '#50091e',
    border: '#8c112f',
    text: '#dd1440'
  },
}

const Card = ({ bet, type }: Props) => {

  return (
    <div className='w-40 h-28 flex flex-col gap-y-2 justify-center items-center rounded-md cursor-pointer'
      style={{
        backgroundColor: colors[type].bg,
        border: `3px ${colors[type].border} solid`
      }}
    >
      <div className='w-8 h-8 text-sm leading-none font-semibold flex justify-center items-center bg-white rounded-full border-[3px] border-blue-500'>
        {bet}
      </div>
      <span className='font-semibold'
        style={{
          color: colors[type].text,
        }}
      >{type.toUpperCase()}</span>
    </div>
  )
}

export default Card