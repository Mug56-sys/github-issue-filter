import React, { useState } from "react";

const GithubFilter = <T,>({
  data,
  item,
  filter,
}: {
  data: T[];
  item: (i: T) => React.ReactNode;
  filter: string;
}) => {
  const [hidden, SetHidden] = useState(false);
  return (
    <>
      <div className={`flex flex-col col-3 border rounded-lg`}>
        <button className="px-4" onClick={() => SetHidden(!hidden)}>
          {filter.charAt(0).toLocaleUpperCase() + filter.slice(1)}
        </button>

        <div
          className={`${
            !hidden ? "hidden" : ""
          } border rounded-lg`}
        >
          <span>Filter by {filter} </span>
          {data.map((d: any) => {
            return (
              <div className="rounded-lg bg-gray-200 m-2">
                <React.Fragment>{item(d)}</React.Fragment>
              </div>
            );
          })}
        </div>
      </div>
      {/*<div>Github Filter - implement me!</div>*/}
    </>
  );
};

export default GithubFilter;
