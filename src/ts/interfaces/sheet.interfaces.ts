import {
  type WKLevel,
  type WKSubjectMeaning,
  type WKKanjiReading,
  type WKVocabularyReading,
  type WKSrsStageNumber
} from '@bachmacintosh/wanikani-api-types'

interface SheetBaseElement {
  level: WKLevel | undefined
  characters: string | null | undefined
  meaning: WKSubjectMeaning[] | undefined
  reading: WKKanjiReading[] | WKVocabularyReading[] | undefined
  meaning_mnemonic: string | undefined
  reading_mnemonic: string | undefined
  srs_stage: WKSrsStageNumber
}

interface SheetVocabularyElement extends SheetBaseElement {
  composition: Array<string | null | undefined> | undefined
}

interface SheetInterface {
  kanjis: SheetBaseElement[]
  vocabularies: SheetVocabularyElement[]
}

export type { SheetBaseElement, SheetVocabularyElement, SheetInterface }
