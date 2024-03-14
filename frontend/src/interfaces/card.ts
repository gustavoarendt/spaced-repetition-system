export interface Card {
  id: string;
  frontText: string;
  backText: string;
  difficultyLevel: string;
  nextReviewDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
