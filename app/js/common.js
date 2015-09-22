// shivs for support IE8 and below
require("es5-shim");
require("es5-shim/es5-sham");
require("html5shiv");



var React = require("react")

var CommentBox = React.createClass({
  render: function() {
    return (
      <section className="commentBox">
        Hello, world! I am a CommentBox.
      </section>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('example')
);