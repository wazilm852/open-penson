<template>
  <div class="items">
    <div class="item">
      <div class="head" v-if="warningFlag">短信发送</div>

      <div class="headWarning" v-else>
        <p>短信发送</p>
        <img src="../../assets/warning.png" alt="">
        <span class="warningText">警告：合同份数还剩{{surplus}}份，请及时续充</span>
      </div>

      <div class="body">
        <div class="chart">
          <i-circle
            :percent="percentage"
            :size="163"
            stroke-linecap="square"
            :stroke-width="10"
            stroke-color="#FFB01E"
            :trail-width="10"
          >
            <div class="inside">
              <div class="text">剩余份数</div>
              <div class="count">{{surplus}}</div>
            </div>
          </i-circle>
        </div>
        <div class="data">
          <div>到期时间：{{expireDate}}</div>
        </div>
      </div>
      <div class="foot">
        <div class="detail" @click="seeMycode">查看秘钥</div>
        <div class="warning" @click="warningModel_message = true">预警设置</div>
      </div>
    </div>
    <div class="item todayData">
      <div class="head">
        <span>今日数据</span>
        <span style="cursor: pointer;" @click="viewMore">查看更多</span>
      </div>
      <ul class="body">
        <li>
          <p>{{sendCount}}</p>
          <div>发送量</div>
        </li>
        <li>
          <p>{{successCount}}</p>
          <div>成功量</div>
        </li>
        <li>
          <p>{{errorCount}}</p>
          <div>失败量</div>
        </li>
      </ul>
    </div>
    <div class="echarts">
      <div class="title">发送详情</div>
      <div class="select">
        <span
          :class="[checkColor == index ? 'checkColor' : 'text']"
          v-for="(item, index) in textList"
          @click="checkDate(index)"
        >{{item}}</span>
        <Row class="dateScelct">
          <Col span="12">
            <DatePicker type="daterange" placement="bottom" :options="options3" placeholder="开始时间 —— 结束时间" @on-change="changeDate" split-panels></DatePicker>
          </Col>
        </Row>
      </div>
      <div id="myChart"></div>
    </div>
    <p class="message">*本页面根据实际发送条数显示到达率数据，不包含未发送的短信，因运营商数据返回延迟，数据仅供参考（横坐标表示日期、纵坐标代表短信发送总量）</p>

    <!-- 预警设置抽屉 -->
    <Drawer
      :closable="false"
      v-model="warningModel_message"
      width="348"
      class-name="warningModel_message"
      :mask="true"
      :mask-style="{opacity:0}"
    >
      <div class="totalTitle">接口名称：合同签署</div>
      <div class="warningSetting">预警设置</div>
      <div class="title">
        <span>预警值</span>
        <Poptip
          trigger="hover"
          placement="bottom-start"
          word-wrap
          content="说明：当该接口剩余份数小于预警值时，系统将会自动发出余额不足的警报"
          class="warningMessage"
        >
          <img src="../../assets/warningMessage.png" alt>
        </Poptip>
      </div>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline id="form">
        <FormItem prop="number">
          <Input type="text" v-model="formInline.number" placeholder="请输入大于0的纯数字"></Input>
        </FormItem>
        <div class="title">
          <span>预警手机号</span>
          <Poptip
            trigger="hover"
            placement="bottom-start"
            word-wrap
            content="说明：当该接口剩余份数小于预警值时，将该接口余额不足的消息发送至预警手机号（预警手机号至多预留三个"
            class="warningMessage warningMessage2"
          >
            <img src="../../assets/warningMessage.png" alt>
          </Poptip>
        </div>
        <FormItem prop="phone1">
          <Input type="text" v-model="formInline.phone1" placeholder="请输入预警手机号码"></Input>
        </FormItem>
        <FormItem style="margin:16px 0">
          <Input type="text" v-model="formInline.phone2" placeholder="请输入预警手机号码"></Input>
        </FormItem>
        <FormItem>
          <Input type="text" v-model="formInline.phone3" placeholder="请输入预警手机号码"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" class="submit" @click="submit('formInline')">提交申请</Button>
        </FormItem>
      </Form>
    </Drawer>
    <!-- 秘钥modal -->
    <Modal v-model="modal_myCode" width="750" id="modal_myCode">
      <p slot="header" style="color:#f60;text-align:center">查看密钥</p>
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
  </div>
</template>
<script>
import http from "../../components/http.js";
import moment from "moment";
import { PHONE } from "../../common/regex.js";
export default {
  data() {
    return {
      appID: "",
      appsecretp: "",
      percentage: 0, //百分比
      count: 0, //总份数
      surplus: 0, //剩余份数
      warningNumber: 0, //后端获取来的预警值
      warningFlag :true,  //是否触发预警样式
      dataCreated: '', //创建日期
      expireDate: "", //截止日期
      sendCount: 0, //发送量
      successCount: 0, //成功量
      errorCount: 0, // 失败量
      checkColor: 0,
      textList: ["近1周", "近15天", "近1个月"],
      modal_myCode: false, //查看秘钥modal
      warningModel_message: false, //预警设置抽屉model
      echartsDateArr: [],
      echartsNumArr: [],
      formInline: {
        number: null,
        phone1: "",
        phone2: "",
        phone3: ""
      },
      phoneList: [], //设置的手机号，作为参数传给后端
      ruleInline: {
        number: [
          {
            required: true,
            message: "预警值不能为空",
            trigger: "blur"
          }
        ],
        phone1: [
          {
            required: true,
            message: "请输入预警手机号码",
            trigger: "blur"
          }
        ]
      },
      options3: {
        disabledDate: date => {
          let initdate = this.dataCreated;
          // this成功指向vue实例
          return (date && date.valueOf() < initdate) || (date && date.valueOf() >= new Date())
        }
      },
    };
  },
  created() {
   this.show(); 
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    // 上半部展示
    show() {
      http
        .post("admin/data/homepagedata", {
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.surplus = res.data.data.balance;
            this.count = res.data.data.total;
            this.percentage = (this.surplus / this.count) * 100;
            this.expireDate = moment(res.data.data.endAt).format(
              "YYYY年MM月DD日 HH:mm:ss"
            );
            // this.options3.disabledDate('' , res.data.data.creatAt)
            this.dataCreated = res.data.data.creatAt;
            this.sendCount = res.data.data.totalsend;
            this.successCount = res.data.data.successsend;
            this.errorCount = res.data.data.failsend;
            this.warningNumber = res.data.data.warningCount;
            if(this.warningNumber) {
              if(this.warningNumber < this.surplus) {
                this.warningFlag = true;
              } else {
                this.warningFlag = false;
              }
            } else {
              this.warningFlag = true;
            }
          }
        });
        
    },
    // 查看秘钥
    seeMycode() {
      this.modal_myCode = true;
      http
        .post("admin/data/selectappid", {
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.appID = res.data.data.appId;
            this.appsecretp = res.data.data.appSecret;
          }
          console.log(res);
        });
    },
    // 确认秘钥
    ok_myCode() {
      this.modal_myCode = false;
    },
    // 切换时间
    checkDate(index) {
      this.checkColor = index;
      if(index == 0) {
        this.drawLine(7)
      } else if(index == 1) {
        this.drawLine(15)
      } else {
        this.drawLine(30)
      }
    },
    // 选择时间
    changeDate(time) {
      console.log(time)
      if(time[0]){
        this.echartsDateArr = [];
        this.echartsNumArr = [];
        http.post('admin/line/queryDate',{
          beginDate: time[0],
          endDate: time[1],
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId
        }).then(res=>{
          console.log(res)
          if (res.data.code == 10001) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.echartsDateArr.push(res.data.data[i].senddate);
              this.echartsNumArr.push(res.data.data[i].num);
              // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
              document.getElementById("myChart")
            );
            // 绘制图表
            myChart.setOption({
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: this.echartsDateArr,
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  name: "订单流入总数",
                  type: "line",
                  stack: "总量",
                  areaStyle: {
                    normal: {
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#A4D9FF" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#fff" // 100% 处的颜色
                          }
                        ],
                        globalCoord: false // 缺省为 false
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#A4D9FF", //改变折线点的颜色
                      backgroundColor: "#A4D9FF",
                      size: 20,
                      lineStyle: {
                        color: "#a4d9ff17" //改变折线颜色
                      }
                    }
                  },
                  data: this.echartsNumArr,
                }
              ]
            });
            }
          }
        })
      } else {
        console.log('null')
      }

    },
    // echarts
    drawLine(value) {
      this.echartsDateArr = [];
      this.echartsNumArr = [];
      http
        .post("admin/line/query", {
          day: value ? value : 7,
          appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId
        })
        .then(res => {
          if (res.data.code == 10001) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.echartsDateArr.push(res.data.data[i].senddate);
              this.echartsNumArr.push(res.data.data[i].num);
            }
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(
              document.getElementById("myChart")
            );
            // 绘制图表
            myChart.setOption({
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: this.echartsDateArr,
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  name: "订单流入总数",
                  type: "line",
                  stack: "总量",
                  areaStyle: {
                    normal: {
                      color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: "#A4D9FF" // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: "#fff" // 100% 处的颜色
                          }
                        ],
                        globalCoord: false // 缺省为 false
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: "#A4D9FF", //改变折线点的颜色
                      backgroundColor: "#A4D9FF",
                      size: 20,
                      lineStyle: {
                        color: "#a4d9ff17" //改变折线颜色
                      }
                    }
                  },
                  data: this.echartsNumArr,
                }
              ]
            });
          }
        });
    },
    // 提交预警设置
    submit(name) {
      const NUMBER = /^[0-9]*$/;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (NUMBER.test(this.formInline.number) && this.formInline.number != 0) {
            console.log('预警值正确')
            if (PHONE.test(this.formInline.phone1)) {
              if (this.formInline.phone2 || this.formInline.phone3) {
                if (this.formInline.phone2) {
                  if (this.formInline.phone3) {
                    if (
                      PHONE.test(this.formInline.phone2) &&
                      PHONE.test(this.formInline.phone3)
                    ) {
                      this.phoneList = [];
                      this.phoneList.push(this.formInline.phone1,this.formInline.phone2,this.formInline.phone3)
                      this.provingPhone()
                    } else {
                      this.$Message.error("手机号格式不正确");
                    }
                  } else if (PHONE.test(this.formInline.phone2)) {
                      this.phoneList = [];
                      this.phoneList.push(this.formInline.phone1,this.formInline.phone2)
                      this.provingPhone()
                  } else {
                    // console.log('第二个手机号XXXXX')
                    this.$Message.error("手机号格式不正确");
                  }
                } else if (this.formInline.phone3) {
                  if (this.formInline.phone2) {
                    if (
                      PHONE.test(this.formInline.phone3) &&
                      PHONE.test(this.formInline.phone2)
                    ) {
                      this.phoneList = [];
                      this.phoneList.push(this.formInline.phone1,this.formInline.phone2,this.formInline.phone3)
                      this.provingPhone()
                    } else {
                      this.$Message.error("手机号格式不正确");
                    }
                  } else if (PHONE.test(this.formInline.phone3)) {
                      this.phoneList = [];
                      this.phoneList.push(this.formInline.phone1,this.formInline.phone3)
                      this.provingPhone()
                  } else {
                    // console.log('第三个手机号XXXXX')
                    this.$Message.error("手机号格式不正确");
                  }
                }
              } else {
                this.phoneList = [];
                this.phoneList.push(this.formInline.phone1)
                // this.provingPhone(this.phoneList)
                this.provingPhone()
              }
            } else {
              this.$Message.error("手机号格式不正确");
            }
          } else {
            this.$Message.error("请输入大于0的纯数字");
          }
        } else {
          this.$Message.error("数据不能为空");
        }
      });
    },
    // 验证手机号
    provingPhone() {
      // console.log(list)
      console.log(this.phoneList)
      http.post('admin/data/setwarning',{
        appId: JSON.parse(sessionStorage.getItem("userInfo")).smsAppId,
        count: this.formInline.number,
        phones: this.phoneList
      }).then(res=>{
        if(res.data.code == 10001) {
          this.$Message.success(res.data.msg);
          this.show();
        }
      })
    },
    // 查看更多
    viewMore() {
      this.$emit('jump')
    },
  }
};
</script>
<style lang="less" scoped>
.items {
  width: 100%;
  height: 100%;
  min-width: 1905px;
  padding: 24px;
  padding-bottom: 0;
  // display: flex;
  .item {
    width: 771px;
    height: 350px;
    background-color: #fff;
    border-radius: 4px;
    margin-right: 24px;
    margin-bottom: 24px;
    box-shadow: 0px 0px 10px 0px rgba(94, 62, 2, 0.16);
    float: left;
    .head {
      width: 100%;
      height: 56px;
      background-color: #f7fafc;
      padding-left: 24px;
      line-height: 56px;
      color: #272b2e;
      font-size: 16px;
      text-align: left;
      display: flex;
      align-items: center;
      img {
        width: 36px;
        height: 33px;
        margin-right: 12px;
      }
    }
    .headWarning{
      width: 100%;
      height: 56px;
      background-color: #FDF2F3;
      text-align: center;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center; 
      p{
        // line-height: 56px;
        color: #272b2e;
        font-size: 16px;
        position: absolute;
        left:29px;
        top:16px;
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 13px;
      }
      .warningText{
        line-height: 56px;
        color: #F9233B;
        font-size: 14px;
      }
    }
    .body {
      width: 100%;
      height: 238px;
      border-top: 1px solid #d7dfe6;
      border-bottom: 1px solid #d7dfe6;
      .chart {
        width: 50%;
        height: 100%;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        .inside {
          text-align: center;
          .text {
            color: #34485b;
            font-size: 16px;
            margin-bottom: 16px;
          }
          .count {
            color: #ffaf1f;
            font-size: 28px;
          }
        }
      }
      .data {
        width: 50%;
        height: 100%;
        float: left;
        color: #5f666b;
        font-size: 16px;
        padding-top: 50px;
        div {
          text-align: left;
          margin-bottom: 34px;
        }
      }
    }
    .foot {
      width: 100%;
      height: 56px;
      color: #34485b;
      font-size: 16px;
      line-height: 56px;
      .detail {
        width: 50%;
        height: 100%;
        float: left;
        border-right: 1px solid #d7dfe6;
        cursor: pointer;
      }
      .warning {
        width: 50%;
        height: 100%;
        float: left;
        cursor: pointer;
      }
      .detail:hover {
        background-color: #f7fafc;
        transition: all 0.4s;
      }
      .warning:hover {
        background-color: #f7fafc;
        transition: all 0.4s;
      }
    }
  }
  .todayData {
    width: 721px;
    .head {
      display: flex;
      justify-content: space-between;
      padding-right: 24px;
    }
    .body {
      height: 294px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 60px;
      border-bottom: 0;
      li {
        list-style: none;
        p {
          font-size: 30px;
          color: #ffb01e;
          margin-bottom: 10px;
        }
        div {
          font-size: 16px;
          color: #272b2e;
        }
      }
    }
  }
  .echarts {
    width: 1516px;
    height: 567px;
    float: left;
    box-shadow: 0px 0px 10px 0px rgba(94, 62, 2, 0.16);
    margin-bottom: 40px;
    .title {
      width: 100%;
      height: 56px;
      background-color: #f7fafc;
      border-bottom: 1px solid #d7dfe6;
      font-size: 16px;
      padding-left: 24px;
      color: #272b2e;
      line-height: 56px;
      text-align: left;
    }
    .select {
      height: 38px;
      text-align: left;
      display: flex;
      position: relative;
      padding-left: 54px;
      margin-top: 25px;
      .text {
        font-size: 14px;
        color: #272b2e;
        margin-right: 24px;
        line-height: 38px;
        cursor: pointer;
      }
      .checkColor {
        font-size: 14px;
        margin-right: 24px;
        line-height: 38px;
        cursor: pointer;
        color: #ffb01e;
      }
      .dateScelct {
        width: 304px;
        height: 38px;
        .ivu-date-picker {
          width: 304px;
          height: 38px;
          .ivu-input {
            font-size: 14px;
          }
        }
      }
    }
    #myChart {
      width: 1516px;
      height: 448px;
    }
  }
  .message {
    float: left;
    width: 1516px;
    color: #515659;
    font-size: 16px;
    margin-bottom: 28px;
  }
}
</style>
<style lang="less">
#modal_myCode {
  .ivu-modal {
    top: 10%;
    height: 280px;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-header {
        p {
          font-size: 16px;
        }
      }
      .ivu-modal-body {
        padding-top: 30px;
        padding-bottom: 0;
        .appID {
          width: 630px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          margin: 0 auto;
          margin-bottom: 20px;
          font-size: 14px;
          p {
            float: left;
            width: 94px;
            height: 100%;
            text-align: right;
            margin-right: 10px;
          }
          div {
            float: left;
            width: 524px;
            height: 100%;
            border: 1px solid #dedede;
            border-radius: 4px;
            text-align: left;
            text-indent: 1em;
          }
        }
      }
      .ivu-modal-footer {
        text-align: center;
        border: 0;
        button {
          width: 130px;
          height: 30px;
          background-color: orange;
          color: white;
          outline-style: none;
          line-height: 30px;
          font-size: 14px;
          border: 0;
          margin-top: 10px;
          border-radius: 4px;
        }
      }
    }
  }
}
.warningModel_message {
  .totalTitle {
    color: #ffaf1f;
    font-size: 18px;
    line-height: 2;
  }
  .warningSetting {
    color: #272b2e;
    font-size: 16px;
    line-height: 3;
    text-align: center;
    border-bottom: 1px solid #dadfe3;
  }
  .title {
    color: #ffaf1f;
    font-size: 16px;
    line-height: 3;
    display: flex;
    align-items: center;
    span {
      margin-right: 10px;
    }
    .warningMessage {
      .ivu-poptip-rel {
        display: flex;
        align-items: center;
      }
      .ivu-poptip-popper {
        width: 317px;
        left: 18px !important;
        .ivu-poptip-arrow {
          left: 59px;
        }
      }
      .ivu-poptip-body-content-inner {
        font-size: 14px;
        color: #515659;
      }
    }
    .warningMessage2 {
      .ivu-poptip-popper {
        .ivu-poptip-arrow {
          left: 91px;
        }
      }
    }
  }
  #form {
    .ivu-form-item {
      padding-left: 19px;
      width: 280px;
      height: 36px;
      margin-bottom: 0;
      input {
        border: 0;
        background-color: #f7fafc;
      }
      .ivu-form-item-content {
        text-align: center;
        .submit {
          width: 120px;
          height: 40px;
          background-color: #ffb01e;
          text-align: center;
          border-radius: 0px 10px 0px 10px;
          margin: 0 auto;
          margin-top: 40px;
          cursor: pointer;
          span {
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
    .useAll {
      width: 100%;
      color: #848c91;
      font-size: 14px;
      margin-top: 18px;
      text-align: center;
      .ivu-checkbox {
        margin-right: 12px;
      }
    }
  }
}
</style>


