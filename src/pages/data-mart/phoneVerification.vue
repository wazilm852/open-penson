<template>
  <div id="phoneVerification">
    <div class="phoneVerification_title">
      <div class="pic">
        <img src="../images/pic7.png" alt>
      </div>
      <ul class="list">
        <li>全网手机三要素验证</li>
        <li>对签合同的个人主体进行实名认证</li>
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
            <AnchorLink href="#phoneVerification_API" title="全网手机三要素验证"/>
          </Anchor>
          <div class="goodShow-box">
            <div class="title-box">
              <p>接口地址：http://sdk.fangxinqian.cn:3030/phone/check</p>
              <p>支持格式：json</p>
              <p>请求方式：post</p>
              <p>对签合同的个人主体进行实名认证</p>
            </div>
            <div class="goodShow">
              <div id="phoneVerification_API">
                <div class="title_nav">加载依赖：</div>
                <div class="text">&lt;dependency&gt;
                  <br>&lt;groupId&gt;com.liumapp.qtools.http&lt;/groupId&gt;
                  <br>&lt;artifactId&gt;qtools-http&lt;/artifactId&gt;
                  <br>&lt;version&gt;v1.2.6&lt;/version&gt;
                  <br>&lt;/dependency&gt;
                </div>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_phoneVerification_API"
                  :data="data_phoneVerification_API"
                  height="459"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">示例代码</div>
                <div class="example_code">public class PhoneTest {
                  <br>private HttpTool httpTool;
                  <br>private String mockDataPath = "/usr/local/tomcat/project/emergency-server/data/mock/";
                  <br>private String mockAppId = "This is a appid";
                  <br>private String mockAppSecret = " This is a appsecret ";
                  <br>private String mockUrl = "http:// sdk.fangxinqian.cn:3030/";
                  <br>private Map&lt;String, String&gt; headers;
                  <br>private Map&lt;String, String&gt; querys;
                  <br>private JSONObject params;
                  <br>@Before
                  <br>public void initTests() {
                  <br>this.httpTool = new HttpTool();
                  <br>this.headers = new HashMap&lt;&gt;();
                  <br>this.headers.put("Content-Type", "application/json");
                  <br>this.querys = new HashMap&lt;&gt;();
                  <br>this.params = new JSONObject();
                  <br>}
                  <br>@Test
                  <br>public void testPhone () throws Exception {
                  <br>params = new JSONObject();
                  <br>//手机号持有人姓名
                  <br>params.put("name", "姓名");
                  <br>//手机号持有人预留身份证号码
                  <br>params.put("identityNumber", "43038********41013");
                  <br>//手机号
                  <br>params.put("phone", "15757****31");
                  <br>params.put("appId", this.mockAppId);//应用id
                  <br>params.put("appSecret", this.mockAppSecret);//应用secret
                  <br>HttpResponse response = httpTool.doPost(this.mockUrl,
                  <br>"/phone/check",
                  <br>"POST",
                  <br>headers,
                  <br>querys,
                  <br>params.toJSONString());
                  <br>String res = EntityUtils.toString(response.getEntity());
                  <br>JSONObject res_obj = JSON.parseObject(res);
                  <br>System.out.println(res_obj.toJSONString());
                  <br>Assert.assertEquals("成功", res_obj.get("message").toString());
                  <br>}
                  <br>}
                  <br>JSONObject res_obj = JSON.parseObject(res);
                  <br>System.out.println(res_obj.toJSONString());
                  <br>Assert.assertEquals("成功", res_obj.get("message").toString());
                  <br>}
                  <br>}
                </div>
                <div class="title_nav">返回结果：</div>
                <div class="example_code example_code2">{
                  <br>"code":"10000",
                  <br>
                  "data":{"state":"1"},
                  <br>"seqNo":"865N9Y521811261623",
                  <br>"message":"成功"
                  <br>}
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
          <div><a href="http://sdk.fangxinqian.cn:3838/admin/download/doc?type=7" download>全网手机三要素验证接口文档</a></div>
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
      columns_phoneVerification_API: [
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
      data_phoneVerification_API: [
        {
          name: "name",
          payway: "string",
          operation: "姓名"
        },
        {
          name: "identityNumber",
          payway: "string",
          operation: "手机号持有人预留身份证号码"
        },
        {
          name: "phone",
          payway: "string",
          operation: "手机号"
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
#phoneVerification {
  padding: 24px;
  padding-bottom: 24px;
  width: 100%;
  height: 100%;
}
.phoneVerification_title {
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
        border: 1px solid #ffae36;
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
      .btn:active {
        background-color: rgba(255, 174, 54, 0.8);
      }
      button:hover {
        background: rgba(255, 174, 54, 1);
        color: #ffffff;
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
        #phoneVerification_API {
          margin-bottom: 10px;
          .text {
            margin-top: 10px;
          }
          .title_nav {
            margin-top: 10px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .example_code {
            height: 904px;
            border: 1px solid #e1e1e1;
            padding: 17px 170px 21px 40px;
            line-height: 19px;
          }
          .example_code2 {
            height: 154px;
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
#phoneVerification {
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
    // width: 165px;
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
    left: 155px;
  }
  #phoneVerification_API {
    .table {
      .ivu-table th {
        height: 43px;
      }
      .ivu-table td {
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
