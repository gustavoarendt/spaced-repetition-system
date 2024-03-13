import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { AuthGuard, RequestWithUser } from 'src/modules/auth/auth/auth.guard';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';

@UseGuards(AuthGuard)
@Controller('decks/:deckId/cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Param('deckId') deckId: string,
    @Body() cardDto: CreateCardDto,
  ) {
    const userId = req.user.sub;
    return await this.cardService.create(userId, deckId, cardDto);
  }

  @Delete(':cardId')
  async delete(@Req() req: RequestWithUser, @Param('cardId') cardId: string) {
    const userId = req.user.sub;
    return await this.cardService.delete(userId, cardId);
  }

  @Put(':cardId')
  async update(
    @Req() req: RequestWithUser,
    @Param('cardId') cardId: string,
    @Body() cardDto: UpdateCardDto,
  ) {
    const userId = req.user.sub;
    console.log(cardDto);
    return await this.cardService.update(userId, cardId, cardDto);
  }

  @Get()
  async getAll(@Req() req: RequestWithUser, @Param('deckId') deckId: string) {
    const userId = req.user.sub;
    return await this.cardService.getAll(userId, deckId);
  }
}
