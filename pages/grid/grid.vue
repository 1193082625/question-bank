<template>
	<view class="warp">
		<!-- #ifdef APP-PLUS -->
		<statusBar></statusBar>
		<!-- #endif -->
		
		<!-- banner -->
		<unicloud-db ref="bannerdb" v-slot:default="{data, loading, error, options}" collection="opendb-banner"
			field="_id,bannerfile,open_url,title" @load="onqueryload">
			<!-- 当无banner数据时显示占位图 -->
			<image v-if="!(loading||data.length)" class="banner-image" src="/static/uni-center/headers.png" mode="aspectFill" :draggable="false" />
			
			<swiper v-else class="swiper-box" @change="changeSwiper" :current="current" indicator-dots>
				<swiper-item v-for="(item, index) in data" :key="item._id">
					<view class="swiper-item" @click="clickBannerItem(item)">
						<image class="banner-image" :src="item.bannerfile.url" mode="aspectFill" :draggable="false" />
					</view>
				</swiper-item>
			</swiper>
		</unicloud-db>
		
		<uni-notice-bar showIcon scrollable single text="截止现在,已录入800题"></uni-notice-bar>

		
		<view class="last-work-time">
			<text>上次练习时间：2023-12-27 17:28</text>
			<button type="default">继续刷题</button>
		</view>
		<!-- 宫格 -->
		<view class="section-box">
			<text class="decoration"></text>
			<text class="section-text">{{$t('grid.grid')}}</text>
		</view>
		
		<unicloud-db ref="udb" collection="question-categories" field="name, description" v-slot:default="{data, loading, error, options}">
			<view v-if="error">{{error.message}}</view>
			<view v-else class="example-body">
				<uni-grid :column="3" :highlight="true" @change="change">
					<template v-for="(item,i) in data">
						<uni-grid-item :index="i" :key="i" >
							<view class="grid-item-box" style="background-color: #fff;" @click="goList(item._id)">
								<!-- <image :src="'/static/grid/c'+(i+1)+'.png'" class="image" mode="aspectFill" /> -->
								<text class="iconfont" :class="item.description"></text>
								<text class="big-number">{{item.name}}</text>
							</view>
						</uni-grid-item>
					</template>
				</uni-grid>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";
	// #endif
	export default {
		// #ifdef APP-PLUS
		components: {
			statusBar
		},
		// #endif
		data() {
			return {
				gridList: [],
				current: 0,
				hasLogin:false
			}
		},
		onShow() {
			this.hasLogin = uniCloud.getCurrentUserInfo().tokenExpired > Date.now()
		},
		onLoad() {
			let gridList = []
			for (var i = 0; i < 3; i++) {
				gridList.push( this.$t('grid.visibleToAll') )
			}
			for (var i = 0; i < 3; i++) {
				gridList.push( this.$t('grid.invisibleToTourists') )
			}
			for (var i = 0; i < 3; i++) {
				gridList.push( this.$t('grid.adminVisible') )
			}
			this.gridList = gridList
		},
		methods: {
			goList(cId) {
				console.log('要进入列表页了', cId);
				uni.reLaunch({
					url: `/pages/list/list?category_id=${cId}`,
					success: function(e) {
						var page = getCurrentPages()[0];
						if (page == undefined || page == null) return;
						page.onLoad(); 
				   }
				})
			},
			change(e) {
				uni.showToast({
					title:this.$t('grid.clickTip') + " " + `${e.detail.index + 1}` + " " + this.$t('grid.clickTipGrid'),
					icon: 'none'
				})
			},
			/**
			 * banner加载后触发的回调
			 */
			onqueryload(data) {
			},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			/**
			 * 点击banner的处理
			 */
			clickBannerItem(item) {
				// 有外部链接-跳转url
				if (item.open_url) {
					uni.navigateTo({
						url: '/uni_modules/uni-id-pages/pages/common/webview/webview?url=' + item.open_url + '&title=' + item.title,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				// 其余业务处理
			}
		}
	}
</script>

<style>
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}
	view {
		font-size: 14px;
		line-height: inherit;
	}
	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}
	/* #endif */
	.last-work-time{
		display: flex;
		align-items: center;
	}
	.section-box{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-top: 20rpx;
	}
	.decoration{
		width: 4px;
		height: 12px;
		border-radius: 10px;
		background-color: #2979ff;
	}
	.section-text{
		color: #333;
		margin-left: 15rpx;
	}

	/* #ifdef APP-NVUE */
	.warp {
		background-color: #fff;
	}
	/* #endif */

	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.image {
		width: 50rpx;
		height: 50rpx;
	}
	
	.iconfont {
		font-size: 58rpx;
		margin-bottom: 8rpx;
	}
	
	.big-number{
		font-size: 26rpx;
		font-weight: 700;
		font-stretch: condensed;
	}
	
	.text {
		text-align: center;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.banner-image {
		width: 750rpx;
		height: 400rpx;
	}

	.swiper-box {
		height: 400rpx;
	}

	.search-icons {
		padding: 16rpx;
	}

	.search-container-bar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #fff;
	}

	/* #ifndef APP-NVUE || VUE3*/
	::v-deep
	/* #endif */
	.uni-searchbar__box {
		border-width: 0;
	}

	/* #ifndef APP-NVUE || VUE3 */
	::v-deep
	/* #endif */
	.uni-input-placeholder {
		font-size: 28rpx;
	}
</style>
