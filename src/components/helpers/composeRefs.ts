const composeRef = (...args: any) => {
  return (ref: any) => {
    args.forEach((arg: any) => {
      if (!arg) {
        return;
      }

      if (typeof arg === "function") {
        arg(ref);

        return;
      }

      arg.current = ref;
    });
  };
};

export default composeRef;
