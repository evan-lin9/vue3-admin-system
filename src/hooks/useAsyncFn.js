import { ref } from "vue";

export default function useAsyncFn(fn) {
  const state = ref({ loading: false });
  state.value.loading = true;

  fn().then(
    value => {
      state.value = {
        value,
        loading: false
      };
    },
    error => {
      state.value = {
        error,
        loading: false
      };
    }
  );

  return {
    state
  };
}
