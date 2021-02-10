export type Work = {
  company: string;
  website: URL;
  startDate: Date;
  endDate: Option<Date>;
  summary: string;
  highlights: NonEmptyArray<string>;
};

export type Project = {
  name: string;
  website: URL;
  startDate: Date;
  endDate: Option<Date>;
  summary: string;
  highlights: NonEmptyArray<string>;
};

type Changeset = {
  id: string;
  url: URL;
};

export type Contribution = {
  name: string;
  website: URL;
  summary: string;
  changesets: NonEmptyArray<Changeset>;
  highlights: NonEmptyArray<string>;
};

export type Hobby = {
  name: string;
  summary: string;
};
