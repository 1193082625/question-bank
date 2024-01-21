<template>
  <view class="container">
	<customTab :tabDatas="tabDatas" @categoryChanged="categoryChanged">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList">
		  <view v-if="error">{{error.message}}</view>
		  <view v-else-if="data">
			<!-- 内容 -->
			<uni-list>
			  <uni-list-item v-for="(item, index) in data" :key="index" :clickable="true" @click="handleItemClick(item._id)">
				<template v-slot:body>
					<view class="article-item">
					  <text class="title">
						<!-- 此处默认显示为_id，请根据需要自行修改为其他字段 -->
						<!-- 如果使用了联表查询，请参考生成的 admin 项目中 list.vue 页面 -->
						{{item.title}}
					  </text>
					  <!-- todo 显示用户名 -->
					  <view class="time-box">
					  	<text>更新时间：</text>
					  <uni-dateformat class="last_modify_date" :date="item.last_modify_date" format="yyyy-MM-dd"/>
					  </view>
					  <view class="like-box">
						  <text v-if="item.like_count > 0">{{item.like_count}}赞同</text>
					  </view>
					</view>
				</template>
			  </uni-list-item>
			</uni-list>
		  </view>
		  <uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
	</customTab>
    <!-- <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" /> -->
  </view>
</template>

<script>
  const db = uniCloud.database()
  export default {
    data() {
      return {
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        },
		tabDatas: [],
		currentCategory: '',
      }
    },
	computed: {
		where() {
			return this.currentCategory ? `category_id == '${this.currentCategory}'` : '';
		},
        collectionList() {
			return  [ db.collection('opendb-news-articles').where(this.where).field('user_id,category_id,title,content,last_modify_date').getTemp(),db.collection('opendb-news-categories').field('name as text, _id').getTemp() ];
		}
	},
    onPullDownRefresh() {
      this.$refs.udb.loadData({
        clear: true
      }, () => {
        uni.stopPullDownRefresh()
      })
    },
    onReachBottom() {
      this.$refs.udb.loadMore()
    },
	onLoad() {
		this.getCategories()
	},
    methods: {
		async getCategories() {
			const {result} = await db.collection('opendb-news-categories').field('name, _id').get();
			this.tabDatas = result.data;
			if(result.data) {
				this.currentCategory = result.data[0]._id;
			}
		},
		categoryChanged(id) {
			this.currentCategory = id;
		},
      handleItemClick(id) {
        uni.navigateTo({
          url: './detail?id=' + id
        })
      },
      fabClick() {
        // 打开新增页面
        uni.navigateTo({
          url: './add',
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

<style scoped>
	.content {
		/* background: #008000; */
		height: 100%;
	}
	.article-item{
		display: flex;
		flex-direction: column;
	}
	.title{
		display: block;
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 10rpx;
		overflow: hidden;
		width: 700rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.time-box text,
	.last_modify_date {
		font-size: 12px;
		color: #999999;
	}
	.excerpt{
		display: block;
		font-size: 12px;
	}
</style>
