import { Menu, Transition } from "@headlessui/react"
import { Code, LayoutDashboard, LogOut, MessageSquare } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Fragment } from "react"

export default function UserMenu({ session, email, image, translations }) {
  const router = useRouter()
  return (
    <div className="absolute top-4 right-4 z-50 w-auto text-center sm:right-2 sm:mr-7">
      <Menu as="div" className="relative">
        <div className="flex items-center justify-center">
          <Menu.Button className="text-sm flex h-12 w-12 items-center justify-center rounded-full border-[1px]  border-gray-500 bg-purple-500  font-sans font-medium text-white hover:bg-purple-500 hover:bg-opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ">
            {image && (
              <Image
                alt="Profile Picture"
                className="w-8 rounded-full bg-black"
                src={
                  image || `https://avatars.dicebear.com/api/micah/${email}.svg`
                }
                width={40}
                height={40}
              />
            )}

            {!image && (
              <div className="flex items-center justify-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-purple-500 bg-morado text-center font-medium ">
                  {session?.user?.name.split(" ")[0].substring(0, 1)}
                </span>
              </div>
            )}
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y-[1.5px] divide-purple-400 rounded-md border-[1px] border-purple-500  bg-purple-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="h-11">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => router.push("/dashboard")}
                    className={`flex w-full cursor-pointer items-center justify-start ${
                      active ? "bg-purple-800 text-white" : "text-gray-200"
                    } `}
                  >
                    <LayoutDashboard
                      width={45}
                      height={45}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>{translations.menu.dashboard}</span>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="h-11">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => router.push("/code-idea")}
                    className={`flex w-full cursor-pointer items-center justify-start ${
                      active ? "bg-purple-800 text-white" : "text-gray-200"
                    } `}
                  >
                    <Code
                      width={45}
                      height={45}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>{translations.menu.codeIdeas}</span>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="h-11">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => router.push("/code-chat")}
                    className={`flex w-full cursor-pointer items-center justify-start ${
                      active ? "bg-purple-800 text-white" : "text-gray-200"
                    } `}
                  >
                    <MessageSquare
                      width={45}
                      height={45}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>{translations.menu.chat}</span>
                  </div>
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
                    <span>{translations.menu.logOut}</span>
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
