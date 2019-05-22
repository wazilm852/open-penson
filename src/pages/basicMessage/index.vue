<template>
  <div id="bassicMessage">
    <div class="message">
      <div class="title">基础信息</div>
      <div class="shade"></div>
      <div class="content">
        <div class="pic">
          <img src="../images/header.png" alt>
        </div>
        <ul class="list_message">
          <li>
            <span>用户{{message.phone}}</span>
          </li>
          <li>
            <span>电话：{{message.phone}}</span>
            <span class="click" @click="modelPhone1 = true">更改手机号</span>
          </li>
          <li>
            <span>邮箱：{{message.email}}</span>
            <span class="click" @click="modelEmail1 = true">更改邮箱</span>
          </li>
          <li>
            <span>密码：******</span>
            <span class="click" @click="modelPassword = true">更改密码</span>
          </li>
        </ul>
      </div>
      <!-- 修改邮箱第一步 -->
      <Modal v-model="modelEmail1" class="modelEmail1" style="width:568px">
        <p slot="header">验证邮箱</p>
        <div class="content">
          <div>请输入{{message.email}}收到的验证码：</div>
          <ul>
            <li>
              <input type="text" class="textIpt" v-model="codeValue1">
            </li>
            <li class="getCode">
              <div class="line"></div>
              <input
                type="button"
                class="get-code emailSendCode1"
                value="获取验证码"
                @click="emailSendCode1"
              >
            </li>
          </ul>
        </div>
        <div slot="footer">
          <div class="cancel" @click="modelEmail1 = false">取消</div>
          <div class="ok" @click="emailNext">确定</div>
        </div>
      </Modal>
      <!-- 修改邮箱第二步 -->
      <Modal v-model="modelEmail2" class="modelEmail2" style="width:568px">
        <p slot="header">绑定邮箱</p>
        <div class="content">
          <div class="item">
            <p>新邮箱号：</p>
            <input type="text" placeholder="请输入新邮箱号" v-model="newEmail">
          </div>
          <div class="item">
            <p>验证码：</p>
            <ul>
              <li>
                <input type="text" placeholder="请输入邮箱验证码" v-model="codeValue2">
              </li>
              <li class="getCode">
                <div class="line"></div>
                <input
                  type="button"
                  class="get-code emailSendCode2"
                  value="获取验证码"
                  @click="emailSendCode2"
                >
              </li>
            </ul>
          </div>
        </div>
        <div slot="footer">
          <div class="cancel" @click="modelEmail2 = false">取消</div>
          <div class="ok" @click="emailOk">确定</div>
        </div>
      </Modal>
      <!-- 修改手机第一步 -->
      <Modal v-model="modelPhone1" class="modelPhone1" style="width:568px">
        <p slot="header">验证手机号</p>
        <div class="content">
          <div>请输入{{message.phone}}收到的验证码：</div>
          <ul>
            <li>
              <input type="text" class="textIpt" v-model="codeValuePhone1">
            </li>
            <li class="getCode">
              <div class="line"></div>
              <input
                type="button"
                class="get-code phoneSendCode1"
                value="获取验证码"
                @click="phoneSendCode1"
              >
            </li>
          </ul>
        </div>
        <div slot="footer">
          <div class="cancel" @click="modelPhone1 = false">取消</div>
          <div class="ok" @click="phoneNext">确定</div>
        </div>
      </Modal>
      <!-- 修改手机第二步 -->
      <Modal v-model="modelPhone2" class="modelPhone2" style="width:568px">
        <p slot="header">绑定手机号</p>
        <div class="content">
          <div class="item">
            <p>新手机号：</p>
            <input type="text" placeholder="请输入新手机号" v-model="newPhone">
          </div>
          <div class="item">
            <p>验证码：</p>
            <ul>
              <li>
                <input type="text" placeholder="请输入验证码" v-model="codeValuePhone2">
              </li>
              <li class="getCode">
                <div class="line"></div>
                <input
                  type="button"
                  class="get-code phoneSendCode2"
                  value="获取验证码"
                  @click="phoneSendCode2"
                >
              </li>
            </ul>
          </div>
        </div>
        <div slot="footer">
          <div class="cancel" @click="modelPhone2 = false">取消</div>
          <div class="ok" @click="phoneOk">确定</div>
        </div>
      </Modal>
      <!-- 修改密码 -->
      <Modal v-model="modelPassword" class="modelPassword" style="width:568px">
        <p slot="header">更改密码</p>
        <div class="content">
          <div class="item">
            <p>旧密码：</p>
            <input type="text" placeholder="请输入旧密码" v-model="oldPassword">
          </div>
          <div class="item">
            <p>新密码：</p>
            <input type="text" placeholder="请输入新密码" v-model="newPassword">
          </div>
        </div>
        <div slot="footer">
          <div class="cancel" @click="modelPassword = false">取消</div>
          <div class="ok" @click="passwordOk">确定</div>
        </div>
      </Modal>
    </div>
    <div class="message">
      <div class="title">企业信息</div>
      <div class="shade"></div>
      <div class="content">
        <div class="pic">
          <img src="../images/company_header.png" alt>
        </div>
        <ul class="list_message">
          <li>
            <span>{{message.name}}</span>
          </li>
          <li>
            <span>联系人：{{message.manager}}</span>
            <span class="click" @click="modelPeople = true">更改联系人</span>
          </li>
          <li>
            <span>电话：{{message.phone}}</span>
          </li>
        </ul>
      </div>
      <!-- 更改联系人 -->
      <Modal v-model="modelPeople" class="modelPeople" style="width:568px">
        <p slot="header">更改联系人</p>
        <div class="content">
          <div>
            联系人姓名：
            <input type="text" v-model="name">
          </div>
        </div>
        <div slot="footer">
          <div class="cancel" @click="modelPeople = false">取消</div>
          <div class="ok" @click="peopleOk">确定</div>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import http from "../../components/http.js";
export default {
  data() {
    return {
      message: {
        phone: 0,
        email: "",
        manager: "",
        name: ""
      },
      modelEmail1: false, //更改邮箱第一步
      modelEmail2: false, //更改邮箱第二步
      modelPhone1: false, //更改邮箱第一步
      modelPhone2: false, //更改邮箱第二步
      modelPassword: false, //更改密码
      modelPeople: false, //更改联系人
      codeValue1: "", //更改邮箱第一步客户输入的验证码
      newEmail: "", //更改邮箱第二步新邮箱
      codeValue2: "", //更改邮箱第二部用户输入的验证码
      codeValuePhone1: "", //更改手机第一步客户输入的验证码
      newPhone: "", //更改手机第二步新手机
      codeValuePhone2: "", //更改手机第二部用户输入的验证码
      oldPassword: "", //修改密码用户输入久密码
      newPassword: "", //修改密码用户输入新密码
      name: "" //更改联系人用户输入人名
    };
  },
  created() {
    this.show();
  },
  methods: {
    // 展示数据================
    show() {
      http.post("admin/user/info", {}).then(res => {
        if (res.data.code == 200) {
          this.message.phone = res.data.data.phone;
          this.message.email = res.data.data.email;
          this.message.manager = res.data.data.manager;
          this.message.name = res.data.data.name;
        }
      });
    },
    // 验证邮箱发送验证码1
    emailSendCode1() {
      let btn = document.getElementsByClassName("emailSendCode1")[0];
      let t;
      let time_num = 60;
      t = setInterval(function() {
        if (time_num <= 0) {
          btn.removeAttribute("disabled");
          btn.value = "获取验证码";
          time_num = 60;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#FFAE36";
          clearInterval(t);
        } else {
          btn.setAttribute("disabled", true);
          btn.value = time_num + "秒";
          time_num--;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#999999";
        }
      }, 1000);
      http.post("admin/code/send", { email: this.message.email }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$Message.success("发送成功!");
        }
        if (res.data.code == 102) {
          this.$Message.success(res.data.msg);
        }
      });
    },
    // 邮箱验证下一步
    emailNext() {
      http
        .post("admin/code/emialChk", {
          email: this.message.email,
          code: this.codeValue1
        })
        .then(res => {
          if (res.data.code == 200) {
            this.modelEmail1 = false;
            this.modelEmail2 = true;
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 验证邮箱发送验证码2
    emailSendCode2() {
      let btn = document.getElementsByClassName("emailSendCode2")[0];
      let t;
      let time_num = 60;
      t = setInterval(function() {
        if (time_num <= 0) {
          btn.removeAttribute("disabled");
          btn.value = "获取验证码";
          time_num = 60;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#FFAE36";
          clearInterval(t);
        } else {
          btn.setAttribute("disabled", true);
          btn.value = time_num + "秒";
          time_num--;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#999999";
        }
      }, 1000);
      http.post("admin/code/send", { email: this.newEmail }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$Message.success("发送成功!");
        }
        if (res.data.code == 102) {
          this.$Message.success(res.data.msg);
        }
      });
    },
    // 提交更改邮箱
    emailOk() {
      http
        .post("admin/code/emialChk", {
          email: this.newEmail,
          code: this.codeValue2
        })
        .then(res => {
          if (res.data.code == 200) {
            http
              .post("admin/user/setOrUpdateEmail", {
                email: this.newEmail,
                code: this.codeValue2
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.modelEmail2 = false;
                  this.show();
                  this.$Message.success(res.data.msg);
                } else {
                  this.$Message.error(res.data.msg);
                }
              });
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 验证手机发送验证码1
    phoneSendCode1() {
      let btn = document.getElementsByClassName("phoneSendCode1")[0];
      let t;
      let time_num = 60;
      t = setInterval(function() {
        if (time_num <= 0) {
          btn.removeAttribute("disabled");
          btn.value = "获取验证码";
          time_num = 60;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#FFAE36";
          clearInterval(t);
        } else {
          btn.setAttribute("disabled", true);
          btn.value = time_num + "秒";
          time_num--;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#999999";
        }
      }, 1000);
      http.post("admin/code/get", { phone: this.message.phone }).then(res => {
        if (res.data.code == 200) {
          this.$Message.success("发送成功!");
        }
        if (res.data.code == 102) {
          this.$Message.success(res.data.msg);
        }
      });
    },
    // 手机号验证下一步
    phoneNext() {
      http
        .post("admin/code/chk", {
          phone: this.message.phone,
          code: this.codeValuePhone1
        })
        .then(res => {
          if (res.data.code == 200) {
            this.modelPhone1 = false;
            this.modelPhone2 = true;
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 验证手机发送验证码2
    phoneSendCode2() {
      let btn = document.getElementsByClassName("phoneSendCode2")[0];
      let t;
      let time_num = 60;
      t = setInterval(function() {
        if (time_num <= 0) {
          btn.removeAttribute("disabled");
          btn.value = "获取验证码";
          time_num = 60;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#FFAE36";
          clearInterval(t);
        } else {
          btn.setAttribute("disabled", true);
          btn.value = time_num + "秒";
          time_num--;
          btn.style.background = "#f9f9f9";
          btn.style.color = "#999999";
        }
      }, 1000);
      http.post("admin/code/get", { phone: this.newPhone }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.$Message.success("发送成功!");
        }
        if (res.data.code == 102) {
          this.$Message.success(res.data.msg);
        }
      });
    },
    // 提交更改手机号
    phoneOk() {
      http
        .post("admin/code/chk", {
          phone: this.newPhone,
          code: this.codeValuePhone2
        })
        .then(res => {
          if (res.data.code == 200) {
            http
              .post("admin/user/updatePhone", {
                phone: this.newPhone,
                code: this.codeValuePhone2
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.modelPhone2 = false;
                  this.show();
                  this.$Message.success(res.data.msg);
                } else {
                  this.$Message.error(res.data.msg);
                }
              });
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 提交修改密码
    passwordOk() {
      http
        .post("admin/user/updatePwdByOldPwd", {
          oldPwd: this.oldPassword,
          newPwd: this.newPassword
        })
        .then(res => {
          if (res.data.code == 200) {
            this.modelPassword = false;
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 提交更改联系人
    peopleOk() {
      http
        .post("admin/user/updateManagerInfo", {
          name: this.name
        })
        .then(res => {
          if (res.data.code == 200) {
            this.modelPeople = false;
            this.$Message.success(res.data.msg);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#bassicMessage {
  width: 100%;
  height: 100%;
  padding: 24px;
  padding-bottom: 0;
  min-width: 1650px;
}
.message {
  // width: 767px;
  width: 100%;
  height: 340px;
  background-color: #fff;
  margin-right: 32px;
  padding: 24px;
  margin-bottom: 21px;
  .title {
    color: #5f666b;
    font-size: 14px;
    text-align: left;
    margin-bottom: 10px;
  }
  .shade {
    border-top: 1px solid orange;
    width: 100%;
    height: 10px;
    background-image: -webkit-linear-gradient(top, #a39072, #ffffff);
    margin-bottom: 29px;
    opacity: 0.3;
  }
  .content {
    padding-left: 79px;
    height: 224px;
    .pic {
      float: left;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-top: 10px;
      margin-right: 25px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .list_message {
      float: left;
      list-style: none;
      padding-top: 22px;
      li {
        width: 1173px;
        list-style: none;
        text-align: left;
        color: #66717a;
        font-size: 14px;
        line-height: 2;
        display: flex;
        justify-content: space-between;
        .click {
          cursor: pointer;
        }
      }
      li:nth-child(1) {
        font-weight: bold;
        font-size: 16px;
        color: #5f666b;
        margin-bottom: 20px;
      }
    }
  }
  transition: all 0.5s;
}
.message:hover {
  background-color: #edf0f5;
  transition: all 0.5s;
}
</style>
<style lang="less">
// 修改1
.modelEmail1,
.modelPhone1 {
  .ivu-modal {
    top: 25%;
    width: 568px !important;
    height: 264px;
    .ivu-modal-content {
      width: 100%;
      height: 100%;
      .ivu-modal-header {
        text-align: center;
        line-height: 0;
        padding-top: 40px;
        color: #66717a;
        font-size: 16px;
        padding-bottom: 0;
        margin-bottom: 39px;
        border: 0;
        p {
          line-height: 1;
          color: #66717a;
          font-size: 16px;
        }
      }
      .ivu-modal-body {
        padding: 0;
        .content {
          display: flex;
          font-size: 14px;
          justify-content: center;
          list-style: none;
          align-content: center;
          div {
            line-height: 40px;
          }
          ul {
            width: 200px;
            height: 40px;
            background-color: #f9f9f9;
            list-style: none;
            display: flex;
            li {
              width: 50%;
              height: 100%;
              text-align: center;
              input {
                width: 100%;
                height: 100%;
                background-color: #f9f9f9;
                border: 0;
                outline-style: none;
              }
              .textIpt {
                text-indent: 1em;
              }
            }
            .getCode {
              color: #ffae36;
              position: relative;
              .get-code {
                color: #ffae36;
                cursor: pointer;
              }
              .line {
                position: absolute;
                width: 1px;
                height: 26px;
                background-color: #e3e6e6;
                top: 8px;
                left: 0;
              }
            }
          }
        }
      }
      .ivu-modal-footer {
        border: 0;
        padding: 40px 70px 40px 70px;
        div {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .cancel {
            width: 120px;
            height: 40px;
            font-size: 16px;
            color: #66717a;
            text-align: center;
            line-height: 40px;
            border: 1px solid #66717a;
            border-radius: 0px 10px 0px 10px;
            cursor: pointer;
          }
          .ok {
            width: 120px;
            height: 40px;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
            background-color: #66717a;
            border-radius: 0px 10px 0px 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
// 修改2
.modelEmail2,
.modelPhone2,
.modelPassword {
  .ivu-modal {
    top: 25%;
    width: 568px !important;
    height: 320px;
    .ivu-modal-content {
      width: 100%;
      height: 100%;
      .ivu-modal-header {
        text-align: center;
        line-height: 0;
        padding-top: 40px;
        color: #66717a;
        font-size: 16px;
        padding-bottom: 0;
        margin-bottom: 39px;
        border: 0;
        p {
          line-height: 1;
          color: #66717a;
          font-size: 16px;
        }
      }
      .ivu-modal-body {
        padding: 0;
        .content {
          .item {
            width: 100%;
            height: 40px;
            display: flex;
            font-size: 14px;
            list-style: none;
            align-content: center;
            line-height: 40px;
            margin-bottom: 16px;
            p {
              width: 142px;
              height: 100%;
              text-align: right;
            }
            input {
              width: 360px;
              height: 100%;
              background-color: #f9f9f9;
              border: 0;
              outline-style: none;
              text-indent: 1em;
            }
            ul {
              width: 360px;
              height: 40px;
              background-color: #f9f9f9;
              list-style: none;
              display: flex;
              li {
                height: 100%;
                text-align: center;
                line-height: 1.5;
                input {
                  width: 236px;
                  height: 100%;
                  background-color: #f9f9f9;
                  border: 0;
                  outline-style: none;
                  text-indent: 1em;
                }
              }
              .getCode {
                color: #ffae36;
                position: relative;
                .get-code {
                  color: #ffae36;
                  width: 123px;
                  cursor: pointer;
                }
                .line {
                  position: absolute;
                  width: 1px;
                  height: 26px;
                  background-color: #e3e6e6;
                  top: 8px;
                  left: 0;
                }
              }
            }
          }
        }
      }
      .ivu-modal-footer {
        border: 0;
        padding: 40px 70px 40px 70px;
        div {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .cancel {
            width: 120px;
            height: 40px;
            font-size: 16px;
            color: #66717a;
            text-align: center;
            line-height: 40px;
            border: 1px solid #66717a;
            border-radius: 0px 10px 0px 10px;
            cursor: pointer;
          }
          .ok {
            width: 120px;
            height: 40px;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
            background-color: #66717a;
            border-radius: 0px 10px 0px 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
// 更改联系人
.modelPeople {
  .ivu-modal {
    top: 25%;
    width: 568px !important;
    height: 264px;
    .ivu-modal-content {
      width: 100%;
      height: 100%;
      .ivu-modal-header {
        text-align: center;
        line-height: 0;
        padding-top: 40px;
        color: #66717a;
        font-size: 16px;
        padding-bottom: 0;
        margin-bottom: 39px;
        border: 0;
        p {
          line-height: 1;
          color: #66717a;
          font-size: 16px;
        }
      }
      .ivu-modal-body {
        padding: 0;
        .content {
          display: flex;
          font-size: 14px;
          justify-content: center;
          list-style: none;
          align-content: center;
          div {
            line-height: 40px;
            color: #66717a;
            font-size: 14px;
            input {
              width: 360px;
              height: 40px;
              border: 0;
              background-color: #f9f9f9;
              outline-style: none;
              text-indent: 1em;
            }
          }
        }
      }
      .ivu-modal-footer {
        border: 0;
        padding: 40px 70px 40px 70px;
        div {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .cancel {
            width: 120px;
            height: 40px;
            font-size: 16px;
            color: #66717a;
            text-align: center;
            line-height: 40px;
            border: 1px solid #66717a;
            border-radius: 0px 10px 0px 10px;
            cursor: pointer;
          }
          .ok {
            width: 120px;
            height: 40px;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
            background-color: #66717a;
            border-radius: 0px 10px 0px 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
