export const DeleteItem = (array, item) => {
  const index = array.indexOf(item);
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const AddItemIntoArray = (array, item) => {
  return [...array, item];
};

export const SellsDone = (Data1, Data2) => {
  const FirstArray = Data1.map((item) => {
    return {
      product_id: item.dataValues.product,
      quantity_sold: item.dataValues.purchase_quantity,
    };
  });

  const getOccurrence = (value) => {
    return FirstArray.filter((v) => v.product_id === value);
  };

  const SumingUp = (value) => {
    return value.reduce((total, purchase) => {
      return total + purchase.quantity_sold;
    }, 0);
  };

  const results = Data2.map((item) => {
    return {
      product: item,
      sellsdone: getOccurrence(item.dataValues.id).length,
      quantity_sold: SumingUp(getOccurrence(item.dataValues.id)),
    };
  });

  return results;
};
