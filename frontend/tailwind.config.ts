import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["fantasy"],
  },
  theme: {
    extend: {
      fontFamily: {
        japanese: [
          "Hiragino Kaku Gothic Pro",
          "Meiryo",
          "Source Han Sans Japanese",
          "NotoSansCJK",
          "TakaoPGothic",
          "Yu Gothic",
          "ヒラギノ角ゴ Pro W3",
          "メイリオ",
          "Osaka",
          "MS PGothic",
          "ＭＳ Ｐゴシック",
          "Noto Sans JP",
          "PingFang SC",
          "Noto Sans SC",
          "sans-serif"
        ],
      },
    }
  },
}
export default config
