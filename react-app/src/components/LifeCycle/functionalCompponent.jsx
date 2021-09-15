import React from "react";

const FunctionalComponent = () => {
  const [hello, setHello] = React.useState();

  React.useEffect(() => {
    console.log("useEffect calls whenever component updates");
  });

  React.useEffect(() => {
    console.log("useEffect with [] calls when component mount");

    return () => {
      console.log("useEffect with return calls on component unmount");
    };
  }, []);

  return (
    <div>
      <h1>Hello {hello}</h1>
      <h2>
        <a
          onClick={() => {
            setHello("Updated");
          }}
        >
          Press Here!
        </a>
      </h2>
    </div>
  );
};

export default FunctionalComponent;
