import { Menu, Transition } from "@headlessui/react"
import useWindowSize from "hooks/use-window-size"
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

export default function UserMenu({ session, email, image }) {
  const { isMobile } = useWindowSize()
  return (
    <div className="absolute top-4 right-2 z-50 w-56 text-right sm:mr-7">
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-start justify-between">
          <Menu.Button className="text-sm inline-flex h-12 w-full justify-center rounded-full border-[1px] border-purple-500 bg-purple-500 px-4 py-2 font-sans font-medium text-white hover:bg-purple-500 hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="mr-1 flex">
              <Image
                alt="Profile Picture"
                className="mr-0 w-8 rounded-full sm:mr-2"
                src={
                  image || `https://avatars.dicebear.com/api/micah/${email}.svg`
                }
                width={40}
                height={40}
              />

              {!isMobile && <span className="mt-1">{session?.user?.name}</span>}
            </div>
            <ChevronDown
              className="ml-2 -mr-1 mt-1 h-6 w-5 font-medium text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute  right-0 mt-2 w-56 origin-top-right divide-y-[1.5px] divide-purple-400 rounded-md border-[1px] border-purple-500  bg-purple-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="h-11">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard"
                    className={`flex w-full cursor-pointer items-center justify-start ${
                      active ? "bg-purple-800 text-white" : "text-gray-200"
                    } `}
                  >
                    <LayoutDashboard
                      width={45}
                      height={45}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>Dashboard</span>
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="h-11">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => signOut()}
                    className={`flex w-full cursor-pointer items-center justify-start ${
                      active
                        ? "rounded-md bg-purple-800 text-white"
                        : "text-gray-200"
                    } `}
                  >
                    <LogOut
                      width={45}
                      height={45}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>Log Out</span>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
