import { Service } from 'typedi'
import { ICreateTeam, TeamRepository } from '../../repository/team/team'

@Service()
export class OdmTeam {
  constructor(protected repo: TeamRepository) {}

  create({ name, projectId }: ICreateTeam) {
    return this.repo.crate({ name, projectId })
  }

  private async allowToAddStaffToTeam(mongoTeamId: string, staffIds: string[]) {
    const team = await this.repo.findByTeamId(mongoTeamId)

    // check staff is exists
    for (const staffId of staffIds) {
      if (team.staffIds.includes(staffId)) {
        throw new Error(`staff ${staffId} already exists in Team`)
      }
    }

    // one staff can add to many team
  }

  async addStaffs(mongoTeamId: string, staffIds: string[]) {
    await this.allowToAddStaffToTeam(mongoTeamId, staffIds)
    return this.repo.addStaffsToTeam(mongoTeamId, staffIds)
  }

  findAll() {
    return this.repo.findAll()
  }
}

@Service()
export class WfmTeam {
  constructor(protected repo: TeamRepository) {}

  create({ name, projectId }: ICreateTeam) {
    return this.repo.crate({ name, projectId })
  }

  private allowToAddStaffToTeam() {
    /**
     * validation
     *  - check staff is exists
     *  - one staff can add to one team
     */
  }

  addStaffs(mongoTeamId: string, staffIds: string[]) {
    this.allowToAddStaffToTeam()
    return this.repo.addStaffsToTeam(mongoTeamId, staffIds)
  }

  findAll() {
    return this.repo.findAll()
  }
}
