# node-stage

> -   基于 express 和 ws

## Getting Started

Install dependencies

```bash
$ yarn
```

develop mode

```bash
$ yarn dev
```

service mode

```bash
$ yarn dev_service
$ yarn prod_service
$ yarn uat_service
```

test

```bash
$ yarn test
```

prisma

```bash
$ npx prisma2 init
$ prisma2 introspect
$ prisma2 generate
```

## Class Stage

> 在回合制的游戏开发过程中，大部分的游戏都可以划分为多个阶段，每一局游戏从开始到结束都是由大大小小各个阶段组成的。

new Stage(stages) 新建一个游戏阶段管理器，会根据传入的阶段配置信息，自动按阶段顺序向后进行。

-   stages [Array] 游戏所有阶段配置信息 如：[{name: 'BEFORE_START', duration: 5}]
-   -   name [String] 阶段名称
-   -   duration [Number] 阶段时长，单位秒

#### Member

-   duration [Number] 当前阶段的时长，毫秒
-   startTime [Number] 当前阶段开始的时间戳
-   endTime [Number] 当前阶段结束的时间戳
-   curStage [String] 当前阶段的名称
-   preStage [String] 上一阶段的名称
-   nextStage [String] 下一阶段的名称

#### Methods

-   init() 初始化(进入第一个阶段)
-   switchStage(stage, seconds) 立即切换其他阶段
-   restartCurrentStage(seconds) 重新开始当前阶段
-   restart(seconds) 重新开始第一个阶段
-   goException(error) 触发异常
-   onException(callback) 捕捉异常
-   setNextStage(nextStage, seconds) 手动设置下一阶段
-   on(stage, callback) 阶段监听器，每个阶段中执行
-   everySecond(callback) 每个阶段中每秒执行
-   beforeAll(callback) 第一个阶段开始前执行
-   afterAll(callback) 最后一个阶段结束后执行
-   beforeEach(callback) 每个阶段前执行
-   afterEach(callback) 每个阶段结束后执行

## Useage

#### Stages

```

STAGES: [
{name: 'BEFORE_START', duration: 0}, //当前阶段 0 秒，表示快速通过用于执行一些非阻塞任务
{name: 'STARTED', duration: 5}, //当前阶段时长为 5 秒
{name: 'END', duration: 0},
{name: 'AFTER_END', duration: -1}, //-1 表示当前阶段无限时长，需要按逻辑手动切换到其他相应阶段
{name: 'OTHER', duration: 0},
]

```

#### Game

```

const Stage = require('./Stage')
const {STAGES} = require('../../../const')
const chalk = require('chalk')

class Game {
constructor() {
this.stage = new Stage(STAGES)
this.timer = null
this.round = 0

        this.stageHandler()
    }

    start() {
        this.stage.init()
    }

    stageHandler() {
        this.stage.everySecond((curStage) => {
            console.log(`${curStage} process...`);
        })

        this.stage.beforeAll((curStage)=>{
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

module.exports = Game

```

```

```
