<template>
  <div id="avatar">
    <div :class="{ 'showBorder': myTurn,'header': true}"><img src="../../../static/img/avatar.jpg" alt="avatar"></div>
    <div class="name">{{username}}</div>
  </div>
</template>

<script>
  export default {
    name: 'avatar',
    props: {
      username: {
        type: String,
      },
      myTurn: {
        type: Boolean
      },
    },
  };
</script>

<style scoped lang="scss">
  #avatar {
    display: flex;
    flex-direction: column;
    align-items: center;

    // width: 10px;
    height: 170px;
    text-align: center;
    .showBorder{
      img {
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 4px solid #9a5eeb;
      }
    }
    .header {
      img {
        box-sizing: border-box;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .name {
      width: 100%;
      font-weight: bold;
      background-color: #e0eee8;
      border-radius: 8px;
      overflow: hidden;
      word-break: break-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
