import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServiceService } from '../../shared/service/service.service';

@Component({
  selector: 'app-channeldetail',
  templateUrl: './channeldetail.component.html',
  styleUrls: ['./channeldetail.component.css'],
  providers: [ServiceService]
})
export class ChanneldetailComponent implements OnInit {

  maxnumbervideos:number = 25;
  private apikey:string = "AIzaSyClYrtbjAV4VrIJ20O-Hd_0Kzpo4IYqxhs";
  userId:string = '';
  channelDetails = {    
  };
  videoLists = [];

  constructor(private _http: ServiceService, private router:Router) {
    let url = this.router.url;
    this.userId = url.split('/')[3];
  }
  
  channelDetail(channelDetail) {
            //channel details
            let userid = channelDetail.items[0].id;
            let channeltitle = channelDetail.items[0].snippet.title;
            let channeldescription = channelDetail.items[0].snippet.description;
            let channelart = channelDetail.items[0].brandingSettings.image.bannerImageUrl;
            let channelthumbnail = channelDetail.items[0].snippet.thumbnails.default.url; // default, medium or high
            let subscribersCount = channelDetail.items[0].statistics.subscriberCount;
            let videoCount = channelDetail.items[0].statistics.videoCount;

            
            var channelArtSource = "";
            if(channelart != undefined) {
                channelArtSource = "<img src='" + channelart + "' class='videoThumbnail thumbnailImage' alt='" + channeltitle + "' title='" + channeltitle + "' style='height:220px!important'/>"
            } else {
                channelArtSource = "<img src='../imgs/noMedia.jpg' class='videoThumbnail thumbnailImage' alt='" + channeltitle + "' title='" + channeltitle + "' style='height:220px!important'/>"
            }

            this.channelDetails = {
              userid:userid,
              title:channeltitle,
              description: channeldescription,
              banner:channelart,
              thumbnail:channelthumbnail,
              subscriberCount: subscribersCount,
              videoCount:videoCount
            };
  }
  
  videoList(list){
    let videolists = list.items;
    videolists.forEach(videos => {
      let videoid = videos.id.videoId;
      let videotitle = videos.snippet.title;
      let videodescription = videos.snippet.description;
      let videodate = videos.snippet.publishedAt.split('T')[0]; // date time published
      let videothumbnail = videos.snippet.thumbnails.medium.url; // default, medium or high

      let videoDetail = {
        videoid : videoid,
        videotitle : videotitle,
        videodescription : videodescription,
        videodate : videodate,
        videothumbnail : videothumbnail,
        url : "https://www.youtube.com/watch?v=" + videoid 
      }
      this.videoLists.push(videoDetail);
    });
  }

  ngOnInit() {
    let channelUrl = "https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings,statistics&id=" + this.userId + "&key=" + this.apikey;
    this._http.getData(channelUrl).subscribe(detail => this.channelDetail(detail));

    let getVideolist = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=" + this.userId + "&maxResults=" + this.maxnumbervideos + "&key=" + this.apikey
    this._http.getData(getVideolist).subscribe(detail => this.videoList(detail));
  }

}
