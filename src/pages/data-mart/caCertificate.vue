<template>
  <div id="caCertificate">
    <div class="caCertificate_title">
      <div class="pic">
        <img src="../images/pic3.png" alt>
      </div>
      <ul class="list">
        <li>Ca证书</li>
        <li>国家权威数字证书</li>
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
            <AnchorLink href="#caCertificate_API" title="Ca证书"/>
          </Anchor>
          <div class="goodShow-box">
            <div class="title-box">
              <p>接口地址：http://sdk.fangxinqian.cn:3030/sign/online</p>
              <p>支持格式：json</p>
              <p>请求方式：post</p>
              <p>接口备注：国家权威数字证书</p>
            </div>
            <div class="goodShow">
              <div id="caCertificate_API">
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_caCertificate_API"
                  :data="data_caCertificate_API"
                  height="1211"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">示例代码</div>
                <div class="example_code">
                  @Test<br>
                  public void testRequireCACertificate () {<br>
                  JksCore jksCore = new JksCore();<br>
                  RequireCACertificate requireCACertificate = new RequireCACertificate();<br>
                  CACertificateRequire caCertificateRequire = new CACertificateRequire();<br>
                  caCertificateRequire.setAppId("d032b434a05f4ce4a15707d4d99cc205")<br>
                  .setAppSecret("916c6f538a894643a75ab30830112fe19b63f20e4f28451781c2248bbefced5d")<br>
                  .setHost("http://sdk.fangxinqian.cn:3030")<br>
                  .setPath("/cert/generate")<br>
                  .setName("limou")<br>
                  .setIdentityCode("123123123123123123")<br>
                  .setEmail("liumapp.com@gmail.com")<br>
                  .setOrganization("这里填写贵公司名称")<br>
                  .setOrganizationUnit("这里填写贵部门名称")<br>
                  .setCertAlias("ca-cert-alias2")<br>
                  .setCertPassword("123123123")<br>
                  .setKeystoreName("demo.ks")<br>
                  .setStorepass("123456")<br>
                  .setKeystorePath(this.jksSavePath);<br>
                  JSONObject result = jksCore.doJob(requireCACertificate, caCertificateRequire);<br>
                  Assert.assertEquals("success", result.get("msg"));<br>
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
            <a href="http://sdk.fangxinqian.cn:3838/admin/download/doc?type=2" download>Ca证书验证</a>
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
      columns_caCertificate_API: [
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
      data_caCertificate_API: [
        {
          name: "AppId",
          payway: "string",
          operation: "应用的ID"
        },
        {
          name: "AppSecret",
          payway: "string",
          operation: "应用密码"
        },
        {
          name: "Host",
          payway: "string",
          operation: "网关地址"
        },
        {
          name: "Path",
          payway: "string",
          operation: "证书路径"
        },
        {
          name: "Name",
          payway: "string",
          operation: "证书拥有者姓名"
        },
        {
          name: "dentityCode",
          payway: "string",
          operation: "证书拥有者的身份证号码"
        },
        {
          name: "Email",
          payway: "string",
          operation: "证书拥有者的邮箱"
        },
        {
          name: "Organization",
          payway: "string",
          operation: "证书拥有者的公司名称"
        },
        {
          name: "OrganizationUnit",
          payway: "string",
          operation: "证书拥有者所在的公司部门"
        },
        {
          name: "CertAlias",
          payway: "string",
          operation: "生成证书"
        },
        {
          name: "CertPassword",
          payway: "string",
          operation: "证书的密码"
        },
        {
          name: "KeystoreName",
          payway: "string",
          operation: "证书容器的名称"
        },
        {
          name: "Storepass",
          payway: "string",
          operation: "证书容器的密码"
        },
        {
          name: "KeystorePath",
          payway: "string",
          operation: "证书容器的存放路径"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
#caCertificate {
  padding: 24px;
  padding-bottom: 24px;
  width: 100%;
  height: 100%;
}
.caCertificate_title {
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
        #caCertificate_API {
          margin-bottom: 10px;
          .title_nav {
            margin-top: 10px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .example_code {
            height: 461px;
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
#caCertificate {
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
  #caCertificate_API {
    .table {
      th {
        height: 48px;
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
