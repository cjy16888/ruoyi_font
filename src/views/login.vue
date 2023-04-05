<template>
  <div class="login">
    <!-- : 冒号，都是代表获取的是动态的值，不是写死的-->
    <!-- :model,实现表单数据的双向绑定。这样，在用户输入表单数据时，数据会自动更新到 formData 对象中，
        而在程序中修改 formData 对象中的数据时，表单中的控件也会自动更新。-->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">科技系统</h3>
      <el-form-item prop="username">
          <!-- v-model 就是绑定值-->
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="账户"
          >
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code" >
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <!--这个 getCode 是点击验证码图片，进行切换的的方法-->
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2023 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
//导入包
import { getCondeImg,  } from '@/api/login'

//这个导出，其实是给自己上面用的
export default {
  name: "login",
  data() {
    return {
      codeUrl: "",
      //跟 model 进行数据的双向绑定
      loginForm: {
        //前面的字段是 el-from 表单中的 prop 属性
        username: "admin",
        password: "admin123",
        rememberMe: true,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          //触发方式，blur失去焦点，change数据改变
          //这个是 异步进行的处理
          { required: true, trigger: "blur", message: "请输入您的账号" }
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" }
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }]
      },
    }
  },
  //调用方法，自动调用
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    //获取新的验证码图片
    getCode() {
      //调用 getCodeImg 方法，成功之后返回 res
      getCondeImg().then(res => {
        console.log("xxjs获取验证码",res)
        //这个是 response 的参数，判断是否正确返回了 验证码图片
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          //图片的地址，前面我们需要添加格式，base64 的解码标记
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      // const username = Cookies.get("username");
      // const password = Cookies.get("password");
      // const rememberMe = Cookies.get('rememberMe')
      // this.loginForm = {
      //   username: username === undefined ? this.loginForm.username : username,
      //   password: password === undefined ? this.loginForm.password : decrypt(password),
      //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      // };
    },
    handleLogin() {
      //进行校验，不然的话，不需要输入用户名、密码、验证码，也可以直接点击登录对后台发送请求，压力过大
      //如果前面的 rules 规则校验全部通过了，那么 valid 就是 true
      this.$refs.loginForm.validate(valid => {
        if (valid){
          //定位到 store 文件下面的 Login （actions）方法，数据是 loginForm
          //通过 promise 对象返回 res 数据的结果
          this.$store.dispatch('Login',this.loginForm).then(() => {
            //这个 this.redirect 值的是什么
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
          }).catch(err => {
            console.log("login 捕获异常",err)
            if (this.captchaEnabled){
              //重新获取一下验证码，进行重新登录，不要我们进行手动的刷新页面获取验证码
              this.getCode()
            }
          })
        }
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true;
      //     if (this.loginForm.rememberMe) {
      //       Cookies.set("username", this.loginForm.username, { expires: 30 });
      //       Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
      //       Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
      //     } else {
      //       Cookies.remove("username");
      //       Cookies.remove("password");
      //       Cookies.remove('rememberMe');
      //     }
      //     this.$store.dispatch("Login", this.loginForm).then(() => {
      //       this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
      //     }).catch(() => {
      //       this.loading = false;
      //       if (this.captchaEnabled) {
      //         this.getCode();
      //       }
      //     });
      //   }
      // });
    }
  }
}
</script>

<style scoped>
/*这个修饰的是 class 名叫 login 的 div 块*/
.login{
  /*填充满整个页面*/
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  /*图片显示，进行 填充*/
  background-size: cover;
  display: flex;
  /*居中*/
  justify-content: center;
  /*居中*/
  align-items: center;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
.el-input {
  height: 38px;
input {
  height: 38px;
}
}
.input-icon {
  height: 39px;
  width: 14px;
  margin-left: 2px;
}
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
img {
  cursor: pointer;
  vertical-align: middle;
}
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
