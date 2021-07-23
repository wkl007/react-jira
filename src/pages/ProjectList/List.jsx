const List = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>名称</td>
          <td>负责人</td>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>
              {users.find((user) => user.id === item.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
