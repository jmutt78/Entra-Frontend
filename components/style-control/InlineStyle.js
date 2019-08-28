import React from "react";

import StyleButton from "./StyleButton";

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState ? props.editorState.getCurrentInlineStyle() : null;
  return (
    <div
      style={{
        fontFamily: "Helvetica",
        fontSize: "14px",
        marginBottom: "5px",
        userSelect: "none"
      }}
    >
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle ? currentStyle.has(type.style) : false}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
