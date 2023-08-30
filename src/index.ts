import dotenv from 'dotenv'
import WaniKani from './wanikani'
import { createSheet } from './sheet'

async function main (): Promise<void> {
  if (process.env.WAKIKANI_API_KEY === undefined) {
    throw new Error('WaniKani API key not found')
  }

  const apiKey: string = process.env.WAKIKANI_API_KEY
  const wakinaki = new WaniKani({ apiKey })

  const sheet = await createSheet(wakinaki)

  console.log(sheet)
}

dotenv.config()

main().then(() => {}).catch(err => {
  console.error(err)
  process.exit(1)
})
