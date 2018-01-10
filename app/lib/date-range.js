import dateFns from 'date-fns';

const TODAY = 'today';
const YESTERDAY = 'yesterday';
const THIS_WEEK = 'this_week';
const LAST_WEEK = 'last_week';
const LAST_1_YEAR = 'last_1_year';
const THIS_YEAR = 'this_year';
const LAST_YEAR = 'last_year';

const isDayRange = (dateCode) => {
  const pattern = /last_(\d+)_(day)s/;
  const match = pattern.exec(dateCode);

  if (!match) {
    return false;
  }

  return match.length === 3;
};

const extractDayNumber = (dateCode) => {
  const pattern = /last_(\d+)_(day)s/;
  const match = pattern.exec(dateCode);

  return match[1];
};

const dayRange = (dateCode) => {
  const now = new Date();
  const dayNumber = extractDayNumber(dateCode);
  const startDate = dateFns.subDays(now, dayNumber);

  return {
    startDate: dateFns.format(startDate, 'YYYY-MM-DD'),
    endDate: dateFns.format(now, 'YYYY-MM-DD HH:mm:ss'),
  };
};

const todayRange = () => ({
  startDate: dateFns.format(dateFns.startOfToday(), 'YYYY-MM-DD HH:mm:ss'),
  endDate: dateFns.format(dateFns.endOfToday(), 'YYYY-MM-DD HH:mm:ss'),
});

const yesterdayRange = () => ({
  startDate: dateFns.format(dateFns.startOfYesterday(), 'YYYY-MM-DD HH:mm:ss'),
  endDate: dateFns.format(dateFns.endOfYesterday(), 'YYYY-MM-DD HH:mm:ss'),
});

const thisWeekRange = () => {
  const now = new Date();

  return {
    startDate: dateFns.format(dateFns.startOfWeek(now), 'YYYY-MM-DD HH:mm:ss'),
    endDate: dateFns.format(dateFns.endOfWeek(now), 'YYYY-MM-DD HH:mm:ss'),
  };
};

const thisQuarterRange = () => {
  const now = new Date();
  const startOfQuarter = dateFns.startOfQuarter(now);

  return {
    startDate: dateFns.format(startOfQuarter, 'YYYY-MM-DD HH:mm:ss'),
    endDate: dateFns.format(now, 'YYYY-MM-DD HH:mm:ss'),
  };
};

const lastWeekRange = () => {
  const startOfLastWeek = dateFns.startOfWeek(dateFns.subWeeks(new Date(), 1));
  const endOfLastWeek = dateFns.endOfWeek(startOfLastWeek);

  return {
    startDate: dateFns.format(startOfLastWeek, 'YYYY-MM-DD HH:mm:ss'),
    endDate: dateFns.format(endOfLastWeek, 'YYYY-MM-DD HH:mm:ss'),
  };
};

const lastOneYearRange = () => {
  const now = new Date();
  const last1Year = dateFns.subYears(now, 1);

  return {
    startDate: dateFns.format(last1Year, 'YYYY-MM-DD'),
    endDate: dateFns.format(now, 'YYYY-MM-DD HH:mm:ss'),
  };
};

const thisYearRange = () => {
  const now = new Date();
  const startOfYear = dateFns.startOfYear(now);
  const endOfYear = dateFns.endOfYear(now);

  return {
    startDate: dateFns.format(startOfYear, 'YYYY-MM-DD'),
    endDate: dateFns.format(endOfYear, 'YYYY-MM-DD HH:mm:ss'),
  };
};

const lastYearRange = () => {
  const startOfLastYear = dateFns.startOfYear(dateFns.subYears(new Date(), 1));
  const endOfLastYear = dateFns.endOfYear(startOfLastYear);

  return {
    startDate: dateFns.format(startOfLastYear, 'YYYY-MM-DD'),
    endDate: dateFns.format(endOfLastYear, 'YYYY-MM-DD HH:mm:ss'),
  };
};

/**
 * Convert defined date code's text into date range.
 * @param  {string} dateCode
 * @return {object}
 */
export default function convertToDates(dateCode) {
  if (isDayRange(dateCode)) {
    return dayRange(dateCode);
  } else if (dateCode === TODAY) {
    return todayRange();
  } else if (dateCode === YESTERDAY) {
    return yesterdayRange();
  } else if (dateCode === THIS_WEEK) {
    return thisWeekRange();
  } else if (dateCode === 'this_quarter') {
    return thisQuarterRange();
  } else if (dateCode === LAST_WEEK) {
    return lastWeekRange();
  } else if (dateCode === LAST_1_YEAR) {
    return lastOneYearRange();
  } else if (dateCode === THIS_YEAR) {
    return thisYearRange();
  } else if (dateCode === LAST_YEAR) {
    return lastYearRange();
  }

  throw new Error(`'dateCode' of '${dateCode}' is not recognized`);
}
