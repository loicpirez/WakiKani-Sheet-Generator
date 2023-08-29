import dotenv from 'dotenv'
import WaniKani from './wanikani'
import { type WKSubjectCollection } from '@bachmacintosh/wanikani-api-types'

async function main (): Promise<void> {
  if (process.env.WAKIKANI_API_KEY === undefined) {
    throw new Error('WaniKani API key not found')
  }

  const apiKey: string = process.env.WAKIKANI_API_KEY

  const wakinaki = new WaniKani({ apiKey })
  const subjects: WKSubjectCollection[] = await wakinaki.getSubjects()

  console.log(subjects[0])
}

dotenv.config()

main().then(() => {}).catch(err => {
  console.error(err)
  process.exit(1)
})
