import moment from "moment";

export const CustomizedAxisTick = (num, period) => {
  return moment(num / 1000, "X").format(
    period === "Last day" ? "dddd, hA" : " MM Do YYYY"
  );
};

export const setStartDate = (period) => {
  const periodNumber =
    period === "Last day" ? 1 : period === "Last week" ? 7 : 30;
  return new Date().getTime() - periodNumber * 24 * 60 * 60 * 1000;
};

export const typeCounter = (data, period) => {
  let initialValue = 0;
  let sum = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.usage,
    initialValue
  );
  const average =
    period === "Last day"
      ? `${(sum / 24).toFixed(1)} req/hr`
      : period === "Last week"
      ? `${(sum / 7).toFixed(1)} req/day`
      : `${(sum / 30).toFixed(1)} req/day`;
  return { sum, average };
};

export const findUsages = (arr, key) => {
  let arr2 = [];

  arr.forEach((x) => {
    // Checking if there is any object in arr2
    // which contains the key value
    if (
      arr2.some((val) => {
        return val[key] === x[key];
      })
    ) {
      // If yes! then increase the usage by 1
      arr2.forEach((k) => {
        if (k[key] === x[key]) {
          k["usage"]++;
        }
      });
    } else {
      // If not! Then create a new object initialize
      // it with the present iteration key's value and
      // set the usage to 1
      let a = { ...x };
      //   a[key] = x[key];
      a["usage"] = 1;
      arr2.push(a);
    }
  });

  return arr2;
};

export const dataFormater = (arr, period) => {
  if (!arr) return;
  const startT = setStartDate(period);
  let data1 = [];
  let data2 = [];
  arr
    .filter((el) => el.createdAt > startT)
    .map((el) => {
      const date = moment(el.createdAt)
        .startOf(period === "Last day" ? "hour" : "day")
        .valueOf();
      el.type === 1
        ? data1.push({ type: el.type, date, route: el.route })
        : data2.push({ type: el.type, date, route: el.route });
      return el;
    });

  data1 = findUsages(data1, "date");
  data2 = findUsages(data2, "date");

  return { data1, data2 };
};
