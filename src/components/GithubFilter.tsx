import React, {  useState } from "react";

const GithubFilter = <T,>({
  data,
  item,
  filter,
  active,
  setActive,
  FilterVals
}: {
  data: T[];
  item: (i: T) => React.ReactNode;
  filter: string;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  FilterVals:(i:T)=>React.ReactNode;
}) => {
  const [filterData, SetFilterData] = useState(data);
  const [search, SetSearch] = useState<string>("");

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    SetSearch(val);
    if (val.trim() === "") {
      SetFilterData(data);
      return;
    }

    const searchValues = data?.filter((d) => {
      console.log(FilterVals(d))
      return JSON.stringify(FilterVals(d))
        .toLowerCase()
        .includes(val.trim().toLowerCase());
    });

    SetFilterData(searchValues);
    console.log(searchValues);
  };
  return (
    <div className="flex flex-col col-1 text-center ">
      <button
        className="px-4 border rounded-lg cursor-pointer"
        onClick={() => {
          setActive(active === filter ? "" : filter);
          //SetSearch('')
        }}
      >
        {filter.charAt(0).toLocaleUpperCase() + filter.slice(1)}
      </button>
      <div className={`flex flex-col col-3  rounded-lg mt-1 relative`}>
        <div
          className={`${
            filter !== active ? "hidden" : ""
          }  absolute top-full left-0 border rounded-lg flex flex-col`}
        >
          <span>Filter by {filter} </span>
          <input
            value={search || ""}
            placeholder={`🔍 Filter ${filter}s`}
            className="m-2 p-1 text-[15px] rounded-lg border-gray-400 border"
            onChange={(e) => onInput(e)}
          />

          {filterData.map((d: any) => {
            return (
              <div className="rounded-lg bg-gray-200 m-2">
                <React.Fragment>{item(d)}</React.Fragment>
              </div>
            );
            
          })}
          {filterData.length===0 && (
            <div className="text-gray-500 p-2">No results for {search}</div>
          )}
        </div>
      </div>
      {/*<div>Github Filter - implement me!</div>*/}
    </div>
  );
};

export default GithubFilter;
