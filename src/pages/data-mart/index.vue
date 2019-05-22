<template>
    <div class="mart">
        <div class="content">
            <vheader></vheader>
            <Content>
                <div class="banner">数据市场</div>
                <div class="data-box">
                    <ul class="content">
                        <li>
                            <div class="pic"><img src="../../assets/pic1.png" alt=""></div>
                            <h5>合同签署</h5>
                            <p>为您提供从合同上传、签署、证书等数据</p>
                            <div @click="toData1">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic2.png" alt=""></div>
                            <h5>银行卡四要素验证</h5>
                            <p>对签合同的个人主体进行实名认证</p>
                            <div @click="toData2">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic3.png" alt=""></div>
                            <h5>CA证书</h5>
                            <p>国家权威数字证书</p>
                            <div @click="toData3">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic4.png" alt=""></div>
                            <h5>营业执照OCR识别</h5>
                            <p>对企业主体进行验证</p>
                            <div @click="toData4">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic5.png" alt=""></div>
                            <h5>企业工商信息核验</h5>
                            <p>对企业主体进行验证</p>
                            <div @click="toData5">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic6.png" alt=""></div>
                            <h5>公安部实名验证</h5>
                            <p>对签合同的个人主体进行实名认证</p>
                            <div @click="toData6">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic7.png" alt=""></div>
                            <h5>全网手机三要素验证</h5>
                            <p>对个人进行验证</p>
                            <div @click="toData7">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic8.png" alt=""></div>
                            <h5>人脸识别</h5>
                            <p>对个人进行验证</p>
                            <div @click="toData8">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic9.png" alt=""></div>
                            <h5>身份证OCR</h5>
                            <p>根据身份证正面照识别身份信息</p>
                            <div @click="toData9">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic10.png" alt=""></div>
                            <h5>驾驶证OCR</h5>
                            <p>根据身份证正面照识别身份信息</p>
                            <div @click="toData10">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic11.png" alt=""></div>
                            <h5>行驶证OCR</h5>
                            <p>根据身份证正面照识别身份信息</p>
                            <div @click="toData11">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                        <li>
                            <div class="pic"><img src="../../assets/pic12.jpg" alt=""></div>
                            <h5>合同存出证</h5>
                            <p>对签署的合同进行存证和出证</p>
                            <div @click="toData12">
                                <button class="btn">查看数据</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </Content>
            <vfooter></vfooter>
        </div>
        <div class="tips" v-if="flag">
            <div class="tip-content">
                <img src="../../assets/close.png" alt="" class="cancel" @click="cancel">
                <div class="tip-title">温馨提示</div>
                <div class="tip-txt">您还没有登录账号，请完成登录</div>
                <div class="linkto">
                    <div @click="cancel">
                        <button>取消</button>
                    </div>
                    <div @click="toLogin">
                        <button class="btn1">去登录</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vheader from '../../components/header/index'
import vfooter from '../../components/footer/index'
export default {
    data(){
        return {
            token: null,
            flag:false
        }
    },
    methods:{
        toData1(){
            if(this.token) {
                this.$router.push({name:'contractSigning'})
            }else {
                this.flag = true
            }
        },
        toData2(){
            if(this.token) {
                this.$router.push({name:'bankCardElements'})
            }else {
                this.flag = true
            }
        },
        toData3(){
            if(this.token) {
                this.$router.push({name:'caCertificate'})
            }else {
                this.flag = true
            }
        },
        toData4(){
            if(this.token) {
                this.$router.push({name:'ocrDiscern'})
            }else {
                this.flag = true
            }
        },
        toData5(){
            if(this.token) {
                this.$router.push({name:'industryVerification'})
            }else {
                this.flag = true
            }
        },
        toData6(){
            if(this.token) {
                this.$router.push({name:'policeVerification'})
            }else {
                this.flag = true
            }
        },
        toData7(){
            if(this.token) {
                this.$router.push({name:'phoneVerification'})
            }else {
                this.flag = true
            }
        },
        toData8(){
            if(this.token) {
                this.$router.push({name:'personalVerification'})
            }else {
                this.flag = true
            }
        },
        toData9(){
            if(this.token) {
                this.$router.push({name:'idOcr'})
            }else {
                this.flag = true
            }
        },
        toData10(){
            if(this.token) {
                this.$router.push({name:'drivingLicenceOCR'})
            }else {
                this.flag = true
            }
        },
        toData11(){
            if(this.token) {
                this.$router.push({name:'driveOCR'})
            }else {
                this.flag = true
            }
        },
        toData12(){
            if(this.token) {
                this.$router.push({name:'certificate'})
            }else {
                this.flag = true
            }
        },
        cancel(){
            this.flag = false
        },
        toLogin(){
            const url = this.$router.resolve({path:"/login"})
            window.open(url.href,'_blank')
            this.flag = false
        }
    },
    created(){
        this.token = sessionStorage.getItem('token')
        
    },
    components:{vheader,vfooter}
}
</script>

<style lang="less" scoped>
.mart {
    position: relative;
    .content {
        .banner {
            width: 100%;
            height: 300px;
            line-height: 300px;
            background: url('../../assets/banner2.png') no-repeat center center;
            background-size: 100% 100%;
            font-size: 36px;
            color: #FFAE36;
            font-weight: bold;
            text-shadow:0px 13px 7px rgba(43,59,75,0.45);
        }
        .data-box {
            padding-top: 40px;
            background-color: #F0F3F7;
            .content{
                width: 1200px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                li{
                    height: 250px;
                    background-color: #fff;
                    width: 30%;
                    margin-bottom: 32px;
                    list-style: none;
                    text-align: center;
                    .pic{
                        width: 88px;
                        height: 88px;
                        background:rgba(245,250,255,1);
                        border:1px solid rgba(102,113,122,1);
                        border-radius:50%;
                        padding-top: 22px;
                        text-align: center;
                        margin: 16px auto;
                    }
                    h5{
                        color:#5F666B;
                        font-size:16px;
                    }
                    p{
                        color:#66717A;
                        font-size:14px;
                        margin-top: 12px;
                        margin-bottom: 16px;
                    }
                    button{
                        width:100px;
                        height:40px;
                        background:#66717A;
                        border-radius:4px 10px 0px 10px;
                        line-height: 40px;
                        font-size:16px;
                        color:#ffffff;
                        border:0;
                        outline-style: none;
                        cursor: pointer;
                    }
                    .btn:active{
                        background-color:rgba(255,174,54,0.8);
                    }
                    button:hover{
                        background:rgba(255,174,54,1);
                    }
                    .btn{
                        opacity:1;
                    }
                }
                .excess{
                    opacity:0;
                }
            }
        }
    }
    .tips {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.6);
        .tip-content {
            width:568px;
            height:264px;
            margin: 0 auto;
            background:rgba(255,255,255,1);
            border-radius:4px;
            font-size: 16px;
            line-height: 16px;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            .cancel {
                position: absolute;
                right: 4%;
                top: 6%;
                cursor: pointer;
            }
            .tip-title {
                color: #FFAE36;
                font-weight: bold;
                padding-top: 41px;
                margin-bottom: 51px;
            }
            .tip-txt {
                color: #66717A;
                margin-bottom: 52px;
            }
            .linkto {
                display: flex;
                font-size: 16px;
                margin-left: 30%;
                button {
                    width:120px;
                    height:40px;
                    color: #FFAE36;
                    border:1px solid rgba(255,174,54,1);
                    border-radius:0px 10px 0px 10px;
                    cursor: pointer;
                }
                .btn1 {
                    background:rgba(255,174,54,1);
                    color: #ffffff;
                    margin-left: 60px;
                }
            }   
        }
    }
}

</style>

