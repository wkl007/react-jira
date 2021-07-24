import { useEffect, useState } from "react";
import axios from "axios";

const SearchPanel = ({ users, params, setParams }) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(e) =>
            setParams((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <select
          value={params.personId}
          onChange={(e) =>
            setParams((prevState) => ({
              ...prevState,
              personId: e.target.value,
            }))
          }
        >
          <option value="">负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default SearchPanel;
