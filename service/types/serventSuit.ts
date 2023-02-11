export type ServentSuitDetailData = {
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
  equipid: string;
  equipid_i: string;
  name_jp: string;
  name_jp_i: string;
  wherefrom: string;
  wherefrom_i: string;
  avatar: string;
  avatar_i: string;
  pic1: string;
  pic1_i: string;
  pic2: string;
  pic2_i: string;
  star: string;
  star_i: string;
  lv1_hp: string;
  lv1_hp_i: string;
  lvmax_hp: string;
  lvmax_hp_i: string;
  lv1_atk: string;
  lv1_atk_i: string;
  lvmax_atk: string;
  lvmax_atk_i: string;
  cost: string;
  cost_i: string;
  illust: string;
  illust_i: string;
  intro: string;
  intro_i: string;
  skill_p1: string;
  skill_p1_i: string;
  skill_n1: string;
  skill_n1_i: string;
  skill_e1: string;
  skill_e1_i: string;
  skill_q2: string;
  skill_p2: string;
  skill_n2: string;
  skill_e2: string;
  skill_q3: string;
  skill_p3: string;
  skill_n3: string;
  skill_e3: string;
  name_bili: string;
};

type D = {
  pn: string;
  ps: string;
  pc: string;
  tc: string;
  data: Data;
  list: undefined[];
};

export interface IGetServentSuitResponseType {
  s: string;
  c: number;
  m: string;
  d: D;
  u: string;
  k: number;
  v: string;
  t: string;
}

export interface IGetServentSuitRequestType {
  val: string;
}
