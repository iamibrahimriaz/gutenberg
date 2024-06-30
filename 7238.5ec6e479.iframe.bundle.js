"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[7238],{"./packages/components/src/spacer/component.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>spacer_component});var context_connect=__webpack_require__("./packages/components/src/context/context-connect.ts"),component=__webpack_require__("./packages/components/src/view/component.tsx"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),use_context_system=__webpack_require__("./packages/components/src/context/use-context-system.js"),space=__webpack_require__("./packages/components/src/utils/space.ts"),use_cx=__webpack_require__("./packages/components/src/utils/hooks/use-cx.ts"),rtl=__webpack_require__("./packages/components/src/utils/rtl.js");const isDefined=o=>null!=o;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function UnconnectedSpacer(props,forwardedRef){const spacerProps=function useSpacer(props){const{className,margin,marginBottom=2,marginLeft,marginRight,marginTop,marginX,marginY,padding,paddingBottom,paddingLeft,paddingRight,paddingTop,paddingX,paddingY,...otherProps}=(0,use_context_system.y)(props,"Spacer");return{...otherProps,className:(0,use_cx.I)()(isDefined(margin)&&(0,emotion_react_browser_esm.iv)("margin:",(0,space.D)(margin),";",""),isDefined(marginY)&&(0,emotion_react_browser_esm.iv)("margin-bottom:",(0,space.D)(marginY),";margin-top:",(0,space.D)(marginY),";",""),isDefined(marginX)&&(0,emotion_react_browser_esm.iv)("margin-left:",(0,space.D)(marginX),";margin-right:",(0,space.D)(marginX),";",""),isDefined(marginTop)&&(0,emotion_react_browser_esm.iv)("margin-top:",(0,space.D)(marginTop),";",""),isDefined(marginBottom)&&(0,emotion_react_browser_esm.iv)("margin-bottom:",(0,space.D)(marginBottom),";",""),isDefined(marginLeft)&&(0,rtl.b)({marginLeft:(0,space.D)(marginLeft)})(),isDefined(marginRight)&&(0,rtl.b)({marginRight:(0,space.D)(marginRight)})(),isDefined(padding)&&(0,emotion_react_browser_esm.iv)("padding:",(0,space.D)(padding),";",""),isDefined(paddingY)&&(0,emotion_react_browser_esm.iv)("padding-bottom:",(0,space.D)(paddingY),";padding-top:",(0,space.D)(paddingY),";",""),isDefined(paddingX)&&(0,emotion_react_browser_esm.iv)("padding-left:",(0,space.D)(paddingX),";padding-right:",(0,space.D)(paddingX),";",""),isDefined(paddingTop)&&(0,emotion_react_browser_esm.iv)("padding-top:",(0,space.D)(paddingTop),";",""),isDefined(paddingBottom)&&(0,emotion_react_browser_esm.iv)("padding-bottom:",(0,space.D)(paddingBottom),";",""),isDefined(paddingLeft)&&(0,rtl.b)({paddingLeft:(0,space.D)(paddingLeft)})(),isDefined(paddingRight)&&(0,rtl.b)({paddingRight:(0,space.D)(paddingRight)})(),className)}}(props);return(0,jsx_runtime.jsx)(component.Z,{...spacerProps,ref:forwardedRef})}UnconnectedSpacer.displayName="UnconnectedSpacer";const Spacer=(0,context_connect.Iq)(UnconnectedSpacer,"Spacer"),spacer_component=Spacer;try{Spacer.displayName="Spacer",Spacer.__docgenInfo={description:"`Spacer` is a primitive layout component that providers inner (`padding`) or outer (`margin`) space in-between components. It can also be used to adaptively provide space within an `HStack` or `VStack`.\n\n`Spacer` comes with a bunch of shorthand props to adjust `margin` and `padding`. The values of these props\ncan either be a number (which will act as a multiplier to the library's grid system base of 4px),\nor a literal CSS value string.\n\n```jsx\nimport { Spacer } from `@wordpress/components`\n\nfunction Example() {\n  return (\n    <View>\n      <Spacer>\n        <Heading>WordPress.org</Heading>\n      </Spacer>\n      <Text>\n        Code is Poetry\n      </Text>\n    </View>\n  );\n}\n```",displayName:"Spacer",props:{children:{defaultValue:null,description:"The children elements.",name:"children",required:!1,type:{name:"ReactNode"}},margin:{defaultValue:null,description:"Adjusts all margins.",name:"margin",required:!1,type:{name:"SpaceInput"}},marginBottom:{defaultValue:{value:"2"},description:"Adjusts bottom margin, potentially overriding the value from the more\ngeneric `margin` and `marginY` props.",name:"marginBottom",required:!1,type:{name:"SpaceInput"}},marginLeft:{defaultValue:null,description:"Adjusts left margin, potentially overriding the value from the more\ngeneric `margin` and `marginX` props.",name:"marginLeft",required:!1,type:{name:"SpaceInput"}},marginRight:{defaultValue:null,description:"Adjusts right margin, potentially overriding the value from the more\ngeneric `margin` and `marginX` props.",name:"marginRight",required:!1,type:{name:"SpaceInput"}},marginTop:{defaultValue:null,description:"Adjusts top margin, potentially overriding the value from the more\ngeneric `margin` and `marginY` props.",name:"marginTop",required:!1,type:{name:"SpaceInput"}},marginX:{defaultValue:null,description:"Adjusts left and right margins, potentially overriding the value from the\nmore generic `margin` prop.",name:"marginX",required:!1,type:{name:"SpaceInput"}},marginY:{defaultValue:null,description:"Adjusts top and bottom margins, potentially overriding the value from the\nmore generic `margin` prop.",name:"marginY",required:!1,type:{name:"SpaceInput"}},padding:{defaultValue:null,description:"Adjusts all padding.",name:"padding",required:!1,type:{name:"SpaceInput"}},paddingBottom:{defaultValue:null,description:"Adjusts bottom padding, potentially overriding the value from the more\ngeneric `padding` and `paddingY` props.",name:"paddingBottom",required:!1,type:{name:"SpaceInput"}},paddingLeft:{defaultValue:null,description:"Adjusts left padding, potentially overriding the value from the more\ngeneric `padding` and `paddingX` props.",name:"paddingLeft",required:!1,type:{name:"SpaceInput"}},paddingRight:{defaultValue:null,description:"Adjusts right padding, potentially overriding the value from the more\ngeneric `padding` and `paddingX` props.",name:"paddingRight",required:!1,type:{name:"SpaceInput"}},paddingTop:{defaultValue:null,description:"Adjusts top padding, potentially overriding the value from the more\ngeneric `padding` and `paddingY` props.",name:"paddingTop",required:!1,type:{name:"SpaceInput"}},paddingX:{defaultValue:null,description:"Adjusts left and right padding, potentially overriding the value from the\nmore generic `padding` prop.",name:"paddingX",required:!1,type:{name:"SpaceInput"}},paddingY:{defaultValue:null,description:"Adjusts top and bottom padding, potentially overriding the value from the\nmore generic `padding` prop.",name:"paddingY",required:!1,type:{name:"SpaceInput"}},as:{defaultValue:null,description:"The HTML element or React component to render the component as.",name:"as",required:!1,type:{name:'"symbol" | "object" | "a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "big" | "blockquote" | "body" | "br" | "button" | "canvas" | ... 516 more ... | ("view" & FunctionComponent<...>)'}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/spacer/component.tsx#Spacer"]={docgenInfo:Spacer.__docgenInfo,name:"Spacer",path:"packages/components/src/spacer/component.tsx#Spacer"})}catch(__react_docgen_typescript_loader_error){}}}]);