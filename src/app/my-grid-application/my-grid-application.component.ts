import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { Http } from '@angular/http';
import { RestService } from './rest.service';
 

@Component({
  selector: 'my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {

  ngOnInit() {
  }

  private gridOptions: GridOptions;
  //private http: Http;
  term: string;
  term2: string;
  list: any;
  http: Http;
  rest: RestService;

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  constructor( http: Http , rest: RestService ) {  
    this.http = http;
    this.rest = rest; 
    
    this.term = "";
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
        {
            headerName: "CLUSTER_ID",
            field: "clusterId",
            width: 100
        },
        {
            headerName: "USER_ID",
            field: "userId",
            width: 100
        },
        {
            headerName: "CLUSTER_TYPE_ID",
            field: "clusterTypeId",
            width: 100
        },
        {
            headerName: "CLUSTER_NAME",
            field: "clusterName",
            width: 100
        }, 
        {
            headerName: "ENDPOINT_ES",
            field: "endpointEs",
            width: 200,
            cellRenderer: function(params) {

              return "<a href='http://"+ params.value+ "' target='_blank'> "+params.value +"</a>";
            
          }
        },
        {
            headerName: "ENDPOINT_KIBANA",
            field: "endpointKibana",
            width: 200  ,
            cellRenderer: function(params) {

              return "<a href='http://"+ params.value+ "' target='_blank'> "+params.value +"</a>";
            
          }
        }, 
        {
            headerName: "MONITOR_LINK_ES",
            field: "monitorLinkEs",
            width: 100
        },
        {
            headerName: "MONITOR_LINK_KIBANA",
            field: "monitorLinkKibana",
            width: 100
        },
        {
            headerName: "CREATE_DT",
            field: "createDt",
            width: 100
        },
        {
            headerName: "NODE_SIZE",
            field: "nodeSize",
            width: 100
         }
      ];

    //this.gridOptions.onGridReady();
    //this.gridOptions.api.setRowData(null);
        
    http.get('../assets/dummyDB.json')
      .toPromise()
      .then((data) => {                      
        this.gridOptions.api.setRowData(null);
      })
      .catch((err) =>{
        console.log(err);
      })
 
} 
  createCluster() {
    this.term = "..Processing";

    this.http.put('/cloudsearch/cluster', JSON.stringify({
      
      "clusterId" : "AAAAC",
      "userId" : "2" , 
      "clusterName" : "My-first-cluster" ,
      "clusterDesc" : "firstcluster" ,
      "stackId" :   "10" ,
      "clusterTypeId" : "1"        
    }))
    .toPromise()
    .then( res  => res.json())
    .catch((err) =>{
      console.log(err);
    })
  }

  listCluster() {  
    //this.term = "park";     
    //this.http.get('../assets/cluster_list_sample.1.json')
    this.http.get('/cloudsearch/clusters')
      .toPromise()
      .then((data) => {    
               
        this.gridOptions.api.setRowData(data.json().data);
        console.log('data log ' + data.json().data);
        console.log('statusCode log ' + data.json().statusCode);
        
        //this.gridOptions.api.setRowData(null);
      })
      .catch((err) =>{
        console.log(err);
      })
  }
  
  restTest() {
      
       //console.log ("test");
        //this.list = this.rest.getFoods(this.gridOptions);
        console.log ( this.list  );
       //this.gridOptions.api.setRowData(this.list);
  }  
}

 
 
