import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DeckService } from './deck.service';
import { AuthGuard, RequestWithUser } from '../auth/auth/auth.guard';
import { CreateDeckDto } from './dto/CreateDeck.dto';

@UseGuards(AuthGuard)
@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async createDeck(
    @Req() req: RequestWithUser,
    @Body() deckDto: CreateDeckDto,
  ) {
    deckDto.userId = req.user.sub;
    await this.deckService.createDeck(deckDto);
  }

  @Get()
  async getDecks(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    return await this.deckService.listDecks(userId);
  }

  @Delete('/:id')
  async deleteDeck(@Req() req: RequestWithUser, @Param('id') id: string) {
    const userId = req.user.sub;
    await this.deckService.deleteDeck(id, userId);
  }
}
