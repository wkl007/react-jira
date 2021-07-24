import SearchPanel, { Params, User } from "./SearchPanel";
import List, { Project } from "./List";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import { cleanObject, useDebounce } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectList: FC = () => {
  const [params, setParams] = useState<Params>({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [list, setList] = useState<Project[]>([]);

  const debouncedParams = useDebounce(params, 300);

  useEffect(() => {
    axios
      .get(`${apiUrl}/projects`, { params: cleanObject(debouncedParams) })
      .then((res) => {
        setList(res.data);
      });
  }, [debouncedParams]);

  useEffect(() => {
    axios.get(`${apiUrl}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectList;
