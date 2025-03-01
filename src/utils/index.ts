export const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {}).format(value);
