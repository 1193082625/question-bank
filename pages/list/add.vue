<template>
	<view class="uni-container">
		<uni-forms ref="form" :model="formData" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="title" label="题目" required>
				<uni-easyinput placeholder="题目" v-model="formData.title" trim="both"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="category_id" label="分类" required>
				<uni-data-picker v-model="formData.category_id" collection="question-categories"
					field="name as text, _id as value" @change="changeCategory"></uni-data-picker>
			</uni-forms-item>
			<uni-forms-item name="difficulty" label="难度">
				<uni-data-select class="type m" placeholder="选择难度" size="mini" :clear="false"
					:localdata="difficultyList" v-model="formData.difficulty">
				</uni-data-select>
			</uni-forms-item>
			<uni-forms-item name="content" label="试题内容">
				<uni-easyinput placeholder="试题内容" v-model="formData.content" trim="right"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item v-if="currentCategoryName==='选择题'" name="answer_options" label="问题选项">
				<view class="answer-options">
					<view class="answer-options-list" v-for="(optionCont, index) of qAnswerOptions">
						<text>{{ idxToChar(index) }}: {{optionCont}}</text>
						<uni-icons type="trash-filled" size="20" @click="removeOption(index)"></uni-icons>
					</view>
					<view class="option-input-box" v-if="qAnswerOptions.length <= 5">
						<uni-easyinput class="option-input" focus v-model="editingOption"
							placeholder="请输入内容"></uni-easyinput>
						<button type="default" @click="addQuestionOptionCont" class="uni-button answer-add-btn"
							style="width: 80px;">添加</button>
					</view>
				</view>
			</uni-forms-item>
			<uni-forms-item name="answer_analysis" label="答案解析">
				<uni-easyinput placeholder="答案解析" v-model="formData.answer_analysis"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="is_choice" label="是否为选择题">
				<uni-data-checkbox
					v-model="formData.is_choice"
					:localdata="formOptions.is_choice_localdata"
					></uni-data-checkbox>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import {
		validator
	} from '../../js_sdk/validator/question-list.js';
	const {indexToCharCode} = uniCloud.importObject('utils');

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
				"difficulty": 1,
				"content": "",
				"answer": "",
				"answer_analysis": "",
				"is_choice": 0,
				"answer_options": [],
				"comment_status": null,
				"last_comment_user_id": "",
				"publish_date": null,
				"last_modify_date": null,
				"mode": 0
			}
			return {
				formData,
				formOptions: {
					"is_choice_localdata": [{
							"value": 0,
							"text": "否"
						},
						{
							"value": 1,
							"text": "是"
						}
					],
				},
				rules: {
					...getValidator(Object.keys(formData))
				},
				"difficultyList": [{
					value: 1,
					text: '1级',
				}, {
					value: 2,
					text: '2级',
				}, {
					value: 3,
					text: '3级',
				}, {
					value: 4,
					text: '4级',
				}, {
					value: 5,
					text: '5级',
				}],
				currentCategoryName: '',
				editingOption: '',
				qAnswerOptions: [],
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			changeCategory(data) {
				if(!data) return;
				this.currentCategoryName = data.detail.value[0].text;
				if(this.currentCategoryName !== '选择题') {
					this.editingOption = '';
					this.qAnswerOptions = [];
				}
			},
			removeOption(idx) {
				this.qAnswerOptions.splice(idx, 1);
				this.qAnswerOptions = [...this.qAnswerOptions];
			},
			async idxToChar(idx) {
				return (await indexToCharCode(idx));
			},
			addQuestionOptionCont() {
				if(!this.editingOption) return;
				this.qAnswerOptions.push(this.editingOption);
				this.editingOption = '';
			},
			changeContent(data) {
				this.formData.answer_analysis = data;
			},
			/**
			 * 验证表单并提交
			 */
			submit() {
				uni.showLoading({
					mask: true
				})
				this.$refs.form.validate().then((res) => {
					if(this.currentCategoryName === '选择题' && this.qAnswerOptions.length === 0 ) {
						this.msgType = 'error';
						this.messageText = `请添加题目选项`;
						this.$refs.message.open();
						return;
					}
				  return this.submitForm({
					  ...res,
					  answer_options: this.qAnswerOptions
					})
				}).catch(() => {}).finally(() => {
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