import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address {}
const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  is_active: boolean;

  @Prop()
  address: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);
