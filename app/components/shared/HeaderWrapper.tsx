import Header from "../Header"

export default function HeaderWrapper({ translations, session }) {
  return (
    <>
      <Header translations={translations} session={session} />
    </>
  )
}
