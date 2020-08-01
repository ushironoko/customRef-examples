import { customRef, ref, UnwrapRef, reactive } from 'vue'

type DiffRef<T> = {
  value: T
  isChanged: boolean
}

export const diffRef = <T>(args: DiffRef<T>) => {
  const cacheValue = ref(args.value)

  return customRef((track, trigger) => {
    return {
      get() {
        args.isChanged = args.value !== cacheValue.value
        track()
        return reactive(args) as DiffRef<T>
      },
      set(newValue: DiffRef<T>) {
        args.value = newValue.value
        cacheValue.value = newValue.value as UnwrapRef<T>
        trigger()
      },
    }
  })
}
