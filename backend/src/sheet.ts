import { type WKAssignment, type WKSubject } from '@bachmacintosh/wanikani-api-types'
import { type SheetInterface, type SheetBaseElement, type SheetVocabularyElement, type SheetRadicalElement } from './ts/interfaces/sheet.interfaces'
import type WaniKaniInterface from './ts/interfaces/wanikani.interfaces'

const createObject = (assignment: WKAssignment, subjectById: WKSubject | undefined): SheetBaseElement => ({
  level: subjectById?.data.level,
  characters: subjectById?.data.characters,
  meaning: subjectById?.data.meanings,
  reading: subjectById?.data?.readings,
  meaning_mnemonic: subjectById?.data.meaning_mnemonic,
  reading_mnemonic: subjectById?.data.reading_mnemonic,
  srs_stage: assignment.data.srs_stage
})

const createSheet = async (wakinaki: WaniKaniInterface): Promise<SheetInterface> => {
  const subjects = await wakinaki.getSubjects()
  const assignments = await wakinaki.getAssignments()
  const subjectsMap = new Map(subjects.map(subject => [subject.id, subject]))
  const kanjis: SheetBaseElement[] = []
  const vocabularies: SheetVocabularyElement[] = []
  const radicals: SheetRadicalElement[] = []

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
        composition,
        partsOfSpeech: subjectById?.data.parts_of_speech
      })
    } else if (assignment.data.subject_type === 'radical') {
      const radicalObject = createObject(assignment, subjectById)
      const characterIsUrl = subjectById?.data?.characters === null

      if (characterIsUrl) {
        const url = subjectById?.data?.character_images?.find((item) => item.content_type === 'image/png')?.url

        radicalObject.characters = subjectById?.data?.characters ?? url
      }

      radicals.push({
        ...radicalObject,
        character_is_url: characterIsUrl
      })
    }
  })

  return {
    kanjis,
    vocabularies,
    radicals
  }
}

export {
  createSheet
}
