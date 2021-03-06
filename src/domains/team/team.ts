import { Service } from 'typedi'
import { ITeam } from '../../models/team/team.model'
import { ICreateTeam, TeamRepository } from '../../repository/team/team'

@Service()
export class OdmTeam {
  constructor(protected repo: TeamRepository) {}
  // *** create team
  private validateCreate() {
    /**
     * implement logic validation
     */
  }

  create({ name, projectId }: ICreateTeam) {
    this.validateCreate()
    return this.repo.crate({ name, projectId })
  }

  // *** add staffs to team
  private async validateAddStaffs(mongoTeamId: string, staffIds: string[]) {
    const team = await this.repo.findByTeamId(mongoTeamId)

    // check staff is exists
    for (const staffId of staffIds) {
      if (team.staffIds.includes(staffId)) {
        throw new Error(`staff ${staffId} already exists in Team`)
      }
    }

    // one staff can add to many team
  }

  async addStaffs(mongoTeamId: string, staffIds: string[]): Promise<ITeam> {
    await this.validateAddStaffs(mongoTeamId, staffIds)
    return this.repo.addStaffsToTeam(mongoTeamId, staffIds)
  }

  // *** find team
  findAll(): Promise<ITeam[]> {
    return this.repo.findAll()
  }
}

@Service()
export class WfmTeam {
  constructor(protected repo: TeamRepository) {}
  // *** create team
  private validateCreate() {
    /**
     * implement logic validation
     */
  }

  create({ name, projectId }: ICreateTeam): Promise<ITeam> {
    this.validateCreate()
    return this.repo.crate({ name, projectId })
  }

  // *** add staffs to team
  private validateAddStaffs() {
    /**
     * validation
     *  - check staff is exists
     *  - one staff can add to one team
     */
  }

  addStaffs(mongoTeamId: string, staffIds: string[]): Promise<ITeam> {
    this.validateAddStaffs()
    return this.repo.addStaffsToTeam(mongoTeamId, staffIds)
  }

  // *** find team
  findAll(): Promise<ITeam[]> {
    return this.repo.findAll()
  }
}
