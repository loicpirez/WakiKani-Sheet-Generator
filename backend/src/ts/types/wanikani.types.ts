import type WaniKaniInterface from '../interfaces/wanikani.interfaces'

type WaniKaniConstructor = new ({ apiKey }: { apiKey: string }) => WaniKaniInterface

export default WaniKaniConstructor
