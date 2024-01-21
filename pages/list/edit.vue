<template>
  <view class="uni-container">
    <uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
      <uni-forms-item name="user_id" label="" required>
        <uni-easyinput placeholder="作者ID， 参考`uni-id-users` 表" v-model="formData.user_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="category_id" label="分类" required>
        <uni-data-picker v-model="formData.category_id" collection="question-categories" field="name as text, _id as value"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item name="title" label="题目" required>
        <uni-easyinput placeholder="题目" v-model="formData.title" trim="both"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="difficulty" label="难度">
        <uni-easyinput placeholder="难度" type="number" v-model="formData.difficulty"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="content" label="试题内容" required>
        <uni-easyinput placeholder="试题内容" v-model="formData.content" trim="right"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="answer" label="试题答案">
        <uni-easyinput placeholder="试题答案" v-model="formData.answer" trim="right"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="answer_analysis" label="答案解析">
        <uni-easyinput placeholder="答案解析" v-model="formData.answer_analysis"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="is_choice" label="是否为选择题">
        <uni-data-checkbox v-model="formData.is_choice" :localdata="formOptions.is_choice_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="answer_options" label="选项">
        <uni-data-checkbox :multiple="true" v-model="formData.answer_options"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="question_status" label="试题状态">
        <uni-data-checkbox v-model="formData.question_status" :localdata="formOptions.question_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="comment_status" label="开放评论">
        <uni-data-checkbox v-model="formData.comment_status" :localdata="formOptions.comment_status_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <uni-forms-item name="last_comment_user_id" label="">
        <uni-easyinput placeholder="最后回复用户 id，参考`uni-id-users` 表" v-model="formData.last_comment_user_id"></uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="publish_date" label="发表时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.publish_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="last_modify_date" label="最后修改时间">
        <uni-datetime-picker return-type="timestamp" v-model="formData.last_modify_date"></uni-datetime-picker>
      </uni-forms-item>
      <uni-forms-item name="mode" label="查看模式">
        <uni-data-checkbox v-model="formData.mode" :localdata="formOptions.mode_localdata"></uni-data-checkbox>
      </uni-forms-item>
      <view class="uni-button-group">
        <button type="primary" class="uni-button" @click="submit">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
  import { validator } from '../../js_sdk/validator/question-list.js';

  const db = uniCloud.database();
  const dbCollectionName = 'question-list';

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
        "difficulty": null,
        "content": "",
        "answer": "",
        "answer_analysis": "",
        "is_choice": 0,
        "answer_options": [],
        "question_status": 0,
        "comment_status": null,
        "last_comment_user_id": "",
        "publish_date": null,
        "last_modify_date": null,
        "mode": 0
      }
      return {
        formData,
        formOptions: {
          "is_choice_localdata": [
            {
              "value": 0,
              "text": "否"
            },
            {
              "value": 1,
              "text": "是"
            }
          ],
          "question_status_localdata": [
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
          ],
          "mode_localdata": [
            {
              "value": 0,
              "text": "普通模式"
            },
            {
              "value": 1,
              "text": "背题模式"
            }
          ]
        },
        rules: {
          ...getValidator(Object.keys(formData))
        }
      }
    },
    onLoad(e) {
      if (e.id) {
        const id = e.id
        this.formDataId = id
        this.getDetail(id)
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      
      /**
       * 验证表单并提交
       */
      submit() {
        uni.showLoading({
          mask: true
        })
        this.$refs.form.validate().then((res) => {
          return this.submitForm(res)
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
        return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
          uni.showToast({
            icon: 'none',
            title: '修改成功'
          })
          this.getOpenerEventChannel().emit('refreshData')
          setTimeout(() => uni.navigateBack(), 500)
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        })
      },

      /**
       * 获取表单数据
       * @param {Object} id
       */
      getDetail(id) {
        uni.showLoading({
          mask: true
        })
        db.collection(dbCollectionName).doc(id).field("user_id,category_id,title,difficulty,content,answer,answer_analysis,is_choice,answer_options,question_status,comment_status,last_comment_user_id,publish_date,last_modify_date,mode").get().then((res) => {
          const data = res.result.data[0]
          if (data) {
            this.formData = data
            
          }
        }).catch((err) => {
          uni.showModal({
            content: err.message || '请求服务失败',
            showCancel: false
          })
        }).finally(() => {
          uni.hideLoading()
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
