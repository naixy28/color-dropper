/**TODO
 * 
 * - copy on click
 * 输入值的分析和过滤
 * remove color
 * persistence
 * 动画效果和样式
 * cloak
 * 分组？ 显示 隐藏
 */

function selectText (element) {
  var text = element,
      range,
      selection;

  if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
  } else {
      return false;
  }
}

function validationColorNum ( newColor ) {
    const isColor = /^#{0,1}([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    const addHash = /^(?!#)/;

    var colorStr = newColor && newColor.trim();
    if (!colorStr) return;
    if (isColor.test(colorStr)){
        colorStr = colorStr.toUpperCase().replace( addHash, '#' );
        return colorStr;
    }
    return;
}

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
        },
        copyColor: function(colorNum, e) {
            // TODO need validation on ele type
            selectText(e.target);
            document.execCommand('copy');
        }
    }
})

app.$mount('.app')