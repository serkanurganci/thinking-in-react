var formatDate = function formatDate(date) {
  return date.toLocaleDateString();
};

var Avatar = function Avatar(_ref) {
  var user = _ref.user;
  return React.createElement("img", {
    className: "rounded-full w-16 h-16",
    alt: user.name,
    src: user.avatarUrl
  });
};

var UserInfo = function UserInfo(_ref2) {
  var user = _ref2.user;

  return React.createElement(
    "div",
    { className: "flex justify-center items-center gap-2" },
    React.createElement(Avatar, { user: user }),
    React.createElement(
      "div",
      { className: "UserInfo-name" },
      user.name
    )
  );
};

function Comment(_ref3) {
  var date = _ref3.date,
      text = _ref3.text,
      author = _ref3.author;

  return React.createElement(
    "div",
    { className: "flex flex-col justify-center items-center h-screen w-screen" },
    React.createElement(UserInfo, { user: author }),
    React.createElement(
      "div",
      { className: "Comment-text" },
      text
    ),
    React.createElement(
      "div",
      { className: "Comment-date" },
      formatDate(date)
    )
  );
}