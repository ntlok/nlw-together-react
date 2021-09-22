import { ReactNode } from "react";
import cx from "classnames";
import "../styles/questions.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isChecked?: boolean;
  isHighlight?: boolean;
};

export function Question({
  content,
  author,
  children,
  isChecked = false,
  isHighlight = false,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "question",
        { isHighlight: isHighlight },
        { isChecked: isChecked }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
