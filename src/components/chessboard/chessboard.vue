<template>
  <div id="chessBoard">
    <div class="row" v-for="(rowData, rowIndex) in map" :key="rowIndex">
      <div class="col" v-for="(colData, colIndex) in rowData" :key="colIndex" @click="doChess(rowIndex, colIndex)">
        <span v-if="colData === 1" class="white"></span>
        <span v-else-if="colData === -1" class="black"></span>
        <span v-else></span>
      </div>
    </div>
    <div v-if="showStart" @click="startGame" class="startgame">开始游戏</div>
    <div v-if="showLoading" class="loading">
      <div>
        匹配中
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-loading1"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  import isWin from '../../utils/isWin';
  import { api } from '../../utils/requtes';
  import axios from 'axios'
  export default {
    name: 'chess-board',
    props: ['myTurn', 'againstId', 'myColor', 'coordinate', 'isLose', 'username', 'userId'],
    data () {
      return {
        showLoading: false,
        showStart: true,
        map: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
      };
    },
    methods: {
      doChess (row, col) {
        let that = this;
        console.log(this.myTurn);
        if (this.myTurn) {
          if (this.map[row][col] === 0) {

            this.$set(this.map[row], col, this.myColor);
            that.$root.Bus.$emit('chessNum');
            that.$root.Bus.$emit('timerStart');
            that.$root.Bus.$emit('againstTimerStart');
            // 判断是否胜利
            var ifWin = isWin(this.map, row, col);
            if (ifWin) {
              this.updateWinTime();

              axios.post(`${api}winUpdate`, {username: this.username})
              .then((msg) => {
                if(msg.status){
                  console.log("胜局记录添加成功")
                }
              })
              .catch((err) => {
                console.log(err);
              })

              setTimeout(() => {
                alert('你赢了');
                this.showStart = !this.showStart;
                this.$root.Bus.$emit('chessNum', 0);
                this.$root.Bus.$emit('againstChessNum', 0);
                that.$root.Bus.$emit('againstTimerStart');
                that.$root.Bus.$emit('resetHasRegret')
              }, 0);
            }
            var x = row;
            var y = col;
            this.$emit('chessClick', [x, y])
            var sendObj = {
              againstId: this.againstId,
              coordinate: [x, y],
              isWin: ifWin,
              myTurn: true,
            };
            that.$socket.emit('chess', sendObj);
          }
        }
      },
      updateWinTime(){

        // D-lyw write 将胜者名字传给后台
        axios.post(`${api}winUpdate`, {username: this.username})
          .then((msg) => {
             if(msg.status){
               console.log("胜局记录添加成功")
             }
          })
          .catch((err) => {
            console.log(err);
          })
      },
      startGame () {
        this.showStart = !this.showStart;
        this.showLoading = !this.showLoading
        this.map = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        this.$socket.emit('startGame', {userName: this.username, id: this.userId});
      }
    },
    watch: {
      coordinate: function () {
        let that = this;
        this.$set(this.map[this.coordinate[0]], this.coordinate[1], this.myColor * -1);
        this.$root.Bus.$emit('againstChessNum');
        this.$root.Bus.$emit('timerStart');
        this.$root.Bus.$emit('againstTimerStart');
        console.log(this.isLose);
        if (this.isLose) {
          setTimeout(() => {
            alert('你输了');
            that.$root.Bus.$emit('chessNum', 0);
            that.$root.Bus.$emit('againstChessNum', 0);
            that.$root.Bus.$emit('timerStart');
            that.$root.Bus.$emit('resetHasRegret')
            that.showStart = !this.showStart;
          }, 0);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  #chessBoard {
    box-sizing: border-box;
    margin: 0 10px;
    position: relative;
    // width: 100%;
    height: 100%;
    background-color: bisque;
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      .icon {
        font-size: 12px;
        @keyframes spin {
        0% {
          transform: rotate(0deg)
        }
        100% {
          transform: rotate(360deg)
        }
      }
        animation: spin 1.2s infinite linear;
      
      }
    }
    .startgame {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 22px;
      box-sizing: border-box;
      background-color: #d06e34;
      width: 120px;
      height: 40px;
      border-radius: 3px;
      color: white;
      text-align: center;
      font-weight: bold;
      border: 3px solid #d06e34;
      border-bottom-color: #bb5b22;
      text-shadow: .1em .1em 0 #a5501e;
      cursor: pointer;
    }
    .startgame:hover {
      background-color: #db763b;
      border-bottom-color: #c56025
    }
    .row {
      // width: 100%;
      height: 7.15%;
      display: flex;

      .col {
        width: 7.15%;
        height: 100%;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: bisque;
        span {
          display: inline-block;
          width: 90%;
          height: 90%;
          border-radius: 50%;
          // background-color: black;
        }
        span.white {
          background-color: white;
        }
        span.black {
          background-color: black;
        }
      }
    }
  }
</style>
