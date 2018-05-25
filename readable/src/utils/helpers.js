import sortBy from 'sort-by'

export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

export const sortListPosts = (posts, sortPosts) => {
  if (sortPosts && sortPosts.sorts && posts.items) {
    const active = sortPosts.sorts.filter(item => item.id === sortPosts.active)
    posts.items.sort(sortBy(...active[0].sortBy))
  }
  return posts;
}

export const validateForm = (values) => {
  for (let key of values) {
    if(key.className === "required" && key.value === "") {
      alert(`The ${key.name} is required!`);
      document.getElementById(key.name).focus();
      return false;
    }
  }
  return true;
}

export const convertEpoch = (timestamp) => {
  let d = new Date(timestamp)
  const minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes()
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} at ${d.getHours()}:${minutes}:${d.getSeconds()}`
}
