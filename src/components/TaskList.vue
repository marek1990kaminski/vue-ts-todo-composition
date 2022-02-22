<template>
  <div
      v-for="(todo) in todos"
      id="taskContainer"
      :key="todo.id"
  >
    {{ todo.text }}
    <button @click.prevent="getOnDelete(todo.id)">Delete</button>
  </div>
</template>

<script lang="ts">

import loggerFactory, {Logger} from '@/utils/logger';
import {Todo, UseTodos} from '@/hooks/useTodos';
import {PropType} from 'vue';

const logger: Logger = loggerFactory.create('TaskList');

export default {
  name: 'TaskList',
  props: {
    todos: {
      required: true,
      type: Array as PropType<Array<Todo>>
    },
    changed: {
      required: true,
      type: Function as PropType<UseTodos['onTodoChanged']>
    },
    deleted: {
      required: true,
      type: Function as PropType<UseTodos['onTodoDeleted']>
    }
  },
  setup(props: any) {

    const getOnDelete = (id: Todo['id']) => {
      props.deleted(id);
    };

    return {
      getOnDelete
    };
  }

};
</script>

<style scoped>
#taskContainer {
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>
