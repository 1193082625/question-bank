<template>
	<view class="comments-contents">
		<text class="comments-title">热门评论</text>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList" field="article_id,comment_content,like_count,comment_type,reply_user_id,reply_comment_id">
		  <view v-if="error">{{error.message}}</view>
		  <view v-else-if="data">
		    <uni-list>
		      <uni-list-item :ellipsis="1" v-for="(item, index) in data" :key="index">
		        <template v-slot:body>
					<rich-text :nodes="item.comment_content"></rich-text>
		          
		            <!-- 此处默认显示为_id，请根据需要自行修改为其他字段 -->
		            <!-- 如果使用了联表查询，请参考生成的 admin 项目中 list.vue 页面 -->
				  <!-- <text>
		            {{item.comment_content}}
		          </text> -->
		        </template>
		      </uni-list-item>
		    </uni-list>
		  </view>
		  <uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		
		<customEditor ref="customEditorRef" @dataChange="changeContent" :isCommend="true"></customEditor>
		<button type="primary" class="comment-btn" @click="submitComment">发表评论</button>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCollectionName = 'opendb-news-comments';
	export default {
		name:"comments",
		data() {
			return {
				collectionList: "opendb-news-comments",
				loadMore: {
				  contentdown: '',
				  contentrefresh: '',
				  contentnomore: ''
				},
				commentContent: '',
			};
		},
		props: {
			articleId: String,
		},
		methods: {
			changeContent(data) {
				this.commentContent = data;
			},
			submitComment() {
				uni.showLoading({
					mask: true
				})
				// 使用 clientDB 提交数据
				db.collection(dbCollectionName).add({
					article_id: this.articleId,
					comment_content: this.commentContent,
				}).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '评论成功'
					})
					this.commentContent = '';
					this.$refs.customEditorRef.clearWithOutTip();
					uni.hideLoading();
					this.$refs.udb.loadData({
						clear: true
					  });
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
					uni.hideLoading();
				})
			},
			refreshHandle() {
				  this.$refs.udb.loadData({
				    clear: true
				  }, () => {
				    uni.stopPullDownRefresh()
				  })
			},
			loadMoreHandle() {
				  this.$refs.udb.loadMore()
			}
		}
	}
</script>

<style>
	.comments-title{
		font-size: 28rpx;
		display: block;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.comments {
		margin-top: 40rpx;
	}
	
	.comment-btn {
		margin-top: 20rpx;
	}
</style>