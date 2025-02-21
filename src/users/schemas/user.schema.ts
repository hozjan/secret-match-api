import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: '' })
  message: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  inEvent: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  match: User;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await hash(user.password, 8);
  next();
});

export { UserSchema };
