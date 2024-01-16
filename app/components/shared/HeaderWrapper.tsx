import Header from "../Header"

export default async function HeaderWrapper({ translations, session }) {
  return (
    <>
      <Header session={session} translations={translations} />
    </>
  )
}
