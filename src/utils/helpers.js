import { v4 as uuidv4 } from 'uuid';

export function generateId() {
  return uuidv4();
}

export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
