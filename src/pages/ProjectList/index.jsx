import SearchPanel from "./SearchPanel";
import List from "./List";
import { useEffect, useState } from "react";
import axios from "axios";
import { cleanObject } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/projects`, { params: cleanObject(params) })
      .then((res) => {
        setList(res.data);
      });
  }, [params]);

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
