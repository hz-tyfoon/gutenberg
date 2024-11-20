/*! For license information please see radio-group-stories-index-story.b9d0cf5c.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[1557],{"./packages/components/src/button-group/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),_wordpress_element__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnforwardedButtonGroup(props,ref){const{className,...restProps}=props,classes=(0,clsx__WEBPACK_IMPORTED_MODULE_1__.A)("components-button-group",className);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{ref,role:"group",className:classes,...restProps})}UnforwardedButtonGroup.displayName="UnforwardedButtonGroup";const ButtonGroup=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(UnforwardedButtonGroup),__WEBPACK_DEFAULT_EXPORT__=ButtonGroup;try{ButtonGroup.displayName="ButtonGroup",ButtonGroup.__docgenInfo={description:'ButtonGroup can be used to group any related buttons together. To emphasize\nrelated buttons, a group should share a common container.\n\n```jsx\nimport { Button, ButtonGroup } from \'@wordpress/components\';\n\nconst MyButtonGroup = () => (\n  <ButtonGroup>\n    <Button variant="primary">Button 1</Button>\n    <Button variant="primary">Button 2</Button>\n  </ButtonGroup>\n);\n```',displayName:"ButtonGroup",props:{children:{defaultValue:null,description:"The children elements.",name:"children",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/button-group/index.tsx#ButtonGroup"]={docgenInfo:ButtonGroup.__docgenInfo,name:"ButtonGroup",path:"packages/components/src/button-group/index.tsx#ButtonGroup"})}catch(__react_docgen_typescript_loader_error){}try{buttongroup.displayName="buttongroup",buttongroup.__docgenInfo={description:'ButtonGroup can be used to group any related buttons together. To emphasize\nrelated buttons, a group should share a common container.\n\n```jsx\nimport { Button, ButtonGroup } from \'@wordpress/components\';\n\nconst MyButtonGroup = () => (\n  <ButtonGroup>\n    <Button variant="primary">Button 1</Button>\n    <Button variant="primary">Button 2</Button>\n  </ButtonGroup>\n);\n```',displayName:"buttongroup",props:{children:{defaultValue:null,description:"The children elements.",name:"children",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/button-group/index.tsx#buttongroup"]={docgenInfo:buttongroup.__docgenInfo,name:"buttongroup",path:"packages/components/src/button-group/index.tsx#buttongroup"})}catch(__react_docgen_typescript_loader_error){}},"./packages/components/src/utils/deprecated-36px-size.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>maybeWarnDeprecated36pxSize});var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/deprecated/build-module/index.js");function maybeWarnDeprecated36pxSize({componentName,__next40pxDefaultSize,size,__shouldNotWarnDeprecated36pxSize}){__shouldNotWarnDeprecated36pxSize||__next40pxDefaultSize||void 0!==size&&"default"!==size||(0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_0__.A)(`36px default size for wp.components.${componentName}`,{since:"6.8",version:"7.1",hint:"Set the `__next40pxDefaultSize` prop to true to start opting into the new default size, which will become the default in a future version."})}},"./node_modules/deepmerge/dist/cjs.js":module=>{var isMergeableObject=function isMergeableObject(value){return function isNonNullObject(value){return!!value&&"object"==typeof value}(value)&&!function isSpecial(value){var stringValue=Object.prototype.toString.call(value);return"[object RegExp]"===stringValue||"[object Date]"===stringValue||function isReactElement(value){return value.$$typeof===REACT_ELEMENT_TYPE}(value)}(value)};var REACT_ELEMENT_TYPE="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function cloneUnlessOtherwiseSpecified(value,options){return!1!==options.clone&&options.isMergeableObject(value)?deepmerge(function emptyTarget(val){return Array.isArray(val)?[]:{}}(value),value,options):value}function defaultArrayMerge(target,source,options){return target.concat(source).map((function(element){return cloneUnlessOtherwiseSpecified(element,options)}))}function getKeys(target){return Object.keys(target).concat(function getEnumerableOwnPropertySymbols(target){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(target).filter((function(symbol){return Object.propertyIsEnumerable.call(target,symbol)})):[]}(target))}function propertyIsOnObject(object,property){try{return property in object}catch(_){return!1}}function mergeObject(target,source,options){var destination={};return options.isMergeableObject(target)&&getKeys(target).forEach((function(key){destination[key]=cloneUnlessOtherwiseSpecified(target[key],options)})),getKeys(source).forEach((function(key){(function propertyIsUnsafe(target,key){return propertyIsOnObject(target,key)&&!(Object.hasOwnProperty.call(target,key)&&Object.propertyIsEnumerable.call(target,key))})(target,key)||(propertyIsOnObject(target,key)&&options.isMergeableObject(source[key])?destination[key]=function getMergeFunction(key,options){if(!options.customMerge)return deepmerge;var customMerge=options.customMerge(key);return"function"==typeof customMerge?customMerge:deepmerge}(key,options)(target[key],source[key],options):destination[key]=cloneUnlessOtherwiseSpecified(source[key],options))})),destination}function deepmerge(target,source,options){(options=options||{}).arrayMerge=options.arrayMerge||defaultArrayMerge,options.isMergeableObject=options.isMergeableObject||isMergeableObject,options.cloneUnlessOtherwiseSpecified=cloneUnlessOtherwiseSpecified;var sourceIsArray=Array.isArray(source);return sourceIsArray===Array.isArray(target)?sourceIsArray?options.arrayMerge(target,source,options):mergeObject(target,source,options):cloneUnlessOtherwiseSpecified(source,options)}deepmerge.all=function deepmergeAll(array,options){if(!Array.isArray(array))throw new Error("first argument should be an array");return array.reduce((function(prev,next){return deepmerge(prev,next,options)}),{})};var deepmerge_1=deepmerge;module.exports=deepmerge_1},"./node_modules/fast-deep-equal/es6/index.js":module=>{module.exports=function equal(a,b){if(a===b)return!0;if(a&&b&&"object"==typeof a&&"object"==typeof b){if(a.constructor!==b.constructor)return!1;var length,i,keys;if(Array.isArray(a)){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(!equal(a[i],b[i]))return!1;return!0}if(a instanceof Map&&b instanceof Map){if(a.size!==b.size)return!1;for(i of a.entries())if(!b.has(i[0]))return!1;for(i of a.entries())if(!equal(i[1],b.get(i[0])))return!1;return!0}if(a instanceof Set&&b instanceof Set){if(a.size!==b.size)return!1;for(i of a.entries())if(!b.has(i[0]))return!1;return!0}if(ArrayBuffer.isView(a)&&ArrayBuffer.isView(b)){if((length=a.length)!=b.length)return!1;for(i=length;0!=i--;)if(a[i]!==b[i])return!1;return!0}if(a.constructor===RegExp)return a.source===b.source&&a.flags===b.flags;if(a.valueOf!==Object.prototype.valueOf)return a.valueOf()===b.valueOf();if(a.toString!==Object.prototype.toString)return a.toString()===b.toString();if((length=(keys=Object.keys(a)).length)!==Object.keys(b).length)return!1;for(i=length;0!=i--;)if(!Object.prototype.hasOwnProperty.call(b,keys[i]))return!1;for(i=length;0!=i--;){var key=keys[i];if(!equal(a[key],b[key]))return!1}return!0}return a!=a&&b!=b}},"./node_modules/is-plain-object/dist/is-plain-object.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function isObject(o){return"[object Object]"===Object.prototype.toString.call(o)}function isPlainObject(o){var ctor,prot;return!1!==isObject(o)&&(void 0===(ctor=o.constructor)||!1!==isObject(prot=ctor.prototype)&&!1!==prot.hasOwnProperty("isPrototypeOf"))}__webpack_require__.d(__webpack_exports__,{Q:()=>isPlainObject})},"./packages/components/node_modules/@ariakit/react-core/esm/__chunks/DYHFBFEH.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>useRadioStore});var UVQLZ7T5=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/UVQLZ7T5.js"),_2GXGCHW6=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/2GXGCHW6.js"),D7EIQZAU=__webpack_require__("./node_modules/@ariakit/core/esm/__chunks/D7EIQZAU.js"),EQQLU3CG=__webpack_require__("./node_modules/@ariakit/core/esm/__chunks/EQQLU3CG.js"),PBFD2E7P=__webpack_require__("./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js"),_3YLGPPWQ=__webpack_require__("./node_modules/@ariakit/core/esm/__chunks/3YLGPPWQ.js");function createRadioStore(_a={}){var _a2,props=(0,_3YLGPPWQ.YG)(_a,[]);const syncState=null==(_a2=props.store)?void 0:_a2.getState(),composite=(0,D7EIQZAU.z)((0,_3YLGPPWQ.ko)((0,_3YLGPPWQ.IA)({},props),{focusLoop:(0,PBFD2E7P.Jh)(props.focusLoop,null==syncState?void 0:syncState.focusLoop,!0)})),initialState=(0,_3YLGPPWQ.ko)((0,_3YLGPPWQ.IA)({},composite.getState()),{value:(0,PBFD2E7P.Jh)(props.value,null==syncState?void 0:syncState.value,props.defaultValue,null)}),radio=(0,EQQLU3CG.y$)(initialState,composite,props.store);return(0,_3YLGPPWQ.ko)((0,_3YLGPPWQ.IA)((0,_3YLGPPWQ.IA)({},composite),radio),{setValue:value=>radio.setState("value",value)})}function useRadioStore(props={}){const[store,update]=(0,_2GXGCHW6.Pj)(createRadioStore,props);return function useRadioStoreProps(store,update,props){return store=(0,UVQLZ7T5.Y)(store,update,props),(0,_2GXGCHW6.Tz)(store,props,"value","setValue"),store}(store,update,props)}},"./packages/components/node_modules/@ariakit/react-core/esm/__chunks/K7FXVWIT.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>Radio,z:()=>useRadio});var _SOKV3TSX_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/SOKV3TSX.js"),_3CCTMYB6_js__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/3CCTMYB6.js"),_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/HKOOKEDE.js"),_2GXGCHW6_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/2GXGCHW6.js"),_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/Z32BISHQ.js"),_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js"),_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");var useRadio=(0,_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__.ab)((function useRadio2(_a){var _b=_a,{store,name,value,checked}=_b,props=(0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.YG)(_b,["store","name","value","checked"]);const context=(0,_SOKV3TSX_js__WEBPACK_IMPORTED_MODULE_3__.c4)();store=store||context;const id=(0,_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__.Bi)(props.id),ref=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null),isChecked=(0,_2GXGCHW6_js__WEBPACK_IMPORTED_MODULE_5__.O$)(store,(state=>null!=checked?checked:function getIsChecked(value,storeValue){if(void 0!==storeValue)return null!=value&&null!=storeValue?storeValue===value:!!storeValue}(value,null==state?void 0:state.value)));(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(!id)return;if(!isChecked)return;(null==store?void 0:store.getState().activeId)===id||null==store||store.setActiveId(id)}),[store,isChecked,id]);const onChangeProp=props.onChange,nativeRadio=function isNativeRadio(tagName,type){return"input"===tagName&&(!type||"radio"===type)}((0,_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__.vO)(ref,"input"),props.type),disabled=(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__.$f)(props),[propertyUpdated,schedulePropertyUpdate]=(0,_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__.CH)();(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const element=ref.current;element&&(nativeRadio||(void 0!==isChecked&&(element.checked=isChecked),void 0!==name&&(element.name=name),void 0!==value&&(element.value=`${value}`)))}),[propertyUpdated,nativeRadio,isChecked,name,value]);const onChange=(0,_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__._q)((event=>{if(disabled)return event.preventDefault(),void event.stopPropagation();nativeRadio||(event.currentTarget.checked=!0,schedulePropertyUpdate()),null==onChangeProp||onChangeProp(event),event.defaultPrevented||null==store||store.setValue(value)})),onClickProp=props.onClick,onClick=(0,_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__._q)((event=>{null==onClickProp||onClickProp(event),event.defaultPrevented||nativeRadio||onChange(event)})),onFocusProp=props.onFocus,onFocus=(0,_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__._q)((event=>{if(null==onFocusProp||onFocusProp(event),event.defaultPrevented)return;if(!nativeRadio)return;if(!store)return;const{moves,activeId}=store.getState();moves&&(id&&activeId!==id||onChange(event))}));return props=(0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.ko)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.IA)({id,role:nativeRadio?void 0:"radio",type:nativeRadio?"radio":void 0,"aria-checked":isChecked},props),{ref:(0,_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_4__.SV)(ref,props.ref),onChange,onClick,onFocus}),props=(0,_3CCTMYB6_js__WEBPACK_IMPORTED_MODULE_7__.k)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.IA)({store,clickOnEnter:!nativeRadio},props)),(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_6__.HR)((0,_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.IA)({name:nativeRadio?name:void 0,value:nativeRadio?value:void 0,checked:isChecked},props))})),Radio=(0,_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__.ph)((0,_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__.Rf)((function Radio2(props){const htmlProps=useRadio(props);return(0,_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__.n)("input",htmlProps)})))},"./packages/components/node_modules/@ariakit/react-core/esm/__chunks/SOKV3TSX.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{XF:()=>useRadioProviderContext,aN:()=>RadioScopedContextProvider,c4:()=>useRadioContext});var _WENSINUV_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/WENSINUV.js"),ctx=(0,__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/HKOOKEDE.js").B0)([_WENSINUV_js__WEBPACK_IMPORTED_MODULE_1__.ws],[_WENSINUV_js__WEBPACK_IMPORTED_MODULE_1__.aN]),useRadioContext=ctx.useContext,useRadioProviderContext=(ctx.useScopedContext,ctx.useProviderContext),RadioScopedContextProvider=(ctx.ContextProvider,ctx.ScopedContextProvider)},"./packages/components/node_modules/@ariakit/react-core/esm/radio/radio-group.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>RadioGroup});var _chunks_SOKV3TSX_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/SOKV3TSX.js"),_chunks_TW35PKTK_js__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/TW35PKTK.js"),_chunks_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/HKOOKEDE.js"),_chunks_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/Z32BISHQ.js"),_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/3YLGPPWQ.js"),_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@ariakit/core/esm/__chunks/PBFD2E7P.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js"),useRadioGroup=(0,_chunks_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__.ab)((function useRadioGroup2(_a){var _b=_a,{store}=_b,props=(0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.YG)(_b,["store"]);const context=(0,_chunks_SOKV3TSX_js__WEBPACK_IMPORTED_MODULE_3__.XF)();return store=store||context,(0,_ariakit_core_utils_misc__WEBPACK_IMPORTED_MODULE_4__.V1)(store,!1),props=(0,_chunks_Z32BISHQ_js__WEBPACK_IMPORTED_MODULE_5__.w7)(props,(element=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_chunks_SOKV3TSX_js__WEBPACK_IMPORTED_MODULE_3__.aN,{value:store,children:element})),[store]),props=(0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.IA)({role:"radiogroup"},props),props=(0,_chunks_TW35PKTK_js__WEBPACK_IMPORTED_MODULE_6__.T)((0,_chunks_3YLGPPWQ_js__WEBPACK_IMPORTED_MODULE_2__.IA)({store},props))})),RadioGroup=(0,_chunks_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__.Rf)((function RadioGroup2(props){const htmlProps=useRadioGroup(props);return(0,_chunks_HKOOKEDE_js__WEBPACK_IMPORTED_MODULE_1__.n)("div",htmlProps)}))},"./packages/components/src/radio-group/stories/index.story.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Controlled:()=>Controlled,Default:()=>Default,Disabled:()=>Disabled,default:()=>index_story});var DYHFBFEH=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/DYHFBFEH.js"),radio_group=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/radio/radio-group.js"),react=__webpack_require__("./node_modules/react/index.js"),build_module=__webpack_require__("./packages/i18n/build-module/index.js"),button_group=__webpack_require__("./packages/components/src/button-group/index.tsx");const RadioGroupContext=(0,react.createContext)({store:void 0,disabled:void 0});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnforwardedRadioGroup({label,checked,defaultChecked,disabled,onChange,children,...props},ref){const radioStore=DYHFBFEH.s({value:checked,defaultValue:defaultChecked,setValue:newValue=>{onChange?.(null!=newValue?newValue:void 0)},rtl:(0,build_module.V8)()}),contextValue=(0,react.useMemo)((()=>({store:radioStore,disabled})),[radioStore,disabled]);return(0,jsx_runtime.jsx)(RadioGroupContext.Provider,{value:contextValue,children:(0,jsx_runtime.jsx)(radio_group.z,{store:radioStore,render:(0,jsx_runtime.jsx)(button_group.A,{children}),"aria-label":label,ref,...props})})}UnforwardedRadioGroup.displayName="UnforwardedRadioGroup";const RadioGroup=(0,react.forwardRef)(UnforwardedRadioGroup);try{RadioGroup.displayName="RadioGroup",RadioGroup.__docgenInfo={description:"",displayName:"RadioGroup",props:{label:{defaultValue:null,description:"Accessible label for the radio group",name:"label",required:!0,type:{name:"string"}},checked:{defaultValue:null,description:"The `value` of the `Radio` element which should be selected.\nIndicates controlled usage of the component.",name:"checked",required:!1,type:{name:"string | number"}},defaultChecked:{defaultValue:null,description:"The value of the radio element which is initially selected.",name:"defaultChecked",required:!1,type:{name:"string | number"}},disabled:{defaultValue:null,description:"Whether the `RadioGroup` should be disabled.",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"Called when a `Radio` element has been selected.\nReceives the `value` of the selected element as an argument.",name:"onChange",required:!1,type:{name:"(value: string | number) => void"}},children:{defaultValue:null,description:"The children elements, which should be a series of `Radio` components.",name:"children",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/radio-group/index.tsx#RadioGroup"]={docgenInfo:RadioGroup.__docgenInfo,name:"RadioGroup",path:"packages/components/src/radio-group/index.tsx#RadioGroup"})}catch(__react_docgen_typescript_loader_error){}try{radiogroup.displayName="radiogroup",radiogroup.__docgenInfo={description:"",displayName:"radiogroup",props:{label:{defaultValue:null,description:"Accessible label for the radio group",name:"label",required:!0,type:{name:"string"}},checked:{defaultValue:null,description:"The `value` of the `Radio` element which should be selected.\nIndicates controlled usage of the component.",name:"checked",required:!1,type:{name:"string | number"}},defaultChecked:{defaultValue:null,description:"The value of the radio element which is initially selected.",name:"defaultChecked",required:!1,type:{name:"string | number"}},disabled:{defaultValue:null,description:"Whether the `RadioGroup` should be disabled.",name:"disabled",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"Called when a `Radio` element has been selected.\nReceives the `value` of the selected element as an argument.",name:"onChange",required:!1,type:{name:"(value: string | number) => void"}},children:{defaultValue:null,description:"The children elements, which should be a series of `Radio` components.",name:"children",required:!0,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/radio-group/index.tsx#radiogroup"]={docgenInfo:radiogroup.__docgenInfo,name:"radiogroup",path:"packages/components/src/radio-group/index.tsx#radiogroup"})}catch(__react_docgen_typescript_loader_error){}var K7FXVWIT=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/K7FXVWIT.js"),_2GXGCHW6=__webpack_require__("./packages/components/node_modules/@ariakit/react-core/esm/__chunks/2GXGCHW6.js"),src_button=__webpack_require__("./packages/components/src/button/index.tsx"),deprecated_36px_size=__webpack_require__("./packages/components/src/utils/deprecated-36px-size.ts");function UnforwardedRadio({value,children,...props},ref){const{store,disabled}=(0,react.useContext)(RadioGroupContext),selectedValue=(0,_2GXGCHW6.O$)(store,"value"),isChecked=void 0!==selectedValue&&selectedValue===value;return(0,deprecated_36px_size.M)({componentName:"Radio",size:void 0,__next40pxDefaultSize:props.__next40pxDefaultSize}),(0,jsx_runtime.jsx)(K7FXVWIT.s,{disabled,store,ref,value,render:(0,jsx_runtime.jsx)(src_button.Ay,{variant:isChecked?"primary":"secondary",...props}),children:children||value})}UnforwardedRadio.displayName="UnforwardedRadio";const Radio=(0,react.forwardRef)(UnforwardedRadio);try{Radio.displayName="Radio",Radio.__docgenInfo={description:"",displayName:"Radio",props:{__next40pxDefaultSize:{defaultValue:{value:"false"},description:"Start opting into the larger default height that will become the\ndefault size in a future version.",name:"__next40pxDefaultSize",required:!1,type:{name:"boolean"}},value:{defaultValue:null,description:"The actual value of the radio element.",name:"value",required:!0,type:{name:"string | number"}},children:{defaultValue:null,description:"Content displayed on the Radio element. If there aren't any children, `value` is displayed.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/radio-group/radio.tsx#Radio"]={docgenInfo:Radio.__docgenInfo,name:"Radio",path:"packages/components/src/radio-group/radio.tsx#Radio"})}catch(__react_docgen_typescript_loader_error){}try{radio.displayName="radio",radio.__docgenInfo={description:"",displayName:"radio",props:{__next40pxDefaultSize:{defaultValue:{value:"false"},description:"Start opting into the larger default height that will become the\ndefault size in a future version.",name:"__next40pxDefaultSize",required:!1,type:{name:"boolean"}},value:{defaultValue:null,description:"The actual value of the radio element.",name:"value",required:!0,type:{name:"string | number"}},children:{defaultValue:null,description:"Content displayed on the Radio element. If there aren't any children, `value` is displayed.",name:"children",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/radio-group/radio.tsx#radio"]={docgenInfo:radio.__docgenInfo,name:"radio",path:"packages/components/src/radio-group/radio.tsx#radio"})}catch(__react_docgen_typescript_loader_error){}const index_story={title:"Components (Deprecated)/RadioGroup",id:"components-radiogroup",component:RadioGroup,subcomponents:{Radio},argTypes:{onChange:{control:{type:null}},children:{control:{type:null}},checked:{control:{type:"text"}}},parameters:{sourceLink:"packages/components/src/radio-group",badges:[],actions:{argTypesRegex:"^on.*"},controls:{expanded:!0},docs:{canvas:{sourceState:"shown"},description:{component:"This component is deprecated. Use `RadioControl` or `ToggleGroupControl` instead."}}}},Template=props=>(0,jsx_runtime.jsx)(RadioGroup,{...props});Template.displayName="Template";const Default=Template.bind({});Default.args={id:"default-radiogroup",label:"options",defaultChecked:"option2",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Radio,{__next40pxDefaultSize:!0,value:"option1",children:"Option 1"}),(0,jsx_runtime.jsx)(Radio,{__next40pxDefaultSize:!0,value:"option2",children:"Option 2"}),(0,jsx_runtime.jsx)(Radio,{__next40pxDefaultSize:!0,value:"option3",children:"Option 3"})]})};const Disabled=Template.bind({});Disabled.args={...Default.args,id:"disabled-radiogroup",disabled:!0};const ControlledTemplate=({checked:checkedProp,onChange:onChangeProp,...props})=>{const[checked,setChecked]=(0,react.useState)(checkedProp);return(0,jsx_runtime.jsx)(RadioGroup,{...props,onChange:value=>{setChecked(value),onChangeProp?.(value)},checked})};ControlledTemplate.displayName="ControlledTemplate";const Controlled=ControlledTemplate.bind({});Controlled.args={...Default.args,checked:"option2",id:"controlled-radiogroup"},Controlled.argTypes={checked:{control:{type:null}}},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"props => {\n  return <RadioGroup {...props} />;\n}",...Default.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"props => {\n  return <RadioGroup {...props} />;\n}",...Disabled.parameters?.docs?.source}}},Controlled.parameters={...Controlled.parameters,docs:{...Controlled.parameters?.docs,source:{originalSource:"({\n  checked: checkedProp,\n  onChange: onChangeProp,\n  ...props\n}) => {\n  const [checked, setChecked] = useState<React.ComponentProps<typeof RadioGroup>['checked']>(checkedProp);\n  const onChange: typeof onChangeProp = value => {\n    setChecked(value);\n    onChangeProp?.(value);\n  };\n  return <RadioGroup {...props} onChange={onChange} checked={checked} />;\n}",...Controlled.parameters?.docs?.source}}}}}]);