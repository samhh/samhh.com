export type Work = {
  company: string
  website: URL
  startDate: Date
  endDate: Option<Date>
  highlights: NonEmptyArray<string>
}

export type Project = {
  name: string
  website: URL
  startDate: Date
  endDate: Option<Date>
  summary: string
  highlights: NonEmptyArray<string>
}
