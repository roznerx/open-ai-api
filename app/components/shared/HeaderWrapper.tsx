import Header from "../Header"

export default async function HeaderWrapper({ translations }) {
  return (
    <>
      <Header translations={translations} />
    </>
  )
}
