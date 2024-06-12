// src/components/my-silder/my-slider.js
let calcPos = {}
let sliderWidth = 0
let sliderLeft = 0
let dragVal = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      value: 0,
      type: Number
    },
    disabled: {
      type: Boolean,
      value: false
    },
    activeColor: {
      type: String,
      value: '#00E3AB'
    },
    min: {
      value: 0,
      type: Number
    },
    max: {
      type: Number,
      value: 100
    },
    step: {
      value: 1,
      type: Number
    },
    lock:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    posVal: 0,
    _posVal: 0,
    dragVal:0,
    moveLock:false
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const query = wx.createSelectorQuery().in(this);
      query
        .select('.readers-slider')
        .boundingClientRect(data => {
          console.log(data);
          sliderWidth = data.width;
          sliderLeft = data.left
          console.log(this.data)
        })
        .exec();
     
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  observers: {
    'value': function(val) {
      if (this.data.moveLock){
        return false
      }
      let posVal = ((val - this.data.min) * 100) / (this.data.max - this.data.min);
      this.setData({
        posVal: posVal
      })
    },
    'lock': function(val) {
      this.moveLock = val
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      let { disabled, step, max, min, posVal, _posVal } = this.data;
      if (disabled) return;
      this.data.moveLock = true
      // var val = e.target.dataset.mun * (100 / this.density);
      let Pos_v = ((e.detail.x - sliderLeft) / sliderWidth) * 100;
      let val = Math.round(Pos_v);
      let r = (100 / (max - min)) * step;
      let v = Math.round(val / r) * r;
      _posVal = v;
      let d = max - min;
      dragVal = Math.round(((d * _posVal) / 100 + min) * 100) / 100;
      console.log(dragVal)
      this.setData({
        posVal: _posVal
      })
      this.triggerEvent('changed', { progress: _posVal, value: dragVal })
      setTimeout(() => {
        this.data.moveLock = false
      }, 1000)
      // this.$emit("changing",val);
    },
    touchS(e) {
      let { disabled, step, max, min, posVal, _posVal } = this.data;
      if (disabled) return;
      this.data.moveLock = true
      // console.log(sliderWidth, '---start--');
      let s = e.changedTouches[0];
      calcPos.touchS = s;
      calcPos.touchS.val = posVal;
      console.log(posVal);
    },
    touchM(e) {
      let { disabled, step, max, min, posVal, _posVal } = this.data;
      if (disabled) return;
      // console.log(e.changedTouches[0],this.posVal, '---move--');
      let m = e.changedTouches[0];
      let Pos_v = Number(calcPos.touchS.val) + ((m.pageX - calcPos.touchS.pageX) / sliderWidth) * 100;
      let val = Math.round(Pos_v);
      if (val > 100) {
        _posVal = 100;
      } else if (val < 0) {
        _posVal = 0;
      } else {
        let r = (100 / (max - min)) * step;
        let v = Math.round(val / r) * r;
        _posVal = v;
      }
      var d = max - min;
      dragVal = Math.round(((d * _posVal) / 100 + min) * 100) / 100;
      this.setData({
        posVal: _posVal
      })
      this.triggerEvent('changing', { progress: posVal, value: dragVal})
    },
    touchE(e) {
      let { disabled, step, max, min, posVal, _posVal } = this.data;
      if (disabled) return;
      this.triggerEvent('changed', { progress: posVal, value: dragVal })
      setTimeout(() => {
        this.data.moveLock = false
      }, 1000)
    }
  }
})
