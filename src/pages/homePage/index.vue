<template>
  <div class="homePage">
    <div class="title">
      <Icon type="md-settings" class="setting" @click="showSetModel = true;"/>
      <span class="warningTxt" v-if="warningFlag">注意：存在接口可用份额不足的情况</span>
      <span v-if="showSetModel">展示窗设置</span>
    </div>
    <div class="content">
      <div class="item" v-for="(item, index) in dataList">
        <div class="head warningHead" v-if="item.warnFlag">
          <p>
            <img :src="picList[item.serverType - 1]" alt>
            {{nameList[item.serverType - 1]}}
          </p>
          <img src="../../assets/warning.png" alt class="warningPic">
          <span class="warningText">警告：合同份数还剩{{item.balance}}份，请及时续充</span>
        </div>
        <div class="head" v-else>
          <img :src="picList[item.serverType - 1]" alt>
          {{nameList[item.serverType - 1]}}
        </div>
        <div class="body">
          <div class="chart">
            <i-circle
              :percent="item.balance / (item.balance + item.useTotalCount) * 100"
              :size="163"
              stroke-linecap="square"
              :stroke-width="10"
              stroke-color="#FFB01E"
              :trail-width="10"
            >
              <div class="inside">
                <div class="text">剩余份数</div>
                <div class="count">{{item.balance}}</div>
              </div>
            </i-circle>
          </div>
          <div class="data">
            <div>近一周使用次数：{{item.weekendCount}}</div>
            <div>已使用总次数：{{item.useTotalCount}}</div>
            <div>到期时间：{{item.endAt | time}}</div>
          </div>
        </div>
        <div class="foot">
          <div class="detail" @click="jumpDetails">查看接口数据详情</div>
          <div class="warning" @click="warningSet(item.serverType)">预警设置</div>
        </div>
      </div>
    </div>
    <!-- 展示窗设置抽屉 -->
    <Drawer
      :closable="false"
      v-model="showSetModel"
      width="348"
      class-name="showSetModel"
      :mask="true"
      :mask-style="{opacity:0}"
    >
      <div class="title">展示窗设置</div>
      <Tabs value="name1" class="setTabs">
        <TabPane label="可用接口" name="name1">
          <div class="message">说明：被勾选的接口可在首页展示</div>
          <CheckboxGroup v-model="yes" @on-change="check" class="checkBox" size="large">
            <Checkbox v-for="(item, index) in yesList" :label="nameList[item.serverType - 1]" :key="index" class="item"></Checkbox>
          </CheckboxGroup>
        </TabPane>
        <TabPane :label="label" name="name2">
          <div class="message">说明：被勾选的接口可在首页展示</div>
          <CheckboxGroup v-model="no" @on-change="check" class="checkBox" size="large">
            <Checkbox v-for="(item, index) in noList" :label="nameList[item.serverType - 1]" :key="index" class="item"></Checkbox>
          </CheckboxGroup>
        </TabPane>
      </Tabs>
    </Drawer>
    <!-- 预警设置抽屉 -->
    <Drawer
      :closable="false"
      v-model="warningModel"
      width="348"
      class-name="warningModel"
      :mask="true"
      :mask-style="{opacity:0}">
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
        <Checkbox v-model="useAll" class="useAll" size="large">将该预警设置应用于所有接口</Checkbox>
        <FormItem>
          <Button type="primary" class="submit" @click="submit('formInline')">提交申请</Button>
        </FormItem>
      </Form>
    </Drawer>
  </div>
</template>
<script>
import { PHONE } from "../../common/regex.js";
import http from "../../components/http.js";
export default {
  data() {
    return {
      showSetModel: false, //展示窗设置model
      warningModel: false, //预警设置抽屉model
      useAll: false, //单选框，是否应用全部
      dataList: [], //页面数据展示
      phoneList: [], //设置的手机号，作为参数传给后端
      serverType: 1, //点击某个商品的serverType
      warningFlag: false, //警告头部显示
      yes: [],  //多选默认选中项，有余额
      no: [],   //多选默认选中项，余额为0
      yesList: [], // 有余额的产品集合
      noList: [], //没有余额的产品集合
      label: h => {
        return h("div", [
          h(
            "span",
            {
              style: {
                fontSize: "16px",
                position: "relative",
                top: "0px"
              }
            },
            "不可用接口"
          ),
          h(
            "span",
            {
              style: {
                fontSize: "12px",
                color: "#848C91",
                position: "relative",
                top: "15px",
                right: "70px"
              }
            },
            "余额已用完"
          )
        ]);
      },
      formInline: {
        number: "",
        phone1: "",
        phone2: "",
        phone3: ""
      },
      ruleInline: {
        number: [
          //   {
          //     required: true,
          //     message: "预警值不能为空",
          //     trigger: "blur"
          //   }
        ],
        phone1: [
          //   {
          //     required: true,
          //     message: "请输入预警手机号码",
          //     trigger: "blur"
          //   }
        ]
      },
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
        "公证处出证"
      ],
      picList: [
        require("../../assets/pic1.png"),
        require("../../assets/pic3.png"),
        require("../../assets/pic2.png"),
        require("../../assets/pic8.png"),
        require("../../assets/pic5.png"),
        require("../../assets/pic9.png"),
        require("../../assets/pic7.png"),
        require("../../assets/pic6.png"),
        require("../../assets/pic10.png"),
        require("../../assets/pic11.png"),
        require("../../assets/pic4.png"),
        // require('../../assets/pic12.png'),
        require("../../assets/pic13.png")
      ]
    };
  },
  created() {
    this.show();
  },
  computed: {},
  methods: {
    show() {
      http.post("admin/homePage/useCount").then(res => {
        if (res.data.code == 200) {
          console.log(res);
          let dataList = res.data.data
          this.dataList = dataList
        //   判断全局警告提醒
          for(let i=0;i<dataList.length;i++){
              if(dataList[i].warnFlag) {
                  this.warningFlag = true;
                  break
              } else {
                  this.warningFlag = false;
              }
          }
        //   给多选框赋初始值
          for(let i=0;i<dataList.length;i++) {
              if(dataList[i].balance){
                  this.yesList.push(dataList[i])
                  this.yes.push(this.nameList[dataList[i].serverType - 1])
              } else {
                  this.noList.push(dataList[i])
                  this.no.push(this.nameList[dataList[i].serverType - 1])
              }
          }
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    // 选择展示内容
    check(value) {
        console.log(this.yes)
      for(let i=0;i<this.yes.length;i++) {
          for(let j=0;j<this.dataList.length;j++) {
            //   console.log(this.nameList[this.dataList[i].serverType - 1])
            //   console.log(this.yes[i])
              if(this.nameList[this.dataList[i].serverType - 1] !== this.yes[i]) {
                  console.log(this.dataList[i])
                  break
              } else {
                  
              }
          }
      }
    },
    // 弹出预警窗
    warningSet(serverType) {
      this.serverType = serverType;
      this.warningModel = true;
      http
        .post("admin/homePage/queryWarn", {
          serverType: serverType
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            if (res.data.data) {
              this.formInline.number = res.data.data.count;
              let phoneList = res.data.data.phones;
              this.formInline.phone1 = phoneList[0];
              console.log(phoneList);
              if (phoneList[1]) {
                this.formInline.phone2 = phoneList[1];
              } else {
                this.formInline.phone2 = "";
              }
              if (phoneList[2]) {
                this.formInline.phone3 = phoneList[2];
              } else {
                this.formInline.phone3 = "";
              }
              if (res.data.data.isAll == 2) {
                this.useAll = true;
              } else {
                this.useAll = false;
              }
            } else {
              this.formInline.number = "";
              this.formInline.phone1 = "";
              this.formInline.phone2 = "";
              this.formInline.phone3 = "";
              this.useAll = false;
            }
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 提交预警设置
    submit(name) {
      console.log(this.formInline.number);
      const NUMBER = /^[0-9]*$/;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (
            NUMBER.test(this.formInline.number) &&
            this.formInline.number != 0
          ) {
            console.log("预警值正确");
            if (PHONE.test(this.formInline.phone1)) {
              if (this.formInline.phone2 || this.formInline.phone3) {
                if (this.formInline.phone2) {
                  if (this.formInline.phone3) {
                    if (
                      PHONE.test(this.formInline.phone2) &&
                      PHONE.test(this.formInline.phone3)
                    ) {
                      this.phoneList = [];
                      this.phoneList.push(
                        this.formInline.phone1,
                        this.formInline.phone2,
                        this.formInline.phone3
                      );
                      this.provingPhone();
                    } else {
                      this.$Message.error("手机号格式不正确");
                    }
                  } else if (PHONE.test(this.formInline.phone2)) {
                    this.phoneList = [];
                    this.phoneList.push(
                      this.formInline.phone1,
                      this.formInline.phone2
                    );
                    this.provingPhone();
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
                      this.phoneList.push(
                        this.formInline.phone1,
                        this.formInline.phone2,
                        this.formInline.phone3
                      );
                      this.provingPhone();
                    } else {
                      this.$Message.error("手机号格式不正确");
                    }
                  } else if (PHONE.test(this.formInline.phone3)) {
                    this.phoneList = [];
                    this.phoneList.push(
                      this.formInline.phone1,
                      this.formInline.phone3
                    );
                    this.provingPhone();
                  } else {
                    // console.log('第三个手机号XXXXX')
                    this.$Message.error("手机号格式不正确");
                  }
                }
              } else {
                this.phoneList = [];
                this.phoneList.push(this.formInline.phone1);
                // this.provingPhone(this.phoneList)
                this.provingPhone();
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
    // 提交预警设置
    provingPhone() {
      console.log(this.useAll);
      http
        .post("admin/homePage/warn", {
          serverType: this.serverType,
          count: this.formInline.number,
          phones: this.phoneList,
          isAll: this.useAll ? 2 : 1
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$Message.success(res.data.msg);
            this.show();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    //跳转接口详情页
    jumpDetails() {
      this.$router.push({ name: "dataDetails" });
    }
  }
};
</script>
<style lang="less" scoped>
.homePage {
  width: 100%;
  height: 100%;
  background-color: #edf0f5;
  min-width: 1650px;
  .title {
    width: 100%;
    height: 64px;
    background-color: #fff;
    position: relative;
    // min-width:1864px;
    span {
      float: right;
      font-size: 16px;
      color: #ffaf1f;
      line-height: 64px;
    }
    .setting {
      float: right;
      margin-right: 48px;
      font-size: 24px;
      line-height: 64px;
      cursor: pointer;
      margin-left: 19px;
    }
    .warningTxt{
        position: absolute;
        top:0;
        left:50%;
        margin-left: -128px;
        color:#F9233B;
    }
  }
  .content {
    width: 100%;
    // min-width: 1864px;
    padding: 24px;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    .item {
      width: 771px;
      height: 350px;
      background-color: #fff;
      border-radius: 4px;
      margin-right: 24px;
      margin-bottom: 24px;
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
      .warningHead {
        width: 100%;
        height: 56px;
        background-color: #fdf2f3;
        text-align: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          line-height: 1;
          color: #272b2e;
          font-size: 16px;
          position: absolute;
          left: 29px;
          top: 13px;
          display: flex;
          align-items: center;
        }
        .warningPic {
          width: 20px;
          height: 20px;
          margin-right: 13px;
        }
        .warningText {
          line-height: 56px;
          color: #f9233b;
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
  }
}
</style>
<style lang='less'>
.ivu-drawer-content {
  top: 125px;
}
.showSetModel {
  .title {
    color: #272b2e;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
  .setTabs {
    .ivu-tabs-nav {
      width: 100%;
      .ivu-tabs-tab {
        width: 50%;
        text-align: center;
        font-size: 16px;
        height: 66px;
        line-height: 50px;
      }
      .ivu-tabs-ink-bar {
        width: 50% !important;
      }
    }
    .message {
      color: #848c91;
      font-size: 14px;
      line-height: 1;
    }
    .checkBox {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        color: #272b2e;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
}
.warningModel {
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



