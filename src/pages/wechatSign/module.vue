<template>
  <div id="templates">
    <div v-show="!showDetail || this.$route.query.tab === 'template'">
      <!-- 模板为空时 上传模板显示 -->
      <div v-if="!hasTemplate" class="template-box">
        <div class="temp-content">
          <div class="hint-pic">
            <img src="../../assets/none-template.png" alt="">
          </div>
          <div class="hint-content">
            <p>
              您还没有自己的模版，赶紧新增一个吧！
            </p>
            <p>
              支持上传doc、docx文件，大小在10M以内
            </p>
          </div>
          <Upload
            ref="upload"
            :action="upUrl"
            :headers="{token: this.token}"
            accept=".doc,.docx,.PDF"
            :data="{appId: this.appIds}"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :max-size="10240"
            :on-exceeded-size="handleMaxSize"
            :on-progress="uploading"
          >
            <Button type="primary" class="upload-btn" >上传模板</Button>
          
          </Upload>
        </div>
      </div>

      <!-- 模板列表展示 -->
      <div v-else class="temp-list">
        <div class="temp-head">
          <Upload
            ref="upload"
            :action="upUrl"
            :headers="{token: this.token}"
            accept=".doc,.docx,.PDF"
            :data="{appId: this.appIds}"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :max-size="10240"
            :on-exceeded-size="handleMaxSize"
            :on-progress="uploading"
          >
            <!-- <div> -->
              <Icon type="md-add" class="add-contract" />
              <span class="btn-content">新增模板</span>  
            <!-- </div> -->
          </Upload>
        </div>

        <div class="temp-contentbox" :style="{height: + this.fullHeight - 266 + 'px'}">
          <ul>
            <li ref="temp-box" v-for="(item, index) in templateList" :key="index" class="contracts" >
              <div class="temp-contents">
                <p class="doc-type">
                  {{item.templateName | formatType}}
                </p>
                <h3>{{item.templateName | formatTitle}}</h3>
                <p class="lines" v-for="(items, pIndex) in 8" :key="pIndex"></p>
              </div>

              <div class="left-btn">
                <p class="use" @click="toDetail(item)">
                  {{item.templateName | formatText}}
                </p>
                <p class="cut-out" @click="cutOut(item.id)">删除</p>
              </div>
            </li>
            <li style="clear:both;"></li>
          </ul>
        </div>
      </div>

      <!-- 删除模板弹窗 -->
      <Modal v-model="showCutOut" width="514" id="temp-modal">
        <p slot="header" class="modal-header">温馨提示</p>
        <div class="modal-center">您确定要删除该模版吗？</div>
        <div class="modal-footer" slot="footer">
          <Button class="btn sure-btn" :loading="modalLoading" @click="sureDel">确定</Button>
          <Button class="btn cancel-btn"  @click="showCutOut = false">取消</Button>
        </div>
      </Modal>
      <div class="loading-type" v-show="loading">
        <Spin fix></Spin>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../components/http.js"
import code from "../../common/code.js";

export default {
  data () {
    return {
      fullHeight: document.documentElement.clientHeight,    // 定义页面的高度
      token: this.$store.state.userlogin.userlogin.token,
      upUrl: http.baseUrls + 'admin/tempalte/upload',
      showDetail: false,     // 显示合同模板编辑
      appIds: code.appId,    // 微信公众号账户的appId
      showCutOut: false,     // 显示删除模板弹窗
      modalLoading: false,   // 删除时的等待
      hasTemplate: false,    // 是否有模板
      loading: false,        // 上传时的等待
      templateList: [],      // 合同列表
      contractId: 0,         // 合同id
      websocketId: 0,        // 随机字符串
      title: '',             // 合同标题
    }
  },
  created () {
    this.getModuleList()
  },
  methods: {
    uploading (file) {
      this.loading = true
    },

    // 去详情页 
    toDetail (item) {
      let types = item.templateName.replace(/^.+\./, '')
      // TODO 如果是pdf 直接签署，暂时没有pdf格式的合同，上传时只能上传dox、docx
      if (types === 'pdf') {
        // 签署 
        // http.post('/admin/tempalte/sign',{
        //   appId: code.appId,
        //   templateId: item.id,
        //   websocketId: item.createAt,
        //   doccontent: item.savepath  // 待传，还没对接
        // }).then(res => {
        //   if (res.data.code === 10001) {
        //     this.$store.commit('setfile', res.data.content)
        //     this.$router.push({name: 'startperson'})
        //   }
        // })
      } else {
        // 去合同模板编辑页面
        this.showDetail = true
        this.$router.push({name: 'moduleDetail', query: {
          contractId: item.id,
          title: item.templateName,
          websocketId: item.createAt
        }})
      }
    },
    // 删除合同弹窗
    cutOut (index) {
      this.showCutOut = true
      this.contractId = index
    },
    // 确定删除按钮
    sureDel () {
      this.modalLoading = true
      let params = {
        appId: code.appId,
        templateId: this.contractId
      }
      http.post('admin/tempalte/del', params).then(res => {
        if (res.data.code === 10001) {
          setTimeout(() => {
            this.modalLoading = false;
            this.showCutOut = false;
            this.$Message.success('删除成功');
            this.getModuleList()
          }, 600)
        } else {
          setTimeout(() => {
            this.modalLoading = false;
            this.showCutOut = false;
            this.$Message.warning('删除失败');
            this.getModuleList()
          }, 600)
        }
      })
    },

    // 合同上传成功时的钩子，返回字段为 response, file, fileList
    handleSuccess (res, file) {
      if (res.code === 10001) {
        this.templateList.push(res.data)
        this.hasTemplate = true
        this.loading = false
      } else {
        this.$Message.warning('模板上传失败')
        this.loading = false
      }
    },
    // 合同超出指定大小限制时的钩子，返回字段为 file, fileList
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件  ' + file.name + ' 超出了10M'
      });
    },

    // 获取模板列表
    getModuleList () {
      this.loading = true
      http.post('/admin/tempalte/select', {
        token: this.token,
        appId: code.appId
      }).then(res => {
        if (res && res.data.code === 10001) {
          this.loading = false
          if (res.data.data.length !== 0) {
            this.hasTemplate = true
            this.templateList = res.data.data
          } else {
            this.hasTemplate = false
          }
        } else {
          this.loading = true
          this.hasTemplate = false
          this.templateList = []
        }
      })
    }
  },
  // 监听window.onresize事件
  watch: {
    fullHeight (val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        let _this = this
        // 这里的定时器是为了优化，如果频繁调用window.onresize方法会造成页面卡顿，增加定时器会避免频繁调用window.onresize方法
        setTimeout(function () {
          _this.timer = false
        }, 400)
      }
    }
  },
  // 过滤合同标题的后缀名
  filters: {
    // 保留后缀名
    formatType: function(value) {
      return value.replace(/^.+\./, '')
    },
    // 去掉后缀名的合同标题
    formatTitle: function (value) {
      return value.substring(0, value.indexOf("."))
    },
    // 如果后期有pdf格式的 展示签署标签，否则展示编辑
    formatText: function (value) {
      let newVal = value.replace(/^.+\./, '')
      if (newVal === 'pdf') {
        return "签署"
      } else {
        return "编辑"
      }
    }
  },
  // 把window.onresize事件挂在到mounted
  mounted() {
    const _this = this
    // 事件会在窗口或框架被调整大小时发生
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        _this.fullHeight = window.fullHeight
      })()
    }
  }
}
</script>
<style lang="less" scoped>
#templates{
  height: 100%;
  li{
    list-style: none;
  }
  height: 100%;
  position: relative;
  .loading-type{
    display: inline-block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
  }
}
.temp-content{
  width: 100%;
  height: 600px;
  margin: 130px auto 0;
  text-align: center;
}
.hint-pic {
  width: 320px;
  height: 230px;
  margin: 0 auto;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.hint-content {
  margin-top: 24px;
  text-align: center;
  p{
    font-size:14px;
    color:#999999;
    line-height: 1;
    margin-bottom: 10px;
  }
}
.upload-btn {
  width: 100px;
  height: 36px;
  margin-top: 10px;
  font-size:14px;
  color:#ffffff
}
.temp-list{
  width: 100%;
  .temp-head{
    width: 100%;
    height: 36px;
    .ivu-upload{
      float: right;
      position: relative;
      height: 36px;
      width: 100px;
      line-height: 36px;
      text-align: center;
      color: #fff;
      background: #FFAE36;
      border-radius: 0px 10px 0px 10px;
      cursor: pointer;
      .add-contract{
        font-size: 16px;
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -9px;
      }
      .btn-content{
        padding-left: 8px;
        font-size: 14px;
      }
    }
    .ivu-upload:hover{
      opacity: 0.8;
    }
  }
}
.temp-contentbox{
  height: 810px;
  padding: 32px 24px 24px;
  margin-top: 24px;
  overflow: hidden;
  border: 1px solid #DFE2E5;
  ul{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  .contracts{
    height: 250px;
    width: 288px;
    margin-bottom: 40px;
    position: relative;
    .temp-contents{
      height: 250px;
      width: 210px;
      float: left;
      border: 1px solid rgba(234,234,234,1);
      background: #fff;
      position: absolute;
      left: 0;
      z-index: 9;
      text-align: center;
      padding: 36px 30px 0;
      overflow: hidden;
      .doc-type{
        position: absolute;
        left: -20px;
        top: 5px;
        height: 24px;
        width: 70px;
        line-height: 24px;
        font-size: 16px;
        background: #FD9827;
        color: #fff;
        transform:rotate(-45deg);
      }
      h3{
        width: 100%;
        font-size: 16px;
        color: #666666;
        padding-bottom: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lines{
        height: 7px;
        width:100%;
        background: #EAEAEA;
        margin-bottom: 12px;
        border-radius: 3px;
      }
    }
    .left-btn{
      width: 50px;
      height: 250px;
      float: left;
      position: absolute;
      right: 28px;
      .use,.cut-out{
        width: 60px;
        height: 35px;
        position: absolute;
        right: 0;
        bottom: 60px;
        font-size: 14px;
        background:linear-gradient(90deg,rgba(150,149,149,1), rgba(204,204,204,1));
        color: #fff;
        line-height: 35px;
        text-align: center;
        cursor: pointer;
        border-radius: 6px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        transition: all .5s;
      }
      .cut-out{
        bottom: 0px;
      }
      .use:hover,.cut-out:hover{
        background:linear-gradient(90deg,rgba(238,126,0,1), rgba(253,152,39,1));
        right: -10px;
      }
    }
  }
}
</style>
<style lang="less">
#templates{
  height: 100%;
  .ivu-input{
    height: 36px;
    font-size: 14px;
    border: 0;
    border-radius: 6px;
  }
  .ivu-input:hover{
    border-color: #dddee1;
  }
  .ivu-input:focus{
    border-color: #dddee1;
    box-shadow: none;
  }
  .ivu-input-group-append{
    background: #fff;
    border: 0;
    cursor: pointer;
  }
}

#temp-modal{
  .ivu-modal{
    top: 25%;
  }
  .modal-center{
    text-align: center;
  }
  .ivu-modal-header{
    height: 68px;
  }
  .ivu-modal-header p{
    color:#f60;
    text-align:center;
    font-size: 20px;
    height: 36px;
    line-height: 36px;
    color: #FD9827;
  }
  .ivu-modal-body{
    font-size: 14px;
    height: 86px;
    padding: 0;
    padding: 32px 16px 16px;
  }
  .ivu-modal-footer{
    border-top: 0;
    text-align: center;
    height: 76px;
  }
  .btn{
    width: 120px;
    height: 36px;
    font-size: 14px;
    border-color: #ccc;
    background: #fff;
  }
  .sure-btn{
    border: 0;
    background: #FD9827;
    color: #fff;
  }
  .ivu-btn:hover{
    border: 0;
    background: #FD9827;
    color: #fff;
  }
}
</style>
