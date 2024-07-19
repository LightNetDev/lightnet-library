import { useRef } from "react"

export function useDebounce(
  callback: (...args: any[]) => unknown,
  time: number,
) {
  const timeout = useRef<number>()
  return (...args: any[]) => {
    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }
    timeout.current = window.setTimeout(() => {
      callback(...args)
      timeout.current = undefined
    }, time)
  }
}
