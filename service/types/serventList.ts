export type ServentList = {
  id: string;
  name: string;
  tags: string;
  description: string;
  content: string;
  parent_id: string;
  game_id: string;
  cat_id: string;
  cat_name: string;
  add_time: string;
  codex_class: string;
  is_show: string;
  sort_order: string;
  click_count: string;
  comment_nums: string;
  codex_score: string;
  icon_id: string;
  icon_url: string;
  record_id: string;
};

type D = {
  pn: number;
  ps: number;
  pc: number;
  tc: string;
  data: undefined[];
  list: ServentList[];
};

export interface IGetServentListResponseType {
  s: string;
  c: number;
  m: string;
  d: D;
  u: string;
  k: number;
  v: string;
  t: string;
}

export interface IGetServentListRequestType {
  pn?: number | string;
  ps?: number | string;
  action?: string;
  wd?: string;
}
