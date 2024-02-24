import { useEffect } from 'react';
import './styles.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import Filters from '../filters';
import Spinner from '../spinner';

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesLength, setPagesLength] = useState();
  const itemsPerPage = 10;
  const [topLine, setTopLine] = useState(10);
  const [bottomLine, setBottomLine] = useState(0);
  // считываем products
  const prodArray = useSelector((state) => state.products.productsData);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(prodArray.result);
  }, [prodArray]);

  const statusLoad = useSelector((state) => state.products.loadingProducts);

  //удаление дубликатов с id
  const removeDuplicateProducts = (products) => {
    if (products) {
      const uniqueProducts = [];
      const idsSeen = new Set();

      products.forEach((product) => {
        if (!idsSeen.has(product.id)) {
          idsSeen.add(product.id);
          uniqueProducts.push(product);
        }
      });

      return uniqueProducts;
    }
  };

  // количество страниц, переход по страницам, постраничный вывод
  const uniqueProducts = removeDuplicateProducts(products);
  const productsPage = uniqueProducts && uniqueProducts.slice(bottomLine, topLine);
  const clickMore = () => {
    setTopLine(topLine + itemsPerPage);
    setBottomLine(bottomLine + itemsPerPage);
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const clickLess = () => {
    setTopLine(topLine - itemsPerPage);
    setBottomLine(bottomLine - itemsPerPage);
    setCurrentPage((prevPage) => prevPage - 1);
  };
  useEffect(() => {
    if (products) {
      setPagesLength(Math.ceil(products.length / itemsPerPage));
    }
  }, [products]);

  return (
    <>
      <Filters />
      <div className='products__container'>
        {statusLoad === true ? (
          <div className='spinner__container'>
            <Spinner />
          </div>
        ) : (
          <>
            {productsPage && productsPage.length > 0 ? (
              productsPage.map((item) => (
                <div className='products__item' key={`${item.product}-${uuidv4()}`}>
                  <div> Id: {item.id} </div>
                  <div> Брэнд: {item.brand ? item.brand : 'Без бренда'} </div>
                  <div> Цена: {item.price} </div>
                  <div> Название: {item.product} </div>
                </div>
              ))
            ) : (
              <div>Извините, ничего не нашлось</div>
            )}
          </>
        )}
      </div>

      {statusLoad !== true && pagesLength && productsPage && (
        <>
          <div className='pagination'>
            <button
              onClick={clickLess}
              disabled={currentPage === 1}
              className='pages__button'>
              Назад
            </button>
            <span className='current__button'>{currentPage}</span>
            <button
              onClick={clickMore}
              disabled={currentPage === pagesLength}
              className='pages__button'>
              Вперед
            </button>
          </div>
          <div className='quantity__pages'>Всего страниц: {pagesLength}</div>
        </>
      )}
    </>
  );
}

export default Products;
