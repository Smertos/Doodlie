export function randString() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '');
}
