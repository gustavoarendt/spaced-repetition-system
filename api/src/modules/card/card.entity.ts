import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeckEntity } from 'src/modules/decks/deck.entity';
import { DifficultyLevel } from './enum/difficultyLevel.enum';

@Entity('cards')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 512, nullable: false, name: 'front_text' })
  frontText: string;

  @Column({ type: 'varchar', length: 512, nullable: false, name: 'back_text' })
  backText: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    default: DifficultyLevel.NEW,
    name: 'dificulty_level',
  })
  difficultyLevel: DifficultyLevel;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'next_review_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  nextReviewDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => DeckEntity, (deck) => deck.cards)
  deck: DeckEntity;
}
