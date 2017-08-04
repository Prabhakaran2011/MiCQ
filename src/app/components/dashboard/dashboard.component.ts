import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ServiceService } from '../../shared/service/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ServiceService]
})
export class DashboardComponent implements OnInit {

  constructor(private _http: ServiceService, private router:Router) { }

  private api_key:string = "AIzaSyClYrtbjAV4VrIJ20O-Hd_0Kzpo4IYqxhs";
  channelList = [];
  channelDetails = [];
  channelListString:string = "";

  getChannels(){
    this._http.getData('../../../assets/channels.json').subscribe(data => this.getChannelDetails(data));
  };

  getChannelDetails(data){
    this.channelList = data;
    this.channelList.forEach(eachObj =>{
      var channelUrl = "https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&key=" + this.api_key;
      if(eachObj.name != "") {
        channelUrl = channelUrl + "&forUsername=" +eachObj.name;
      } else {
        channelUrl = channelUrl + "&id=" +eachObj.id;
      }
      this._http.getData(channelUrl).subscribe(detail => this.bindChannelinView(detail,eachObj.category)); 
    });
  };

  bindChannelinView(channelInfo,category){
    //channel details
    var userid = channelInfo.items[0].id;
    var channeltitle = channelInfo.items[0].snippet.title;
    var channeldescription = channelInfo.items[0].snippet.description;
    var channelart = channelInfo.items[0].brandingSettings.image.bannerTvImageUrl;
    var channelthumbnail = channelInfo.items[0].snippet.thumbnails.medium.url; // default, medium or high
    
    var channelArtSource = "";
    
    if(channelart != undefined) {
        channelArtSource = "<img src='" + channelart + "' class='videoThumbnail thumbnailImage' alt='" + channeltitle + "' title='" + channeltitle + "' style='height:220px!important'/>"
    } else {
        channelArtSource = "<img src='../imgs/noMedia.jpg' class='videoThumbnail thumbnailImage' alt='" + channeltitle + "' title='" + channeltitle + "' style='height:220px!important'/>"
    }
    
    this.channelListString += "<div (click)=\"redirect();\" class='col-md-4 col-sm-6 col-lg-3' style='height:300px;'><div class='col-md-12 card'>"
        + "<a data-id="+userid+">"
        + channelArtSource
        + "<img src='" + channelthumbnail + "' class='channelThumbnail channelLogo' alt='" + channeltitle + "' title='" + channeltitle + "' /></a>"
        + "<div style='padding-left:5px; padding-right:5px'>"
            + "<h2 class='truncate'><a href='https://www.youtube.com/channel/" + userid + "' target='_blank'>" + channeltitle + "</a></h2>" + category + ""
        + "</div></div></div>";
  };

  redirect(){
    debugger;
    this.router.navigate(['./pagenotfound']);    
  };

  ngOnInit() {
    this.getChannels();
  }

}
