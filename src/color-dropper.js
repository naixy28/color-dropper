/**TODO
 * 
 * - copy on click
 * - 输入值的分析和过滤
 * - remove color with delete
 * persistence
 * 动画效果和样式
 * cloak
 * 分组？ 显示 隐藏
 */

function selectText (element) {
  let text = element,
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

    let colorStr = newColor && newColor.trim();
    if (!colorStr) return;
    if (isColor.test(colorStr)){
        colorStr = colorStr.toUpperCase().replace( addHash, '#' );
        return colorStr;
    }
    return;
}

const app = new Vue({

    data: {
        newColor: '',
        colors: [
            { key: 0, num: '#eaa' },
            { key: 1, num: '#aee' }
        ],
        maxKey: 1
    },

    computed: {
        filteredColors: function() {
            return this.colors;
        }
    },

    methods: {
        addColor: function () {
            let newColor = validationColorNum(this.newColor) || '';
            console.log( 'color:', newColor );
            newColor && this.colors.push( { key: this.maxKey+1, num: newColor } );
            this.newColor = '';
        },
        copyColor: function (colorNum, e) {
            // TODO need validation on ele type
            selectText(e.target);
            document.execCommand('copy');
        },
        removeColor: function (key) {
            let index = -1;
            for (let i = 0; i < this.colors.length; i++) {
                if (this.colors[i].key === key) {
                    index = i;
                    break;
                }
            }
            index >= 0 && this.colors.splice( index, 1 );
        }
    },

    watch: {
        colors: function (val) {
            let tempMax = 0;
            for ( let i = 0; i < val.length; i++){
                if (val[i].key > tempMax){
                    tempMax = val[i].key;
                }
            }
            this.maxKey = tempMax;
        }
    }
})

app.$mount('.app')