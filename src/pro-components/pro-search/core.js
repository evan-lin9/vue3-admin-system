export function getSearchFields(list, isShow) {
  if (!isShow) {
    list = list.filter(j => j.search)
  }
  const temp = list.map(i => ({
    key: i.key,
    title: i.title,
    type: i.type,
    options: i.options,
    isInternational: i.isInternational === undefined ? true : i.isInternational,
    span: i.span || 6,
    isRequired: i.isRequired || false,
    props: i.props || {},
    ...i.search
  }))
  let total = 0
  const res = []
  temp.forEach(i => {
    total += i.span
    if (total <= 18) {
      res.push(i)
    }
  })
  return res
}

export function getSearchToggleFields(list, isShow) {
  if (!isShow) {
    list = list.filter(j => j.search)
  }
  const temp = list.map(i => ({
    key: i.key,
    title: i.title,
    type: i.type,
    options: i.options,
    span: i.span || 6,
    isRequired: i.isRequired || false,
    props: i.props || {},
    ...i.search
  }))
  let total = 0
  const res = []
  temp.forEach(i => {
    total += i.span
    if (total > 18) {
      res.push(i)
    }
  })
  return res
}
