import { Body, Controller, Get, Post, Put } from 'routing-controllers'
import { OdmTeam } from '../../../domains/team/team'
import { ICreateTeam } from '../../../repository/team/team'

@Controller('/v1/teams', { transformResponse: false })
export class TeamController {
  constructor(private odmTeam: OdmTeam) {}

  @Get('/')
  findAll() {
    return this.odmTeam.findAll()
  }

  @Post('/')
  create(@Body() team: ICreateTeam) {
    return this.odmTeam.create(team)
  }

  @Put('/')
  addStaffs(@Body() body: { mongoTeamId: string; staffIds: string[] }) {
    return this.odmTeam.addStaffs(body.mongoTeamId, body.staffIds)
  }
}
