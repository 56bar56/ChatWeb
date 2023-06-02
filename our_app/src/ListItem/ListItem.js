function ListItem(props) {
  const clickActive = () => {
    props.setchatsUsers((prevUsers) => {
      const temp = prevUsers.map((user) => {
        if (user.id === props.obj.id) {
          return { ...user, active: true };
        } else {
          return { ...user, active: false };
        }
      });

      const selectedUser = temp.find((user) => user.id === props.obj.id);
      //props.chatSetMessage(selectedUser.lastMessage);
      props.setchatState(selectedUser.id);
      props.setnameTop(selectedUser.user.displayName);
      props.setpartnerImage(selectedUser.user.profilePic);

      return temp;
    });
  };

  return (
    <div
      onClick={clickActive}
      className={
        props.obj.active
          ? 'list-group-item list-group-item-action active'
          : 'list-group-item list-group-item-action'
      }
    >
      <img
        src={props.obj.user.profilePic  || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
        className="img-fluid rounded-circle"
        width="40"
        height="25"
        alt=""
      />
      {props.obj.user.username}
      <p className="date">
        {props.obj.lastMessage ? new Date(props.obj.lastMessage.created).toLocaleTimeString() : ''}
      </p>
    </div>
  );
}

export default ListItem;
