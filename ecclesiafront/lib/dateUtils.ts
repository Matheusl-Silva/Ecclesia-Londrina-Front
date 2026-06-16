import moment from "moment";

export const convertNumberToWeekDay = (day: number): string => {
  moment.locale("pt-br");
  const dayName = moment().day(day).format("dddd");
  return dayName.charAt(0).toUpperCase() + dayName.slice(1);
};
