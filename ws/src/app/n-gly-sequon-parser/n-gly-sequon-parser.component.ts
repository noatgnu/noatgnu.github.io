import { Component, OnInit, ViewChild} from '@angular/core';
import {FileHandlerService} from "../file-handler.service";
import {NgForm} from "@angular/forms";
import {DataStore} from "../data-row";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-n-gly-sequon-parser',
  templateUrl: './n-gly-sequon-parser.component.html',
  styleUrls: ['./n-gly-sequon-parser.component.css']
})
export class NGlySequonParserComponent implements OnInit {
  fileHandler;
  result: DataStore;
  model = {columnName: "Sequence", ignoreMod: true};
  loadHeader = true;
  started = false;
  processing = false;
  finished = false;
  fileSize: number;
  downloadLink: SafeUrl;
  sanitize;

  @ViewChild("resultElem") resultElem;
  constructor(_fh: FileHandlerService, private sanitization: DomSanitizer) {
    this.fileHandler = _fh.fileHandler;
  }

  ngOnInit() {
  }

  async processFile(e){
    this.result = await this.fileHandler(e, this.loadHeader);
    this.fileSize = this.result.data.length;
  }

  onSubmit(f: NgForm) {
    console.log(this.result);
    if (f.valid && this.result) {
      this.started = true;
      this.processing = true;
      this.result.header.forEach((item, index) => {
        if (item == f.value.columnName) {
          this.result.seqColumn = index;
        }
      });
      console.log(this.result.seqColumn);
      this.result.filterSequon(f.value.ignoreMod);

      this.downloadLink = this.sanitization.bypassSecurityTrustResourceUrl(this.result.toCSV());
      this.processing = false;
      this.finished = true;
    }

    console.log(f.value);
    console.log(f.valid);


  }

}
