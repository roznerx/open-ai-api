export const OPEN_API = {
  MODELS: {
    DAVINCI: "text-davinci-003",
    EDIT_CODE: "code-davinci-edit-001",
  },
  TEMPERATURE: {
    DETERMINISTIC: 0.1,
    OPTIMAL: 0.2,
    DEFAULT: 0.7,
  },
  MAX_TOKENS: {
    DEFAULT: 2048,
    INCREASED: 4096,
  },
  STREAM: {
    ENABLED: true,
    DISABLED: false,
  },
}

export const ASSISTANT = {
  software:
    "You are an experienced software engineer. Don't use ``` followed by the programming language, before outputting code.",
  recomendation:
    "You are an specialized recommendation algorithm, who gives code snippets to the user.",
}

export const PREMIUM_SUBSCRIPTION_AMOUNT = 6

export const promptResponseTimeout = 6000

export const LSConfig = {
  user: {
    userId: "userId",
  },
  colorMode: "colorMode",
}

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
}

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
}

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
}

// export codeTheme = { additionColor: "#f1fa8c", attributeColor:
// "#50fa7b",
// backgroundColor
// :
// "#282a36"
// builtInColor
// :
// "#50fa7b"
// bulletColor
// :
// "#8BE9FD"
// codeColor
// :
// "#50FA7B"
// commentColor
// :
// "#6272A4"
// deletionColor
// :
// "#FF79C6"
// docTagColor
// :
// "#f1fa8c"
// functionColor
// :
// "#50FA7B"
// keywordColor
// :
// "#ff79c6"
// lineNumberBgColor
// :
// "#282a36"
// lineNumberColor
// :
// "#6272a4"
// linkColor
// :
// "#00bcd4"
// literalColor
// :
// "#FF79C6"
// metaColor
// :
// "#50FA7B"
// metaKeywordColor
// :
// "#50FA7B"
// nameColor
// :
// "#66d9ef"
// numberColor
// :
// "#bd93f9"
// quoteColor
// :
// "#E9F284"
// regexpColor
// :
// "#F1FA8C"
// sectionColor
// :
// "#F8F8F2"
// selectorAttributeColor
// :
// "#FF79C6"
// selectorClassColor
// :
// "#50FA7B"
// selectorIdColor
// :
// "#50FA7B"
// selectorPseudoColor
// :
// "#FF79C6"
// selectorTagColor
// :
// "#8be9fd"
// stringColor
// :
// "#F1FA8C"
// substringColor
// :
// "#f1fa8c"
// symbolColor
// :
// "#F1FA8C"
// templateTagColor
// :
// "#FF79C6"
// templateVariableColor
// :
// "#FF79C6"
// textColor
// :
// "#f8f8f2"
// titleColor
// :
// "#ff555580"
// typeColor
// :
// "#8BE9FD"
// variableColor
// :
// "#F8F8F2"
// }
