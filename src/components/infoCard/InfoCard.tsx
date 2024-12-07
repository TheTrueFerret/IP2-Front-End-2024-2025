

interface InfoCardProps {
  loading: boolean
}


export function InfoCard({loading}: InfoCardProps) {
  return (
    <div className='InfoCard'>
      {loading}
    </div>
  )
}