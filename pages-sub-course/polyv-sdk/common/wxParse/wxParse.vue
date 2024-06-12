<template>
<uni-shadow-root class="polyv-sdk-common-wxParse-wxParse"><template v-if="wxTemplateName === 'wxParseVideo'">
  
  <view :class="'wxParse-view '+(item.classStr)+' wxParse-'+(item.tag)" :style="item.styleStr">
    <video :class="(item.classStr)+' wxParse-'+(item.tag)+'-video'" :src="item.attr.src"></video>
  </view>


<template v-if="wxTemplateName === 'wxParseImg'">
  <image :class="(item.classStr)+' wxParse-'+(item.tag)" :data-from="item.from" :data-src="item.attr.src" :data-idx="item.imgIndex" :src="item.attr.src" mode="aspectFit" @load="_$self.$parent.$parent[('wxParseImgLoad')]($event)" @click="_$self.$parent.$parent[('wxParseImgTap')]($event)" :style="'width:'+(item.width)+'px;'"></image>


<template v-if="wxTemplateName === 'WxEmojiView'">
  <view class="wxParse-view WxEmojiView wxParse-inline" :style="item.styleStr">
    <block v-for="(item,index) in (item.textArray)" :key="item.index">
      <block :class="item.text == '\\n' ? 'wxParse-hide':''" v-if="item.node == 'text'">{{item.text}}</block>
      <block v-else-if="item.node == 'element'">
        <image class="wxEmoji" :src="(item.baseSrc)+(item.text)"></image>
      </block>
    </block>
  </view>


<template v-if="wxTemplateName === 'WxParseBr'">
  <text>\n</text>



<template v-if="wxTemplateName === 'wxParse'">
  <block v-for="(item,index) in (wxParseData)" :key="item.index">
    <wxParse0 v-bind="{item}" wx-template-name="wxParse0"></wxParse0>
  </block>




<template v-if="wxTemplateName === 'wxParse0'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse1 v-bind="{item}" wx-template-name="wxParse1"></wxParse1>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse1 v-bind="{item}" wx-template-name="wxParse1"></wxParse1>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse1 v-bind="{item}" wx-template-name="wxParse1"></wxParse1>
        </block>
      </view>
    </block>
    <block v-else-if="item.tag == 'table'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse1 v-bind="{item}" wx-template-name="wxParse1"></wxParse1>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse1 v-bind="{item}" wx-template-name="wxParse1"></wxParse1>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse1 v-bind="{item}" wx-template-name="wxParse1"></wxParse1>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>






<template v-if="wxTemplateName === 'wxParse1'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse2 v-bind="{item}" wx-template-name="wxParse2"></wxParse2>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse2 v-bind="{item}" wx-template-name="wxParse2"></wxParse2>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse2 v-bind="{item}" wx-template-name="wxParse2"></wxParse2>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse2 v-bind="{item}" wx-template-name="wxParse2"></wxParse2>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse2 v-bind="{item}" wx-template-name="wxParse2"></wxParse2>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>





<template v-if="wxTemplateName === 'wxParse2'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse3 v-bind="{item}" wx-template-name="wxParse3"></wxParse3>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse3 v-bind="{item}" wx-template-name="wxParse3"></wxParse3>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse3 v-bind="{item}" wx-template-name="wxParse3"></wxParse3>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse3 v-bind="{item}" wx-template-name="wxParse3"></wxParse3>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse3 v-bind="{item}" wx-template-name="wxParse3"></wxParse3>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse3'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse4 v-bind="{item}" wx-template-name="wxParse4"></wxParse4>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse4 v-bind="{item}" wx-template-name="wxParse4"></wxParse4>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse4 v-bind="{item}" wx-template-name="wxParse4"></wxParse4>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse4 v-bind="{item}" wx-template-name="wxParse4"></wxParse4>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse4 v-bind="{item}" wx-template-name="wxParse4"></wxParse4>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse4'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse5 v-bind="{item}" wx-template-name="wxParse5"></wxParse5>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse5 v-bind="{item}" wx-template-name="wxParse5"></wxParse5>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse5 v-bind="{item}" wx-template-name="wxParse5"></wxParse5>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse5 v-bind="{item}" wx-template-name="wxParse5"></wxParse5>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse5 v-bind="{item}" wx-template-name="wxParse5"></wxParse5>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse5'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse6 v-bind="{item}" wx-template-name="wxParse6"></wxParse6>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse6 v-bind="{item}" wx-template-name="wxParse6"></wxParse6>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse6 v-bind="{item}" wx-template-name="wxParse6"></wxParse6>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse6 v-bind="{item}" wx-template-name="wxParse6"></wxParse6>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse6 v-bind="{item}" wx-template-name="wxParse6"></wxParse6>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse6'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse7 v-bind="{item}" wx-template-name="wxParse7"></wxParse7>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse7 v-bind="{item}" wx-template-name="wxParse7"></wxParse7>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-inline wxParse-view '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse7 v-bind="{item}" wx-template-name="wxParse7"></wxParse7>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse7 v-bind="{item}" wx-template-name="wxParse7"></wxParse7>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse7 v-bind="{item}" wx-template-name="wxParse7"></wxParse7>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>



<template v-if="wxTemplateName === 'wxParse7'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse8 v-bind="{item}" wx-template-name="wxParse8"></wxParse8>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse8 v-bind="{item}" wx-template-name="wxParse8"></wxParse8>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-inline wxParse-view '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse8 v-bind="{item}" wx-template-name="wxParse8"></wxParse8>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse8 v-bind="{item}" wx-template-name="wxParse8"></wxParse8>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse8 v-bind="{item}" wx-template-name="wxParse8"></wxParse8>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse8'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse9 v-bind="{item}" wx-template-name="wxParse9"></wxParse9>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse9 v-bind="{item}" wx-template-name="wxParse9"></wxParse9>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse9 v-bind="{item}" wx-template-name="wxParse9"></wxParse9>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse9 v-bind="{item}" wx-template-name="wxParse9"></wxParse9>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse9 v-bind="{item}" wx-template-name="wxParse9"></wxParse9>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse9'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse10 v-bind="{item}" wx-template-name="wxParse10"></wxParse10>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse10 v-bind="{item}" wx-template-name="wxParse10"></wxParse10>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse10 v-bind="{item}" wx-template-name="wxParse10"></wxParse10>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse10 v-bind="{item}" wx-template-name="wxParse10"></wxParse10>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse10 v-bind="{item}" wx-template-name="wxParse10"></wxParse10>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse10'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse11 v-bind="{item}" wx-template-name="wxParse11"></wxParse11>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse11 v-bind="{item}" wx-template-name="wxParse11"></wxParse11>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-inline wxParse-view '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse11 v-bind="{item}" wx-template-name="wxParse11"></wxParse11>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse11 v-bind="{item}" wx-template-name="wxParse11"></wxParse11>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse11 v-bind="{item}" wx-template-name="wxParse11"></wxParse11>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>




<template v-if="wxTemplateName === 'wxParse11'">
  
  
  <block v-if="item.node == 'element'">
    <block v-if="item.tag == 'button'">
      <button type="default" size="mini">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse12 v-bind="{item}" wx-template-name="wxParse12"></wxParse12>
        </block>
      </button>
    </block>
    
    <block v-else-if="item.tag == 'li'">
      <view :class="(item.classStr)+' wxParse-view wxParse-li'" :style="item.styleStr">
        <view :class="(item.classStr)+' wxParse-view wxParse-li-inner'">
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <view :class="(item.classStr)+' wxParse-view wxParse-li-circle'"></view>
          </view>
          <view :class="(item.classStr)+' wxParse-view wxParse-li-text'">
            <block v-for="(item,index) in (item.nodes)" :key="item.index">
              <wxParse12 v-bind="{item}" wx-template-name="wxParse12"></wxParse12>
            </block>
          </view>
        </view>
      </view>
    </block>

    
    <block v-else-if="item.tag == 'video'">
      <wxParseVideo v-bind="{item}" wx-template-name="wxParseVideo"></wxParseVideo>
    </block>

    
    <block v-else-if="item.tag == 'img'">
      <wxParseImg v-bind="{item}" wx-template-name="wxParseImg"></wxParseImg>
    </block>

    
    <block v-else-if="item.tag == 'a'">
      <view @click="_$self.$parent.$parent[('wxParseTagATap')]($event)" :class="'wxParse-view wxParse-inline '+(item.classStr)+' wxParse-'+(item.tag)" :data-src="item.attr.href" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse12 v-bind="{item}" wx-template-name="wxParse12"></wxParse12>
        </block>
      </view>
    </block>

    <block v-else-if="item.tag == 'br'">
      <WxParseBr wx-template-name="WxParseBr"></WxParseBr>
    </block>
    
    <block v-else-if="item.tagType == 'block'">
      <view :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)" :style="item.styleStr">
        <block v-for="(item,index) in (item.nodes)" :key="item.index">
          <wxParse12 v-bind="{item}" wx-template-name="wxParse12"></wxParse12>
        </block>
      </view>
    </block>

    
    <view v-else :class="(item.classStr)+' wxParse-view wxParse-'+(item.tag)+' wxParse-'+(item.tagType)" :style="item.styleStr">
      <block v-for="(item,index) in (item.nodes)" :key="item.index">
        <wxParse12 v-bind="{item}" wx-template-name="wxParse12"></wxParse12>
      </block>
    </view>

  </block>

  
  <block v-else-if="item.node == 'text'">
    
    <WxEmojiView v-bind="{item}" wx-template-name="WxEmojiView"></WxEmojiView>
  </block>

</uni-shadow-root>


</template><script>

global['__wxRoute'] = 'polyv-sdk/common/wxParse/wxParse'
import showdown from"./showdown.js";import HtmlToJson from"./html2json.js";var realWindowWidth=0,realWindowHeight=0;function wxParse(a="wxParseData",e="html",t='<div class="color:red;">数据不能为空</div>',i,r){var o=i,s={};if("html"==e)s=HtmlToJson.html2json(t,a);else if("md"==e||"markdown"==e){var n=(new showdown.Converter).makeHtml(t);s=HtmlToJson.html2json(n,a)}s.view={},s.view.imagePadding=0,void 0!==r&&(s.view.imagePadding=r);var m={};m[a]=s,o.setData(m),o.wxParseImgLoad=wxParseImgLoad,o.wxParseImgTap=wxParseImgTap}function wxParseImgTap(a){var e=a.target.dataset.src,t=a.target.dataset.from;void 0!==t&&t.length>0&&wx.previewImage({current:e,urls:this.data[t].imageUrls})}function wxParseImgLoad(a){var e=a.target.dataset.from,t=a.target.dataset.idx;void 0!==e&&e.length>0&&calMoreImageInfo(a,t,this,e)}function calMoreImageInfo(a,e,t,i){var r=t.data[i];if(r&&0!=r.images.length){var o=r.images,s=wxAutoImageCal(a.detail.width,a.detail.height,t,i),n=o[e].index,m=`${i}`;for(var d of n.split("."))m+=`.nodes[${d}]`;var w=m+".width",g=m+".height";t.setData({[w]:s.imageWidth,[g]:s.imageheight})}}function wxAutoImageCal(a,e,t,i){var r,o=0,s=0,n={},m=t.data[i].view.imagePadding;return realWindowHeight,a>(r=realWindowWidth-2*m)?(s=(o=r)*e/a,n.imageWidth=o,n.imageheight=s):(n.imageWidth=a,n.imageheight=e),n}function wxParseTemArray(a,e,t,i){for(var r=[],o=i.data,s=null,n=0;n<t;n++){var m=o[e+n].nodes;r.push(m)}a=a||"wxParseTemArray",(s=JSON.parse('{"'+a+'":""}'))[a]=r,i.setData(s)}function emojisInit(a="",e="/wxParse/emojis/",t){HtmlToJson.emojisInit(a,e,t)}wx.getSystemInfo({success:function(a){realWindowWidth=a.windowWidth,realWindowHeight=a.windowHeight}}),module.exports={wxParse:wxParse,wxParseTemArray:wxParseTemArray,emojisInit:emojisInit};
export default global['__wxComponents']['polyv-sdk/common/wxParse/wxParse']
</script>
<style platform="mp-weixin">
@charset "UTF-8";.wxParse{margin:0 5px;font-family:Helvetica,sans-serif;font-size:28rpx;color:#666;line-height:1.8}.wxParse-view{word-break:break-all;overflow:auto}.wxParse-inline{display:inline}.wxParse-div,.wxParse-inline{margin:0;padding:0}.wxParse-h1{font-size:2em;margin:.67em 0}.wxParse-h2{font-size:1.5em;margin:.75em 0}.wxParse-h3{font-size:1.17em;margin:.83em 0}.wxParse-h4{margin:1.12em 0}.wxParse-h5{font-size:.83em;margin:1.5em 0}.wxParse-h6{font-size:.75em;margin:1.67em 0}.wxParse-h1{font-size:18px;font-weight:400;margin-bottom:.9em}.wxParse-h2{font-size:16px}.wxParse-h2,.wxParse-h3{font-weight:400;margin-bottom:.34em}.wxParse-h3{font-size:15px}.wxParse-h4{font-weight:400;font-size:14px;margin-bottom:.24em}.wxParse-h5{font-weight:400;font-size:13px;margin-bottom:.14em}.wxParse-h6{font-weight:400;font-size:12px;margin-bottom:.04em}.wxParse-b,.wxParse-h1,.wxParse-h2,.wxParse-h3,.wxParse-h4,.wxParse-h5,.wxParse-h6,.wxParse-strong{font-weight:bolder}.wxParse-address,.wxParse-cite,.wxParse-em,.wxParse-i,.wxParse-var{font-style:italic}.wxParse-code,.wxParse-kbd,.wxParse-pre,.wxParse-samp,.wxParse-tt{font-family:monospace}.wxParse-pre{white-space:pre}.wxParse-big{font-size:1.17em}.wxParse-small,.wxParse-sub,.wxParse-sup{font-size:.83em}.wxParse-sub{vertical-align:sub}.wxParse-sup{vertical-align:super}.wxParse-del,.wxParse-s,.wxParse-strike{text-decoration:line-through}.wxParse-s,.wxParse-strong{display:inline}.wxParse-a{color:#00bfff;word-break:break-all;overflow:auto}.wxParse-video{text-align:center;margin:10px 0}.wxParse-video-video{width:100%}.wxParse-img{overflow:hidden}.wxParse-blockquote{margin:0;padding:10px 0 10px 5px;font-family:Courier,Calibri,宋体;background:#f5f5f5;border-left:3px solid #dbdbdb}.wxParse-code,.wxParse-wxxxcode-style{display:inline;background:#f5f5f5}.wxParse-ul{margin:20rpx 10rpx}.wxParse-li,.wxParse-li-inner{display:flex;align-items:baseline;margin:10rpx 0}.wxParse-li-text{align-items:center;line-height:20px}.wxParse-li-circle{display:inline-flex;width:5px;height:5px;background-color:#333;margin-right:5px}.wxParse-li-square{background-color:#333}.wxParse-li-ring,.wxParse-li-square{display:inline-flex;width:10rpx;height:10rpx;margin-right:5px}.wxParse-li-ring{border:2rpx solid #333;border-radius:50%;background-color:#fff}.wxParse-u{text-decoration:underline}.wxParse-hide{display:none}.WxEmojiView{align-items:center}.wxEmoji{width:16px;height:16px}.wxParse-tr{display:flex;border-right:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;border-top:1px solid #e0e0e0}.wxParse-td,.wxParse-th{flex:1;padding:5px;font-size:28rpx;border-left:1px solid #e0e0e0;word-break:break-all}.wxParse-td:last,.wxParse-th{border-top:1px solid #e0e0e0}.wxParse-th{background:#f0f0f0}.wxParse-del{display:inline}.wxParse-figure{overflow:hidden}
	.chucuno {
		position: absolute;
		top: 50%;
		margin-top: -150rpx;
		z-index: 99999;
		left: 50%;
		margin-left: -325rpx;
	}

.back-tankuang {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99999;
		height: 100%;
		background: rgba(51, 51, 51, 0.5);
	}</style>