import { InferSchemaType, Model, Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ServiceSchema = new Schema(
  {
    commerceId: {
      type: Schema.Types.ObjectId,
      ref: 'Commerce'
    },
    name: {
      type:       String,
      trim:       true,
      require:    true
    },
    price:        Number,
    description:  String
  },
  { timestamps: true }
)

ServiceSchema.plugin(mongoosePaginate)
ServiceSchema.pre('save', function (next) {
  const offset = -360;
  const now = new Date();
  now.setMinutes(now.getMinutes() + offset);
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

type ServiceEntity = InferSchemaType<typeof ServiceSchema>
export const Service: Model<ServiceEntity> = model<ServiceEntity>('Service', ServiceSchema)
