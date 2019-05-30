// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({
    say: (message) => {
      console.log(message);
    },
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
  });
};
