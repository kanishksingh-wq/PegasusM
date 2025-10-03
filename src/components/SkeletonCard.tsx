export default function SkeletonCard() {
  return (
    <div className="card" aria-hidden="true">
      <div className="card__media skeleton" />
      <div className="card__body">
        <div className="skeleton skeleton-text" style={{ width: '70%' }} />
        <div className="skeleton skeleton-text" style={{ width: '40%', marginTop: 8 }} />
      </div>
    </div>
  )
}
