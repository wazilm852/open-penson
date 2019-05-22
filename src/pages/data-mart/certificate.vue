<template>
  <div id="bankCardElements">
    <div class="bankCardElements_title">
      <div class="pic">
        <img src="../../assets/pic12.jpg" alt>
      </div>
      <ul class="list">
        <li>合同存出证</li>
        <li>对签署的合同进行存证和出证</li>
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
            <AnchorLink href="#bankCardElements_API" title="合同存出证"/>
          </Anchor>
          <div class="goodShow-box">
            <div class="title-box">
              <h2 style="marginBottom:20px">一、合同存证</h2>
              <p>接口地址：http://sdk.fangxinqian.cn:3030/save/notarial；</p>
              <p>支持格式：json</p>
              <p>请求方式：post</p>
            </div>
            <div class="goodShow">
              <div id="bankCardElements_API" class="bankCardElements_API">
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_bankCardElements_API"
                  :data="data_bankCardElements_API"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回参数：</div>
                <Table
                  :columns="columns_bankCardElements_API2"
                  :data="data_bankCardElements_API2"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回示例</div>
                <div class="example_code" style="height:260px">
                  <pre>
                    <code>
                      "msg": "",
                       "data": {
                          "sha256":"84a1944a985d65e1f578b0a5c4fbdaecffd92878b5d7e1000e6094b
                           6f0632bfd",
                           "ctime": 1551337082,
                            "id": "11",
                             "sha160": "075273061d8f1c79cef83da530fbff9a8cea6c3a",
                              "md5": "37ad3ec5de047d758b86a6e995db76a0"
                        }, "status": 1
                    </code>
                  </pre>
                </div>
                <div class="title_nav">失败返回参数：</div>
                <Table
                  :columns="columns_bankCardElements_API3"
                  :data="data_bankCardElements_API3"
                  border
                  class="table"
                ></Table>
              </div>
              <div class="bankCardElements_API">
                <div class="title-box">
                  <h3 style="marginBottom:20px">二、个人主体认证</h3>
                  <p>接口地址：http://sdk.fangxinqian.cn:3030/ identify/notarial；</p>
                  <p>支持格式：json</p>
                  <p>请求方式：post</p>
                </div>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_bankCardElements_API4"
                  :data="data_bankCardElements_API4"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回参数：</div>
                <Table
                  :columns="columns_bankCardElements_API5"
                  :data="data_bankCardElements_API5"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回示例：</div>
                <div class="example_code" style="height:260px">
                  <pre>
                      <code>
                        {
                          "msg": "请求成功",
                            "data": {
                            "code": 0,
                            "ctime": 1551343527,
                            "userId": "3"
                          }, "status": 1
                        }
                      </code>
                    </pre>
                </div>
                <div class="title_nav">失败返回参数：</div>
                <Table
                  :columns="columns_bankCardElements_API6"
                  :data="data_bankCardElements_API6"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回示例1：</div>
                <div class="example_code" style="height:130px">
                  <pre>
                      <code>
                        "msg": "检验appId与appSecret失败，请与运维人员联系",
                              "status": 10003
                      </code>
                    </pre>
                </div>
                <div class="title_nav">返回示例2：</div>
                <div class="example_code" style="height:170px">
                  <pre>
                      <code>
                        {
                            "msg": "该用户已经进行过主体认证！",
                            "data": [], "status": 0
                        }
                      </code>
                    </pre>
                </div>
              </div>
              <div class="bankCardElements_API">
                <div class="title-box">
                  <h3 style="marginBottom:20px">三、企业主体认证</h3>
                  <p>接口地址：http://sdk.fangxinqian.cn:3030/ identify/notarial；</p>
                  <p>支持格式：json</p>
                  <p>请求方式：post</p>
                </div>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_bankCardElements_API7"
                  :data="data_bankCardElements_API7"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回参数：</div>
                <Table
                  :columns="columns_bankCardElements_API5"
                  :data="data_bankCardElements_API5"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回示例：</div>
                <div class="example_code" style="height:260px">
                  <pre>
                      <code>
                        {
                          "msg": "请求成功",
                            "data": {
                                "code": 0,
                                "ctime": 1551343527,
                                "userId": "3"
                          },
                          "status": 1
                        }
                      </code>
                    </pre>
                </div>
                <div class="title_nav">失败返回参数：</div>
                <Table
                  :columns="columns_bankCardElements_API6"
                  :data="data_bankCardElements_API6"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回示例1：</div>
                <div class="example_code" style="height:130px">
                  <pre>
                      <code>
                        "msg": "检验appId与appSecret失败，请与运维人员联系",
                              "status": 10003
                      </code>
                    </pre>
                </div>
                <div class="title_nav">返回示例2：</div>
                <div class="example_code" style="height:170px">
                  <pre>
                      <code>
                        {
                            "msg": "该用户已经进行过主体认证！",
                            "data": [], "status": 0
                        }
                      </code>
                    </pre>
                </div>
              </div>
              <div class="bankCardElements_API">
                <div class="title-box">
                  <h3 style="marginBottom:20px">四、企业主体认证</h3>
                  <p>接口地址：http://sdk.fangxinqian.cn:3030/export/notarial；</p>
                  <p>支持格式：json</p>
                  <p>请求方式：post</p>
                </div>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_bankCardElements_API8"
                  :data="data_bankCardElements_API8"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回参数：</div>
                <Table
                  :columns="columns_bankCardElements_API9"
                  :data="data_bankCardElements_API9"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">返回示例：</div>
                <div class="example_code" style="height:260px">
                  <pre>
                      <code>
                        {
                          "msg": "提交申请成功已经成功发送邮件通知", 
                          "data": {
                              "serialNumber": "55",
                              "code": 0,
                              "atime": 1551347551 
                          }, 
                          "status": 1
                        }
                      </code>
                    </pre>
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
            <a href="http://sdk.fangxinqian.cn:3838/admin/download/doc?type=13" download>合同存出证</a>
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
          name: "companyId",
          payway: "string",
          operation: "公司ID"
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
        },
        {
          name: "base64Content",
          payway: "string",
          operation: "合同原文内容"
        }
      ],
      columns_bankCardElements_API2: [
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
      data_bankCardElements_API2: [
        {
          name: "sha256",
          payway: "string",
          operation: "加密后的值"
        },
        {
          name: "ctime",
          payway: "string",
          operation: "时间戳"
        },
        {
          name: "id",
          payway: "string",
          operation: "合同存证ID（请牢记该ID，以便出证使用）"
        },
        {
          name: "sha160",
          payway: "string",
          operation: "加密后的值"
        },
        {
          name: "md5",
          payway: "string",
          operation: "加密后的值"
        }
      ],
      columns_bankCardElements_API3: [
        {
          title: "状态值",
          key: "status"
        },
        {
          title: "说明",
          key: "explain"
        }
      ],
      data_bankCardElements_API3: [
        {
          status: "10003",
          explain: "检验appId与appSecret失败，请于运维人员联系"
        }
      ],
      columns_bankCardElements_API4: [
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
      data_bankCardElements_API4: [
        {
          name: "companyId",
          payway: "string",
          operation: "个人ID"
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
        },
        {
          name: "name",
          payway: "string",
          operation: "主体姓名"
        },
        {
          name: "mobile",
          payway: "string",
          operation: "手机号码"
        },
        {
          name: "subjectType",
          payway: "string",
          operation: "主体类型(0:个人,1:企业)"
        },
        {
          name: "certifyNumber",
          payway: "string",
          operation: "身份证号码"
        },
        {
          name: "certifyFront",
          payway: "string",
          operation: "base64(身份证正面照)"
        },
        {
          name: "certifyBack",
          payway: "string",
          operation: "base64(身份证反面照)"
        }
      ],
      columns_bankCardElements_API5: [
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
      data_bankCardElements_API5: [
        {
          name: "ctime",
          payway: "string",
          operation: "时间戳"
        },
        {
          name: "userId",
          payway: "string",
          operation: "用户ID（请牢记该ID，以便出证使用）"
        }
      ],
      columns_bankCardElements_API6: [
        {
          title: "状态值",
          key: "status"
        },
        {
          title: "说明",
          key: "explain"
        }
      ],
      data_bankCardElements_API6: [
        {
          status: "10003",
          explain: "检验appId与appSecret失败，请于运维人员联系"
        },
        {
          status: "0",
          explain: "该用户已经进行过主体认证"
        },
      ],
      columns_bankCardElements_API7: [
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
      data_bankCardElements_API7: [
        {
          name: "companyId",
          payway: "string",
          operation: "公司ID"
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
        },
        {
          name: "name",
          payway: "string",
          operation: "企业名称"
        },
        {
          name: "subjectType",
          payway: "string",
          operation: "主体类型(0:个人,1:企业)"
        },
        {
          name: "creditCode",
          payway: "string",
          operation: "统一社会信用代码"
        },
        {
          name: "address",
          payway: "string",
          operation: "公司详细地址"
        },
        {
          name: "legalPerson",
          payway: "string",
          operation: "法人姓名"
        },
        {
          name: "certifyNumber",
          payway: "string",
          operation: "法人身份证号"
        },
        {
          name: "certifyFront",
          payway: "string",
          operation: "base64(法人身份证正面照)"
        },
        {
          name: "certifyBack",
          payway: "string",
          operation: "base64(法人身份证反面照)"
        },
        {
          name: "businessLicense",
          payway: "string",
          operation: "base64(营业执照Base64)"
        },
      ],
      columns_bankCardElements_API8: [
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
      data_bankCardElements_API8: [
        {
          name: "companyId",
          payway: "string",
          operation: "公司ID"
        },
        {
          name: "appId",
          payway: "string",
          operation: "应用的 ID"
        },
        {
          name: "appSecret",
          payway: "string",
          operation: "应用的密码"
        },
        {
          name: "address",
          payway: "string",
          operation: "公司详细地址"
        },
        {
          name: "evidences",
          payway: "string",
          operation: "存证返回的id"
        },
        {
          name: "notaryCount",
          payway: "string",
          operation: "出证合同要一式几份"
        },
        {
          name: "isExpress",
          payway: "string",
          operation: "是否邮寄（0为否，1为是）"
        },
        {
          name: "name",
          payway: "string",
          operation: "委托人姓名"
        },
        {
          name: "mobile",
          payway: "string",
          operation: "委托人手机号码"
        },
        {
          name: "entrustAgree",
          payway: "string",
          operation: "base64（委托同意书Base64）"
        },
        {
          name: "applyForm",
          payway: "string",
          operation: "base64（公证申请表照片Base64）"
        },
      ],
      columns_bankCardElements_API9: [
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
      data_bankCardElements_API9: [
        {
          name: "ctime",
          payway: "string",
          operation: "时间戳"
        },
        {
          name: "serialNumber",
          payway: "string",
          operation: "序列号"
        }
      ],
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
      // margin-left: 55px;
      position: relative;
      .title-box {
        // height: 20%;
        height: 225px;
        margin-top: 5px;
        margin-bottom: 5px;
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
        .bankCardElements_API {
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
      a {
        color: #379de6;
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
  .bankCardElements_API {
    .table {
      th {
        height: 46px;
      }
      td {
        height: 83px;
      }
    }
  }
  .btn {
    opacity: 0;
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
  .ivu-tabs-ink-bar {
    display: none;
  }
  .ivu-table-row-hover td {
    background-color: #f9f9f9 !important;
  }
}

</style>
