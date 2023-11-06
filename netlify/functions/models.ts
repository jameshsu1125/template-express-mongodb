import mongoose from 'mongoose';
import { useSchema } from './schema';
import { Demo } from './type';
import { log } from 'console';

const { COLLECTION = 'test' } = process.env;

const table =
  mongoose.models[COLLECTION] ||
  mongoose.model<Demo>(COLLECTION, new mongoose.Schema<Demo>(useSchema));

log(table);
export { table };
