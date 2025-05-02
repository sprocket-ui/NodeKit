let id = 0
function generateId() {
  return ++id
}

export function useID() {
  return generateId()
}