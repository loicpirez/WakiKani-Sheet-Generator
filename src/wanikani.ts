import type WaniKaniInterface from './ts/interfaces/wanikani.interfaces'
import type WaniKaniConstructor from './ts/types/wanikani.types'
import axios, { type AxiosResponse, type AxiosInstance } from 'axios'
import type { WKLevelProgression, WKLevelProgressionCollection, WKSubjectCollection } from '@bachmacintosh/wanikani-api-types'
import LocalCache from 'node-localcache'

class WaniKani implements WaniKaniInterface {
  apiKey: string
  instance: AxiosInstance
  cache: LocalCache

  constructor ({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey
    this.instance = axios.create({
      baseURL: 'https://api.wanikani.com/v2/',
      timeout: 1000,
      headers: { Authorization: `Bearer ${apiKey}` }
    })
    this.cache = new LocalCache('./cache/wanikani-cache.json')
  }

  async fetchAllPages<T extends Record<string, any>>(
    startPageUrl: string
  ): Promise<T[]> {
    let pages: T[] = []
    let nextPageUrl: string | null = startPageUrl

    while (nextPageUrl != null) {
      const response: AxiosResponse<T> = await this.instance.get<T>(nextPageUrl)
      pages = pages.concat(response.data.data)
      nextPageUrl = response.data.pages?.next_url ?? null
    }

    return pages
  }

  async fetchCachedData<T extends Record<string, any>>(
    endpoint: string, cacheName: string, perPage: number = 500
  ): Promise<T[]> {
    const startPageUrl = `${endpoint}?per_page=${perPage}`

    let cachedData: T[] = this.cache.getItem(cacheName)

    if (cachedData === null || cachedData === undefined) {
      console.log(`Fetching data for [${endpoint}]...`)
      cachedData = await this.fetchAllPages(startPageUrl)
      this.cache.setItem(cacheName, cachedData)
      console.log('Data inserted into cache.')
    } else {
      console.log(`Using cached data for [${endpoint}].`)
    }
    return cachedData
  }

  async getProgressions (): Promise<WKLevelProgressionCollection> {
    const endpoint = '/level_progressions'
    const progressions = await this.instance.get(endpoint).then(res => res.data)
    return progressions
  }

  async getProgression (id: string): Promise<WKLevelProgression> {
    const endpoint = `/level_progressions/${id}`
    const progression = await this.instance.get(endpoint).then(res => res.data)
    return progression
  }

  async getSubjects (): Promise<WKSubjectCollection[]> {
    const endpoint = '/subjects'
    const subjects: WKSubjectCollection[] =
      await this.fetchCachedData<WKSubjectCollection>(endpoint, 'subjects')
    return subjects
  }
}

export default WaniKani as WaniKaniConstructor
