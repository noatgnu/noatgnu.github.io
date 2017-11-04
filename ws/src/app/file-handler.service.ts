import { Injectable } from '@angular/core';

@Injectable()
export class FileHandlerService {

  constructor() { }

  fileHandler(e): String[][] {
    const file = e.target.files[0];
    let reader = new FileReader();
    let result: String[][] = [];
    reader.onload = (event) => {
      const file = reader.result;
      const lines = file.split(/\r\n|\n/);
      lines.map((line)=>{
        result.push(line.split(/\t/));
      });

    };
    reader.readAsText(file);
    console.log(result);
    return result;
  }
}
