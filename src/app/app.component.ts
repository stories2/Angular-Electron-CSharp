import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'my-app';

  constructor(private electronService: ElectronService) {
  }

  ngOnInit(): void {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.on('pong', (event, args) => {
        console.log('pong received', args);
      });

      this.electronService.ipcRenderer.send('ping', {
        arg: 'This is arg'
      });
    }
  }
}
