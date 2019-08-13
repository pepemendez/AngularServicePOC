import {Component, OnInit} from '@angular/core';
import { MissionService } from './mission.service';

@Component({
  selector: 'angular-mission-control',
    templateUrl: './angular-mission-control.component.html',
    providers: [MissionService]
})

export class AngularMissionControlComponent {
  astronauts = ['Lovell', 'Swigert', 'Haise'];
  history: string[] = [];
  astronautsEmpty = false;

  constructor(private missionService: MissionService) {
    missionService.missionConfirmed$.subscribe(
      astronaut => {
          this.history.push(`${astronaut} confirmed the mission`);

          let index = this.astronauts.findIndex($0 => $0 == astronaut);
          this.astronauts.splice(index, 1);
          if (this.astronauts.length <= 0) { this.astronautsEmpty = true };
        });

    missionService.missionAnnounced$.subscribe(
      mission => {
        mission = mission

        if (mission != null) {
            this.history.push(`Mission "${mission}" announced`);
        }
        else {
            this.history.push('<no mission announced>');
        }
      });
  }

  announce() {
    this.missionService.announceMission();
  }
}