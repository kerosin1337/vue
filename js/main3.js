var app = new Vue({
    el: '#app',
    data: {
        currentTime: 15,
        timer: null,
        timerFish: null,
        fish: [],
        user: [],
        count: 0,
        pointS: 0,
        seenRestart: false,
        nick: '',
        counterUser: 0,
    },
    mounted() {
        // this.tempx = 0;
        // this.tempy = 0;
        // this.startTimer();
        if (localStorage.user) {
            this.user = JSON.parse(localStorage.user);
        }
    },
    destroyed() {
        this.stopTimer()
    },
    methods: {
        startGame() {
            this.tempx = [];
            this.tempy = [];
            this.startTimer();
        },
        startTimer() {
            // this.timer = setInterval(() => {
            //     this.currentTime--;
            // }, 1000);
            this.timerFish = setInterval(() => {
                if (this.count % 5 === 0 && this.count !== 0) {
                    this.fish.push({
                        i: this.count,
                        seens: true,
                        image: 'img/800.png',
                        point: 800
                    });
                } else if (this.count % 2 === 0) {
                    this.fish.push({
                        i: this.count,
                        seens: true,
                        image: 'img/300.png',
                        point: 300
                    });
                } else {
                    this.fish.push({
                        i: this.count,
                        seens: true,
                        image: 'img/100.png',
                        point: 100
                    });
                    this.tempx.push(0);
                    this.tempy.push(0);
                }
                this.count++;
                this.currentTime--;
            }, 1000)
        },
        stopTimer() {
            this.currentTime = 15;
            // clearTimeout(this.timer);
            clearTimeout(this.timerFish);
            // this.user.push({userPoints: this.pointS});
            console.log(this.user, 34);
            this.user = this.user.sort(sortByPrice);
            this.fish = [];
            this.pointS = 0;
            this.seenRestart = true;
        },
        restart() {
            this.fish = [];
            this.count = 0;
            this.seenRestart = false;
            this.nick = '';
        },
        repeatGame() {
            this.fish = [];
            this.count = 0;
            this.seenRestart = false;
            this.startGame();
        },
        delFish(i) {
            // console.log(i);
            // console.log(this.fish);
            // console.log(this.fish[i]);
            this.pointS += this.fish[i].point;

            Vue.set(this.fish, i, {image: ''});
            // Vue.delete(this.fish, i);
            // this.fish.splice(i, 1, {});

        },
        randomRotate(i) {

            this.x = Math.floor(Math.random() * Math.floor(1024));
            this.y = Math.floor(Math.random() * Math.floor(570));

            this.y1 = this.y;
            this.x1 = this.x;

            if (this.x <= this.tempx[i] && this.y <= this.tempy[i]) {
                this.x1 = -this.x;
                this.scY = '-1, 1';
            } else if (this.x >= this.tempx[i] && this.y >= this.tempy[i]) {
                this.x1 = -this.x;
                this.y1 = -this.y;
                this.scY = '1';
            } else if (this.x >= this.tempx[i] && this.y <= this.tempy[i]) {
                this.x1 = this.x;
                this.y1 = this.y;
                this.scY = '1';
            } else if (this.x <= this.tempx[i] && this.y >= this.tempy[i]) {
                this.y1 = -this.y;
                this.scY = '-1, 1';
            }
            this.tempx[i] = this.x;
            this.tempy[i] = this.y;

            return {
                left: this.x + 'px',
                top: this.y + 'px',
                transition: '1s',
                transform: 'rotate(' + (Math.atan(this.y1 / this.x1) * 180) / Math.PI + 'deg) scale(' + this.scY + ')',
            }
        },
        timerStyle() {
            if (this.currentTime <= 10) {
                if (this.currentTime % 2 === 0) {
                    return {
                        color: 'red',
                        transition: '1s',
                        transform: 'scale(2)',
                    }
                } else {
                    return {
                        color: '#ff4800',
                        transition: '1s',
                        transform: 'scale(1)',
                    }
                }
            }
        }
    },
    watch: {
        currentTime(time) {
            if (time === 0) {
                Vue.set(this.user, this.counterUser, {name: this.nick, userPoints: this.pointS});
                this.counterUser++;
                this.stopTimer();
            }
        },
        user(users) {
            localStorage.user = JSON.stringify(users);
        }
    },
});


var sortByPrice = function (d1, d2) {
    return (d1.userPoints < d2.userPoints) ? 1 : -1;
};
