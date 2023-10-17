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

export const AI_MOOD = {
  engineer:
    "You are a robust and cleaver programming software assistant specializing in Javascript and Typescript. But your knowledge extends to a wide variety of programming skills. Follow user instructions to the letter.",
  recomendation:
    "You are an specialized recommendation algorithm, who gives code snippets to the user.",
}

export const PREMIUM_SUBSCRIPTION_AMOUNT = 6

export const promptResponseTimeout = 6000

export const CREDITS_MODAL_COPY = {
  title: "Get mode credits",
  description:
    "Level up your experience! Add more credits for non-stop access to our awesome features and services. Don't miss out on incredible opportunities!",
  callToAction: "Get Credits",
}

export const PRICE_IDS = {
  50: "price_1N36XLKrxiA7kR6c7vLV9wgJ",
  100: "price_1N9L7vKrxiA7kR6cauPCI281",
  150: "price_1N9L93KrxiA7kR6cJvbFzuBX",
}
export const SUBSCRIPTION_PRICES = {
  testing: {
    premiumMonthly: "price_1NV12EKrxiA7kR6cSNKwhn1f",
    premiumAnual: "price_1NzAMYKrxiA7kR6cn0uB5Twc",
  },
  production: {
    premiumMonthly: "price_1NV12OKrxiA7kR6cq7azciIz",
    premiumAnual: "price_1Nz9WHKrxiA7kR6c1KnFBVrv",
  },
}
export const TESTING_PRICE_IDS = {
  50: "price_1N33VNKrxiA7kR6cPePbRpyr",
  100: "price_1N36C1KrxiA7kR6cykNsuT7L",
  150: "price_1N36YjKrxiA7kR6c2bJpd1NN",
}

export const getPriceIds = () => {
  const isLocalHost =
    typeof window !== "undefined" && window.location.hostname === "localhost"

  return isLocalHost ? TESTING_PRICE_IDS : PRICE_IDS
}

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

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://code-genius.dev"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000"

export const APP_HOSTNAMES = new Set([
  "code-genius.dev",
  "localhost:3000",
  "localhost",
])
