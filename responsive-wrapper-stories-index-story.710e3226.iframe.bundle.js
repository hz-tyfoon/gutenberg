"use strict";(self.webpackChunkgutenberg=self.webpackChunkgutenberg||[]).push([[3932],{"./packages/components/src/responsive-wrapper/stories/index.story.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithSVG:()=>WithSVG,default:()=>index_story});var clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function ResponsiveWrapper({naturalWidth,naturalHeight,children,isInline=!1}){if(1!==react.Children.count(children))return null;const TagName=isInline?"span":"div";let aspectRatio;return naturalWidth&&naturalHeight&&(aspectRatio=`${naturalWidth} / ${naturalHeight}`),(0,jsx_runtime.jsx)(TagName,{className:"components-responsive-wrapper",children:(0,jsx_runtime.jsx)("div",{children:(0,react.cloneElement)(children,{className:(0,clsx.A)("components-responsive-wrapper__content",children.props.className),style:{...children.props.style,aspectRatio}})})})}ResponsiveWrapper.displayName="ResponsiveWrapper";const responsive_wrapper=ResponsiveWrapper;try{ResponsiveWrapper.displayName="ResponsiveWrapper",ResponsiveWrapper.__docgenInfo={description:'A wrapper component that maintains its aspect ratio when resized.\n\n```jsx\nimport { ResponsiveWrapper } from \'@wordpress/components\';\n\nconst MyResponsiveWrapper = () => (\n\t<ResponsiveWrapper naturalWidth={ 2000 } naturalHeight={ 680 }>\n\t\t<img\n\t\t\tsrc="https://s.w.org/style/images/about/WordPress-logotype-standard.png"\n\t\t\talt="WordPress"\n\t\t/>\n\t</ResponsiveWrapper>\n);\n```',displayName:"ResponsiveWrapper",props:{naturalWidth:{defaultValue:null,description:"The intrinsic width of the element to wrap. Will be used to determine the aspect ratio.",name:"naturalWidth",required:!1,type:{name:"number"}},naturalHeight:{defaultValue:null,description:"The intrinsic height of the element to wrap. Will be used to determine the aspect ratio.",name:"naturalHeight",required:!1,type:{name:"number"}},children:{defaultValue:null,description:"The element to wrap.",name:"children",required:!0,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},isInline:{defaultValue:{value:"false"},description:"If true, the wrapper will be `span` instead of `div`.",name:"isInline",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/responsive-wrapper/index.tsx#ResponsiveWrapper"]={docgenInfo:ResponsiveWrapper.__docgenInfo,name:"ResponsiveWrapper",path:"packages/components/src/responsive-wrapper/index.tsx#ResponsiveWrapper"})}catch(__react_docgen_typescript_loader_error){}const index_story={component:responsive_wrapper,title:"Components/Layout/ResponsiveWrapper",id:"components-responsivewrapper",argTypes:{children:{control:{type:null}}},parameters:{sourceLink:"packages/components/src/responsive-wrapper",badges:[],controls:{expanded:!0},docs:{canvas:{sourceState:"shown"}}}},Template=args=>(0,jsx_runtime.jsx)(responsive_wrapper,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={naturalWidth:2e3,naturalHeight:680,children:(0,jsx_runtime.jsx)("img",{src:"https://s.w.org/style/images/about/WordPress-logotype-standard.png",alt:"WordPress"})};const WithSVG=Template.bind({});WithSVG.args={children:(0,jsx_runtime.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 280 640",preserveAspectRatio:"xMinYMin meet",width:"280px",height:"640px",children:[(0,jsx_runtime.jsx)("rect",{x:"0",y:"0",width:"280",height:"640",style:{fill:"blue"}}),(0,jsx_runtime.jsxs)("g",{children:[(0,jsx_runtime.jsx)("circle",{style:{fill:"red"},cx:"140",cy:"160",r:"60"}),(0,jsx_runtime.jsx)("circle",{style:{fill:"yellow"},cx:"140",cy:"320",r:"60"}),(0,jsx_runtime.jsx)("circle",{style:{fill:"#40CC40"},cx:"140",cy:"480",r:"60"})]})]})},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <ResponsiveWrapper {...args} />",...Default.parameters?.docs?.source}}},WithSVG.parameters={...WithSVG.parameters,docs:{...WithSVG.parameters?.docs,source:{originalSource:"args => <ResponsiveWrapper {...args} />",...WithSVG.parameters?.docs?.source},description:{story:"When passing an `SVG` element as the `<ResponsiveWrapper />`'s child, make\nsure that it has the `viewbox` and the `preserveAspectRatio` set.\n\nWhen dealing with SVGs, it may not be possible to derive its `naturalWidth`\nand `naturalHeight` and therefore passing them as propertied to\n`<ResponsiveWrapper />`. In this case, the SVG simply keeps scaling up to fill\nits container, unless the `height` and `width` attributes are specified.",...WithSVG.parameters?.docs?.description}}};try{WithSVG.displayName="WithSVG",WithSVG.__docgenInfo={description:"When passing an `SVG` element as the `<ResponsiveWrapper />`'s child, make\nsure that it has the `viewbox` and the `preserveAspectRatio` set.\n\nWhen dealing with SVGs, it may not be possible to derive its `naturalWidth`\nand `naturalHeight` and therefore passing them as propertied to\n`<ResponsiveWrapper />`. In this case, the SVG simply keeps scaling up to fill\nits container, unless the `height` and `width` attributes are specified.",displayName:"WithSVG",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/responsive-wrapper/stories/index.story.tsx#WithSVG"]={docgenInfo:WithSVG.__docgenInfo,name:"WithSVG",path:"packages/components/src/responsive-wrapper/stories/index.story.tsx#WithSVG"})}catch(__react_docgen_typescript_loader_error){}}}]);