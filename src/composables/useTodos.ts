import { Ref, ref } from 'vue';
import loggerFactory, { Logger } from '@/utils/logger';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const logger: Logger = loggerFactory.create('UseTodos');

export interface UseTodos {
  onTodoChanged: (id: Todo['id']) => void;
  todos: Ref<Array<Todo>>;
  onTodoDeleted: (id: Todo['id']) => void;
  onTodoCreated: (todo: Todo) => void;
}

export const useTodos = (): UseTodos => {
  const todos: Ref<Array<Todo>> = ref([]);

  const onTodoCreated = (todo: Todo): void => {
    logger.debug('onTodoCreated, todo', todo);
    todos.value = [...todos.value, todo];
  };

  const onTodoDeleted = (id: Todo['id']): void => {
    todos.value = todos.value.filter(t => t.id !== id);
  };

  const onTodoChanged = (id: Todo['id']): void => {
    const index: number = todos.value.findIndex(t => t.id === id);
    const item: Todo = todos.value[id];
    todos.value = [
      ...todos.value.slice(0, index),
      {
        ...item,
        completed: !item.completed
      },
      ...todos.value.slice(index + 1)
    ];
  };

  return {
    todos,
    onTodoCreated,
    onTodoDeleted,
    onTodoChanged
  };
};
