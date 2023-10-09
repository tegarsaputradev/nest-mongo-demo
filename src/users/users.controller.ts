import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/user.schema';
import { ApiQuery } from '@nestjs/swagger';
import { InfinityPaginationResultType } from 'src/shared/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/shared/utils/infinity-pagination';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'page', required: true, example: 1 })
  @ApiQuery({ name: 'limit', required: true, example: 10 })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<InfinityPaginationResultType<User>> {
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.userService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() payload: User) {
    return await this.userService.create(payload);
  }

  @Put('/address/:id')
  @HttpCode(HttpStatus.OK)
  async updateAddressUser(@Param('id') id: string, @Body() payload: {}) {
    return await this.userService.updateAddress(id, payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Param('id') id: string, @Body() payload: User) {
    return await this.userService.updateUser(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
