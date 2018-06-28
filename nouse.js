// const target = document.querySelector('.reaction-time-test');
// const target = document.querySelector('.inner');
// const mouseDownEvent = document.createEvent('MouseEvents');
// mouseDownEvent.initEvent('mousedown', true, true);

// const observer = new MutationObserver((mutations)=>{
//     const arr = [...mutations[0].target.classList];
//     const reslut = arr.some(element => {
//         return element === 'one'
//     });
//     console.log(reslut);
//     if(reslut){
//         target.dispatchEvent(mouseDownEvent);
//     }
// });

// const config = {
//     attributes: true,
//     attributeFilter: ['class']
// };

// observer.observe(target, config);

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const show = document.getElementById('show');

let startTime;

startBtn.addEventListener('click', () => {
    startTime = Date.now();
});

stopBtn.addEventListener('click', () => {
    const stopTime = Date.now();

    const diffTime = (stopTime - startTime) / 1000;
    show.textContent = '中間經過了'+ diffTime +'秒';

});