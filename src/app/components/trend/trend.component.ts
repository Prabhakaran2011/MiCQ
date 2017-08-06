import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServiceService } from '../../shared/service/service.service';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.css'],
  providers: [ServiceService]
})
export class TrendComponent implements OnInit {

  maxnumbervideos:number = 15;
  private apikey:string = "AIzaSyClYrtbjAV4VrIJ20O-Hd_0Kzpo4IYqxhs";
  userId:string = '';
  channelDetails = {    
  };
  videoLists = [];

  constructor(private _http: ServiceService) { }

  videoList(lists) {
    let videoList = lists.items;
    videoList.forEach(videos => {
      let videoid = videos.id;
      var videoDetailUrl = "https://content.googleapis.com/youtube/v3/videos?part=snippet&id="+videoid+"&key=" + this.apikey;

      this._http.getData(videoDetailUrl).subscribe(detail => {
        let videotitle = detail.items[0].snippet.title;
        let videodescription = detail.items[0].snippet.description;
        let videodate = detail.items[0].snippet.publishedAt.split('T')[0]; // date time published
        let videothumbnail = detail.items[0].snippet.thumbnails.high.url; // default, medium or high);
        let publishedBy = detail.items[0].snippet.channelTitle;

      let videoDetail = {
        videoid : videoid,
        videotitle : videotitle,
        videodescription : videodescription,
        videodate : videodate,
        videothumbnail : videothumbnail,
        url : "https://www.youtube.com/watch?v=" + videoid,
        publishedBy:publishedBy
      }
      this.videoLists.push(videoDetail);
    });
    });
  }

  ngOnInit() {
    let channelUrl = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults="+this.maxnumbervideos+"&key="+ this.apikey;
    this._http.getData(channelUrl).subscribe(detail => this.videoList(detail));
  }

}
