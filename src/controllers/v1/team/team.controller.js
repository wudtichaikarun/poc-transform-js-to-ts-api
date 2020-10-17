import { Controller, Get } from 'routing-controllers'

@Controller('/v1/teams', { transformResponse: false })
export class TeamController {
  @Get('/')
  listTeam() {
    return {
      data: ['team1', 'team2'],
    }
  }
}
