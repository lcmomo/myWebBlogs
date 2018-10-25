<template>
    <div>
        <div class="navHeader">
                    <div class="myHeaderImg">
                        
                    </div>
                    <div class="myHeaderTitle">
                        <div class="myHeaderName">
                            {{myName}}
                        </div>
                    </div>
                </div>
    </div>
</template>
<script>
    export default{
        name:'navbar',
        data(){
            return {
                myName:'夙兮执梦'

            }
        }
    }
</script>
<style lang="scss" scoped>
    
        .navHeader{
            width:980px;
            height:180px;
            background-color:red;
            margin:auto;
            position: relative;
            .myHeaderImg{
                width:100px;
                height:100px;
                background-color:green;
                position:absolute;
                bottom:-30px;
                border:2px solid #fff;
                //border-radius:100%;
                float:left;

            }

            .myHeaderTitle{
                width:400px;
                height:70px;
                background-color:yellow;
                position: absolute;
                left:100px;
                top:110px;
                .myHeaderName{
                    height:30px;
                    line-height:25px;
                    font-size:20px;
                    background-color:green;
                    padding:3px 0 0 10px;


                }
            }

        }
        
    
</style>