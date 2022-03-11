const countItems = (arr) => {
  let count = 0;
  arr.forEach(() => {
    count += 1;
  });
  const itemCount = document.querySelector('.item-count');
  itemCount.innerHTML = count;
  return count;
};

export default countItems;
