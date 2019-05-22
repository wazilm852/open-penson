<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" active-name="1">
                    <div class="layout-logo">
                        <img src="../../assets/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <router-link to="/">首页</router-link>
                        </MenuItem>
                        <MenuItem name="2">
                            <router-link to="/custom">定制API</router-link>
                        </MenuItem>
                        <MenuItem name="3">
                            <router-link to="/mart">数据市场</router-link>
                        </MenuItem>
                        <!-- <MenuItem name="4">
                            <router-link to="#">帮助与支持</router-link>
                        </MenuItem> -->
                        <MenuItem name="5">
                            <div @click="toVip">开发者中心</div>
                        </MenuItem>
                    </div>
                    <div class="layout-mes" v-if="flag">
                        <!-- <router-link to="#">
                            <button>去认证</button>
                        </router-link> -->
                        <div class="headphoto" @click="toAccount"><img src="../../pages/images/header_title.png" alt=""></div>
                        <p class="user">会员：{{message.phone}}</p>
                        <div class="exit" @click="exit">退出登录</div>
                    </div>
                    <div class="layout-nomes" v-else>
                        <div @click="toLogin">登录</div>
                    </div>
                </Menu>
            </Header>
        </Layout>
        <div class="login" v-if="out">
            <div class="title">温馨提示</div>
            <div class="con">请先登录开发者账号</div>
            <button class="confirm" @click="cancel">确定</button>
        </div>
        <div class="fixed-box">
            <div id="rightArrow" @click="toRight">
            </div>
            <div id="floatDivBoxs">
                <div class="floatDtt">在线客服</div>
                <div class="floatShadow">
                    <ul class="floatDqq">
                        <li>
                            <a target="_blank" href="tencent://message/?uin=3127008527&amp;Site=葫芦娃集团官网&amp;Menu=yes">
                                <img src="https://huluwa-ec-official.oss-cn-hangzhou.aliyuncs.com/hlw/images/hlw-img.png" style="width:20px;margin-right: 10px;" align="absmiddle">
                                商务QQ
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="tencent://message/?uin=2695248368&amp;Site=葫芦娃集团官网&amp;Menu=yes">
                                <img src="https://huluwa-ec-official.oss-cn-hangzhou.aliyuncs.com/hlw/images/hlw-img.png" style="width:20px;margin-right: 10px;" align="absmiddle">
                                行政QQ
                            </a>
                        </li>
                    </ul>
                    <div class="floatDtt">热线电话</div>
                    <div class="floatDtxt">咨询电话:</div>
                    <div class="floatDtel">0571-56260789</div>
                    <div class="floatDtxt" style="margin-top:-20px">技术支持:</div>
                    <div class="floatDtel">2088825772</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../components/http.js";
export default {
    data () {
        return {
            message: {
                phone: 0,
            },
            isLogin:null,
            flag:false,
            out: false,
            rightBtn: true
        }
    },
    created(){
        this.token = sessionStorage.getItem("token");
        if(this.token){
            this.flag = true
        }
    },
    mounted(){
        this.show();
    },
    methods:{
        exit () {
            sessionStorage.removeItem('token')
            this.flag = false
        },
        show() {
            if(this.token){
                http.post('admin/user/info',{}).then(res=>{
                    if (res.data.code == 200) {
                        this.message.phone = res.data.data.phone;
                    }
                })
            }
        },
        toVip(){
            if(this.token){
                this.$router.push({name:"myAccount"})
            }else {
                this.out = true
            }
        },
        toLogin(){
            this.$router.push({name:"login"})
        },
        cancel(){
            this.out = false
            this.$router.push({name:"login"})
        },
        toAccount(){
            this.$router.push({name:"myAccount"})
        },
        toRight(){
            if(this.rightBtn){
                document.getElementById("rightArrow").style.cssText = "right:0px;background-position: -50px 0;"
                document.getElementById("floatDivBoxs").style.cssText = "right:-170px;"
                this.rightBtn = false
            }else {
                document.getElementById("rightArrow").style.cssText = "right:170px;background-position: 0 0;"
                document.getElementById("floatDivBoxs").style.cssText = "right:0;"
                this.rightBtn = true
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
.fixed-box {
    text-align: left;
    #rightArrow {
        width: 50px;
        height: 45px;
        background: url(../../assets/online_arrow.jpg) no-repeat;
        background-position: 0 0;
        position: fixed;
        top: 40%;
        right: 170px;
        z-index: 99999;
    }
    #floatDivBoxs {
        width: 170px;
        background: #fff;
        position: fixed;
        top: 40%;
        right: 0px;
        z-index: 99999;
        .floatDtt {
            width: 100%;
            height: 45px;
            line-height: 45px;
            background: #f08326;
            color: #fff;
            font-size: 18px;
            text-indent: 12px;
            position: relative;
            font-weight: bold;
        }
        .floatShadow {
            background: #fff;
            box-shadow: -2px 0 3px rgba(0, 0, 0, 0.25);
            .floatDqq {
                list-style: none;
                padding: 0 14px;
                li {
                    height: 45px;
                    line-height: 45px;
                    font-size: 15px;
                    border-bottom: 1px solid #e3e3e3;
                    text-align: left;
                    a {
                        color: inherit;
                        text-decoration: none;
                        img {
                            float: left;
                            margin-top: 7px;
                        }
                    }
                }
            }
            .floatDtxt {
                font-size: 18px;
                color: #333;
                padding: 12px 14px;
                font-weight: bold;
            }
            .floatDtel {
                padding: 0 0 15px 10px;
                font-size: 18px;
                color: orange;
                font-weight: bold;
            }
        }
    }
}
.login {
    width: 450px;
    height: 200px;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow:0 0 10px #333;
    position: fixed;
    top: 0;
    left: 40%;
    z-index: 999;
    .title {
        font-size: 16px;
        font-weight:bold;
        color:rgba(255,174,54,1);
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .con {
        font-size: 16px;
    }
    .confirm {
        border: none;
        width:100px;
        height:36px;
        background:rgba(253,152,39,1);
        border-radius:4px;
        color: #ffffff;
        font-size: 14px;
        position: absolute;
        right: 5%;
        bottom: 10%;
        cursor: pointer;
    }
}
.ivu-layout,.ivu-layout-header {
    background: url('../../assets/header_bg.png');
}
.ivu-menu-light {
    background: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ivu-layout-header {
    width: 1186px;
    margin: 0 auto;
    padding: 0;
}
.ivu-menu-horizontal.ivu-menu-light:after {
    height: 0;
}
.layout-logo {
    width: 207px;
    height: 44px;
    img {
        display: block;
        width: 100%;
        height: 100%
    }
}

.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    border-bottom: none;
    a,div {
        color: #ffffff;
        cursor: pointer;
        &:hover {
            color: #FFAE36;
        }
    }
    .router-link-exact-active {
        color: #FFAE36;
    }
}
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, 
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    border-bottom: none;
}
.layout-mes{
    display: flex;
    align-items: center;
    button{
        width:88px;
        height:32px;
        border-radius:4px 10px 0px 10px;
        line-height:32px;
        font-size:16px;
        color:#ffffff;
        border:0;
        outline-style: none;
        cursor: pointer;
        background-color: #FFAE36;
        margin-right: 32px;
    }
    .headphoto{
        width: 36px;
        height: 37px;
        cursor: pointer;
    }
    .exit {
        color:#FFFFFF;
        font-size:16px;
        margin-left: 24px;
        cursor: pointer;
        font-weight: 200;
    }
    .user{
        color:#FFFFFF;
        font-size:16px;
        margin-left: 9px;
    }
}
.layout-nomes {
    width:88px;
    height:32px;
    border-radius:4px 10px 0px 10px;
    line-height:32px;
    font-size: 16px;
    cursor: pointer;
    color: #FFFFFF;
    background-color: #FFAE36;
}
</style>
