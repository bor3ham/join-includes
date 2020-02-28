export function pointer(type, id) {
  return {
    type,
    id,
  }
}

export function data(pointer, attributes={}, relationships={}) {
  return {
    ...pointer,
    attributes,
    relationships,
  }
}
