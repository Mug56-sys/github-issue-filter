import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

type AuthorsData = {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string | null;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  user_view_type?: string;
  site_admin?: boolean;
  contributions?: number;
};

const AuthorFilter = ({
  active,
  setActive,
}: {
  active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [authors, setAuthors] = useState<AuthorsData[]>([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data }: { data: AuthorsData[] } = await octokit.request(
        "GET /repos/{owner}/{repo}/contributors",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      setAuthors(data);
    };
    fetchAuthors();
  }, []);
  console.log(authors);
  // todo - render authors
  return (
    <GithubFilter
      FilterVals={(i)=>
       <>{i.login}</> 
      }
      active={active}
      setActive={setActive}
      data={authors}
      filter={`author`}
      item={(i) => (
        <>
          <div
            key={i.id}
            className="flex flex-row p-1 hover:bg-gray-300 hover:rounded-lg cursor-pointer"
          >
            <input type="checkbox" className="mx-2" />
            <img
              src={i.avatar_url}
              className="w-[40px] rounded-full min-w-[40px]"
            />
            <p className="text-[15px] ml-2 self-center">{i.login}</p>
          </div>
        </>
      )}
    />
  );
};
export default AuthorFilter;
