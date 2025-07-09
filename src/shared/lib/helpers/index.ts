let debounceTimer: ReturnType<typeof setTimeout>;

export const debounce = (func: () => void, timeout = 300) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, timeout);
};
