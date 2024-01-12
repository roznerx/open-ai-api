import "../../styles/curve.css"

export default function CurveArrow({ isMobile }) {
  return (
    <>
      <div className={`things ${isMobile ? "rotate-180" : "rotate-0"}`}>
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
