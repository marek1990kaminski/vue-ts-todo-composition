<template>
  <div id="container">

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
import {useLocalStorage} from '@/hooks/useLocalStorage';

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

    useLocalStorage('todos', todos);

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
#container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
