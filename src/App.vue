<template>
  <div>

    <div style="margin-bottom: 10px">
      <TaskCreator :onCreate="onTodoCreated"/>
    </div>

    <div>
      <TaskList
          :todos="todos"
          :changed="onTodoChanged"
          :deleted="onTodoDeleted"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useTodos} from '@/hooks/useTodos';
import TaskList from '@/components/TaskList.vue';
import TaskCreator from '@/components/TaskCreator.vue';

export default defineComponent({
  name: 'App',
  components: {
    TaskCreator,
    TaskList
  },
  setup() {
    const {
      todos,
      onTodoCreated,
      onTodoDeleted,
      onTodoChanged
    } = useTodos();

    return {
      todos,
      onTodoChanged,
      onTodoDeleted,
      onTodoCreated
    };
  }

});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
