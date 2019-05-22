<template>
  <div class="sendRecord">
    <div class="nav">
      <span>手机号：</span>
      <Input v-model="searchPhone" placeholder="手机号：" class="searchPhone" style="width: 286px"/>
      <Row class="dateScelct">
        <Col span="12">
          <DatePicker
            type="daterange"
            placement="bottom"
            :options="options3"
            :placeholder="dateText"
            @on-change="changeDate"
            @on-clear="clearDate"
            split-panels
          ></DatePicker>
        </Col>
      </Row>
      <span>发送状态：</span>
      <ul class="sendType">
        <li
          :class="[checkTypeIndex == index ? 'checkTypeColor' : '']"
          v-for="(item, index) in sendTypeList"
          @click="checkType(index)"
        >{{item}}</li>
      </ul>
      <div class="search" @click="search">开始查询</div>
    </div>
    <div class="tabBox">
      <Table
        ref="currentRowTable"
        :border="true"
        :columns="sendRecordColumns"
        :data="sendRecordData"
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
import { PHONE } from "../../common/regex.js";
export default {
  data() {
    return {
      sendTypeList: ["全部", "已发送", "未发送"],
      searchPhone: "", //搜索出入的phone
      sendRecordColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "批次号",
          key: "number"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "归属地",
          key: "address"
        },
        {
          title: "短信内容",
          key: "content",
          ellipsis: true,
          tooltip: true
        },
        {
          title: "发送状态",
          key: "isSuccess",
          render: function(h, params) {
            return h("span", params.row.isSuccess === 1 ? "未发送" : "发送成功");
          }
        },
        {
          title: "发送时间",
          key: "sendAt",
          render: function(h, params) {
            return h(
              "span",
              moment(params.row.sendAt).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        }
      ],
      sendRecordData: [],
      dataCount: 0, //总条数
      pageSize: 1, //每页条数
      currpage: 1, //当前页
      totalPages: 0, //总页数
      beginTime: "", //开始时间
      endTime: "", //结束时间
      dataCreated: "", //创建日期
      checkTypeIndex: 0, //切换状态索引
      isSuccess: null, //切换状态
      searchFlag: false,
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

      this.sendRecordData = [];
      http
        .post("admin/data/latelysendrecord", {
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId,
          pagesize: this.pageSize,
          currpage: this.currpage
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.sendRecordData = res.data.data.list;
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
    // 分页
    page_callRecord(page) {
      this.currpage = page;
      if(this.searchFlag) {
        this.searchDate();
      } else {
        this.show();
      }
    },
    // 跳首页
    page_first() {
      this.currpage = 1;
      if(this.searchFlag) {
        this.searchDate();
      } else {
        this.show();
      }
    },
    // 跳末页
    page_last() {
      this.currpage = this.totalPages;
      if(this.searchFlag) {
        this.searchDate();
      } else {
        this.show();
      }
    },
    // 选择时间
    changeDate(time) {
      this.beginTime = time[0];
      this.endTime = time[1];
    },
    //切换状态
    checkType(index) {
      this.checkTypeIndex = index;
      if (index == 0) {
        this.isSuccess = null;
      } else if (index == 1) {
        this.isSuccess = 0;
      } else {
        this.isSuccess = 1;
      }
    },
    // 清除时间
    clearDate() {
      let mydate = Date.parse(new Date());
      this.beginTime = moment(mydate - 86400000 * 2).format("YYYY-MM-DD");
      this.endTime = moment(mydate).format("YYYY-MM-DD");
      this.dateText = this.beginTime + " —— " + this.endTime;
      console.log(this.beginTime)
    },
    // 搜索
    search() {
      console.log(this.beginTime)
      this.searchFlag = true;
      this.currpage = 1;
      this.sendRecordData = [];
      if (this.searchPhone) {
        if (PHONE.test(this.searchPhone)) {
          this.searchDate();
        } else {
          this.$Message.error("手机号格式不正确");
        }
      } else {
        this.searchDate();
      }
    },
    //搜索调用
    searchDate() {
      if(this.beginTime) {
        
      } else {
        let mydate = Date.parse(new Date());
        this.beginTime = moment(mydate - 86400000 * 2).format("YYYY-MM-DD");
        this.endTime = moment(mydate).format("YYYY-MM-DD");
        this.dateText = this.beginTime + " —— " + this.endTime;
      }
      console.log(this.beginTime)
      http
      .post("admin/data/phoneordate", {
        appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId,
        pagesize: this.pageSize,
        currpage: this.currpage,
        phone: this.searchPhone,
        beginTime: this.beginTime,
        endTime: this.endTime,
        isSuccess: this.isSuccess
      })
      .then(res => {
        this.sendRecordData = res.data.data.list;
        this.dataCount = res.data.data.count;
        this.totalPages = Math.ceil(this.dataCount / this.pageSize);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.sendRecord {
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
      margin-left: 24px;
      margin-right: 40px;
      .ivu-date-picker {
        width: 304px;
        height: 36px;
        .ivu-input {
          font-size: 14px;
        }
      }
    }
    .sendType {
      width: 196px;
      height: 100%;
      border: 1px solid #d6dde3;
      border-radius: 4px;
      display: flex;
      justify-content: space-around;
      li {
        height: 100%;
        color: #515659;
        font-size: 16px;
        list-style: none;
        line-height: 36px;
        cursor: pointer;
      }
      .checkTypeColor {
        color: #ffaf20;
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
// .ivu-tooltip-arrow{
//   border-color: #fff;
// }
// .ivu-tooltip-inner{
//   background-color: red;
//   color:#515659;
//   font-size: 16px;
//   padding: 30px 40px;
// }
.sendRecord {
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

