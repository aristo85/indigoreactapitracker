import moment from "moment";

export const CustomizedAxisTick = (num) => {
  return moment(num / 1000, "X").format("ddd, hA");
};

export const typeCounter = (arr, type) => {
  return arr?.filter((el) => el.type === type).length;
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

export const formatterLastDay = (arr) => {
  if (!arr) return;
  const currT = new Date().getTime();
  const startT = currT - 24 * 60 * 60 * 1000;
  let data1 = [];
  let data2 = [];
  let lastDayList = arr
    .filter((el) => el.createdAt > startT)
    .map((el) => {
      const date = moment(el.createdAt).startOf("hour").valueOf();
      el.type === 1
        ? data1.push({ type: el.type, date, route: el.route })
        : data2.push({ type: el.type, date, route: el.route });
      return el;
    });
  const oneH = 60 * 60 * 1000;

  data1 = findUsages(data1, "date");
  data2 = findUsages(data2, "date");

  return { data1, data2 };
  //   arr.map((el) => ({
  //     rate: el.rate,
  //     date: moment(el.date_time_w_tz).valueOf(),
  //   }));
};
