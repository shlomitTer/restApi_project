class ReqClass{
  constructor(_parent,_item){
   this.parent=_parent;
   this.type=_item.type;
   this.color=_item.color_req;
   this.heading=_item.heading ;
   this.link=_item.link;
   this.body=_item.body;
   this.token=_item.token;
  }
  render(){
    let tr = document.createElement("tr");
    document.querySelector(this.parent).append(tr);

    tr.innerHTML+=`
    <td style="background:${this.color}" class="badge" >${this.type}</td>
    <td>${this.heading}</td>
    <td> <a href="https://toys-api-server.herokuapp.com${this.link}" target="blank"> ${this.link}<a></td>
    <td>${this.body}</td>
    <td>${this.token}</td>
    <hr>
    `
  }
}
export default ReqClass;