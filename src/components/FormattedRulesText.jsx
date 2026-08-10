import { Fragment } from "react";
import { parseInlineFormatting } from "../utils/abilityFormatting";

function FormattedRulesText({ text }) {
  return parseInlineFormatting(text).map((token, index) => {
    let content = token.text;

    if (token.emphasis) {
      content = <em>{content}</em>;
    }

    if (token.strong) {
      content = <strong>{content}</strong>;
    }

    return <Fragment key={`${index}-${token.text}`}>{content}</Fragment>;
  });
}

export default FormattedRulesText;
