"use client";
import {createContext} from "react";

import React, {Children} from "react";

export const fildteredContext = createContext({});
export default function FilterClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const filteredUrl = "testtteestetst";

  return (
    <>
      {filteredUrl}
      {children}
    </>
  );
}

// "use client";
// import {createContext} from "react";

// import React, {Children} from "react";

// export const FildteredContext = createContext({});
// export default function FilterClientWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const filteredUrl = "testtteestetst";

//   return (
//     <FildteredContext.Provider value={filteredUrl}>
//       {children}
//     </FildteredContext.Provider>
//   );
// }
