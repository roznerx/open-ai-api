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
