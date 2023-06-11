export function getCodeGeniusMode(
  smartSelected,
  mode,
  improveSelected,
  testSelected,
  docSelected,
) {
  if (smartSelected && mode === "smart") {
    return (
      <div className="mt-5 inline-flex font-sans">
        <span className="ml-5  text-2xl font-semibold text-white">
          Smart suggestions
        </span>{" "}
      </div>
    )
  } else if (testSelected || mode === "test") {
    return (
      <div className="mt-5 inline-flex font-sans">
        <span className="ml-5  text-2xl font-semibold text-white">
          Test generation
        </span>{" "}
      </div>
    )
  } else if (improveSelected || mode === "improve") {
    return (
      <div className="mt-5 inline-flex font-sans">
        <span className="ml-5  text-2xl font-semibold text-white">
          Improve Code
        </span>{" "}
      </div>
    )
  } else if (docSelected || mode === "docs") {
    return (
      <div className="mt-5 inline-flex font-sans">
        <span className="ml-5  text-2xl font-semibold text-white">
          Docs generation
        </span>{" "}
      </div>
    )
  }
}
