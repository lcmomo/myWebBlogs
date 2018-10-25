<template>
    <div >
    <Headers/>
        
        <div class="container">
            <div class="mainbg">
                <NavBar></NavBar>
            </div>
            <aside class="left">
                
            </aside>
            
            <aside class="right">
                <myCalendar/>
            </aside>
        </div>
   
    </div>
</template>
<script>
import Headers from './header'
import myCalendar from './myCalendar'
import NavBar from './navbar'
    export default{
        name:'Home',
        components:{
            Headers,
            myCalendar,
            NavBar
        },
        data(){
            return {
                myName:''

            }
        },
        computed:{
            getUser(){
                
            }
        }
    }
</script>
<style scoped lang="scss">
*{
    padding:0;
    margin:0;
    border:0;
}
.container{
    position:relative;
    width:100%;

    .left{
        width:180px;
        height:700px;
        background-color:red;
        
        float:left;

    }
    .right{
        width:180px;
        float:right;
        height:700px;
        background-color:red;
        
    }
    .mainbg{
        height:250px;
        width:100%;
        background-color:blue;
        position: relative;
    }


    
}
</style>