"use client"

import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { SunMedium, Moon } from "lucide-react"
import { LampDesk, LogOut, Laptop } from "lucide-react"
import { FADE_IN_ANIMATION_SETTINGS, LSConfig } from "@/lib/constants"
import useLocalStorage from "hooks/use-localstorage"
import Popover from "app/components/shared/Popover"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function UserDropdown() {
  const { data: session } = useSession()
  const { email, image } = session?.user || {}
  const [colorMode, setColorMode] = useLocalStorage(LSConfig.colorMode, "")
  const [openPopover, setOpenPopover] = useState(false)

  useEffect(() => {
    try {
      if (colorMode === "dark") {
        document.getElementsByTagName("html")[0].classList.add("dark")
      } else {
        document.getElementsByTagName("html")[0].classList.remove("dark")
      }
    } catch (_) {}
  }, [colorMode])

  if (!email) return null

  return (
    <motion.div
      className="relative inline-block text-left"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <Popover
        content={
          <div className="mt-3 w-full rounded-md bg-white p-2 sm:w-56">
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <LampDesk className="h-4 w-4" />
              <Link href="code-idea">
                <p className="text-sm">Code Idea</p>
              </Link>
            </button>
            <button className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100">
              <Laptop className="h-4 w-4" />
              <Link href="my-code">
                <p className="text-sm">My Code</p>
              </Link>
            </button>
            <button
              onClick={
                colorMode === "dark"
                  ? () => setColorMode("ligth")
                  : () => setColorMode("dark")
              }
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
            >
              {colorMode === "dark" ? (
                <SunMedium className="h-4 w-4" color={"black"} />
              ) : (
                <Moon
                  className="h-4 w-4"
                  color={colorMode === "dark" ? "white" : "black"}
                />
              )}
              <Link href={"#"}>
                <p className="text-sm ">
                  {colorMode === "dark" ? "Ligth Mode" : "Dark Mode"}
                </p>
              </Link>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </motion.div>
  )
}
