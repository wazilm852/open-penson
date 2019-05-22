<template>
  <div id="changePassword">
    <img src="../images/logo.png" alt class="logo">
    <div class="content">
      <p class="title">更改密码</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="请输入您的手机号"></Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="请输入您的密码"></Input>
        </FormItem>
        <FormItem prop="value" class="operating_password">
          <div class="code-box">
            <Input v-model="value" placeholder="请输入您的验证码"/>
            <!-- <Button class="get-code">发送验证码</Button> -->
            <input type="button" class="get-code" value="发送验证码" @click="time">
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
      <router-link :to="{name:'login'}">
        <span style="color:#575553;fontSize:14px">暂不修改</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import http from "../../components/http.js";
import vc from "vue-cookie";
export default {
  data() {
    return {
      value: "", //输入验证码
      formInline: {
        user: "",
        password: "",
        code: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写用户密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      this.formInline.user = this.$route.query.phone;
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // this.$Message.success("Success!");
          // this.$router.push({ name: "main" });
          http
            .post("admin/code/chk", {
              phone: this.formInline.user,
              code: this.formInline.code
            })
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                http
                  .post("admin/user/pwd", {
                    phone: this.formInline.user,
                    code: this.formInline.code,
                    newPwd: this.formInline.password
                  })
                  .then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                      this.$router.push({ name: "myAccount" });
                    }
                  });
              }
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    time() {
      let btn = document.getElementsByClassName("get-code")[0];
      let t;
      let time_num = 60;
      t = setInterval(function() {
        if (time_num <= 0) {
          btn.removeAttribute("disabled");
          btn.value = "发送验证码";
          time_num = 60;
          btn.style.background = "orange";
          btn.style.color = "#ffffff";
          clearInterval(t);
        } else {
          btn.setAttribute("disabled", true);
          btn.value = time_num + "秒";
          time_num--;
          btn.style.background = "rgba(244,244,244,1)";
          btn.style.color = "#999999";
        }
      }, 1000);
      http.post("admin/code/get", { phone: this.formInline.user }).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          this.formInline.code = res.data.data;
          this.$Message.success("发送成功!");
        }
        if (res.data.code == 102) {
          this.$Message.success(res.data.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#changePassword {
  width: 100%;
  height: 100%;
  background-image: url(../images/banner0.jpeg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .logo {
    position: absolute;
    top: 108px;
    left: 160px;
  }
  .content {
    width: 580px;
    height: 408px;
    background-color: #fff;
    position: absolute;
    top:20%;
    left:50%;
    margin-left: -290px;
    border-radius:4px;
    padding: 60px;
    padding-top: 35px;
    padding-bottom: 0;
    .title{
      margin-bottom:31px;
      color:#575553;
      font-size:16px;
    }
    .operating_password {
      height: 48px;
      width: 100%;
      .remember {
        float: left;
        color: #575553;
        font-size: 14px;
      }
      .change_password {
        float: right;
        color: #ffae36;
        font-size: 14px;
      }
      .code-box {
        width: 100%;
        .get-code {
          float: right;
          height: 48px;
          width: 120px;
          background-color: orange;
          color: #ffffff;
          cursor: pointer;
          outline-style: none;
          border-radius: 4px;
        }
        .ivu-input-wrapper {
          width: 328px;
          float: left;
        }
      }
    }
    .ivu-btn {
      width: 100%;
      height: 48px;
      font-size: 16px;
    }
  }
}
</style>
<style lang='less'>
#changePassword {
  .ivu-form-item {
    width: 460px;
    height: 48px;
    margin: 0 auto;
    margin-bottom: 20px;
    .ivu-input {
      width: 100%;
      height: 48px;
      padding: 17px 0 17px 20px;
      font-size: 14px;
    }
  }
  .operating_password .ivu-form-item-content .ivu-input {
    width: 328px;
  }
}
</style>
