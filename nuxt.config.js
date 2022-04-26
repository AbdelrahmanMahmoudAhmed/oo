// import bootstrap from 'bootstrap'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: "qs-smart-nuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    script: [
      {
        body: true,
        src: "/bootstrap.js",
      },
      {
        body: true,
        src: "/jquery.js",
      },
      // {
      //   body: true,
      //   src: "/uikit.min.js",
      // },
      // {
      //   body: true,
      //   src: "/uikit-icons.min.js",
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/bootstrap.min.css", "@/assets/css/scss/style.scss"],  
  // , '@/assets/css/uikit.min.css'

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/scroller.js",
    "~plugins/loading.js",
    "~plugins/filters.js",
    "~plugins/mixins/requests.js",
    "~plugins/mixins/movies.js",
    "~plugins/mixins/single-movie.js",
    "~plugins/mixins/single-series.js",
    "~plugins/mixins/series.js",
    "~plugins/mixins/global.js",
    "~plugins/mixins/live.js",
    "~plugins/mixins/episode.js",
    // "~plugins/moment.js",
  ],

  // loading: {
  //   color: 'blue',
  //   height: '15px',
  //   throttle: 1000,
  //   duration: 5000
  // },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  axios: {
    proxy: true,
  },
  proxy: {
    "/token":
      "http://mag.4k-ott.com/portal.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml",

    "/profile":
      "http://mag.4k-ott.com/portal.php?type=stb&action=get_profile&JsHttpRequest=1-xml",
    "/info":
      "http://mag.4k-ott.com/portal.php?type=account_info&action=get_main_info&JsHttpRequest=1-xml",
    "/device": "https://qslivetv.com/api/device",
    "/genMAC": "https://db.hmaserv.online/genmac.php",
    "/moviesCategories":
      "http://mag.4k-ott.com/portal.php?type=vod&action=get_categories&JsHttpRequest=1-xml",
    "/moviesStreams":
      "http://mag.4k-ott.com/portal.php?type=vod&action=get_ordered_list&JsHttpRequest=1-xml",
    "/seriesCategories":
      "http://mag.4k-ott.com/portal.php?type=series&action=get_categories&JsHttpRequest=1-xml",
    "/seriesStreams":
      "http://mag.4k-ott.com/portal.php?type=series&action=get_ordered_list&force_ch_link_check=&JsHttpRequest=1-xml",
    // "/moviesStreams": "http://mag.4k-ott.com/portal.php?type=vod&action=get_ordered_list&JsHttpRequest=1-xml&p=1&search=&category=*"
    "/live-categories":
      "http://mag.4k-ott.com/portal.php?action=get_genres&type=itv&JsHttpRequest=1-xml",
    "/live-streams":
      "http://mag.4k-ott.com/portal.php?type=itv&action=get_all_channels&force_ch_link_check=&JsHttpRequest=1-xml",
    "/channelEpg":
      "http://mag.4k-ott.com/portal.php?JsHttpRequest=1-xml&size=200&type=itv&action=get_short_epg&ch_id=0",
    "/singleMovie": "https://qslivetv.com/getimdb.php?type=SearchMovie&title=",
    "/singleSeries":
      "https://qslivetv.com/getimdb.php?type=SearchSeries&title=",
    "/getSeasons":
      "http://mag.4k-ott.com/portal.php?type=series&action=get_ordered_list&movie_id=",
    "/getEpisode":
      "http://mag.4k-ott.com/portal.php?type=vod&action=create_link&cmd=&series=",
    "/getMovie":
      "http://mag.4k-ott.com/portal.php?type=vod&action=create_link&cmd=",
    "/getChannelLink":
      "http://mag.4k-ott.com/portal.php?type=itv&action=create_link&cmd=",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: "scripts/",
    presets: ["@nuxt/babel-preset-app"],
    extend(config, ctx) {
      config.optimization.minimize = false;
    },
  },

  generate: {
    publicPath: "scripts/",
    presets: ["@nuxt/babel-preset-app"],
    extend(config, ctx) {
      config.optimization.minimize = false;
    },
  },
};
