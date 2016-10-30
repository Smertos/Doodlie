import '../operators'
import { BaseComponent, LogService } from '../../frameworks/core/index'

@BaseComponent({
  moduleId: module.id,
  selector: 'board',
  templateUrl: 'board.component.html'
})
export class BoardComponent {
  constructor(public logger: LogService) {
    logger.debug(`Board created!`)
  }
}
