<template>
  <div id="con-list">
    <Tabs @on-click="changetabname" class="pactManage" v-model="tabname" value="tabname">
      <TabPane label="待签署" name="other">
        <Table border :columns="concolumn" :data="condata"></Table>
        <div class="pagination">
          <Page @on-change='changePage' :total="contotal" :page-size="pageSize" :current="pageNumber"/>
        </div>
      </TabPane>
      <TabPane label="已撤回" name="withdraw">
        <Table border :columns="concolumn" :data="condata"></Table>
        <div class="pagination">
          <Page @on-change='changePage'  :total="contotal" :page-size="pageSize" :current="pageNumber"/>
        </div>
      </TabPane>
      <TabPane label="已完成" name="success">
        <Table border :columns="concolumn" :data="condata"></Table>
        <div class="pagination">
          <Page @on-change='changePage'  :total="contotal" :page-size="pageSize" :current="pageNumber"/>
        </div>
      </TabPane>
      <Modal
        id="withdraw-modal"
        v-model='withdrawVisible'
        title="撤回原因"
        @on-ok="ok"
        @on-cancel="cancel">
        <Input v-model="refusal" placeholder="请输入详细的撤回原因" />
      </Modal>
    </Tabs>
  </div>
</template>
<script>
import http from "../../components/http.js";
import code from "../../common/code.js";
import time from "../../common/time.js";
export default {
  data() {
    return {
      tabname: "other",
      contractstatus: [
        {
          status: 2, //状态值
          name: "other"
        },
        {
          status: 3,
          name: "success"
        },
        {
          status: 4,
          name: "withdraw"
        }
      ],
      concolumn: [
        {
          title: "合同名称",
          key: "title",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.title)
            ]);
          }
        },
        {
          title: "发起时间",
          key: "sendTime",
          render: (h, params) => {
            var date = time(params.row.sendTime);
            return h("span", date);
          }
        },
        {
          title: "接收方",
          key: "name",
          render: (h, params) => {
            let data = "";
            params.row.name.map(item => {
              data += item + " ";
            });
            return h("span", data);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            let action1 = h(
              "div",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  margin: "0 15px",
                  color: "#379DE6",
                  // fontSize:'14px',
                  display: "inline-block",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      name: "Details",
                      query: {
                        id: params.row.contractCoreId,
                        type: this.tabname
                      }
                    });
                  }
                }
              },
              "查看"
            );

            let action2 = h(
              "div",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  margin: "0 15px",
                  display: "inline-block",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    // this.remove(params.index);
                    this.contractid = params.row.contractCoreId;
                    this.withdrawVisible = true;
                  }
                }
              },
              "撤回"
            );
            if (this.tabname == "other") {
              return h("div", [action1, action2]);
            } else {
              return h("div", [action1]);
            }
          }
        }
      ],
      condata: [],
      contotal: null,
      pageSize: 10,
      pageNumber: 1,
      withdrawVisible: false,
      contractid: null,
      refusal: ""
    };
  },
  created() {
    this.tabname = this.$route.query.type ? this.$route.query.type : "other";
  },
  mounted() {
    this.getContractList();
  },
  methods: {
    changetabname(res) {
      this.tabname = res;
      this.getContractList();
    },
    changePage(res) {
      this.pageNumber = res;
      this.getContractList();
    },
    getContractList() {
      let status;
      this.contractstatus.map(item => {
        if (item.name == this.tabname) {
          status = item.status;
        }
      });
      return http
        .post("admin/contractManage/apiCloud", {
          appId: code.appId,
          status: status,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.condata = res.data.data.wait;
            this.contotal = res.data.data.total;
          }
        });
    },
    ok() {
      if (this.refusal != "") {
        return http
          .post("admin/wxContract/callBack", {
            appId:code.appId,
            contractCoreId: this.contractid,
            callBackReson: this.refusal
          })
          .then(res => {
            if(res.data.code == 10001){
              this.$Message.success("合同撤回成功");
              this.getContractList()
            }else{
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
.pagination {
  text-align: center;
  padding: 20px 0;
}
</style>
<style lang="less">
#con-list {
  .ivu-table {
    font-size: 14px;
  }
}
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


