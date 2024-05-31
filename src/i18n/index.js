import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
	locale: localStorage.getItem("karry-sg-monitor-langs") || "zh",
	messages: {
		zh: require("./langs/zh"),
		en: require("./langs/en"),
		vie: require("./langs/vie")
	}
});


export default i18n;