exports.findCountry = str => {
  const joinedStr = str.join();
  const countries = ["UK", "U.K.", "Denmark", "Denmark."];
  const strArr = joinedStr.split(" ");
  const outputArr = [];
  for (let j = 0; j < strArr.length; j++) {
    for (let i = 0; i < countries.length; i++) {
      if (strArr[j] === countries[i]) {
        outputArr.push(countries[i]);
      }
    }
  }
  if (!outputArr.length) {
    return "No country identified";
  } else if (outputArr.length === 1) {
    if (outputArr[0].endsWith(".")) return outputArr[0].slice(0, -1);
    return outputArr[0];
  }
  const result = outputArr.filter(country => country !== "UK");
  if (result[0].endsWith(".")) return result[0].slice(0, -1);
  else return result[0];
};
