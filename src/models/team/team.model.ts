import { SchemaDefinition, Schema } from 'mongoose'
import RepositoryBuilder from 'sendit-mongoose-repository'

export interface ITeam {
  name: string
  description: string
  staffIds: string[]
}

export const schemaDefinition: SchemaDefinition = {
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  staffIds: {
    type: [String],
  },
}

export const { Repository, Model } = RepositoryBuilder('team', schemaDefinition)
