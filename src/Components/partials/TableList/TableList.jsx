import PropTypes from "prop-types";
import styles from "./TableList.module.css";

const TableList = ({ users, map }) => {
  return (
    <table className={styles.table}>
      <caption className={styles.caption}>Leaderboard for {map}</caption>
      <thead>
        <tr>
          <th className={styles.th}>Ranking</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Total time</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className={styles.row}>
            <td className={styles.td}>{user.num}</td>
            <td className={styles.td}>{user.username}</td>
            <td className={styles.td}>{user.totalTimeInSeconds}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

TableList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      num: PropTypes.number,
      username: PropTypes.string,
      totalTimeInSeconds: PropTypes.string,
    }),
  ).isRequired,
  map: PropTypes.string.isRequired,
};

export default TableList;
