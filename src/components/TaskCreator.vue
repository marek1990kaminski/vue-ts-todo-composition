<template>

  <form @submit.prevent="onSubmit">
    <div>Add ne task</div>
    <input type="text" @input="onchange($event)" v-model="todoText">
    <input type="submit" value="ADD"/>
  </form>

</template>

<script lang="ts">

import loggerFactory, {Logger} from '@/utils/logger';
import {PropType, ref} from 'vue';
import {UseTodos} from '@/composables/useTodos';

const logger: Logger = loggerFactory.create('TaskCreator');

let id = 0;
const getId = () => id++;

export default {
  name: 'TaskCreator',
  props: {
    onCreate: Function as PropType<UseTodos['onTodoCreated']>
  },
  setup(properties: any) {
    const todoText = ref('');

    const onchange = (event: any): void => {
      logger.debug('event', event);
    };

    const onSubmit = () => {
      logger.debug(
        'onSubmit!!!',
        {
          id: getId(),
          text: todoText,
          completed: false
        }
      );
      properties.onCreate({
        id: getId(),
        text: todoText.value,
        completed: false
      });
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
