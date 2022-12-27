const romanize = (num) => {
  if (isNaN(num)) return NaN;
  let digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

const fnNumberToAlphabet = (num) => {
  if (isNaN(num)) return NaN;
  //   let digits = String(+num).split(""),
  //     key = [
  //       "",
  //       "A",
  //       "B",
  //       "C",
  //       "D",
  //       "E",
  //       "F",
  //       "G",
  //       "H",
  //       "I",
  //       "J",
  //       "K",
  //       "L",
  //       "M",
  //       "N",
  //       "O",
  //       "P",
  //       "Q",
  //       "R",
  //       "S",
  //       "T",
  //       "U",
  //       "V",
  //       "W",
  //       "X",
  //       "Y",
  //       "Z",
  //     ],
  //     alphabet = "",
  //     i = 3;
  //   while (i--) alphabet = (key[+digits.pop() + i * 10] || "") + alphabet;
  //   return Array(+digits.join("") + 1).join("") + alphabet;
  return (num + 9).toString(36).toUpperCase();
};
// (value + 9).toString(36).toUpperCase()

const rupiah = (num )  => {
  return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}
const Fungsi = {
  romanize,
  fnNumberToAlphabet,
  rupiah,
};
export default Fungsi;
