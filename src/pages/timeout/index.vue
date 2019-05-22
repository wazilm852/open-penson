<template>
    <div id="timeout">
        <img style="width:450px;" src="../../assets/timeout.png" alt="">
        <p>非常抱歉，您在当前页面停留时间过长，出于安全考虑，请
            <router-link :to="{name:'login'}">
                <span style="color:#fd9827;cursor:pointer;">重新登录</span>
            </router-link>
        </p>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
#timeout{
    width:488px;
    margin:216px auto 0;
    font-size:16px;
    color:#666;
    p{
        margin-top:42px;
    }
}
</style>