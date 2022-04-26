import Vue from 'vue'

export default () => {
    Vue.filter('formatDate', function (value) {
        var date1 = new Date();
        var date2 = new Date(value);
        var difference = date1.getTime() - date2.getTime();
        var days = Math.ceil(difference / (1000 * 3600 * 24));
        if (days == 1) {
            value = "TODAY";
        } else if (days == 2) {
            value = "YESTERDAY";
        } else if (days <= 8) {
            value = "THIS WEEK";
        } else {
            value = value;
        }
        return value
    })
}