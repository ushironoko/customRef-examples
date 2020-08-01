import { customRef } from 'vue'

export const consoleLogRef = <T>(value: T) => {
  console.log('value is ', value)
  return customRef((track, trigger) => {
    return {
      get() {
        console.log('track on ', value)
        track()
        return value
      },
      set(newValue: T) {
        value = newValue
        console.log('trigger on ', value)
        trigger()
      },
    }
  })
}
