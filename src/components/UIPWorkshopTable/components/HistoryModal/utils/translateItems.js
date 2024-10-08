export default (items, field) => {
  let NewValue, OldValue;

  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (element.type == field.NewValue) {
      NewValue = element.label;
    }
    if (element.type == field.OldValue) {
      OldValue = element.label;
    }
  }

  return {
    NewValue,
    OldValue,
  };
};
