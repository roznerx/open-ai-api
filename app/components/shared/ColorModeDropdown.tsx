"use client"

import { useEffect, useState } from "react"
import { SunMedium, Moon } from "lucide-react"
import Popover from "app/components/shared/Popover"
import { motion } from "framer-motion"
import { FADE_IN_ANIMATION_SETTINGS, LSConfig } from "#/lib/constants"
import useLocalStorage from "hooks/use-localstorage"

export default function ColorModeDropdown() {
  const [openPopover, setOpenPopover] = useState(false)
  const [colorMode, setColorMode] = useLocalStorage(LSConfig.colorMode, "")

  useEffect(() => {
    try {
      if (colorMode === "dark") {
        document.getElementsByTagName("html")[0].classList.add("dark")
      } else {
        document.getElementsByTagName("html")[0].classList.remove("dark")
      }
    } catch (_) {}
  }, [colorMode])

  return (
    <motion.div
      className="relative mr-2 mt-0 inline-block w-[34] text-left"
      {...FADE_IN_ANIMATION_SETTINGS}
    >
      <Popover
        content={
          <div className="top-0 w-full rounded-md bg-white p-2 dark:bg-gray-700 sm:w-56">
            <button
              onClick={() => setColorMode("dark")}
              className="text-sm relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left transition-all duration-75 hover:bg-gray-100 hover:dark:bg-white/20"
            >
              <Moon
                className="h-4 w-4"
                color={colorMode === "dark" ? "white" : "black"}
              />
              <p className="text-sm text-black dark:text-gray-200">Dark </p>
            </button>
            <button
              onClick={() => setColorMode("ligth")}
              className="text-sm relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left transition-all duration-75 hover:bg-gray-100 hover:dark:bg-white/20"
            >
              <SunMedium
                className="h-4 w-4"
                color={colorMode === "dark" ? "white" : "black"}
              />

              <p className="text-sm text-black dark:text-gray-200">Ligth</p>
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
          {colorMode === "dark" ? (
            <Moon color={colorMode === "dark" ? "white" : "black"} />
          ) : (
            <SunMedium color={colorMode === "dark" ? "white" : "black"} />
          )}
        </button>
      </Popover>
    </motion.div>
  )
}
