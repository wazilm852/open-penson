<template>
  <div class="dataStatistics">
    <div class="nav">
      <Row class="dateScelct">
        <Col span="12">
          <DatePicker
            type="daterange"
            placement="bottom-start"
            :options="options3"
            :placeholder="dateText"
            @on-change="changeDate"
            @on-clear="clearDate"
            split-panels
          ></DatePicker>
        </Col>
      </Row>
    </div>
    <div class="tabBox">
      <Table
        ref="currentRowTable"
        :border="true"
        :columns="dataStatisticsColumns"
        :data="dataStatisticsData"
        class="tables"
      ></Table>
    </div>
    <!-- 分页 -->
    <div class="page_callRecord" id="pages">
      <span class="first" @click="page_first">首页</span>
      <Page
        :total="dataCount"
        :page-size="pageSize"
        @on-change="page_callRecord"
        show-elevator
        :current="currpage"
        id="page_callRecord"
      />
      <span class="jump">
        <span class="last" @click="page_last">末页</span>
        <span>当前：{{currpage}}/{{totalPages}}页</span>
      </span>
    </div>
  </div>
</template>
<script>
import http from "../../components/http.js";
import moment from "moment";
export default {
  data() {
    return {
      dataStatisticsColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "发送日期",
          key: "sendAt",
          render: function(h, params) {
            return h(
              "span",
              moment(params.row.sendAt).format("YYYY-MM-DD")
            );
          }
        },
        {
          title: "发送总量",
          key: "num"
        },
        {
          title: "发送成功量",
          key: "successcount"
        },
        {
          title: "发送失败量",
          key: "failcount"
        },
      ],
      dataStatisticsData: [],
      dataCount: 0, //总条数
      pageSize: 1, //每页条数
      currpage: 1, //当前页
      totalPages: 0, //总页数
      dataCreated: "", //创建日期
      beginTime: "", //开始时间
      endTime: "", //结束时间
      searchFlag: false, //是否搜索
      options3: {
        disabledDate: date => {
          let initdate = this.dataCreated;
          // this成功指向vue实例
          return (
            (date && date.valueOf() < initdate) ||
            (date && date.valueOf() >= new Date())
          );
        }
      }
    };
  },
  created() {
    this.show();
  },
  methods: {
    // 展示
    show() {
      let mydate = Date.parse(new Date());
      this.beginTime = moment(mydate - 86400000 * 2).format("YYYY-MM-DD");
      this.endTime = moment(mydate).format("YYYY-MM-DD");
      this.dateText = this.beginTime + " —— " + this.endTime;

      this.dataStatisticsData = [];
      http
        .post("admin/data/datacount", {
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId,
          pagesize: this.pageSize,
          currpage: this.currpage,
          beginTime: this.beginTime,
          endTime: this.endTime,
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.dataStatisticsData = res.data.data.list;
            this.dataCount = res.data.data.count;
            this.totalPages = Math.ceil(this.dataCount / this.pageSize);
          }
        });

        http
        .post("admin/data/homepagedata", {
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.dataCreated = res.data.data.creatAt;
          }
        });
    },
    // 选择时间
    changeDate(time) {
      console.log(time)
      if(time[0]) {
        this.beginTime = time[0];
        this.endTime = time[1];
      } else {
        let mydate = Date.parse(new Date());
        this.beginTime = moment(mydate - 86400000 * 2).format("YYYY-MM-DD");
        this.endTime = moment(mydate).format("YYYY-MM-DD");
        this.dateText = this.beginTime + " —— " + this.endTime;
      }
      this.searchFlag = true;
      this.dataStatisticsData = [];
      this.currpage = 1 ;
      http
        .post("admin/data/datacount", {
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId,
          pagesize: this.pageSize,
          currpage: this.currpage,
          beginTime: this.beginTime,
          endTime: this.endTime,
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.dataStatisticsData = res.data.data.list;
            this.dataCount = res.data.data.count;
            this.totalPages = Math.ceil(this.dataCount / this.pageSize);
          }
        });
    },
    // 清除时间
    clearDate() {

    },
    // 分页
    page_callRecord(page) {
      this.currpage = page;
      if(this.searchFlag) {
        // this.changeDate();
        http
        .post("admin/data/datacount", {
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId,
          pagesize: this.pageSize,
          currpage: this.currpage,
          beginTime: this.beginTime,
          endTime: this.endTime,
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.dataStatisticsData = res.data.data.list;
            this.dataCount = res.data.data.count;
            this.totalPages = Math.ceil(this.dataCount / this.pageSize);
          }
        });
      } else {
        this.show();
      }
    },
    // 跳首页
    page_first() {
      this.currpage = 1;
      if(this.searchFlag) {
        this.changeDate();
      } else {
        this.show();
      }
    },
    // 跳末页
    page_last() {
      this.currpage = this.totalPages;
      if(this.searchFlag) {
        this.changeDate();
      } else {
        this.show();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.dataStatistics {
  width: 100%;
  height: 100%;
  //   min-width: 1905px;
  margin-top: 26px;
  margin-bottom: 26px;
  .nav {
    width: 100%;
    height: 36px;
    display: flex;
    position: relative;
    margin-bottom: 26px;
    span {
      color: #515659;
      font-size: 16px;
      line-height: 36px;
    }
    .dateScelct {
      width: 304px;
      height: 36px;
      .ivu-date-picker {
        width: 304px;
        height: 36px;
        .ivu-input {
          font-size: 14px;
        }
      }
    }
    .search {
      width: 98px;
      height: 36px;
      background-color: #ffb01e;
      border-radius: 0px 10px 0px 10px;
      color: #ffffff;
      font-size: 14px;
      line-height: 36px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  .tabBox {
    // height:800px;
    min-height: 600px;
  }
  //  ivu-tooltip-inner-with-width
}

</style>
<style lang="less">
.dataStatistics {
  .page_callRecord {
    width: 100%;
    height: 32px;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
    // position: relative;
    .first {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
      vertical-align: middle;
    }
    #page_callRecord {
      text-align: left;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      .ivu-page-prev {
        border: 0;
      }
      .ivu-page-item {
        border: 0;
      }
      .ivu-page-next {
        border: 0;
      }
      .ivu-page-item-active {
        background-color: #fff;
      }
      .ivu-page-item a {
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
      .ivu-page-item-active a,
      .ivu-page-item-active:hover a {
        color: #fd9827;
      }
      .ivu-page-options-elevator {
        margin-top: 0px;
      }
      .ivu-page-options {
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
    }
    .jump {
      font-size: 14px;
      font-weight: normal;
      color: rgba(153, 153, 153, 1);
      vertical-align: middle;
      .last {
        cursor: pointer;
      }
    }
  }
}
</style>


