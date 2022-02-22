<template>

  <form @submit.prevent="onSubmit">
    <div>Add task</div>
    <input v-model="todoText" type="text" @input="onchange">
    <input type="submit" value="ADD"/>
  </form>

</template>

<script lang="ts">

import {UseTodos} from '@/hooks/useTodos';
import loggerFactory, {Logger} from '@/utils/logger';
import {PropType, ref} from 'vue';

const logger: Logger = loggerFactory.create('TaskCreator');

let id = 0;
const getId = () => id++;

export default {
  name: 'TaskCreator',
  props: {
    onCreate: Function as PropType<UseTodos['onTodoCreated']>
  },
  setup(props: any) {
    const todoText = ref('');

    const onchange = (event: any): void => {
      logger.debug('event', event);
    };

    const onSubmit = () => {
      logger.debug('onSubmit!!!', {
        id: getId(),
        text: todoText,
        completed: false
      });

      if (todoText.value === '') {
        alert('You can\'t add empty task');
      } else {
        props.onCreate(
          {
            id: getId(),
            text: todoText.value,
            completed: false
          }
        );
        todoText.value = '';

      }

    };

    return {
      onchange,
      todoText,
      onSubmit
    };
  }
};
</script>

<style scoped>

</style>
