const data = {
  c1: {
    p1: {
      image: "p1sds",
      brand: "p1sds",
    },
    p2: {
      image: "p1sds",
      brand: "p1sds",
    },
    p3: {
      image: "p1sds",
      brand: "p1sds",
    },
  },
  c2: {
    p1: {
      image: "p2sds",
      brand: "p2sds",
    },
    p2: {
      image: "p2sds",
      brand: "p2sds",
    },
    p3: {
      image: "p2sds",
      brand: "p2sds",
    },
  },
  c3: {
    p1: {
      image: "p3sds",
      brand: "p3sds",
    },
    p2: {
      image: "p3sds",
      brand: "p3sds",
    },
    p3: {
      image: "p3sds",
      brand: "p3sds",
    },
  },
  c4: {
    p1: {
      image: "c4p1sds",
      brand: "c4p1sds",
    },
    p2: {
      image: "c4p1sds",
      brand: "c4p1sds",
    },
    p3: {
      image: "c4p1sds",
      brand: "c4p1sds",
    },
  },
};

const dataArray = JSON.parse(JSON.stringify(data));

for (let key in data) {
  // key = c1
  if (data.hasOwnProperty(key)) {
    dataArray[key] = [];
    for (let product in data[key]) {
      // product = p1
      if (data[key].hasOwnProperty(product)) {
        dataArray[key].push(data[key][product]);
      }
    }
  }
}
console.log(dataArray);
