import express, { Express } from 'express';
import mongoose from 'mongoose';
import { pipe, pipeWith, andThen, curry } from 'ramda';
import config from '../lib/config';
import { handleMiddlewares } from './handleMiddlewares';
import { handleRoutes } from './handleRoutes';

const buildStartApp = curry((port: number, app: Express) =>
  app.listen(port, () => console.log(`server is listening on port ${port}`))
);

export const startApp = buildStartApp(config.PORT);

export const setupApp = pipe(handleMiddlewares, handleRoutes);

const connectDB = async () => await mongoose.connect(config.MONGO_URI);

const createApp = () => Promise.resolve(express());

export const createConnection = pipeWith(andThen)([connectDB, createApp]);
