function retree(item, known, seen) {
  // if it's an array, map over it automatically
  if (Array.isArray(item)) {
    return item.map(subItem => {
      return retree(subItem, known, seen)
    })
  }
  // if it isn't even a JSON API object, return it unchanged
  if (
    typeof item !== 'object'
    || 'id' in item === false
    || 'type' in item === false
  ) {
    return item
  }

  // already contains data - retree any children
  if ('attributes' in item || 'relationships' in item) {
    const tree = {
      ...item.relationships,
    }
    for (const key in tree) {
      if (typeof tree[key] !== 'object') {
        continue
      }
      tree[key] = {
        ...tree[key],
        data: retree(tree[key].data, known, {...seen, [item.type]: true}),
      }
    }
    return {
      ...item,
      relationships: tree,
    }
  }
  // just a pointer - return from known dictionary
  else {
    // just leave it as a pointer if we have already seen this type
    if (item.type in seen) {
      return item
    }
    if (item.type in known && item.id in known[item.type]) {
      return retree(known[item.type][item.id], known, seen)
    }
    return item
  }
}

export default function(data, included) {
  // create a dictionary of known items by [type][id]
  const known = {}
  function learn(item) {
    if ('type' in item === false || 'id' in item === false) {
      return
    }
    if (item.type in known === false) {
      known[item.type] = []
    }
    known[item.type][item.id] = item
  }
  data.map(learn)
  included.map(learn)
  // recursively retree using known database
  return retree(data, known, {})
}
