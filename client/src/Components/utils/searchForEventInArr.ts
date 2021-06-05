export default function searchForEventInArr(
  searchValue: number,
  prop: string,
  array: any[]
) {
  for (let i = 0; i < array.length; i++) {
    if (new Date(array[i][prop]).getDate() === searchValue) {
      return array[i];
    }
  }
}
