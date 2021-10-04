import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  HttpException,
  UseFilters,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    throw new HttpException('api is broken', 401);
    return 'all cat';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) params) {
    console.log(params, typeof params);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'cat is created';
  }

  @Put(':id')
  updateCat() {
    return 'cat is updated';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'cat is partially updated';
  }

  @Delete(':id')
  deleteCat() {
    return 'cat is deleted';
  }
}
