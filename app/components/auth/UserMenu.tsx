import { Menu, Transition } from "@headlessui/react"
import { Crisp } from "crisp-sdk-web"
import useWindowSize from "hooks/use-window-size"
import {
  Coins,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
} from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"

export default function UserMenu({ session, email, image, translations }) {
  const router = useRouter()
  const [_, setOpeningSupport] = useState(false)
  const { isMobile } = useWindowSize()
  useEffect(() => {
    Crisp.configure("12685b82-e8b5-43a2-a596-d2d559d02e5a", {
      autoload: true,
    })
    Crisp.chat.hide()
  }, [])

  useEffect(() => {
    if (session?.user?.email) {
      Crisp.user.setEmail(session.user.email)
      Crisp.user.setNickname(session.user.name || session.user.email)
    }
  }, [session])

  useEffect(() => {
    Crisp.chat.onChatOpened(() => {
      setOpeningSupport(false)
    })
    Crisp.chat.onChatClosed(() => {
      Crisp.chat.hide()
    })
  }, [])
  return (
    <div className="absolute right-4 top-3 z-50 w-auto text-center sm:right-3 sm:top-2">
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
          <Menu.Items
            className={`absolute right-0 mt-2 ${
              isMobile ? "hidden" : "block"
            }  w-56 origin-top-right divide-y-[1.5px] divide-purple-400 rounded-md border-[1px] border-purple-500  bg-purple-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className="h-auto">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      setOpeningSupport(true)
                      Crisp.chat.open()
                      Crisp.chat.show()
                    }}
                    className={` flex h-10 w-full cursor-pointer items-center justify-start pl-2 ${
                      active ? "bg-purple-800 text-white" : "text-gray-200"
                    } `}
                  >
                    <MessageCircle
                      width={35}
                      height={35}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>{translations.menu.support}</span>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="h-auto">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/dashboard"
                    className={`flex h-10 w-full cursor-pointer items-center justify-start pl-2 ${
                      active ? "bg-purple-800 text-white" : "text-gray-200"
                    } `}
                  >
                    <LayoutDashboard
                      width={35}
                      height={35}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>{translations.menu.dashboard}</span>
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className="h-auto">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/pricing"
                    className={`flex h-10 w-full cursor-pointer items-center justify-start pl-2 ${
                      active ? "bg-purple-800 text-white" : "text-gray-200"
                    } `}
                  >
                    <Coins
                      width={35}
                      height={35}
                      className={`text-sm items-start rounded-md px-2 py-2`}
                    />
                    <span>{translations.menu.pricing}</span>
                  </Link>
                )}
              </Menu.Item>
            </div>
            {!!session.user.subscriptionId && (
              <div className="h-auto">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() =>
                        router.push(
                          `/settings?subId=${session.user.subscriptionId}`,
                        )
                      }
                      className={`flex h-10 w-full cursor-pointer items-center justify-start pl-2 ${
                        active ? "bg-purple-800 text-white" : "text-gray-200"
                      } `}
                    >
                      <Settings
                        width={35}
                        height={35}
                        className={`text-sm items-start rounded-md px-2 py-2`}
                      />
                      <span>Settings</span>
                    </div>
                  )}
                </Menu.Item>
              </div>
            )}
            <div className="h-auto">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => signOut()}
                    className={`flex h-10 w-full cursor-pointer items-center justify-start pl-2 ${
                      active
                        ? "rounded-md bg-purple-800 text-white"
                        : "text-gray-200"
                    } `}
                  >
                    <LogOut
                      width={35}
                      height={35}
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
