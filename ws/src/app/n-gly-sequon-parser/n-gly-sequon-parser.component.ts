import { Component, OnInit} from '@angular/core';
import {FileHandlerService} from "../file-handler.service";

@Component({
  selector: 'app-n-gly-sequon-parser',
  templateUrl: './n-gly-sequon-parser.component.html',
  styleUrls: ['./n-gly-sequon-parser.component.css']
})
export class NGlySequonParserComponent implements OnInit {
  fileHandler;
  result: String[][];
  constructor(_fh: FileHandlerService) {
    this.fileHandler = _fh.fileHandler;
  }

  ngOnInit() {
  }


}
