import { useEffect, useState } from 'react'
import dayjs, { ConfigType } from 'dayjs'

export const dateFormat = (
  date: ConfigType,
  format = 'YYYY-MM-DD HH:mm:ss'
): string => dayjs(date).format(format)

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value

export const cleanObject = (object: any) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [delay, value])

  return debounceValue
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [callback])
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    },
  }
}
