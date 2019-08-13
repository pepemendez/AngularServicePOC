import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { print } from 'util';


@Injectable()
export class MissionService {

    // Observable string resources
    private missionAnnouncedSource = new Subject<string>();
    private missionConfirmedSource = new Subject<string>();

    // Observable string streams
    missionAnnounced$ = this.missionAnnouncedSource.asObservable();
    missionConfirmed$ = this.missionConfirmedSource.asObservable();

    missions = ['Fly to the moon!',
              'Fly to mars!',
              'Fly to Vegas!'];

    nextMission = -1;

    // Service message commands
    announceMission() {

        console.log(this.nextMission);

        this.nextMission++;
        if (this.nextMission >= this.missions.length) { this.nextMission = 0; }

        let mission = this.missions[this.nextMission];

        this.missionAnnouncedSource.next(mission);
    }

    confirmMission(astronaut: string) {
        this.missionConfirmedSource.next(astronaut);

        this.missions.splice(this.nextMission, 1);
        
        this.announceMission()
    }
}