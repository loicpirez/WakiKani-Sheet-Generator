import { type WKLevelProgressionCollection, type WKLevelProgression, type WKSubjectCollection } from '@bachmacintosh/wanikani-api-types'
import { type AxiosInstance } from 'axios'
import type LocalCache from 'node-localcache'

interface WaniKaniInterface {
  apiKey: string
  instance: AxiosInstance
  cache: LocalCache
  fetchAllPages: <T extends Record<string, any>>(
    startPageUrl: string
  ) => Promise<T[]>
  fetchCachedData: <T extends Record<string, any>>(
    endpoint: string, cacheName: string, perPage: number
  ) => Promise<T[]>
  getProgressions: () => Promise<WKLevelProgressionCollection>
  getProgression: (id: string) => Promise<WKLevelProgression>
  getSubjects: () => Promise<WKSubjectCollection[]>
}

export default WaniKaniInterface
