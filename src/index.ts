import dotenv from 'dotenv'
import WaniKani from './wanikani'
import { type WKAssignment, type WKSubject } from '@bachmacintosh/wanikani-api-types'
import { type SheetBaseElement, type SheetVocabularyElement } from './ts/interfaces/sheet.interfaces'

const createObject = (assignment: WKAssignment, subjectById: WKSubject | undefined): SheetBaseElement => ({
  level: subjectById?.data.level,
  characters: subjectById?.data.characters,
  meaning: subjectById?.data.meanings,
  reading: subjectById?.data?.readings,
  meaning_mnemonic: subjectById?.data.meaning_mnemonic,
  reading_mnemonic: subjectById?.data.reading_mnemonic,
  srs_stage: assignment.data.srs_stage
})

async function main (): Promise<void> {
  if (process.env.WAKIKANI_API_KEY === undefined) {
    throw new Error('WaniKani API key not found')
  }

  const apiKey: string = process.env.WAKIKANI_API_KEY
  const wakinaki = new WaniKani({ apiKey })
  const subjects = await wakinaki.getSubjects()
  const assignments = await wakinaki.getAssignments()
  const subjectsMap = new Map(subjects.map(subject => [subject.id, subject]))
  const kanjis: SheetBaseElement[] = []
  const vocabularies: SheetVocabularyElement[] = []

  assignments.forEach(assignment => {
    const subjectById: WKSubject | undefined = subjectsMap.get(assignment.data.subject_id)

    if (assignment.data.subject_type === 'kanji') {
      const kanjiObject = createObject(assignment, subjectById)
      kanjis.push(kanjiObject)
    } else if (assignment.data.subject_type === 'vocabulary') {
      const vocabularyObject = createObject(assignment, subjectById)
      const composition = subjectById?.data.component_subject_ids?.map(componentSubjectId => {
        return subjectsMap.get(componentSubjectId)?.data.characters
      })

      vocabularies.push({
        ...vocabularyObject,
        composition
      })
    }
  })

  console.log({ kanjis, vocabularies })
}

dotenv.config()

main().then(() => {}).catch(err => {
  console.error(err)
  process.exit(1)
})
