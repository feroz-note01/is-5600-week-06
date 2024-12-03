import Card from './Card'
import Search from './Search'
import Button from './Button'
import React, {useState, useEffect} from "react";

const CardList = ({data}) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);

  const handlePrevious = () => {
    // Prevent going out of bounds
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const handleNext = () => {
    // Prevent going out of bounds
    if (offset + limit < data.length) {
      setOffset(offset + limit);
    }
  };

  useEffect(() => {
    // Update the products state based on the offset
    setProducts(data.slice(offset, offset + limit));
  }, [offset, data]);

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) =>
      tagQuery
        ? product.tags.some(({ title }) => title.toLowerCase() === tagQuery.toLowerCase())
        : true
    );

    // Reset pagination and update the filtered products
    setOffset(0);
    setProducts(filtered.slice(0, limit));
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {/* Render cards based on the products state */}
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={handlePrevious} />
        <Button text="Next" handleClick={handleNext} />
      </div>
    </div>
  );
};

export default CardList;