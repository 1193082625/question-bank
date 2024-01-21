<template>
	<view v-if="tabDatas.length">
		<!--顶部导航栏-->
		<scroll-view
			class="scroll-view_H"
			scroll-x="true"
			@scroll="scroll"
		>
			<view
				class="scroll-view-item_H"
				v-for="(tab,index) in tabDatas"
				:key="tab._id"
				:id="tab._id"
				:class="navIndex==index ? 'activite' : ''"
				@tap="checkIndex(index)"
			>
				{{tab.name}}
			</view>
		</scroll-view>
		
		<swiper v-if="needSwiper" :current="navIndex" @change="tabChange" class="tab-content">
			<swiper-item class="swiper_item " v-for="(item, tab) in tabDatas">
				{{item.name}}
			</swiper-item>
		</swiper>
		
		<view v-else>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"customTab",
		data() {
			return {
				scrollTop: 0,
				navIndex: 0,
			};
		},
		props: {
			tabDatas: {
				type: Array,
				default: []
			},
			needSwiper: {
				type: Boolean,
				default: false,
			}
		},
		methods: {
			checkIndex(index) {
				this.navIndex = index;
				this.$emit('categoryChanged', this.tabDatas[index]._id);
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			//滑动切换swiper
			tabChange(e) {
				const navIndex = e.detail.current
				this.navIndex = navIndex
			},
		}
	}
</script>

<style scoped>
.activite {
	color: #007AFF;
}
.tab-content {
	height: calc(100vh - 188rpx);
}
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
	color: #CCCCCC;
}
.scroll-view-item_H {
	display: inline-block;
	width: 33%;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	padding: 10px 0;
	font-size: 32rpx;
}
</style>