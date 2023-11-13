/**
 *
 * @param {Array} array to be shuffled
 * @returns shuffled array
 *
 * reference: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
 */
export function shuffle(arr) {
  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}

export const selectFirstRandomData = (data) => {
  const randIndex = Math.floor(Math.random() * data.length);
  return data[randIndex];
};
