export default (item, value) =>
  String(item.map((item) => (item.type == value ? item.label : null))).replace(
    /,/g,
    ''
  );
