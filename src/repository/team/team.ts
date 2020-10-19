import { Service } from 'typedi'
import { Repository, ITeam } from '../../models/team/team.model'

export interface ICreateTeam {
  name: string
  projectId: string
}

@Service()
export class TeamRepository {
  findAll(): Promise<ITeam[]> {
    return Repository.find()
  }

  findByTeamId(mongoTeamId: string): Promise<ITeam> {
    return Repository.findOne({ _id: mongoTeamId }, {})
  }

  crate({ name, projectId }: ICreateTeam): Promise<ITeam> {
    return Repository.create({ name, projectId })
  }

  addStaffsToTeam(mongoTeamId: string, staffIds: string[]) {
    return Repository.update(
      {
        _id: mongoTeamId,
      },
      {
        $push: {
          staffIds,
        },
      },
    )
  }
}
