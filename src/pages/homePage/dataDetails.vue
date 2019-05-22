<template>
    <div class="dataDetails">
        <div class="nav">
            <span class="return"><Icon type="ios-arrow-back" /> 返回</span>
            合同签署接口数据详情
        </div>
        <div class="content">
            <div class="echarts">
                <div class="title">接口使用详情</div>
                <div class="body">
                    <div class="select">
                        <span class="text" v-for="(item, index) in textList">{{item}}</span>
                        <Row class="dateScelct">
                            <Col span="12">
                                <DatePicker type="daterange" placement="bottom" placeholder="开始时间 —— 结束时间"></DatePicker>
                            </Col>
                        </Row>
                    </div>
                    <div id="myChart"></div>
                </div>
            </div>
            <div class="statistics">
                <div class="title">历史充值统计</div>
                <ul>
                    <li class="left">
                        <p>48758</p>
                        <div>累计充值份数（份）</div>
                    </li>
                    <li>
                        <p>97</p>
                        <div>累计充值次数（次）</div>
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data () {
        return {
            textList: ['近1周','近15天','近1个月'],
        }
    },
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['2019-03-02', '2019-03-03', '2019-03-04', '2019-03-05', '2019-03-06', '2019-03-07', '2019-03-08']
                },
                yAxis: {
                    type: 'value'
                },
                series : [
                    {
                        name:'订单流入总数',
                        type:'line',
                        stack: '总量',
                        areaStyle: {
                            normal: {
                                color :{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#A4D9FF' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#fff' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        itemStyle : { 
                            normal : { 
                                color:'#A4D9FF', //改变折线点的颜色
                                backgroundColor: '#A4D9FF',
                                size: 20,
                                lineStyle:{ 
                                    color:'#A4D9FF' //改变折线颜色
                                } 
                            } 
                        },
                        data:[80, 220, 100, 165, 105, 280, 75]
                    }
                ]
            });
        }
    },
}
</script>
<style lang="less" scoped>
.dataDetails{
    width: 100%;
    height: 100%;
    min-width: 1666px;
    background-color: #EDF0F5;
    .nav{
        width: 100%;
        height: 64px;
        background-color: #fff;
        text-align: center;
        line-height: 64px;
        color:#FFAF1F;
        font-size:16px;
        position: relative;
        .return{
            color:#848C91;
            position: absolute;
            top:26px;
            left:24px;
            line-height: 0;
            cursor: pointer;
        }
        .return:hover{
            color:#FFAF1F;
        }
    }
    .content{
        width: 100%;
        height: 100%;
        padding: 24px;
        .echarts{
            .title{
                background-color: #F7FAFC;
                padding-left: 24px;
                width: 100%;
                height: 56px;
                line-height: 56px;
                font-size: 16px;
                color:#272B2E;
                border-bottom:1px solid #D7DFE6;
                text-align: left;
            }
            .body{
                width: 100%;
                height: 512px;
                padding: 27px;
                background-color: #fff;
                .select{
                    height: 38px;
                    text-align: left;
                    display:flex;
                    position: relative;
                    padding-left: 54px;
                    .text{
                        font-size:14px;
                        color:#272B2E;
                        margin-right: 24px;
                        line-height: 38px;
                        cursor: pointer;
                    }
                    .dateScelct{
                        width: 304px;
                        height: 38px;
                        .ivu-date-picker{
                            width: 304px;
                            height: 38px;
                            .ivu-input{
                                font-size:14px;
                            }
                        }
                    }
                }
                #myChart{
                    width: 1396px;
                    height: 448px;
                }
            }
        }
        .statistics{
            width: 100%;
            height: 302px;
            background-color: #fff;
            margin-top: 24px;
            .title{
                width: 100%;
                height: 56px;
                background-color: #F7FAFC;
                padding-left: 24px;
                font-size:16px;
                color:#272B2E;
                line-height: 56px;
                text-align: left;
                border-bottom:1px solid #D7DFE6;
            }
            ul{
                width: 100%;
                height: 246px;
                li{
                    float: left;
                    width: 50%;
                    height: 100%;
                    text-align: center;
                    list-style: none;
                    p{
                        font-size:30px;
                        color:#FFB01E;
                        margin-top: 76px;
                        margin-bottom: 55px;
                        line-height: 0;
                    }
                    div{
                        font-size:16px;
                        line-height: 0;
                        color:#272B2E;
                    }
                }
                .left{
                    border-right:1px solid #D7DFE6;
                }
            }
        }
    }
    
}
</style>
<style lang="less">
.dataDetails{
    .ivu-date-picker-rel{
        height: 38px;
        .ivu-input-wrapper{
        height: 38px;
        .ivu-input{
            height: 38px;
            text-align:center;
            padding-right: 0;
        }
        .ivu-input-suffix{
            width: 51px;
            left: 0;
            right: auto;
            border-right:1px solid #DADFE3;
            .ivu-icon{
            height: 38px;
            line-height: 38px;
            }
        }
        }
    }
}
</style>

