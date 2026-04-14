import { useEffect, useState } from "react";
import { getStoredIdentity, saveStoredIdentity } from "../lib/identity";

export function useFanIdentity() {
  const [identity, setIdentity] = useState(() => getStoredIdentity());

  useEffect(() => {
    saveStoredIdentity(identity);
  }, [identity]);

  return {
    identity,
    setIdentity,
  };
}
