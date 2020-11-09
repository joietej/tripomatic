import React from "react";
import { useRecoilSnapshot } from "recoil";

const RecoilDebugger = () => {
  const snapshot = useRecoilSnapshot();

  React.useEffect(() => {
    console.debug("The following atoms were modified:");
    for (const node of snapshot.getNodes_UNSTABLE({ modified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
};

export default RecoilDebugger;
