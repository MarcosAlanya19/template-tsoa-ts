import { InferSchemaType, Model, Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new Schema(
  {
    commerceId: {
      type: Schema.Types.ObjectId,
      ref: 'Commerce',
      required:     true,
    },
    services: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
      }],
      default: [],
    },
    firstName: {
      type:         String,
      trim:         true,
      required:     true
    },
    secondName: {
      type:         String,
      trim:         true,
      required:     true
    },
    firstLastname: {
      type:         String,
      trim:         true,
      required:     true
    },
    secondLastname: {
      type:         String,
      trim:         true,
      required:     true
    },
    username:{
      type:         String,
      trim:         true,
      required:     true
    },
    email: {
      type:         String,
      trim:         true,
      unique:       true,
      lowercase:    true,
      required:     true,
    },
    password: {
      type:         String,
      trim:         true,
      required:     true,
    },
    avatar: {
      url: {
        type:       String,
        trim:       true,
        default:    null
      },
      publicId:{
        type:       String,
        trim:       true,
        default:    null
      },
    },
    token: {
      type:         String,
      default:      null
    },
    cellphone:{
      type:         Number,
      trim:         true,
      required:     true
    },
    status: {
      type:         Boolean,
      default:      true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'COLLABORATOR', 'CUSTOMER'],
      default: 'CUSTOMER'
    }
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);
UserSchema.pre('save', function (next) {
  const offset = -360;
  const now = new Date();
  now.setMinutes(now.getMinutes() + offset);
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

export type UserEntity = InferSchemaType<typeof UserSchema>
export const User: Model<UserEntity> = model<UserEntity>('User', UserSchema);
