// shivs for support IE8 and below
import "es5-shim";
import "es5-shim/es5-sham";
import "html5shiv";

import React from "react";

var CommentBox = React.createClass({
  render: function() {
    return (
      <section className="commentBox">
        Hello, world! I am a CommentBox.haha
      </section>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('example')
);