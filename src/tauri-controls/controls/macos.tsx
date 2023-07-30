import { appWindow } from "@tauri-apps/plugin-window"
import { useEffect, useState, type HTMLProps } from "react"
import { Icons } from "src/tauri-controls/components/icons"
import { cn } from "src/tauri-controls/libs/utils"
import { Button } from "../components/button"

export function MacOS({ className, ...props }: HTMLProps<HTMLDivElement>) {
  const [isAltKeyPressed, setIsAltKeyPressed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const last = isAltKeyPressed ? <Icons.plusMac /> : <Icons.fullMac />
  const key = "Alt"

  if (process.env.NODE_ENV === "production")
    document.addEventListener("contextmenu", (event) => event.preventDefault())

  const handleMouseEnter = () => {
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleAltKeyDown = (e: KeyboardEvent) => {
    if (e.key === key) {
      setIsAltKeyPressed(true)
    }
  }
  const handleAltKeyUp = (e: KeyboardEvent) => {
    if (e.key === key) {
      setIsAltKeyPressed(false)
    }
  }
  useEffect(() => {
    // Attach event listeners when the component mounts
    window.addEventListener("keydown", handleAltKeyDown)
    window.addEventListener("keyup", handleAltKeyUp)
  }, [])

  const minimizeWindow = async () => await appWindow.minimize()
  const maximizeWindow = async () => await appWindow.toggleMaximize()
  const fullscreenWindow = async () => {
    const fullscreen = await appWindow.isFullscreen()
    if (fullscreen) {
      await appWindow.setFullscreen(false)
    } else {
      await appWindow.setFullscreen(true)
    }
  }
  const closeWindow = async () => await appWindow.close()

  return (
    <div
      className={cn(
        "px-2 text-black active:text-black dark:text-black",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <Button
        onClick={closeWindow}
        className="mr-2 aspect-square h-3 w-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#ff544d] text-center text-black/60 hover:bg-[#ff544d] active:bg-[#bf403a] active:text-black/60 dark:border-none"
      >
        {isHovering && <Icons.closeMac />}
      </Button>
      <Button
        onClick={minimizeWindow}
        className="mr-2 aspect-square h-3 w-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12]  bg-[#ffbd2e] text-center text-black/60 hover:bg-[#ffbd2e] active:bg-[#bf9122] active:text-black/60 dark:border-none"
      >
        {isHovering && <Icons.minMac />}
      </Button>
      <Button
        // onKeyDown={handleAltKeyDown}
        // onKeyUp={handleAltKeyUp}
        onClick={isAltKeyPressed ? maximizeWindow : fullscreenWindow}
        className="aspect-square h-3 w-3 cursor-default content-center items-center justify-center self-center rounded-full border border-black/[.12] bg-[#28c93f] text-center text-black/60 hover:bg-[#28c93f] active:bg-[#1e9930] active:text-black/60 dark:border-none"
      >
        {isHovering && last}
      </Button>
    </div>
  )
}
