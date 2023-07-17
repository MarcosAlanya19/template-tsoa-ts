import { InferSchemaType, Model, Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const SuperAdminSchema = new Schema(
  {
    firstName:      String,
    secondName:     String,
    firstLastname:  String,
    secondLastname: String,
    username:       String,
    email:          String,
    password:       String,
    avatar:         String,
    token: {
      type:         String,
      default:      null
    },
    status: {
      type:         Boolean,
      default:      true
    },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'SUPPORT'],
      default: 'SUPER_ADMIN'
    }
  },
  { timestamps: true }
)

SuperAdminSchema.plugin(mongoosePaginate)
SuperAdminSchema.pre('save', function (next) {
  const offset = -360;
  const now = new Date();
  now.setMinutes(now.getMinutes() + offset);
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

type SuperAdminEntity = InferSchemaType<typeof SuperAdminSchema>
export const SuperAdmin: Model<SuperAdminEntity> = model<SuperAdminEntity>('SuperAdmin', SuperAdminSchema)
