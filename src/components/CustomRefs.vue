<script lang="ts">
import { defineComponent, ref } from 'vue'
import { consoleLogRef } from '../composables/useConsoleLogRef'
import { diffRef } from '../composables/useDiffRef'

export default defineComponent({
  name: 'CustomRefs',
  setup() {
    // Whenever a change is detected, the value is output to the browser console.
    const logValue = consoleLogRef(100)
    function plusOne() {
      logValue.value++
    }

    // Custom ref that makes `isChanged` true if there is a change in the initial reactive value.
    const diffValue = diffRef({
      value: 0,
      isChanged: false,
    })
    function mutationDiffValue() {
      diffValue.value.value = inputValue.value
    }
    const inputValue = ref(0)

    return {
      logValue,
      plusOne,
      diffValue,
      mutationDiffValue,
      inputValue,
    }
  },
})
</script>

<template>
  <div>
    <div>
      <p>useConsoleLogRef: {{ logValue }}</p>
      <button @click="plusOne">+</button>
    </div>
    <div>
      <p>useDiffRef: changed? {{ diffValue.isChanged ? 'yes' : 'no' }}</p>
      <p>useDiffRef: value {{ diffValue.value }}</p>
      <input v-model="inputValue" type="number" />
      <button @click="mutationDiffValue()">submit</button>
    </div>
  </div>
</template>
