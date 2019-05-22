<template>
    <div class="custom">
        <!-- 导航 -->
        <vheader></vheader>
        <!-- 内容主体 -->
        <Content>
            <div class="banner">
                <div class="title">量身定制你的数据</div>
                <div class="flow-title">定制API</div>
                <div class="flow-explain">专业定制 放心无忧</div>
            </div>
            <div class="flow">
                <Row class="flow-path">
                    <Col span="6">
                        <div class="img-box">
                            <div class="name">提交需求</div>
                            <img src="../../assets/img1.png" alt="">
                            <div class="count">1</div>
                        </div>
                        <div class="ser-title">请先提交您的基本需求</div>
                    </Col>
                    <Col span="6">
                        <div class="img-box">
                            <div class="name">需求评估</div>
                            <img src="../../assets/img2.png" alt="">
                            <div class="count">2</div>
                        </div>
                        <div class="ser-title">根据需求沟通评估</div>
                    </Col>
                    <Col span="6">
                        <div class="img-box">
                            <div class="name">数据采集</div>
                            <img src="../../assets/img3.png" alt="">
                            <div class="count">3</div>
                        </div>
                        <div class="ser-title">采集完成需求需要的数据</div>
                    </Col>
                    <Col span="6">
                        <div class="img-box">
                            <div class="name">交付任务</div>
                            <img src="../../assets/img4.png" alt="">
                            <div class="count">4</div>
                        </div>
                        <div class="ser-title">完成需求双方沟通完成任务</div>
                    </Col>
                    <div class="line"></div>
                    <div class="line1"></div>
                </Row>
            </div>
            <div class="mes">
                <div class="company-mes">
                    <div><span>联系我们：</span>0571-5626-0789</div>
                    <div class="mes-item">
                        <span class="top">联系地址：</span>
                        <div class="add">杭州经济技术开发区6号大街号国家高科技企业园区2号楼10层A区</div> 
                    </div>
                    <div><span>联系邮箱：</span>hlw@huluwa.cc</div>
                </div>
                <div class="client-mes">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline">
                        <FormItem prop="requires" label="您的需求：">
                            <Input v-model="formInline.requires" type="textarea" placeholder="请输入您的工单需求"></Input>
                            <div class="limit">500字以内</div>
                        </FormItem>
                        <FormItem prop="user" label="您的姓名：">
                            <Input type="text" v-model="formInline.user" placeholder="请输入您的姓名"></Input>
                        </FormItem>
                        <FormItem prop="phone"label="联系方式：">
                            <Input type="text" v-model="formInline.phone" placeholder="请输入您的手机号"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formInline')">提交需求</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Content>
        <vfooter></vfooter>
    </div>
</template>

<script>
import vheader from '../../components/header/index'
import vfooter from '../../components/footer/index'
import http from "../../components/http.js";
export default {
    data(){
        return {
            data:"",
            formInline: {
                requires: "",
                user: "",
                phone: ""
            },
            ruleInline: {
                requires: [
                    {
                        required: true,
                        message: "请填写需求",
                        trigger: "blur"
                    }
                ],
                user: [
                    {
                        required: true,
                        message: "请填写姓名",
                        trigger: "blur"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请填写手机号",
                        trigger: "blur"
                    }
                ]
            }
        }    
    },
    methods:{
        handleSubmit(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    http.post("admin/customized/add",
                    {
                        content: this.formInline.textarea,
                        realName: this.formInline.userName,
                        phone: this.formInline.phone
                    })
                    this.$Message.success('需求提交成功!');
                    this.formInline.requires = "";
                    this.formInline.user = "";
                    this.formInline.phone = "";
                } else {
                    this.$Message.error('请输入您的需求!');
                }
            })
        }
    },
    components:{vheader,vfooter}
}
</script>

<style lang="less" scoped>
.custom {
    .banner {
        width: 100%;
        height: 300px;
        background: url('../../assets/banner1.png') no-repeat center center;
        background-size: 100% 100%;
        padding-top: 68px;
        font-weight:400;
        color:rgba(39,43,46,1);
        .title {
            font-size: 36px;
            line-height: 36px;
            color: #FFAE36;
            font-weight: bold;
            text-shadow:0px 13px 7px rgba(43,59,75,0.45);
        }
        .flow-title {
            margin-top: 114px;
            margin-bottom: 15px;
            font-size: 24px;
            line-height: 24px;
        }
        .flow-explain {
            font-size: 14px;
            line-height: 14px;
        }
    }
    .flow {
        width: 62.5%;
        height: 262px;
        margin: 0 auto;
        padding: 50px 0;
        box-shadow:0px 8px 16px 0px rgba(0, 0, 0, 0.1);
        position: relative;
        .ivu-col-span-6 {
            position: relative;
            .img-box {
                width: 148px;
                height: 148px;
                border-radius: 50%;
                text-align: center;
                margin: 0 auto;
                position: relative;
                .name {
                    font-size: 16px;
                    line-height: 16px;
                    font-weight:400;
                    color:rgba(39,43,46,1);
                    padding-top: 38px;
                    margin-bottom: 18px;
                }
                .count {
                    font-family: ZHSCNMT--GBK1-0;
                    font-size: 14px;
                    color: #272B2E;
                    width:76px;
                    height:33px;
                    line-height: 33px;
                    border-radius:50%;
                    position: absolute;
                    top: -7px;
                    left: 24%
                }
            }
            .ser-title {
                line-height: 16px;
                font-size: 16px;
                margin-top: 15px;
                font-weight:400;
                color:rgba(97,103,107,1);
            }
        }
        .line {
            position: absolute;
            top: 5%;
            left: 14%;
            width:72%;
            height:1px;
            background: linear-gradient(to right, #6CCC54, #8363CF);
            z-index: -1;
        }
        .line1 {
            position: absolute;
            top: 5%;
            left: 14%;
            width:72%;
            height:1px;
            border: 1px dashed #fff;
            z-index: -1;
        }
        .ivu-col-span-6:nth-child(1) .img-box{
            background-color: #EBFFE5;
        }
        .ivu-col-span-6:nth-child(2) .img-box{
            background-color: #EBF5FF;
        }
        .ivu-col-span-6:nth-child(3) .img-box{
            background-color: #FFF7E5;
        }
        .ivu-col-span-6:nth-child(4) .img-box{
            background-color: #EDE5FF;
        }
        .ivu-col-span-6:nth-child(1) .count{
            border: 1px solid #EBFFE5;
            background-color: #ffffff;
        }
        .ivu-col-span-6:nth-child(2) .count{
            border: 1px solid #EBF5FF;
            background-color: #ffffff;
        }
        .ivu-col-span-6:nth-child(3) .count{
            border: 1px solid #FFF7E5;
            background-color: #ffffff;
        }
        .ivu-col-span-6:nth-child(4) .count{
            border: 1px solid #EDE5FF;
            background-color: #ffffff;
        }
    }
    .mes {
        width: 62.5%;
        padding-top: 34px;
        margin: 0 auto;
        text-align: left;
        display: flex;
        margin-bottom: 40px;
        .company-mes {
            width: 28%;
            padding: 48px 0 110px 24px;
            box-shadow:0px 3px 16px 0px rgba(0, 0, 0, 0.1);
            font-size: 16px;
            line-height: 16px;
            font-weight:400;
            color:rgba(39,43,46,1);
            .mes-item {
                display: flex;
                margin: 52px auto;
                .top {
                    margin-top: 14px;
                }
                .add {
                    display: block;
                    width: 57%;
                    line-height: 45px;
                }
            }
            span {
                color: #61676B;
            }
        }
        @media (min-width: 1200px) and (max-width: 1350px) {
            .company-mes {
                padding-right: 10px;
            }
        }
        .client-mes {
            width: 70.5%;
            margin-left: 24px;
            box-shadow:0px 3px 16px 0px rgba(0, 0, 0, 0.1);
            padding: 32px 32px 0 20px;
        }
    }
}
</style>
<style lang="less">
.client-mes{
    .ivu-form-item {
        .ivu-form-item-label {
            font-size: 16px;
            color: #272B2E;
        }
        .ivu-form-item-content {
            .limit {
                position: absolute;
                font-size: 12px;
                color: #929BA1;
                bottom: 1%;
                right: 8%;
            }
        }
        .ivu-input {
            border-radius: 0;
            height:40px;
            outline: none;
            border:1px solid rgba(225,225,225,1);
            &::placeholder {
                font-size: 16px;
                color: #929BA1;
            }
        }
        .ivu-input-wrapper{
            width: 83.5%;
        }
        textarea.ivu-input {
            height: 164px;
            border: none;
            background-color: #F9F9F9;
            resize: none;
            padding-top: 10px;
            padding-left: 15px;
        }
        .ivu-input:hover {
            border-color: #E1E1E1;
        }
        .ivu-btn-primary {
            display: block;
            width:100px;
            height:36px;
            border-radius:0px 10px 0px 10px;
            margin: 0 auto;
            font-size: 14px;
            color: #FFFFFF;
        }
        @media (min-width: 1200px) and (max-width: 1439px) {
            .ivu-input-wrapper{
                width: 100%;
            }
            .ivu-form-item-content {
                .limit {
                    right: 3%;
                }
            }
        }
    }
}
</style>



