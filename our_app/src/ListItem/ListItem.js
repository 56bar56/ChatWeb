
function ListItem(props) {
    const clickActive = () => {
        props.setUsers((prevUsers)=>{
            let temp=[...prevUsers];
            for(let i=0; i<temp.length;i++) {
                if(temp[i].name===props.obj.name) {
                  temp[i].active=true;
                  props.chatSetMessage(temp[i].chat);
                  props.setchatState(i);
                  props.setnameTop(temp[i].name);
                  props.setpartnerImage(temp[i].img);
                } else {
                    temp[i].active=false;
                }
            }
            return temp;
        });
      };
    return (
        <div onClick={clickActive} className={props.obj.active ? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>
              <img src={props.obj.img}  className="img-fluid rounded-circle" width="40" height="25"></img>
              {props.obj.name} <p className="date">{props.obj.time}</p> 
       </div>
    );
  }
  export default ListItem;
  