let didShowMessage = false;
const instance = 'Elapsed';
console.time(instance);
require('log-timestamp');

function showMessage() {
    const message = 'It\'s a message';
    for (let i=0; i< 5; i++) {
        // console.timeLog(instance);
        console.log(message);
    }
}
showMessage();

console.timeEnd(instance);