<template>
  <div class="sign">
    <div class="content">
      <div style="text-align:left">微信公众号电签</div>
      <div class="top">
        <Carousel style="height:80px;" dots="none"  arrow="always">
            <CarouselItem>
                <div class="area">
                  <div 
                    @click="updatecurrent(index)"
                    v-if="index < 5" 
                    v-for="(item,index) in contractTitle" :key="index" 
                    class="name"
                    :class="{active:contractCoreId == item.contractCoreId}"
                    >
                    {{item.title}}
                    <img v-if="contractCoreId == item.contractCoreId" src="../../assets/gouxuan.png"/>
                  </div>
                </div>
            </CarouselItem>
            <CarouselItem v-if="this.contractTitle.length > 5">
                <div class="area">
                  <div 
                    @click="updatecurrent(index)"
                    v-if="index >= 5" 
                    v-for="(item,index) in contractTitle" :key="index" 
                    class="name"
                    :class="{active:contractCoreId == item.contractCoreId}"
                    >
                    {{item.title}}
                    <img v-if="contractCoreId == item.contractCoreId" src="../../assets/gouxuan.png"/>
                  </div>
                </div>
            </CarouselItem>
        </Carousel>
      </div>
      <div class="down">
        <div class="left">
          <div :class="{active:index == currentpage}" @click="changeCurrentpage(index)" v-for="(item,index) in imgs" :key="index">
            <img style="width:100%;height:100%;" :src="item.imgData" alt="">
            <div class="tag">{{index+1}}</div>
          </div>
        </div>
        <div class="center" v-if="refresh">
          <div class="title">{{currentcontract.title}}</div>
          <div class="sign-area">
              <div ref="container"
              class="img-area" 
              @scroll="imgscroll()" 
              @dragover="allowDrop($event)"
              @drop="droparea($event)">
                <div v-for="(item,index) in imgs" :key="index" class="item">
                  <img :src="item.imgData" :alt="index">
                  <!-- 发起人签署区域 -->
                  <sign-area 
                  v-if="(originer.pageNum == index+1)&&(originer.contractCoreId == contractCoreId)"
                  v-for="(originer, ind1) in originerarea" :key="ind1*0.1" :index="ind1" :w="200" :h="100" 
                  :x="originer.realx" 
                  :y="originer.realy" 
                  v-on:dragging="OriginonDrag" 
                  :parent="true" :resizable="false" 
                  :style="{ borderColor: '#FFAE36',background:'rgba(255,239,214,0.5)', color: '#FFAE36',borderStyle:'dashed'}" >
                    <span class="delete-sign" @click="deleteOriginSign(originer,ind1)">+</span>
                    <div class="findcurrpage">
                      <img class="center-img" :src="sealurl" alt="">
                    </div>
                </sign-area>
                <!-- 签署人签署区域 -->
                  <sign-area 
                  v-if="signer.imgNum == index+1" 
                  v-for="(signer, ind2) in signarea" :key="signer.id" :index="ind2" :w="200" :h="100" 
                  :x="signer.realx" 
                  :y="signer.realy" 
                  v-on:dragging="onDrag" 
                  :parent="true" :resizable="false" 
                  :style="{ borderColor: '#FFAE36',background:'rgba(255,239,214,0.5)', color: '#FFAE36',borderStyle:'dashed'}" >
                    <span class="delete-sign" @click="deleteSign(signer,ind2)">+</span>
                    <div class="findcurrpage">
                      <span class="center-word">签署区域</span>
                    </div>
                </sign-area>
                </div>
              </div>
          </div>
        </div>
        <div class="right">
          <div>
            <div class="title">添加 ( 签名 ) </div>
            <div draggable="true" @click="originerclc()" @dragstart="originfromRight($event)" class="signarea">
              <img :src="sealurl" alt="">
            </div>
          </div>
          <div class="middle">
              <div class="title">指定位置</div>
              <div class="signer">选择签署方：
                <Select v-model="currentsignerid" @on-change="signerChange" style="width:100px;">
                  <Option v-for="(item,index) in signers" :key="index" :value="item.signerId">{{ item.name }}</Option>
                </Select>
              </div>
              <div>
                <div class="signarea" draggable="true" @click="signclc()" @dragstart="signerfromRight($event)">签署区域</div>
             </div>
          </div>
          <div class="footer"><Button @click="verifyVisible = true" type="primary">签署完成</Button></div>
        </div>
      </div>
    </div>
    <Modal
          class="thm-verify-sign-Modal"
          id="thm-modal"
          v-model="verifyVisible"
          >
          <p slot="header" class="header">
            <span>确认签署</span>
          </p>
          <div class="content">
            <p class="word">验证手机号码 {{phone}} </p>
            <div class="input">
              <Input style="margin-right:20px;" v-model="code" size="large" placeholder="验证码"/>
              <Button @click="sendCode" :disabled="disabled" v-if="!issend" class="code-btn nosend">{{text}}</Button>
              <Button v-if="issend" disabled class="code-btn issend" type="primary">验证码已发送({{number}}s)</Button>
            </div>
          </div>
          <div slot="footer" class="footer">
              <Button class="btn" type="primary" @click="getValidate()" size="large" >确定</Button>
              <Button class='btn' type="default" @click="verifyVisible = false" size="large" >取消</Button>
          </div>
      </Modal>
  </div>
</template>
<script>
import http from "../../components/http";
import signArea from "../../components/dragging-elements/draggingElements";
import code from "../../common/code.js";
export default {
  components: { signArea },
  data() {
    return {
      phone:'',
      number:'',
      code: "",
      issend: false,
      text: "发送验证码",
      number: 60,
      disabled: false,
      contractTitle: [],
      imgs: [],
      currentcontract: {
        title: ""
      },
      currentsignerid: null, //当前拖拽签署区域的签署人Id
      currentpage: 0,
      contractCoreId: '', //
      sealurl: "",
      signers: [],
      screenX: 0,
      screenY: 0,
      containerH: 1052.4, //中间文档高度
      imgH: 1052.4, //中间图片的高度（前端）
      imgW: 744.15, //中间图片的宽（前端）
      signH: 100, //签名的高度
      signW: 200, //签名的宽度
      A4imgH: 841.92, //后台A4纸高度
      A4imgW: 595.32, //后台A4纸高度
      originerarea:[],
      portType:1, //签署区域类型(这里只做了1，后期要改哦！辛苦了~~  1.签章 2.时间 3.企业签署人签章位置)
      signarea: [],
      refresh: true, // 强制刷新页面用到
      isorigin: false, //判断从右侧拖拽的是发起人还是签署人
      isRightDrag: false, //判断是否是右侧签名拖拽
      areaparam: {
        //签署人签署区域签章的参数
      },
      verifyVisible:false
    };
  },
  created() {
    this.show();
    this.getContracttitle();
    this.originerarea = this.$store.state.signarea.signarea.length>0?this.$store.state.signarea.signarea:[]
    console.log(this.originerarea)
  },
  methods: {
    show() {
      http.post("admin/user/info", {}).then(res => {
        if (res.data.code == 200) {
          this.phone = res.data.data.phone;
        }
      });
    },
    
    /**
     * select更换签署人
     */
    signerChange(res) {
      console.log(res);
      this.currentsignerid = res;
    },
    /**
     * 左侧缩略图点击切换当前页
     */
    changeCurrentpage(index) {
      this.currentpage = index;
      this.$refs.container.scrollTop = this.containerH * this.currentpage;
    },
    /**
     * 多个合同获取合同标题
     */
    getContracttitle() {
      return http
        .post("admin/sign/titles", {
          appId: code.appId,
          contractBossId: this.$route.query.contractBossId
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.contractTitle = res.data.data;
            this.currentcontract = res.data.data[0];
            this.contractCoreId = res.data.data[0].contractCoreId;
            this.getSignerAndPort();
            this.getContractImg();
          }
        });
    },
    /**
     *
     */
    allowDrop(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    /**
     * 在签署区域的拖拽事件
     */
    droparea(e) {
      console.log(e);
      //判断是否是右侧签名拖拽,如果是就直接生成区域
      if (this.isRightDrag && !this.isorigin) {
        this.signclc(e);
      } else if (this.isRightDrag && this.isorigin) {
        this.originerclc(e);
      }
    },
    /**
     * 发起人签署区域
     * @param e 如果是右侧拖拽则传入该事件
     */
    originerclc: function(e) {
      let areaObj = {
        appId: code.appId,
        portType: this.portType,
        contractCoreId:this.contractCoreId,
        realwidth: Math.round(this.signW * this.A4imgH / this.imgH),
        realheight: Math.round(this.signH * this.A4imgH / this.imgH)
      };
      if (!e) {
        areaObj.realx = 100;
        areaObj.realy = 150;
      } else {
        if (e.offsetX >= this.imgW - this.signW / 2) {
          //鼠标移动的位置 大于右边边界位置；防止签名区域超出右边界
          areaObj.realx = this.imgW - this.signW; //放置在右边界
        } else if (e.offsetX <= this.signW / 2) {
          //小于左边边界位置
          areaObj.realx = 0; //放置在左边界
        } else areaObj.realx = e.offsetX - this.signW / 2; //如果签名位置没有超出边界的话就以鼠标在中间为基准

        if (e.offsetY >= this.imgH - this.signH / 2) {
          areaObj.realy = this.imgH - this.signH;
        } else if (e.offsetY <= this.signH / 2) {
          areaObj.realy = 0;
        } else {
          areaObj.realy = e.offsetY - this.signH / 2;
        }
        let number = e.target.alt; //若当前页在第一张，拖拽在第二张，改变当前页
        this.currentpage = Number(number);
      }
      areaObj.pageNum = this.currentpage + 1;
      this.originerarea.push(areaObj);
      this.refresh = false;
      this.refresh = true;
      this.$store.commit('getarea',this.originerarea)
    },
    /**
     * 添加签署人签署区域
     * @param e 如果是右侧拖拽则传入该事件
     */
    signclc: function(e) {
      this.areaparam.appId = code.appId;
      this.areaparam.portType = this.portType;
      this.areaparam.signerId = this.currentsignerid;
      this.areaparam.realwidth = Math.round(
        this.signW * this.A4imgH / this.imgH
      );
      this.areaparam.realheight = Math.round(
        this.signH * this.A4imgH / this.imgH
      );
      if (!e) {
        //点击自动生成签章区域
        this.areaparam.realx = 100;
        this.areaparam.realy = 150;
      } else {
        //拖动生成
        if (e.offsetX >= this.imgW - this.signW / 2) {
          //鼠标移动的位置 大于右边边界位置；防止签名区域超出右边界
          this.areaparam.realx = this.imgW - this.signW; //放置在右边界
        } else if (e.offsetX <= this.signW / 2) {
          //小于左边边界位置
          this.areaparam.realx = 0; //放置在左边界
        } else this.areaparam.realx = e.offsetX - this.signW / 2; //如果签名位置没有超出边界的话就以鼠标在中间为基准

        if (e.offsetY >= this.imgH - this.signH / 2) {
          this.areaparam.realy = this.imgH - this.signH;
        } else if (e.offsetY <= this.signH / 2) {
          this.areaparam.realy = 0;
        } else {
          this.areaparam.realy = e.offsetY - this.signH / 2;
        }
        let number = e.target.alt; //若当前页在第一张，拖拽在第二张，改变当前页
        this.currentpage = Number(number);
      }
      this.areaparam.pageNum = this.currentpage + 1;
      this.addnewArea();
      
    },
    /**
     * 添加签署区域
     */
    addnewArea() {
      this.areaparam.firstX = Math.round(
        this.areaparam.realx * this.A4imgW / this.imgW
      );
      this.areaparam.firstY = Math.round(
        this.A4imgH -
          (this.areaparam.realy + this.signH) * this.A4imgH / this.imgH
      );
      this.areaparam.secondX = this.areaparam.firstX + this.areaparam.realwidth;
      this.areaparam.secondY =
        this.areaparam.firstY + this.areaparam.realheight;
      console.log(this.areaparam);
      return http.post("admin/signPort/add", this.areaparam).then(res => {
        if (res.data.code == 10001) {
          this.getSignerAndPort();
        }
      });
    },
    /**
     * 从右侧拖拽，如果是发起人就改变isorigin
     */
    originfromRight(e) {
      this.isRightDrag = true;
      this.isorigin = true;
    },
    signerfromRight(e) {
      this.isRightDrag = true;
      this.isorigin = false;
    },
    getContractImg() {
      return http
        .post("admin/sign/imgs", {
          appId: code.appId,
          contractCoreId: this.contractCoreId
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.imgs = res.data.data ? res.data.data : [];
          }
        });
    },
    getSignerAndPort() {
      return http
        .post("admin/sign/signerAndPort", {
          appId: code.appId,
          contractCoreId: this.contractCoreId
        })
        .then(res => {
          if (res.data.code == 10001) {
            this.sealurl = res.data.data.officalSeal;
            this.signers = res.data.data.signerInfo;
            this.currentsignerid = res.data.data.signerInfo[0].signerId;
            this.signarea = [];
            this.signers.map(item => {
              item.signPort.map(ele => {
                this.signarea.push(ele);
              });
            });
            this.signarea.map(item => {
              item.appId = code.appId;
              item.realwidth = Math.round(this.signW * this.A4imgH / this.imgH);
              item.realheight = Math.round(
                this.signH * this.A4imgH / this.imgH
              );
              item.realx = this.imgW * item.firstX / this.A4imgW;
              item.realy =
                (this.A4imgH - item.firstY) * this.imgH / this.A4imgH -
                this.signH;
            });
          }
        });
    },
    updatecurrent(index) {
      this.currentpage = 0;
      this.$refs.container.scrollTop = 0;
      this.currentcontract = this.contractTitle[index];
      this.contractCoreId = this.contractTitle[index].contractCoreId;
      this.getContractImg();
      this.getSignerAndPort();
    },
    /**
     * 更换签章
     */
    selectcurrent(index) {
      this.currentsign = index;
    },
    /**
     * 查询签章
     */
    getsignList() {
      if (this.signtype == "my") {
        return http.get("employee/digitalsign/getsign").then(res => {
          if (res.data.status == this.GlobalStatus.SUCCESS) {
            this.sealVisible = true;
            this.signature = res.data.content.signImgs;
          }
        });
      } else {
        return http
          .post("official/getallofficialseal", {
            id: this.userInfo.id
          })
          .then(res => {
            if (res.data.status == this.GlobalStatus.SUCCESS) {
              this.sealVisible = true;
              this.signature = res.data.content;
            }
          });
      }
    },
    allowDrop(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    /**
     * 控制主页面滚动条
     * @param e
     */
    imgscroll: function(e) {
      let len = this.$refs.container.scrollTop;
      if (len % this.containerH >= this.containerH / 2) {
        this.currentpage = Math.floor(len / this.containerH + 1);
      } else {
        this.currentpage = Math.floor(len / this.containerH);
      }
    },
    goBack: () => window.history.go(-1),

    /**
     * 点击左侧缩略图事件,切换当前页
     * @param item
     * @param index
     */
    changepage: function(item, index) {
      this.currentpage = item.num;
      this.$refs.container.scrollTop = this.containerH * this.currentpage;
    },
    deleteOriginSign(st,ind){
      this.$store.commit('deletearea',ind)
    },
    /**
     * 删除签章
     * @param st
     * @param ind
     */
    deleteSign(st, ind) {
      return http
        .post("admin/signPort/delete", {
          appId: code.appId,
          id: this.signarea[ind].id
        })
        .then(res => {});
    },
    /**
     * 发起人签章的区域内移动
     */
    OriginonDrag: function(x, y, index) {
      this.isRightDrag = false;
      this.draged = this.originerarea[index];
      this.draged.index = index;
      //记录鼠标位置
      this.screenX = x;
      this.screenY = y;
      this.originerarea[index].realx = this.screenX;
      this.originerarea[index].realy = this.screenY;
      console.log(this.imgs)
    },
    /*
     * 签署人调用drag-element区域内拖拽
     */
    onDrag: function(x, y, index) {
      this.isRightDrag = false;
      this.draged = this.signarea[index];
      this.draged.index = index;
      //记录鼠标位置
      this.screenX = x;
      this.screenY = y;
      this.signarea[index].realx = this.screenX;
      this.signarea[index].realy = this.screenY;
      this.signarea[index].firstX = Math.round(
        this.signarea[index].realx * this.A4imgW / this.imgW
      );
      this.signarea[index].firstY = Math.round(
        this.A4imgH -
          (this.signarea[index].realy + this.signH) * this.A4imgH / this.imgH
      );
      this.signarea[index].secondX =
        this.signarea[index].firstX + this.signarea[index].realwidth;
      this.signarea[index].secondY =
        this.signarea[index].firstY + this.signarea[index].realheight;
      return http
        .post("admin/signPort/update", this.signarea[index])
        .then(res => {
          if (res.data.code == 10001) {
            this.getSignerAndPort();
          }
        });
    },
    /**
     * 发送验证码
     */
    sendCode() {
      this.issend = true;
      this.disabled = true;
      var _vue = this;
      return http
        .post("admin/wxCode/get", {
          appId:code.appId,
          phone: this.phone
        })
        .then(res => {
          if (res.data.code == 10001) {
            var timer = setInterval(function() {
              _vue.number--;
              if (_vue.number == 0) {
                clearInterval(timer);
                _vue.issend = false;
                _vue.disabled = false;
                _vue.number = 60;
              }
            }, 1000);
            _vue.$Message.success("验证码发送成功");
          } else {
            _vue.$Message.error(res.data.msg);
            _vue.issend = false;
            _vue.disabled = false;
            _vue.number = 60;
          }
        });
    },
    /**
     * 验证最后一步验证码
     */
    getValidate() {
      return http.post('admin/wxCode/chk',{
          appId:code.appId,
          phone: this.phone,
          code: this.code
      }).then(res=>{
        if(res.data.code ==  10001){
          this.save_signature();
        }
      })
    },
    /**
     * 最后一步，提交签章
     */
    save_signature() {
      // 在记录过程中记录的是左上角的坐标，中间过程算也很麻烦，所以在这里换算一下
      let areas = JSON.parse(JSON.stringify(this.originerarea));
      areas.map(item=>{
        item.firstX = Math.round(
          item.realx * this.A4imgW / this.imgW
        );
        item.firstY = Math.round(
          this.A4imgH -
            (item.realy + this.signH) * this.A4imgH / this.imgH
        );
        item.secondX = item.firstX + item.realwidth;
        item.secondY =item.firstY + item.realheight;
      })
      let params = {
        appId:code.appId,
        contracatBossId:this.$route.query.contractBossId,
        code:this.code
      }
      params.ports = this.contractTitle
      params.ports.map(item=>{
        item.portMos = []
        areas.map(ele => {
          if(ele.contractCoreId == item.contractCoreId){
            item.portMos.push(ele)
          }
        }) 
      })
      console.log(params)
      return http
        .post("admin/wxContract/sign/sender", params)
        .then(res => {
          if (res.data.code == 10001) {
            this.$Message.success("签署完成");
            this.$router.push({ name: 'wechatSign',query:{tab:'contract'} });
          }
        });
    }
  }
};
</script>
<style lang="less">
@content-height: 1052.4px; //中间文档的高度
@content-width: 744.15px;
@sign-width: 200px; //签名的宽高
@sign-height: 100px;
.sign {
  width: 100%;
  height: 100%;
  padding: 12px 24px;
  text-align: left;
  .content {
    width: 100%;
    height: 100%;
    position: relative;
    .top {
      background: #fff;
      height: 80px;
      text-align: center;
      width: 100%;
      min-width: 1180px;
      margin: 12px 0 16px 0;
      .area {
        width: 90%;
        margin: 0 auto;
        display: flex;
        padding-top: 20px;
        justify-content: space-around;
      }
      .name {
        width: 170px;
        border: 1px solid #dadfe3;
        text-overflow: ellipsis;
        height: 40px;
        padding: 0 20px 0 10px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        line-height: 40px;
        border-radius: 0px 10px 0px 10px;
        img {
          width: 16px;
          height: 16px;
          position: absolute;
          right: 10px;
          top: 10px;
        }
      }
      .active {
        border: 1px solid #ffae36;
      }
      a {
        color: #ffae36;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        margin: 10px;
      }
    }
    .down {
      position: absolute;
      top: 120px;
      left: 0;
      right: 0;
      bottom: 10px;
      background: #fff;
      width: 100%;
      // height: 100%;
      .left {
        width: 265px;
        float: left;
        height: 100%;
        overflow-y: scroll;
        padding-bottom: 20px;
        border-right: 1px solid #dfe2e5;
        div {
          width: 85%;
          height: 300px;
          margin: 0 auto;
          border: 1px dashed #000;
          position: relative;
          margin-top: 16px;
          div {
            position: absolute;
            width: 36px;
            height: 20px;
            text-align: center;
            border: 0;
            border-radius: 10px 0px 0px 0px;
            right: 0;
            bottom: 0;
            background: #ccc;
            color: #fff;
          }
        }
        .active {
          border: 1px dashed #fd9827;
          div {
            background: #fd9827;
          }
        }
      }
      .center {
        position: absolute;
        left: 265px;
        right: 335px;
        bottom: 0;
        top: 0;
        text-align: center;
        float: left;
        .title {
          text-align: center;
          height: 60px;
          line-height: 60px;
          font-size: 24px;
        }
        .sign-area {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 60px;
          overflow-x: hidden;
          margin: 0 auto 20px;
          // overflow-y: scroll;
          .img-area {
            position: relative;
            width: @content-width;
            height: @content-height;
            border: 1px solid #ccc;
            overflow-y: scroll;
            margin: 0 auto;
            border-top: 0;
            border-bottom: 0;
            img {
              border-right: 1px solid #ccc;
            }
            .item {
              border-top: 1px solid #ccc;
              position: relative;
              .area-block {
                cursor: pointer;
                position: absolute;
                z-index: 9999;
                width: 200px;
                height: 100px;
                color: #fd9827;
                border: 1px dashed #fd9827;
                background: rgba(255, 239, 214, 0.5);
              }
            }
            .delete-sign {
              display: inline-block;
              width: 18px;
              height: 18px;
              text-align: center;
              line-height: 12px;
              font-size: 20px;
              font-weight: 500;
              border-radius: 100%;
              position: absolute;
              color: #fd9827;
              right: 8px;
              top: 8px;
              z-index: 999;
              cursor: pointer;
              transform: rotate(45deg);
            }
            .findcurrpage {
              width: 100%;
              height: 100%;
              .center-img {
                height: 90px;
                width: 90px;
                margin: 0 auto;
                margin-top: 5px;
                border: 0;
              }
              .center-word {
                width: 100%;
                height: 100%;
                line-height: 100px;
                font-size: 16px;
              }
            }
          }
          img {
            width: @content-width;
            height: @content-height;
            border-bottom: #ccc;
          }
        }
      }
      .right {
        float: right;
        width: 335px;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        border-left: 1px solid #dfe2e5;
        padding: 20px;
        position: relative;
        .title {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #272b2e;
        }
        .signer {
          margin: 16px 0 30px;
          font-size: 15px;
          color: #848c91;
        }
        .signarea {
          // width: 288px;
          height: 111px;
          line-height: 111px;
          font-size: 16px;
          color: #ffae36;
          margin: 10px auto 20px;
          text-align: center;
          background: rgba(255, 239, 214, 0.5);
          border: 1px solid rgba(255, 174, 54, 1);
          img {
            height: 90px;
            margin: 10px auto;
          }
        }
        .ivu-select-selection {
          border-top: none;
          border-left: none;
          border-right: none;
          border-radius: 0;
        }
        .ivu-select-selection-focused {
          border-top: none;
          border-left: none;
          border-right: none;
        }
        .ivu-select-visible .ivu-select-selection {
          box-shadow: none;
        }
        .footer {
          width: 100%;
          position: absolute;
          bottom: 50px;
          text-align: center;
        }
      }
    }
  }
}
#thm-modal {
  .header {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #fd9827;
    text-align: center;
    margin: 8px auto;
  }
  .ivu-modal-footer {
    border-top: 0;
    padding-top: 0;
  }
  .footer {
    text-align: center;
    margin-bottom: 32px;
    .btn {
      width: 120px;
      height: 36px;
      font-size: 14px;
    }
  }
}
.thm-verify-sign-Modal {
  .content {
    width: 80%;
    margin: 10px auto;
    .word {
      font-size: 14px;
      margin-bottom: 24px;
    }
    .input {
      display: flex;
      .code-btn {
        display: inline-block;
        width: 150px;
        height: 36px;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
        padding: 0 10px;
        color: #fff;
      }
      .issend {
        background: #ccc;
        border-color: #ccc;
      }
      .nosend {
        background: #fd9827;
      }
    }
  }
}

</style>
