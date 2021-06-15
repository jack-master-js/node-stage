const Stage = require('../../../common/class/Stage')
const {STAGES} = require('../const')
const chalk = require('chalk')

class AGame {
    constructor() {
        this.stage = new Stage(STAGES)
        this.timer = null
        this.round = 0

        this.stageHandler()
    }

    start() {
        this.stage.init()
    }

    someError(){
        throw Error('some error')
    }
    
    stageHandler() {
        this.stage.everySecond((curStage) => {
            // this.someError()
            console.log(`${curStage} process...`);
        })

        this.stage.beforeAll((curStage)=>{
            try {
                this.someError()
            } catch (error) {
                console.log(error);
            }
            console.log(chalk.bold.black.bgCyan(`${curStage} before all`));
        })

        this.stage.afterAll((curStage)=>{
            console.log(chalk.bold.black.bgCyan(`${curStage} after all`));
        })

        this.stage.beforeEach((curStage)=>{
            console.log(`${this.round}-------------------------------------before`);
            console.log(`${curStage} before each`);
        })

        this.stage.afterEach((curStage)=>{
            console.log(`${curStage} after each`);
            console.log(`${this.round}-------------------------------------after`);

            clearInterval(this.timer)
        })

        this.stage.onException((err) => {
            console.log(chalk.bold.white.bgRed(`${err.message}`))
            this.round = 0
            this.stage.switchStage('BEFORE_START')
        })

        this.stage.on(STAGES[0].name,(curStage, preStage, nextStage) => {
            console.log(`${curStage} previous stage is ${preStage}, next stage is ${nextStage}`);
            console.log(chalk.bold.black.bgYellow(`${curStage} duration ${this.stage.duration}`));
            console.log(chalk.bold.white.bgBlue(`${curStage} startTime:${this.stage.startTime} endTime:${this.stage.endTime}`));
        })

        this.stage.on(STAGES[1].name,(curStage, preStage, nextStage) => {
            console.log(`${curStage} previous stage is ${preStage}, next stage is ${nextStage}`);
            console.log(chalk.bold.black.bgYellow(`${curStage} duration ${this.stage.duration}`));
            console.log(chalk.bold.white.bgBlue(`${curStage} startTime:${this.stage.startTime} endTime:${this.stage.endTime}`));
            
            // this.timer = setInterval(() => {
            //     console.log(`${curStage} custom process...`);
            // },1000)

            // setTimeout(() => {
            //     console.log(this.stage);
            //     this.stage.restartCurrentStage(7)
            // },4000)

            if(this.round === 1) this.stage.setNextStage('OTHER', 3)
            if(this.round === 2) this.stage.goException({code: 0, message: 'something wrong!!!'})
        })

        this.stage.on(STAGES[2].name,(curStage, preStage, nextStage) => {
            console.log(`${curStage} previous stage is ${preStage}, next stage is ${nextStage}`);
            console.log(chalk.bold.black.bgYellow(`${curStage} duration ${this.stage.duration}`));
            console.log(chalk.bold.white.bgBlue(`${curStage} startTime:${this.stage.startTime} endTime:${this.stage.endTime}`));
            
        })

        this.stage.on(STAGES[3].name,(curStage, preStage, nextStage) => {
            console.log(`${curStage} previous stage is ${preStage}, next stage is ${nextStage}`);
            console.log(chalk.bold.black.bgYellow(`${curStage} duration ${this.stage.duration}`));
            console.log(chalk.bold.white.bgBlue(`${curStage} startTime:${this.stage.startTime} endTime:${this.stage.endTime}`));

            setTimeout(() => {
                this.round++
                console.log(chalk.bold.black.bgCyan(`restart!!!`));
                this.stage.restart()
            },15000)
        })

        this.stage.on(STAGES[4].name,(curStage, preStage, nextStage) => {
            console.log(`${curStage} previous stage is ${preStage}, next stage is ${nextStage}`);
            console.log(chalk.bold.black.bgYellow(`${curStage} duration ${this.stage.duration}`));
            console.log(chalk.bold.white.bgBlue(`${curStage} startTime:${this.stage.startTime} endTime:${this.stage.endTime}`));
            
            this.stage.setNextStage('AFTER_END')
        })
    }
}

module.exports = AGame