import { useState, useEffect } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

export type MileStoneData = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  description: string | null;
  creator: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    user_view_type?: string;
    name?: string | null;
    email?: string | null;
  } | null;
  open_issues: number;
  closed_issues: number;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  due_on: string | null;
  closed_at: string | null;
};




const MilestoneFilter = () => {
  const [milestones, setMilestones] = useState<MileStoneData[]>([]);
  useEffect(() => {
    const fetchMilestones = async () => {
      const { data }:{data:MileStoneData[]} = await octokit.request(
        "GET /repos/{owner}/{repo}/milestones",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setMilestones(data);
     
    };
    fetchMilestones();
  }, []);
  console.log(milestones)
  // todo - render milestones
  return <GithubFilter data={milestones} filter={`milestone`} item={(i)=>(
    <p>{i.title}</p>
  )}/>;
};

export default MilestoneFilter;
