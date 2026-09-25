import type { ReadingText } from '../models';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const demoTexts = [
  {
    id: 'grade2-demo-library-light',
    title: 'Kütüphanedeki Işık',
    grade: 2,
    difficulty: 1,
    text:
      'Kerem kütüphanede sessizce kitap seçti. Sayfayı açtığında küçük bir ışık gördü. Işık ona okumaya devam etmesini hatırlattı.',
    estimatedDurationSeconds: 70,
    tags: ['demo', 'daily-practice', 'metronome'],
  },
  {
    id: 'grade2-demo-garden-rain',
    title: 'Bahçedeki Yağmur',
    grade: 2,
    difficulty: 1,
    text:
      'Elif bahçede yağmur sesini dinledi. Toprak güzel kokuyordu. Yağmur bitince çiçeklerin daha parlak göründüğünü fark etti.',
    estimatedDurationSeconds: 70,
    tags: ['demo', 'nature', 'metronome'],
  },
  {
    id: 'grade2-demo-lost-pencil',
    title: 'Kayıp Kalem',
    grade: 2,
    difficulty: 2,
    text:
      'Mert mavi kalemini sırada bulamadı. Önce çantasına baktı, sonra defterinin arasını açtı. Kalemi oradaydı ve Mert gülümsedi.',
    estimatedDurationSeconds: 80,
    tags: ['demo', 'school', 'metronome'],
  },
] as const;

// Demo content. Requires pedagogical review before pilot use.
export const grade2ReadingTexts: ReadingText[] = demoTexts.map((item) => ({
  ...item,
  difficulty: item.difficulty,
  tags: [...item.tags],
  wordCount: countWords(item.text),
}));
