<template>
  <div id="contractSigning">
    <div class="contractSigning_title">
      <div class="pic">
        <img src="../images/pic1.png" alt>
      </div>
      <ul class="list">
        <li>合同签署</li>
        <li>为您提供从合同上传、签署、证书等数据</li>
        <li>
          <button class="btn">申请试用</button>
          <button class="btn">订购套餐</button>
        </li>
      </ul>
    </div>
    <div class="content">
      <Tabs value="API">
        <TabPane label="API" name="API" class="API">
          <Anchor class="anchor" show-ink :affix="false" container=".goodShow" href="#createBox">
            <AnchorLink href="#createBox" title="生成证书容器"/>
            <AnchorLink href="#createCredential" title="生成正式证书"/>
            <AnchorLink href="#firstSignature" title="签署第一个签名"/>
            <AnchorLink href="#secondSignature" title="签署第二个签名"/>
            <AnchorLink href="#autoCreate" title="自动生成企业签章"/>
          </Anchor>
          <div class="goodShow-box">
            <div class="title-box">
              <p>接口地址：http://sdk.fangxinqian.cn:3030/sign/online</p>
              <p>支持格式：json</p>
              <p>请求方式：post</p>
              <p>接口备注：为您提供从合同上传、签署、证书等数据</p>
            </div>
            <div class="goodShow">
              <div id="createBox">
                <div class="nav">生成证书容器（GenerateContainer）</div>
                <p class="text">
                  首先在sdk demo的junit单元下生成证书容器，进行证书的存放。并且给证书容器设置一个名称（参数KeyStorePd），方便进行操作。
                  所有的操作均在jks core中完成，签署之前首先生成盛放证书的jks容器，那么生成证书容器所需参数如下：
                </p>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_createBox"
                  :data="data_createBox"
                  height="711"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">示例代码</div>
                <div class="example_code">@Test
                  <br>public void testGenerateContainer () {
                  <br>JksCore jksCore = new JksCore();
                  <br>GenerateJksContainer generateJksContainer = new GenerateJksContainer();
                  <br>GenerateJksContainerRequire generateJksContainerRequire = new GenerateJksContainerRequire();
                  <br>generateJksContainerRequire.setSavePath(this.jksSavePath)
                  <br>.setKeyStoreName("demo.ks")
                  <br>.setKeyStorePd("123456")//container password
                  <br>.setFcAlias("first-cert")//alias of first certificate
                  <br>.setFcPassword("123123")//password of first certificate
                  <br>.setFcName("liumapp")
                  <br>.setFcCountry("CN")
                  <br>.setFcProvince("ZJ")
                  <br>.setFcCity("Hangzhou");
                  <br>JSONObject result = jksCore.doJob(generateJksContainer, generateJksContainerRequire);
                </div>
              </div>
              <div id="createCredential">
                <div class="nav">生成正式证书（testRequireCACertificate</div>
                <p class="text">在证书容器内生成正式证书进行测试。证书存放在jks容器里，通过设置证书名称来查找证书；生成正式证书所需参数如下：</p>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_createCredential"
                  :data="data_createCredential"
                  height="1211"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">示例代码</div>
                <div class="example_code">@Test
                  <br>public void testRequireCACertificate () {
                  <br>JksCore jksCore = new JksCore();
                  <br>RequireCACertificate requireCACertificate = new RequireCACertificate();
                  <br>CACertificateRequire caCertificateRequire = new CACertificateRequire();
                  <br>caCertificateRequire.setAppId("d032b434a05f4ce4a15707d4d99cc205")
                  <br>.setAppSecret("916c6f538a894643a75ab30830112fe19b63f20e4f28451781c2248bbefced5d")
                  <br>.setHost("http://sdk.fangxinqian.cn:3030")
                  <br>.setPath("/cert/generate")
                  <br>.setName("limou")
                  <br>.setIdentityCode("123123123123123123")
                  <br>.setEmail("liumapp.com@gmail.com")
                  <br>.setOrganization("这里填写贵公司名称")
                  <br>.setOrganizationUnit("这里填写贵部门名称")
                  <br>.setCertAlias("ca-cert-alias2")
                  <br>.setCertPassword("123123123")
                  <br>.setKeystoreName("demo.ks")
                  <br>.setStorepass("123456")
                  <br>.setKeystorePath(this.jksSavePath);
                  <br>JSONObject result = jksCore.doJob(requireCACertificate, caCertificateRequire);
                  <br>Assert.assertEquals("success", result.get("msg"));
                  <br>}
                </div>
              </div>
              <div id="firstSignature">
                <div class="nav">签署第一份带时间戳签名的证书（SignFirstCertificateWithTimeStamp）</div>
                <p class="text">给第一份证书上添加时间戳服务SignFirstCertificateWithTimeStamp；</p>
                <div class="title_nav">请求参数：</div>
                <Table
                  :columns="columns_firstSignature"
                  :data="data_firstSignature"
                  height="628"
                  border
                  class="table"
                ></Table>
                <div class="title_nav">示例代码</div>
                <div class="example_code">@Test
                  <br>public void testSignFirstCertificateWithTimeStampToPdf () {
                  <br>if (debug) {
                  <br>JksCore jksCore = new JksCore();
                  <br>SignPdfWithTimeStamp signPdfWithTimeStamp = new
                  <br>SignPdfWithTimeStamp();
                  <br>SignPdfWithTimeStampRequire signPdfWithTimeStampRequire = new SignPdfWithTimeStampRequire();
                  <br>signPdWithTimeStampRequire.setKsPath(this.jksSavePath)
                  <br>.setKsName("demo.ks")
                  <br>.setKsPassword("123456".toCharArray())
                  <br>.setCertAlias("alias-custom2")
                  <br>省略···
                  <br>.setSignFieldName("firstSignatureArea")
                  <br>.setSignPicPath(this.jksSavePath + "/" + "me.jpg")
                  <br>.setAppId("your appid here")
                  <br>.setAppSecret("your app secret here")
                  <br>.setTimeStampServer("http://sdk.fangxinqian.cn:3030/timestamp/require");
                  <br>JSONObject result = jksCore.doJob(signPdfWithTimeStamp, signPdfWithTimeStampRequire);
                  <br>省略···
                </div>
                <div class="title_nav">自定义参数示例：</div>
                <div class="example_custom">
                  <img src="../images/text1.png" alt>
                </div>
              </div>
              <div id="secondSignature">
                <div class="nav">签署第二份带时间戳签名的证书（SignSecondCertificateToPdf）</div>
                <p class="text">给第一份证书上添加时间戳服务SignFirstCertificateWithTimeStamp；</p>
                <div class="title_nav">示例代码</div>
                <div class="example_code">@Test
                  <br>public void testSignSecondCertificateWithTimeStampToPdf () {
                  <br>if (debug) {
                  <br>JksCore jksCore = new JksCore();
                  <br>SignPdfWithTimeStamp signPdfWithTimeStamp = new
                  <br>SignPdfWithTimeStamp();
                  <br>SignPdfWithTimeStampRequire signPdfWithTimeStampRequire = new SignPdfWithTimeStampRequire();
                  <br>signPdfWithTimeStampRequire.setKsPath(this.jksSavePath)
                  <br>.setKsName("demo.ks")
                  <br>.setKsPassword("123456".toCharArray())
                  <br>.setCertAlias("alias-custom3")
                  <br>省略···
                </div>
                <div class="text">提示：如果您希望改变PDF合同上签章图片的大小，只需要调整以下参数即可：
                  <br>.setFirstX(50)
                  <br>.setFirstY(50)
                  <br>.setSecondX(100)
                  <br>.setSecondY(100)
                  <br>FirstX和FirstY代表XY坐标轴体系（原点为合同当前页面的左下角）第一个点坐标，另外一个代表第二个点的坐标，第一个点做为一个矩形
                  <br>的左下角，第二点做为该矩形的右上角，签章图片将会被绘制在该矩形区域并自动填充。
                  <br>
                </div>
              </div>
              <div id="autoCreate">
                <div class="nav">自动生成企业签章（GenerateCompanySearl）</div>
                <p class="text">
                  如果企业的用户，可以根据企业提供的企业名称自动生成企业签章（testGenerateCompanySearl）。
                  生成签章的方式有三种：1、生成宋体签章；2、生成系统默认字体签章；3、生成自定义签章；
                </p>
                <div class="title_nav">示例代码</div>
                <div class="example_code">@Test
                  <br>public void test() throws IOException {
                  <br>//生成宋体签章
                  <br>SealTool.generateSealFile("浙江某某科技有限公司", jksSavePath + "/test.png");
                  <br>Assert.assertEquals(true, FileTool.isFileExists(jksSavePath + "/test.png"));
                  <br>//生成系统默认字体签章
                  <br>SealTool.generateDefaultSealFile("浙江宋体某某科技有限公司", jksSavePath + "/test2.png");
                  <br>Assert.assertEquals(true, FileTool.isFileExists(jksSavePath + "/test2.png"));
                  <br>//生成自定义字体签章
                  <br>SealTool.generateSealFileWithSpecifiedFonts("浙江黑体某某科技有限公司", jksSavePath + "/test3.png", "黑体");
                  <br>Assert.assertEquals(true, FileTool.isFileExists(jksSavePath + "/test3.png"));
                  <br>try {
                  <br>SealTool.generateSealFile("某某企业2号", jksSavePath + "/test.jpg");
                  <br>} catch (IOException e) {
                  <br>Assert.assertEquals("save file must be a png file", e.getMessage());
                  <br>try {
                  <br>SealTool.generateSealFile("很长很长很长很长很长很长很长很长很长的企业名称呀呀呀呀", jksSavePath + "/test.png");
                  <br>} catch (IOException e) {
                  <br>Assert.assertEquals("company name can not exceed 25 chars", e.getMessage());
                  <br>}
                  <br>}
                  <br>}
                  <br>
                </div>
                <div class="title_nav">注意事项</div>
                <p class="text">1. 生成的签章图片为png格式，所以保存文件路径也要是png结尾的；
                  <br>2. 企业名称不能超过25个字符；
                </p>
                <div class="title_nav">常见问题与解决</div>
                <p
                  class="text"
                >1. java-1.8/jre/lib/i386/libfontmanager.so: libgcc_s.so.1: 无法打开共享对象文件: 没有那个文件或目录？解决方案：需要安装lib32gcc1包。
                  <br>一般os安装的是64位的，所以缺省是装libgcc这个包。但java一般还是会用32位的包，因此就会存在上面的问题（系统提供的libgcc_s.so.1
                  <br>是64位的，不是java启动需要的32位的），安装一个32位的就好了。
                  <br>说明一下：如果你的服务器之前就装了libgcc.x86_64 的话，就会报一个 Multilib version problems found.
                  <br>This often means that the root cause is something else and multilib version checking is just pointing out that there is a problem.
                  <br>这个是原因是因为多个库不能共存，不过更新的话也不行，但是可以在安装命令后面加上--setopt=protected_multilib=false。
                  <br>2. 生成的公章上面的字全被换成了框框（线上服务器缺少字体文件）？
                  <br>解决方案： 首先在线上服务器使用命令which java找到jre安装目录，假设为 /usr/local/java/jre/；那么将要使用的中文字体文件
                  <br>（可以从本地系统查找到，一般使用宋体，英文名称为simsun.ttf）拷贝到 /usr/local/java/jre/lib/fonts/ 目录下即可。
                </p>
                <div class="title_nav">签署区域示例</div>
                <p class="text text_img">testSignFirstCertificateToPdf签署第一份证书的区域坐标代码如下：
                  <br>.setFirstX(50)
                  <br>.setFirstY(50)
                  <br>.setSecondX(100)
                  <br>.setSecondY(100)
                  <br>.setPageNum(1)
                  <br>.setSignPicPath(this.jksSavePath + "/" + "me.jpg");
                  <br>me.jpg图片如下：
                  <br>
                  <img src="../images/name.png" alt>
                  <br>testSignSecondCertificateToPdf签署第二份证书的区域坐标代码如下：
                  <br>.setFirstX(300)
                  <br>.setFirstY(300)
                  <br>.setSecondX(350)
                  <br>.setSecondY(350)
                  <br>.setPageNum(1)
                  <br>.setSignPicPath(this.jksSavePath + "/" + "girl.jpg");
                  <br>girl.jpg图片如下：
                  <br>
                  <img src="../images/company.png" alt>
                  <br>那么这两份证书签署在同一页的位置如下图所示：
                  <br>
                  <img src="../images/contract.png" alt>
                </p>
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
          <div>文档下载 (Java)：</div>
          <div style="margin-right:50px">
            <a href="http://sdk.fangxinqian.cn:3838/admin/download/doc?type=20" download>
              放心签电子合同v1.5.0技术开发文档.pdf<br>
              Java sdk-demov1.5.0.zip
            </a>
          </div>
          <div>文档下载 (php)：</div>
          <div>
            <a href="http://sdk.fangxinqian.cn:3838/admin/download/doc?type=21" download>
              放心签PHP API2.0技术对接文档.pdf
            </a> 
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
      columns_createBox: [
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
      data_createBox: [
        {
          name: "KeyStoreName",
          payway: "string",
          operation: "容器名字"
        },
        {
          name: "KeyStorePd",
          payway: "string",
          operation: "容器密码"
        },
        {
          name: "FcAlias",
          payway: "string",
          operation: "第一张证书命名"
        },
        {
          name: "FcPassword",
          payway: "string",
          operation: "第一张证书密码"
        },
        {
          name: "FcName",
          payway: "string",
          operation: "第一张证书持有者姓名"
        },
        {
          name: "FcCountry",
          payway: "string",
          operation: "第一张证书持有者所在国家"
        },
        {
          name: "FcProvince",
          payway: "string",
          operation: "第一张证书持有者所在省份"
        },
        {
          name: "FcCity",
          payway: "string",
          operation: "第一张证书持有者所在城市"
        }
      ],
      columns_createCredential: [
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
      data_createCredential: [
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
          operation: "证书容器的密码"
        },
        {
          name: "CertPassword",
          payway: "string",
          operation: "证书容器的密码"
        },
        {
          name: "KeystoreName",
          payway: "string",
          operation: "证书容器的密码"
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
      ],
      columns_firstSignature: [
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
      data_firstSignature: [
        {
          name: "KsName",
          payway: "string",
          operation: "证书容器名称"
        },
        {
          name: "KsPassword",
          payway: "string",
          operation: "证书容器密码"
        },
        {
          name: "CertAlias",
          payway: "string",
          operation: "证书名称"
        },
        {
          name: "CertPassword",
          payway: "string",
          operation: "证书密码"
        },
        {
          name: "PdfSavePath",
          payway: "string",
          operation: "证书拥有者姓名"
        },
        {
          name: "PdfFileName",
          payway: "string",
          operation: "签署前PDF合同存放路径"
        },
        {
          name: "下面省略",
          payway: "下面省略",
          operation: "PDF合同名称"
        }
      ]
    };
  },
};
</script>
<style scoped lang="less">
#contractSigning {
  padding: 24px;
  padding-bottom: 24px;
  width: 100%;
  height: 100%;
}
.contractSigning_title {
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
      // float: left;
      float:right;
      // margin-left: 55px;
      position: relative;
      overflow:auto
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
        #createBox,
        #createCredential,
        #firstSignature,
        #secondSignature,
        #autoCreate {
          margin-bottom: 10px;
          .nav {
            color: #39bbaf;
            font-size: 16px;
          }
          .text {
            margin-top: 10px;
          }
          .title_nav {
            margin-top: 10px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .example_code {
            height: 360px;
            border: 1px solid #e1e1e1;
            padding: 17px 170px 21px 40px;
            line-height: 19px;
          }
        }
        #createCredential {
          .example_code {
            height: 480px;
          }
        }
        #firstSignature {
          .example_code {
            height: 440px;
          }
          .example_custom {
            height: 446px;
            text-align: center;
            padding-top: 25px;
            border: 1px solid rgba(225, 225, 225, 1);
            img {
              width: 418px;
              height: 396px;
            }
          }
        }
        #secondSignature {
          .example_code {
            height: 267px;
          }
        }
        #autoCreate {
          .example_code {
            height: 500px;
          }
          .text_img {
            img {
              margin: 30px;
              margin-left: 133px;
            }
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
      div{
          float: left;
          font-size:16px;
          color:#5F666B;
          a{
            color:#379DE6;
          }
      }
  }
}
</style>
<style lang="less">
#contractSigning {
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
    // width: 15%;
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
  #createBox {
    .table {
      th {
        height: 46px;
      }
      td {
        height: 83px;
      }
    }
  }
  #createCredential {
    .table {
      th {
        height: 48px;
      }
      td {
        height: 83px;
      }
    }
  }
  #firstSignature {
    .table {
      th {
        height: 45px;
      }
      td {
        height: 83px;
      }
    }
  }

  .ivu-anchor-link-active > .ivu-anchor-link-title{
    color:#39BBAF;
  }
  a:hover{
    color: #39BBAF;
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
