import { useEffect, useState } from "react"

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    // Retrieve from localStorage
    const item =
      typeof window !== "undefined" && window.localStorage.getItem(key)

    try {
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.log(`There was an error: , ${error}`)
    }
  }, [key])

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value)
    // Save to localStorage
    typeof window !== "undefined" &&
      window.localStorage.setItem(key, JSON.stringify(value))
  }
  return [storedValue, setValue]
}

export default useLocalStorage
