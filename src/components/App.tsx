import * as React from "react";

type HelloWorldProps = {
  userName: string;
  lang: string;
}

export function App(props: HelloWorldProps): React.ReactElement<HelloWorldProps> {
  return (
    <h1>
      Hi {props.userName} from React! Welcome to {props.lang}!
    </h1>
  );
}