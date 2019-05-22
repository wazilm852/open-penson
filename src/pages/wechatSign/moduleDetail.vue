<template>
  <div id="template-comp">
    <div class="detail-title">
      <div class="top-left">
        <span class="my-temp" @click="toTemplate">我的模板 》</span>
        <span>使用模板</span>
      </div>

      <div class="save-right">
        <Button type="primary" @click="saveFile">
          <i class="iconfont iconbaocun"></i>
          <span class="save-text">保存</span>
        </Button>

        <Button class="sign-btn" type="primary" :loading="loading" @click="toSign">
          <span v-if="!loading" class="icon-box">
            <i class="iconfont iconfinish"></i>
            <span class="save-text">签署</span>
          </span>
          <span class="save-text" v-else>签署</span>
        </Button>
      </div>
    </div>

    <Card shadow>
      <Form ref="editorModel" :model="editorModel" :rules="editorRules">
        <FormItem prop="content">
          <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
        </FormItem>
      </Form>
      <Spin fix v-if="spinShow">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>加载组件中...</div>
      </Spin>
    </Card>
  </div>
</template>
<script>
import tinymce from 'tinymce'
import '../../../zh_CN.js'
import http from '../../components/http';
import code from "../../common/code.js";

export default {
  name: 'tinymceEditer',
  data () {
    return {
      spinShow: false,   // 展示加载中
      loading: false,    // 签署按钮 点击时展示loading 加载
      editorModel: {
        content: ''
      },
      editorRules: {
        content: [
          {
            type: 'string',
            min: 5,
            message: 'the username size shall be no less than 5 chars ',
            trigger: 'blur'
          }
        ]
      },
      customEditor: '',
      params: {
        appId: code.appId,
        templateId: this.$route.query.contractId
      }
    }
  },
  methods: {
    // 初始化富文本编辑框
    init () {
      this.$nextTick(() => {
        let vm = this;
        let height = document.body.offsetHeight - 350;
        tinymce.init({
          selector: '#tinymceEditer',
          branding: false,
          elementpath: false,
          height: height,
          menubar: '',
          // plugins: [
          //   // 'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
          //   // 'searchreplace visualblocks visualchars code fullpage',
          //   // 'insertdatetime media nonbreaking save table contextmenu directionality',
          //   // 'emoticons paste textcolor colorpicker textpattern imagetools codesample'
          // ],
          // toolbar1: '',
          autosave_interval: '20s',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          setup: function (editor) {
            editor.on('init', function (e) {
              vm.spinShow = false;
              vm.getFileHtml()
            });
            editor.on('keydown', function (e) {
              localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
              vm.editorModel.content = tinymce.get('tinymceEditer').getContent();
            });
            editor.on('keyup', function (e) {
              localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
              vm.editorModel.content = tinymce.get('tinymceEditer').getContent();
            })
          }
        })
      })
    },
    // 返回我的模板列表
    toTemplate () {
      this.$router.push({name: 'wechatSign', query:{
        tab: 'template'
      }})
    },

    // 使用模板
    getFileHtml () {
      http.post('/admin/tempalte/use', this.params).then(res => {
        if (res.data.code === 10001) {
          this.editorModel.content = res.data.msg
          tinymce.get('tinymceEditer').setContent(this.editorModel.content);
        }
      })
    },
    // 保存模板
    saveFile () {
      let files = tinymce.get('tinymceEditer').getContent();
      let fileParams = {
        appId: code.appId,
        templateId: this.$route.query.contractId,
        doccontent: files,
        title: this.$route.query.title
      }
      http.post('/admin/tempalte/save', fileParams).then(res => {
        if (res.data.code === 10001) {
          this.$Message.success('保存成功');
        }
      })
    },
    // 去签署
    toSign () {
      this.loading = true
      http.post('/admin/tempalte/sign', {
        appId: code.appId,
        websocketId: this.$route.query.websocketId,
        templateId: this.$route.query.contractId,
        doccontent: this.editorModel.content
      }).then(res => {
        if (res.data.code === 10001) {
          this.loading = false
          this.$router.push({name: 'sign', query:{
            contractBossId: res.data.data.contractBossId
          }})
        } else {
          this.loading = true
        }
      })
    }
  },

  mounted () {
    this.init()
  },
  destroyed () {
    tinymce.get('tinymceEditer').destroy();
  }
}
</script>
<style lang="less" scoped>
.detail-title{
  height: 36px;
  font-size: 14px;
  max-width: 1168px;
  margin-bottom: 24px;
  .my-temp{
    cursor: pointer;
  }
  .top-left{
    line-height: 40px;
    margin-left: 21px;
    color: #848C91;
    float: left;
  }
  .save-right{
    float: right;
    .ivu-btn-primary{
      height: 34px;
      background: #fff;
      border: 1px solid #FFAE36;
      color: #666;
      width: 100px;
      margin-left: 14px;
      border-radius: 0px 10px 0px 10px;
    }
    .sign-btn{
      padding-left: 24px;
    }
    .iconbaocun{
      font-size: 16px;
      color: #FFAE36;
      display: inline-block;
      margin-top: -4px;
      margin-right: 14px;
      vertical-align: middle;
      line-height: 1;
    }
    .save-text{
      display: inline-block;
      font-size: 14px;
    }
    .icon-box{
      line-height: 1;
      .iconfinish{
        display: inline-block;
        font-size: 18px;
        color: #FD9827;
        vertical-align: middle;
        margin-left: -12px;
        margin-top: -3px;
        margin-right: 12px;
      }
    }
  }
}

</style>
<style lang="less">
#template-comp{
  width: 100%;
  height: 100%;
  .mce-container, .mce-container *, .mce-widget, .mce-widget *, .mce-reset{
    box-sizing: border-box!important;
  }
  .ivu-card-body{
    max-width: 1168px;
    min-height: 800px;
    padding: 0 !important;
    margin-left: 21px;
  }
  .mce-statusbar>.mce-container-body{
    display: none!important;
  }
  .ivu-form-item{
    margin-bottom: 0;
  }
  .mce-top-part::before{
    box-shadow: none;
  }
  .mce-panel{
    border: 1px solid #eaeaea;
  }
  .ivu-btn > .ivu-icon + span{
    margin-left: 0;
  }
  .ivu-btn .ivu-icon-ios-loading{
    margin-right: 12px;
    margin-left: -12px;
    margin-top: -3px;
  }
  .ivu-card-shadow{
    box-shadow: none;
  }
  .mce-btn-group:not(:first-child){
    border-left: 0;
    margin-left: 0; 
  }
}
</style>
