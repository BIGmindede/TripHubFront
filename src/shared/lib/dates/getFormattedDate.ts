import { Dayjs } from "dayjs";

import dayjs from "dayjs";

export const isDateValid = (date: Date | Dayjs, { min, max }: { min?: Date; max?: Date }): boolean => {
    const parsed = dayjs(date);
    const isInUpRange = max != null ? parsed.isBefore(dayjs(max).endOf('day')) || parsed.isSame(dayjs(max).endOf('day')) : true;
    const isInBottomRange = min != null ? parsed.isAfter(dayjs(min).startOf('day')) || parsed.isSame(dayjs(min).startOf('day')) : true;
    return parsed.isValid() && isInUpRange && isInBottomRange;
  };
  export const getFormattedDate = (date: Date | string | undefined) => {
    if (date == null) {
      return '';
    }
  
    const parsed = dayjs(date);
    return parsed.isValid() ? parsed.format('DD.MM.YYYY') : '';
  };