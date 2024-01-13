import "../../styles/curve.css"

export default function CurveArrow({ isEnd = false }) {
  return (
    <>
      <div className={`things ${isEnd ? "rotate-180" : "rotate-0"}`}>
        <div className="content">
          <div className="arrow">
            <div className="curve"></div>
            <div className="point"></div>
          </div>
        </div>
      </div>
    </>
  )
}
