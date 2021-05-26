import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function ProductsList() {
  

  const { entities } = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loading);

  return (
    <div className="container">
      <div className="row">
        <h1>Products List</h1>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Weight</th>
                <th>Availability</th>
                <th>IsEditable</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ _id, product_name, weight, availability, isEditable }) => (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{product_name}</td>
                    <td>{weight}</td>
                    <td>{availability}</td>
                    <td>
                      {isEditable ? <Link to={`/edit-product/${_id}`}>
                        <button>Edit</button>
                      </Link> : '' }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
