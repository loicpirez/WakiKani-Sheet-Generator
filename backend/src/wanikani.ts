import type WaniKaniInterface from './ts/interfaces/wanikani.interfaces'
import type WaniKaniConstructor from './ts/types/wanikani.types'
import axios, { type AxiosResponse, type AxiosInstance } from 'axios'
import type { WKAssignment, WKSubject } from '@bachmacintosh/wanikani-api-types'
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
    endpoint: string, cacheName: string, perPage: number = 500
  ): Promise<T[]> {
    const startPageUrl = `${endpoint}?per_page=${perPage}`

    const cachedData: T[] = this.cache.getItem(cacheName)
    const cachedDataDate: string = this.cache.getItem(`${cacheName}_date`)
    const cachedDataEtag: string = this.cache.getItem(`${cacheName}_etag`)

    let pages: T[] = []
    let nextPageUrl: string | null = startPageUrl

    while (nextPageUrl != null) {
      const response: AxiosResponse<T> = await this.instance.get<T>(nextPageUrl, {
        headers: {
          'If-Modified-Since': cachedDataDate,
          'If-None-Match': cachedDataEtag
        },
        validateStatus: function (status) {
          return (status >= 200 && status < 300) || status === 304
        }

      })

      if (response.status === 200) {
        console.log('Fetching new page...')
        pages = pages.concat(response.data.data)
        nextPageUrl = response.data.pages?.next_url ?? null
        this.cache.setItem(cacheName, pages)
        this.cache.setItem(`${cacheName}_date`, response.headers['last-modified'])
        this.cache.setItem(`${cacheName}_etag`, response.headers.etag)
      } else if (response.status === 304) {
        console.log('Using cache...')
        pages = pages.concat(cachedData)
        nextPageUrl = null
      }
    }

    return pages
  }

  async getSubjects (): Promise<WKSubject[]> {
    const endpoint = '/subjects'
    const subjects: WKSubject[] =
      await this.fetchAllPages<WKSubject>(endpoint, 'subjects')
    return subjects
  }

  async getAssignments (): Promise<WKAssignment[]> {
    const endpoint = '/assignments'
    const assignments: WKAssignment[] =
      await this.fetchAllPages<WKAssignment>(endpoint, 'assignments')
    return assignments
  }
}

export default WaniKani as WaniKaniConstructor
