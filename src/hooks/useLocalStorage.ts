import {onBeforeMount, Ref, watch} from 'vue';

export const useLocalStorage = (key: string, ref: Ref<any>) => {

  onBeforeMount(() => {
    const value = window.localStorage.getItem(key);
    if (value) {
      ref.value = JSON.parse(value);
    }
  });

  watch(ref, () => {
    window.localStorage.setItem(key, JSON.stringify(ref.value));
  });

  const clearEntry = (refValue: string) => {
    ref.value = refValue;
    window.localStorage.setItem(key, refValue);
  };

  return {clearEntry};
};
