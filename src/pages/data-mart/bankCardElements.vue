<template>
  <div id="bankCardElements">
    <div class="bankCardElements_title">
      <div class="pic">
        <img src="../images/pic2.png" alt>
      </div>
      <ul class="list">
        <li>银行卡四要素验证</li>
        <li>采用银行卡四要素的形式对签合同的主体进行实名认证</li>
        <li>
          <button class="btn">申请试用</button>
          <button class="btn">订购套餐</button>
        </li>
      </ul>
    </div>
    <div class="content">
      <Tabs value="API">
        <TabPane label="API" name="API" class="API">
          <Anchor class="anchor" show-ink :affix="false" container=".goodShow">
            <AnchorLink href="#bankCardElements_API" title="银行卡四要素"/>
          </Anchor>
          <div class="goodShow-box">
            <div class="title-box">
              <p>接口地址：http://localhost:3030//bankcard/check</p>
              <p>支持格式：json</p>
              <p>请求方式：post</p>
              <p>接口备注：银行卡姓名/卡号/身份证/手机号一致性检测！实时获取结果，高效、快捷 !</p>
            </div>
            <div class="goodShow">
              <div id="bankCardElements_API">
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_bankCardElements_API"
                  :data="data_bankCardElements_API"
                  height="545"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">示例代码</div>
                <div class="example_code">
                    @RunWith(SpringRunner.class)<br>
                    @SpringBootTest(classes = MockPortalMain.class)<br>
                    public class BankCardTest {<br>
                        private HttpUtil httpUtil;<br>
                        private String mockDataPath = "/usr/local/tomcat/project/emergency-server/data/mock/";<br>
                        private String mockAppId = "0cd2a0dd028f46158d2774e6ae5a40ee";<br>
                        private String mockAppSecret = "9a2d9d9c0ecd4b2b8ad3aea1a47694aa6db5326706f045d8b7a468ac9e9acb2d";<br>
                        private String mockUrl = "http://localhost:3030/";<br>
                        private Map&lt;String, String&gt; headers;<br>
                        private Map&lt;String, String&gt; querys;<br>
                        private JSONObject params;<br>
                    @Before<br>
                        public void initTests() {<br>
                            this.httpUtil = new HttpUtil();<br>
                            this.headers = new HashMap&lt;&gt;();<br>
                            this.headers.put("Content-Type", "application/json");<br>
                            this.querys = new HashMap&lt;&gt;();<br>
                            this.params = new JSONObject();<br>
                        }<br>
                        @Test<br>
                        public void testBankCardIdentity () throws Exception {<br>
                            params = new JSONObject();<br>
                            params.put("name", "刘美胜奇");<br>
                            params.put("identityCode", "430381199402141013");<br>
                            params.put("bankcardNumber", "6212261202027241463");<br>
                            params.put("phoneNumber", "15757125631");<br>
                            params.put("appId", this.mockAppId);<br>
                            params.put("appSecret", this.mockAppSecret);<br>
                            HttpResponse response = httpUtil.doPost(this.mockUrl,<br>
                                    "/bankcard/check",<br>
                                    "POST",<br>
                                    headers,<br>
                                    querys,<br>
                                    params.toJSONString());<br>
                            String res = EntityUtils.toString(response.getEntity());<br>
                            JSONObject res_obj = JSON.parseObject(res);<br>
                            Assert.assertEquals("成功", res_obj.get("message").toString());<br>
                    }<br>
                    }
                </div>
              </div>
              <div class="long"></div>
            </div>
          </div>
        </TabPane>
        <TabPane label="错误码参照" name="error" class="error">
          <div class="error_content">
            <div class="title">说明</div>
            <div class="state">暂无数据，详细信息请联系客服</div>
          </div>
        </TabPane>
        <TabPane label="其他相关" name="else" class="else">
          <div>文档下载：</div>
          <div>
              <a href="http://sdk.fangxinqian.cn:3838/admin/download/doc?type=3" download>银行卡四要素</a>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
// import {AnchorLink} from 'iview'
export default {
  // components: {
  //     AnchorLink
  // },
  data() {
    return {
      columns_bankCardElements_API: [
        {
          title: "参数名称",
          key: "name"
        },
        {
          title: "参数类型",
          key: "payway"
        },
        {
          title: "参数备注",
          key: "operation"
        }
      ],
      data_bankCardElements_API: [
        {
          name: "name",
          payway: "string",
          operation: "主体真实姓名"
        },
        {
          name: "identityCode",
          payway: "string",
          operation: "主体身份证号"
        },
        {
          name: "bankcardNumber",
          payway: "string",
          operation: "主体银行卡号"
        },
        {
          name: "phoneNumber",
          payway: "string",
          operation: "主体银行卡预留手机号"
        },
        {
          name: "appId",
          payway: "string",
          operation: "应用的ID"
        },
        {
          name: "appSecret",
          payway: "string",
          operation: "应用的密码"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
#bankCardElements {
  padding: 24px;
  padding-bottom: 24px;
  width: 100%;
  height: 100%;
}
.bankCardElements_title {
  width: 100%;
  height: 16%;
  background-color: #fff;
  padding-top: 37px;
  padding-left: 24px;
  .pic {
    float: left;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 1px solid #66717a;
    background: rgba(245, 250, 255, 1);
    margin-right: 20px;
    padding-top: 22px;
    padding-left: 5px;
  }
  .list {
    float: left;
    list-style: none;
    text-align: left;
    li:nth-child(1) {
      color: #5f666b;
      font-size: 16px;
      font-weight: bold;
    }
    li:nth-child(2) {
      color: #66717a;
      font-size: 14px;
      margin-bottom: 10px;
    }
    li:nth-child(3) {
      button {
        width: 83px;
        height: 32px;
        border-radius: 4px 10px 0px 10px;
        border: 1px solid #FFAE36;
        text-align: center;
        line-height: 32px;
        outline-style: none;
        cursor: pointer;
        font-size: 12px;
        color: #000;
        background: #ffffff;
      }
      button:nth-child(1) {
        margin-right: 16px;
      }
      .btn:active{
          background-color:rgba(255,174,54,0.8);
      }
      button:hover{
          background:rgba(255,174,54,1);
          color:#ffffff;
      }
    }
  }
}
.content {
  height: 84%;
  width: 100%;
  background-color: #fff;
  margin-top: 24px;
  padding: 24px;
  text-align: left;
  .API {
    .goodShow-box {
      height: 100%;
      width: 80%;
      // width: 984px;
      float: right;
      // margin-left: 55px;
      position: relative;
      .title-box {
        // height: 20%;
        height: 225px;
        p {
          color: #66717a;
          font-size: 16px;
          padding-bottom: 10px;
          margin-bottom: 15px;
          line-height: 30px;
          border-bottom: 1px solid #e4e4e4;
        }
      }
      .goodShow {
        height: 80%;
        overflow-y: scroll;
        margin-top: 17px;
        color: #5f666b;
        font-size: 16px;
        .long {
          width: 10px;
          height: 1px;
          background-color: #fff;
          margin-top: 200px;
        }
        #bankCardElements_API {
          margin-bottom: 10px;
          .title_nav {
            margin-top: 10px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .example_code {
            height: 800px;
            border: 1px solid #e1e1e1;
            padding: 17px 170px 21px 40px;
            line-height: 19px;
          }
        }
      }
      .goodShow::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .error {
    .error_content {
      margin-top: 14px;
      width: 100%;
      min-height: 145px;
      font-size: 16px;
      color: #66717a;
      border: 1px solid #e1e1e1;
      .title {
        height: 60px;
        background-color: #efefef;
        color: #5f666b;
        font-weight: bold;
        padding-left: 40px;
        line-height: 60px;
      }
      .state {
        padding-left: 40px;
        padding-top: 34px;
      }
    }
  }
  .else {
    padding-top: 31px;
    padding-left: 64px;
    div {
      float: left;
      font-size: 16px;
      color: #5f666b;
      a{
        color:#379DE6;
      }
    }
  }
}
</style>
<style lang="less">
#bankCardElements {
  .ivu-tabs {
    height: 100%;
    .ivu-tabs-bar {
      height: 36px;
    }
    .ivu-tabs-content {
      height: 95.7%;
    }
    .ivu-tabs-tabpane {
      height: 100%;
    }
  }
  .anchor {
    float: left;
    width: 20%;
    // width: 155px;
    height: 100%;
    // text-align: right;
    padding-right: 5px;
    font-size: 14px;
    color: #5f666b;
    .ivu-anchor-link {
      margin-bottom: 15px;
    }
  }
  .ivu-anchor-ink {
    left: 145px;
  }
  #bankCardElements_API {
    .table {
      th {
        height: 46px;
      }
      td {
        height: 83px;
      }
    }
  }


  .btn{
    opacity:0;
  }
  .ivu-tabs-bar {
    border-bottom: 1px solid rgba(255, 174, 54, 0.3);
    box-shadow: 0px 0px 20px #a39072;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    background: #ffae36;
    color: #ffffff;
    border-radius: 4px 4px 0px 0px;
  }
  .ivu-tabs-ink-bar{
    display: none;
  }
  .ivu-table-row-hover td {
    background-color: #f9f9f9!important;
  }



}

</style>
