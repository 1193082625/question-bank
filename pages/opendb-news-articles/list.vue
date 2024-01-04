<template>
  <view class="container">
    <unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :collection="collectionList">
      <view v-if="error">{{error.message}}</view>
      <view v-else-if="data">
        <uni-list>
          <uni-list-item v-for="(item, index) in data" :key="index" showArrow :clickable="true" @click="handleItemClick(item._id)">
            <template v-slot:body>
				<view class="article-item">
				  <text class="title">
					<!-- 此处默认显示为_id，请根据需要自行修改为其他字段 -->
					<!-- 如果使用了联表查询，请参考生成的 admin 项目中 list.vue 页面 -->
					{{item.title}}
				  </text>
				  <!-- todo 显示用户名 -->
				  <!-- <text>{{item.user_id[0].nickname}}</text> -->
				  <text class="excerpt">
					  {{item.excerpt}}
				  </text>
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
    <uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
  </view>
</template>

<script>
  const db = uniCloud.database()
  export default {
    data() {
      return {
        collectionList: [ db.collection('opendb-news-articles').field('user_id,category_id,title,content,excerpt,article_status,comment_status,last_comment_user_id,avatar,publish_date,last_modify_date,mode').getTemp(),db.collection('opendb-news-categories').field('name as text, _id').getTemp() ],
        loadMore: {
          contentdown: '',
          contentrefresh: '',
          contentnomore: ''
        }
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
    methods: {
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

<style>
	.article-item{
		display: flex;
		flex-direction: column;
	}
	.title{
		display: block;
		font-size: 14px;
	}
	.excerpt{
		display: block;
		font-size: 12px;
	}
</style>
