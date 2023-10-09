import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { IPaginationOptions } from 'src/shared/types/pagination-options';
import { make } from 'src/shared/utils/hash';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<User[]> {
    return await this.userModel
      .find()
      .where({ is_active: true })
      .limit(paginationOptions.limit)
      .skip((paginationOptions.page - 1) * paginationOptions.limit);
  }

  async updateUser(id: string, data: User) {
    return await this.userModel.findByIdAndUpdate(id, data);
  }

  async updateAddress(id: string, data: any) {
    const user = await this.userModel.findById(id);
    const address = user.address;
    if (data.address.hasOwnProperty('_id')) {
      const updatedData = address.map((item: any) => {
        if (item._id === data.address._id) {
          return data.address;
        } else {
          return item;
        }
      });
      user.address = updatedData;
    } else {
      Object.assign(data, { _id: uuid() });
      user.address = [...user.address, data];
    }

    return user.save();
  }

  async create(data: User): Promise<User> {
    data.password = make(data.password);
    const newUser = await this.userModel.create(data);
    return newUser;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }
}
