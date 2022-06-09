import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/shared/uikit/services/link/link.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoaderService } from 'src/app/shared/uikit/services/loader/loader.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
    loading = false;
  links!:any

  constructor(private linkService:LinkService,private permissionsService: NgxPermissionsService, public loaderService: LoaderService) { this.loaderService.isLoading.subscribe((v) => {
    // console.log(v);
    this.loading = v;
  }); }

  ngOnInit(): void {
    this.linkService.loadAllLinks().subscribe((res)=>{this.links=res;console.log(this.links)})
    
  }

  clicked(_id:string){
   
    console.log("indice ", typeof(_id))
    const index = this.links.findIndex((x:any) => 
       x._id == _id
    );
    console.log(index)
    this.links.splice(index,1)
    this.linkService.deleteLink(_id).subscribe((res)=>(res))
    
  
    
  }

}
