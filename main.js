let min1 = document.querySelector('.timer__content_time_minutes');
let sec1 = document.querySelector('.timer__content_time_seconds');

let min2 = document.querySelector('.timer__content_break_minutes');
let sec2 = document.querySelector('.timer__content_break_seconds');

let min_an = document.querySelector('.timer__animation_time_minutes');
let sec_an = document.querySelector('.timer__animation_time_seconds');

const modal_window_break = document.querySelector('.timer__modal-window_break');
const modal_window_cycle = document.querySelector('.timer__modal-window_cycle');
let cycle = document.querySelector('.timer__content_cycle_n');
let circle = document.querySelector('circle');

let min = [min1, min2];
let sec = [sec1, sec2];

const const_min = [1, 1]
const const_sec = '00';

let time_min = [1, 1];
let time_sec = '00';

for (i = 0; i < min.length; i++) {

    min[i].innerHTML = const_min[i];
    sec[i].innerHTML = const_sec;

    if (min[i].innerHTML.length === 1) {
        min[i].innerHTML = '0' + const_min[i];
    };
};

min_an.innerHTML = min[0].innerHTML;
sec_an.innerHTML = sec[0].innerHTML;

function Animation() {

    circle.classList.add('no_animation')



    if (modal_window_break.classList.contains('hidden') === true &&
        modal_window_cycle.classList.contains('hidden') === true) {
        if (time_min[0] !== const_min[0] && time_min[1] === const_min[1]) {
            min_an.innerHTML = min[0].innerHTML;
            sec_an.innerHTML = sec[0].innerHTML;
            circle.classList.remove('no_animation');
        } else if (time_min[1] !== const_min[1]) {
            min_an.innerHTML = min[1].innerHTML;
            sec_an.innerHTML = sec[1].innerHTML;
            circle.classList.remove('no_animation');
        }
    }
    else if (min_an.innerHTML == const_min[0]) {
        circle.classList.add('no_animation');
    }

    if (sec_an.innerHTML.length === 1) {
        sec_an.innerHTML = '0' + sec_an.innerHTML;
    }

}

const btn_start = document.querySelector('.timer__control_start');
const btn_reset = document.querySelector('.timer__control_reset');
const btn_break = document.querySelector('.timer__control_break');
const btn_cycle = document.querySelector('.timer__control_cycle');

btn_start.addEventListener('click', (evt) => {
    evt.preventDefault()
    StartTimer(0)
}, false)

btn_break.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal_window_break.classList.add('hidden');
    StartTimer(1)
}, false)

btn_reset.addEventListener('click', () => {
    location.reload()
})

btn_cycle.addEventListener('click', (evt) => {
    evt.preventDefault();
    let n = parseInt(cycle.innerHTML);
    cycle.innerHTML = n + 1;
    modal_window_cycle.classList.add('hidden');
    time_min = [1, 1];
    time_sec = '00';
    min_an.innerHTML = String(const_min[0]);
    sec_an.innerHTML = String(const_sec[0]);
    if (min_an.innerHTML.length === 1) {
        min_an.innerHTML = '0' + const_min[1];
    };

})

function StartTimer(i) {
    if (min[i].innerHTML == const_min[i] && sec[i].innerHTML == const_sec) {
        time_min[i]--;
        time_sec = 59;

        min[i].innerHTML = time_min[i]
        sec[i].innerHTML = time_sec

        if (min[i].innerHTML.length === 1) {
            min[i].innerHTML = '0' + time_min[i]
        }

        const min_interval = setInterval(minChange, 6000);
        const sec_interval = setInterval(secChange, 100);

        function minChange() {
            time_min[i]--;
            min[i].innerHTML = time_min[i]
        }

        function secChange() {
            time_sec--
            sec[i].innerHTML = time_sec

            if (time_sec <= 0) {
                if (time_min[i] <= 0) {
                    sec[i].innerHTML = const_sec
                    min[i].innerHTML = const_min[i]
                    clearInterval(min_interval)
                    clearInterval(sec_interval)
                    modal_window_break.classList.remove('hidden');
                    if (i === 1) {
                        modal_window_break.classList.add('hidden');
                        modal_window_cycle.classList.remove('hidden')
                    }
                }
                time_sec = 60
            }
            if (sec[i].innerHTML.length === 1) {
                sec[i].innerHTML = '0' + sec[i].innerHTML
            } else if (min[i].innerHTML.length === 1) {
                min[i].innerHTML = '0' + min[i].innerHTML
            }
            console.log(sec[i].innerHTML);
        }
    } else {
        alert('You have already start')
    }

}

setInterval(Animation, 100)