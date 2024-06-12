<template>
	<page-meta :root-font-size="`${szieArr}px`"></page-meta>
	<view class="questions" :class="showPop ? 'all-list': ''" :scroll-into-view="topItem">
		<view class="questions-top">
			<view class="questions-right" v-if="couti==2" @tap="goLastTwo()">
				<image :src="imageUrl+'/image/fanhui.png'" mode=""></image>
			</view>
			<view class="questions-right" v-if="couti==1" @tap="goLastTwo()">
				<image :src="imageUrl+'/image/fanhui.png'" mode=""></image>
			</view>
			<view class="questions-right" v-if="couti==3" @tap="goLastTwo()">
				<image :src="imageUrl+'/image/fanhui.png'" mode=""></image>
			</view>
			<view class="daojishi" v-if="couti==2">
				测试模式
			</view>
			<view class="daojishi" v-if="isAss==false&&couti==1&&sourceType!=99&&sourceType!=100">
				练习模式
			</view>
			<view class="daojishi" v-if="isAss==true&&couti==1&&sourceType!=99&&sourceType!=100">
				背题模式
			</view>
			<view class="daojishi" v-if="couti==3||sourceType==99 ||sourceType==100">
				答题解析
			</view>
			<view class="questions-right21">
			</view>
		</view>

		<!-- 练习头部 -->
		<view class="jeixise" v-if="couti==1||couti==3">
			<view class="jeixise-flex" v-if="sourceType!=3&&sourceType!=99&&sourceType!=100">
				{{ testxt}}
			</view>
			<view class="" v-else>
				<view class="jeixise-flex" v-if="sourceType==99||sourceType==100">
					查看原题
				</view>
				<view class="jeixise-flex" v-else>
					智能组卷
				</view>
			</view>
			<view class="imgw" @click="open" v-if="sourceType!=99&&sourceType!=100">
				<view class="color">
					{{lists.subNo==undefined?0:lists.subNo}}
				</view>
				<view class="color2">
					/{{listLength}}
				</view>
			</view>
		</view>
		<!-- 测试模式头部 -->
		<view class="jeixise" v-if="couti==2">
			<view class="jeixise-flex">
				<image :src="imageUrl+'/image/时间.png'" class="naozhong" mode=""></image>
				<uCounDown ref="uCountDown" :timestamp="useTime" :autoplay="true" :isAss='autoplay'></uCounDown>
				<image :src="imageUrl+'/image/zanting.png'" class="zantin" @click="autoplay=!autoplay" mode=""></image>
			</view>
			<view class="imgw">
				<view class="color">
					{{lists.subNo==undefined?0:lists.subNo}}
				</view>
				<view class="color2">
					/{{listLength}}
				</view>
			</view>
		</view>

		<!-- //测试模式 -->
		<view class="" v-if="couti==2" v-show="showde">
			<!-- 答题模式 -->
			<view class="questions-center" v-if="isAss==false">
				<view class="questions-title">
					<view class="biaoqian" v-if="ListType==1">
						单选题
					</view>
					<view class="biaoqian" v-else-if="ListType==2">
						多选题
					</view>
					<view class="biaoqian" v-else-if="ListType==3 ">
						{{topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'共用题干-多选题':'共用题干-单选题'}}
					</view>
					<view class="biaoqian" v-else-if="ListType==10">
						{{topicList.questionPaperSubjectSubordinatesList[0].liftingType!=5?topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'材料题-多选题':'材料题-单选题':'材料题-解答题'}}
					</view>
					<view class="biaoqian" v-else-if="ListType==4">
						{{topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'共用选项-多选题':'共用选项-单选题'}}
					</view>
				</view>
				<view class="theTitle" v-if="ListType==1 || ListType==2">
					{{lists.subNo==undefined? '':lists.subNo+'.'}}
					<mp-html class='zitso' :content="topicList.stem"> </mp-html>
				</view>
				<view class="theTitle" v-else-if="ListType==3||ListType==4||ListType==10">
					{{lists.parentNo==undefined? '':lists.parentNo+'.'}}
					<mp-html class='zitso' :content="topicList.stem"> </mp-html>
				</view>
				<view class="" v-if="ListType==1">
					<view class="flex" v-for="(item,index) in topicList.questionPaperOption" :key='index'
						@click="onIput(item, index,'chu','xia')">
						<view class="moren" v-if="lists.isAss==0">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-else-if="lists.Theanswer.indexOf(item.id)==-1">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-if="lists.Theanswer.indexOf(item.id)!=-1">
							<image class="zhenqueicon" :src="imageUrl+'/image/xuanzho.png'" mode=""></image>
						</view>


						<view class="border">
							{{item.selectValue}}.
						</view>

						<view class="">
							<view :class="{theAnswer:true}">
								<mp-html class='zitso' :content="item.content"> </mp-html>
							</view>

						</view>

					</view>
				</view>

				<view class="" v-if="ListType==2">
					<view class="flex" v-for="(item,index) in topicList.questionPaperOption" :key='index'
						@click="oncheckbox(item, index,'chu','xia')">
						<view class="moren" v-if="lists.isAss==0&&lists.Theanswer.indexOf(item.id)==-1">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-if="lists.isAss==0 && item.Hasa==true">
							<image class="zhenqueicon" :src="imageUrl+'/image/xuanzho.png'" mode="">
							</image>
						</view>


						<view class="moren" v-if='lists.isAss!=0 &&lists.Theanswer.length!=0'>
							<image v-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)!=-1" class="zhenqueicon"
								:src="imageUrl+'/image/xuanzho.png'" mode=""></image>
							<view class="moren2" v-else>

							</view>
						</view>
						<view class="moren" v-else-if="lists.isAss!=0 &&lists.Theanswer.length==0">
							<view class="moren2">

							</view>
						</view>

						<view class="flex5">
							<view :class="{border:true}">
								{{item.selectValue}}
							</view>
							<view :class="{theAnswer:true}">
								<mp-html class='zitso' :content="item.content"> </mp-html>
							</view>

						</view>
					</view>
				</view>

				<view class=""
					v-if="(ListType==3 || ListType==4 ||ListType==10)&& topicList.questionPaperSubjectSubordinatesList.length>0">

					<view class="tigan">
						<view class="leid">
							问题{{lists.childNo}}/{{subjectNo.questionPaperSubjectSubordinatesList.length}}
						</view>
						<view class="">
							{{topicList.questionPaperSubjectSubordinatesList[0].stem}}
						</view>
					</view>
					<Answerse :topicList='topicList' :lists='lists' :couti='couti' :show='false' :showa='true'
						v-if="topicList.questionPaperSubjectSubordinatesList[0].liftingType == 5" />

					<view class="" v-else>
						<view class="flex"
							v-for="(item,index) in topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption"
							:key='index' @click="onCommontopic(item, index,'chu','xia')">
							<view class="moren" v-if="lists.isAss==0&&lists.Theanswer.indexOf(item.id)==-1">
								<view class="moren2">
								</view>
							</view>
							<view class="moren" v-if="lists.isAss==0 && item.Hasa==true">
								<image class="zhenqueicon" :src="imageUrl+'/image/xuanzho.png'" mode="">
								</image>
							</view>
							<view class="moren" v-if='lists.isAss!=0 &&lists.Theanswer.length!=0'>
								<image v-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)!=-1" class="zhenqueicon"
									:src="imageUrl+'/image/xuanzho.png'" mode=""></image>
								<view class="moren2" v-else-if="lists.Theanswer.indexOf(item.id)==-1">
								</view>
							</view>
							<view class="moren" v-else-if="lists.isAss!=0 &&lists.Theanswer.length==0">
								<view class="moren2">
								</view>
							</view>
							<view class="flex5">
								<view :class="{border:true}">
									{{item.selectValue}}.
								</view>
								<view :class="{theAnswer:true}">
									<mp-html class='zitso' :content="item.content"> </mp-html>
								</view>

							</view>
						</view>
					</view>
				</view>


				<judgment :topicList='topicList' :lists='lists' :iosASS='2' v-if="ListType==9" />

				<Answerse :couti='couti' :topicList='topicList' :lists='lists' :show='true' :showa='true'
					v-if="ListType==5" />
			</view>
			<!-- 多选题提交解析  -->
			<view class="ojwo"
				v-if="(ListType==2||ListType==3||ListType==4||ListType==10)&&isAss==false&&(topicList.successNumber>1||topicList.questionPaperSubjectSubordinatesList[0].successNumber>1)">
				<view class="button32s" v-if="anButtonIsAss==true" @click="onDetermine">
					提交答案
				</view>

				<view class="button321" @click="onDetermine" v-else>
					提交答案
				</view>
			</view>


		</view>


		<!-- //练习模式 -->
		<view class="" v-else v-show="showde">
			<!-- 答题模式 -->
			<view class="questions-center" v-if="isAss==false">
				<view class="questions-title">
					<view class="biaoqian" v-if="ListType==1">
						单选题
					</view>
					<view class="biaoqian" v-else-if="ListType==2">
						多选题
					</view>
					<view class="biaoqian" v-else-if="ListType==3 ">
						{{topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'共用题干-多选题':'共用题干-单选题'}}
					</view>
					<view class="biaoqian" v-else-if="ListType==10">
						{{topicList.questionPaperSubjectSubordinatesList[0].liftingType!=5?topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'材料题-多选题':'材料题-单选题':'材料题-解答题'}}
					</view>
					<view class="biaoqian" v-else-if="ListType==4">
						{{topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'共用选项-多选题':'共用选项-单选题'}}
					</view>
				</view>
				<view class="theTitle" v-if="ListType==1 || ListType==2">
					{{lists.subNo==undefined? '':lists.subNo+'.'}}
					<mp-html class='zitso' :content="topicList.stem"> </mp-html>
				</view>
				<view class="theTitle" v-else-if="ListType==3||ListType==4 ||ListType==10">
					{{lists.parentNo==undefined? '':lists.parentNo+'.'}}
					<mp-html class='zitso' :content="topicList.stem"> </mp-html>
				</view>
				<view class="" v-if="ListType==1">
					<view class="flex" v-for="(item,index) in topicList.questionPaperOption" :key='index'
						@click="onIput(item, index)">
						<view class="moren" v-if="lists.isAss==0">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-else-if="lists.Theanswer.indexOf(item.id)==-1&&item.rightFlag==1">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-if="lists.isAss!=0&&(item.Hasa==true || item.rightFlag==0)">
							<image class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
						</view>
						<!--  #ifdef  H5 -->
						<view class="" v-if="topicList.questionChapterPractice">
							<view class="moren"
								v-if="lists.isAss!=0&&(item.Hasa==false || (topicList.questionChapterPractice.optionId==item.id && item.rightFlag!=0))">
								<image class="zhenqueicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>

							</view>
						</view>
						<!--  #endif -->
						<!--  #ifdef  MP-WEIXIN -->
						<view class="">
							<view class="moren"
								v-if="lists.isAss!=0&&(item.Hasa==false || (topicList.questionChapterPractice.optionId==item.id && item.rightFlag!=0))">
								<image class="zhenqueicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>

							</view>
						</view>
						<!--  #endif -->

						<view class="border">
							{{item.selectValue}}.
						</view>

						<view class="">
							<view :class="{theAnswer:true}">
								<mp-html class='zitso' :content="item.content"> </mp-html>
							</view>
							<!-- <image v-else class="contetimg" :src="item.content" mode=""></image> -->
						</view>

					</view>
				</view>

				<view class="" v-if="ListType==2">
					<view class="flex" v-for="(item,index) in topicList.questionPaperOption" :key='index'
						@click="oncheckbox(item, index)">
						<view class="moren" v-if="lists.isAss==false&&lists.Theanswer.indexOf(item.id)==-1">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-if="lists.isAss==false && item.Hasa==true">
							<image class="zhenqueicon" :src="imageUrl+'/image/xuanzho.png'" mode="">
							</image>
						</view>

						<view class="moren" v-if='lists.isAss!=false &&lists.Theanswer.length!=0'>
							<image v-if="lists.isAss!=false &&lists.Theanswer.indexOf(item.id)!=-1" class="zhenqueicon"
								:src="imageUrl+'/image/xuanzho.png'" mode=""></image>
							<view class="moren2" v-else>

							</view>
						</view>

						<view class="flex5">
							<view :class="{border:true}">
								{{item.selectValue}}.
							</view>
							<view :class="{theAnswer:true}">
								<mp-html class='zitso' :content="item.content"> </mp-html>
							</view>
							<!-- <image v-else class="contetimg" :src="item.content" mode=""></image> -->
						</view>
					</view>
				</view>

				<view class=""
					v-if="(ListType==3 || ListType==4 ||ListType==10) && topicList.questionPaperSubjectSubordinatesList.length>0 ">

					<view class="tigan">
						<view class="leid">
							问题{{lists.childNo}}/{{subjectNo.questionPaperSubjectSubordinatesList.length}}
						</view>
						<view class="">
							{{topicList.questionPaperSubjectSubordinatesList[0].stem}}
						</view>
					</view>

					<Answerse :topicList='topicList' :couti='couti' :lists='lists' :show='false' :showa='true'
						v-if="topicList.questionPaperSubjectSubordinatesList[0].liftingType==5" />

					<view class="" v-else>
						<view class="flex"
							v-for="(item,index) in topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption"
							:key='index' @click="onCommontopic(item, index)">
							<view class="moren" v-if="lists.isAss==0&&lists.Theanswer.indexOf(item.id)==-1">
								<view class="moren2">

								</view>
							</view>
							<view class="moren" v-if="lists.isAss==0 && item.Hasa==true">
								<image class="zhenqueicon" :src="imageUrl+'/image/xuanzho.png'" mode="">
								</image>
							</view>


							<view class="moren" v-if='lists.isAss!=0 &&lists.Theanswer.length!=0'>
								<image v-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)!=-1 && item.rightFlag==0"
									class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
								<image
									v-else-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)==-1 && item.rightFlag==0"
									class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
								<image
									v-else-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)!=-1 && item.rightFlag==1"
									class="zhenqueicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
								<view class="moren2"
									v-else-if="lists.Theanswer.indexOf(item.id)==-1&&item.rightFlag!=0 ">

								</view>
							</view>

							<view class="flex5">
								<view :class="{border:true}">
									{{item.selectValue}}.
								</view>
								<view :class="{theAnswer:true}">
									<mp-html class='zitso' :content="item.content"> </mp-html>
								</view>
								<!-- <image v-else class="contetimg" :src="item.content" mode=""></image> -->
							</view>
						</view>
					</view>
				</view>

				<judgment :topicList='topicList' :lists='lists' v-if="ListType==9" />

				<Answerse :topicList='topicList' :lists='lists' :couti='couti' :show='true' :showa='true'
					v-if="ListType==5" />
			</view>

			<!-- 多选题提交解析  -->
			<view class="ojwo"
				v-if="(ListType==2||ListType==3||ListType==4||ListType==10)&&lists.isAss==0&&isAss==false&&(topicList.successNumber>1||topicList.questionPaperSubjectSubordinatesList[0].successNumber>1)">
				<view class="button32s" v-if="anButtonIsAss==true" @click="onDetermine">
					提交答案
				</view>
				<view class="button321" @click="onDetermine" v-else>
					提交答案
				</view>
			</view>

			<!-- 背题模式 -->
			<view class="questions-center" v-if="isAss==true">
				<view class="questions-title">
					<view class="biaoqian" v-if="ListType==1">
						单选题
					</view>
					<view class="biaoqian" v-else-if="ListType==2">
						多选题
					</view>
					<view class="biaoqian" v-else-if="ListType==3 ">
						{{topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'共用题干-多选题':'共用题干-单选题'}}
					</view>
					<view class="biaoqian" v-else-if="ListType==10">
						{{topicList.questionPaperSubjectSubordinatesList[0].liftingType!=5?topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'材料题-多选题':'材料题-单选题':'材料题-解答题'}}
					</view>
					<view class="biaoqian" v-else-if="ListType==4">
						{{topicList.questionPaperSubjectSubordinatesList[0].successNumber>1?'共用选项-多选题':'共用选项-单选题'}}
					</view>
				</view>
				<view class="theTitle" v-if="ListType==1 || ListType==2">
					{{lists.subNo==undefined? '':lists.subNo+'.'}}
					<mp-html class='zitso' :content="topicList.stem"> </mp-html>
				</view>
				<view class="theTitle" v-else-if="ListType==3||ListType==4||ListType==10">
					{{lists.parentNo==undefined? '':lists.parentNo+'.'}}
					<mp-html class='zitso' :content="topicList.stem"> </mp-html>
				</view>
				<view class="" v-if="ListType==1">
					<view class="flex" v-for="(item,index) in topicList.questionPaperOption" :key='index'>
						<view class="moren" v-if="lists.isAss==0 && item.rightFlag!=0">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-else-if="lists.Theanswer.indexOf(item.id)==-1&&item.rightFlag==1">
							<view class="moren2">

							</view>
						</view>
						<view class="moren" v-if="item.Hasa==true || item.rightFlag==0">
							<image class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
						</view>

						<view class="moren"
							v-if="item.Hasa==false || (topicList.questionChapterPractice.optionId==item.id && item.rightFlag!=0)">
							<image class="zhenqueicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
						</view>




						<view class="border">
							{{item.selectValue}}.
						</view>

						<view class="">
							<view :class="{theAnswer:true}">
								<mp-html class='zitso' :content="item.content"> </mp-html>
							</view>
							<!-- <image v-else class="contetimg" :src="item.content" mode=""></image> -->
						</view>
					</view>
				</view>

				<view class="" v-if="ListType==2">
					<view class="flex" v-for="(item,index) in topicList.questionPaperOption" :key='index'>
						<view class="moren" v-if="lists.isAss==0&&item.rightFlag!=0">
							<view class="moren2">

							</view>
						</view>

						<view class="moren" v-if='lists.Theanswer.length!=0'>
							<image v-if="lists.Theanswer.indexOf(item.id)!=-1 && item.rightFlag==0" class="zhenqueicon"
								:src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
							<image v-else-if="lists.Theanswer.indexOf(item.id)==-1 && item.rightFlag==0"
								class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
							<image v-else-if="lists.Theanswer.indexOf(item.id)!=-1 && item.rightFlag==1"
								class="zhenqueicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
							<view class="moren2" v-else-if="lists.Theanswer.indexOf(item.id)==-1&&item.rightFlag!=0 ">

							</view>

						</view>
						<view class="moren" v-else-if="item.rightFlag==0">
							<image class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
						</view>
						<view class="flex5">
							<view :class="{border:true}">
								{{item.selectValue}}
							</view>
							<view :class="{theAnswer:true}">
								<mp-html class='zitso' :content="item.content"> </mp-html>
							</view>
							<!-- <image v-else class="contetimg" :src="item.content" mode=""></image> -->
						</view>
					</view>
				</view>

				<view class=""
					v-if="(ListType==3 || ListType==4 ||ListType==10) &&topicList.questionPaperSubjectSubordinatesList.length>0">
					<view class="tigan">
						<view class="leid" v-if="sourceType==99 ||sourceType==100">
							问题1/{{subjectNo.questionPaperSubjectSubordinatesList.length}}
						</view>
						<view class="leid" v-else>
							问题{{lists.childNo}}/{{subjectNo.questionPaperSubjectSubordinatesList.length}}
						</view>
						<view class="">
							{{topicList.questionPaperSubjectSubordinatesList[0].stem}}
						</view>
					</view>
					<Answerse :couti='couti' :topicList='topicList' :lists='lists' :show='false' :showa='false'
						v-if="topicList.questionPaperSubjectSubordinatesList[0].liftingType==5" />

					<view class="" v-else>
						<view class="flex"
							v-for="(item,index) in topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption"
							:key='index'>
							<view class="moren" v-if="lists.isAss==0&&item.rightFlag!=0">
								<view class="moren2">

								</view>
							</view>

							<view class="moren" v-if='lists.isAss!=0 &&lists.Theanswer.length!=0'>
								<image v-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)!=-1 && item.rightFlag==0"
									class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
								<image
									v-else-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)==-1 && item.rightFlag==0"
									class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
								<image
									v-else-if="lists.isAss!=0 &&lists.Theanswer.indexOf(item.id)!=-1 && item.rightFlag==1"
									class="zhenqueicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
								<view class="moren2"
									v-else-if="lists.Theanswer.indexOf(item.id)==-1&&item.rightFlag!=0 ">

								</view>
							</view>
							<view class="moren" v-else-if="item.rightFlag==0">
								<image class="zhenqueicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
							</view>
							<view class="flex5">
								<view :class="{border:true}">
									{{item.selectValue}}.
								</view>
								<view :class="{theAnswer:true}">
									<mp-html class='zitso' :content="item.content"> </mp-html>
								</view>

							</view>


						</view>
					</view>
				</view>

				<judgment :topicList='topicList' :lists='lists' :iosASS='1' v-if="ListType==9" />

				<Answerse :couti='couti' :topicList='topicList' :lists='lists' :show='true' :showa='false'
					v-if="ListType==5" />

			</view>
			<!-- 答题模式解析  -->
			<view class="parsing" v-if="isAss==false &&lists.isAss!=0">
				<view
					v-if="(ListType!=5 && ListType!=10) || (ListType==10&& topicList.questionPaperSubjectSubordinatesList[0].liftingType!=5)"
					:class="{'colorcuo':lists.isAss==2,'colordui':lists.isAss==1}">
					<view class="tishipsm" v-if="lists.isAss==2">
						回答错误<image class="tishipsmeicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
					</view>
					<view class="tishipsm" v-else>
						回答正确<image class="tishipsmeicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
					</view>
					<view class="">
						<view class="felx3">
							正确答案：<view class="colo223 right1-0" v-for="(item,index) in answer" :key='index'>{{item}}
							</view>
							我的答案：<view :class="{colo2ww:lists.isAss==2,colo223:lists.isAss==1}"
								v-for="(items,indexs) in correctAnswer" :key='indexs'>{{items}}</view>
						</view>
					</view>
				</view>
				<view class="parsing-content">
					<view class="answerText2 textTonji">
						<view class=" textTonji" style="display: flex;align-items: center;">
							难度：
						</view>
						<uni-rate v-if="ListType==1 || ListType==2 || ListType==5 || ListType==9" :readonly="true"
							:value="topicList.facilityValue" :max="4" />
						<uni-rate v-if="ListType==3 || ListType==4 || ListType==10" :readonly="true"
							:value="topicList.questionPaperSubjectSubordinatesList[0].facilityValue" :max="4" />
					</view>
					<view class="answerText2" v-if="ListType==1 || ListType==2 || ListType==9">
						<view class="textTonji">
							统计：
						</view>
						<view class="text6">
							{{topicList.answerText}}
						</view>
					</view>
					<view class="answerText2"
						v-else-if="(ListType!=5 && ListType!=10)  || (ListType==10&& topicList.questionPaperSubjectSubordinatesList[0].liftingType!=5)">
						<view class="textTonji">
							统计：
						</view>
						<view class="text6">
							{{topicList.questionPaperSubjectSubordinatesList[0].answerText}}
						</view>
					</view>
				</view>
				<view class="daanjiexi"
					v-if="topicList.answerTxt || topicList.questionPaperSubjectSubordinatesList[0].answerTxt">
					<view class="flexbodsw">
						<view class="bodsw">

						</view>
						答案解析
					</view>

					<mp-html class='zitso' v-if="ListType==1 || ListType==2|| ListType==5 || ListType==9"
						:content="topicList.answerTxt"> </mp-html>
					<mp-html class='zitso' v-else
						:content="topicList.questionPaperSubjectSubordinatesList[0].answerTxt"> </mp-html>
				</view>
			</view>

			<!-- 背题模式解析 -->
			<view class="parsing" v-else-if="isAss==true">
				<view class="colordui"
					v-if="(ListType!=5 && ListType!=10) || (ListType==10&& topicList.questionPaperSubjectSubordinatesList[0].liftingType!=5)">
					<view class="tishipsm" v-if="lists.isAss==2">
						回答错误<image class="tishipsmeicon" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
					</view>
					<view class="tishipsm" v-else>
						<view class="flex1" v-if="correctAnswer.length!=0">
							回答正确<image class="tishipsmeicon" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
						</view>
						<view class="flex1344" v-else-if="asnwer">
							<image :src="imageUrl+'/xing/wenhao.png'" class="wenhao"  />
							未作答
						</view>
					</view>
					<view class="">
						<view class="felx3">
							正确答案：<view class="colo223 right1-0" v-for="(item,index) in answer" :key='index'>{{item}}
							</view>
							<view class="flex1" v-if="correctAnswer.length!=0 ">
								我的答案：<view :class="{colo2ww:lists.isAss==2,colo223:lists.isAss==1}"
									v-for="(items,indexs) in correctAnswer" :key='indexs'>{{items}}</view>
							</view>
							<view class="flex1344" v-else-if="asnwer">
								我的答案：<view class="colo2ww23">
									未作答
								</view>
							</view>

						</view>
					</view>
				</view>
				<view class="parsing-content">
					<view class="answerText2 textTonji">
						<view class=" textTonji" style="display: flex;align-items: center;">
							难度：
						</view>

						<uni-rate v-if="ListType==1 || ListType==2 || ListType==5 || ListType==9" :readonly="true"
							:value="topicList.facilityValue" :max="4" />
						<uni-rate v-if="ListType==3 || ListType==4 || ListType==10" :readonly="true"
							:value="topicList.questionPaperSubjectSubordinatesList[0].facilityValue" :max="4" />
					</view>
					<view class="answerText2" v-if="ListType==1 || ListType==2 || ListType==9">
						<view class="textTonji">
							统计：
						</view>
						<view class="text6">
							{{topicList.answerText}}
						</view>
					</view>
					<view class="answerText2"
						v-else-if="(ListType!=5 && ListType!=10)  || (ListType==10&& topicList.questionPaperSubjectSubordinatesList[0].liftingType!=5)">
						<view class="textTonji">
							统计：
						</view>
						<view class="text6">
							{{topicList.questionPaperSubjectSubordinatesList[0].answerText}}
						</view>
					</view>
				</view>


				<view class="daanjiexi"
					v-if="topicList.answerTxt || topicList.questionPaperSubjectSubordinatesList[0].answerTxt">
					<view class="flexbodsw">
						<view class="bodsw">

						</view>
						答案解析
					</view>
					<mp-html class='zitso' v-if="ListType==1 || ListType==2|| ListType==5 || ListType==9"
						:content="topicList.answerTxt"> </mp-html>
					<mp-html class='zitso' v-else
						:content="topicList.questionPaperSubjectSubordinatesList[0].answerTxt"> </mp-html>
				</view>
			</view>

			<!-- 返回顶部 -->
			<u-back-top :scroll-top="scrollTop">
				<image :src="imageUrl+'/icon/go_top.png'"  class="gotop_btn" @click="gotop_btn()" />
			</u-back-top>

		</view>

		<!-- 底部栏 -->
		<view class="" v-if="couti!=2">
			<view class="buttom" v-if="FONsIZE">
				<view v-if="sourceType==99||sourceType==100" class="button3">
				</view>
				<view v-else class="button3" @click="onTopic">
					<image class="button3-img" :src="imageUrl+'/image/shang.png'" mode=""></image>
				</view>


				<view class="flex-dibu" @click="open">
					<image class="flex-dibu-img" :src="imageUrl+'/questionBank/static/image/dati.png'" mode=""></image>
					<view class="flex-dibu-text">
						答题卡
					</view>
				</view>
				<view class="flex-dibu masr" @click="write_note()">
					<image class="flex-dibu-img" :src="imageUrl+'/image/biji.png'" mode=""></image>
					<view class="flex-dibu-text">
						笔记
					</view>
				</view>

				<view class="yichu2">
				</view>
				<view class="" v-if="sourceType!=99&&sourceType!=100">
					<view v-if="isAss==false" class="flex1 yichu" @click="yichu">
						<image class="yichu-img" :src="imageUrl+'/image/yanj.png'" mode=""></image>
					</view>
					<view v-if="couti!=3&&isAss==true" class="flex1 yichu" @click="yichu">
						<image class="yichu-img" :src="imageUrl+'/image/yanj2.png'" mode=""></image>
					</view>
					<view v-if="couti==3&&isAss==true&&jiexiIsAss==false" class="flex1 yichu" @click="zhiKanCuoti">
						<image class="yichu-img3" :src="imageUrl+'/image/cuotis.png'" mode=""></image>
					</view>
					<view v-if="couti==3&&isAss==true&&jiexiIsAss==true" class="flex1 yichu" @click="zhikanJiexi">
						<image class="yichu-img3" :src="imageUrl+'/image/cuotis.png'" mode=""></image>
					</view>
					<view class="fon-stz yichu2" v-if='isAss==false'>
						背题
					</view>
					<view class="fon-stz yichu2" v-if='couti!=3&&isAss==true'>
						答题
					</view>
					<view class="fon-stz2 yichu2" v-if="couti==3&&isAss==true&&jiexiIsAss==false">
						只看错题
					</view>
					<view class="fon-stz2 yichu2" v-if="couti==3&&isAss==true&&jiexiIsAss==true">
						查看全部
					</view>
				</view>
				<view class="" v-else>
					<view class="flex1 yichu">
						<image class="yichu-img23" :src="imageUrl+'/image/xiangq.png'" mode=""></image>
					</view>
					<view class="fon-stz yichu2">
						背题
					</view>
				</view>

				<view class="flex-dibu masr2" v-if="isCollect == 1" @tap="delCollectQuestion()">
					<image class="before_collection" :src="imageUrl+'/icon/collection_ed.png'" mode=""></image>

					<view class="flex-dibu-text">
						取消
					</view>
				</view>

				<view class="flex-dibu masr2" v-else-if='isCollect!=1' @tap="collectQuestion()">
					<image class="flex-dibu-img" :src="imageUrl+'/image/shouc.png'" mode=""></image>
					<view class="flex-dibu-text">
						收藏
					</view>
				</view>

				<view class="flex-dibu" @click="FONsIZE=false">
					<image class="flex-dibu-img" :src="imageUrl+'/image/shezhi.png'" mode=""></image>

					<view class="flex-dibu-text">
						设置
					</view>
				</view>
				<view class="button32" v-if='sourceType==99||sourceType==100'>
				</view>
				<view class="button32" v-else @click="onQuestion">
					<image class="button32-img" :src="imageUrl+'/image/xia.png'" mode=""></image>
				</view>


			</view>
			<view class=" zhezhao" v-else @click="FONsIZE=true">
				<view class="shopName">
					<view class="shopName-text">
						设置字号：
					</view>
					<view class="shopn-flex">
						<view :class="{szieFont:true,borderColor:szieArr==2.5}" @click="onSize(2.5)">
							Aa1
						</view>
						<view :class="{szieFont2:true,borderColor:szieArr==3.5}" @click="onSize(3.5)">
							Aa2
						</view>
						<view :class="{szieFont3:true,borderColor:szieArr==4.5}" @click="onSize(4.5)">
							Aa3
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部栏 -->
		<view class="" v-else>
			<view class="buttom" v-if="FONsIZE">
				<view class="button3" @click="onTopic">
					<image class="button3-img" :src="imageUrl+'/image/shang.png'" mode=""></image>
				</view>

				<view class="flex-dibu" @click="open">
					<image class="flex-dibu-img" :src="imageUrl+'/questionBank/static/image/dati.png'" mode=""></image>
					<view class="flex-dibu-text">
						答题卡
					</view>
				</view>
				<view class="flex-dibu masr" @click="write_note()">
					<image class="flex-dibu-img" :src="imageUrl+'/image/biji.png'" mode=""></image>
					<view class="flex-dibu-text">
						笔记
					</view>
				</view>

				<view class="yichu2">
				</view>
				<view v-if="isAss==false&&couti!=3" class="flex1 yichu" @click="tishiAss=true">
					<image class="yichu-img2" :src="imageUrl+'/image/wsqad.png'" mode=""></image>
				</view>

				<view class="fon-stz" v-if='isAss==false&&couti==2'>
					交卷
				</view>

				<view class="flex-dibu masr2" v-if="isCollect == 1" @tap="delCollectQuestion()">
					<image class="before_collection" :src="imageUrl+'/icon/collection_ed.png'" mode=""></image>

					<view class="flex-dibu-text">
						取消
					</view>
				</view>

				<view class="flex-dibu masr2" v-else-if='isCollect!=1' @tap="collectQuestion()">
					<image class="flex-dibu-img" :src="imageUrl+'/image/shouc.png'" mode=""></image>
					<view class="flex-dibu-text">
						收藏
					</view>
				</view>

				<view class="flex-dibu" @click="FONsIZE=false">
					<image class="flex-dibu-img" :src="imageUrl+'/image/shezhi.png'" mode=""></image>
					<view class="flex-dibu-text">
						设置
					</view>
				</view>
				<view class="button32" @click="onQuestion">
					<image class="button32-img" :src="imageUrl+'/image/xia.png'" mode=""></image>
				</view>
			</view>
			<view class=" zhezhao" v-else @click="FONsIZE=true">
				<view class="shopName">
					<view class="shopName-text">
						设置字号：
					</view>
					<view class="shopn-flex">
						<view :class="{szieFont:true,borderColor:szieArr==2.5}" @click="onSize(2.5)">
							Aa1
						</view>
						<view :class="{szieFont2:true,borderColor:szieArr==3.5}" @click="onSize(3.5)">
							Aa2
						</view>
						<view :class="{szieFont3:true,borderColor:szieArr==4.5}" @click="onSize(4.5)">
							Aa3
						</view>
					</view>
				</view>
			</view>

		</view>

		<!-- 答题卡 -->
		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<view class="flwox">
				<view class="clatop">
					<view class="righrt">
					</view>
					<view class="datika">
						答题卡
					</view>
					<view @click="close" class="righrt">
						<image class="datiImg" :src="imageUrl+'/image/gunbiicon.png'" mode=""></image>
					</view>
				</view>
				<view class="flexbnorder">
					<view class="border1text">
						<image class="border-sizes2" :src="imageUrl+'/image/dati2.png'" mode=""></image>
						<view class="color23">
							{{lists.subNo==undefined?0:lists.subNo}}
						</view>
						<view class="color24">
							/{{listLength}}
						</view>
					</view>
					<view class="border1text">
						<image class="border-sizes" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
						答对
					</view>
					<view class="border1text">
						<image class="border-sizes" :src="imageUrl+'/image/cuowu.png'" mode=""></image>
						答错
					</view>
					<view class="border1text">
						<image class="border-sizes" :src="imageUrl+'/image/weida.png'" mode=""></image>
						未做
					</view>
				</view>
			</view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="tanchu" v-if="couti!=2">

				<view class="liebieao" v-for="(item,listIndex) in listArr" :key="listIndex">
					<view class="" v-if="item.type==1">
						<view class="titleText">
							单选题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss==1,bordeRdoun3:items.isAss==2}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=2">

						</view>
					</view>
					<view class="" v-if="item.type==2">
						<view class="titleText">
							多选题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss==1,bordeRdoun3:items.isAss==2}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=3">

						</view>
					</view>
					<view class="" v-if="item.type==5">
						<view class="titleText">
							解答题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss==1,bordeRdoun3:items.isAss==2}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=4">

						</view>
					</view>
					<view class="" v-if="item.type==9">
						<view class="titleText">
							判断题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss==1,bordeRdoun3:items.isAss==2}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=5">

						</view>
					</view>

					<view class="" v-if="item.type==3">
						<view class="titleText">
							共用题干
						</view>
						<view class="itemList">
							<view class="flex1" v-for="(items,index) in shareArr" :key="index">
								<!-- {{item.subjectNo}} -->
								<view :class="{bordeRdoun4:true,bordeRdoun5:items.isAss==1,bordeRdoun6:items.isAss==2}"
									:key="index"
									@click="onSheet(item,items,items.type,items.clickIndex,items.childNo-1,items)">
									{{items.parentNo}}-{{items.childNo}}
								</view>
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=6">
						</view>
					</view>
					<view class="" v-if="item.type==4">
						<view class="titleText">
							共用选项
						</view>
						<view class="itemList">
							<view class="flex1" v-for="(items,index) in AboutArr" :key="index">
								<!-- {{item.subjectNo}} -->
								<view :class="{bordeRdoun4:true,bordeRdoun5:items.isAss==1,bordeRdoun6:items.isAss==2}"
									:key="index"
									@click="onSheet(item,items,items.type,items.clickIndex,items.childNo-1,value)">
									{{items.parentNo}}-{{items.childNo}}
								</view>
							</view>
						</view>
					</view>
					<view class="" v-if="item.type==10">
						<view class="titleText">
							材料题
						</view>
						<view class="itemList">
							<view class="flex1" v-for="(items,index) in sexswtArr" :key="index">
								<!-- {{item.subjectNo}} -->
								<view :class="{bordeRdoun4:true,bordeRdoun5:items.isAss==1,bordeRdoun6:items.isAss==2}"
									:key="index"
									@click="onSheet(item,items,items.type,items.clickIndex,items.childNo-1,value)">
									{{items.parentNo}}-{{items.childNo}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<!-- 测试 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="tanchu" v-else>
				<view class="flwox">

					<view class="clatop">
						<view class="righrt">
						</view>
						<view class="datika">
							答题卡
						</view>
						<view @click="close" class="righrt">
							<image class="datiImg" :src="imageUrl+'/image/gunbiicon.png'" mode=""></image>
						</view>
					</view>
					<view class="flexbnorder">
						<view class="border1text">
							<image class="border-sizes2" :src="imageUrl+'/image/dati2.png'" mode=""></image>
							<view class="color23">
								{{lists.subNo==undefined?0:lists.subNo}}
							</view>
							<view class="color24">
								/{{listLength}}
							</view>
						</view>
						<view class="border1text">
							<image class="border-sizes" :src="imageUrl+'/image/zhenqueicon.png'" mode=""></image>
							已答
						</view>
						<view class="border1text">
							<image class="border-sizes" :src="imageUrl+'/image/weida.png'" mode=""></image>
							未做
						</view>
					</view>
				</view>

				<view class="liebieao" v-for="(item,listIndex) in listArr" :key="listIndex">
					<view class="" v-if="item.type==1">
						<view class="titleText">
							单选题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss!=0}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=2">

						</view>
					</view>
					<view class="" v-if="item.type==2">
						<view class="titleText">
							多选题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss!=0}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=3">

						</view>
					</view>
					<view class="" v-if="item.type==5">
						<view class="titleText">
							解答题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss!=0}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=3">

						</view>
					</view>
					<view class="" v-if="item.type==9">
						<view class="titleText">
							判断题
						</view>
						<view class="itemList">
							<view :class="{bordeRdoun:true,bordeRdoun2:items.isAss!=0}"
								v-for="(items,index) in item.list" :key="index"
								@click="onSheet(item,items,listIndex,index)">
								{{items.parentNo}}
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=3">

						</view>
					</view>
					<view class="" v-if="item.type==3">
						<view class="titleText">
							共用题干
						</view>
						<view class="itemList">
							<view class="flex1" v-for="(items,index) in shareArr" :key="index">
								<!-- {{item.subjectNo}} -->
								<view :class="{bordeRdoun4:true,bordeRdoun5:items.isAss!=0}" :key="index"
									@click="onSheet(item,items,items.type,items.clickIndex,items.childNo-1,value)">
									{{items.parentNo}}-{{items.childNo}}
								</view>
							</view>
						</view>
						<view class="borderBottom" v-if="listArr.length>=4">
						</view>
					</view>
					<view class="" v-if="item.type==4">
						<view class="titleText">
							共用选项
						</view>
						<view class="itemList">
							<view class="flex1" v-for="(items,index) in AboutArr" :key="index">
								<!-- {{item.subjectNo}} -->
								<view :class="{bordeRdoun4:true,bordeRdoun5:items.isAss!=0}" :key="index"
									@click="onSheet(item,items,items.type,items.clickIndex,items.childNo-1,value)">
									{{items.parentNo}}-{{items.childNo}}
								</view>
							</view>
						</view>
					</view>
					<view class="" v-if="item.type==10">
						<view class="titleText">
							材料题
						</view>
						<view class="itemList">
							<view class="flex1" v-for="(items,index) in sexswtArr" :key="index">
								<!-- {{item.subjectNo}} -->
								<view :class="{bordeRdoun4:true,bordeRdoun5:items.isAss!=0,}" :key="index"
									@click="onSheet(item,items,items.type,items.clickIndex,items.childNo-1,value)">
									{{items.parentNo}}-{{items.childNo}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-popup>
		<!-- 温馨提示 -->
		<view class="zhezhao" v-if="tishiAss && couti!=3">
			<view class="center">
				<image class="gunbni" @click="isAss=false" :src="imageUrl+'/image/gunbiicon.png'" mode=""></image>
				<view class="mar-bu">
					温馨提示
				</view>
				<view class="mar-bu2" v-if="Arrse.countAll - Arrse.doCount==0">
					所有题目已做完，确定交卷吗？
				</view>
				<view class="mar-bu2" v-else>
					您有题目未做完，确定提交吗？
				</view>
				<view class="flexsw">
					<view class="colose" @click="onNo">
						取消
					</view>
					<view class="yesAido" @click="onYes">
						确认
					</view>
				</view>

			</view>
		</view>
		<view class="zhezhao" v-if="sheetisAss" @click="sheetisAss=false">
			<sheet class="shopName2" :add_note_state='add_note_state' v-if="sheetisAss" @onSheetde='onSheetde'
				@click.native.stop="()=>{}" />
		</view>
		<!-- 考试暂停 -->
		<view class="zhezhao" v-if="autoplay==false">
			<view class="div-time">
				<image :src="imageUrl+'/xing/shijian.png'" class="time-img" mode=""></image>
				<view class="tishiyu">
					考试暂停中...
				</view>
				<view class="flexzanti">
					<view class="tuihus" @click="onexit">
						退出练习
					</view>
					<view class="juxu" @click="autoplay=true">
						继续答题
					</view>
				</view>
			</view>
		</view>
		<!-- 考试结束 -->
		<view class="zhezhao" v-if="timeIsAss">
			<view class="div-time">
				<image :src="imageUrl+'/xing/zhong.png'" class="time-img2" mode=""></image>
				<view class="tishiyu">
					考试时间已到...
				</view>
				<view class="flexzanti2">
					<view class="tuihus2" @click="onYes">
						确认交卷
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import judgment from "./commpoents/judgment_tourist.vue" //判断题
	import Answerse from "./commpoents/Answer_tourist.vue" //解答题
	import mpHtml from '@/common/mp-html/index'
	import uCounDown from "@/pagesB/u-count-down/u-count-down.vue";
	import {
		delete_collection,
		add_collection,
	} from '@/api/nav/shoucang.js' //收藏

	import {
		dieError, // 错题题干
		findByType, // 错题类型
		listError, // 错题列表
	} from '@/api/nav/cuoti.js'
	import {
		get_lnzt_listAll,
		get_lnzt_queryBySubjectId
	} from '@/api/index/lnzt.js'
	import {
		SubjectList,
		SubjectQueryById,
		answerAll,
		practiceCheck,
		practiceAgain,
		findBySmartParam
	} from '@/api/professionalChoice.js'
	import {
		getchapter, //章
		getlistById, //节
		getMajorInfo2, //专业
		getpaper,
		getToken,
		getUserInfo,
		setTouristToken,
		getTouristToken,
	} from '@/common/util/index.js'
	import {
		add_note, //添加笔记
		delete_note, // 删除笔记
		edit_note, // 更新笔记
		list_note, // 获取笔记列表
		queryBySubjectId, // 题干id查笔记
		queryStudentBySubjectId // 查询原提
	} from '@/api/nav/biji.js'
	import sheet from '../sheet/index.vue'
	export default {
		data() {
			return {
				asnwer: true,
				wrongTopicArr: [],
				shareArr: [],
				AboutArr: [],
				sexswtArr: [],
				jiexiIsAss: false,
				timeIsAss: false,
				subjectIdList: [],
				somePrevention: false,
				anButtonIsAss: false,
				coutiIsAss: false,
				showPop: false, //弹窗是否显示  
				imageUrl: getApp().globalData.imageUrl,
				notesAll: {},
				sheetisAss: false,
				FONsIZE: true,
				tishiAss: false,
				showde: false,
				testxt: '',
				isAss: false,
				autoplay: true, //倒计时
				subjectNo: [],
				chapterId: "",
				templateId: '',
				listArr: [], //所以题id
				topicList: [], //当前题题干，还有选项
				lists: [], //当前题id,判断当前题答题状态还有答案错队
				ListType: '1', //当前题型
				type: 0,
				index: 0,
				listArrLength: 0, //总题数
				listLength: 0, //带子体的总题数
				subjectId: "",
				isRight: {}, //选择正确还是错误0正确1错误
				answer: [], //正确答案
				correctAnswer: [], //我的答案
				successNumIsAss: true, //判断当前题是否是多选题
				zIIndex: 0, //共用题，取字题的索引
				isCollect: 0,
				isCollectId: '',
				isId: '', // 添加收藏时传入的id
				// BackswerAnswer:[],//解析正确答案

				num_tixing: '', // liftingType[默认''查询全部类型]
				num_CuoTiShuLiang: '', // number[默认''查询全部次数]
				num_ZhangJieLianXi: '1', // type
				majorId: '',
				couti: 1,
				useTime: '',
				sourceType: 1, //1是章节 2是试卷
				sourType: 1, //1是练习 2测试
				Arrse: [],
				szieArr: 3.5,
				// ------------------------------------------------------------
				num_fenlei: '', // 获取试题时的请求参数【分类】（未作，做错，收藏）
				d: '00', // 天的默认值
				h: '00', // 小时的默认值
				i: '00', // 分钟的默认值
				s: '00', // 秒的默认值
				timer: null, // 定时器
				seconds: 0, // 记录不停倒计过程中变化的秒数
				add_note_state: true,
				subjectIdList: [],
				jielu_tixin: ''
			}
		},
		components: {
			uCounDown,
			sheet,
			judgment,
			Answerse
		},
		onShow() {
			//#ifdef H5
			var aaa = getCurrentPages()
			console.log(aaa, '做题-接受值 H5')
			// var option = JSON.parse(aaa[aaa.length - 1].options);
			var option = aaa[aaa.length - 1].options;
			//#endif

			//#ifdef MP-WEIXIN
			var aaa = getCurrentPages()
			console.log(aaa, '做题-接受值 MP-WEIXIN')
			var option = aaa[aaa.length - 1].options;
			//#endif

			// onLoad(option) {
			this.testxt = getlistById().templateName
			console.log('做题接受的数据：', option)
			this.couti = option.couti
			if (option.subjectIdList) {
				this.subjectIdList = option.subjectIdList.split(',')
			}
			this.sourType = option.sourType
			this.sourceType = option.sourceType

			if (option.num_tixing) {
				this.num_tixing = option.num_tixing
			}
			if (option.asnwer) {
				if (option.asnwer == 'true') {
					this.asnwer = true
				} else {
					this.asnwer = false
				}
			}
			if (option.num_fenlei) {
				this.num_fenlei = option.num_fenlei
			}
			if (option.type) {
				this.type = option.type * 1
			}
			if (option.index) {
				this.index = option.index * 1
			}
			if (option.zindex && option.zindex != 'undefined') {
				this.zIIndex = option.zindex * 1
			}
			if (option.isAss) {
				if (option.isAss == 'true') {
					this.isAss = true
				} else {
					this.isAss = false
				}
			}
			console.log('做题接受的数据：', this.couti)
			console.log('做题接受的数据：', this.sourType)
			console.log('做题接受的数据：', this.sourceType)
			console.log('做题接受的数据：', this.isAss)
			console.log('做题接受的数据：', this.zIIndex)
			//#ifdef H5
			if (option.listArr) {
				console.log(option, '做题-接受值-option H5')
				this.listArr = JSON.parse(option.listArr)
				this.wrongTopicArr = JSON.parse(option.listArr)
			}
			//#endif

			//#ifdef MP-WEIXIN
			if (option.listArr) {
				this.listArr = JSON.parse(decodeURIComponent(option.listArr))
				this.wrongTopicArr = JSON.parse(decodeURIComponent(option.listArr))
			}
			//#endif


			// try {
			// 	console.log('获取题 1001')
			this.SubjectList()
			// } catch (e) {
			// 	console.log('获取题 1002' , e)
			// }



			if (this.couti == 2) {
				this.timer = setInterval(() => {
					this.seconds--;
					// 发出change事件
					if (this.seconds < 0) {
						return this.end();
					}
					this.formatTime(this.seconds);
				}, 1000);
			}

			console.log(this.listLength, 'plpl')
			console.log(this.listArr, 'plpl')

		},
		methods: {
			onSheetde(value) {
				this.sheetisAss = value
			},
			zhiKanCuoti() {
				this.answer = [], //正确答案
					this.correctAnswer = [], //我的答案
					this.jielu_tixin = this.num_fenlei
				this.num_fenlei = 3
				this.SubjectList('cuo')
			},
			zhikanJiexi() {
				this.answer = [], //正确答案
					this.correctAnswer = [], //我的答案
					this.shareArr = []
				this.sexswtArr = []
				this.AboutArr = []
				this.listArrLength = 0;
				this.listLength = 0;
				this.jiexiIsAss = false
				this.num_fenlei = this.jielu_tixin
				this.type = 0
				this.index = 0
				this.zIIndex = 0
				if (this.sourceType == 3 && this.couti == 3) {
					this.listArr = this.wrongTopicArr
				}
				this.SubjectList()
			},
			onexit() {
				uni.reLaunch({
					url: '/pages/index/home?tabbarIndex=3'
				})
			},
			gotop_btn() {
				console.log('go_top');
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				});

			},
			// 停止倒计时

			end(value) {
				if (value == 'tankuang') {
					this.timeIsAss = true
				}
				console.log(1235)
				this.clearTimer();
			},
			// 清除定时器
			clearTimer() {
				if (this.timer) {
					// 清除定时器
					clearInterval(this.timer);
					this.timer = null;
				}
			},
			// 格式化时间
			formatTime(seconds) {
				// 小于等于0的话，结束倒计时
				seconds <= 0 && this.end('tankuang');
				let [day, hour, minute, second] = [0, 0, 0, 0];
				day = Math.floor(seconds / (60 * 60 * 24));
				// 判断是否显示“天”参数，如果不显示，将天部分的值，加入到小时中
				// hour为给后面计算秒和分等用的(基于显示天的前提下计算)
				hour = Math.floor(seconds / (60 * 60)) - day * 24;
				// showHour为需要显示的小时
				let showHour = null;
				if (this.showDays) {
					showHour = hour;
				} else {
					// 如果不显示天数，将“天”部分的时间折算到小时中去
					showHour = Math.floor(seconds / (60 * 60));
				}
				minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60;
				second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
				// 如果小于10，在前面补上一个"0"
				showHour = showHour < 10 ? '0' + showHour : showHour;
				minute = minute < 10 ? '0' + minute : minute;
				second = second < 10 ? '0' + second : second;
				day = day < 10 ? '0' + day : day;
				this.d = day;
				this.h = showHour;
				this.i = minute;
				this.s = second;
			},
			write_note() {
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					uni.removeStorageSync('noteInfo')
					queryBySubjectId({
						id: this.lists.id,
						majorId: getMajorInfo2().id
					}).then((res) => {
						console.log('查询一条笔记：', res);
						if (res.result != null) {
							// 有内容，更新笔记
							// this.noteInfo = res.result
							this.add_note_state = false
							uni.setStorageSync('noteInfo', res.result)
						} else {
							// 无内容，添加笔记
							let obj = {}
							obj = {
								agencyId: getUserInfo().agencyId,
								createTime: "",
								id: "",
								imageUrl: "",
								majorId: getMajorInfo2().id,
								note: "",
								studentId: getUserInfo().id,
								subjectId: this.lists.id,
								// subjectId:id,
							}
							// this.noteInfo = obj
							this.add_note_state = true
							uni.setStorageSync('noteInfo', obj)
						}
						this.sheetisAss = true
						// console.log('当前题的笔记内容：', this.noteInfo);
					})
				}

			},
			close_note() {
				this.sheetisAss = false
			},
			onSize(value) {
				this.szieArr = value
				console.log(this.szieArr)
			},
			yichu() {
				if ((this.sourceType == 99 || this.sourceType == 100) && this.couti == 3) {

				} else {
					this.isAss = !this.isAss
					console.log(this.topicList)
					if (this.isAss == true) {
						this.answer = []
						if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this
								.type].type == 10) {
							if (this.topicList.questionPaperSubjectSubordinatesList[0].liftingType != 5) {
								this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption.forEach((
									res) => {
									if (res.rightFlag == 0) {
										this.answer.push(res.selectValue)
									}
								})
							}

						} else {
							if (this.listArr[this.type].type != 5) {
								this.topicList.questionPaperOption.forEach((res) => {
									if (res.rightFlag == 0) {
										this.answer.push(res.selectValue)
									}
								})
							}

						}
					}
				}
			},
			//交卷
			onJiaojuna() {
				this.onQuestion('onJiaojuna')
			},
			goLastTwo() {
				if (this.couti == 3) {
					uni.navigateBack()
				} else if (this.sourceType == 1) {
					if (this.couti == 2) {
						practiceAgain({
							paperId: this.sourceType == 2 ? getpaper().id : '', //试卷ID
							type: 2, //	做题形式 1练习 2测试
							sourceType: this.sourceType, //	题来源 1章节 2试卷
							chapterId: this.sourceType == 1 ? getchapter().id : '', //	章节试卷ID
							templateId: this.sourceType == 1 ? getlistById().templateId : '', //节ID
							examinationId: this.sourceType == 3 ? this.listAll[0].list[0].associatedId : ''
						}).then(res => {
							console.log(res)
							if (res.code == 200) {
								// uni.reLaunch({
								// 	url: '/pages/index/home?tabbarIndex=3'
								// })
								// uni.navigateBack()
								let pages = getCurrentPages(); //获取所有页面栈实例列表
								let nowPage = pages[pages.length - 1]; //当前页页面实例
								let prevPage = pages[pages.length - 2]; //上一页页面实例
								console.log(pages)
								console.log(nowPage)
								console.log(prevPage)
								prevPage.$vm.tabbarIndex = 3; //修改上一页data里面的参数值
								prevPage.$vm.setUpMajorAss = true; //修改上一页data里面的参数值
								uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
									delta: 2
								});
							}
						})
					}
					// uni.reLaunch({
					// 	url: '/pages/index/home?tabbarIndex=3'
					// })
					// uni.navigateBack()
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let nowPage = pages[pages.length - 1]; //当前页页面实例
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					prevPage.$vm.tabbarIndex = 3; //修改上一页data里面的参数值
					prevPage.$vm.setUpMajorAss = true; //修改上一页data里面的参数值
					console.log(pages)
					console.log(nowPage)
					console.log(prevPage)
					uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
						delta: 2
					});
				} else if (this.sourceType == 2) {
					uni.reLaunch({
						url: `/pagesA/nav/lnzt/lnzt`
					})
				} else if (this.sourceType == 3) {
					if (this.isAss == true) {
						uni.navigateBack()
					} else {
						let pages = getCurrentPages(); //获取所有页面栈实例列表
						let nowPage = pages[pages.length - 1]; //当前页页面实例
						let prevPage = pages[pages.length - 2]; //上一页页面实例
						// prevPage.$vm.type = that
						// .stype; //修改上一页data里面的参数值
						uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
							delta: 1
						});
					}
				} else {
					uni.navigateBack()
				}
				this.clearTimer();
			},
			close() { //答题卡
				this.$refs.popup.close()
				this.showPop = false
			},
			open() { //答题卡
				console.log(this.listArr)
				this.$refs.popup.open('bottom')
				this.showPop = true
			},
			goWriteNote() {
				let qwer = {
					subjectId: this.lists.id,
					type: this.ListType
				}
				let data = JSON.stringify(qwer)
				uni.reLaunch({
					url: '/pagesA/nav/biji/write_biji/write_biji?data=' + data
				})
			},
			collectQuestion() { //收藏
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					let user = uni.getStorageSync('userInfos')
					let wdQuestionCollect = {
						majorId: getMajorInfo2().id,
						subjectId: this.lists.id, //题干id
					}
					console.log('添加收藏请求数据：', wdQuestionCollect);
					add_collection(wdQuestionCollect).then((res) => {
						console.log('添加收藏返回值:', res);
						if (res.code == 200) {
							uni.showToast({
								title: '收藏成功'
							})
							this.isCollect = 1
						} else {
							uni.showToast({
								title: '收藏失败',
								icon: 'error'
							})
						}
					}).catch((err) => {
						console.log(err);
					})
				}

			},
			delCollectQuestion() { //取消收藏
				console.log('取消收藏');
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					let wdQuestionCollect = {
						majorId: getMajorInfo2().id,
						subjectId: this.lists.id, //题干id
					}
					add_collection(wdQuestionCollect).then((res) => {
						console.log('将目标移除收藏，返回值：', res);
						if (res.code == 200) {
							uni.showToast({
								title: '取消收藏成功',
							})
							this.isCollect = 0
							this.isCollectId = ''
						} else {
							uni.showToast({
								title: '取消收藏失败',
								icon: 'error'
							})
						}
					}).catch((err) => {
						console.log(err);
					})
				}

			},
			onCommontopic(item, index, value, xia) {
				console.log(item, index)
				console.log(this.lists)
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					if (this.topicList.questionPaperSubjectSubordinatesList[0].successNumber > 1) {
						if (!value) {
							if (this.lists.isAss != 0) {
								return
							}
						}
						this.answer = []
						//多选题//多选题
						if (this.lists.Theanswer.indexOf(item.id) == -1) {
							this.lists.Theanswer.push(item.id);
							console.log(1)
							this.correctAnswer.push(item.selectValue)
						} else {
							this.lists.Theanswer.forEach((res, indexs) => {
								if (res == item.id) {
									this.lists.Theanswer.splice(indexs, 1);
								}
							});
							this.correctAnswer.forEach((res, indexs) => {
								if (res == item.selectValue) {
									this.correctAnswer.splice(indexs, 1);
								}
							});
						}
						console.log(this.lists.Theanswer);

						this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption.forEach((res) => {
							if (res.rightFlag == 0) {
								this.answer.push(res.selectValue)
							}
						})
						var arr = [];
						if (arr.length == 0) {
							this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption.forEach((res,
								index) => {
								if (res.rightFlag == 0) {
									arr.push(res.id);
								}
							});
						}
						if (arr.length == this.lists.Theanswer.length) {
							let flg = 0;
							for (var i = 0; i < this.lists.Theanswer.length; i++) {
								if (arr.indexOf(this.lists.Theanswer[i]) == -1) {
									flg = 1;
									break;
								}
							}
							if (flg == 0) {
								this.isRight[item.subjectId] = 1;
								// this.isRight = 1;
								this.lists.Hasa = true
							} else {
								this.isRight[item.subjectId] = 2;
								this.lists.Hasa = false
							}
						} else {
							this.isRight[item.subjectId] = 2;
							this.lists.Hasa = false
						}
						if (item.Hasa) {
							if (item.Hasa == false) {
								this.$set(this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption[
									index], 'Hasa', true)
								this.$forceUpdate()
							} else {
								this.$set(this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption[
									index], 'Hasa', false)
								this.$forceUpdate()
							}
						} else {
							this.$set(this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption[
									index],
								'Hasa', true)
							this.$forceUpdate()
						}
						console.log(this.lists)
						if (this.lists.Theanswer.length > 0) {
							this.anButtonIsAss = true
						} else {
							this.anButtonIsAss = false
						}
						console.log(this.isRight, 666662);
					} else {
						console.log(item, index)
						console.log(this.lists)
						if (!value) {
							if (this.lists.isAss != 0) {
								return
							}
						}

						this.lists.Theanswer = [];
						this.lists.Theanswer.push(item.id);


						this.correctAnswer.push(item.selectValue)
						this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption.forEach((res) => {
							if (res.rightFlag == 0) {
								this.answer.push(res.selectValue)
							}
						})
						if (item.rightFlag == 0) {
							this.isRight[item.subjectId] = 1; //正确
							this.lists.isAss = 1
							item.Hasa = true
							if (!value) {
								this.answerAll()
								this.onQuestion('cuo')
							}
						} else {
							// this.isRight = 2;
							this.isRight[item.subjectId] = 2; //错误
							this.lists.isAss = 2
							item.Hasa = false
							if (!value) {
								this.answerAll()
							}
						}

						if (this.couti == 2 && xia) {
							this.somePrevention = true
							this.onQuestion()
						}
						console.log(this.isRight);
					}
				}

			},
			//多选题
			oncheckbox(item, index, value, xia) {
				console.log(item, index, value)
				console.log(this.lists)
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					if (!value) {
						if (this.lists.isAss != 0) {
							return
						}
					}
					this.answer = []
					//多选题//多选题
					if (this.lists.Theanswer.indexOf(item.id) == -1) {
						this.lists.Theanswer.push(item.id);
						console.log(1)
						this.correctAnswer.push(item.selectValue)
					} else {
						this.lists.Theanswer.forEach((res, indexs) => {
							if (res == item.id) {
								this.lists.Theanswer.splice(indexs, 1);
							}
						});
						this.correctAnswer.forEach((res, indexs) => {
							if (res == item.selectValue) {
								this.correctAnswer.splice(indexs, 1);
							}
						});
					}
					console.log(this.lists.Theanswer);

					this.topicList.questionPaperOption.forEach((res) => {
						if (res.rightFlag == 0) {
							this.answer.push(res.selectValue)
						}
					})
					var arr = [];
					if (arr.length == 0) {
						this.topicList.questionPaperOption.forEach((res, index) => {
							if (res.rightFlag == 0) {
								arr.push(res.id);
							}
						});
					}
					if (arr.length == this.lists.Theanswer.length) {
						let flg = 0;
						for (var i = 0; i < this.lists.Theanswer.length; i++) {
							if (arr.indexOf(this.lists.Theanswer[i]) == -1) {
								flg = 1;
								break;
							}
						}
						if (flg == 0) {
							this.isRight[item.subjectId] = 1;
							// this.isRight = 1;
							this.lists.Hasa = true
						} else {
							this.isRight[item.subjectId] = 2;
							this.lists.Hasa = false
						}
					} else {
						this.isRight[item.subjectId] = 2;
						this.lists.Hasa = false
					}
					if (item.Hasa) {
						if (item.Hasa == false) {
							this.$set(this.topicList.questionPaperOption[index], 'Hasa', true)
							this.$forceUpdate()
						} else {
							this.$set(this.topicList.questionPaperOption[index], 'Hasa', false)
							this.$forceUpdate()
						}
					} else {
						this.$set(this.topicList.questionPaperOption[index], 'Hasa', true)
						this.$forceUpdate()
					}
					console.log(this.lists)
					if (this.lists.Theanswer.length > 0) {
						this.anButtonIsAss = true
					} else {
						this.anButtonIsAss = false
					}
					console.log(this.isRight, 666662);
				}

			},
			//练习单选题
			onIput(item, index, value, xia) {
				console.log(xia, 'ds')
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					if (!value) {
						if (this.lists.isAss != 0) {
							return
						}
					}

					this.lists.Theanswer = [];
					this.lists.Theanswer.push(item.id);

					this.correctAnswer.push(item.selectValue)
					this.topicList.questionPaperOption.forEach((res) => {
						if (res.rightFlag == 0) {
							this.answer.push(res.selectValue)
						}
					})
					if (item.rightFlag == 0) {
						this.isRight[item.subjectId] = 1; //正确
						this.lists.isAss = 1
						item.Hasa = true
						if (!value) {
							console.log(1)
							this.answerAll()
							this.onQuestion()
						}
					} else {
						// this.isRight = 2;
						this.isRight[item.subjectId] = 2; //错误
						this.lists.isAss = 2
						item.Hasa = false
						if (!value) {
							console.log(1)
							this.answerAll()
						}
					}
					if (this.couti == 2 && xia) {
						this.somePrevention = true
						this.onQuestion()
					}

					console.log(this.lists);
				}


			},

			//判断题
			onJudgment(item, index, value, xia) {
				console.log(item, index, value, xia, 'ds')
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					if (!value) {
						if (this.lists.isAss != 0) {
							return
						}
					}

					this.lists.Theanswer = [];
					this.lists.Theanswer.push(item.id);

					this.correctAnswer.push(item.selectValue)
					this.topicList.questionPaperOption.forEach((res) => {
						if (res.rightFlag == 0) {
							this.answer.push(res.selectValue)
						}
					})
					if (item.rightFlag == 0) {
						this.isRight[item.subjectId] = 1; //正确
						this.lists.isAss = 1
						this.topicList.questionPaperOption[index].Hasa = true
						if (!value) {
							console.log(1)
							this.answerAll()
							this.onQuestion()
						}
					} else {
						// this.isRight = 2;
						this.isRight[item.subjectId] = 2; //错误
						this.lists.isAss = 2
						this.topicList.questionPaperOption[index].Hasa = false
						if (!value) {
							console.log(1)
							this.answerAll()
						}
					}
					if (this.couti == 2 && xia) {
						this.somePrevention = true
						this.onQuestion()
					}

					console.log(this.lists);
				}


			},


			//解答题
			onAnswersw(item, index, value, xia) {
				console.log(xia, 'ds')
				console.log(this.lists, 'ds')
				console.log(this.topicList, 'ds')
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					if (this.ListType == 5) {
						this.lists.isAss = 1
					} else if (this.ListType == 10) {
						if (this.topicList.questionPaperSubjectSubordinatesList[0].liftingType == 5) {
							this.lists.isAss = 1
						}
					}
					this.lists.Theanswer = [];
					this.lists.Theanswer.push(index);
					this.answerAllTl()
					this.onQuestion()
				}

			},
			onAnswer() { //答题模式切换
				this.isAss = true
			},
			//多选提交按钮
			onDetermine() {
				console.log('ee当前题:', this.lists)
				console.log('ee当前isRight:', this.correctAnswer)
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					if (this.lists.Theanswer.length == 0) {
						uni.showToast({
							title: '您未选择答案',
							icon: 'none'
						})
						return
					} else {
						if (this.isRight[this.lists.id]) {
							if (this.isRight[this.lists.id] == 1) {
								this.lists.isAss = 1
							} else {
								this.lists.isAss = 2
							}
						} else {
							this.lists.isAss = false;
						}

						this.correctAnswer.sort()
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
						if (this.couti == 2) {
							this.onQuestion()
						} else {
							this.answerAll('onDetermine')
						}
						console.log('ee更改:', this.correctAnswer)
					}
				}


			},
			onBackswer() { //答题模式切换
				this.isAss = false
			},
			//解答题提交答案this.chapterId
			answerAllTl(va) {
				console.log(this.lists)
				console.log(this.type)
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					answerAll({
						liftingType: this.num_tixing,
						sourceClassify: this.num_fenlei,
						associatedId: this.lists.associatedId,
						subjectId: this.lists.id,
						solution: this.lists.Theanswer.join(","),
						sourceType: this.sourceType,
						type: this.sourType,
						errorType: '',
						examinationId: this.sourceType == 3 ? this.lists.associatedId : ''
					}).then((res) => {
						this.SubjecAnswerText()
					})
				}

			},
			//单选提交答案this.chapterId
			answerAll(va) {
				console.log(this.lists)
				console.log(this.type)
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后即可使用',
						icon: 'none'
					})
				} else {
					answerAll({
						liftingType: this.num_tixing,
						sourceClassify: this.num_fenlei,
						associatedId: this.lists.associatedId,
						subjectId: this.lists.id,
						solution: this.ListType == 5 ? this.lists.Theanswer.join(",") : "",
						optionId: this.ListType != 5 ? this.lists.Theanswer.join(",") : "",
						sourceType: this.sourceType,
						type: this.sourType,
						errorType: '',
						examinationId: this.sourceType == 3 ? this.lists.associatedId : ''
					}).then((res) => {
						this.SubjecAnswerText()
					})
				}

			},
			//点击答题卡
			onSheet(item, items, listIndex, index, zindex, value) {
				console.log(item, items, listIndex, index, zindex)
				this.answer = []
				this.correctAnswer = []
				this.type = listIndex
				this.index = index
				// this.switchList()
				if (zindex) {
					console.log(zindex)
					this.zIIndex = zindex
				} else if (zindex == 0) {
					console.log(zindex)
					this.zIIndex = zindex
				}
				if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
					.type == 10) {
					this.lists = this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList[this
						.zIIndex]
					this.subjectNo = this.listArr[this.type].list[this.index];
				} else {
					this.lists = this.listArr[this.type].list[this.index];
					this.subjectNo = this.listArr[this.type].list[this.index];
				}
				this.ListType = this.listArr[this.type].type
				this.SubjectQueryById('close')
			},
			//获取当前题干
			SubjectQueryById(value) {
				console.log(this.listArr[this.type], 222)
				console.log(this.zIIndex, 222)
				console.log(value, 222)
				this.coutiIsAss = false
				this.anButtonIsAss = false
				if (value == 'close') {
					this.close()
				}
				if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
					.type == 10) {
					let reqData = {
						childId: this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList[
							this.zIIndex].id,
						sourceType: this.sourceType, //1章节2试卷
						type: this.sourType,
						subjectId: this.listArr[this.type].list[this.index].id,
						chapterId: this.sourceType == 1 ? getchapter().id : '',
						templateId: this.sourceType == 1 ? getlistById().templateId : '',
						paperId: this.sourceType == 2 ? getpaper().id : '',
						majorId: getMajorInfo2().id,
						examinationId: this.sourceType == 3 ? this.lists.associatedId : '' //组卷id
					}
					get_lnzt_queryBySubjectId(reqData).then((res) => {
						console.log('获取当前题干2', res)
						console.log('获取当前题干2', this.lists)
						console.log('获取当前题干2', this.subjectNo)
						setTimeout(() => {
							console.log('结束')
							this.somePrevention = true
						}, 500)
						this.topicList = res.result
						this.isCollect = res.result.questionPaperSubjectSubordinatesList[0].isCollect
						this.isCollectId = res.result.questionPaperSubjectSubordinatesList[0].isCollectId
						this.lists.Theanswer = []

						if (this.lists.isAss != 0) {
							if (this.lists.liftingType != 5) {
								if (this.topicList.questionPaperSubjectSubordinatesList[0]
									.questionChapterPractice.optionId.split(',').length > 1) {
									if (this.couti == 2) {
										this.anButtonIsAss = true
									}
									this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption
										.forEach((res, index) => {

											this.topicList.questionPaperSubjectSubordinatesList[0]
												.questionChapterPractice.optionId.split(',').forEach((item,
													onIndex) => {
													console.log(res, '0900')
													console.log(item)

													if (res.id == item) {
														// this.correctAnswer.push(res.selectValue)
														console.log(this.lists.Theanswer.length, '重新答题')
														if (this.ListType == 3 || this.ListType == 4 ||
															this.ListType == 10) {
															this.onCommontopic(res, index, 'value')
														}
													}
												})
										})
									console.log(this.correctAnswer)
								} else {
									if (this.topicList.questionPaperSubjectSubordinatesList[0].liftingType !=
										5) {
										this.topicList.questionPaperSubjectSubordinatesList[0]
											.questionPaperOption.forEach((resse, index) => {
												console.log(resse, '0900')
												// if (resse.rightFlag == 0) {
												// 	this.answer.push(resse.selectValue)
												// }
												if (resse.id == this.topicList
													.questionPaperSubjectSubordinatesList[0]
													.questionChapterPractice.optionId) {
													// this.correctAnswer.push(resse.selectValue)
													if (this.ListType == 3 || this.ListType == 4 || this
														.ListType == 10) {
														this.onCommontopic(resse, index, 'value')
													}
												}
											})
									}
								}
							}

						} else if (this.lists.isAss == 0 && this.isAss == true) { //解析答案
							if (this.topicList.questionPaperSubjectSubordinatesList[0].liftingType != 5) {
								this.topicList.questionPaperSubjectSubordinatesList[0].questionPaperOption
									.forEach(
										(res) => {
											console.log(res, 253)
											if (res.rightFlag == 0) {
												this.answer.push(res.selectValue)
											}
										})
							}
						}

						this.showde = true
					})
				} else {
					let reqData = {
						sourceType: this.sourceType, //1章节2试卷3智能
						type: this.sourType,
						subjectId: this.listArr[this.type].list[this.index].id,
						chapterId: this.sourceType == 1 ? getchapter().id : '',
						templateId: this.sourceType == 1 ? getlistById().templateId : '',
						paperId: this.sourceType == 2 ? getpaper().id : '',
						majorId: getMajorInfo2().id,
						examinationId: this.sourceType == 3 ? this.lists.associatedId : '' //组卷id
					}
					get_lnzt_queryBySubjectId(reqData).then((res) => {
						console.log('获取当前题干：', res)
						console.log('获取当前题干3：', this.lists)
						console.log('获取当前题干4：', this.ListType)
						// if (this.couti == 2) {
						// 	res.result.questionChapterPractice = null
						// }
						setTimeout(() => {
							console.log('结束')
							this.somePrevention = true
						}, 500)

						this.topicList = res.result
						this.isCollect = res.result.isCollect
						this.isCollectId = res.result.isCollectId
						this.lists.Theanswer = []
						if (this.listArr[this.type].type == 2) {
							this.topicList.questionPaperOption.forEach((res) => {
								console.log(res)
								res.Hasa = false
							})
						}
						console.log(this.lists.isAss != 0, '结束')
						if (this.lists.isAss != 0) {
							if (this.ListType == 5) {

							} else {
								if (this.topicList.questionChapterPractice) {
									// 游客
									if (this.topicList.questionChapterPractice.optionId.split(',').length > 1) {
										if (this.couti == 2) {
											this.anButtonIsAss = true
										}
										console.log(this.topicList.questionChapterPractice.optionId.split(','))
										this.topicList.questionPaperOption.forEach((res, index) => {
											this.topicList.questionChapterPractice.optionId.split(',')
												.forEach((
													item) => {
													if (res.id == item) {
														// this.correctAnswer.push(res.selectValue)
														console.log(this.lists.Theanswer.length,
															'重新答题')
														if (this.ListType == 1) {
															this.onIput(res, index)
														} else {
															this.oncheckbox(res, index, 'chu')
														}
													}
												})
										})
										// }
									} else {
										this.topicList.questionPaperOption.forEach((res, index) => {
											if (res.id == this.topicList.questionChapterPractice
												.optionId) {
												console.log(res, 90)
												if (this.ListType == 1) {
													this.onIput(res, index, 'chu')
												} else if (this.ListType == 9) {
													this.onJudgment(res, index, 'chu')
												} else {
													this.oncheckbox(res, index, 'chu')
												}
											}
										})
									}
								}

							}
						} else {
							if (this.isAss == true) {
								if (this.ListType != 5) {
									this.topicList.questionPaperOption.forEach((res, index) => {
										if (res.rightFlag == 0) {
											this.answer.push(res.selectValue)
										}
									})
								}

							}
						}
						this.showde = true
					})
				}

			},

			//答题结束后重新加载统计
			SubjecAnswerText(value) {
				console.log(this.listArr[this.type], 222)
				console.log(this.zIIndex, 222)
				console.log(value, 222)
				if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
					.type == 10) {
					let reqData = {
						childId: this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList[
							this.zIIndex].id,
						sourceType: this.sourceType, //1章节2试卷
						type: this.sourType,
						subjectId: this.listArr[this.type].list[this.index].id,
						chapterId: this.sourceType == 1 ? getchapter().id : '',
						templateId: this.sourceType == 1 ? getlistById().templateId : '',
						paperId: this.sourceType == 2 ? getpaper().id : '',
						majorId: getMajorInfo2().id,
						examinationId: this.sourceType == 3 ? this.lists.associatedId : '' //组卷id
					}
					get_lnzt_queryBySubjectId(reqData).then((res) => {
						console.log('获取当前题干2', res)
						console.log('获取当前题干2', this.lists)
						console.log('获取当前题干2', this.subjectNo)

						//#ifdef H5
						this.topicList = res.result;
						//#endif
						//#ifdef MP-WEIXIN
						this.topicList = res.result;
						// topicList.questionPaperSubjectSubordinatesList[0].answerTxt = res.result.answerTxt
						//#endif
					})
				} else {
					let reqData = {
						sourceType: this.sourceType, //1章节2试卷3智能
						type: this.sourType,
						subjectId: this.listArr[this.type].list[this.index].id,
						chapterId: this.sourceType == 1 ? getchapter().id : '',
						templateId: this.sourceType == 1 ? getlistById().templateId : '',
						paperId: this.sourceType == 2 ? getpaper().id : '',
						majorId: getMajorInfo2().id,
						examinationId: this.sourceType == 3 ? this.lists.associatedId : '' //组卷id
					}
					get_lnzt_queryBySubjectId(reqData).then((res) => {
						console.log('获取当前题干：', res)
						console.log('获取当前题干3：', this.lists)

						//#ifdef H5
						this.topicList = res.result;
						//#endif
						//#ifdef MP-WEIXIN
						// this.topicList.answerText = res.result.answerText
						this.topicList = res.result;
						//#endif
					})
				}

			},

			//切换题型
			switchList() {
				if (
					this.listArr[this.type].type == 3 ||
					this.listArr[this.type].type == 4
				) {
					this.listArr.forEach((res, index) => {
						if (res.type == 3 || res.type == 4) {
							res.list.forEach((item, ine) => {
								console.log(res, 888)
								// item.isAss = false;
								item.Hasa = false;
								item.TheanswerObj = {};
								item.Theanswer = [];
								item.questionPaperSubjectSubordinatesList.forEach((resw) => {
									console.log(resw, 9979)
									resw.TheanswerObj = {};
									resw.Theanswer = [];
									// resw.isAss = false;
									resw.Hasa = false;
								});
							});
							console.log(this.listArr);
						}
					});
				} else {
					this.listArr.forEach((res, index) => {
						if (res.type == 1 || res.type == 2 || res.type == 9) {
							res.list.forEach((item, ine) => {
								console.log(res, 888)
								// item.isAss = false; //已答未答
								item.Hasa = false; //答题是否正确
								item.Theanswer = [];
							})
							console.log(this.listArr, 8564);
						}
					});
				}
				this.isRight = []
			},
			//获取题
			async SubjectList(value) {
				console.log('chucunlong')
				console.log(this.isAss, 'chucunlong')
				if (this.sourceType != 99 && this.sourceType != 100 && this.sourceType != 3) {
					let res = await get_lnzt_listAll({
						liftingType: this.num_tixing,
						sourceClassify: this.num_fenlei,
						sourceType: this.sourceType, //1是章节 2是试卷
						chapterId: this.sourceType == 1 ? getchapter().id : '',
						paperId: this.sourceType == 2 ? getpaper().id : '',
						templateId: this.sourceType == 1 ? getlistById().templateId : '',
						type: this.sourType,
					})
					console.log('获取提返回值：', res);

					if (value == 'cuo') {
						var arrs = res.result.list
						var arr = []
						for (var i = 0; i < arrs.length; i++) {
							if (arrs[i].count == 0) {
								console.log(22)
								res.result.list.splice(i, 1)
								i = i - 1
							}
						}

						for (var i = 0; i < arrs.length; i++) {
							arr.push(arrs[i].list)
						}

						if (arr.length == 0) {
							this.jiexiIsAss = false
							this.num_fenlei = this.jielu_tixin
							uni.showToast({
								title: '无错题',
								icon: 'error',
								duration: 2000
							})
							return
						} else {
							this.jiexiIsAss = true
							this.shareArr = []
							this.AboutArr = []
							this.sexswtArr = []
							this.type = 0
							this.index = 0
							this.zIIndex = 0
						}
					}

					this.listArr = res.result.list
					this.listLength = 0
					this.answer = [], //正确答案
						this.correctAnswer = [], //我的答案
						this.subjectIdList = res.result.subjectIdList
				} else if (this.sourceType == 3 && value == 'cuo' && this.isAss == true) {
					let res = await findBySmartParam({
						examinationId: this.sourceType == 3 ? this.listArr[0].list[0].associatedId : ''
					})
					console.log('获取提返回值3：', res);
					if (value == 'cuo') {
						if (res.result.list.length == 0) {
							this.jiexiIsAss = false
							this.num_fenlei = this.jielu_tixin
							uni.showToast({
								title: '无错题',
								icon: 'error',
								duration: 2000
							})
							return
						} else {
							this.jiexiIsAss = true
							this.shareArr = []
							this.AboutArr = []
							this.sexswtArr = []
							this.type = 0
							this.index = 0
							this.zIIndex = 0
						}
					}
					this.listArr = res.result.list
					this.listLength = 0
					this.answer = [], //正确答案
						this.correctAnswer = [], //我的答案
						this.subjectIdList = res.result.subjectIdList
				}

				this.listArr.forEach((res, index) => {
					if (res.type == 3 || res.type == 4 || res.type == 10) {
						this.listArrLength += res.list.length;
						res.list.forEach((item, ine) => {
							this.listLength += item.questionPaperSubjectSubordinatesList
								.length;
						});
					} else {
						this.listArrLength += res.list.length;
						this.listLength += res.list.length;
					}
				});

				if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
					.type == 10) {
					if (this.isAss != true && this.sourceType != '3') {
						console.log('进入')
						this.listArr.forEach((res, index) => {
							if (res.type == 3 || res.type == 4 || res.type == 10) {
								res.list.forEach((item, ine) => {
									item.Hasa = false;
									item.TheanswerObj = {};
									item.Theanswer = [];
									item.questionPaperSubjectSubordinatesList.forEach(
										(resw) => {
											resw.TheanswerObj = {};
											resw.Theanswer = [];
											resw.Hasa = false;
										}
									);
								});
							}
						});
					} else if (this.sourceType == '3' && this.couti != '3') {
						console.log('进入')
						this.listArr.forEach((res, index) => {
							if (res.type == 3 || res.type == 4 || res.type == 10) {
								res.list.forEach((item, ine) => {
									// console.log(res, 888)
									item.isAss = 0;
									item.Hasa = false;
									item.TheanswerObj = {};
									item.Theanswer = [];
									item.questionPaperSubjectSubordinatesList.forEach(
										(resw) => {
											resw.TheanswerObj = {};
											resw.Theanswer = [];
											resw.Hasa = false;
											resw.isAss = 0;
										}
									);
								});
							} else {
								res.list.forEach((item, ine) => {
									item.isAss = 0; //已答未答
									item.Hasa = false; //答题是否正确
									item.Theanswer = [];
								})
							}
						});
					}

					this.lists = this.listArr[this.type].list[this.index]
						.questionPaperSubjectSubordinatesList[this.zIIndex]
					this.subjectNo = this.listArr[this.type].list[this.index];
					this.ListType = this.listArr[this.type].type
					console.log(this.lists)
					this.SubjectQueryById()
				} else {
					if (this.isAss != true && this.sourceType != '3') {
						console.log('进入')
						this.listArr.forEach((res, index) => {
							if (res.type == 1 || res.type == 2 || res.type == 9 || res.type == 5) {
								res.list.forEach((item, ine) => {
									item.Hasa = false; //答题是否正确
									item.Theanswer = [];
								})
							}
						});
					} else if (this.sourceType == '3' && this.couti != '3') {
						this.listArr.forEach((res, index) => {
							if (res.type == 1 || res.type == 2 || res.type == 9 || res.type == 5) {
								res.list.forEach((item, ine) => {
									item.isAss = 0; //已答未答
									item.Hasa = false; //答题是否正确
									item.Theanswer = [];
								})
							} else {
								res.list.forEach((item, ine) => {
									// console.log(res, 888)
									item.isAss = 0;
									item.Hasa = false;
									item.TheanswerObj = {};
									item.Theanswer = [];
									item.questionPaperSubjectSubordinatesList.forEach(
										(resw) => {
											resw.TheanswerObj = {};
											resw.Theanswer = [];
											resw.Hasa = false;
											resw.isAss = 0;
										}
									);
								});

							}
						});
					}

					this.lists = this.listArr[this.type].list[this.index]
					this.subjectNo = this.listArr[this.type].list[this.index];
					this.ListType = this.listArr[this.type].type
					console.log(this.lists)
					this.SubjectQueryById()
				}




				this.useTime = this.listArrLength * 30
				this.seconds = Number(this.useTime);
				this.listArr.forEach((res, index) => {
					if (res.type == 3) {
						res.list.forEach((resd, indexs) => {
							resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
								ite.clickIndex = indexs
								ite.type = index
								this.shareArr.push(ite)
							})
						})
						console.log(this.shareArr)
					} else if (res.type == 4) {
						res.list.forEach((resd, indexs) => {
							resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
								ite.clickIndex = indexs
								ite.type = index
								this.AboutArr.push(ite)
							})
						})
						console.log(this.AboutArr)
					} else if (res.type == 10) {
						res.list.forEach((resd, indexs) => {
							if (resd.questionPaperSubjectSubordinatesList.length > 0) {
								resd.questionPaperSubjectSubordinatesList.forEach((ite, ind) => {
									ite.clickIndex = indexs
									ite.type = index
									this.sexswtArr.push(ite)
								})
							}
						})
						console.log(this.sexswtArr)
					}
				})
			},
			//上一题
			onTopic() {
				if (this.type <= 0 && this.index <= 0 && this.zIIndex <= 0) {
					return
				}
				console.log(this.type, this.index, this.zIIndex)
				if ((this.ListType == 1 || this.ListType == 2) && this.subjectNo.subNo == 1) {
					return
				}
				if (this.somePrevention == false) {
					return
				} else {
					this.somePrevention = false
				}
				if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
					.type == 10) {
					if (this.zIIndex <= 0) {
						if (this.index <= 0) {
							if (this.type <= 0) {
								this.type = 0
							} else {
								this.type -= 1
							}

							// if(this.type>= 0 && this.index!=0){
							console.log(1)
							this.index = this.listArr[this.type].list.length - 1
							// }/
							this.zIIndex = this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList
								.length - 1
							this.showde = false
						} else {
							console.log(2)
							this.index -= 1;
							this.zIIndex = this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList
								.length - 1
							this.showde = false
						}
					} else {
						this.zIIndex -= 1
						this.showde = false
					}
				} else {
					if (this.index <= 0) {
						if (this.type != 0) {
							this.type -= 1
						} else {
							this.type = 0
						}
						console.log(1)
						this.index = this.listArr[this.type].list.length - 1
						this.showde = false
					} else {
						console.log(2)
						this.index -= 1;
						this.showde = false
					}
				}

				this.answer = []
				this.correctAnswer = []


				if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
					.type == 10) {
					this.lists = this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList[this
						.zIIndex]
					this.subjectNo = this.listArr[this.type].list[this.index];
				} else {
					this.lists = this.listArr[this.type].list[this.index];
					this.subjectNo = this.listArr[this.type].list[this.index];
				}
				this.ListType = this.listArr[this.type].type
				this.SubjectQueryById()
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				});

			},
			//提示确定
			onYes() {
				console.log('用户点击确定1');
				if (getTouristToken() && !getToken()) {
					uni.showToast({
						title: '登陆后提交即可获取评分',
						icon: 'none'
					})
					setTimeout(() => {
						let pages = getCurrentPages(); //获取所有页面栈实例列表
						let nowPage = pages[pages.length - 1]; //当前页页面实例
						let prevPage = pages[pages.length - 2]; //上一页页面实例
						console.log(pages)
						console.log(nowPage)
						console.log(prevPage)
						// prevPage.$vm.tabbarIndex = 3; //修改上一页data里面的参数值
						uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
							delta: 2
						});
					}, 2000)

				} else {
					console.log(this.num_tixing)
					console.log(this.num_fenlei)
					this.tishiAss = false
					if (this.lists.Theanswer.length > 0) {
						if ((this.ListType != 5 && this.ListType != 10) || (this.ListType == 10 && this.topicList
								.questionPaperSubjectSubordinatesList[0].liftingType != 5)) {
							this.answerAll()
						} else {
							this.answerAllTl()
						}
					}
					this.clearTimer();
					uni.redirectTo({
						url: `/pagesB/end/index?listAll=${encodeURIComponent(JSON.stringify(this.listArr))}&type=${this.sourType}&sourceType=${this.sourceType}&num_tixing=${this.num_tixing}&num_fenlei=${this.num_fenlei}&couti=${this.couti}&subjectIdList=${this.subjectIdList}`
					})
				}
			},
			onNo() {
				this.tishiAss = false
				// console.log('用户点击取消');
			},
			//评分计算当前试卷答题数量
			onAgain() {
				practiceCheck({
					subjectIdList: this.subjectIdList,
					paperId: this.sourceType == 2 ? getpaper().id : '', //试卷ID
					type: this.sourType, //	做题形式 1练习 2测试
					sourceType: this.sourceType, //	题来源 //1章节2试卷3智能
					chapterId: this.sourceType == 1 ? getchapter().id : '', //	章节试卷ID
					templateId: this.sourceType == 1 ? getlistById().templateId : '', //节ID
					examinationId: this.sourceType == 3 ? this.lists.associatedId : '',
					viewFlg: 2,
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.Arrse = res.result
						this.tishiAss = true
						this.somePrevention = true
					}
				})
			},
			//下一题
			onQuestion(vale) {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100
				});
				if (this.somePrevention == false) {
					return
				} else {
					this.somePrevention = false
				}
				console.log(this.showde)
				console.log(this.lists)
				console.log(this.topicList, 'pkppk')
				if (this.couti == 2 && this.lists.isAss != 0) {
					if (this.ListType != 5) {
						if (this.ListType == 10 && this.topicList.questionPaperSubjectSubordinatesList[0].liftingType ==
							5) {

						} else {
							this.answerAll()
						}
					}

				}
				if (this.topicList.successNumber > 1 && this.couti == 2 && this.lists.isAss == 0 && this.lists.Theanswer
					.length > 0 && this.coutiIsAss == false) {
					var that = this
					uni.showModal({
						title: '提示',
						content: '您还未提交答案，确定要进入下一题吗？',
						success: function(res) {
							if (res.confirm) {
								that.coutiIsAss = true
								that.somePrevention = true
								that.onQuestion()
								console.log('用户点击确定');
							} else if (res.cancel) {
								that.coutiIsAss = false
								that.somePrevention = true
								console.log('用户点击取消');
							}
						}
					});
					return
				}
				console.log(this.isAss)
				if (this.isAss == true) {
					if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
						.type == 10) {
						if (this.zIIndex >= this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList
							.length - 1) {
							if (this.index >= this.listArr[this.type].list.length - 1) {
								console.log('jin')
								if (this.type >= this.listArr.length - 1) {
									let that = this
									that.jieAss = true
									that.onAgain()
									console.log('olo')
								} else {
									this.type += 1
									this.index = 0
									this.zIIndex = 0
									this.showde = false
								}

							} else {
								console.log('jin2')
								this.index += 1;
								this.zIIndex = 0
								this.showde = false
							}
						} else {
							this.zIIndex += 1
							this.showde = false
						}
					} else {
						if (this.index >= this.listArr[this.type].list.length - 1) {
							if (this.type >= this.listArr.length - 1) {
								let that = this
								that.onAgain()
								return
								console.log('olo')
							} else {
								this.type += 1
								this.index = 0
								this.zIIndex = 0
								this.showde = false
							}
						} else {
							console.log('jin4')
							this.index += 1;
							this.showde = false
						}
					}

					this.answer = []
					this.correctAnswer = []


					if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
						.type == 10) {
						this.lists = this.listArr[this.type].list[this.index]
							.questionPaperSubjectSubordinatesList[this.zIIndex]
						this.subjectNo = this.listArr[this.type].list[this.index];
					} else {
						this.lists = this.listArr[this.type].list[this.index];
						this.subjectNo = this.listArr[this.type].list[this.index];
					}
					this.ListType = this.listArr[this.type].type
					this.SubjectQueryById()
					return
				}

				if (this.isAss == false) {
					console.log('chusaoin')
					console.log(this.listArr[this.type].list.length)
					console.log(this.listArr)
					console.log(this.index)

					if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
						.type == 10) {
						if (this.zIIndex >= this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList
							.length - 1) {
							if (this.index >= this.listArr[this.type].list.length - 1) {
								console.log(1)
								if (this.type >= this.listArr.length - 1) {
									let that = this
									that.onAgain()
									return
									console.log('olo')
								} else {
									this.type += 1
									this.index = 0
									this.zIIndex = 0
									this.showde = false
								}
							} else {
								console.log(2)
								this.index += 1;
								this.zIIndex = 0
								this.showde = false
							}
						} else {
							this.zIIndex += 1
							this.showde = false
						}
					} else {
						if (this.index >= this.listArr[this.type].list.length - 1) {
							if (this.type >= this.listArr.length - 1) {
								let that = this
								that.onAgain()
								return
								console.log('olo')
							} else {
								this.type += 1
								this.index = 0
								this.zIIndex = 0
								this.showde = false
							}
						} else {
							console.log(2)
							this.index += 1;
							this.showde = false
						}
					}

					this.answer = []
					this.correctAnswer = []

					console.log(this.listArr[this.type].list[this.index], '检查')
					console.log(this.index, '检查')
					console.log(this.type, '检查')
					console.log(this.zIIndex, '检查')
					console.log(this.listArr[this.type].type, '检查')
					if (this.listArr[this.type].type == 3 || this.listArr[this.type].type == 4 || this.listArr[this.type]
						.type == 10) {
						console.log(this.listArr[this.type].type, '检查1')
						this.lists = this.listArr[this.type].list[this.index].questionPaperSubjectSubordinatesList[this
							.zIIndex]
						this.subjectNo = this.listArr[this.type].list[this.index];
					} else {
						console.log(this.listArr[this.type].type, '检查2')
						this.lists = this.listArr[this.type].list[this.index];
						this.subjectNo = this.listArr[this.type].list[this.index];
					}
					this.ListType = this.listArr[this.type].type
					this.SubjectQueryById()
					console.log(this.lists)

					return
				}

			}
		}
	}
</script>

<style scoped lang='scss'>
	view {
		box-sizing: inherit !important;
	}

	.wenhao {
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
		margin-top: 0 !important;
	}

	.yichu-img3 {
		width: 66.3rpx;
		height: 66.3rpx;
	}

	.tuihus2 {
		width: 285rpx;
		height: 66rpx;
		background: #0492A1;
		border-radius: 33rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tishiyu {
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #333333;
	}

	.flexzanti {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		margin-top: 54rpx;
	}

	.flexzanti2 {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 54rpx;
	}

	.tuihus {
		width: 180rpx;
		height: 66rpx;
		border: 1rpx solid #B5B5B5;
		border-radius: 33rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #0492A1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.juxu {
		width: 180rpx;
		height: 66rpx;
		/* border: 1rpx solid #B5B5B5; */
		border-radius: 33rpx;
		font-size: 28rpx;
		font-weight: 500;
		background: #0492A1;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.time-img {
		width: 153rpx;
		height: 159rpx;
		position: absolute;
		left: 50%;
		margin-left: -76.5rpx;
		top: -41rpx;
	}

	.time-img2 {
		width: 153rpx;
		height: 170rpx;
		position: absolute;
		left: 50%;
		margin-left: -76.5rpx;
		top: -46rpx;
	}

	.div-time {
		width: 481rpx;
		height: 399rpx;
		background-image: url($fileBaseUrl + '/xing/zanti.png');
		background-size: 100%;
		background-repeat: no-repeat;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -200rpx;
		margin-left: -240.5rpx;
		padding-top: 192rpx;
	}

	.text6 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.gotop_btn {
		width: 91rpx;
		height: 91rpx;
		position: fixed;
		z-index: 9;
		right: 50rpx;
		bottom: 150rpx;
	}

	.all-list {
		overflow: hidden;
		position: fixed;
		height: 100%;
		width: 100%;
		padding-top: 170rpx;
		padding-bottom: 180rpx;
		background-color: rgba(247, 247, 247, 1);
		min-height: 100%;
	}

	.zitso {
		max-width: 100%;
		font-size: 32px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
	}

	.borderColor {
		border: 2rpx solid rgba(1, 145, 160, 1) !important;
		color: rgba(1, 145, 160, 1) !important;
		background-color: #FFFFFF !important;
	}

	.szieFont {
		width: 67rpx;
		height: 67rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 24rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 55rpx;
	}

	.szieFont2 {
		width: 67rpx;
		height: 67rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		margin-right: 55rpx;
		justify-content: center;
	}

	.szieFont3 {
		width: 67rpx;
		height: 67rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 32rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shopn-flex {
		display: flex;
		align-items: center;
	}

	.shopName-text {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin-right: 55rpx;
	}

	.shopName {
		width: 95%;
		height: 152rpx;
		background: #FFFFFF;
		border-radius: 50rpx 50rpx 0rpx 0rpx;
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
		padding-left: 39rpx;
		box-shadow: 0px 0rpx 20rpx 0rpx rgba(0, 0, 0, 0.3000);
		position: fixed;
		bottom: 0;
	}

	.shopName2 {
		background: #FFFFFF;
		border-radius: 50rpx 50rpx 0rpx 0rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 9999;
	}

	.naozhong {
		width: 34rpx;
		height: 33rpx;
		margin-right: 17rpx;
	}

	.zantin {
		width: 32rpx;
		height: 32rpx;
		margin-left: 17rpx;
	}

	.colo2ww {
		color: rgba(250, 100, 45, 1);
	}

	.mar-bu2 {
		font-size: 28px;
		font-weight: 500;
		color: #666666;
	}

	.colose {
		width: 230rpx;
		height: 66rpx;
		border: 2rpx solid #B5B5B5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #999999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.yesAido {
		width: 230rpx;
		height: 66rpx;
		background: $uni-primary;
		border: 2rpx solid #E5E5E5;
		border-radius: 33rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 19rpx;
	}

	.flexsw {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 44rpx;
		padding-bottom: 10rpx;
	}

	.gunbni {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		top: 25rpx;
		right: 25rpx;
	}

	.center {
		width: 600rpx;
		height: 311rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -300rpx;
		margin-top: -150rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.mar-bu {
		font-size: 30px;
		font-weight: bold;
		color: #333333;
		margin-bottom: 50rpx;
	}

	.buttonse {
		width: 250rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(75, 110, 152, 1);
		color: #FFFFFF;
		border-radius: 50rpx;
		margin-top: 15rpx;
	}

	.zhezhao {
		width: 100%;
		height: 100%;
		background-color: rgba(51, 51, 51, 0.6);
		position: fixed;
		top: 0;
		z-index: 999;
		left: 0;
	}

	.button321 {
		width: 220rpx;
		height: 74rpx;
		/* border: 1rpx solid $uni-primary; */
		border-radius: 37rpx;
		background: #EEEEEE;
		font-size: 30rpx;
		/* font-family: PingFang SC; */
		font-weight: 500;
		color: #999999;
		/* margin: 66rpx auto 0; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button32s {
		width: 218rpx;
		height: 74rpx;
		border: 1rpx solid $uni-primary;
		border-radius: 37rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: $uni-primary;
		/* margin: 66rpx auto 0; */
		display: flex;
		align-items: center;
		justify-content: center;
		/* padding-right: 10rpx; */
	}

	.ojwo {
		width: 250rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 66rpx auto 0;
	}

	.daanjiexi {
		margin-top: 30rpx;
		height: auto;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 39rpx 37rpx 58rpx 30rpx;
	}

	.flexbodsw {
		display: flex;
		margin-bottom: 25rpx;
		align-items: center;
		font-size: 30rpx;
	}

	.bodsw {
		width: 15rpx;
		height: 15rpx;
		background: $uni-primary;
		border-radius: 50%;
		margin-right: 15rpx;
	}

	.textTonji {
		font-size: 26rpx;
		font-weight: bold;
		color: #333333;
		white-space: nowrap;
	}

	.colorcuo {
		display: flex;
		align-items: center;
		height: 96rpx;
		background: rgba(252, 242, 234, 0.8);
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.colordui {
		display: flex;
		align-items: center;
		height: 96rpx;
		background: rgba(237, 247, 248, 0.8);
		border-radius: 20rpx 20rpx 0px 0px;
	}

	.border-sizes {
		width: 28rpx;
		height: 28rpx;
		margin-right: 15rpx;
	}

	.border-sizes2 {
		width: 32rpx;
		height: 32rpx;
		margin-right: 19rpx;
	}

	.fon-stz {
		position: absolute;
		left: 47%;
		font-size: 24rpx;
		font-weight: bold;
		top: 68rpx;
		color: #333333;
	}

	.fon-stz2 {
		position: absolute;
		left: 44%;
		font-size: 24rpx;
		font-weight: bold;
		top: 68rpx;
		color: #333333;
	}


	.masr {
		margin-left: 57rpx;
		margin-right: 40rpx;
	}

	.masr2 {
		margin-right: 63rpx;
		margin-left: 40rpx;
	}

	.flex-dibu {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.flex-dibu-img {
		width: 30rpx;
		height: 30rpx;
		margin-bottom: 18rpx;
	}

	.flex-dibu-text {
		font-size: 22rpx;
		font-weight: 500;
		color: #333333;
	}

	.moren {
		width: 58rpx;
		height: 56rpx;
		margin-right: 22rpx;
		/* padding: 22rpx; */
	}

	.moren2 {
		width: 56rpx;
		height: 56rpx;
		border: 2rpx solid #DCE0E8;
		border-radius: 50%;
		/* margin-right: 22rpx; */
	}

	.jeixise-flex {
		display: flex;
		align-items: center;
		font-size: 30px;
		font-weight: bold;
		color: #333333;
	}

	.jeixise {
		height: 94rpx;
		background-color: #FFFFFF;
		/* margin-top: 170rpx; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx 0 45rpx;
		border-top: 1rpx solid #EEEEEE;
	}

	.yichu {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		/* align-items: center; */
		/* box-shadow: 0 -20rpx 10rpx 0 #c5c5c5; */
		position: absolute;
		left: 50%;
		margin-left: -50rpx;
		top: -50rpx;
		background: #FFFFFF;
		border-radius: 50rpx;
	}

	.yichu2 {
		width: 100rpx;
		height: 100rpx;
	}

	.bu3 {
		width: 200rpx;
		height: 80rpx;
	}

	.yichu-img {
		width: 50rpx;
		height: 35rpx;
		/* margin-top: 16rpx; */
	}

	.yichu-img2 {
		width: 66.3rpx;
		height: 66.3rpx;
		/* margin-top: 20rpx; */
	}

	.yichu-img23 {
		width: 70rpx;
		height: 67rpx;
		/* margin-top: 18rpx; */
	}

	.button32 {
		width: 100rpx;
		height: 90rpx;

		line-height: 90rpx;
		text-align: center;
		/* justify-content: center; */
	}

	.button32-img {
		width: 39rpx;
		height: 24rpx;

	}

	.questions-right21 {
		width: 80rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: left;
		display: flex;
		align-items: center;
		padding-right: 30rpx;
	}

	.imgw2 {
		margin-left: 71rpx;
	}

	.flex1 {
		display: flex;
	}

	.daoImage {
		width: 40rpx !important;
		height: 40rpx !important;
		margin-left: 15rpx;
	}

	.daojishi {
		/* width: 300rpx; */
		height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
		font-weight: bold;
		color: #333333;
		/* margin-left: 135rpx; */
	}

	.jioajuan {
		width: 240rpx;
		height: 70rpx;
		background: RGBA(1, 145, 160, 1);
		border-radius: 20rpx;
		font-size: 32px;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.borderBottom {
		width: 690rpx;
		height: 2rpx;
		background: #DDDDDD;
		margin: 0 auto;
	}

	.jiandan {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(57, 208, 78, 0.2);
		border-radius: 10%;
		color: rgba(57, 208, 78, 1);
	}

	.zho {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(241, 180, 34, 0.2);
		border-radius: 10%;
		color: rgba(241, 180, 34, 1);
	}

	.nan {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(237, 102, 3, 0.2);
		border-radius: 10%;
		color: rgba(237, 102, 3, 1);
	}

	.kunnan {
		width: 85rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(237, 47, 3, 0.2);
		border-radius: 10%;
		color: rgba(237, 47, 3, 1);
	}

	.flex5 {
		display: flex;
		align-items: center;
	}

	body {
		margin: 0 auto;
		line-height: 25px;
		letter-spacing: 1px;
		color: #666666;
	}

	ul {
		margin: 0;
		width: 100%;
		border-bottom: 0;
	}

	video,
	img {
		margin-top: 10px;
	}

	.righrt {
		width: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
		padding-top: 20rpx;
	}

	.questions-right {
		width: 80rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: left;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
	}

	.flex1 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.flex1344 {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.bordeRdoun {
		width: 92rpx;
		height: 92rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun2 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: #0CD8C2;
		border-radius: 50%;
		font-size: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun3 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: rgba(238, 154, 81, 1);
		border-radius: 50%;
		font-size: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun4 {
		width: 92rpx;
		height: 92rpx;
		background: #F7F7F7;
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun5 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: #0CD8C2;
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.bordeRdoun6 {
		width: 92rpx;
		height: 92rpx;
		/* border: 2rpx solid #DDDDDD; */
		border-radius: 100%;
		background: rgba(238, 154, 81, 1);
		border-radius: 50%;
		font-size: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 49rpx;
		margin-bottom: 43rpx;
		margin: 0rpx 25rpx 43rpx 25rpx;
	}

	.itemList {
		display: flex;
		flex-wrap: wrap;
		padding: 0 0 0 5rpx;
	}

	.titleText {
		font-size: 34px;
		font-weight: bold;
		color: #333333;
		margin-bottom: 29rpx;
		margin-left: 30rpx;
	}



	.liebieao {
		margin-top: 19rpx;
	}

	.liebieao:nth-child(1) {
		margin-top: 75rpx !important;
	}

	.border1text {
		font-size: 26px;
		font-weight: 500;
		color: #999999;
		display: flex;
		margin-left: 31rpx;
		align-items: center;
	}

	.border1 {
		width: 26rpx;
		height: 26rpx;
		background: $uni-primary;
		border-radius: 100%;
		margin-right: 11rpx;
	}

	.flexbnorder {
		display: flex;
		margin-top: 27rpx;
		margin-bottom: 22rpx;
		/* position: absolute; */
		/* 		right: 35rpx;
			top: 120rpx; */
		/* line-height: 26rpx; */
		/* width: 100%; */
		/* text-align: right;'' */
	}

	.border2 {
		width: 26rpx;
		height: 26rpx;
		border: 2rpx solid #DDDDDD;
		border-radius: 100%;
		margin-right: 11rpx;
	}

	.datika {
		/* margin-right: 272rpx; */
		font-size: 32px;
		font-weight: 500;
		color: #333333;
	}

	.clatop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* border-bottom: 2rpx solid #EAEAEA; */
		/* padding-bottom: 39rpx; */
		margin: 0 30rpx 0rpx;
	}

	.tanchu {
		/* width: 100%; */
		height: 1062rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		padding: 150rpx 0rpx 30rpx;
		overflow-y: scroll;
		position: relative;
	}

	.flwox {
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		z-index: 10;
		top: 0rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
	}

	.datiImg {
		width: 26rpx;
		height: 26rpx;
	}

	.tigan {
		display: flex;
		margin-bottom: 40rpx;
		font-size: 28rpx;
	}

	.colo223 {
		color: rgba(1, 145, 160, 1);
	}

	.colo2ww {
		color: rgba(250, 100, 45, 1);
	}

	.colo2ww23 {
		color: #A3A3A3;
	}

	.right1-0 {
		margin-right: 10rpx;
	}

	.tishipsm {
		font-size: 30px;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		margin-right: 15rpx;
		margin-left: 30rpx;
	}

	.leid {
		margin-right: 15rpx;
		white-space: nowrap;
	}

	.parsing-content {
		/* width: 690rpx; */
		/* height: 140rpx; */
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 35rpx 27rpx 36rpx 30rpx;
		margin-bottom: 30rpx;
	}

	.contetimg {
		max-width: 300rpx;
		max-height: 300rpx;
	}

	.felx3 {
		display: flex;
		align-items: center;
		font-size: 28px;
		font-weight: 500;
		color: #333333;
	}

	.answerText {
		font-size: 26px;
		font-weight: 500;
		color: #333333;
		margin-top: 15rpx;
	}

	.answerText2 {
		font-size: 26px;
		font-weight: 500;
		color: #333333;
		margin-bottom: 30rpx;
		display: flex;
	}




	.buttom {
		width: 100%;
		height: 120rpx;
		background: #FFFFFF;
		box-shadow: 0px 0rpx 10rpx 0 #c5c5c5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		padding: 0 0rpx 18rpx;
	}

	.imgw {
		font-size: 24px;
		font-weight: 500;
		color: #333333;
		display: flex;
		align-items: center;
	}

	.datiicon {
		width: 30rpx;
		height: 30rpx;
		/* margin-bottom: 11rpx; */
		/* margin-right: 36rpx; */
	}

	.datiicon2 {
		width: 36rpx;
		height: 40rpx;
		margin-bottom: 11rpx;
	}

	.before_collection {
		width: 30rpx;
		height: 30rpx;
		margin-bottom: 18rpx;
	}

	.bijiicon {
		width: 41rpx;
		height: 44rpx;
		margin-bottom: 11rpx;
	}

	.button {
		width: 180rpx;
		height: 80rpx;
		background: $uni-primary;
		border-radius: 10rpx;
		font-size: 32px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button2 {
		width: 180rpx;
		height: 80rpx;
		background: $uni-primary;
		border-radius: 10rpx;
		font-size: 32px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button3 {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.button3-img {
		width: 39rpx;
		height: 24rpx;
	}

	.blue {
		width: 6rpx;
		height: 30rpx;
		background: $uni-primary;
		border-radius: 3rpx;
		margin-right: 16rpx;
	}

	.flex2 {
		display: flex;
		align-items: center;
		margin-bottom: 39rpx;
	}

	.parsing {
		padding: 30rpx 30rpx 0rpx;
		/* margin-bottom: 120rpx; */
	}

	.zhenqueicon {
		width: 58rpx !important;
		height: 56rpx;
		margin-right: 22rpx;
		/* padding: 8rpx; */
	}

	.tishipsmeicon {
		width: 30rpx;
		height: 31rpx;
		margin-left: 10rpx;
	}

	.flex {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 41rpx;
		position: relative;
	}

	.theAnswer {
		width: 430rpx;
		margin-right: 25rpx;
		font-size: 30px;
		font-weight: 500;
		color: #132B2E;
	}

	.theAnswer2 {
		width: 430rpx;
		margin-right: 25rpx;
		font-size: 30px;
		font-weight: 500;
		color: #09BDAE;
	}

	.theAnswer3 {
		width: 430rpx;
		margin-right: 25rpx;
		font-size: 30px;
		font-weight: 500;
		color: #FA642D;
	}

	.border {
		width: 50rpx;
		height: 50rpx;
		/* border: 2rpx solid #DDDDDD; */
		/* border-radius: 100%; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15rpx;
		font-size: 28px;
		font-weight: 500;
		color: #333333;
	}

	.borderDui {
		width: 50rpx;
		height: 50rpx;
		/* border-radius: 100%; */
		/* background: #09BDAE; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 25rpx;
		font-size: 32px;
		font-weight: 500;
		color: #000000;
		/* border: 2rpx solid #09BDAE; */
	}

	.borderCuo {
		width: 50rpx;
		height: 50rpx;
		/* background: #FA642D; */
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 25rpx;
		/* border-radius: 100%; */
		font-size: 32px;
		font-weight: 500;
		color: #000000;
		/* border: 2rpx solid #FA642D; */

	}

	.theTitle {
		height: auto;
		font-size: 32px;
		font-weight: bold;
		color: #333333;
		margin-top: 30rpx;
		margin-bottom: 29rpx;
		display: flex;
		align-items: baseline;
	}

	.color {
		font-size: 36rpx;
		margin-right: 10rpx;
		color: $uni-primary !important;
	}

	.color2 {
		font-size: 30rpx;
		color: rgba(102, 102, 102, 1) !important;
	}

	.color23 {
		font-size: 30rpx;
		color: $uni-primary !important;
	}

	.color24 {
		font-size: 30rpx;
		color: rgba(102, 102, 102, 1) !important;
	}

	.questions-title {
		display: flex;
		align-items: center;
		font-size: 26px;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.biaoqian {
		width: auto;
		height: 38rpx;
		background: rgba(241, 89, 42, 0.1);
		border-radius: 6rpx;
		font-size: 24px;
		font-weight: 500;
		color: $uni-primary;
		display: flex;
		white-space: nowrap;
		align-items: center;
		padding: 5rpx 10rpx;
		justify-content: center;

	}

	.questions-center {
		margin: 30rpx 31rpx 0rpx;
		padding: 30rpx 23rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}

	.questions {
		padding-top: 160rpx;
		padding-bottom: 200rpx;
		background-color: #fafafa;
		min-height: 100%;
	}

	.questions-top {
		width: 100%;
		/* height: 88rpx; */
		/* padding-left: 30rpx; */
		/* padding-right: 30rpx; */
		padding-top: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		z-index: 99999;
		background-color: #FFFFFF;

		image {
			/* margin-left: 30rpx; */
			width: 19rpx;
			height: 34rpx;
		}

		.top-title {
			width: 301rpx;
			height: 71rpx;
			border: 1rpx solid $uni-primary;
			border-radius: 6rpx;
			display: flex;
			align-items: center;
			/* justify-content: space-between; */
			margin-left: 95rpx;
			padding: 6rpx 7rpx;
		}

		.Answer {
			width: 150rpx;
			font-size: 28px;
			font-weight: 500;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #132B2E;
		}

		.Answer2 {
			width: 145rpx;
			height: 58rpx;
			background: $uni-primary;
			border: 1rpx solid $uni-primary;
			border-radius: 5rpx;
			font-size: 30px;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
		}

	}
</style>