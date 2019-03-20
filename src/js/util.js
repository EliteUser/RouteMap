export const rearrangeElements = (array, moveFrom, moveTo) => {
  if (moveFrom <= array.length && moveTo <= array.length && moveFrom !== moveTo) {
    if (moveTo <= moveFrom) {
      moveTo -= 1;
    } else {
      moveTo = (moveTo - 2) < 0 ? 0 : moveTo - 2;
    }
    array.splice(moveTo, 0, array.splice(moveFrom - 1, 1)[0]);
  }
  return array;
};
