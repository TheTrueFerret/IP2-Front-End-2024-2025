import './Background.css'

interface BackgroundProps {
  color: string
}


export function Background({ color }: BackgroundProps) {
  const repeatingBg1: string = "7 3 11 5 1 9 12\n13 4 6 2 8 10 5"
  const repeatingBg2: string = "2 9 12 8 3 6 11 \n 4 Rummikub"
  const max: number = 200

  const backgroundDivs = Array.from({ length: max }, (_, index) => {
    // Alternating between the two background patterns
    const backgroundPattern = index % 2 === 0 ? repeatingBg1 : repeatingBg2;

    return (
      <div
        key={index}
        className="BackgroundItem"
      >{backgroundPattern}
      </div>
    );
  });

  return (
    <div className='TextBackgroundContainer'>
      <div className='TextBackground'
        style={{
          color: color
        }}
      >
        {backgroundDivs}
      </div>
    </div>
  )
}