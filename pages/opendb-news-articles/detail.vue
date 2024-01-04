<template>
  <view class="container">
	<!-- #ifdef APP-PLUS -->
	<uni-nav-bar :statusBar="true" :border="false"></uni-nav-bar>
	<!-- #endif -->
    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="options" :collection="collectionList" :getone="true" :manual="true">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="loading">
        <uni-load-more :contentText="loadMore" status="loading"></uni-load-more>
      </view>
      <view v-else-if="data">
        <view v-if="data.avatar" class="avatar-box">
			<image :src="data.avatar" mode="aspectFit"></image>
        </view>
        <view class="title">
          <text>{{data.title}}</text>
        </view>
		<view class="user-info">
			<text>{{data.user_id}}</text>
		</view>
        <view>
          <text>发表于：</text>
          <uni-dateformat :threshold="[0, 0]" :date="data.publish_date"></uni-dateformat>
        </view>
        <view>
          <text>{{data.comment_count}}个评论 {{data.like_count}}个喜欢</text>
        </view>
        <view>
          <text>{{data.excerpt}}</text>
        </view>
        <view class="content-box">
			<uParse
				:content="data.content"
				:imageProp="imageProp"
				noData="内容为空"
			></uParse>
        </view>
		<view v-if="data.comment_status === 1" class="comments">
			<customEditor @dataChange="changeContent" :isCommend="true"></customEditor>
			<button type="default" @click="submitComment()">发表评论</button>
		</view>
      </view>
    </unicloud-db>
    <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
  </view>
</template>

<script>
	// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
	const uniShare = new UniShare()
	// #endif
  // 由schema2code生成，包含校验规则和enum静态数据
  import { enumConverter } from '../../js_sdk/validator/opendb-news-articles.js'
  import uParse from '@/components/u-parse/u-parse.vue';
  const db = uniCloud.database()

  export default {
		// #ifdef APP
		components:{
			"uni-nav-bar":uniNavBar,
			uParse,
		},
		onBackPress({from}) {
			if(from == 'backbutton'){
				if(uniShare.isShow){
					this.$nextTick(function(){
						console.log(uniShare);
						uniShare.hide()
					})
				}
				return uniShare.isShow;
			}
		},
		// #endif
	  components: {
		  uParse,
	  },
    data() {
      return {
		  commentContent: '',
		  imageProp: {
			  mode: 'widthFix',
			  padding: 10
		  },
        queryWhere: '',
        collectionList: [ db.collection('opendb-news-articles').field('user_id,category_id,title,content,excerpt,article_status,comment_status,last_comment_user_id,avatar,publish_date,last_modify_date,mode').getTemp(),db.collection('opendb-news-categories').field('name as text, _id').getTemp() ],
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
        options: {
          // 将scheme enum 属性静态数据中的value转成text
          ...enumConverter
        }
      }
    },
    onLoad(e) {
      this._id = e.id
    },
    onReady() {
      if (this._id) {
        this.collectionList = [ db.collection('opendb-news-articles').where('_id=="' + this._id + '"').field('user_id,category_id,title,content,excerpt,article_status,comment_status,last_comment_user_id,avatar,publish_date,last_modify_date,mode').getTemp(),db.collection('opendb-news-categories').field('name as text, _id').getTemp() ]
      }
    },
    methods: {
		changeContent(data) {
			this.commentContent = data;
		},
		submitComment() {
			db.collection('opendb-news-comments').add({
				article_id: this._id,
				comment_content: this.commentContent,
				like_count: 0,
				comment_type: 0,
			}).then(res => {
				uni.showToast({
					title: '评论成功',
					icon: 'none'
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: 'none'
					})
				})
			})
		},
      handleUpdate() {
        // 打开修改页面
        uni.navigateTo({
          url: './edit?id=' + this._id,
          events: {
            // 监听修改页面成功修改数据后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      },
      handleDelete() {
        this.$refs.udb.remove(this._id, {
          success: (res) => {
            // 删除数据成功后跳转到list页面
            uni.navigateTo({
              url: './list'
            })
          }
        })
      },
      fabClick() {
        // 打开新增页面
        uni.navigateTo({
          url: './edit?id='+this._id,
          events: {
            // 监听新增数据成功后, 刷新当前页面数据
            refreshData: () => {
              this.$refs.udb.loadData({
                clear: true
              })
            }
          }
        })
      }
    }
  }
</script>

<style>
	@import url('../../components/u-parse/u-parse.css');
  .container {
    padding: 30rpx;
	font-size: 14px;
	color: #333;
  }
  .avatar-box{
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin-bottom: 10rpx;
  }
  .title{
	  font-size: 16px;
	  font-weight: bold;
	  margin-bottom: 20rpx;
	  color: #000;
  }
  /deep/ uni-image>img{
	  width: 80%;
  }
	
  .btns {
    margin-top: 10px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
  }

  .btns button {
    flex: 1;
  }

  .btn-delete {
    margin-left: 10px;
  }
</style>
