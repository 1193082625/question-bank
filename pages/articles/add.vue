<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="title" label="标题" required>
        <uni-easyinput placeholder="标题" v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="category_id" label="分类">
        <uni-data-picker v-model="formData.category_id" collection="opendb-news-categories" field="name as text, _id as value"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="content" label="文章内容" required>
		<customEditor @dataChange="changeContent"></customEditor>
        <!-- <uni-easyinput placeholder="文章内容" v-model="formData.content" trim="right"></uni-easyinput> -->
      </uni-forms-item>
      <uni-forms-item name="comment_status" label="开放评论">
        <uni-data-checkbox v-model="formData.comment_status" :localdata="formOptions.comment_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="avatar" label="封面大图">
        <!-- <uni-easyinput placeholder="缩略图地址" v-model="formData.avatar" trim="both"></uni-easyinput> -->
		<uni-file-picker 
			v-model="imageValue" 
			fileMediatype="image" 
			mode="grid" 
			:limit="1"
			@select="select" 
			@progress="progress" 
			@success="success" 
			@fail="fail" 
		/>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/opendb-news-articles.js';

  const db = uniCloud.database();
  const dbCollectionName = 'opendb-news-articles';

  function getValidator(fields) {
    let result = {}
    for (let key in validator) {
      if (fields.indexOf(key) > -1) {
        result[key] = validator[key]
      }
    }
    return result
  }

  

  export default {
    data() {
      let formData = {
        "user_id": "",
        "category_id": "",
        "title": "",
        "content": "",
        "excerpt": "",
        "article_status": 0,
        "comment_status": null,
        "last_comment_user_id": "",
        "avatar": "",
        "publish_date": null,
        "last_modify_date": null,
        "mode": null
      }
      return {
		imageValue: [],
        formData,
        formOptions: {
          "article_status_localdata": [
            {
              "value": 0,
              "text": "草稿箱"
            },
            {
              "value": 1,
              "text": "已发布"
            }
          ],
          "comment_status_localdata": [
            {
              "value": 0,
              "text": "关闭"
            },
            {
              "value": 1,
              "text": "开放"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
		// 获取上传状态
		select(e){
			console.log('选择文件：',e)
		},
		// 获取上传进度
		progress(e){
			console.log('上传进度：',e)
		},
		changeContent(data) {
			console.log(45, data);
			this.formData.content = data;
		},
		// 上传成功
		success(e){
			this.formData.avatar = e.tempFilePaths[0];
			console.log('上传成功', this.formData.avatar);
		},
		
		// 上传失败
		fail(e){
			console.log('上传失败：',e)
		},
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
			console.log(22, res, this.formData.content);
          return this.submitForm({
			  ...res,
			  excerpt: res.content.substring(0, 120),
		  })
        }).catch(() => {
        }).finally(() => {
          uni.hideLoading()
        })
      },

      /**
       * 提交表单
       */
      submitForm(value) {
        // 使用 clientDB 提交数据
        return db.collection(dbCollectionName).add(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '新增成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>
  .uni-container {
    padding: 15px;
  }

  .uni-input-border,
  .uni-textarea-border {
    width: 100%;
    font-size: 14px;
    color: #666;
    border: 1px #e5e5e5 solid;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .uni-input-border {
    padding: 0 10px;
    height: 35px;

  }

  .uni-textarea-border {
    padding: 10px;
    height: 80px;
  }

  .uni-button-group {
    margin-top: 50px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
  }

  .uni-button {
    width: 184px;
  }
</style>
