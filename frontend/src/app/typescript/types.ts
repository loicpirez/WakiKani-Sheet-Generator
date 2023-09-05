type MeaningType = {
    meaning: string;
    primary: boolean;
    accepted_answer: boolean;
};

type ReadingType = {
  type: string;
  primary: boolean;
  reading: string;
  accepted_answer: boolean;
}

type BaseElementType = {
  level: number;
  characters: string;
  meaning: MeaningType[];
  reading: ReadingType[];
  meaning_mnemonic: string;
  reading_mnemonic: string;
  srs_stage: number;
};

type VocabularyElementType = BaseElementType & {
  composition: Array<string>;
  partsOfSpeech: Array<string>;
}

type RadicalsElementType = BaseElementType & {
  character_is_url: boolean;
}

type ApiResponseType = {
  kanjis: Array<BaseElementType>;
  vocabularies: Array<VocabularyElementType>;
  radicals: Array<RadicalsElementType>;
} | null;


interface DataElementType {
  kanjis?: BaseElementType[];
  vocabularies?: VocabularyElementType[];
  radicals?: RadicalsElementType[];
}

type TypeElementType = 'kanji' | 'vocabulary' | 'radical';


type ApiErrorType = {
  message: string;
} | null;

type DataContextType = {
  data: ApiResponseType;
  error: ApiErrorType;
  loading: boolean;
  fetchData(): Promise<void>;
}
