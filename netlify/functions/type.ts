export enum MongoServerStateType {
  offline = 0,
  online = 1,
}

export interface IDEMO {
  name: string;
  url: string;
  repo: string;
  description: string;
}

export interface IDEMO_ID extends IDEMO {
  _id: string;
  _v: number;
}

export type Respond = {
  res: boolean;
  msg: string;
  data?: IDEMO_ID[];
};
