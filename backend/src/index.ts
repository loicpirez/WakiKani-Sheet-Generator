import dotenv from 'dotenv'
import WaniKani from './wanikani'
import { createSheet } from './sheet'
import express from 'express'
import cors from 'cors'

async function main (): Promise<void> {
  if (process.env.WAKIKANI_API_KEY === undefined) {
    throw new Error('WaniKani API key not found')
  }

  const apiKey: string = process.env.WAKIKANI_API_KEY
  const wakinaki = new WaniKani({ apiKey })

  const app = express()

  app.use(cors())

  app.get('/', (_req, res) => {
    (async () => {
      const sheet = await createSheet(wakinaki)
      res.json(sheet)
    })().catch(err => {
      console.error(err)
      res.status(500).json({ error: 'An error occurred while creating the sheet' })
    })
  })

  const apiPort = process.env.API_PORT ?? 3000

  app.listen(apiPort, () => { console.log(`Server is running on port ${apiPort}`) })
}

dotenv.config()

main().then(() => { }).catch(err => {
  console.error(err)
  process.exit(1)
})
