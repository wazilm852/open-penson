<template>
  <div class="details">
    <div class="content">
      <Breadcrumb style="color:#848C91">
        <BreadcrumbItem :to="{name:'wechatSign',query:{tab:'contract',type: this.contracttype}}">
        {{contracttype == 'other'?'待签署':contracttype == 'success'?'已完成':'已撤回'}}
        </BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">{{title}}</BreadcrumbItem>
      </Breadcrumb>
      <div style="text-align:right">
        <a class="btn-mu" :href="pdfurl">
          <img style="width:16px;height:18px;" src="../../assets/chehui.png" alt="">下载
        </a>
        <Button class="btn-mu" @click="withdrawVisible = true">
          <img style="width:16px;height:18px;" src="../../assets/xiazai.png" alt="">撤回
        </Button>
        <div style="clear:both"></div>
      </div>
      <div class="down">
        <div class="left-area">
          <div class="left">
          <div class="contract">
            <span>{{title}}</span>
            <span>{{currentpage}}/{{number}}</span>
          </div>
          <div class="img-content" ref="container" @scroll="imgscroll()">
            <img v-for="(item,index) in imgs" :src="item.imgData" alt="">
          </div>
        </div>
        </div>
        <div class="right-area">
          <div class="right">
          <div class="title">{{contractType}}</div>
          <div class="signer-detail">
            <div>
            <div>
              <div style="margin:10px 0 10px;">{{title}}</div>
              <div>由<span class="name">{{originer.name}}</span>（{{originer.phone}}）于{{sendtime}}发起</div>
            </div>
            <div style="margin:24px 0  10px 0;">签署方</div>
            <div class="list">
              <div class="tag">发起人</div>
              <div class="Signatory">
                <span>
                  <p><span class="name">{{originer.name}}</span>（{{originer.phone}}）</p>
                  <p>于{{sendtime}}签署</p>
                </span>
                <span class="sign">已签署</span>
              </div>
            </div>
            <div v-for="(item,index) in signers" :key="index" class="list">
              <div class="tag">接收方</div>
              <div class="Signatory">
                <span>
                  <p><span class="name">{{item.signersName}}</span> （{{item.phone}}）</p>
                  <p v-if="item.status == 2 && item.signAt">于{{item.signAt}}签署</p>
                </span>
                <span v-if="item.status == 2" class="sign">已签署</span>
                <span v-if="item.status == 1"  class="nosign">待签署</span>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
      <Modal
        id="withdraw-modal"
        v-model='withdrawVisible'
        title="撤回原因"
        @on-ok="ok"
        @on-cancel="cancel">
        <Input v-model="refusal" placeholder="请输入详细的撤回原因" />
      </Modal>
    </div>
  </div>
</template>
<script>
import http from "../../components/http.js";
import code from "../../common/code.js";
import time from "../../common/time.js";
export default {
  data() {
    return {
      withdrawVisible: false,
      refusal: "",
      contractCoreId: "",
      contracttype: "",
      title: "",
      contractType: "",
      imgs: [],
      currentpage: 1,
      number: null,
      signers: [],
      originer: {
        name: "",
        phone: ""
      },
      sendtime: "",
      containerH: 852.81, //
      pdfurl:
        http.baseUrls +
        "admin/wxContract/download?contractCoreId=" +
        this.$route.query.id
    };
  },
  created() {
    this.contractCoreId = this.$route.query.id;
    this.contracttype = this.$route.query.type;
    this.getDetail();
  },
  methods: {
    getDetail() {
      return http
        .post("admin/contractManage/contract_details", {
          appId: code.appId,
          contractCoreId: this.$route.query.id
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.title = res.data.data.title;
            this.imgs = res.data.data.imgs;
            this.number = res.data.data.imgs.length;
            this.signers = res.data.data.signers;
            this.originer.name = res.data.data.companyName;
            this.originer.phone = res.data.data.phone;
            this.sendtime = time(res.data.data.sendtime);
            this.contractType =
              res.data.data.status == 1
                ? "待我签"
                : res.data.data.status == 2
                  ? "待签署"
                  : res.data.data.status == 3
                    ? "已完成"
                    : res.data.data.status == 4 ? "已撤回" : "草稿";
          }
        });
    },
    imgscroll: function(e) {
      let len = this.$refs.container.scrollTop;
      console.log(len);

      if (len % this.containerH < this.containerH / 2) {
        this.currentpage = Math.ceil(len / this.containerH);
      } else {
        this.currentpage = Math.ceil(len / this.containerH) + 1;
      }
      if (len == 0) {
        this.currentpage = 1;
      }
    },
    ok() {
      if (this.refusal != "") {
        return http
          .post("admin/wxContract/callBack", {
            appId: code.appId,
            contractCoreId: this.$route.query.id,
            callBackReson: this.refusal
          })
          .then(res => {
            if (res.data.code == 10001) {
              this.$Message.success("合同撤回成功");
              this.getDetail();
            } else {
              this.$Message.warning(res.data.msg);
            }
          });
      }
    },
    cancel() {}
  }
};
</script>
<style lang="less" scoped>
.details {
  height: 100%;
  width: 100%;
  padding: 24px;
  text-align: left;
  .Signatory {
    padding: 10px;
  }
  .Signatory span {
    display: inline-block;
    vertical-align: text-top;
  }
  .sign {
    color: #04aa4b;
    background: rgba(4, 170, 75, 0.3);
    width: 60px;
    height: 24px;
    float: right;
    padding:0;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
  .nosign {
    color: #fd9827;
    font-size: 14px;
    background: rgba(253, 152, 39, 0.3);
    width: 60px;
    height: 24px;
    float: right;
    line-height: 24px;
    text-align: center;
  }
  .content {
    height: 100%;
    width: 100%;
    background: #fff;
    min-width: 1100px;
    padding: 24px;
    .btn-mu {
      // display: inline-block;
      float: right;
      width: 100px;
      height: 34px;
      margin-left: 20px;
      font-size: 14px;
      color: inherit;
      padding: 6px 15px 6px;
      border-radius: 4px;
      border: 1px solid #fd9827;
      img {
        float: left;
      }
    }
    .down {
      margin-top: 14px;
      width: 100%;
      height: 90%;
      position: relative;
    }
    .left-area {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 360px;
    }
    .right-area {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 360px;
    }
    .down .left {
      border: 1px solid #dfe2e5;
      width: 640px;
      height: 100%;
      // overflow-y:scroll;
      position: relative;
      margin: 0 auto;
      // margin-left: 12%;
      .contract {
        background: rgba(235, 236, 240, 1);
        width: 100%;
        font-size: 16px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: 0;
        span {
          display: inline-block;
        }
      }
      .contract span:nth-child(1) {
        width: 80%;
      }
      .contract span:nth-child(2) {
        width: 10%;
      }
      .img-content {
        padding: 0 10px;
        position: absolute;
        top: 50px;
        bottom: 0;
        overflow-y: scroll;
        img {
          width: 100%;
        }
      }
    }
    .right {
      border: 1px solid #dfe2e5;
      float: right;
      width: 350px;
      height: 100%;
      position: relative;
      .list {
        border: 1px solid #dfe2e5;
        margin-bottom: 10px;
        height: 96px;
        font-size: 14px;
      }
      .name {
        max-width: 100px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .title {
        width: 100%;
        background: rgba(255, 174, 54, 0.1);
        color: #ffae36;
        height: 50px;
        line-height: 50px;
        text-align: center;
        position: absolute;
        top: 0;
        font-size: 16px;
      }
      .signer-detail {
        position: absolute;
        top: 50px;
        bottom: 0;
        font-size: 14px;
        padding: 10px;
        overflow-y: scroll;
      }
      .tag {
        background: #ffae36;
        color: #fff;
        width: 60px;
        height: 27px;
        line-height: 27px;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="less">
#withdraw-modal {
  .ivu-modal {
    top: 14%;
  }
  .ivu-modal-header {
    border-bottom: 0;
    padding: 30px 16px 20px;
    .ivu-modal-header-inner {
      text-align: center;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(39, 43, 46, 1);
    }
  }
  .ivu-modal-body {
    text-align: center;
    margin-bottom: 20px;
  }
  .ivu-input {
    width: 412px;
    height: 54px;
    background: #fafafc;
    border-color: #fafafc;
    font-size: 14px;
    margin: 0 auto;
  }
  .ivu-modal-footer {
    border-top: 0px;
    text-align: center;
    padding: 0 18px 38px 18px;
    .ivu-btn {
      width: 120px;
      height: 40px;
      margin: 0 30px;
      border: 1px solid #66717a;
      border-radius: 0px 10px 0px 10px;
    }
    .ivu-btn-text {
    }
    .ivu-btn-primary {
      background: #66717a;
      color: #fff;
    }
  }
}
</style>


