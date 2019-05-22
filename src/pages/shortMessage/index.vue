<template>
  <div class="shortMessage">
    <div class="content">
      <Tabs :value="value">
        <TabPane label="总览" name="overview">
          <over-view @jump="jump"></over-view>
        </TabPane>
        <TabPane label="发送记录" name="sendRecord">
          <send-record></send-record>
        </TabPane>
        <TabPane label="数据统计" name="dataStatistics">
            <data-statistics></data-statistics>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import sendRecord from "./sendRecord.vue";
import overView from "./overview.vue";
import dataStatistics from "./dataStatistics.vue";
export default {
  components: {
    sendRecord,
    overView,
    dataStatistics
  },
  data() {
    return {
      value : 'overview',
    };
  },
  methods: {
    jump(value) {
      this.value = 'dataStatistics'
    }
  }
};
</script>
<style lang="less" scoped>
.shortMessage {
  padding: 24px;
  background-color: #edf0f5;
  width: 100%;
  height: 100%;
  padding-bottom: 0;
  min-width: 1684px;
  min-height: 1150px;
  .content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 24px;
  }
}
</style>
<style lang="less">
.warningModel_message {
  .ivu-drawer-content {
    top: 0;
  }
}
.shortMessage {
  .content {
    .ivu-tabs-bar {
      border-bottom: 1px solid rgba(255, 174, 54, 0.3);
      box-shadow: 0px 0px 20px #a39072;
    }
    .ivu-tabs-tab {
      width: 98px;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active {
      width: 98px;
      background: #ffae36;
      color: #ffffff;
      border-radius: 4px 4px 0px 0px;
    }
    .ivu-tabs-ink-bar {
      display: none;
    }
    .ivu-tabs-nav {
      .ivu-tabs-tab-active {
        color: white !important;
      }
    }
  }
  .ivu-date-picker-rel {
    height: 38px;
    .ivu-input-wrapper {
      height: 38px;
      .ivu-input {
        height: 38px;
        text-align: center;
        padding-right: 0;
      }
      .ivu-input-suffix {
        width: 51px;
        left: 0;
        right: auto;
        border-right: 1px solid #dadfe3;
        .ivu-icon {
          height: 38px;
          line-height: 38px;
        }
      }
    }
  }
  .searchPhone {
    height: 36px;
    .ivu-input {
      height: 36px;
    }
  }
}
</style>
