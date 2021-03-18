var app = new Vue({
    el: '#app',
    data: {
        currentTime: 10,
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
    // mounted() {
    //     this.tempx = 0;
    //     this.tempy = 0;
    //     this.startTimer();
    // },
    destroyed() {
        this.stopTimer()
    },
    methods: {
        startGame() {
            this.tempx = 0;
            this.tempy = 0;
            this.startTimer();
        },
        startTimer() {
            this.timer = setInterval(() => {
                this.currentTime--;
            }, 1000);
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
                }


                ++this.count;
            }, 1000)
        },
        stopTimer() {
            console.log(this.fish);
            clearTimeout(this.timer);
            clearTimeout(this.timerFish);
            // this.user.push({userPoints: this.pointS});
            Vue.set(this.user, this.counterUser, {name: this.nick, userPoints: this.pointS});
            this.counterUser++;
            this.fish = [];
            this.pointS = 0;
            this.seenRestart = true;
        },
        restart() {
            this.currentTime = 10;
            this.fish = [];
            this.count = 0;
            this.seenRestart = false;
        },
        delFish(i) {
            // this.fish.splice(i, 1)
            console.log(i);
            console.log(this.fish);
            console.log(this.fish[i]);
            this.pointS += this.fish[i].point;
            // Vue.set(this.fish, i, {seens: false});
            Vue.delete(this.fish, i);

        },
        randomRotate(i) {

            this.x = Math.floor(Math.random() * Math.floor(1024));
            this.y = Math.floor(Math.random() * Math.floor(570));

            this.y1 = this.y;
            this.x1 = this.x;

            if (this.x <= this.tempx && this.y <= this.tempy) {
                this.x1 = -this.x;
                this.scY = '-1, 1';
            } else if (this.x >= this.tempx && this.y >= this.tempy) {
                this.x1 = -this.x;
                this.y1 = -this.y;
                this.scY = '1';
            } else if (this.x >= this.tempx && this.y <= this.tempy) {
                this.x1 = this.x;
                this.y1 = this.y;
                this.scY = '1';
            } else if (this.x <= this.tempx && this.y >= this.tempy) {
                this.y1 = -this.y;
                this.scY = '-1, 1';
            }
            this.tempx = this.x;
            this.tempy = this.y;

            return {
                left: this.x + 'px',
                top: this.y + 'px',
                transition: '5s',
                transform: 'rotate(' + (Math.atan(this.y1 / this.x1) * 180) / Math.PI + 'deg) scale(' + this.scY + ')',
            }
        }
    },
    watch: {
        currentTime(time) {
            if (time === 0) {
                this.stopTimer()
            }
        }
    },
});

