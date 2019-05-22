<template>
  <div id="wechatSign">
    <div class="content">
      <div class="tabs-header">
        <div @click="change('upload')"  class="tab-title" :class="{active:tab == 'upload'}">
          发起合同
        </div>
        <div @click="change('contract')" class="tab-title" :class="{active:tab == 'contract'}">
          合同管理
        </div>
        <div @click="change('template')" class="tab-title" :class="{active:tab == 'template'}">
          我的模板
        </div>
        <div style="clear:both"></div>
      </div>
      <div class="tab-content">
        <div v-if="tab == 'upload'" class="template-box">
          <upload></upload>
        </div>
        <div v-if="tab == 'contract'" class="template-box">
          <list></list>
        </div>
        <div v-if="tab == 'template'" class="template-box">
          <myTemp></myTemp>
          <router-view/>
        </div>
      </div>
      <!-- <Tabs :value="nameflag" style="height:100%;">
        <TabPane label="发起合同" name="upload">
          <upload></upload>
        </TabPane>
        <TabPane label="合同管理" name="list">
          <list></list>
        </TabPane>
        <TabPane label="我的模板" name="template" class="my-Template">
          <div class="template-box">
            <myTemp></myTemp>
          </div>
        </TabPane>
      </Tabs> -->
    </div>
  </div>
</template>
<script>
import myTemp from "./module.vue";
import upload from "./uploadPage.vue";
import list from "./contractList.vue";
import http from "../../components/http.js";
export default {
  data() {
    return {
      nameflag: "upload",
      tab:'upload'
    };
  },

  components: {
    myTemp,
    upload,
    list
  },
  mounted() {
    this.show();
    this.tab = this.$route.query.tab?this.$route.query.tab:'upload';
    console.log(name);
    if (name) {
      this.nameflag = name;
    } else {
      this.nameflag = "upload";
    }
  },
  methods: {
    show() {
      http.post("admin/user/info", {}).then(res => {
        if (res.data.code == 200) {
          this.originer = res.data.data;
        }
      });
    },
    change (res) {
      this.tab = res
      this.$router.push({name:'wechatSign',query:{tab:this.tab}})
    },
    handleChange() {},
    remove() {
      console.log(11111111);
    },
    look() {
      this.$router.push("/details");
    },
    removeEnterprise(index) {
      this.Enterprise.splice(index, 1);
    },
    removePerson(index) {
      this.persons.splice(index, 1);
    },
    addEnterprise() {
      this.Enterprise.push(this.companyform);
    },
    addPerson() {
      this.persons.push(this.personform);
    },
    // 分页跳首页===================================
    page_first() {
      this.data_callRecord = [];
      this.currpage = 1;
      http
        .post("admin/record/query", {
          searchType: 0,
          currentPage: this.currpage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.totalPages = Math.ceil(res.data.data.total / this.pageSize);
          this.dataCount = res.data.data.total;
          this.currpage = 1;
          var daList = res.data.data.list;
          for (let i = 0; i < daList.length; i++) {
            this.data_callRecord.push({
              name: this.nameList[daList[i].serviceType - 1],
              location: daList[i].ip,
              data: moment(daList[i].createAt).format(
                "YYYY年MM月DD日 HH:mm:ss"
              ),
              status: daList[i].reqStatus == 0 ? "成功" : "失败",
              falgToll: daList[i].reqStatus == 0 ? "是" : "否"
            });
          }
        });
    },
    page_last() {
      this.data_callRecord = [];
      http
        .post("admin/record/query", {
          searchType: 0,
          currentPage: this.totalPages,
          pageSize: this.pageSize
        })
        .then(res => {
          this.totalPages = Math.ceil(res.data.data.total / this.pageSize);
          this.dataCount = res.data.data.total;
          this.currpage = this.totalPages;
          var daList = res.data.data.list;
          for (let i = 0; i < daList.length; i++) {
            this.data_callRecord.push({
              name: this.nameList[daList[i].serviceType - 1],
              location: daList[i].ip,
              data: moment(daList[i].createAt).format(
                "YYYY年MM月DD日 HH:mm:ss"
              ),
              status: daList[i].reqStatus == 0 ? "成功" : "失败",
              falgToll: daList[i].reqStatus == 0 ? "是" : "否"
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#wechatSign {
  width: 100%;
  height: 100%;
  padding: 24px 24px 0 24px;
  text-align: left;
  .content {
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    min-height: 100%;
    padding: 24px;
  }
}
.tabs-header{
  width: 100%;
  border-bottom: 1px solid #fd9827;
  margin-bottom:24px;
  box-shadow:0px 7px 7px -7px rgba(0, 0, 0, 0.5);
  .tab-title{
    float: left;
    width:98px;
    height:36px;
    line-height: 36px;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    color: #5F666B;
    border-radius:4px 4px 0px 0px;
  }
  .active{
    background:#fd9827;
    color: #fff;
  }
  .tab-title:hover{
    background:#fd9827;
    color: #fff;
  }
}
.my-Template {
  // height: 100%;
  .template-box {
    width: 100%;
    background: #fff;
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
}
</style>
