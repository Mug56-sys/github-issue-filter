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

const LabelFilter = () => {
  const [labels, setLabels] = useState<LabelData[]>([]);
  useEffect(() => {
    const fetchLabels = async () => {
      const { data }: { data: LabelData[] } = await octokit.request(
        "GET /repos/{owner}/{repo}/labels",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setLabels(data);
    
    };
    fetchLabels();
  }, []);
console.log(labels)
  // todo - render labels
  return <GithubFilter data={labels} filter={`label`} item={(i)=>(
    <div style={{ backgroundColor: `#${i.color}` }} >{i.name}</div>
  )}/>;
};

export default LabelFilter;
