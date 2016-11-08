import { Component, OnInit } from '@angular/core';

import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board';

@Component({
  moduleId:       module.id,
  selector:       'app-boards-list',
  templateUrl:    'boards-list.component.html',
  styleUrls:      ['boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  boards: Board[] = [];

  constructor(private bService: BoardsService) { }

  ngOnInit() { 
    this.boards = this.bService.getBoards();
  }
}
