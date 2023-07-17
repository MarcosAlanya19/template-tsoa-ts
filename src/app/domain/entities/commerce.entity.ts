import { generateSchedule } from '@helpers/schedule.helper';
import { InferSchemaType, Model, Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schedule = generateSchedule();
const CommerceSchema = new Schema(
  {
    name: {
      type:       String,
      trim:       true,
      unique:     true,
      required:   true
    },
    type: {
      type:       String,
      trim:       true,
      required:   true
    },
    address: {
      country: {
        type:     String,
        trim:     true,
        required: true
      },
      city: {
        type:     String,
        trim:     true,
        required: true
      },
      street: {
        type:     String,
        trim:     true,
        required: true
      },
      zipCode: {
        type:     Number,
        trim:     true,
        required: true
      },
    },
    schedule: {
      type:       [String],
      default:    schedule
    },
    status: {
      type:       Boolean,
      default:    true
    }
  },
  { timestamps: true }
)

CommerceSchema.plugin(mongoosePaginate)
CommerceSchema.pre('save', function (next) {
  const offset = -360;
  const now = new Date();
  now.setMinutes(now.getMinutes() + offset);
  this.createdAt = now;
  this.updatedAt = now;
  next();
});

export type CommerceEntity = InferSchemaType<typeof CommerceSchema>
export const Commerce: Model<CommerceEntity> = model<CommerceEntity>('Commerce', CommerceSchema)
