<template>
	<div @click="click">
		<div class="cap-floating-nav__item">
			<van-icon class="floating-nav__icon" :name="iconName" size="26" color="#fff"/>
		</div>
		<div class="cap-floating-nav__span">
			<span class="floating-nav__text">{{ text }}</span>
		</div>
	</div>
</template>

<script>
	import { Icon } from "vant"

	export default {
		name: 'FloatNav',
		components: {
			[Icon.name]: Icon
		},
		props: {
			text: {
				type: String,
				default: "界面切换"
			},
			iconName: {
				type: String,
			    default: "notes-o"
			}
		},
		data() {
			return {}
		},
		methods: {
			click() {
				this.$emit("floatNav")
			}
		}
	}
</script>

<style>
	.cap-floating-nav__item {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background-color: #708090;
		background-position: 50%;
	    background-size: cover;
	    box-shadow: 0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.16);
	    cursor: pointer;
	    margin: 0;
	    padding: 0;
	    border: 0;
	    font: inherit;
	    font-size: 100%;
	    vertical-align: baseline;
	    display: block;
	    position: fixed;
	    bottom: 5.1rem;
	    left: 1.125rem;
	    text-align: center;
	}

	.floating-nav__icon{
		position: relative;
		top: 10%;
	}

	.floating-nav__text{
		color: #fff;
	}

	.cap-floating-nav__span {
		width: 3rem;
		height: 1rem;
		border-radius: 25%;
		background-color: #708090;
		background-position: 50%;
	    background-size: cover;
	    box-shadow: 0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.16);
	    cursor: pointer;
	    margin: 0;
	    padding: 0;
	    border: 0;
	    font: inherit;
	    font-size: 0.75rem;
	    vertical-align: baseline;
	    display: block;
	    position: fixed;
	    bottom: 4rem;
	    left: 0.625rem;
	    text-align: center;
	}
</style>