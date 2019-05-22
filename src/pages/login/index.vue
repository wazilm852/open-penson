<template>
  <div id="login">
    <img src="../images/logo.png" alt class="logo">
    <div class="center">
      <img src="../images/pic-text.png" alt class="pic-text">
      <div class="content">
        <p class="title">登录界面</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" id="ipt_logo">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="请输入您的手机号"></Input>
          </FormItem>
          <FormItem prop="password">
            <Input
              type="password"
              v-model="formInline.password"
              placeholder="请输入您的密码"
              @keyup.enter.native="handleSubmit('formInline')"
            ></Input>
          </FormItem>
          <div class="operating_password">
            <Checkbox v-model="formInline.checked" class="remember">记住密码</Checkbox>
            <router-link :to="{name:'changePassword', query:{phone: this.formInline.user}}">
              <span class="change_password">更改密码</span>
            </router-link>
          </div>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template> 
<script>
import http from "../../components/http.js";
import vc from "vue-cookie";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      story: this.$store.state.userlogin.num,
      single: true, //是否记住密码
      formInline: {
        user: "",
        password: "",
        checked: true
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
  // computed:{
  //   ...mapState(['count'])
  // },
  created() {
    let user = JSON.parse(vc.get("userName"))
      ? JSON.parse(vc.get("userName"))
      : {};
    this.formInline.user = user.user;
    if (user.checked === false) {
      this.formInline.password = "";
    } else {
      this.formInline.password = user.password;
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login({
            phone: this.formInline.user,
            password: this.formInline.password
          }).then(res => {
            if (res.data.code === 200) {
              this.$Message.success("登录成功!");
              vc.set("userName", JSON.stringify(this.formInline), 1);
              this.$router.push('/homePage');
            } else if (res.data.code === 500) {
              this.$Message.error("账号或密码输入错误!");
            }
          });
        } else {
          this.$Message.error("输入账号密码!");
        }
      });
    },
    ...mapActions(["login"])
  }
};
</script>
<style lang='less' scoped>
#login {
  width: 100%;
  height: 100%;
  background-image: url(../images/banner0.jpeg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .logo {
    position: absolute;
    top: 10%;
    left: 8%;
  }
  .center {
    width: 580px;
    position: absolute;
    top:20%;
    left:50%;
    margin-left: -290px;
    .pic-text {
      margin-bottom: 60px;
    }
    .content {
      width: 580px;
      height: 348px;
      margin: 0 auto;
      background-color: #fff;
      padding:60px;
      padding-top: 35px;
      padding-bottom: 0;
      border-radius:4px;
      .title {
        color: #575553;
        font-size: 16px;
        margin-bottom: 31px;
      }
      .operating_password {
        height: 36px;
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
      }
    }
  }
}
</style>
<style lang='less'>
#login {
  #ipt_logo {
    .ivu-form-item {
      width: 460px;
      height: 48px;
      margin: 0 auto;
      margin-bottom: 20px;
      .ivu-form-item-content {
        width: 100%;
        height: 100%;
        .ivu-input-wrapper {
          width: 100%;
          height: 100%;
          .ivu-input {
            width: 100%;
            height: 100%;
          }
        }
      }
      .ivu-btn {
        width: 100%;
        height: 100%;
        font-size: 16px;
      }
    }
  }
}
</style>
