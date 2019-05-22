<template>
  <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" active-name="1">
                    <div class="layout-logo">
                        <img src="../images/logo1.png" alt="" @click="toHome">
                        <router-link to="/" class="toHome">返回官网</router-link>
                    </div>
                    <div class="layout-nav">
                        <div class="exit" @click="exit">退出登录</div>
                        <p class="user">会员：{{message.phone}}</p>
                        <div class="headphoto"><img src="../images/header_title.png" alt=""></div>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider width="250" hide-trigger :style="{background: '#515a6e'}">
                    <Menu :active-name="name" theme="dark" :open-names="['1']" @on-select="jump">
                        <MenuItem name="1">
                            <router-link :to="{name:'homePage'}" class="staffAccount"><img src="../images/homePage.png" alt="">首页</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <router-link :to="{name:'myAccount'}" class="staffAccount"><img src="../images/myAccount.png" alt="">我的账户</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <router-link :to="{name:'callRecord'}" class="staffAccount"><img src="../images/callRecord.png" alt="">调用记录</router-link>
                        </MenuItem>
                        <MenuItem name="4">
                            <router-link :to="{name:'dataBazaar'}" class="staffAccount"><img src="../images/dataBazaar.png" alt="">数据市场</router-link>
                        </MenuItem>
                        <MenuItem name="5">
                            <router-link :to="{name:'wechatSign'}" class="staffAccount"><img src="../images/weixin.png" alt="">微信公众号电签</router-link>
                        </MenuItem>
                        <MenuItem name="6">
                            <router-link :to="{name:'basicMessage'}" class="staffAccount"><img src="../images/basicMessage.png" alt="">基本信息</router-link>
                        </MenuItem>
                        <MenuItem name="7">
                            <router-link :to="{name:'shortMessage'}" class="staffAccount"><img src="../images/shortMessage.png" alt="">短信管理</router-link>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Content :style="{padding: '0'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import vc from 'vue-cookie'
import http from '../../components/http.js' 
export default {
  data () {
      return {
          message: {
              phone: 0,
          },
          name: vc.get('NAME') ? vc.get('NAME') : '1',
      }
  },
  created() {
      this.show();
  },
  methods: {
        exit () {
            sessionStorage.removeItem('token')
            this.$router.push('/')
        },
        show() {
            http.post('admin/user/info',{}).then(res=>{
                if (res.data.code == 200) {
                    this.message.phone = res.data.data.phone;
                    sessionStorage.setItem("userInfo",JSON.stringify(res.data.data))
                }
            })
        },
        toHome(){
            this.$router.push('/')
        },
        jump(name) {
            vc.set('NAME',name)
        },
  }
}
</script>
<style lang="less" scoped>
.layout{
  height:100%;
}
.ivu-layout{
  height:100%;
}
.layout-logo{
    float: left;
    margin-top: -0.5%;
    img {
        vertical-align: middle;
        margin-right: 20px;
        cursor: pointer;
    }
    .toHome {
        display: inline-block;
        font-size: 16px;
        line-height: 16px;
        color: #FFFFFF;
        vertical-align: middle;
    }
}
.layout-nav{
    float:right;
    height: 50px;
    .headphoto{
        float: right;
        line-height: 40px;
        width: 36px;
        height: 37px;
        border-radius: 50%;
    }
    .exit{
        float: right;
        height: 50px;
        color:#FFFFFF;
        font-size:16px;
        margin-left: 24px;
        line-height: 40px;
        cursor: pointer;
    }
    .user{
        float: right;
        height: 50px;
        color:#FFFFFF;
        font-size:16px;
        margin-left: 9px;
        line-height: 40px;
    }
}
.ivu-layout-header{
  height:60px;
  background: #2B3B4B;
  padding:0;
  .ivu-menu-light{
    background: #2B3B4B;
    padding-top:10px;
    padding-left: 24px;
    padding-right: 25px;
  }
}
.ivu-menu-horizontal.ivu-menu-light:after{
    height: 0 ;
}
.ivu-layout-content{
    height: 100%;
    overflow: auto !important;
    background-color: #EDF0F5;
    // overflow-y: scroll
}
.ivu-menu-dark{
    width: 250px !important;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
    padding: 0;
    padding-left:0;
    height:46px;
    line-height: 46px;
    span{
        width:100%;
        height:100%;
        display: block;
        text-indent: 43px;
    }
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    background-color: #FFAE36 !important;
}
.ivu-menu-vertical .ivu-menu-item{
    padding: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    width: 250px;
    .staffAccount{
        width:100%;
        height:100%;
        display: block;
        color: #FEFEFE;
    }
}
.ivu-menu{
    text-align: left;
    .ivu-menu-item{
        width: 250px;
        height: 68px;
        padding-left: 22px;
        line-height: 68px;
        img{
            line-height: 68px;
            margin-right: 17px;
            vertical-align: middle;
        }
    }
}
.ivu-layout-sider,.ivu-menu-dark{
    background-color: #34485B !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover{
    background-color: #304354;
}
</style>

