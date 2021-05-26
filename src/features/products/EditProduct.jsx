import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { productUpdated } from "./productSlice";

export function EditProduct() {
  const { pathname } = useLocation();
  const productId = parseInt(pathname.replace("/edit-product/", ""));
 
  const product = useSelector(state =>
    state.products.entities.find(product => product._id === productId)
  )

  const dispatch = useDispatch();
  const history = useHistory();

  const [product_name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [availability, setAvailability] = useState("");
  const [url, setUrl] = useState("");
  const [price_tier, setPriceTier] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [ price_range, setPriceRange] = useState("")
  const [dropdownOptions, setDropdownOptions] = useState([])
  const [error, setError] = useState(null);
  
  useEffect(() => {
    
    if(product) {
      setName(product.product_name);
      setWeight(product.weight)
      setAvailability(product.availability)
      setUrl(product.url)
      setPriceTier(product.price_tier)
      setPriceRange(product.price_range)
      setIsEditable(product.isEditable)
    }
  }, [product])

  useEffect(() => {
      const optionBudget = [
        { title: "$1-10" }, { title: "$11-20" }, { title: "$20-50"}
      ];
    const optionPremium = [
      { title: "$50-99" }, { title: "$100-199" }, { title: "$200+"}
    ];
    if(price_tier === "premium") {
      setDropdownOptions(optionPremium);
    }
    if(price_tier === "budget") {
      setDropdownOptions(optionBudget);
    }
  }, [price_tier])

  const handleName = (e) => setName(e.target.value);
  const handleAvailability = (e) => setAvailability(e.target.value);
  const handleWeight = (e) => setWeight(e.target.value);
  const isFormValid = () => {
   return product_name && weight && url && price_tier && price_range && isEditable ? true : false
  }

  const handleClick = (e) => {
    e.preventDefault();
    const isValid = isFormValid()
    if (isValid) {
      dispatch(
        productUpdated({
          id: productId,
          product_name,
          weight,
          url,
          price_range,
          price_tier,
          isEditable,
          availability
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }
  };

  
  return (
    <div className="container">
      <form onSubmit={handleClick}>
      <div className="row">
        <h1>Edit product</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            required
            type="text"
            id="nameInput"
            onChange={handleName}
            value={product_name}
          />
          <label htmlFor="weightInput">Weight</label>
          <input
            className="u-full-width"
            required
            type="text"
            id="weightInput"
            onChange={handleWeight}
            value={weight}
          />
          <label htmlFor="availabilityInput">Availability</label>
          <input
            className="u-full-width"
            type="number"
            id="availabilityInput"
            onChange={handleAvailability}
            value={availability}
          />
          <label htmlFor="urlInput">Url</label>
          <input
            className="u-full-width"
            type="text"
            required
            id="urlInput"
            onChange={(e)=> setUrl(e.target.value)}
            value={url}
          />
          <div className="row">
              <input
              type="radio"
              name="priceTier"
              required
              checked={price_tier === "budget"}
              onChange={() => setPriceTier("budget")}
              value="budget"
            /><label className="mr-5" htmlFor="priceTier">Budget</label>
            <input
              type="radio"
              name="priceTier"
              required
              checked={price_tier === "premium"}
              onChange={() => setPriceTier("premium")}
              value="premium"
            /><label htmlFor="priceTier">Premium</label>
          </div>
          <select required className="u-full-width" name="priceRange" value={price_range} onChange={e=>setPriceRange(e.target.value)} >
            <option value="">Please select range</option>
            { dropdownOptions.length ? dropdownOptions.map(option => (
              <option value={option.title} key={option.title}>{option.title}</option>
            )) : '' }
          </select>
          <div className="row">
              <input
              type="checkbox"
              required
              id="isEditable"
              checked={isEditable}
              onChange={() => setIsEditable(!isEditable)}
              value={url}
            />
            <label htmlFor="isEditable">Is Editable</label>
          </div>
          
          {error && error}
          <button type="submit" className="button-primary" disabled={!isFormValid()}>
            Save product
          </button>
        </div>
      </div>
      </form> 
    </div>
  );
}
