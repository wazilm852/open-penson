<template>
  <div id="myAccount">
    <!-- <div class="content_num">
      <div class="box">
        <div class="box_left">
          <div class="icon">
            <img src="../images/pact.png" alt>
          </div>
        </div>
        <div class="box_right">
          <p class="count">{{surplusPact}}(份)</p>
          <p class="text">剩余合同份数</p>
        </div>
      </div>
      <div class="box">
        <div class="box_left orange">
          <div class="icon">
            <img src="../images/certificate.png" alt>
          </div>
        </div>
        <div class="box_right">
          <p class="count">{{surplusCertificate}}(份)</p>
          <p class="text">剩余证书份数</p>
        </div>
      </div>
    </div> -->
    <div class="content_table">
      <Tabs value="myData">
        <TabPane label="我的数据" name="myData">
          <!-- 表格===================================== -->
          <Table border :columns="columns_myData" :data="data_myData"></Table>
          <!-- model================================= -->
          <Modal v-model="modal_myCode" width="750" id="modal_myCode">
            <p slot="header" style="color:#f60;text-align:center">
              查看密钥
            </p>
            <div style="text-align:center">
              <div class="appID">
                <p>appID :</p>
                <div>{{appID}}</div>
              </div>
              <div class="appID">
                <p>appsecretp :</p>
                <div>{{appsecretp}}</div>
              </div>
            </div>
            <div slot="footer">
             <button @click="ok_myCode">确定</button>
            </div>
          </Modal>
        </TabPane>
        <TabPane label="购买记录" name="shopingData" class="shopingData">
          <!-- 表格===================================== -->
          <Table border :columns="columns_shopingData" :data="data_shopingData"></Table>
          <!-- 分页_购买记录===================================== -->
          <div class="page_pay" id="pages">
            <span class="first_pay" @click="page_first_pay">首页</span>
            <Page
              :total="dataCount_pay"
              :page-size="pageSize_pay"
              @on-change="page_pay"
              show-elevator
              :current="currpage_pay"
              id="page_pay"
            />
            <span class="jump_pay">
              <span class="last_pay" @click="page_last_pay">末页</span>
              <span>当前：{{currpage_pay}}/{{totalPages_pay}}页</span>
            </span>
          </div>
          <!-- modal================================= -->
          <Modal v-model="modal_shopingData" id="modal_shopingData" width="1566">
            <!-- 表格===================================== -->
            <Table border :columns="columns_modal" :data="data_modal"></Table>
            <div slot="footer"></div>
            <!-- 分页===================================== -->
            <div class="page_myAccount">
              <span class="first" @click="page_first">首页</span>
              <Page
                :total="dataCount"
                :page-size="pageSize"
                @on-change="page_myAccount"
                show-elevator
                :current="currpage"
                id="page_myAccount"
              />
              <span class="jump">
                <span class="last" @click="page_last">末页</span>
                <span>当前：{{currpage}}/{{totalPages}}页</span>
              </span>
            </div>
          </Modal>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import http from "../../components/http.js";
import moment from "moment";
export default {
  data() {
    return {
      appID:'',
      appsecretp:'',
      modal_myCode: false,//密钥model
      dataCount_pay: 0, //总条数
      pageSize_pay: 14, //每页条数
      currpage_pay: 1, //当前页
      totalPages_pay: 0, //总页数
      surplusPact: 0, //剩余合同份数
      surplusCertificate: 0, //剩余证书份数
      dataCount: 0, //总条数
      pageSize: 12, //每页条数
      currpage: 1, //当前页
      totalPages: 0, //总页数
      tsearch: 0, //model 查看明细
      modal_shopingData: false, //查看明细modal
      // 我的数据===============================
      columns_myData: [
        {
          title: "序号",
          key: "serial"
        },
        {
          title: "接口名称",
          key: "name"
        },
        {
          title: "测试次数（次）",
          key: "number"
        },
        {
          title: "总数",
          key: "all_number"
        },
        {
          title: "剩余份数",
          key: "residue_number"
        },
        {
          title: "服务截止日期",
          key: "date"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "密钥",
          key: "action",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#379DE6",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.lookMyCode(params.index);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#379DE6",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.lookMyData(params.index);
                    }
                  }
                },
                "查看接口详情"
              )
            ]);
          }
        }
      ],
      data_myData: [],
      // 购买记录===============================
      columns_shopingData: [
        {
          title: "接口名称",
          key: "name"
        },
        {
          title: "购买数量",
          key: "number"
        },
        {
          title: "购买时间",
          key: "data"
        },
        {
          title: "购买金额",
          key: "money"
        },
        {
          title: "支付方式",
          key: "shopingMode"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#379DE6",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.lookShopingData(params.index);
                    }
                  }
                },
                "查看明细"
              )
            ]);
          }
        }
      ],
      data_shopingData: [],
      // modal表格==============================
      columns_modal: [
        {
          title: "接口名称",
          key: "name"
        },
        {
          title: "调用状态",
          key: "status"
        },
        {
          title: "是否收费",
          key: "falgToll"
        },
        {
          title: "调用时间",
          key: "data"
        },
        {
          title: "调用地址",
          key: "location"
        }
      ],
      data_modal: [],
      nameList: [
        "合同签署",
        "CA证书",
        "银行卡四要素验证",
        "人脸识别",
        "企业工商信息核验",
        "身份证OCR",
        "全网手机三要素验证",
        "公安部实名验证",
        "驾驶证OCR",
        "行驶证OCR",
        "营业执照OCR识别",
        "",
        "公证处存证",
        "公证处主体认证",
        "公证处出证",
      ]
    };
  },
  created() {
    this.surplus();
    this.show_myAccount();
  },
  methods: {
    // 剩余合同证书======================
    surplus() {
      http.post("admin/account/balanceCon", {}).then(res => {
        if (res.data.code === 200) {
          this.surplusPact = res.data.data.balanceCon;
          this.surplusCertificate = res.data.data.balanceCer;
        }
      });
    },
    // 我的数据展示===========================
    show_myAccount() {
      http.post("admin/account/service", {}).then(res => {
        if (res.data.code === 200) {
          console.log(res)
          let daList = res.data.data;
          for (var i = 0; i < daList.length; i++) {
            this.data_myData.push({
              serial: i + 1,
              name: this.nameList[daList[i].serviceType - 1],
              number: daList[i].testCount,
              all_number: daList[i].buyCount,
              residue_number: daList[i].balance,
              date: moment(daList[i].begintime).format("YYYY.MM.DD")+"至"+moment(daList[i].endtime).format("YYYY.MM.DD"),
              status: daList[i].status == 0 ? "正常使用" : "未开通",
            });
            console.log(this.nameList[daList[i].serviceType - 1])
          }
        }
      })
        // 购买记录展示===========================
        http.post("admin/order/list", {
            currentPage: this.currpage_pay,
            pageSize: this.pageSize_pay
          }).then(res => {
            console.log(res)
            // if (res.data.code === 200) {
            //   this.dataCount_pay = res.data.data.total;
            //   this.totalPages_pay = Math.ceil(
            //     res.data.data.total / this.pageSize_pay
            //   );
            //   var pages = document.getElementById("pages")
            //   if(this.dataCount_pay <= this.pageSize_pay){
            //     pages.style.display = "none";
            //   } else {
            //     pages.style.display = "block";
            //   }
            //   let daList = res.data.data.list;
            //   for (var i = 0; i < daList.length; i++) {
            //     this.data_shopingData.push({
            //       name: this.nameList[daList[i].serviceType - 1],
            //       number: daList[i].number,
            //       data: moment(daList[i].payTime).format("YYYY年MM月DD日"),
            //       money: daList[i].price,
            //       shopingMode:
            //         daList[i].payType == 0
            //           ? "线下支付"
            //           : daList[i].payType == 1
            //           ? "支付宝"
            //           : "微信",
            //       serviceType: daList[i].serviceType
            //     });
            //   }
            // }
          })
    },
    // 查看密钥===================================
    lookMyCode(index) {
      this.appID = "";
      this.appsecretp = "";
      this.modal_myCode = true;
      // console.log(this.data_myData[index])
      let num = this.data_myData[index].serial;
      http.post('admin/account/appid',{searchType:num}).then( res =>{
        console.log(res)
        if (res.data.code === 200) {
          this.appID = res.data.data.appId;
          this.appsecretp = res.data.data.appSecret;
        }
        if (res.data.code === 400 || res.data.code === 500) {
          this.appID = res.data.msg;
          this.appsecretp = res.data.msg;
        }
      })
      
    },
    ok_myCode () {
      this.modal_myCode = false;
    },
    // 查看接口详情===================================
    lookMyData(index) {
      if (this.data_myData[index].name == "合同签署") {
        this.$router.push({ name: "contractSigning" });
      }
      if (this.data_myData[index].name == "银行卡四要素验证") {
        this.$router.push({ name: "bankCardElements" });
      }
      if (this.data_myData[index].name == "CA证书") {
        this.$router.push({ name: "caCertificate" });
      }
      if (this.data_myData[index].name == "营业执照OCR识别") {
        this.$router.push({ name: "ocrDiscern" });
      }
      if (this.data_myData[index].name == "企业工商信息核验") {
        this.$router.push({ name: "industryVerification" });
      }
      if (this.data_myData[index].name == "公安部实名验证") {
        this.$router.push({ name: "policeVerification" });
      }
      if (this.data_myData[index].name == "全网手机三要素验证") {
        this.$router.push({ name: "phoneVerification" });
      }
      if (this.data_myData[index].name == "人脸识别") {
        this.$router.push({ name: "personalVerification" });
      }
      if (this.data_myData[index].name == "身份证OCR") {
        this.$router.push({ name: "idOcr" });
      }
      if (this.data_myData[index].name == "驾驶证OCR") {
        this.$router.push({ name: "drivingLicenceOCR" });
      }
      if (this.data_myData[index].name == "行驶证OCR") {
        this.$router.push({ name: "driveOCR" });
      }
    },
    // 查看明细===================================
    lookShopingData(index) {
      this.modal_shopingData = true;

      this.search = this.data_shopingData[index].serviceType;
      this.data_modal = [];
      http
        .post("admin/record/query", {
          searchType: this.search,
          currentPage: this.currpage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.totalPages = Math.ceil(res.data.data.total / this.pageSize);
          this.dataCount = res.data.data.total;
          var daList = res.data.data.list;
          for (let i = 0; i < daList.length; i++) {
            this.data_modal.push({
              name: this.nameList[daList[i].serviceType - 1],
              location: daList[i].ip,
              data: moment(daList[i].createAt).format("YYYY年MM月DD日"),
              status: daList[i].reqStatus == 0 ? "成功" : "失败",
              falgToll: daList[i].reqStatus == 0 ? "是" : "否"
            });
          }
        });
    },
    // 分页===================================
    page_myAccount(val) {
      this.data_modal = [];
      http
        .post("admin/record/query", {
          searchType: this.search,
          currentPage: val,
          pageSize: this.pageSize
        })
        .then(res => {
          this.totalPages = Math.ceil(res.data.data.total / this.pageSize);
          this.dataCount = res.data.data.total;
          this.currpage = val;
          var daList = res.data.data.list;
          for (let i = 0; i < daList.length; i++) {
            this.data_modal.push({
              name: this.nameList[daList[i].serviceType - 1],
              location: daList[i].ip,
              data: moment(daList[i].createAt).format("YYYY年MM月DD日"),
              status: daList[i].reqStatus == 0 ? "成功" : "失败",
              falgToll: daList[i].reqStatus == 0 ? "是" : "否"
            });
          }
        });
    },
    // 分页跳首页===================================
    page_first() {
      this.data_modal = [];
      this.currpage = 1;
      http
        .post("admin/record/query", {
          searchType: this.search,
          currentPage: this.currpage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.totalPages = Math.ceil(res.data.data.total / this.pageSize);
          this.dataCount = res.data.data.total;
          this.currpage = 1;
          var daList = res.data.data.list;
          for (let i = 0; i < daList.length; i++) {
            this.data_modal.push({
              name: this.nameList[daList[i].serviceType - 1],
              location: daList[i].ip,
              data: moment(daList[i].createAt).format("YYYY年MM月DD日"),
              status: daList[i].reqStatus == 0 ? "成功" : "失败",
              falgToll: daList[i].reqStatus == 0 ? "是" : "否"
            });
          }
        });
    },
    // 分页跳末页===================================
    page_last() {
      this.data_modal = [];
      http
        .post("admin/record/query", {
          searchType: this.search,
          currentPage: this.totalPages,
          pageSize: this.pageSize
        })
        .then(res => {
          this.totalPages = Math.ceil(res.data.data.total / this.pageSize);
          this.dataCount = res.data.data.total;
          this.currpage = this.totalPages;
          var daList = res.data.data.list;
          for (let i = 0; i < daList.length; i++) {
            this.data_modal.push({
              name: this.nameList[daList[i].serviceType - 1],
              location: daList[i].ip,
              data: moment(daList[i].createAt).format("YYYY年MM月DD日"),
              status: daList[i].reqStatus == 0 ? "成功" : "失败",
              falgToll: daList[i].reqStatus == 0 ? "是" : "否"
            });
          }
        });
    },

    // 分页_购买记录===================================
    page_pay(val) {
      this.data_shopingData = [];
      http
        .post("admin/account/order", {
          currentPage: val,
          pageSize: this.pageSize_pay,
          searchType: 0
        })
        .then(res => {
          if (res.data.code === 200) {
            this.dataCount_pay = res.data.data.total;
            this.totalPages_pay = Math.ceil(
              res.data.data.total / this.pageSize_pay
            );
            this.currpage_pay = val;
            let daList = res.data.data.list;
            for (var i = 0; i < daList.length; i++) {
              this.data_shopingData.push({
                name: this.nameList[daList[i].serviceType - 1],
                number: daList[i].number,
                data: moment(daList[i].payTime).format("YYYY年MM月DD日"),
                money: daList[i].price,
                shopingMode:
                  daList[i].payType == 0
                    ? "线下支付"
                    : daList[i].payType == 1
                    ? "支付宝"
                    : "微信",
                serviceType: daList[i].serviceType
              });
            }
          }
        });
    },
    // 分页跳首页===================================
    page_first_pay() {
      this.data_shopingData = [];
      this.currpage_pay = 1;
      http
        .post("admin/account/order", {
          currentPage: this.currpage_pay,
          pageSize: this.pageSize_pay,
          searchType: 0
        })
        .then(res => {
          if (res.data.code === 200) {
            this.dataCount_pay = res.data.data.total;
            this.totalPages_pay = Math.ceil(
              res.data.data.total / this.pageSize_pay
            );
            let daList = res.data.data.list;
            for (var i = 0; i < daList.length; i++) {
              this.data_shopingData.push({
                name: this.nameList[daList[i].serviceType - 1],
                number: daList[i].number,
                data: moment(daList[i].payTime).format("YYYY年MM月DD日"),
                money: daList[i].price,
                shopingMode:
                  daList[i].payType == 0
                    ? "线下支付"
                    : daList[i].payType == 1
                    ? "支付宝"
                    : "微信",
                serviceType: daList[i].serviceType
              });
            }
          }
        });
    },
    // 分页跳末页===================================
    page_last_pay() {
      this.data_shopingData = [];
      http
        .post("admin/account/order", {
          currentPage: this.totalPages_pay,
          pageSize: this.pageSize_pay,
          searchType: 0
        })
        .then(res => {
          if (res.data.code === 200) {
            this.dataCount_pay = res.data.data.total;
            this.totalPages_pay = Math.ceil(
              res.data.data.total / this.pageSize_pay
            );
            this.currpage_pay = this.totalPages_pay;
            let daList = res.data.data.list;
            for (var i = 0; i < daList.length; i++) {
              this.data_shopingData.push({
                name: this.nameList[daList[i].serviceType - 1],
                number: daList[i].number,
                data: moment(daList[i].payTime).format("YYYY年MM月DD日"),
                money: daList[i].price,
                shopingMode:
                  daList[i].payType == 0
                    ? "线下支付"
                    : daList[i].payType == 1
                    ? "支付宝"
                    : "微信",
                serviceType: daList[i].serviceType
              });
            }
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#myAccount {
  width: 100%;
  height: 100%;
  padding: 24px;
  padding-bottom: 0;
}
.content_num {
  background-color: #fff;
  height: 120px;
  padding-top: 28px;
  padding-left: 24px;
  .box {
    width: 176px;
    height: 64px;
    margin-right: 52px;
    float: left;
    .box_left {
      width: 56px;
      height: 100%;
      background-color: #379de6;
      float: left;
      padding: 14px 12px;
      border-radius: 4px 0px 0px 4px;
      .icon {
        background-color: #fcffff;
        border-radius: 4px 10px 0px 10px;
        width: 32px;
        height: 36px;
        padding-top: 8px;
      }
    }
    .orange {
      background-color: #edc534;
    }
    .box_right {
      width: 120px;
      height: 100%;
      float: left;
      background-color: #edf0f5;
      border-radius: 0 4px 4px 0;
      padding-top: 7px;
      .count {
        text-align: left;
        font-size: 16px;
        color: #666666;
        text-indent: 12px;
        line-height: 30px;
      }
      .text {
        text-align: left;
        font-size: 12px;
        color: #999999;
        text-indent: 12px;
      }
    }
  }
}
.content_table {
  // margin-top: 16px;
  background-color: #fff;
  height: 100%;
  padding: 24px;
}
</style>
<style lang="less">
#myAccount{


.shopingData {
  height: 100%;
  .ivu-table-wrapper {
    height: 713px;
  }
  .page_pay {
    width: 100%;
    height: 32px;
    // position: absolute;
    // top: 870px;
    // bottom: 0px;
    margin-top: 50px;
    text-align: center;
    .first_pay {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
      vertical-align: middle;
    }
    #page_pay {
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
    .jump_pay {
      font-size: 14px;
      font-weight: normal;
      color: rgba(153, 153, 153, 1);
      vertical-align: middle;
      .last_pay {
        cursor: pointer;
      }
    }
  }
}


  .ivu-table-row-hover td {
    background-color: #f9f9f9!important;
  }
  .ivu-tabs-bar {
    border-bottom: 1px solid rgba(255, 174, 54, 0.3);
    box-shadow: 0px 0px 20px #a39072;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
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
#modal_shopingData {
  .ivu-modal {
    width: 1566px;
    height: 856px;
    // padding: 40px 72px;
    .ivu-modal-content {
      width: 1566px;
      height: 856px;
      padding: 40px 72px;
      .ivu-modal-body {
        position: relative;
        .page_myAccount {
          width: 100%;
          height: 32px;
          position: absolute;
          top: 730px;
          left: 0;
          text-align: center;
          .first {
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            cursor: pointer;
            vertical-align: middle;
          }
          #page_myAccount {
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
      .ivu-modal-footer {
        border: 0;
      }
    }
  }
}

#modal_myCode{
  .ivu-modal{
    height: 280px;
    .ivu-modal-content{
      height: 100%;
      .ivu-modal-header{
        p{
          font-size:16px;
        }
      }
      .ivu-modal-body{
        padding-top: 30px;
        padding-bottom: 0;
        .appID{
          width: 630px;
          height: 40px;
          text-align:center;
          line-height: 40px;
          margin: 0 auto;
          margin-bottom: 20px;
          font-size:14px;
          p{
            float: left;
            width: 94px;
            height: 100%;
            text-align:right;
            margin-right: 10px;
          }
          div{
            float: left;
            width: 524px;
            height: 100%;
            border:1px solid #dedede;
            border-radius:4px;
            text-align:left;
            text-indent:1em;
          }
        }
      }
      .ivu-modal-footer{
        text-align:center;
        border:0;
        button{
          width: 130px;
          height: 30px;
          background-color: orange;
          color:white;
          outline-style:none;
          line-height: 30px;
          font-size:14px;
          border:0;
          margin-top: 10px;
          border-radius:4px;
        }
      }
    }
  }
}
</style>


