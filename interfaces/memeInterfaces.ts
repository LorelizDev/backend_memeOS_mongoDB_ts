import { Document } from 'mongoose';

export interface IMeme extends Document {
    name: string;
    image: string;
    date: Date;
    author: string;
    stream: string;
    description: string;
  }
  