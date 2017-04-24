/**TODO
 * 
 * 输入值的分析和过滤
 * 动画效果和样式
 * cloak
 * 分组？ 显示 隐藏
 */

var app = new Vue({

    data: {
        newColor: '',
        colors: []
    },

    computed: {
        filteredColors: function() {
            return this.colors;
        }
    },

    methods: {
        addColor: function() {
            const colorObj = {
                num: this.newColor,
            };
            this.colors.push( { num: this.newColor } );
            this.newColor = '';
        }
    }
})

app.$mount('.app')