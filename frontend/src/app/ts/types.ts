type BaseElementType = {
  level: number;
  characters: string;
  meaning: Array<{
    meaning: string;
    primary: boolean;
    accepted_answer: boolean;
  }>;
  reading: Array<{
    type: string;
    primary: boolean;
    reading: string;
    accepted_answer: boolean;
  }>;
  meaning_mnemonic: string;
  reading_mnemonic: string;
  srs_stage: number;
};

type VocabularyElementType = BaseElementType & {
  composition: Array<string>;
  partsOfSpeech: Array<string>;
}

type ApiResponseType = {
  kanjis: Array<BaseElementType>;
  vocabularies: Array<VocabularyElementType>;
} | null;

type ApiErrorType = {
  message: string;
} | null;

type DataContextType = {
  data: ApiResponseType;
  error: ApiErrorType;
  loading: boolean;
  fetchData(): Promise<void>;
}
