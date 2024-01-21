<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(item) {
			this.url = decodeURIComponent(item.url)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
