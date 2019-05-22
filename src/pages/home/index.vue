<template>
    <div class="home">
        <!-- 导航 -->
        <vheader></vheader>
        <!-- 首页主体 -->
        <Content>
            <!-- banner -->
            <div class="banner">
                <div class="banner-content">
                    <div class="title">放心   安全   便捷   高效</div>
                    <div class="describe">助您打造自己的电子合同签署平台</div>
                    <div @click="toLogin" class="linkto">申请试用</div>
                </div>
            </div>
            <!-- 产品服务 -->
            <div class="product-service">
                <p class="content-title">产品服务</p>
                <Row type="flex" justify="space-around" class="code-row-bg">
                    <Col span="4">
                        <img src="../../assets/ser1.png" alt="">
                        <div class="ser-title">证书服务</div>
                        <div class="explain">国内权威CA机构颁发证书安全可靠，合法合规</div>
                    </Col>
                    <Col span="4">
                        <img src="../../assets/ser2.png" alt="">
                        <div class="ser-title">签章签名服务</div>
                        <div class="explain">个人手绘签名、企业电子签章满足不同需求，符合国家标准</div>
                    </Col>
                    <Col span="4">
                        <img src="../../assets/ser3.png" alt="">
                        <div class="ser-title">签署服务</div>
                        <div class="explain">国内权威CA机构颁发证书安全可靠，合法合规</div>
                    </Col>
                    <Col span="4">
                        <img src="../../assets/ser4.png" alt="">
                        <div class="ser-title">存证服务</div>
                        <div class="explain">国家第三方存证处，合同加密存储，防篡改防抵赖</div>
                    </Col>
                </Row>
            </div>
            <!-- 应用场景 -->
            <div class="application-scenarios-box">
                <div class="application-scenarios">
                    <p class="content-title">应用场景</p>
                    <Row type="flex" justify="space-between" class="code-row-bg">
                        <Col span="6">
                            <img src="../../assets/app1.png" alt="">
                            <div class="ser-title">合同签署</div>
                            <div class="explain">打造自己的电子合同系统</div>
                        </Col>
                        <Col span="6">
                            <img src="../../assets/app2.png" alt="">
                            <div class="ser-title">电子签名</div>
                            <div class="explain">合同、支票、协议书签署名字</div>
                        </Col>
                        <Col span="6">
                            <img src="../../assets/app3.png" alt="">
                            <div class="ser-title">实名认证</div>
                            <div class="explain">人脸识别、身份验证、企业验证</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-between" class="code-row-bg">
                        <Col span="6">
                            <img src="../../assets/app4.png" alt="">
                            <div class="ser-title">合同存证</div>
                            <div class="explain">打造自己的电子合同系统</div>
                        </Col>
                        <Col span="6">
                            <img src="../../assets/app5.png" alt="">
                            <div class="ser-title">合同管理</div>
                            <div class="explain">合同、支票、协议书签署名字</div>
                        </Col>
                        <Col span="6">
                            <img src="../../assets/app6.png" alt="">
                            <div class="ser-title">在线编辑</div>
                            <div class="explain">上传模版、在线编辑、直接签署一气呵成</div>
                        </Col>
                    </Row>
                </div>
            </div>
            <!-- 热门API -->
            <div class="hot-api">
                <p class="content-title">热门API</p>
                <Row type="flex" justify="space-between" class="code-row-bg">
                    <Col span="6">
                        <img src="../../assets/hot1.png" alt="">
                        <div class="ser-title">合同签署</div>
                        <div class="explain">为您提供从合同上传、签署、证书等数据</div>
                    </Col>
                    <Col span="6">
                        <img src="../../assets/hot2.png" alt="">
                        <div class="ser-title">手绘签名</div>
                        <div class="explain">个人在屏幕上手绘签名</div>
                    </Col>
                    <Col span="6">
                        <img src="../../assets/hot3.png" alt="">
                        <div class="ser-title">在线编辑</div>
                        <div class="explain">对上传到线上的合同模版可以直接编辑</div>
                    </Col>
                </Row>
                <router-link class="more" to="/mart">查看更多>></router-link>
            </div>
            <!-- 定制服务 -->
            <div class="customized-service">
                <!-- <img src="../../assets/cus.png" alt=""> -->
                <div class="sercon-box">
                    <div class="left-con">
                        <div class="cus-title">找不到想要的数据？</div>
                        <div class="cus-con">个性化定制，为您提供更专业的数据服务</div>
                    </div>
                    <router-link to="/custom" class="custom" tag="div">立即定制</router-link>
                </div>
            </div>
            <!-- 接入流程 -->
            <div class="flow">
                <p class="content-title">接入流程</p>
                <Row class="flow-path">
                    <Col span="6">
                        <div class="img-box">
                            <img src="../../assets/flow1.png" alt="">
                        </div>
                        <div class="line"></div>
                        <div class="ser-title">通过平台实名认证</div>
                    </Col>
                    <Col span="6">
                        <div class="img-box">
                            <img src="../../assets/flow2.png" alt="">
                        </div>
                        <div class="line"></div>
                        <div class="ser-title">申请API获取app ID和app secret</div>
                    </Col>
                    <Col span="6">
                        <div class="img-box">
                            <img src="../../assets/flow3.png" alt="">
                        </div>
                        <div class="line"></div>
                        <div class="ser-title">获取API体验次数</div>
                    </Col>
                    <Col span="6">
                        <div class="img-box">
                            <img src="../../assets/flow4.png" alt="">
                        </div>
                        <div class="ser-title">根据API详情调用接口</div>
                    </Col>
                </Row>
            </div>
        </Content>
        <!-- footer -->
        <vfooter></vfooter>
    </div>
</template>

<script>
import vheader from '../../components/header/index'
import vfooter from '../../components/footer/index'
export default {
    methods:{
        toLogin(){
            const url = this.$router.resolve({path:"/login"})
            window.open(url.href,'_blank')
        }
    },
    components:{vheader,vfooter}
}
</script>

<style lang="less" scoped>
@width:1200px;
.home {
    .content-title {
        font-family: MicrosoftYaHei;
        font-size: 24px;
        font-weight:400;
        color:rgba(39,43,46,1);
        line-height: 24px;
    }
    .banner {
        width: 100%;
        height: 300px;
        position: relative;
        background: url('../../assets/banner3.png') no-repeat center center;
        background-size: 100% 100%;
        .banner-content {
            position: absolute;
            top: 26%;
            left: 25%;
            font-family: SourceHanSansCN;
            text-shadow:0px 13px 7px rgba(43,59,75,0.45);
            .title{
                font-size: 36px;
                color: #FFAE36;
                font-family: SourceHanSansCN-Bold;
                font-weight: bold;
                text-align: left;
            }
            .describe {
                font-size: 24px;
                color: #FFFFFF;
                margin-top: 5%;
                margin-bottom: 6%;
            }
            .linkto {
                width:120px;
                height:40px;
                line-height: 40px;
                border:2px solid rgba(255,255,255,1);
                opacity:0.7;
                border-radius:0px 10px 0px 10px;
                display: block;
                font-weight:400;
                font-size: 16px;
                text-shadow: none;
                color: #FFFFFF;
                margin-left: 2%;
                cursor: pointer;
            }
            
        }
        @media (min-width: 2320px) {
            .banner-content {
                left: 28%;
            }
        }

        @media (min-width: 1430px) and (max-width: 1700px) {
            .banner-content {
                left: 16%;
                .title{
                    font-size: 34px;
                }
                .describe {
                    font-size: 22px;
                }

                .linkto {
                    font-size: 14px;
                }
            }
        }
        @media (min-width: 1200px) and (max-width: 1430px) {
            .banner-content {
                left: 10%;
                .title{
                    font-size: 32px;
                }
                .describe {
                    font-size: 20px;
                }
                .linkto {
                    font-size: 14px;
                }
            }
        }
    }
    .product-service, .application-scenarios,.hot-api,.flow {
        font-size:16px;
        line-height: 24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        .ser-title {
            color: #272B2E;
        }
        .explain {
            color: #61676B;
        }
    }
    .product-service {
        width: @width;
        margin: 0 auto;
        padding: 48px 0;
        img {
            width: 71px;
            height: 80px;
        }
        .ser-title {
            margin-top: 29px;
            margin-bottom: 23px;
        }
        .code-row-bg {
            margin-top: 46px; 
        }
    }
    .application-scenarios-box {
        width: 100%;
        padding-top: 48px;
        padding-bottom: 10px;
        background-color: #F7FAFC;
        .application-scenarios {
            width: @width;
            margin: 0 auto;
            .content-title {
                margin-bottom: 29px;
            }
            .code-row-bg {
                padding-bottom: 31px;
                .ivu-col-span-6 {
                    width: 21.5%;
                    img {
                        width: 256px;
                        height: 156px;
                    }
                    .ser-title {
                        margin-top: 25px;
                        margin-bottom: 24px;
                    }
                }
            }
            
        }
    }
    .hot-api {
        width: @width;
        margin: 0 auto;
        padding-top: 56px;
        .ivu-col-span-6 {
            width: 30%;
            border:1px solid rgba(52,72,91,1);
            opacity:0.6;
            border-radius:4px;
            padding: 41px 0;
            margin-top: 40px;
            .ser-title {
                margin-top: 27px;
                margin-bottom: 22px;
            }
        }
        .more {
            float: right;
            font-size:14px;
            line-height: 14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(146,155,161,1);
            margin-top: 24px;
            margin-bottom: 47px;
        }
    }
    .customized-service {
        width: 100%;
        height: 241px;
        background: url('../../assets/cus.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 86px;
        .sercon-box {
            width: 26.5%;
            margin-left: 45%;
            padding-top: 88px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-con {
                color: #272B2E;
                width: 254px;
                .cus-title {
                    font-size: 24px;
                    line-height: 24px;
                    margin-bottom: 26px;
                }
                .cus-con {
                    font-size: 14px;
                    line-height: 14px;
                }
            }
            .custom {
                width:100px;
                height:36px;
                line-height: 36px;
                background-color:rgba(255,174,54,1);
                border-radius:0px 10px 0px 10px;
                font-size: 14px;
                color: #FFFFFF;
                border: none;
                cursor: pointer;
            }
        }
        @media (min-width: 1200px) and (max-width: 1410px) {
            .sercon-box {
                width: 31%;
            }
        }
    }
    .flow {
        width: @width;
        margin: 0 auto;
        padding: 50px 0;
        .ivu-col-span-6 {
            position: relative;
            .img-box {
                width: 68px;
                height: 68px;
                line-height: 62px;
                text-align: center;
                margin: 0 auto;
                img {
                    vertical-align: middle;
                }
            }
            .line {
                width: 65%;
                height: 2px;
                background-color: #DADFE3;
                position: absolute;
                top: 32%;
                left: 68%;
            }
            .ser-title {
                margin-top: 24px;
            }
        }
    }
}
</style>


