import SideBar from "app/components/shared/SideBar"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="mx-auto w-full bg-purple-900">
        <SideBar setOpenSecondaryNavBar={undefined} />
        {children}
      </div>
    </>
  )
}
