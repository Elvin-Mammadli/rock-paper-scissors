import Card from './_components/Card'

type Props = {}

const Main = (props: Props) => {
  const cardDetails: {
    bet: number,
    type: 'scissors' | 'rock' | 'paper'
  }[] = [
      { type: 'rock', bet: 500 },
      { type: 'paper', bet: 500 },
      { type: 'scissors', bet: 500 },
    ]
  return (
    <main className='flex flex-1 bg-gradient-to-b from-[#484848] to-[#1e1e1e]'>
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div className='flex flex-1 justify-center'>
          {/* <span className='text-white text-7xl my-auto'>ROCK <span className='text-yellow-600 mx-6'>vs</span> Paper</span> */}
          {/* <span className='mt-auto mb-5 uppercase text-yellow-500 font-medium'>Pick your positions</span> */}
          <div className='flex flex-col justify-center items-center gap-y-1 border border-red-600'>
            <span className='uppercase text-green-400 font-semibold text-3xl'>Paper won</span>
            <span className='uppercase text-yellow-500 font-medium'>you win <span className='text-white/90'>555.55</span></span>
          </div>
        </div>

        {/* Choices */}
        <div className='flex-1 text-center'>
          <div className='flex flex-1 gap-x-5 justify-center items-center'>
            {cardDetails.map(card => (
              <Card key={card.type} {...card} />
            ))}
          </div>

          <button
            // disabled
            className='w-40 h-16 mt-24 bg-[#070707] uppercase font-semibold text-2xl text-[#9e8b68] border-2 border-[#9e8b68] rounded-full disabled:text-[#9e8b68]/50 disabled:border-[#9e8b68]/50'>
            Play
          </button>
          {/* Button */}
        </div>

      </div>
    </main>
  )
}

export default Main