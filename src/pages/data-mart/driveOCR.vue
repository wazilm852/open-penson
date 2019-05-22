<template>
  <div id="driveOCR">
    <div class="driveOCR_title">
      <div class="pic">
        <img src="../images/pic11.png" alt>
      </div>
      <ul class="list">
        <li>行驶证OCR</li>
        <li>识别行驶证并返回信息</li>
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
            <AnchorLink href="#driveOCR_API" title="行驶证OCR"/>
          </Anchor>
          <div class="goodShow-box">
            <div class="title-box">
              <p>接口地址：http://sdk.fangxinqian.cn:3030/vehiclelicense/ocr</p>
              <p>支持格式：json</p>
              <p>请求方式：post</p>
              <p>识别行驶证并返回信息</p>
            </div>
            <div class="goodShow">
              <div id="driveOCR_API">
                <div class="title_nav">请求依赖：</div>
                <div class="text">&lt;dependency&gt;
                  <br>&lt;groupId&gt;com.liumapp.qtools.file&lt;/groupId&gt;
                  <br>&lt;artifactId&gt;qtools-file&lt;/artifactId&gt;
                  <br>&lt;version&gt;v1.2.6&lt;/version&gt;
                  <br>&lt;/dependency&gt;
                  <br>&lt;dependency&gt;
                  <br>&lt;groupId&gt;com.liumapp.qtools.http&lt;/groupId&gt;
                  <br>&lt;artifactId&gt;qtools-http&lt;/artifactId&gt;
                  <br>&lt;version&gt;v1.2.6&lt;/version&gt;
                  <br>&lt;/dependency&gt;
                </div>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_driveOCR_API"
                  :data="data_driveOCR_API"
                  height="295"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">示例代码</div>
                <div class="example_code">@RunWith(SpringRunner.class)
                  <br>@SpringBootTest(classes = MockPortalMain.class)
                  <br>public class BaiduOcrTest {
                  <br>private HttpTool httpTool;
                  <br>private String mockDataPath =
                  <br>"/usr/local/tomcat/project/emergency-server/data/mock/";
                  <br>private String mockBusinessLicenseAppId = "this is a appid";
                  <br>private String mockBusinessLicenseAppSecret = " this is a
                  <br>appsecret ";
                  <br>private String mockUrl = "http://sdk.fangxinqian.cn:3030/";
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
                  <br>this.headers = new HashMap&lt;&gt;();
                  <br>this.headers.put("Content-Type", "application/json");
                  <br>this.querys = new HashMap&lt;&gt;();
                  <br>this.params = new JSONObject();
                  <br>}
                  <br>@Test
                  <br>public void testVehicleLicenseOcr () throws Exception {
                  <br>params = new JSONObject();
                  <br>params.put("appId", this.mockVehicleAppId);
                  <br>params.put("appSecret", this.mockvehicleAppSecret);
                  <br>params.put("base64VehicleLicensePic",
                  <br>Base64FileTool.filePathToBase64(mockDataPath +
                  <br>"/pic/vehicleLicense01.jpg"));
                  <br>HttpResponse response = httpTool.doPost(this.mockUrl,
                  <br>"/vehiclelicense/ocr",
                  <br>"POST",
                  <br>headers,
                  <br>querys,
                  <br>params.toJSONString());
                  <br>String res = EntityUtils.toString(response.getEntity());
                  <br>JSONObject res_obj = JSON.parseObject(res);
                  <br>System.out.println(res_obj.toJSONString());
                  <br>}
                  <br>}
                </div>
                <div class="title_nav">返回参数：</div>
                <Table
                  :columns="columns_driveOCR_t2"
                  :data="data_driveOCR_t2"
                  height="378"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">正确的返回结果:</div>
                <div class="text">
                  {<br>
                  "log_id":2428878435417674250,<br>
                  "words_result":{<br>
                  "车辆识别代号":{<br>
                  "words":"LVVDB11B89D122246"<br>
                  },<br>
                  "住址":{<br>
                  "words":"武汉市青山区渝金30 街6017 号"<br>
                  },<br>
                  "品牌型号":{<br>
                  "words":"奇瑞牌SQR7160T116"<br>
                  },<br>
                  "发证日期":{<br>
                  "words":"20140413"<br>
                  },<br>
                  "车辆类型":{<br>
                  "words":"小型轿车"<br>
                  },<br>
                  "所有人":{<br>
                  "words":"白敏强"<br>
                  },<br>
                  "使用性质":{<br>
                  "words":"非营运"<br>
                  },<br>
                  "发动机号码":{<br>
                  "words":"FF9C13703"<br>
                  },<br>
                  "号牌号码":{<br>
                  "words":"鄂A8HB57"<br>
                  您放心的电子合同专家 服务热线：0571-56260776<br>
                  },<br>
                  "注册日期":{<br>
                  "words":"20090413"<br>
                  }<br>
                  },<br>
                  "words_result_num":10,<br>
                  "direction":0<br>
                  }<br>
                  错误
                </div>
                <div class="title_nav">错误的返回结果:</div>
                <div class="text">
                  {<br>
                  "error_msg":"IAM Certification failed",<br>
                  "error_code":14<br>
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
            <a href="http://sdk.fangxinqian.cn:3838/admin/download/doc?type=10" download>行驶证OCR</a>
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
      columns_driveOCR_API: [
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
      data_driveOCR_API: [
        {
          name: "base64BusinessLicensePic",
          payway: "string",
          operation: "行驶证图片"
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
      ],
      columns_driveOCR_t2: [
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
      data_driveOCR_t2: [
        {
          name: "log_id",
          payway: "string",
          operation: "请求标识码，随机数，唯一。"
        },
        {
          name: "words_result_num",
          payway: "string",
          operation: "应用识别结果数，表示words_result 的元素个数的ID"
        },
        {
          name: "words_result",
          payway: "string",
          operation: "识别结果数组"
        },
        {
          name: "+words",
          payway: "string",
          operation: "识别结果字符串"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
#driveOCR {
  padding: 24px;
  padding-bottom: 24px;
  width: 100%;
  height: 100%;
}
.driveOCR_title {
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
        #driveOCR_API {
          margin-bottom: 10px;
          .title_nav {
            margin-top: 10px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .example_code {
            height: 870px;
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
#driveOCR {
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
  #driveOCR_API {
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
