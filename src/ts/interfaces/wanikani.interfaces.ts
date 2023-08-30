import { type WKAssignment, type WKSubject } from '@bachmacintosh/wanikani-api-types'
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
  getSubjects: () => Promise<WKSubject[]>
  getAssignments: () => Promise<WKAssignment[]>
}

export default WaniKaniInterface
