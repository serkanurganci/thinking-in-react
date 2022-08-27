function formatDate(date) {
  return date.toLocaleTimeString();
}
function Clock(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "Hello, world!"
    ),
    React.createElement(
      "h2",
      null,
      "It is ",
      formatDate(props.date),
      "."
    )
  );
}

function tick() {
  root.render(React.createElement(Clock, { date: new Date() }));
}

setInterval(tick, 1000);