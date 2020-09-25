export const DeleteItem = (array, item) => {
  const index = array.indexOf(item);
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const AddItemIntoArray = (array, item) => {
  return [...array, item];
};

export const SellsDone = (Data1, Data2) => {
  const FirstArray = Data1.map((item) => {
    return item.dataValues.product;
  });

  const getOccurrence = (value) => {
    return FirstArray.filter((v) => v === value).length;
  };

  const results = Data2.map((item) => {
    return {
      product: item,
      sellsdone: getOccurrence(item.dataValues.id),
    };
  });

  return results;
};
