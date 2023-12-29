<template>
	<!--
	 本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2717
	 uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	 uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	 unicloud-db 组件文档：https://uniapp.dcloud.net.cn/uniCloud/unicloud-db-component
	 DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view class="article">
		<!-- #ifdef APP-PLUS -->
		<uni-nav-bar :statusBar="true" :border="false"></uni-nav-bar>
		<!-- #endif -->
		<view class="detail-top">
			<text class="t-btn">上一题</text>
			<text class="t-title">第{{qIndex}}题</text>
			<text class="t-btn">下一题</text>
		</view>
		<view class="article-title">题目：{{ title }}</view>
		<unicloud-db v-slot:default="{data, loading, error, options}" :options="formData" collection="question-list,uni-id-users"
			:field="field" :getone="true" :where="where" :manual="true" ref="detail"
			foreignKey="question-list.user_id" @load="loadData">
			<template v-if="!loading && data">
				<uni-list :border="false">
					<uni-list-item thumbSize="lg" :thumb="data.image">
						<!-- 通过body插槽定义作者信息内容 -->
						<template v-slot:body>
							<view class="header-content">
								<view class="difficulty">
									<text class="d-title">难度：</text>
									<uni-rate v-model="data.difficulty" touchable="false" :size="18" :readonly="true" :is-fill="false"/>
								</view>
							</view>
						</template>
						<template v-slot:footer>
							<view class="footer">
								<view class="uni-note">更新于
									<uni-dateformat :date="data.last_modify_date" format="yyyy-MM-dd hh:mm"
										:threshold="[60000, 2592000000]" />
								</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
					<!-- 文章摘要 -->
				<!-- <view class="banner">
					<view class="banner-title">
						<text class="uni-ellipsis">{{data.excerpt}}</text>
					</view>
				</view> -->
				<view class="article-content">
					<rich-text :nodes="data.content"></rich-text>
				</view>
				<view class="d-footer">
					<view class="down-menu">
						<view class="m-title" @click="openPopup" >
							<uni-icons class="icon" type="up" size="14" color="#007aff"></uni-icons>
							<text>更多</text>
						</view>
						<uni-popup ref="popup" background-color="#fff">
							<view class="popup-list">
								<!-- todo 动态切换展示内容 -->
								<text @click="changeMode(data.mode)">切换到{{data.mode === 0 ? '背题模式' : '“普通模式”'}}</text>
								<text>答案问题反馈</text>
							</view>
							<text class="popup-btn" @click="closePopup">取消</text>
						</uni-popup>
					</view>
					<view class="fav-btn">
						<uni-icons class="icon" type="heart" size="14" color="#ffffff"></uni-icons>
						<text>收藏</text>
					</view>
					<text class="next-btn">继续刷题</text>
				</view>
			</template>
		</unicloud-db>
	</view>
</template>

<script>
	// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
	const uniShare = new UniShare()
	// #endif
	const db = uniCloud.database();
	const readQuestionsLog = db.collection('read-questions-log')
	export default {
		// #ifdef APP
		components:{
			"uni-nav-bar":uniNavBar,
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
		data() {
			return {
				// 当前显示 _id
				id: "",
				qIndex: 0,
				title: 'title',
				// 数据表名
				// 查询字段，多个字段用 , 分割
				field: 'user_id.nickname,user_id._id,last_modify_date,comment_count,like_count,title,content,difficulty,answer,answer_analysis,is_choice,answer_options',
				formData: {
					noData: '<p style="text-align:center;color:#666">详情加载中...</p>'
				}
			}
		},
		computed: {
			uniStarterConfig() {
				return getApp().globalData.config
			},
			where(){
				//拼接where条件 查询条件 ,更多详见 ：https://uniapp.dcloud.net.cn/uniCloud/unicloud-db?id=jsquery
				return `_id =="${this.id}"`
			}
		},
		onLoad(event) {
			//获取真实新闻id，通常 id 来自上一个页面
			if (event.id) {
				this.id = event.id
			}
			if(event.qIndex) {
				this.qIndex = event.qIndex;
			}
			//若上一页传递了标题过来，则设置导航栏标题
			if (event.title) {
				this.title = event.title
				uni.setNavigationBarTitle({
					title: event.title
				})
			}
		},
		onReady() {
			// 开始加载数据，修改 where 条件后才开始去加载 clinetDB 的数据 ，需要等组件渲染完毕后才开始执行 loadData，所以不能再 onLoad 中执行
			if (this.id) { // ID 不为空，则发起查询
				this.$refs.detail.loadData()
			} else {
				uni.showToast({
					icon: 'none',
					title: this.$t('listDetail.newsErr')
				})
			}
		},
		onNavigationBarButtonTap(event) {
			if (event.type == 'share') {
				this.shareClick();
			}
		},
		methods: {
			$log(...args){
				console.log('args',...args,this.id)
			},
			changeMode(mode = 0) {
				const newMode = mode === 0 ? 1 : 0;
				console.log('要切换阅读模式', mode, newMode);
			},
			openPopup() {
				this.$refs.popup.open('bottom');
			},
			closePopup() {
				this.$refs.popup.close();
			},
			setReadQuestionsLog(){
				let item = {
					"article_id":this.id,
					"last_time":Date.now()
				},
				readQuestionsLog = uni.getStorageSync('readQuestionsLog')||[],
				index = -1;
				readQuestionsLog.forEach(({article_id},i)=>{
					if(article_id == item.article_id){
						index = i
					}
				})
				if(index === -1){
					readQuestionsLog.push(item)
				}else{
					readQuestionsLog.splice(index,1,item)
				}
				uni.setStorageSync('readQuestionsLog',readQuestionsLog)
				console.log(readQuestionsLog);
			},
			setFavorite() {
				if ( uniCloud.getCurrentUserInfo().tokenExpired < Date.now() ){
					return console.log('未登录用户');
				}
				let article_id = this.id,
					last_time = Date.now();
					console.log({article_id,last_time});
					readQuestionsLog.where(`"article_id" == "${article_id}" && "user_id"==$env.uid`)
						.update({last_time})
						.then(({result:{updated}}) => {
							console.log('updated',updated);
							if (!updated) {
								readQuestionsLog.add({article_id}).then(e=>{
									console.log(e);
								}).catch(err => {
									console.log(err);
								})
							}
						}).catch(err => {
							console.log(err);
						})
			},
			loadData(data) {
				//如果上一页未传递标题过来（如搜索直达详情），则从新闻详情中读取标题
				if (this.title == '' && data[0].title) {
					this.title = data[0].title
					uni.setNavigationBarTitle({
						title: data[0].title
					});

				}
				this.setReadQuestionsLog();
			},
			/**
			 * followClick
			 * 点击关注
			 */
			followClick() {
				uni.showToast({
					title:this.$t('listDetail.follow'),
					icon: 'none'
				});
			},
			/**
			 * 分享该文章
			 */
			// #ifdef APP
			shareClick() {
				let {
					_id,
					title,
					excerpt,
					avatar
				} = this.$refs.detail.dataList
				console.log( JSON.stringify({
					_id,
					title,
					excerpt,
					avatar
				}) );
				uniShare.show({
					content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
						type: 0,
						href: this.uniStarterConfig.h5.url + `/#/pages/list/detail?id=${_id}&title=${title}`,
						title: this.title,
						summary: excerpt,
						imageUrl: avatar + '?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
					},
					menus: [{
							"img": "/static/app-plus/sharemenu/wechatfriend.png",
							"text": this.$t('common.wechatFriends'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneSession"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/wechatmoments.png",
							"text": this.$t('common.wechatBbs'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneTimeline"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/mp_weixin.png",
							"text": this.$t('common.wechatApplet'),
							"share": {
								provider: "weixin",
								scene: "WXSceneSession",
								type: 5,
								miniProgram: {
									id: this.uniStarterConfig.mp.weixin.id,
									path: `/pages/list/detail?id=${_id}&title=${title}`,
									webUrl: this.uniStarterConfig.h5.url +
										`/#/pages/list/detail?id=${_id}&title=${title}`,
									type: 0
								},
							}
						},
						{
							"img": "/static/app-plus/sharemenu/weibo.png",
							"text": this.$t('common.weibo'),
							"share": {
								"provider": "sinaweibo"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/qq.png",
							"text": "QQ",
							"share": {
								"provider": "qq"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/copyurl.png",
							"text": this.$t('common.copy'),
							"share": "copyurl"
						},
						{
							"img": "/static/app-plus/sharemenu/more.png",
							"text": this.$t('common.more'),
							"share": "shareSystem"
						}
					],
					cancelText: this.$t('common.cancelShare'),
				}, e => { //callback
					console.log(e);
				})
			}
			// #endif
		}
	}
</script>

<style scoped>
	.header-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		font-size: 14px;
	}

	.detail-top{
		display: flex;
		height: 100rpx;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1px solid #efeded;
	}
	.t-btn{
		color: #007aff;
		font-size: 14px;
	}
	.t-title {
		font-size: 16px;
		font-weight: 700;
	}
	
	/* 标题 */
	.uni-title {
		display: flex;
		margin-bottom: 5px;
		font-size: 14px;
		font-weight: bold;
		color: #3b4144;
	}

	.difficulty{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.difficulty .d-title{
		font-size: 12px;
		color: #333;
		margin-right: 8rpx;
	}
	/* 描述 额外文本 */
	.uni-note {
		color: #999;
		font-size: 12px;

		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.footer {
		display: flex;
		align-items: center;
	}

	.footer-button {
		display: flex;
		align-items: center;
		font-size: 12px;
		height: 30px;
		color: #fff;
		background-color: #ff5a5f;
	}
	.popup-list{
		display: flex;
		flex-direction: column;
		padding-bottom: 20rpx;
		padding-top: 10rpx;
	}
	.popup-list text{
		display: block;
		line-height: 80rpx;
		text-align: center;
		font-weight: bold;
	}
	.popup-btn{
		display: block;
		text-align: center;
		line-height: 80rpx;
		border-top: 5px solid #efeded;
	}

	.banner {
		position: relative;
		margin: 0 15px;
		height: 180px;
		overflow: hidden;
	}

	.banner-img {
		position: absolute;
		width: 100%;
	}

	.banner-title {
		display: flex;
		align-items: center;
		position: absolute;
		padding: 0 15px;
		width: 100%;
		bottom: 0;
		height: 30px;
		font-size: 14px;
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
		overflow: hidden;
		box-sizing: border-box;
	}

	.uni-ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.article-title {
		padding: 20px 15px;
		padding-bottom: 0;
	}

	.article-content {
		padding: 15px;
		font-size: 15px;
		overflow: hidden;
	}
	.d-footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		background-color: #fdfdfd;
		border-top: 1px solid #efeded;
	}
	.down-menu{
		font-size: 14px;
	}
	.m-title{
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #007aff;
		font-weight: bold;
	}
	.m-title .icon{
		margin-right: 4rpx;
	}
	.fav-btn{
		background-color: #ff976a;
		height: 70rpx;
		line-height: 70rpx;
		width: 220rpx;
		text-align: center;
		color: #fff;
		font-size: 14px;
		border-radius: 40rpx;
		font-weight: bold;
	}
	.next-btn{
		background-color: #007aff;
		height: 70rpx;
		line-height: 70rpx;
		width: 220rpx;
		text-align: center;
		color: #fff;
		font-size: 14px;
		border-radius: 40rpx;
		font-weight: bold;
	}
</style>
