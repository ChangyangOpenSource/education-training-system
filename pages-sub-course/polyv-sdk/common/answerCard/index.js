import LANGUAGE from"Language";const quesitonType={R:"单选",C:"多选",S:"评分",V:"投票"};class AnswerCard{constructor(){this.answerData={itemType:0,isMultiAns:!1,isSore:!1,answersContent:"",answersOption:[],hasChoice:!1,selectedAnsArr:[],latestQuestionId:""},this.isSubmitted=!1}getQuestionContent(e={},t){const{itemType:s,questionId:n,name:i,type:r}=e,o=[],a="C"===r,c="S"===r,l=a?LANGUAGE.MULTI_CHOICE:"",h=LANGUAGE.TITLE;this.isSubmitted=!1,Object.keys(e).forEach((t,s)=>{if(t.indexOf("option")>-1&&e[t]){const s=t.split("option")[1],n={};n.index=s-1,n.letter=this.number2Letter(t.split("option")[1]),n.choice=c?this.parseString(`${e[t]}分`):this.parseString(`${n.letter}, ${e[t]}`),n.tips=e[`tips${s}`],o.push(n)}}),Object.assign(this.answerData,{answersContent:`【${quesitonType[r]}】${this.parseString(i)}`,latestQuestionId:n,selectedAnsArr:[],itemType:s,multiContent:l,isMultiAns:a,isScore:c,answersOption:o,scoreTips:""}),t&&t(this.answerData,h,"")}getQuestionResult(e={},t){const{isSubmitted:s}=this,{answer:n,singleResult:i,type:r}=e.result,{answersOption:o,latestQuestionId:a}=this.answerData;if(e.questionId!==a)return;let c=!0;o.forEach(e=>{e.style="plv-mp-answer-card-question__middle__result",n.indexOf(e.letter)>-1?(e.style+=" choiceRight",c&&(c=!!e.hasChoiced),e.choiceClass="right"):(e.style+=e.hasChoiced?" choiceWrong":"",c&&(c=!e.hasChoiced),e.hasChoiced&&(e.choiceClass="wrong"))});let l=s?c?"correctAnswer":"wrongAnswer":"noAnswer";l=`${l} ansResult`,t&&t({answersOption:o,topTextClass:l,singleResult:i,type:r,isRight:c})}getQuestionScoreResult(e={},t){const{content:s}=e,{singleResult:n,total:i}=e.result;let r=0;Object.keys(s).filter(e=>-1!==e.indexOf("option")&&s[e]).forEach((e,t)=>{r+=s[e]*n[t]});const o=0===i?i.toFixed(4):(r/i).toFixed(4),a=o.split("."),c=a[0],l=`.${a[1]}`;t&&t({name:s.name,integer:c,decimalPoint:l,average:o})}getLatestQusetionId(){return this.answerData.latestQuestionId}getHasChoice(){const{selectedAnsArr:e}=this.answerData;return e.length>0}getIsSubmitted(){return this.isSubmitted}getIsScore(){const{isScore:e}=this.answerData;return e}choiceTap(e,t,s){const{answersOption:n,isMultiAns:i,selectedAnsArr:r}=this.answerData;let o="";n.forEach((s,n)=>{const{hasChoiced:r}=s;if(i){if(n!==e)return;const i=r?1:0;s.style=r?"":"choiceActive",s.hasChoiced=!r,this.selectAns(t,i)}else{const i=n===e;s.style=i?"choiceActive":"",s.hasChoiced=!!i,i&&(o=s.tips,this.selectAns(t))}});const a=r.length>0;s&&s(a,n,o)}selectAns(e,t=0){const{isMultiAns:s,selectedAnsArr:n}=this.answerData;if(s)return 1===t?n.splice(n.findIndex(t=>t===e),1):n.push(e),void n.sort();n.splice(n.findIndex(t=>t===e),1),n.push(e),n.sort()}toSendAnswer(e,t=function(){}){const{selectedAnsArr:s,latestQuestionId:n}=this.answerData,i=s.join("");this.isSubmitted=!0,e.sendAnswer(i,n,t)}number2Letter(e){return e=Number(e)+64,String.fromCharCode(e)}parseString(e){return"number"==typeof e?e:"string"==typeof e?e.replace(/</g,"&lt;").replace(/>/g,"&gt;").trim():e}}module.exports=AnswerCard;