import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

type LabelData = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string | null;
  color: string;
  default: boolean;
};

const LabelFilter = ({
  active,
  setActive,
}: {
  active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [labels, setLabels] = useState<LabelData[]>([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try{
      const { data }: { data: LabelData[] } = await octokit.request(
        "GET /repos/{owner}/{repo}/labels",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setLabels(data);
    }catch (error) {
        console.log("Error fetching")
      }
    }
    fetchLabels();
  }, []);
  console.log(labels);
  // todo - render labels
  return (
    <GithubFilter
      FilterVals={(i)=>(<>
        {i.name}
        {i.description}
        </>
      )
        
      }
      active={active}
      setActive={setActive}
      data={labels}
      filter={`label`}
      item={(i) => (
        <div className="text-left overflow-none text-black bg-white flex flex-row hover:bg-gray-200 hover:rounded-lg relative  p-2 cursor-pointer">
          <input type="checkbox" className="absolute" />
          <div
            style={{ background: `#${i.color}` }}
            className="flex-shrink-0 overflow-none w-3 h-3  ml-6 mx-2 top-2 left-2 border rounded-full"
          ></div>
          <div className="flex flex-col self-center ">
          <span className="text-[8px] ">{i.name}</span>
          <span className=" text-[8px] text-gray-600">{i.description}</span>
          </div>
          
        </div>
      )}
    />
  );
};

export default LabelFilter;
