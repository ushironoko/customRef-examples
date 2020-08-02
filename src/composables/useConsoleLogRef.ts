import { customRef } from 'vue'

export const consoleLogRef = <T>(value: T) => {
  console.log('value is ', value)
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        console.log('track ', value)
        return value
      },
      set(newValue: T) {
        value = newValue
        trigger()
        console.log('trigger ', value)
      },
    }
  })
}
