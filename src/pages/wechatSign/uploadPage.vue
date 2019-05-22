<template>
  <div id="upload">
    <p class="tips">上传合同({{contractList.length}}/10)</p>
    <div class="contract-list">
      <div class="contract" v-for="(item,index) in contractList" :key="index">
        <img :src="'data:image/jpeg;base64,'+item.firstImg">
        <span class="title">{{item.title}}</span>
        <div class="mutiple-area">
          <span class="title">{{item.pages}}页</span>
          <p class="hover-style">
            <span>{{item.pages}}页</span>
            <img @click="editName(index)" style="float:right;width:13px;height:13px;" src="../../assets/edt-icon.png" alt="">
          </p>
        </div>
      </div>
      <Upload
        style="height:240px;float:left"
        :show-upload-list="false"
        :action="uploadurl"
        :data="uploadData"
        :headers="{ 
          Authorization : 'Bearer',
          'Content-Type': 'application/json; charset=UTF-8'
        }"
        accept=".doc,.docx,.PDF"
        :before-upload='beforeUpload'
        :on-format-error="fileformat"
      >
        <div class="upload-div">
          <Icon type="md-add" size="64" color="#ccc"/>
        </div>
        <span class="upload-title">上传合同</span>
      </Upload>
      <div style="clear:both"></div>
    </div>
    <Form id="aticipate" style="margin-top:20px;">
      <FormItem label="参与方">
        <RadioGroup  size="large" v-model="signType" vertical>
          <Radio label="1">
            <span>
              单独签（即甲-乙、甲-乙的方式一次多人签署）
              <img class="img" src="../../assets/tip.png" alt>
              <span class="tip">例如：发起方选择该签署方式，发起一份或多份合同，
                对应的接收方分别单独签署一份或多份合同
              </span>
            </span>
          </Radio>
          <Radio label="2">
            <span>
              集体签（即甲-乙、丙、丁的方式签署）
              <img class="img" src="../../assets/tip.png" alt>
              <span class="tip">例如：发起方选择该签署方式，发起一份或多份合同，
                对应的接收方分别单独签署一份或多份合同
              </span>
            </span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <div class="signRole">
        <FormItem>
          <div class="tag">发起方</div>
          <span>
            <div class="input">{{originer.name}}</div> 
            <div class="input">{{originer.phone}}</div> 
          </span>
        </FormItem>
      </div>
      <div v-for="(item,index) in signers" class="signRole">
        <FormItem>
          <div class="tag">签署人</div>
          <span>
            <div v-if="item.signerType == 2" class="input">{{item.companyName}}</div> 
            <div v-if="item.signerType == 1" class="input">{{item.realName}}</div> 
            <div class="input">{{item.phone}}</div> 
            <div class="delete-btn" @click="deletesigenr(index)"></div>
          </span>
        </FormItem>
      </div>
    </Form>
    <div class="signRole" v-if="companyvisible">
      <div  class="tag">签署方</div>
      <Form style="margin:0 0 10px 100px" ref="companysigner" :model="companysigner" :rules="rulesigner" inline>
          <FormItem prop="companyName">
              <Input style="width:300px;margin-top:20px;" type="text" size="large" v-model="companysigner.companyName"  placeholder="请输入企业名称">
              </Input>
          </FormItem>
          <FormItem prop="realName">
              <Input style="width:300px;margin-top:20px;" type="text" size="large" v-model="companysigner.realName"  placeholder="接收人姓名">
              </Input>
          </FormItem>
          <FormItem prop="phone">
              <Input @on-blur="submit('companysigner')" style="width:300px;margin-top:20px;" type="text" size="large" v-model="companysigner.phone"  placeholder="请输入手机号码">
              </Input>
          </FormItem>
          <FormItem>
              <div style="margin-top:25px;" @click="cancelcompany" class="delete-btn"></div>
          </FormItem>
      </Form>
    </div>
    <div class="signRole" v-if="personvisible">
      <div  class="tag">签署方</div>
      <Form style="margin:0 0 10px 100px" ref="personsigner" :model="personsigner" :rules="rulesigner" inline>
          <FormItem prop="realName">
              <Input style="width:300px;margin-top:20px;" type="text" size="large" v-model="personsigner.realName"  placeholder="接收人姓名">
              </Input>
          </FormItem>
          <FormItem prop="phone">
              <Input @on-blur="submit('personsigner')" style="width:300px;margin-top:20px;" type="text" size="large" v-model="personsigner.phone"  placeholder="请输入手机号码">
              </Input>
          </FormItem>
          <FormItem>
              <div style="margin-top:25px;" @click="cancelperson" class="delete-btn"></div>
          </FormItem>
      </Form>
    </div>
    <div class="add">
      <Button @click="addcompany">+添加企业</Button>
      <Button @click="addperson">+添加个人</Button>
    </div>
    <div class="footer">
            <Button type="primary" @click="sign">发起签约</Button>
    </div>
    <Modal
      v-model="updateVisible"
      title="修改合同名称"
      @on-ok="ok"
      @on-cancel="cancel">
      <Input placeholder="请输入合同名称" v-model="newname"></Input>
    </Modal>
  </div>
</template>

<script>
import { PHONE } from "../../common/regex.js";
import http from "../../components/http.js";
import code from "../../common/code.js";
export default {
  data() {
    return {
      uploadurl: http.baseUrls + "admin/wxContract/upload",
      convertingResultSocket: http.websocketUrl,
      uploadData: {
        appId: code.appId
      },
      contractList: [],
      contractBossId: null,
      signType: "1", //签署类型 1.单独签署 2.集体签署
      signers: [],
      personsigner: {
        signerType: 1, //签署方类型，1.个人 2.企业
        phone: "",
        realName: ""
      },
      companysigner: {
        signerType: 2, //签署方类型，1.个人 2.企业
        phone: "",
        realName: "",
        companyName: ""
      },
      rulesigner: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "请输入有效企业名称", trigger: "blur" }
        ]
      },
      updateVisible: false,
      newname: null, //合同标题
      originer: {}, //发起人
      iscompany: false,
      companyvisible: false,
      personvisible: false,
      current: {} //当前修改的合同
    };
  },
  watch: {
    contractList(val) {
      console.log(val);
    }
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      http.post("admin/user/info", {}).then(res => {
        if (res.data.code == 200) {
          this.originer = res.data.data;
        }
      });
    },
    deletesigenr(index) {
      this.signers.splice(index, 1);
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (name == "personsigner") {
            this.signers.push(this.personsigner);
            this.personvisible = false;
            this.personsigner = {
              signerType: 1, //签署方类型，1.个人 2.企业
              phone: "",
              realName: ""
            };
          } else {
            this.signers.push(this.companysigner);
            this.companyvisible = false
            this.companysigner = {
              signerType: 2, //签署方类型，1.个人 2.企业
              phone: "",
              realName: "",
              companyName: ""
            };
          }
        } else {
        }
      });
    },
    editName(item) {
      this.current = item;
      console.log(this.current);
      this.updateVisible = true;
    },
    ok() {
      if (this.newname) {
        return http
          .post("admin/wxContract/updateTitle", {
            appId: code.appId,
            contractCoreId: this.contractList[this.current].contractCoreId,
            title: this.newname
          })
          .then(res => {
            console.log(res);
            if (res.data.code == 10001) {
              this.$Message.success("修改成功！");
              this.contractList[this.current].title = this.newname;
              this.newname = null;
            }
          });
      } else {
        this.$Message.success("请输入合同名称！");
      }
    },
    cancel() {},
    addcompany() {
      this.iscompany = true;
      this.companyvisible = true;
      this.companysigner = {
        signerType: 2, //签署方类型，1.个人 2.企业
        phone: "",
        realName: "",
        companyName: ""
      };
    },
    addperson() {
      this.iscompany = false;
      this.personvisible = true;
      this.personsigner = {
        signerType: 1, //签署方类型，1.个人 2.企业
        phone: "",
        realName: ""
      };
    },
    cancelcompany() {
      this.companyvisible = false;
      this.companysigner = {
        signerType: 2, //签署方类型，1.个人 2.企业
        phone: "",
        realName: "",
        companyName: ""
      };
    },
    cancelperson() {
      this.personvisible = false;
      this.personsigner = {
        signerType: 1, //签署方类型，1.个人 2.企业
        phone: "",
        realName: ""
      };
    },
    initSocket() {
      let _this = this;
      let wsName = this.convertingResultSocket + _this.uploadData.websocketId;
      this.ws = new WebSocket(wsName);
      this.ws.onopen = function() {};
      this.ws.onmessage = function(evt) {
        console.log(evt)
        let contract = JSON.parse(evt.data).data;
        _this.contractList.push(contract);
      };
    },
    beforeUpload(file) {
      console.log(file);
      let randomid = Math.random()
        .toString()
        .slice(-6);
      let timestamp = Date.parse(new Date()).toString();
      let random_number = timestamp + randomid;
      this.uploadData.websocketId = random_number;
      this.initSocket();
      this.uploadData.title = file.name.split(".")[0];
      this.uploadData.fileType = file.name.split(".")[1];
      if (this.contractBossId) {
        this.uploadData.contractBossId = this.contractBossId;
      }
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        _this.uploadData.base64 = reader.result;
      };
      http
        .post("admin/wxContract/chkbalance", {
          appId: code.appId
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 10001) {
            http.post("admin/wxContract/upload", this.uploadData).then(res => {
              console.log(res);
              this.contractBossId = res.data.data.contractBossId;
            });
          } else {
            this.$Message.warning("您的账户余额不足，请先去购买套餐哦！");
          }
        });
      return false;
    },
    fileformat(file, fileList) {
      this.$Message.warning("请上传正确类型的合同文件!");
    },
    sign() {
      return http
        .post("admin/signer/addSigners", {
          appId: code.appId,
          contractBossId: this.contractBossId,
          signType: this.signType,
          signerList: this.signers
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 10001) {
            this.$router.push("/sign");
            this.$router.push({
              path: "/sign",
              query: { contractBossId: res.data.data.contractBossId }
            });
          } else {
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
#upload {
  .delete-btn {
    display: inline-block;
    background: url(../../assets/del.png) no-repeat center center;
    background-size: cover;
    width: 24px;
    height: 24px;
    border: 0;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
  }
  .delete-btn:hover {
    background: url(../../assets/delh.png) no-repeat center center;
    background-size: cover;
    width: 24px;
    height: 24px;
  }
  .input {
    width: 300px;
    display: inline-block;
    font-size: 14px;
    padding: 0 7px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    margin-right: 10px;
    background: rgba(235, 236, 240, 1);
    border: 1px solid rgba(225, 225, 225, 1);
  }

  .img {
    width: 18px;
    height: 18px;
    vertical-align: sub;
  }
  .img:hover + span {
    display: inline-block;
  }
  .tip {
    width: 364px;
    height: 56px;
    line-height: 20px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(218, 223, 227, 1);
    box-shadow: 0px 0px 12px 0px rgba(39, 43, 46, 0.13);
    border-radius: 1px;
    position: absolute;
    margin-left: 10px;
    display: none;
    z-index: 2;
    padding: 8px;
    word-break: break-all;
    white-space: normal;
  }
  .content {
    background-color: #fff;
    height: 100%;
    padding: 24px;
  }
}

#wechatSign {
  width: 100%;
  height: 100%;
  padding: 24px;
  text-align: left;
  .tips {
    color: #272b2e;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .contract-list {
    height: auto;
    .contract {
      float: left;
      width: 148px;
      // height: 244px;
      border: 1px solid #fff;
      padding: 9px;
      margin: 0 10px 0 0;
      display: block;
      img {
        width: 100%;
        height: 184px;
      }
      .title {
        display: inline-block;
        width: 100%;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .mutiple-area {
        position: relative;
        height: 20px;
        .title {
          position: absolute;
          top: 0;
          display: inline-block;
          width: 100%;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .hover-style {
          position: absolute;
          top: 0;
          background: #fff;
          opacity: 0;
          display: inline-block;
          width: 100%;
        }
      }
    }
    .contract:hover {
      border: 1px solid #ffae36;
      .hover-style {
        opacity: 1;
      }
    }
  }
  .upload-div {
    width: 130px;
    height: 184px;
    margin: 9px 0 0;
    text-align: center;
    line-height: 184px;
    background: #f9f9f9;
  }
  .upload-title {
    display: inline-block;
    width: 100%;
    margin: 5px 0 0;
    text-align: center;
  }
  .footer {
    width: 100%;
    text-align: right;
    padding-right: 10px;
  }
  .signRole {
    border: 1px solid rgba(223, 226, 230, 1);
    height: 80px;
    margin-bottom: 30px;
    .tag {
      float: left;
      background: #ffae36;
      color: #fff;
      width: 78px;
      height: 36px;
      line-height: 36px;
      border-radius: 0px 0px 10px 0px;
      text-align: center;
      font-size: 16px;
    }
    span {
      display: inline-block;
      margin: 20px 0 10px 24px;
      .ivu-input-wrapper {
        width: 300px;
      }
    }
  }

  .page_callRecord {
    width: 100%;
    height: 32px;
    // position: absolute;
    // bottom: 50px;
    // left: 0;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
    .first {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
      vertical-align: middle;
    }
    #page_callRecord {
      text-align: left;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      .ivu-page-prev {
        border: 0;
      }
      .ivu-page-item {
        border: 0;
      }
      .ivu-page-next {
        border: 0;
      }
      .ivu-page-item-active {
        background-color: #fff;
      }
      .ivu-page-item a {
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
      .ivu-page-item-active a,
      .ivu-page-item-active:hover a {
        color: #fd9827;
      }
      .ivu-page-options-elevator {
        margin-top: 0px;
      }
      .ivu-page-options {
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
    }
    .jump {
      font-size: 14px;
      font-weight: normal;
      color: rgba(153, 153, 153, 1);
      vertical-align: middle;
      .last {
        cursor: pointer;
      }
    }
  }
}

.my-Template {
  height: 100%;
  .template-box {
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
.pactManage .ivu-tabs-nav .ivu-tabs-tab-active {
  background: rgba(255, 255, 255, 0);
  color: #ffae36 !important;
  border-bottom: 2px solid #ffae36;
  height: 35px;
}
.pactManage .ivu-tabs-bar {
  border: 0;
  box-shadow: unset;
}
.pactManage .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused {
  border-color: #ffae36 !important;
}
.ivu-tabs-nav .ivu-tabs-tab:hover {
  color: #ffae36;
}
</style>
<style lang="less">
#wechatSign {
  .ivu-tabs-content {
    height: 95%;
  }
  #aticipate {
    font-size: 16px;
    .ivu-form-item-label {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: bold;
      padding-top: 5px;
    }
  }
}
</style>


