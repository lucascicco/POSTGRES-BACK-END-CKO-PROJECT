/* eslint-disable default-case */
/* eslint-disable prettier/prettier */
export default (status) => {
  switch (status) {
    case 'open':
      return 0;
    case 'closed':
      return 1;
    case 'soldout':
      return 2;
    case 'deleted':
      return 3;
    default:
      return 3;
  }
};
