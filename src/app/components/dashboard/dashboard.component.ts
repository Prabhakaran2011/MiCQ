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
  channelDetail = {};

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
        channelArtSource = channelart
    } else {
        channelArtSource = '../imgs/noMedia.jpg'
    }

    this.channelDetail = {
      category : category,
      userid : userid,
      thumbnail : channelthumbnail,
      title : channeltitle,
      banner : channelArtSource 
    };

    this.channelDetails.push(this.channelDetail);
  };

  redirect(userId){
    this.router.navigate(['./youTube/user/'+ userId]);    
  };

  ngOnInit() {
    this.getChannels();
  }

}
