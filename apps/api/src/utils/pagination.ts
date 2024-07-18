export function paginate(show: number, page: number) {
  return { take: show, skip: (page - 1) * show };
}

export function countTotalPage(count: number, show: number) {
  return Math.ceil(count / show);
}
