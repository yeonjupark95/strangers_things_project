const Profile = ({ user, messages }) => {
  if (!Object.keys(user).length === 0) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>
        <div id="user-sent-title">
          <h3> MESSAGES YOU SENT </h3>
        </div>
        {messages.length > 0 &&
          messages.map((message) => {
            const {
              content,
              fromUser: { username },
              post: { title },
            } = message;
            if (username === user.username) {
              return (
                <div className="profile-messages" key={message._id}>
                  <div id="message-post-title">
                    POST: {title}
                  </div>
                  <div id="profile-message-content">
                    {content}
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div>
        <div id="from-user-title">
          <h3> MESSAGES TO YOU </h3>
        </div>
        {messages.length > 0 &&
          messages.map((message) => {
            const {
              content,
              fromUser: { username },
              post: { title },
            } = message;
            if (username !== user.username) {
              return (
                <div className="profile-messages" key={message._id}>
                  <div id="message-post-title">
                    POST: {title}
                    {"\n"}
                  </div>
                  <div id="message-sender">
                    FROM: {username}
                    {"\n"}
                  </div>
                  <div id="profile-message-content">
                    {content}
                    {"\n"}
                  </div>
                </div>
              );
            } else {
              <div className="profile-messages" id="message-sender">
                FROM: {username}
                {"\n"}
              </div>;
            }
          })}
      </div>
    </div>
  );
};
export default Profile;
